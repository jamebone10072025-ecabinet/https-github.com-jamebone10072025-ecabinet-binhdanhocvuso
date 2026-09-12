import express, { Request, Response } from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";
import { getSmartTutorResponse } from "./src/data/aiKnowledgeBase";

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

function getDomainKnowledgeFallback(prompt: string, contextTopic?: string): string {
  return getSmartTutorResponse(prompt, contextTopic);
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
      const fallbackReply = getSmartTutorResponse(message, contextTopic);
      res.json({ reply: fallbackReply });
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
