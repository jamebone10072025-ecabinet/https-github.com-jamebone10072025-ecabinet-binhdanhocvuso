import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client safely
let aiClient: GoogleGenAI | null = null;
function getAIClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    aiClient = new GoogleGenAI({
      apiKey: apiKey || "",
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    });
  }
  return aiClient;
}

// Health check endpoint
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({
    status: "ok",
    app: "Bình Dân Học Vụ Số",
    timestamp: new Date().toISOString(),
  });
});

// Resilient multi-model fallback chain to handle 503 High Demand or transient unavailability
const CANDIDATE_MODELS = [
  "gemini-3.1-flash-lite",
  "gemini-3.8-flash",
  "gemini-flash-latest",
];

function getDomainKnowledgeFallback(prompt: string): string {
  const p = prompt.toLowerCase();
  if (p.includes("dữ liệu nào") || p.includes("công cụ đó") || p.includes("luật ai")) {
    return `Kính gửi Quý Anh/Chị, xin chia sẻ về nguyên tắc **"Dữ liệu nào, công cụ đó"** theo Luật Trí tuệ nhân tạo (Luật số 134/2025/QH15) và Chuyên đề 3 & 16:
1. **Phân cấp dữ liệu nghiêm ngặt:** Dữ liệu mật, hồ sơ nội bộ chưa công bố hay thông tin đời tư cá nhân của công dân tuyệt đối KHÔNG đưa lên các công cụ AI công cộng trên Internet.
2. **Ẩn danh hóa trước khi xử lý:** Chỉ sử dụng dữ liệu đã công khai, dữ liệu giả định minh họa hoặc dữ liệu đã khử định danh để nhờ AI hỗ trợ lập dàn ý, soạn thảo bản nháp.
3. **Nguyên tắc song hành:** "AI làm nhanh, con người làm chuẩn" - AI chỉ cung cấp gợi ý, cán bộ công chức luôn là người kiểm chứng, chịu trách nhiệm pháp lý cao nhất đối với sản phẩm đầu ra.`;
  }
  if (p.includes("deepfake") || p.includes("lừa đảo")) {
    return `Kính gửi Quý Anh/Chị, xin chia sẻ quy trình xử lý cuộc gọi video lừa đảo Deepfake theo Chuyên đề 11 & 19:
1. **Dấu hiệu nhận diện:** Chớp mắt không tự nhiên, cử động môi lệch tiếng, khuôn mặt có bóng mờ khi nghiêng đầu, ánh sáng bất thường và thường viện lý do sóng yếu để ngắt cuộc gọi sớm.
2. **Quy tắc phản xạ an toàn:**
- Bước 1: Giữ bình tĩnh, tuyệt đối KHÔNG chuyển tiền, KHÔNG cung cấp mã OTP hay thông tin tài khoản dù người gọi tự xưng lãnh đạo hay công an.
- Bước 2: Dập máy và gọi lại trực tiếp qua số điện thoại viễn thông thông thường (SIM) hoặc gặp trực tiếp để kiểm chứng.
- Bước 3: Đặt câu hỏi thử thách về thông tin nội bộ mà chỉ người thật mới biết.`;
  }
  if (p.includes("3-2-1") || p.includes("sao lưu") || p.includes("tài liệu mật")) {
    return `Kính gửi Quý Anh/Chị, xin chia sẻ quy chuẩn sao lưu và bảo vệ tài liệu công vụ theo Chuyên đề 9 & 20:
1. **Quy tắc sao lưu 3-2-1:**
- **3 bản sao:** Ít nhất 3 bản sao chép dữ liệu (1 bản đang làm việc và 2 bản dự phòng).
- **2 loại phương tiện:** Lưu trên 2 thiết bị/môi trường khác nhau (ví dụ: ổ cứng máy tính cơ quan và máy chủ lưu trữ chuyên dụng hoặc ổ đĩa mạng nội bộ).
- **1 bản tách biệt (off-site):** Ít nhất 1 bản lưu tại địa điểm vật lý khác hoặc đám mây công vụ an toàn.
2. **Tài liệu mật:** Tuyệt đối không soạn thảo tài liệu mật trên máy tính nối mạng Internet; không chia sẻ qua ứng dụng nhắn tin cá nhân không có kiểm định an ninh.`;
  }
  if (p.includes("dữ liệu cá nhân") || p.includes("mức phạt") || p.includes("91/2025")) {
    return `Kính gửi Quý Anh/Chị, theo Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15) có hiệu lực từ 01/01/2026:
1. **Chế tài xử phạt hành chính:** Phạt tiền lên tới 5% tổng doanh thu của năm tài chính liền kề đối với tổ chức, doanh nghiệp có hành vi mua bán, làm rò rỉ dữ liệu cá nhân nghiêm trọng.
2. **Kỷ luật công vụ:** Cán bộ, công chức, viên chức vi phạm quy định bảo vệ dữ liệu cá nhân sẽ bị xử lý kỷ luật từ khiển trách, cảnh cáo, cách chức đến buộc thôi việc, bồi thường thiệt hại và xem xét xử lý hình sự nếu gây hậu quả nghiêm trọng.`;
  }
  return `Kính gửi Quý Anh/Chị,
Hệ thống Trợ lý Cố vấn Học vụ Số đã ghi nhận câu hỏi của Quý Anh/Chị. Dưới đây là các định hướng công vụ cốt lõi theo Bộ học liệu Bình dân học vụ số (Nghị quyết 398/NQ-UBTVQH16):
- **Nguyên tắc an toàn:** Luôn kiểm tra tính bảo mật trước khi nhập dữ liệu; tuân thủ nghiêm ngặt Luật Bảo vệ bí mật nhà nước và Luật An ninh mạng.
- **Nghiệp vụ số:** Ưu tiên số hóa hồ sơ, ký số văn bản điện tử và xử lý công việc qua Cổng Dịch vụ công Quốc gia (Nghị định 118/2025/NĐ-CP).
- **Kiểm chứng con người:** Không tuyệt đối hóa kết quả từ AI, cán bộ phải luôn rà soát tính hợp hiến, hợp pháp của văn bản.
Quý Anh/Chị có thể gửi thêm câu hỏi chi tiết hoặc chọn các câu hỏi gợi ý nhanh để được hỗ trợ cụ thể hơn!`;
}

