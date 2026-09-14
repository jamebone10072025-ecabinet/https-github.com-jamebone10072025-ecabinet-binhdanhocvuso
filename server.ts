import express, { Request, Response } from "express";
import http from "http";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, LiveServerMessage, Modality } from "@google/genai";
import { WebSocketServer, WebSocket } from "ws";
import dotenv from "dotenv";
import { getSmartTutorResponse } from "./src/data/aiKnowledgeBase";
import { generateFallbackDocumentAnalysis } from "./src/data/multimodalHelper";
import { getFallbackPodcastScript } from "./src/data/podcastData";
import { CITIZEN_SCENARIOS } from "./src/data/citizenScenarios";
import { getFallbackCitizenTurn, generateEvaluationReport, DialogueTurn } from "./src/data/citizenSimulationHelper";
import { generateFallbackVisionAnalysis } from "./src/data/earthVisionData";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "25mb" }));
app.use(express.urlencoded({ limit: "25mb", extended: true }));

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

// AI Assistant Endpoint for Civil Service Digital Skills Q&A (Multi-turn conversation support with Google Search Grounding)
app.post("/api/chat", async (req: Request, res: Response) => {
  try {
    const { message, history, model, role, useSearchGrounding = true } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Nội dung tin nhắn không hợp lệ." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackReply = getSmartTutorResponse(message);
      res.json({ reply: fallbackReply, sources: [], searchQueries: [], searchGrounded: false });
      return;
    }

    const ai = getAIClient();

    // Select role-specific system instruction
    let roleInstruction = "";
    if (role === "an_toan_thong_tin") {
      roleInstruction = `Bạn là Chuyên gia An toàn thông tin & Bảo vệ Bí mật Nhà nước.
Chuyên sâu về: Phòng chống mã độc, lừa đảo Deepfake, quy tắc sao lưu 3-2-1, xử lý sự cố an ninh mạng, tuân thủ Luật An ninh mạng 116/2025/QH15, Luật Bảo vệ bí mật nhà nước 117/2025/QH15 và Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15. Luôn ưu tiên an toàn, bảo mật dữ liệu công vụ.`;
    } else if (role === "phap_ly_cong_vu") {
      roleInstruction = `Bạn là Chuyên gia Pháp lý Chuyển đổi số & Cải cách Hành chính công tỉnh Gia Lai.
Chuyên sâu về: Luật Trí tuệ nhân tạo 134/2025/QH15, Nghị định 118/2025/NĐ-CP, Cổng Dịch vụ công Quốc gia, Đề án 06, VNeID, và mô hình chính quyền địa phương 2 cấp tỉnh Gia Lai (bỏ cấp huyện, 135 xã/phường). Giải thích rõ căn cứ pháp lý và quy trình xử lý hồ sơ hành chính.`;
    } else {
      roleInstruction = `Bạn là "Trợ lý Cố vấn Học vụ Số" thuộc Chương trình "Bình dân học vụ số - Quốc hội số" (ban hành kèm Nghị quyết số 398/NQ-UBTVQH16 ngày 08/8/2026 của Ủy ban Thường vụ Quốc hội, do TS. Trần Văn Khải làm chủ biên).
Nhiệm vụ của bạn là hỗ trợ, giải đáp cho cán bộ, công chức, viên chức và người lao động trong khối cơ quan nhà nước về kiến thức, kỹ năng số toàn diện, bảo đảm an toàn thông tin, sử dụng AI có trách nhiệm và thực thi công vụ.`;
    }

    const systemInstruction = `${roleInstruction}

Các nguyên tắc cốt lõi bạn PHẢI luôn tuân thủ và nhắc nhở:
1. "AI làm nhanh, con người làm chuẩn": AI chỉ hỗ trợ tạo bản nháp, con người luôn là người kiểm chứng, thẩm định và chịu trách nhiệm pháp lý cuối cùng.
2. "Dữ liệu nào, công cụ đó": Tuyệt đối KHÔNG nhập dữ liệu mật, tài liệu nội bộ chưa công bố hay thông tin cá nhân của công dân lên các công cụ AI công cộng trên Internet. Phải ẩn danh trước khi xử lý.
3. Nguyên tắc sao lưu 3-2-1: 3 bản sao, trên 2 phương tiện khác nhau, 1 bản lưu ở nơi tách biệt (off-site / đám mây được phê duyệt).
4. Nguyên tắc ứng xử: "Chiếc áo công vụ không cởi ra khi về nhà", phát ngôn trên mạng luôn gắn với trách nhiệm cán bộ. Tuân thủ Quyết định 874/QĐ-BTTTT.
5. Pháp lý cập nhật: Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 (hiệu lực 01/01/2026), Luật Bảo vệ bí mật nhà nước 117/2025/QH15, Luật An ninh mạng 116/2025/QH15, Luật Trí tuệ nhân tạo 134/2025/QH15 (hiệu lực 01/3/2026), Nghị định 118/2025/NĐ-CP (Cổng Dịch vụ công Quốc gia điểm một cửa số duy nhất).
6. Phương châm giao tiếp: Xưng hô lịch sự, trang trọng ("Kính gửi Quý Anh/Chị", "Tôi xin chia sẻ..."), đi thẳng vào trọng tâm công vụ, đưa ra giải pháp rõ ràng, súc tích và an toàn.
7. Địa phương tỉnh Gia Lai: Tỉnh hiện đã sắp xếp, sáp nhập theo mô hình chính quyền 2 cấp (Tỉnh - Xã/Phường), KHÔNG CÒN CẤP HUYỆN, toàn tỉnh gồm 135 xã/phường (110 xã, 25 phường) trực thuộc tỉnh (sau khi hợp nhất Gia Lai - Bình Định theo Nghị quyết 202/2025/QH15). Mọi thủ tục Một cửa trước đây của cấp huyện nay được chuyển giao phân cấp về Một cửa 135 xã/phường hoặc Cổng DVCQG/VNeID.`;

    // Map requested model to recommended valid models
    // When Search Grounding is active, prioritize gemini-3.5-flash with googleSearch tool per specification
    let primaryModel = "gemini-3.5-flash";
    if (model === "gemini-3.1-pro-preview") {
      primaryModel = "gemini-3.1-pro-preview";
    } else if (model === "gemini-3.1-flash-lite") {
      primaryModel = "gemini-3.1-flash-lite";
    }

    // Build multi-model fallback chain based on selection
    const modelsToTry = [
      primaryModel,
      "gemini-3.5-flash",
      "gemini-3.1-flash-lite",
      "gemini-3.8-flash",
      "gemini-flash-latest"
    ].filter((v, i, a) => a.indexOf(v) === i);

    // Prepare multi-turn contents format
    // Each turn: { role: 'user' | 'model', parts: [{ text: '...' }] }
    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history) {
        if (turn.role && turn.content) {
          contents.push({
            role: turn.role === "assistant" || turn.role === "model" ? "model" : "user",
            parts: [{ text: String(turn.content) }],
          });
        }
      }
    }
    // Add current user message
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    let replyText = "";
    let sources: Array<{ title: string; uri: string }> = [];
    let searchQueries: string[] = [];

    // Attempt with Search Grounding using gemini-3.5-flash if enabled
    if (useSearchGrounding) {
      try {
        const response = await ai.models.generateContent({
          model: "gemini-3.5-flash",
          contents,
          config: {
            systemInstruction,
            temperature: 0.7,
            tools: [{ googleSearch: {} }],
          },
        });

        if (response.text) {
          replyText = response.text;
          const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
          const chunks = groundingMetadata?.groundingChunks;
          if (Array.isArray(chunks)) {
            sources = chunks
              .filter((c: any) => c.web && c.web.uri)
              .map((c: any) => ({
                title: c.web.title || c.web.uri,
                uri: c.web.uri,
              }));
          }
          if (Array.isArray(groundingMetadata?.webSearchQueries)) {
            searchQueries = groundingMetadata.webSearchQueries;
          }
        }
      } catch (err: any) {
        const msg = String(err?.message || "");
        console.warn(`[Gemini API] Search Grounding with gemini-3.5-flash notice: ${msg.slice(0, 100)}`);
      }
    }

    // Fallback through candidate models if search grounding didn't yield response
    if (!replyText) {
      for (const modelName of modelsToTry) {
        try {
          const response = await ai.models.generateContent({
            model: modelName,
            contents,
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
          const msg = String(err?.message || "");
          console.warn(`[Gemini API] Multi-turn model ${modelName} error: ${msg.slice(0, 100)}`);
        }
      }
    }

    if (!replyText) {
      console.warn("[Gemini API] All online models unavailable. Using domain fallback.");
      replyText = getDomainKnowledgeFallback(message);
    }

    res.json({
      reply: replyText,
      sources,
      searchQueries,
      searchGrounded: sources.length > 0 || searchQueries.length > 0,
    });
  } catch (error: any) {
    console.error("AI Error:", error);
    const safeFallback = getDomainKnowledgeFallback(req.body?.message || "");
    res.json({ reply: safeFallback, sources: [], searchQueries: [], searchGrounded: false });
  }
});

