import React, { useState, useRef, useEffect } from "react";
import {
  Bot,
  Send,
  User,
  Sparkles,
  RefreshCw,
  Copy,
  Check,
  Shield,
  Scale,
  Zap,
  Trash2,
  SlidersHorizontal,
} from "lucide-react";
import { getSmartTutorResponse } from "../data/aiKnowledgeBase";

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  modelUsed?: string;
}

export type ChatRoleType = "hoc_vu_tong_hop" | "an_toan_thong_tin" | "phap_ly_cong_vu";
export type GeminiModelChoice = "gemini-3.5-flash" | "gemini-3.1-flash-lite" | "gemini-3.1-pro-preview";

interface AiTutorProps {
  initialPrompt?: string;
}

export const AiTutor: React.FC<AiTutorProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "intro-1",
      role: "assistant",
      content:
        "Kính chào Quý Anh/Chị! Tôi là Trợ lý Cố vấn Học vụ Số (tích hợp công nghệ Gemini đa lượt hội thoại). Tôi có thể nhớ lịch sử trao đổi, hỗ trợ giải đáp 26 chuyên đề kỹ năng số, an toàn thông tin, bảo vệ dữ liệu cá nhân theo Luật mới và mô hình chính quyền 2 cấp tỉnh Gia Lai (135 xã/phường). Xin mời Quý Anh/Chị gửi câu hỏi!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);

  const [input, setInput] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom chatbot role
  const [selectedRole, setSelectedRole] = useState<ChatRoleType>("hoc_vu_tong_hop");
  // Gemini model selection per requirements:
  // - gemini-3.5-flash: General tasks (default)
  // - gemini-3.1-flash-lite: Fast response tasks
  // - gemini-3.1-pro-preview: Particularly complex reasoning / legal tasks
  const [selectedModel, setSelectedModel] = useState<GeminiModelChoice>("gemini-3.5-flash");
  const [showConfig, setShowConfig] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickQuestions = [
    "Mô hình chính quyền 2 cấp tỉnh Gia Lai (bỏ cấp huyện, 135 xã phường) vận hành thế nào?",
    "Giải thích nguyên tắc 'Dữ liệu nào, công cụ đó' theo Luật AI 2025",
    "Cách nhận diện và xử lý cuộc gọi video lừa đảo Deepfake",
    "Quy tắc sao lưu 3-2-1 và cách bảo vệ tài liệu mật",
    "Mức phạt vi phạm dữ liệu cá nhân theo Luật số 91/2025/QH15",
    "Học 26 chuyên đề Bình dân học vụ số theo lộ trình nào hiệu quả nhất?",
  ];

  const handleSend = async (textToSend?: string) => {
    const query = (textToSend || input).trim();
    if (!query || loading) return;

    const userMsgId = `user-${Date.now()}`;
    const userMsg: ChatMessage = {
      id: userMsgId,
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    // Keep conversation history (exclude initial system greetings if any)
    const historyPayload = messages
      .slice(-10) // maintain last 10 turns for token balance
      .map((m) => ({
        role: m.role,
        content: m.content,
      }));

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: query,
          history: historyPayload,
          model: selectedModel,
          role: selectedRole,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.reply) {
          setMessages((prev) => [
            ...prev,
            {
              id: `assistant-${Date.now()}`,
              role: "assistant",
              content: data.reply,
              time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
              modelUsed: selectedModel,
            },
          ]);
          return;
        }
      }

      // Fallback if network or server issue
      const localReply = getSmartTutorResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: localReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          modelUsed: "Offline Knowledge Base",
        },
      ]);
    } catch (_err) {
      const localReply = getSmartTutorResponse(query);
      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: "assistant",
          content: localReply,
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          modelUsed: "Offline Knowledge Base",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, id: string) => {
    navigator.clipboard.writeText(content);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearHistory = () => {
    setMessages([
      {
        id: "intro-reset",
        role: "assistant",
        content:
          "Hội thoại đã được làm mới. Tôi sẵn sàng hỗ trợ Quý Anh/Chị các câu hỏi mới về chương trình Bình dân học vụ số và công vụ tỉnh Gia Lai!",
        time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      },
    ]);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header Banner with Bot Role & Model Info */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-red-800 to-rose-950 text-white flex items-center justify-center shadow-sm shrink-0">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Trợ lý Cố vấn Học vụ Số (Gemini AI Multi-turn)
              </h3>
              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-900 border border-amber-300">
                Đa lượt
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Ghi nhớ ngữ cảnh trao đổi liên tục • Hỗ trợ 26 chuyên đề, Luật mới & Mô hình 135 xã/phường Gia Lai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          <button
            onClick={() => setShowConfig(!showConfig)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-colors ${
              showConfig
                ? "bg-red-50 border-red-300 text-red-800"
                : "bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700"
            }`}
            title="Tùy chỉnh vai trò chatbot & Mô hình Gemini"
          >
            <SlidersHorizontal className="w-3.5 h-3.5 text-red-700" />
            <span>Cấu hình AI</span>
          </button>

          <button
            onClick={handleClearHistory}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-700 text-xs font-medium cursor-pointer transition-colors"
            title="Xóa lịch sử hội thoại để bắt đầu phiên mới"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Làm mới</span>
          </button>
        </div>
      </div>

      {/* Role & Model Selection Drawer */}
      {showConfig && (
        <div className="bg-slate-50 rounded-2xl border border-slate-200 p-4 space-y-4 shadow-2xs">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Specific Chatbot Role */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" />
                <span>Vai trò chuyên trách của Chatbot (System Role):</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedRole("hoc_vu_tong_hop")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedRole === "hoc_vu_tong_hop"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <Bot className="w-3.5 h-3.5 mb-1 text-red-700" />
                  <div className="truncate">Tổng hợp</div>
                  <div className="text-[10px] text-slate-400 font-normal truncate">26 Chuyên đề</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("an_toan_thong_tin")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedRole === "an_toan_thong_tin"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <Shield className="w-3.5 h-3.5 mb-1 text-emerald-700" />
                  <div className="truncate">An toàn số</div>
                  <div className="text-[10px] text-slate-400 font-normal truncate">Mã độc & Sao lưu</div>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole("phap_ly_cong_vu")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedRole === "phap_ly_cong_vu"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <Scale className="w-3.5 h-3.5 mb-1 text-amber-700" />
                  <div className="truncate">Pháp lý & 2 cấp</div>
                  <div className="text-[10px] text-slate-400 font-normal truncate">Luật AI, 135 xã</div>
                </button>
              </div>
            </div>

            {/* Model Selection */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-red-600" />
                <span>Chọn Mô hình Gemini (Server-side API):</span>
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini-3.5-flash")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedModel === "gemini-3.5-flash"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <span className="block truncate">3.5 Flash</span>
                  <span className="text-[10px] text-slate-400 font-normal block truncate">Đa năng tiêu chuẩn</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini-3.1-flash-lite")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedModel === "gemini-3.1-flash-lite"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <span className="block truncate">3.1 Flash-Lite</span>
                  <span className="text-[10px] text-slate-400 font-normal block truncate">Phản hồi siêu tốc</span>
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedModel("gemini-3.1-pro-preview")}
                  className={`p-2 rounded-lg border text-left text-xs transition-all cursor-pointer ${
                    selectedModel === "gemini-3.1-pro-preview"
                      ? "bg-white border-red-500 shadow-2xs text-red-900 font-bold"
                      : "bg-white/60 border-slate-200 text-slate-600 hover:bg-white"
                  }`}
                >
                  <span className="block truncate">3.1 Pro Preview</span>
                  <span className="text-[10px] text-slate-400 font-normal block truncate">Tác vụ suy luận sâu</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          Gợi ý hỏi nhanh:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-700 whitespace-nowrap transition-all shadow-2xs cursor-pointer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container with Scrollable Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[540px]">
        {/* Scrollable Thread */}
        <div ref={scrollContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[90%] sm:max-w-[85%] ${
                  isUser ? "ml-auto flex-row-reverse" : "mr-auto"
                }`}
              >
                <div
                  className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 text-white text-xs shadow-2xs ${
                    isUser ? "bg-slate-800" : "bg-red-800 ring-2 ring-red-100"
                  }`}
                >
                  {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
                </div>

                <div
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                    isUser
                      ? "bg-slate-900 text-white rounded-tr-none shadow-sm"
                      : "bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs"
                  }`}
                >
                  <div className="whitespace-pre-wrap">{m.content}</div>

                  <div className="flex items-center justify-between gap-4 text-[10px] opacity-60 pt-1 border-t border-black/5">
                    <div className="flex items-center gap-2">
                      <span>{m.time}</span>
                      {m.modelUsed && (
                        <span className="px-1.5 py-0.2 bg-black/10 rounded-sm text-[9px]">
                          {m.modelUsed}
                        </span>
                      )}
                    </div>
                    {!isUser && (
                      <button
                        onClick={() => handleCopy(m.content, m.id)}
                        className="opacity-0 group-hover:opacity-100 hover:text-red-700 transition-opacity flex items-center gap-1 cursor-pointer"
                      >
                        {copiedId === m.id ? (
                          <Check className="w-3 h-3 text-emerald-600" />
                        ) : (
                          <Copy className="w-3 h-3" />
                        )}
                        <span>{copiedId === m.id ? "Đã chép" : "Sao chép"}</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-slate-600 italic p-3 bg-red-50/60 rounded-xl max-w-sm border border-red-100 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
              <span>Trợ lý Gemini đang phân tích ngữ cảnh hội thoại...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 sm:p-4 bg-slate-50 border-t border-slate-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2"
          >
            <input
              id="ai-tutor-input"
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Nhập câu hỏi tiếp nối (AI nhớ lịch sử trao đổi bên trên)..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600 shadow-2xs"
            />
            <button
              id="ai-tutor-send-btn"
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-xs transition-colors cursor-pointer"
            >
              <span>Gửi</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>

          <div className="flex flex-wrap items-center justify-between gap-2 text-[10px] text-slate-400 pt-2">
            <span>
              Chế độ: <strong>{selectedRole === "hoc_vu_tong_hop" ? "Học vụ tổng hợp" : selectedRole === "an_toan_thong_tin" ? "An toàn thông tin" : "Pháp lý & 2 cấp"}</strong> • Mô hình: <strong>{selectedModel}</strong>
            </span>
            <span>Nguyên tắc: AI làm nhanh, con người làm chuẩn</span>
          </div>
        </div>
      </div>
    </div>
  );
};