// AI Assistant Endpoint for Civil Service Digital Skills Q&A
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, contextTopic } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Nội dung tin nhắn không hợp lệ." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.status(503).json({
        reply: "Hệ thống Trợ lý AI đang được cập nhật cấu hình API Key. Quý Anh/Chị vẫn có thể tra cứu toàn bộ 26 chuyên đề và làm bài sát hạch trực tiếp trên nền tảng!",
      });
      return;
    }

    const ai = getAIClient();

    const systemInstruction = `Bạn là "Trợ lý Cố vấn Học vụ Số" thuộc Chương trình "Bình dân học vụ số - Quốc hội số" (ban hành kèm Nghị quyết số 398/NQ-UBTVQH16 ngày 08/8/2026 của Ủy ban Thường vụ Quốc hội, do TS. Trần Văn Khải làm chủ biên).
Nhiệm vụ của bạn là hỗ trợ, giải đáp cho cán bộ, công chức, viên chức và người lao động trong khối cơ quan nhà nước về kiến thức, kỹ năng số, bảo đảm an toàn thông tin, sử dụng AI có trách nhiệm và thực thi công vụ.

Các nguyên tắc cốt lõi bạn PHẢI luôn tuân thủ và nhắc nhở:
1. "AI làm nhanh, con người làm chuẩn": AI chỉ hỗ trợ tạo bản nháp, con người luôn là người kiểm chứng, thẩm định và chịu trách nhiệm pháp lý cuối cùng.
2. "Dữ liệu nào, công cụ đó": Tuyệt đối KHÔNG nhập dữ liệu mật, tài liệu nội bộ chưa công bố hay thông tin cá nhân của công dân lên các công cụ AI công cộng trên Internet. Phải ẩn danh trước khi xử lý.
3. Nguyên tắc sao lưu 3-2-1: 3 bản sao, trên 2 phương tiện khác nhau, 1 bản lưu ở nơi tách biệt (off-site / đám mây được phê duyệt).
4. Nguyên tắc ứng xử: "Chiếc áo công vụ không cởi ra khi về nhà", phát ngôn trên mạng luôn gắn với trách nhiệm cán bộ. Tuân thủ Quyết định 874/QĐ-BTTTT.
5. Pháp lý cập nhật: Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (hiệu lực 01/01/2026), Luật Bảo vệ bí mật nhà nước 117/2025/QH15, Luật An ninh mạng 116/2025/QH15, Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 01/3/2026), Nghị định 118/2025/NĐ-CP (Cổng Dịch vụ công Quốc gia điểm một cửa số duy nhất).
6. Phương châm giao tiếp: Xưng hô lịch sự, trang trọng ("Kính gửi Quý Anh/Chị", "Tôi xin chia sẻ..."), đi thẳng vào trọng tâm công vụ, đưa ra giải pháp rõ ràng, súc tích và an toàn.`;

    const promptWithContext = contextTopic
      ? `[Ngữ cảnh Chuyên đề: ${contextTopic}]\nCâu hỏi từ cán bộ: ${message}`
      : message;

    let replyText = "";
    let lastError: any = null;

    // Try candidate models in order to avoid 503 high demand spikes
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const response = await ai.models.generateContent({
          model: modelName,
          contents: promptWithContext,
          config: {
            systemInstruction,
            temperature: 0.7,
          },
        });

        if (response.text) {
          replyText = response.text;
          break;
        }
      } catch (err: any) {
        lastError = err;
        const msg = String(err?.message || "");
        console.warn(`[Gemini API] Model ${modelName} returned warning/error: ${msg.slice(0, 100)}`);
        // If 503 or 429, proceed to fallback model immediately
      }
    }

    // If all models failed or experienced temporary outages, serve domain knowledge
    if (!replyText) {
      console.warn("[Gemini API] All online models unavailable. Using verified domain knowledge fallback.");
      replyText = getDomainKnowledgeFallback(message);
    }

    res.json({ reply: replyText });
  } catch (error: any) {
    console.error("AI Error:", error);
    // Never crash or leave user with a raw error screen
    const safeFallback = getDomainKnowledgeFallback(req.body?.message || "");
    res.json({ reply: safeFallback });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req: Request, res: Response) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