// Dedicated Google Search Grounding Endpoint using gemini-3.5-flash
app.post("/api/search-grounding", async (req: Request, res: Response) => {
  try {
    const { query } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Yêu cầu cung cấp nội dung tra cứu." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({
        reply: "Hệ thống đang hoạt động ở chế độ cơ sở dữ liệu ngoại tuyến. Để tra cứu dữ liệu thời gian thực qua Google Search, cần kết nối Gemini API.",
        sources: [],
        searchQueries: [],
        searchGrounded: false,
      });
      return;
    }

    const ai = getAIClient();
    const systemInstruction = `Bạn là Trợ lý Tra cứu Pháp lý & Thông tin Công vụ Thời gian thực thuộc Chương trình Bình dân học vụ số tỉnh Gia Lai (Nghị quyết số 398/NQ-UBTVQH16).
Nhiệm vụ của bạn là sử dụng dữ liệu từ Google Search để cung cấp thông tin cập nhật, chính xác, khách quan nhất về:
- Các văn bản quy phạm pháp luật, nghị quyết của Quốc hội, nghị định của Chính phủ, quyết định của Thủ tướng và UBND tỉnh Gia Lai mới nhất (đặc biệt về mô hình chính quyền 2 cấp tỉnh Gia Lai với 135 xã/phường, Đề án 06, VNeID, Cổng DVCQG theo Nghị định 118/2025/NĐ-CP).
- Các hướng dẫn, cảnh báo an toàn thông tin, phòng chống lừa đảo trực tuyến, sử dụng AI an toàn theo Luật Trí tuệ nhân tạo 2025 và Luật Bảo vệ dữ liệu cá nhân 2025.
- Trích dẫn rõ ràng tên văn bản, cơ quan ban hành, ngày có hiệu lực và các nội dung cốt lõi.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: query,
      config: {
        systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.5,
      },
    });

    const reply = response.text || "";
    const groundingMetadata = response.candidates?.[0]?.groundingMetadata;
    const chunks = groundingMetadata?.groundingChunks || [];
    const sources = chunks
      .filter((c: any) => c.web?.uri)
      .map((c: any) => ({
        title: c.web?.title || c.web?.uri,
        uri: c.web?.uri,
      }));
    const searchQueries = groundingMetadata?.webSearchQueries || [];

    res.json({
      reply,
      sources,
      searchQueries,
      searchGrounded: sources.length > 0 || searchQueries.length > 0,
    });
  } catch (error: any) {
    console.error("Search Grounding Error:", error);
    res.status(500).json({
      error: "Không thể tra cứu Google Search vào thời điểm này: " + (error?.message || "Lỗi máy chủ"),
    });
  }
});

// Maps Grounding Endpoint using Gemini with googleMaps tool
app.post("/api/maps-search", async (req: Request, res: Response) => {
  try {
    const { query, userLocation } = req.body;
    if (!query || typeof query !== "string") {
      res.status(400).json({ error: "Yêu cầu cung cấp câu hỏi tra cứu địa điểm." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      res.json({
        reply: "Hệ thống bản đồ công vụ Gia Lai sẵn sàng hỗ trợ tra cứu các Trung tâm hành chính công, Bộ phận Một cửa và điểm VNeID.",
        groundingChunks: [],
      });
      return;
    }

    const ai = getAIClient();

    const systemInstruction = `Bạn là Trợ lý Bản đồ số & Dịch vụ công vụ tỉnh Gia Lai, trực thuộc Chương trình Bình dân học vụ số tỉnh Gia Lai.
