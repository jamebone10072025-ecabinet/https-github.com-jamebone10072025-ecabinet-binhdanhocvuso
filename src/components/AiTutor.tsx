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
  Globe,
  ExternalLink,
  Search,
} from "lucide-react";
import { getSmartTutorResponse } from "../data/aiKnowledgeBase";

export interface ChatSource {
  title: string;
  uri: string;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  time: string;
  modelUsed?: string;
  sources?: ChatSource[];
  searchQueries?: string[];
  searchGrounded?: boolean;
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
        "Kính chào Quý Anh/Chị! Tôi là Trợ lý Cố vấn Học vụ Số (tích hợp công nghệ Gemini 3.5 Flash với Google Search Grounding). Tôi có khả năng truy vấn dữ liệu web thời gian thực để cung cấp thông tin, văn bản pháp lý và hướng dẫn kỹ năng số mới nhất, bảo vệ dữ liệu cá nhân theo Luật mới và mô hình chính quyền 2 cấp tỉnh Gia Lai (135 xã/phường). Xin mời Quý Anh/Chị gửi câu hỏi!",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      searchGrounded: true,
    },
  ]);

  const [input, setInput] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // Custom chatbot role
  const [selectedRole, setSelectedRole] = useState<ChatRoleType>("hoc_vu_tong_hop");
  // Gemini model selection per requirements:
  // - gemini-3.5-flash: General tasks & Search Grounding (default)
  // - gemini-3.1-flash-lite: Fast response tasks
  // - gemini-3.1-pro-preview: Particularly complex reasoning / legal tasks
  const [selectedModel, setSelectedModel] = useState<GeminiModelChoice>("gemini-3.5-flash");
  const [showConfig, setShowConfig] = useState(false);
  // Google Search Grounding toggle (default true to provide up-to-date accurate info)
  const [useSearchGrounding, setUseSearchGrounding] = useState<boolean>(true);

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
    "Quy định mới nhất về sắp xếp chính quyền 2 cấp tỉnh Gia Lai (bỏ cấp huyện, 135 xã phường)",
    "Giải thích nguyên tắc 'Dữ liệu nào, công cụ đó' theo Luật AI 2025",
    "Cách nhận diện và xử lý cuộc gọi video lừa đảo Deepfake mới nhất",
    "Quy tắc sao lưu 3-2-1 và cách bảo vệ tài liệu mật nội bộ",
    "Mức phạt vi phạm dữ liệu cá nhân theo Luật số 91/2025/QH15",
    "Quy trình nộp hồ sơ trực tuyến qua Cổng DVCQG theo Nghị định 118/2025/NĐ-CP",
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
          useSearchGrounding,
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
              modelUsed: useSearchGrounding ? "gemini-3.5-flash (Google Search)" : selectedModel,
              sources: data.sources || [],
              searchQueries: data.searchQueries || [],
              searchGrounded: Boolean(data.searchGrounded),
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
          "Hội thoại đã được làm mới. Tôi sẵn sàng hỗ trợ Quý Anh/Chị tra cứu văn bản và thông tin mới nhất từ Google Search và cơ sở dữ liệu học vụ số!",
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
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="font-bold text-slate-900 text-base sm:text-lg">
                Trợ lý Cố vấn Học vụ Số (Gemini 3.5 Flash)
              </h3>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-50 text-blue-800 border border-blue-200">
                <Globe className="w-3 h-3 text-blue-600" />
                <span>Google Search Grounding</span>
              </span>
            </div>
            <p className="text-xs text-slate-500">
              Tra cứu dữ liệu thời gian thực từ Google Search • Hỗ trợ 26 chuyên đề, Nghị định 118/2025 & Mô hình 135 xã/phường Gia Lai
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-stretch sm:self-auto justify-end">
          {/* Quick Toggle Google Search Grounding */}
          <button
            type="button"
            onClick={() => setUseSearchGrounding(!useSearchGrounding)}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border text-xs font-semibold cursor-pointer transition-all ${
              useSearchGrounding
                ? "bg-blue-50 border-blue-300 text-blue-800 shadow-2xs"
                : "bg-slate-50 border-slate-200 text-slate-500 hover:text-slate-700"
            }`}
            title="Bật/Tắt tìm kiếm Google thời gian thực"
          >
            <Search className={`w-3.5 h-3.5 ${useSearchGrounding ? "text-blue-600" : "text-slate-400"}`} />
            <span className="hidden sm:inline">Search Grounding:</span>
            <span className={useSearchGrounding ? "text-blue-700 font-bold" : "text-slate-500"}>
              {useSearchGrounding ? "BẬT" : "TẮT"}
            </span>
          </button>

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
                  <span className="text-[10px] text-blue-600 font-semibold block truncate">Google Search</span>
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
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Globe className="w-3 h-3 text-blue-600" />
          <span>Hỏi nhanh:</span>
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-700 whitespace-nowrap transition-all shadow-2xs cursor-pointer text-xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container with Scrollable Thread */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[70vh] sm:h-[560px]">
        {/* Scrollable Thread */}
        <div ref={scrollContainerRef} className="flex-1 p-4 sm:p-6 overflow-y-auto space-y-4">
          {messages.map((m) => {
            const isUser = m.role === "user";
            return (
              <div
                key={m.id}
                className={`flex gap-3 max-w-[92%] sm:max-w-[85%] ${
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
                  className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-3 relative group ${
                    isUser
                      ? "bg-slate-900 text-white rounded-tr-none shadow-sm"
                      : "bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none shadow-2xs"
                  }`}
                >
                  {/* Google Search Grounding Indicator Pill */}
                  {!isUser && m.searchGrounded && (
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-blue-50 border border-blue-200/80 text-blue-800 text-[11px] font-semibold">
                      <Globe className="w-3 h-3 text-blue-600" />
                      <span>Xác thực qua Google Search Grounding</span>
                    </div>
                  )}

                  <div className="whitespace-pre-wrap">{m.content}</div>

                  {/* Web Search Queries executed by Gemini */}
                  {!isUser && m.searchQueries && m.searchQueries.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-1.5">
                      <div className="text-[11px] font-bold text-slate-600 flex items-center gap-1.5">
                        <Search className="w-3 h-3 text-slate-500" />
                        <span>Từ khóa truy vấn Google:</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {m.searchQueries.map((queryText, qIdx) => (
                          <span
                            key={qIdx}
                            className="px-2 py-0.5 rounded bg-slate-200/70 text-slate-700 text-[10px] font-mono"
                          >
                            "{queryText}"
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Grounding Sources / Chunks */}
                  {!isUser && m.sources && m.sources.length > 0 && (
                    <div className="pt-2 border-t border-slate-200/80 space-y-2">
                      <div className="text-[11px] font-bold text-slate-700 flex items-center gap-1.5">
                        <Globe className="w-3.5 h-3.5 text-blue-600" />
                        <span>Nguồn trích dẫn trực tuyến ({m.sources.length}):</span>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
                        {m.sources.map((src, sIdx) => {
                          let hostname = "";
                          try {
                            hostname = new URL(src.uri).hostname.replace("www.", "");
                          } catch {
                            hostname = "trực tuyến";
                          }

                          return (
                            <a
                              key={sIdx}
                              href={src.uri}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50/50 transition-all flex items-start justify-between gap-1.5 text-[11px] text-slate-700 group/link"
                            >
                              <div className="min-w-0 flex-1">
                                <div className="font-semibold text-blue-900 group-hover/link:underline truncate">
                                  {src.title || "Tài liệu trực tuyến"}
                                </div>
                                <div className="text-[10px] text-slate-400 truncate">{hostname}</div>
                              </div>
                              <ExternalLink className="w-3 h-3 text-slate-400 group-hover/link:text-blue-600 shrink-0 mt-0.5" />
                            </a>
                          );
                        })}
                      </div>
                    </div>
                  )}

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
            <div className="flex items-center gap-3 text-xs text-slate-600 italic p-3 bg-blue-50/70 rounded-xl max-w-md border border-blue-200 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
              <div>
                <p className="font-semibold text-blue-900 not-italic">Đang tra cứu dữ liệu thời gian thực với Google Search...</p>
                <p className="text-[11px] text-blue-700">Mô hình gemini-3.5-flash đang tổng hợp và trích dẫn thông tin cập nhật.</p>
              </div>
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
              placeholder="Nhập câu hỏi tra cứu chính sách, nghị định, kỹ năng số (hỗ trợ Google Search)..."
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
            <span className="flex items-center gap-1.5">
              <Globe className="w-3 h-3 text-blue-600" />
              <span>
                Search Grounding: <strong className={useSearchGrounding ? "text-blue-700" : "text-slate-500"}>{useSearchGrounding ? "Đang bật (gemini-3.5-flash)" : "Tắt"}</strong> • Vai trò: <strong>{selectedRole === "hoc_vu_tong_hop" ? "Học vụ tổng hợp" : selectedRole === "an_toan_thong_tin" ? "An toàn thông tin" : "Pháp lý & 2 cấp"}</strong>
              </span>
            </span>
            <span>Nguyên tắc: AI làm nhanh, con người làm chuẩn</span>
          </div>
        </div>
      </div>
    </div>
  );
};
