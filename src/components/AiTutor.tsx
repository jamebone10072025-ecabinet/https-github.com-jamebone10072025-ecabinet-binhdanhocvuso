import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, User, Sparkles, AlertCircle, RefreshCw, Copy, Check } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  time: string;
}

interface AiTutorProps {
  initialPrompt?: string;
}

export const AiTutor: React.FC<AiTutorProps> = ({ initialPrompt }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content:
        "Kính chào Quý Anh/Chị! Tôi là Trợ lý Cố vấn Học vụ Số thuộc chương trình 'Bình dân học vụ số - Quốc hội số' (TS. Trần Văn Khải chủ biên). Tôi sẵn sàng giải đáp thắc mắc về 26 chuyên đề, các luật mới về An ninh mạng, Dữ liệu cá nhân, Trí tuệ nhân tạo, và cách xử lý các tình huống nghiệp vụ công sở.",
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState(initialPrompt || "");
  const [loading, setLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialPrompt) {
      setInput(initialPrompt);
    }
  }, [initialPrompt]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  const quickQuestions = [
    "Giải thích nguyên tắc 'Dữ liệu nào, công cụ đó' theo Luật AI 2025",
    "Cách nhận diện và xử lý cuộc gọi video lừa đảo Deepfake",
    "Quy tắc sao lưu 3-2-1 và cách bảo vệ tài liệu mật",
    "Mức phạt vi phạm dữ liệu cá nhân theo Luật số 91/2025/QH15",
  ];

  const handleSend = async (textToSend?: string) => {
    const query = textToSend || input;
    if (!query.trim() || loading) return;

    const userMsg: Message = {
      role: "user",
      content: query,
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: query }),
      });

      const data = await response.json();
      if (data.reply) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.reply,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      } else if (data.error) {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: `Xin lỗi: ${data.error}`,
            time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          },
        ]);
      }
    } catch (err: any) {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Không thể kết nối đến máy chủ Trợ lý AI. Vui lòng thử lại sau.",
          time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleCopy = (content: string, index: number) => {
    navigator.clipboard.writeText(content);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-4">
      {/* Header Banner */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-sm">
            <Bot className="w-6 h-6 text-amber-300" />
          </div>
          <div>
            <h3 className="font-bold text-slate-900 text-base">
              Trợ lý cố vấn học vụ số
            </h3>
            <p className="text-xs text-slate-500">
              Cố vấn kỹ năng số, giải đáp tình huống công vụ & tra cứu luật chuyên ngành
            </p>
          </div>
        </div>

        <div className="text-[11px] px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 font-medium">
          Mô hình: Gemini 3.1 Flash • Bảo mật phía máy chủ
        </div>
      </div>

      {/* Suggested Quick Questions */}
      <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
        <span className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider shrink-0 mr-1">
          Gợi ý hỏi nhanh:
        </span>
        {quickQuestions.map((q, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(q)}
            className="px-3 py-1.5 rounded-full bg-white border border-slate-200 text-slate-700 hover:border-red-300 hover:text-red-700 whitespace-nowrap transition-all shadow-2xs"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Chat Messages Container */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[520px]">
        <div className="flex-1 p-5 overflow-y-auto space-y-4">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 max-w-[88%] ${
                m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
              }`}
            >
              <div
                className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-white text-xs ${
                  m.role === "user" ? "bg-slate-800" : "bg-red-800 ring-2 ring-red-100"
                }`}
              >
                {m.role === "user" ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4 text-amber-300" />}
              </div>

              <div
                className={`p-4 rounded-2xl text-xs sm:text-sm leading-relaxed space-y-2 relative group ${
                  m.role === "user"
                    ? "bg-slate-900 text-white rounded-tr-none"
                    : "bg-slate-50 border border-slate-200/90 text-slate-800 rounded-tl-none"
                }`}
              >
                <div className="whitespace-pre-wrap">{m.content}</div>

                <div className="flex items-center justify-between gap-4 text-[10px] opacity-60 pt-1 border-t border-black/5">
                  <span>{m.time}</span>
                  {m.role === "assistant" && (
                    <button
                      onClick={() => handleCopy(m.content, idx)}
                      className="opacity-0 group-hover:opacity-100 hover:text-red-700 transition-opacity flex items-center gap-1"
                    >
                      {copiedIndex === idx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                      <span>{copiedIndex === idx ? "Đã chép" : "Sao chép"}</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}

          {loading && (
            <div className="flex items-center gap-3 text-xs text-slate-500 italic p-3 bg-slate-50 rounded-xl max-w-xs border border-slate-100 animate-pulse">
              <RefreshCw className="w-4 h-4 animate-spin text-red-600" />
              <span>Trợ lý đang đối chiếu dữ liệu chuyên đề...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-3 bg-slate-50 border-t border-slate-200">
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
              placeholder="Hỏi về 26 chuyên đề, tình huống an toàn thông tin, quy định bảo vệ dữ liệu..."
              className="flex-1 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600"
            />
            <button
              id="ai-tutor-send-btn"
              type="submit"
              disabled={!input.trim() || loading}
              className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 text-white text-xs font-bold flex items-center gap-1.5 shadow-xs transition-colors"
            >
              <span>Gửi</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
          <div className="text-[10px] text-slate-400 text-center pt-2">
            Nguyên tắc cốt lõi: AI làm nhanh, con người làm chuẩn. Mọi tư vấn cần được đối chiếu với quy định chính thức.
          </div>
        </div>
      </div>
    </div>
  );
};