THÔNG TIN QUAN TRỌNG VỀ ĐỊA GIỚI HÀNH CHÍNH & MÔ HÌNH CHÍNH QUYỀN 2 CẤP TỈNH GIA LAI:
- KHÔNG CÒN CẤP HUYỆN: Tỉnh Gia Lai hiện nay đã chuyển đổi sang mô hình chính quyền địa phương 2 cấp tinh gọn (Cấp Tỉnh trực tiếp quản lý cấp Xã/Phường, bỏ hoàn toàn cấp trung gian Huyện/Thị xã/Thành phố).
- TOÀN TỈNH HIỆN NAY CÓ 135 ĐƠN VỊ HÀNH CHÍNH CẤP XÃ/PHƯỜNG (gồm 110 xã và 25 phường) trực thuộc tỉnh:
  + Căn cứ theo Nghị quyết số 202/2025/QH15 của Quốc hội (hợp nhất tỉnh Gia Lai và Bình Định thành tỉnh Gia Lai mới với diện tích hơn 21.550 km², dân số khoảng 3,5 triệu người).
  + Trung tâm chính trị - hành chính cấp tỉnh đặt tại TP. Quy Nhơn; trong khi TP. Pleiku là trung tâm kinh tế - công nghệ - đào tạo then chốt vùng Tây Nguyên.
  + Các xã, phường được phân cấp, ủy quyền mạnh mẽ để giải quyết trực tiếp các thủ tục hành chính cho người dân (Một cửa cấp xã/phường liên thông trực tiếp với các Sở, Ban, Ngành cấp tỉnh).
  + Tại địa bàn Pleiku: Đã sáp nhập toàn bộ xã Tân Sơn vào xã Biển Hồ theo Nghị quyết 1195/NQ-UBTVQH15 (xã Biển Hồ mới rộng 28,84 km²).

Nhiệm vụ của bạn:
1. Tra cứu và chỉ dẫn chính xác địa điểm các cơ quan công quyền, Trung tâm Phục vụ Hành chính công cấp tỉnh (Cơ sở Tây Nguyên tại Pleiku và Cơ sở Duyên hải tại Quy Nhơn), Bộ phận Một cửa tại 135 xã/phường, điểm cấp CCCD/VNeID, điểm Bưu chính công ích BCCI.
2. Nhấn mạnh và giải thích rõ cho cán bộ và người dân về mô hình 2 cấp: KHÔNG CÒN CẤP HUYỆN; mọi thủ tục trước đây của cấp huyện nay được chuyển về Bộ phận Một cửa xã/phường hoặc nộp trực tiếp lên Trung tâm Phục vụ Hành chính công tỉnh qua Cổng DVCQG/VNeID.
3. Giải đáp rõ: Công dân các xã sáp nhập (như xã Tân Sơn cũ nay về UBND xã Biển Hồ mới) không cần phải đổi giấy tờ cũ; dữ liệu cư trú trên VNeID và Cổng Dịch vụ công Quốc gia được cơ quan Công an tự động đồng bộ theo địa danh mới miễn phí.
4. Cung cấp chỉ dẫn đường đi và liên kết Google Maps chính xác.`;

    const locationContext = userLocation?.latitude && userLocation?.longitude
      ? `\n[Vị trí hiện tại của người dùng: Vĩ độ ${userLocation.latitude}, Kinh độ ${userLocation.longitude}]`
      : "\n[Khu vực tìm kiếm trọng tâm: Tỉnh Gia Lai, Việt Nam]";

    const fullPrompt = `${query}${locationContext}`;

    let replyText = "";
    let groundingChunks: any[] = [];

    // Attempt with gemini-2.5-flash which supports googleMaps tool
    try {
      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: fullPrompt,
        config: {
          systemInstruction,
          tools: [{ googleMaps: {} }],
        },
      });

      replyText = response.text || "";
      const metadata = response.candidates?.[0]?.groundingMetadata;
      if (metadata?.groundingChunks) {
        groundingChunks = metadata.groundingChunks;
      }
    } catch (mapsErr: any) {
      console.warn("[Maps Grounding] Failed with tool, falling back to flash model:", mapsErr?.message || mapsErr);
      // Fallback without tool
      try {
        const fallbackResponse = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: fullPrompt,
          config: {
            systemInstruction,
          },
        });
        replyText = fallbackResponse.text || "";
      } catch (err2: any) {
        console.warn("[Maps Grounding Fallback Error]:", err2?.message || err2);
      }
    }

    res.json({
      reply: replyText || "Không tìm thấy thông tin phù hợp, vui lòng thử lại câu hỏi cụ thể hơn về địa điểm tại Gia Lai.",
      groundingChunks,
    });
  } catch (error: any) {
    console.error("Maps search error:", error);
    res.status(500).json({ error: "Lỗi xử lý tra cứu bản đồ công vụ." });
  }
});

// Multimodal Document & Scanned Form Intelligence Endpoint
app.post("/api/document-intelligence", async (req: Request, res: Response) => {
  try {
    const { fileData, mimeType, documentText, taskType = "format_check", userNotes } = req.body;

    if (!fileData && (!documentText || !documentText.trim())) {
      res.status(400).json({ error: "Vui lòng cung cấp hình ảnh/tài liệu quét hoặc văn bản cần phân tích." });
      return;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    let systemInstruction = "";
    let promptTitle = "";

    if (taskType === "format_check") {
      promptTitle = "SOÁT LỖI THỂ THỨC VĂN BẢN THEO NGHỊ ĐỊNH 30/2020/NĐ-CP";
      systemInstruction = `Bạn là Chuyên gia Cao cấp Thẩm định Thể thức & Kỹ thuật Soạn thảo Văn bản Hành chính Nhà nước theo Nghị định số 30/2020/NĐ-CP của Chính phủ.
Nhiệm vụ của bạn là rà soát chi tiết tài liệu (hình ảnh/bản quét/dự thảo văn bản) và chỉ rõ:
1. Đánh giá tổng quan độ tuân thủ (Thang điểm 100/100, Mức độ: Đạt chuẩn / Cần hiệu đính / Không đạt).
2. Danh sách các lỗi sai thể thức phát hiện được (chỉ rõ thành phần nào sai: Quốc hiệu - Tiêu ngữ, Tên cơ quan, Số và ký hiệu, Địa danh ngày tháng, Tên loại & trích yếu, Căn lề, Phông chữ Times New Roman, Cỡ chữ & kiểu chữ đậm/nghiêng, Thẩm quyền ký, Chữ ký số, Nơi nhận). Trích dẫn rõ quy định tại Nghị định 30/2020/NĐ-CP.
3. Hướng dẫn sửa cụ thể từng lỗi sai.
4. Bản văn bản hoàn chỉnh đã được hiệu đính chuẩn mực 100% theo Nghị định 30/2020/NĐ-CP để cán bộ có thể sao chép sử dụng ngay.
Lưu ý đặc thù tỉnh Gia Lai: Hiện nay Gia Lai vận hành mô hình chính quyền địa phương 2 cấp (Cấp Tỉnh và 135 Xã/Phường, không còn cấp huyện). Tên cơ quan ban hành cấp xã phải ghi đúng: "ỦY BAN NHÂN DÂN XÃ/PHƯỜNG..." trực thuộc tỉnh.`;
    } else if (taskType === "task_matrix") {
      promptTitle = "TRÍCH XUẤT MA TRẬN NHIỆM VỤ & HẠN ĐỊNH CÔNG VỤ";
      systemInstruction = `Bạn là Thư ký Tổng hợp & Cán bộ Tham mưu Hành chính Công vụ.
Nhiệm vụ: Phân tích kỹ lưỡng văn bản chỉ đạo, nghị quyết, quyết định hoặc công văn được cung cấp và trích xuất:
1. Thông tin văn bản: Số ký hiệu, Ngày ban hành, Cơ quan ban hành, Trích yếu.
2. 3 Nhiệm vụ then chốt cần chỉ đạo triển khai NGAY TRONG 24-48 GIỜ.
3. Bảng Ma trận Phân công Nhiệm vụ (dạng bảng Markdown có các cột: STT | Nội dung nhiệm vụ | Đơn vị chủ trì | Đơn vị phối hợp | Hạn hoàn thành (Deadline) | Sản phẩm đầu ra | Mức độ ưu tiên [Hỏa tốc/Khẩn/Thường]).
4. Các mốc báo cáo tiến độ và lưu ý an toàn thông tin (nếu văn bản có đề cập dữ liệu cá nhân hoặc thông tin mật).`;
    } else if (taskType === "error_diagnosis") {
      promptTitle = "CHẨN ĐOÁN SỰ CỐ ẢNH CHỤP MÀN HÌNH PHẦN MỀM CÔNG VỤ";
      systemInstruction = `Bạn là Kỹ sư Trưởng Hỗ trợ Kỹ thuật Công nghệ Thông tin & An toàn Mạng thuộc Ban Chỉ đạo Chuyển đổi số.
Nhiệm vụ: Phân tích ảnh chụp màn hình thông báo lỗi hoặc mô tả sự cố trên các hệ thống phần mềm nghiệp vụ khối cơ quan nhà nước (Cổng Dịch vụ công Quốc gia, Hệ thống Một cửa điện tử, CSDL quốc gia về dân cư VNeID, Hệ thống quản lý văn bản điều hành, Lỗi chữ ký số USB Token / VNPT-CA / Viettel-CA / Ban Cơ yếu Chính phủ, Lỗi kết nối mạng nội bộ hoặc chứng thư số SSL/TLS).
Yêu cầu phân tích:
1. Nhận diện sự cố: Tên phần mềm, Thông điệp/Mã lỗi chính xác hiển thị trên ảnh màn hình.
2. Nguyên nhân kỹ thuật gốc rễ (do mạng, do driver chữ ký số chưa cắm/chưa nhận, do tài khoản hết hạn, trình duyệt chặn tải file, hay lỗi đồng bộ dữ liệu...).
3. Hướng dẫn 3 bước khắc phục nhanh (Step-by-step) dành cho cán bộ công chức tự làm được ngay trong 3 phút mà không cần gọi IT.
4. Trường hợp nào cần liên hệ bộ phận hỗ trợ kỹ thuật chuyên trách và số hotline/kênh liên hệ khuyến nghị.
5. Cảnh báo an toàn: Tuyệt đối không bấm vào các link lạ giả mạo hỗ trợ kỹ thuật hoặc chia sẻ mã OTP/mật khẩu Token.`;
    } else {
      promptTitle = "TÓM TẮT VĂN BẢN HÀNH CHÍNH (EXECUTIVE SUMMARY)";
      systemInstruction = `Bạn là Chuyên gia Tóm lược Văn bản & Soạn thảo Báo cáo Lãnh đạo cấp cao.
Nhiệm vụ: Đọc toàn bộ nội dung tài liệu (bản quét/hình ảnh/dự thảo) và cô đọng thành 1 Bản ghi nhớ tóm lược (Executive Brief) trong đúng 1 trang:
1. Trích yếu & Thẩm quyền ban hành.
2. Mục tiêu & Ý nghĩa chiến lược của văn bản.
3. 5 Điểm chỉ đạo mới hoặc quan trọng nhất cần ghi nhớ.
4. Trách nhiệm thực hiện đối với cơ quan, đơn vị và cán bộ công chức.
5. Đề xuất hành động tức thì cho cơ quan tiếp nhận.`;
    }

    if (!apiKey) {
      res.json({
        analysis: generateFallbackDocumentAnalysis(taskType, documentText || "", userNotes),
        model: "offline-knowledge-engine",
        taskType,
      });
      return;
    }

    const ai = getAIClient();

    let cleanedBase64 = fileData;
    let actualMime = mimeType || "image/jpeg";
    if (fileData && fileData.includes(",")) {
      const parts = fileData.split(",");
      const meta = parts[0];
      cleanedBase64 = parts[1];
      const match = meta.match(/:(.*?);/);
      if (match && match[1]) {
        actualMime = match[1];
      }
    }

    const promptText = `YÊU CẦU: ${promptTitle}\n\n${userNotes ? `Ghi chú của người dùng: ${userNotes}\n\n` : ""}${documentText ? `NỘI DUNG VĂN BẢN/DỰ THẢO:\n"""\n${documentText}\n"""\n\n` : ""}${fileData ? "Vui lòng phân tích kỹ lưỡng hình ảnh/tài liệu đính kèm bên trên." : ""}`;

    const parts: any[] = [];
    if (cleanedBase64) {
      parts.push({
        inlineData: {
          mimeType: actualMime,
          data: cleanedBase64,
        },
      });
    }
    parts.push({ text: promptText });

    let responseText = "";
    let usedModel = "gemini-3.8-flash";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: [{ role: "user", parts }],
        config: {
          systemInstruction,
          temperature: 0.2,
        },
      });
      responseText = response.text || "";
    } catch (err: any) {
      console.warn("[Doc Intelligence] gemini-3.8-flash failed, trying gemini-3.1-flash-lite:", err?.message || err);
      try {
        usedModel = "gemini-3.1-flash-lite";
        const fallbackResp = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents: [{ role: "user", parts }],
          config: {
            systemInstruction,
            temperature: 0.2,
          },
        });
        responseText = fallbackResp.text || "";
      } catch (err2: any) {
        console.warn("[Doc Intelligence] Fallback to domain engine:", err2?.message || err2);
        responseText = generateFallbackDocumentAnalysis(taskType, documentText || "", userNotes);
      }
    }

    res.json({
      analysis: responseText || generateFallbackDocumentAnalysis(taskType, documentText || "", userNotes),
      model: usedModel,
      taskType,
    });
  } catch (error: any) {
    console.error("Document Intelligence Error:", error);
    res.status(500).json({
      error: "Không thể xử lý tài liệu vào thời điểm này: " + (error?.message || "Lỗi máy chủ"),
    });
  }
});

// AI Micro-learning Podcast Script Generator Endpoint
app.post("/api/podcast-script", async (req: Request, res: Response) => {
  try {
    const { topicId, topicTitle, lessonTitle, customTopic } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    const systemInstruction = `Bạn là Biên tập viên Trưởng & Phát thanh viên Kênh Học tập Số "Bình dân học vụ số tỉnh Gia Lai".
Nhiệm vụ của bạn là soạn kịch bản phát thanh Podcast Micro-learning công vụ (thời lượng nghe chuẩn 2-3 phút, khoảng 250 - 350 từ tiếng Việt).
Phong cách: Truyền thanh hành chính trang trọng, ấm áp, truyền cảm hứng, ngắn gọn, dễ nhớ, dễ thực hiện cho cán bộ, công chức, viên chức.
Cấu trúc kịch bản bắt buộc gồm 3 phần:
1. [LỜI CHÀO & ĐẶT VẤN ĐỀ - 30 giây]: Lời chào trân trọng từ "Bình dân học vụ số tỉnh Gia Lai", giới thiệu nhanh chuyên đề và nêu lý do tại sao kỹ năng này trực tiếp giúp cán bộ hoàn thành nhiệm vụ và tránh rủi ro pháp lý.
2. [3 NGUYÊN TẮC CÔNG VỤ VÀNG - 60 giây]: 3 hành động cụ thể "Dễ nhớ - Dễ làm - Phải tuân thủ" (gắn với các căn cứ như Luật An ninh mạng, Luật Bảo vệ dữ liệu cá nhân, Nghị định 30/2020/NĐ-CP, Nghị định 118/2025/NĐ-CP, VNeID...).
3. [LỜI NHẮC CÔNG VỤ & KHẨU HIỆU HÀNH ĐỘNG - 30 giây]: Đúc kết 1 câu khẩu hiệu hành động sâu sắc (ví dụ: "AI làm nhanh - Con người làm chuẩn", "Dữ liệu nào - Công cụ đó"), lời chúc công tác tốt và hẹn gặp lại trong chuyên đề tiếp theo.`;

    const prompt = `Hãy soạn kịch bản Podcast Micro-learning 2 phút cho chuyên đề:
- Chuyên đề số: ${topicId || "Chuyên đề"}
- Tên chuyên đề: ${topicTitle || customTopic || "Kỹ năng số cơ bản"}
${lessonTitle ? `- Bài học trọng tâm: ${lessonTitle}` : ""}`;

    if (!apiKey) {
      res.json({
        script: getFallbackPodcastScript(topicId, topicTitle || customTopic || "Kỹ năng số"),
        topicTitle: topicTitle || customTopic,
      });
      return;
    }

    const ai = getAIClient();
    let scriptText = "";

    try {
      const resp = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction,
          temperature: 0.7,
        },
      });
      scriptText = resp.text || "";
    } catch (err: any) {
      console.warn("[Podcast Script] Gemini call error, using fallback:", err?.message || err);
      scriptText = getFallbackPodcastScript(topicId, topicTitle || customTopic || "Kỹ năng số");
    }

    res.json({
      script: scriptText || getFallbackPodcastScript(topicId, topicTitle || customTopic || "Kỹ năng số"),
      topicTitle: topicTitle || customTopic,
    });
  } catch (error: any) {
    console.error("Podcast script error:", error);
    res.status(500).json({ error: "Lỗi tạo kịch bản phát thanh số." });
  }
});

// Citizen Simulation Dialogue Turn Endpoint (Gemini 3.8 Flash roleplay & real-time coaching)
app.post("/api/citizen-simulation/turn", async (req: Request, res: Response) => {
  try {
    const { scenarioId, message, history = [], customScenario } = req.body;
    if (!message || typeof message !== "string") {
      res.status(400).json({ error: "Nội dung đối thoại không được để trống." });
      return;
    }

    const scenario = CITIZEN_SCENARIOS.find((s) => s.id === scenarioId) || customScenario || CITIZEN_SCENARIOS[0];
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const fallbackResult = getFallbackCitizenTurn(scenario.id, message, history);
      res.json({
        ...fallbackResult,
        modelUsed: "offline-rule-engine",
      });
      return;
    }

    const ai = getAIClient();

    const systemInstruction = `${scenario.systemPrompt}

BỐI CẢNH ĐỊA PHƯƠNG TỈNH GIA LAI:
- Tỉnh Gia Lai hiện vận hành mô hình chính quyền địa phương 2 cấp (Cấp Tỉnh và 135 Xã/Phường, không còn cấp huyện). Bộ phận Một cửa cấp xã là nơi tiếp nhận và giải quyết hầu hết thủ tục hành chính liên thông (Nghị định 118/2025/NĐ-CP).
- Các hệ thống công vụ cốt lõi: Cổng Dịch vụ công Quốc gia, CSDL quốc gia về dân cư VNeID mức 2, Dịch vụ công liên thông Đề án 06.

YÊU CẦU PHẢN HỒI (RẤT QUAN TRỌNG):
1. Bạn PHẢI đóng vai công dân thật, phản hồi bằng lời nói trực tiếp (không viết lời dẫn chuyện như 'Bác H'Blang nói:...', chỉ trả lời đúng câu thoại của công dân).
2. Độ dài: Giữ súc tích từ 2 đến 4 câu thoại tự nhiên, có cảm xúc chân thật (vui, bớt lo, hạ hỏa hoặc cáu giận tùy theo cách ứng xử của cán bộ).
3. ĐÁNH GIÁ KÈM THEO: Ở cuối phản hồi, bạn cung cấp một khối JSON ẩn sau dòng phân cách '---COACHING---' theo cấu trúc:
---COACHING---
{"sentiment":"positive"|"neutral"|"negative","coachingTip":"Lời khuyên ngắn gọn về chuẩn mực tiếp dân và căn cứ pháp lý","suggestedAction":"Gợi ý hành động hoặc câu nói tiếp theo cho cán bộ"}`;

    const contents: any[] = [];
    if (Array.isArray(history) && history.length > 0) {
      for (const turn of history) {
        if (turn.role && turn.content) {
          contents.push({
            role: turn.role === "citizen" || turn.role === "model" ? "model" : "user",
            parts: [{ text: turn.content }],
          });
        }
      }
    }
    contents.push({
      role: "user",
      parts: [{ text: message }],
    });

    let rawOutput = "";
    let modelUsed = "gemini-3.8-flash";

    try {
      const response = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents,
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });
      rawOutput = response.text || "";
    } catch (err: any) {
      console.warn("[Citizen Turn] gemini-3.8-flash error, trying gemini-3.1-flash-lite:", err?.message || err);
      try {
        modelUsed = "gemini-3.1-flash-lite";
        const fallbackResp = await ai.models.generateContent({
          model: "gemini-3.1-flash-lite",
          contents,
          config: {
            systemInstruction,
            temperature: 0.8,
          },
        });
        rawOutput = fallbackResp.text || "";
      } catch (err2: any) {
        console.warn("[Citizen Turn] Fallback to rule engine:", err2?.message || err2);
        const fallbackResult = getFallbackCitizenTurn(scenario.id, message, history);
        res.json({
          ...fallbackResult,
          modelUsed: "offline-rule-engine",
        });
        return;
      }
    }

    let reply = rawOutput;
    let sentiment: "positive" | "neutral" | "negative" = "neutral";
    let coachingTip = "Cán bộ cần duy trì thái độ chuẩn mực '4 xin, 4 luôn' và nắm chắc quy định pháp luật.";
    let suggestedAction = "Lắng nghe và hướng dẫn công dân cụ thể.";

    if (rawOutput.includes("---COACHING---")) {
      const parts = rawOutput.split("---COACHING---");
      reply = parts[0].trim();
      try {
        const jsonMatch = parts[1].match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[0]);
          if (parsed.sentiment) sentiment = parsed.sentiment;
          if (parsed.coachingTip) coachingTip = parsed.coachingTip;
          if (parsed.suggestedAction) suggestedAction = parsed.suggestedAction;
        }
      } catch (e) {
        // ignore parse error
      }
    }

    res.json({
      reply,
      sentiment,
      coachingTip,
      suggestedAction,
      modelUsed,
    });
  } catch (error: any) {
    console.error("Citizen Turn Error:", error);
    const fallbackResult = getFallbackCitizenTurn(req.body?.scenarioId || "vneid_elderly", req.body?.message || "", []);
    res.json({
      ...fallbackResult,
      modelUsed: "offline-rule-engine",
    });
  }
});

// Citizen Simulation Evaluation Report Endpoint
app.post("/api/citizen-simulation/evaluate", async (req: Request, res: Response) => {
  try {
    const { scenarioId, history = [], customScenario } = req.body;
    const scenario = CITIZEN_SCENARIOS.find((s) => s.id === scenarioId) || customScenario || CITIZEN_SCENARIOS[0];
    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      const evaluation = generateEvaluationReport(scenario, history);
      res.json({ evaluation, modelUsed: "offline-evaluator" });
      return;
    }

    const ai = getAIClient();
    const systemInstruction = `Bạn là Trưởng Ban Giám khảo Hội thi Cán bộ Tiếp công dân Giỏi & Chuyên gia Cải cách Hành chính công tỉnh Gia Lai.
Nhiệm vụ: Chấm điểm và thẩm định kỹ năng giao tiếp tiếp công dân của cán bộ qua đoạn hội thoại thực tế.

TIÊU CHÍ CHẤM ĐIỂM (Thang điểm 100):
1. Thái độ & Văn hóa công vụ (25 điểm): Thực hiện '4 xin, 4 luôn' (xin chào, xin lỗi, xin cảm ơn, xin phép; luôn mỉm cười, luôn nhẹ nhàng, luôn lắng nghe, luôn giúp đỡ).
2. Tính chuẩn xác pháp lý (25 điểm): Căn cứ đúng Nghị định 118/2025/NĐ-CP, Đề án 06, Luật Tiếp công dân, Luật Khiếu nại, mô hình chính quyền 2 cấp tỉnh Gia Lai (135 xã/phường).
3. Kỹ năng xoa dịu xung đột & lắng nghe (25 điểm): Không tranh cãi, không đổ lỗi, biết nhận trách nhiệm khi cơ quan chậm trễ.
4. Hướng dẫn số hóa & chuyển đổi số (25 điểm): Hướng dẫn công dân sử dụng dịch vụ công trực tuyến, VNeID, tự thao tác cho các lần sau.

Định dạng trả về: Duy nhất một chuỗi JSON hợp lệ với cấu trúc:
{
  "overallScore": number (0-100),
  "grade": "Xuất sắc" | "Khá" | "Trung bình" | "Cần rèn luyện thêm",
  "criteriaScores": {
    "attitude": number (0-25),
    "legalKnowledge": number (0-25),
    "deEscalation": number (0-25),
    "digitalGuidance": number (0-25)
  },
  "strengths": string[],
  "improvements": string[],
  "sampleModelAnswer": "Câu thoại mẫu mực lý tưởng nhất cán bộ nên nói trong tình huống này",
  "legalSummary": "Tóm tắt các căn cứ pháp lý áp dụng"
}`;

    const conversationTranscript = history
      .map((t: DialogueTurn) => `${t.role === "user" ? "CÁN BỘ" : "CÔNG DÂN"}: ${t.content}`)
      .join("\n");

    const prompt = `TÌNH HUỐNG: ${scenario.title} (${scenario.citizenName} - ${scenario.location})
TÓM TẮT: ${scenario.summary}
CÁC CĂN CỨ PHÁP LÝ LIÊN QUAN: ${scenario.lawsReferenced.join(", ")}

BIÊN BẢN HỘI THOẠI THỰC TẾ GIỮA CÁN BỘ VÀ CÔNG DÂN:
"""
${conversationTranscript}
"""

Hãy chấm điểm chi tiết và xuất kết quả theo đúng định dạng JSON yêu cầu.`;

    let responseText = "";
    try {
      const resp = await ai.models.generateContent({
        model: "gemini-3.8-flash",
        contents: prompt,
        config: {
          systemInstruction,
          responseMimeType: "application/json",
          temperature: 0.3,
        },
      });
      responseText = resp.text || "";
    } catch (err: any) {
      console.warn("[Citizen Eval] Error calling Gemini, falling back:", err?.message || err);
    }

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        res.json({ evaluation: parsed, modelUsed: "gemini-3.8-flash" });
        return;
      } catch (e) {
        // fallback
      }
    }

    const fallbackEval = generateEvaluationReport(scenario, history);
    res.json({ evaluation: fallbackEval, modelUsed: "offline-evaluator" });
  } catch (error: any) {
    console.error("Evaluation error:", error);
    res.status(500).json({ error: "Lỗi tạo bảng đánh giá tiếp dân." });
  }
});

// Google Earth Engine & Cloud Vision AI Endpoint for Forest & Land Monitoring
app.post("/api/vision-forest-analysis", async (req: Request, res: Response) => {
  try {
    const {
      category = "forest_fire",
      presetId,
      customNote,
      image,
      zoneName = "Gia Lai",
      coordinates,
    } = req.body;

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      const fallbackResult = generateFallbackVisionAnalysis(category, presetId, customNote);
      res.json({ result: fallbackResult, modelUsed: "offline-expert-vision-rule" });
      return;
    }

    const ai = getAIClient();
    const systemInstruction = `Bạn là Chuyên gia Cao cấp về Giám sát Viễn thám Google Earth Engine & Phân tích Thị giác Máy tính (Cloud Vision AI) thuộc Sở Nông nghiệp & Môi trường phối hợp Chi cục Kiểm lâm tỉnh Gia Lai.
Nhiệm vụ của bạn: Phân tích ảnh vệ tinh / flycam / ảnh hiện trường tuần tra rừng và đất đai tại Gia Lai.
Cần xuất ra kết quả phân tích theo cấu trúc JSON chuẩn:
{
  "title": string,
  "zone": string,
  "category": string,
  "riskLevel": "Nguy cấp (Cần xử lý ngay)" | "Cảnh báo cao" | "Bình thường / Ổn định",
  "confidenceScore": number,
  "detectedObjects": [
    { "name": string, "confidence": number, "boundingArea": string }
  ],
  "damageEstimate": {
    "affectedAreaM2": number,
    "severity": string,
    "fireOrLossType": string
  },
  "legalBases": string[],
  "immediateActions": string[],
  "officialReportDraft": string
}`;

    const promptText = `Hãy phân tích tình trạng hiện trường viễn thám / flycam sau đây tại tỉnh Gia Lai:
- Khu vực: ${zoneName}
- Tọa độ: ${coordinates || "Tây Nguyên, Gia Lai"}
- Phân loại nghi vấn: ${category}
- Ghi chú hiện trường: ${customNote || "Không có ghi chú thêm"}
- Mã tình huống preset (nếu có): ${presetId || "none"}

Hãy áp dụng nghiệp vụ kiểm lâm, Luật Lâm nghiệp 2017, Luật Đất đai 2024 và các quy chuẩn PCCC rừng để xuất kết quả JSON chi tiết.`;

    const contents: any[] = [];
    if (image && typeof image === "string" && image.startsWith("data:")) {
      const match = image.match(/^data:(.*?);base64,(.*)$/);
      if (match) {
        contents.push({
          inlineData: {
            mimeType: match[1],
            data: match[2],
          },
        });
      }
    }
    contents.push({ text: promptText });

    let responseText = "";
    for (const modelName of CANDIDATE_MODELS) {
      try {
        const resp = await ai.models.generateContent({
          model: modelName,
          contents: contents.length === 1 ? promptText : contents,
          config: {
            systemInstruction,
            responseMimeType: "application/json",
            temperature: 0.2,
          },
        });
        if (resp.text) {
          responseText = resp.text;
          break;
        }
      } catch (err: any) {
        console.warn(`[Vision AI Analysis] ${modelName} failed:`, err?.message || err);
      }
    }

    if (responseText) {
      try {
        const parsed = JSON.parse(responseText);
        res.json({ result: parsed, modelUsed: "gemini-multimodal-vision" });
        return;
      } catch (e) {
        // fallback
      }
    }

    const fallback = generateFallbackVisionAnalysis(category, presetId, customNote);
    res.json({ result: fallback, modelUsed: "offline-expert-vision-rule" });
  } catch (err: any) {
    console.error("[Vision Analysis Endpoint Error]:", err);
    const fallback = generateFallbackVisionAnalysis(req.body?.category || "forest_fire", req.body?.presetId);
    res.json({ result: fallback, modelUsed: "offline-fallback-safe" });
  }
});

async function startServer() {
  const server = http.createServer(app);

  // Setup WebSocket Server for Gemini Live API
  const wss = new WebSocketServer({ server, path: "/api/live" });

  wss.on("connection", async (clientWs: WebSocket) => {
    console.log("[WebSocket] Client connected to /api/live");
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      clientWs.send(
        JSON.stringify({
          type: "status",
          ready: false,
          message: "Chế độ mô phỏng giọng nói thông minh nội bộ sẵn sàng. Để kích hoạt Gemini Live WebSocket đa phương thức thời gian thực, vui lòng cấu hình GEMINI_API_KEY.",
          isOffline: true,
        })
      );
      return;
    }

    let liveSession: any = null;

    clientWs.on("message", async (rawData) => {
      try {
        const data = JSON.parse(rawData.toString());

        if (data.type === "init") {
          const scenarioId = data.scenarioId || "vneid_elderly";
          const scenario = CITIZEN_SCENARIOS.find((s) => s.id === scenarioId) || CITIZEN_SCENARIOS[0];
          const voiceName = data.voice || "Zephyr";

          try {
            const ai = getAIClient();
            liveSession = await ai.live.connect({
              model: "gemini-3.1-flash-live-preview",
              config: {
                responseModalities: [Modality.AUDIO],
                speechConfig: {
                  voiceConfig: { prebuiltVoiceConfig: { voiceName } },
                },
                systemInstruction: `${scenario.systemPrompt}
QUY TẮC: Bạn là công dân thực tế tại Gia Lai, phản hồi ngắn gọn 2-3 câu thoại bằng tiếng Việt, thể hiện giọng điệu chân thật.`,
                outputAudioTranscription: {},
                inputAudioTranscription: {},
              },
              callbacks: {
                onmessage: (message: LiveServerMessage) => {
                  const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
                  const textPart = message.serverContent?.modelTurn?.parts?.[0]?.text;
                  const transcription = (message as any).serverContent?.outputAudioTranscription?.text;

                  if (audio) {
                    clientWs.send(JSON.stringify({ type: "audio", audio }));
                  }
                  if (transcription || textPart) {
                    clientWs.send(JSON.stringify({ type: "transcription", text: transcription || textPart }));
                  }
                  if (message.serverContent?.interrupted) {
                    clientWs.send(JSON.stringify({ type: "interrupted", interrupted: true }));
                  }
                  if (message.serverContent?.turnComplete) {
                    clientWs.send(JSON.stringify({ type: "turnComplete" }));
                  }
                },
                onclose: () => {
                  console.log("[Gemini Live Session Closed]");
                },
                onerror: (err) => {
                  console.warn("[Gemini Live Session Error]:", err);
                  clientWs.send(JSON.stringify({ type: "error", error: String(err?.message || err) }));
                },
              },
            });

            clientWs.send(
              JSON.stringify({
                type: "ready",
                message: "Đã thiết lập kết nối Gemini Live API Real-time Voice thành công!",
                model: "gemini-3.1-flash-live-preview",
              })
            );
          } catch (connErr: any) {
            console.warn("[Gemini Live Connect Error]:", connErr?.message || connErr);
            clientWs.send(
              JSON.stringify({
                type: "fallback",
                message: "Gemini Live API đang bận hoặc quá tải, chuyển sang chế độ Voice Turn-by-Turn tối ưu.",
                error: connErr?.message,
              })
            );
          }
        } else if (data.type === "audio" && liveSession && data.audio) {
          liveSession.sendRealtimeInput({
            audio: { data: data.audio, mimeType: "audio/pcm;rate=16000" },
          });
        } else if (data.type === "text" && liveSession && data.text) {
          liveSession.sendRealtimeInput({
            text: data.text,
          });
        }
      } catch (err: any) {
        console.error("[WebSocket message processing error]:", err);
      }
    });

    clientWs.on("close", () => {
      if (liveSession && typeof liveSession.close === "function") {
        try {
          liveSession.close();
        } catch (e) {
          // ignore
        }
      }
    });
  });

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

  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server and WebSocket running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
