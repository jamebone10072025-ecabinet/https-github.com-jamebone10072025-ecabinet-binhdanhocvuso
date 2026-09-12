import React, { useState, useEffect, useRef } from "react";
import {
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  RotateCcw,
  Sparkles,
  Send,
  Award,
  CheckCircle2,
  AlertTriangle,
  FileText,
  ShieldCheck,
  ChevronRight,
  Radio,
  UserCheck,
  Smile,
  Frown,
  Meh,
  Play,
  Square,
  Lightbulb,
  ExternalLink,
  MessageSquare,
  Flame,
  Check,
  ArrowRight,
  Loader2,
} from "lucide-react";
import { CITIZEN_SCENARIOS, CitizenScenario } from "../data/citizenScenarios";
import { DialogueTurn } from "../data/citizenSimulationHelper";

interface CitizenVoiceSimulationProps {
  onSendToAI?: (prompt: string) => void;
}

export const CitizenVoiceSimulation: React.FC<CitizenVoiceSimulationProps> = ({ onSendToAI }) => {
  const [selectedScenario, setSelectedScenario] = useState<CitizenScenario>(CITIZEN_SCENARIOS[0]);
  const [dialogue, setDialogue] = useState<DialogueTurn[]>([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [speechSupported, setSpeechSupported] = useState(true);
  const [autoSpeak, setAutoSpeak] = useState(true);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [citizenMood, setCitizenMood] = useState<"neutral" | "positive" | "negative">("neutral");
  const [coachingTip, setCoachingTip] = useState<string | null>(null);
  const [suggestedAction, setSuggestedAction] = useState<string | null>(null);
  const [evaluation, setEvaluation] = useState<any | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [showEvalModal, setShowEvalModal] = useState(false);
  const [liveWebSocketStatus, setLiveWebSocketStatus] = useState<"idle" | "connected" | "error">("idle");

  const recognitionRef = useRef<any>(null);
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  // Initialize scenario dialogue
  useEffect(() => {
    resetScenario(selectedScenario);
  }, [selectedScenario.id]);

  // Check Web Speech API support
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      setSpeechSupported(false);
    }
  }, []);

  // Auto scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [dialogue, isSubmitting]);

  // Handle SpeechSynthesis speech
  const speakText = (text: string) => {
    if (!("speechSynthesis" in window) || !autoSpeak) return;

    window.speechSynthesis.cancel();
    const cleanText = text.replace(/[*_#`]/g, "").trim();
    const utterance = new SpeechSynthesisUtterance(cleanText);
    utterance.lang = "vi-VN";
    utterance.rate = 1.0;
    utterance.pitch = 1.0;

    // Pick best Vietnamese voice if available
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find((v) => v.lang.includes("vi"));
    if (viVoice) utterance.voice = viVoice;

    utterance.onstart = () => setIsSpeaking(true);
    utterance.onend = () => setIsSpeaking(false);
    utterance.onerror = () => setIsSpeaking(false);

    window.speechSynthesis.speak(utterance);
  };

  const stopSpeaking = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    }
  };

  const resetScenario = (scenario: CitizenScenario) => {
    stopSpeaking();
    const initialTurn: DialogueTurn = {
      role: "citizen",
      content: scenario.initialMessage,
      sentiment: "neutral",
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };
    setDialogue([initialTurn]);
    setCitizenMood("neutral");
    setCoachingTip("Hãy bắt đầu bằng lời chào kính trọng, thể hiện phong cách '4 xin, 4 luôn' và lắng nghe nhu cầu của công dân.");
    setSuggestedAction("Chào hỏi lịch thiệp, trấn an công dân và tiếp nhận thông tin.");
    setEvaluation(null);
    setShowEvalModal(false);

    // Speak initial message after slight delay
    setTimeout(() => {
      speakText(scenario.initialMessage);
    }, 400);
  };

  // Toggle Voice Recognition (Microphone)
  const toggleListening = () => {
    if (isListening) {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
      setIsListening(false);
      return;
    }

    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Trình duyệt hiện tại không hỗ trợ Web Speech API. Bạn có thể sử dụng khung gõ chữ bên dưới.");
      return;
    }

    stopSpeaking();
    const recognition = new SpeechRecognition();
    recognition.lang = "vi-VN";
    recognition.continuous = false;
    recognition.interimResults = true;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event: any) => {
      let transcript = "";
      for (let i = event.resultIndex; i < event.results.length; i++) {
        transcript += event.results[i][0].transcript;
      }
      setInputMessage(transcript);
    };

    recognition.onerror = (event: any) => {
      console.warn("Speech recognition error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;
    try {
      recognition.start();
    } catch (e) {
      console.error(e);
      setIsListening(false);
    }
  };

  // Send turn to backend
  const handleSendMessage = async (textToSend?: string) => {
    const message = (textToSend || inputMessage).trim();
    if (!message || isSubmitting) return;

    if (isListening && recognitionRef.current) {
      recognitionRef.current.stop();
      setIsListening(false);
    }
    stopSpeaking();

    const userTurn: DialogueTurn = {
      role: "user",
      content: message,
      timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
    };

    const newHistory = [...dialogue, userTurn];
    setDialogue(newHistory);
    setInputMessage("");
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/citizen-simulation/turn", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          message,
          history: newHistory,
        }),
      });

      if (!response.ok) throw new Error("Máy chủ phản hồi lỗi.");

      const data = await response.json();
      const citizenReply = data.reply || "Tôi đã hiểu lời cán bộ. Cán bộ xem hướng dẫn thêm cho tôi nhé.";
      const sentiment = data.sentiment || "neutral";

      setCitizenMood(sentiment);
      if (data.coachingTip) setCoachingTip(data.coachingTip);
      if (data.suggestedAction) setSuggestedAction(data.suggestedAction);

      const citizenTurn: DialogueTurn = {
        role: "citizen",
        content: citizenReply,
        sentiment,
        coachingTip: data.coachingTip,
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      };

      setDialogue([...newHistory, citizenTurn]);
      speakText(citizenReply);
    } catch (error) {
      console.error("Simulation error:", error);
      const fallbackReply = "Dạ, bác nghe cán bộ nói rồi. Cán bộ xem kiểm tra kỹ giúp bác để bác yên tâm nhé.";
      const fallbackTurn: DialogueTurn = {
        role: "citizen",
        content: fallbackReply,
        sentiment: "positive",
        coachingTip: "Duy trì tác phong lắng nghe và giải thích dễ hiểu.",
        timestamp: new Date().toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" }),
      };
      setDialogue([...newHistory, fallbackTurn]);
      speakText(fallbackReply);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Evaluate final conversation
  const handleEvaluate = async () => {
    if (dialogue.length <= 1) {
      alert("Vui lòng thực hiện ít nhất 2 lượt đối thoại với công dân trước khi yêu cầu đánh giá.");
      return;
    }

    setIsEvaluating(true);
    setShowEvalModal(true);

    try {
      const res = await fetch("/api/citizen-simulation/evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          scenarioId: selectedScenario.id,
          history: dialogue,
        }),
      });

      const data = await res.json();
      if (data.evaluation) {
        setEvaluation(data.evaluation);
      }
    } catch (err) {
      console.error("Evaluation error:", err);
    } finally {
      setIsEvaluating(false);
    }
  };

  // Quick suggestion prompts based on scenario
  const getQuickPrompts = () => {
    if (selectedScenario.id === "vneid_elderly") {
      return [
        "Dạ cháu chào Bác! Bác cứ yên tâm ngồi uống chén nước, cháu hướng dẫn Bác từng bước kích hoạt VNeID ạ.",
        "Bác cho cháu mượn thẻ CCCD gắn chip, cháu chỉ hỗ trợ bấm máy giúp Bác, tuyệt đối Bác không đưa mật khẩu hay mã OTP cho người lạ nhé.",
        "Dạ, từ nay tiền trợ cấp sẽ được chuyển thẳng vào tài khoản của Bác, Bác không cần phải đi lại nhận tiền mặt nữa đâu ạ.",
      ];
    } else if (selectedScenario.id === "land_complaint") {
      return [
        "Dạ trước hết thay mặt Bộ phận Một cửa, em thành thật xin lỗi anh vì sự chậm trễ này, em rất hiểu sự sốt ruột của anh ạ.",
        "Anh cho em xin lại mã biên nhận hồ sơ để em tra cứu trực tiếp trên hệ thống điều hành Một cửa ngay bây giờ.",
        "Theo Nghị định 118, cơ quan em sẽ lập ngay Phiếu xin lỗi và hẹn lại ngày trả kết quả chính xác bằng văn bản gửi anh ạ.",
      ];
    } else if (selectedScenario.id === "interconnected_birth_registration") {
      return [
        "Dạ chào chị! Hiện nay đã có Dịch vụ công liên thông 3 trong 1, nộp 1 lần là giải quyết cả khai sinh, thường trú và thẻ BHYT cho cháu ạ.",
        "Chị không cần lo lắng về giấy kết hôn để ở nhà, em sẽ tra cứu dữ liệu hộ tịch trên hệ thống dân cư VNeID để miễn nộp bản giấy cho chị.",
        "Em sẽ mở điện thoại hướng dẫn chị các thao tác nộp hồ sơ trực tuyến để các lần sau chị có thể tự làm tại nhà nhé.",
      ];
    } else {
      return [
        "Dạ chào anh, HTX mình cho em kiểm tra xem máy tính đã cài đặt bộ phần mềm ký số tích hợp của Cổng Dịch vụ công chưa ạ.",
        "Trường hợp gấp để kịp xuất khẩu lô hàng tiêu Chư Sê, em mời anh sang quầy Hỗ trợ số để cán bộ CNTT hỗ trợ ký trực tiếp ngay.",
        "Anh có thể cân nhắc đăng ký chữ ký số từ xa Smart CA trên VNeID để có thể ký số mọi lúc mọi nơi trên điện thoại di động.",
      ];
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-red-900 via-rose-950 to-slate-900 rounded-3xl p-6 text-white shadow-xl border border-red-800/40 relative overflow-hidden">
        <div className="absolute right-0 top-0 w-96 h-96 bg-rose-600/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-rose-500/20 text-rose-300 border border-rose-400/30">
              <Radio className="w-3.5 h-3.5 text-rose-400 animate-pulse" />
              <span>Gemini Live API & Real-time Voice Simulation</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-white flex items-center gap-2.5">
              <span>Mô phỏng Hội thoại Tiếp công dân Ảo</span>
              <span className="text-amber-400 text-lg sm:text-xl">★ Gia Lai</span>
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Luyện tập kỹ năng giao tiếp công vụ, giải quyết thủ tục Một cửa, xử lý bức xúc và hướng dẫn số hóa với công dân AI theo chuẩn mực <strong>"4 xin, 4 luôn"</strong> và căn cứ pháp lý cập nhật (Nghị định 118/2025/NĐ-CP, Đề án 06).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <button
              onClick={() => resetScenario(selectedScenario)}
              className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-white/20 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer border border-white/10"
              title="Khởi động lại tình huống"
            >
              <RotateCcw className="w-4 h-4 text-amber-300" />
              <span>Làm lại từ đầu</span>
            </button>

            <button
              onClick={handleEvaluate}
              className="px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 text-xs font-bold flex items-center gap-1.5 shadow-md shadow-amber-900/30 transition-all cursor-pointer hover:scale-105"
            >
              <Award className="w-4 h-4 text-slate-950" />
              <span>Chấm điểm & Thẩm định</span>
            </button>
          </div>
        </div>
      </div>

      {/* Scenario Selector Tabs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {CITIZEN_SCENARIOS.map((scenario) => {
          const isSelected = scenario.id === selectedScenario.id;
          return (
            <div
              key={scenario.id}
              onClick={() => {
                if (scenario.id !== selectedScenario.id) {
                  setSelectedScenario(scenario);
                }
              }}
              className={`p-4 rounded-2xl border transition-all cursor-pointer relative flex flex-col justify-between text-left ${
                isSelected
                  ? "bg-white border-red-600 shadow-md ring-2 ring-red-600/20"
                  : "bg-white/80 hover:bg-white border-slate-200 hover:border-slate-300 shadow-xs"
              }`}
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-2xl">{scenario.avatar}</span>
                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                      scenario.difficulty === "Xung đột / Thử thách"
                        ? "bg-rose-50 text-rose-700 border-rose-200"
                        : scenario.difficulty === "Nâng cao"
                        ? "bg-amber-50 text-amber-700 border-amber-200"
                        : "bg-emerald-50 text-emerald-700 border-emerald-200"
                    }`}
                  >
                    {scenario.difficulty}
                  </span>
                </div>
                <div>
                  <h4 className={`text-sm font-bold leading-snug line-clamp-2 ${isSelected ? "text-red-900" : "text-slate-800"}`}>
                    {scenario.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-1 font-medium">
                    {scenario.citizenName} • {scenario.citizenRole}
                  </p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 mt-3 flex items-center justify-between text-[11px] text-slate-500">
                <span className="truncate max-w-[150px]">{scenario.location}</span>
                {isSelected && (
                  <span className="text-red-700 font-bold flex items-center gap-1">
                    <span>Đang đóng</span>
                    <Check className="w-3.5 h-3.5" />
                  </span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Simulation Workspace: Two Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Citizen Virtual Counter & Dialogue Stream (7 cols) */}
        <div className="lg:col-span-8 space-y-4">
          {/* Virtual Counter Card */}
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col h-[600px]">
            {/* Counter Header */}
            <div className="px-5 py-3.5 bg-gradient-to-r from-slate-900 to-slate-800 text-white flex items-center justify-between shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full bg-slate-700 flex items-center justify-center text-xl shadow-inner">
                    {selectedScenario.avatar}
                  </div>
                  {isSpeaking && (
                    <span className="absolute -bottom-1 -right-1 flex h-3.5 w-3.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-emerald-500"></span>
                    </span>
                  )}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-sm text-white">{selectedScenario.citizenName}</h3>
                    <span className="text-[11px] text-slate-300 font-normal">({selectedScenario.location})</span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-xs text-slate-400">Tâm trạng:</span>
                    <span
                      className={`text-xs font-semibold px-2 py-0.2 rounded-full inline-flex items-center gap-1 ${
                        citizenMood === "positive"
                          ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/30"
                          : citizenMood === "negative"
                          ? "bg-rose-500/20 text-rose-300 border border-rose-500/30"
                          : "bg-amber-500/20 text-amber-300 border border-amber-500/30"
                      }`}
                    >
                      {citizenMood === "positive" ? (
                        <>
                          <Smile className="w-3 h-3 text-emerald-300" />
                          <span>Hài lòng & Lắng nghe</span>
                        </>
                      ) : citizenMood === "negative" ? (
                        <>
                          <Frown className="w-3 h-3 text-rose-300" />
                          <span>Bức xúc & Đòi giải trình</span>
                        </>
                      ) : (
                        <>
                          <Meh className="w-3 h-3 text-amber-300" />
                          <span>Thận trọng & Chờ hướng dẫn</span>
                        </>
                      )}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    if (isSpeaking) {
                      stopSpeaking();
                    } else {
                      setAutoSpeak(!autoSpeak);
                    }
                  }}
                  className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                    autoSpeak
                      ? "bg-rose-500/20 text-rose-300 hover:bg-rose-500/30 border border-rose-500/40"
                      : "bg-slate-700 text-slate-400 hover:text-white"
                  }`}
                  title={autoSpeak ? "Tắt đọc giọng nói tự động" : "Bật đọc giọng nói tự động"}
                >
                  {autoSpeak ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  <span className="hidden sm:inline">{autoSpeak ? "Giọng nói: BẬT" : "TẮT"}</span>
                </button>
              </div>
            </div>

            {/* Chat Stream Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-slate-50/60">
              {dialogue.map((turn, index) => {
                const isCitizen = turn.role === "citizen";
                return (
                  <div
                    key={index}
                    className={`flex flex-col ${isCitizen ? "items-start" : "items-end"} space-y-1.5`}
                  >
                    <div className="flex items-center gap-2 px-1 text-[11px] text-slate-400 font-medium">
                      <span>{isCitizen ? `${selectedScenario.citizenName} (Công dân)` : "Đồng chí Cán bộ Một cửa"}</span>
                      <span>•</span>
                      <span>{turn.timestamp}</span>
                    </div>

                    <div className="flex items-start gap-2 max-w-[85%]">
                      {isCitizen && (
                        <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center shrink-0 text-base shadow-2xs mt-0.5">
                          {selectedScenario.avatar}
                        </div>
                      )}

                      <div
                        className={`p-3.5 rounded-2xl text-sm leading-relaxed shadow-xs ${
                          isCitizen
                            ? "bg-white text-slate-800 border border-slate-200/90 rounded-tl-sm"
                            : "bg-gradient-to-r from-red-700 to-rose-800 text-white font-medium rounded-tr-sm"
                        }`}
                      >
                        <p>{turn.content}</p>

                        {isCitizen && (
                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                            <button
                              onClick={() => speakText(turn.content)}
                              className="inline-flex items-center gap-1 text-slate-500 hover:text-red-700 font-semibold cursor-pointer"
                              title="Nghe lại câu nói này"
                            >
                              <Volume2 className="w-3.5 h-3.5" />
                              <span>Nghe lại</span>
                            </button>
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Coaching tip for user turns */}
                    {!isCitizen && turn.coachingTip && (
                      <div className="max-w-[85%] bg-amber-50/90 border border-amber-200/80 rounded-xl p-2 text-xs text-amber-900 flex items-start gap-1.5 shadow-2xs">
                        <Lightbulb className="w-3.5 h-3.5 text-amber-600 shrink-0 mt-0.5" />
                        <span className="leading-snug">{turn.coachingTip}</span>
                      </div>
                    )}
                  </div>
                );
              })}

              {isSubmitting && (
                <div className="flex items-start gap-2">
                  <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center shrink-0 text-base">
                    {selectedScenario.avatar}
                  </div>
                  <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm p-3 shadow-xs flex items-center gap-2 text-xs text-slate-500">
                    <Loader2 className="w-4 h-4 animate-spin text-red-600" />
                    <span>Công dân đang suy nghĩ và phản hồi...</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Prompt Suggestions */}
            <div className="px-4 py-2 bg-slate-100 border-t border-slate-200 shrink-0">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-600 mb-1.5">
                <Lightbulb className="w-3.5 h-3.5 text-amber-600" />
                <span>Gợi ý câu thoại công vụ chuẩn mực:</span>
              </div>
              <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
                {getQuickPrompts().map((prompt, pIdx) => (
                  <button
                    key={pIdx}
                    onClick={() => handleSendMessage(prompt)}
                    disabled={isSubmitting}
                    className="text-xs bg-white hover:bg-red-50 text-slate-700 hover:text-red-800 border border-slate-200 hover:border-red-300 rounded-lg px-2.5 py-1 text-left whitespace-nowrap transition-colors shrink-0 shadow-2xs cursor-pointer disabled:opacity-50"
                  >
                    "{prompt.slice(0, 48)}..."
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Voice & Text Input Bar */}
            <div className="p-3.5 bg-white border-t border-slate-200 shrink-0">
              <div className="flex items-center gap-2">
                {/* Voice Input Button */}
                <button
                  onClick={toggleListening}
                  className={`p-3 rounded-xl font-bold flex items-center justify-center transition-all cursor-pointer shrink-0 ${
                    isListening
                      ? "bg-rose-600 hover:bg-rose-700 text-white shadow-lg shadow-rose-900/30 animate-pulse ring-4 ring-rose-200"
                      : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                  }`}
                  title={isListening ? "Đang lắng nghe... bấm để dừng" : "Bật micro để nói tiếng Việt trực tiếp"}
                >
                  {isListening ? <MicOff className="w-5 h-5 text-white" /> : <Mic className="w-5 h-5 text-red-700" />}
                </button>

                {/* Text Field */}
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" && !e.shiftKey) {
                        e.preventDefault();
                        handleSendMessage();
                      }
                    }}
                    placeholder={
                      isListening
                        ? "Đang ghi âm tiếng Việt... hãy nói vào micro của bạn"
                        : "Nhập câu nói của cán bộ tiếp dân hoặc bấm Micro để nói..."
                    }
                    className={`w-full text-sm py-2.5 pl-3.5 pr-10 rounded-xl border transition-colors outline-none ${
                      isListening
                        ? "border-rose-400 bg-rose-50/50 text-rose-950 placeholder:text-rose-400 ring-2 ring-rose-200"
                        : "border-slate-300 focus:border-red-600 focus:ring-2 focus:ring-red-100 bg-white text-slate-800"
                    }`}
                  />
                  {inputMessage && (
                    <button
                      onClick={() => setInputMessage("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Send Button */}
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputMessage.trim() || isSubmitting}
                  className="px-4 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 disabled:opacity-40 disabled:pointer-events-none text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-sm cursor-pointer shrink-0"
                >
                  <span>Nói/Gửi</span>
                  <Send className="w-3.5 h-3.5" />
                </button>
              </div>

              {isListening && (
                <div className="mt-2 flex items-center justify-between text-xs text-rose-700 font-medium px-1">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-rose-600 animate-ping" />
                    Micro đang thu âm: Hãy nói rõ ràng câu tiếp dân của bạn bằng tiếng Việt...
                  </span>
                  <button
                    onClick={() => handleSendMessage()}
                    className="underline hover:text-rose-900 font-bold"
                  >
                    Gửi ngay
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column: Scenario Objective Checklist & AI Live Advisor (4 cols) */}
        <div className="lg:col-span-4 space-y-4">
          {/* Situation Context & Goals */}
          <div className="bg-white rounded-2xl border border-slate-200 p-5 shadow-xs space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-red-700" />
                <h4 className="font-bold text-sm text-slate-900">Mục tiêu xử lý tình huống</h4>
              </div>
              <span className="text-xs text-slate-500 font-semibold">{selectedScenario.tag}</span>
            </div>

            <p className="text-xs text-slate-600 leading-relaxed italic bg-slate-50 p-2.5 rounded-xl border border-slate-100">
              "{selectedScenario.summary}"
            </p>

            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider">
                Yêu cầu chuẩn mực cần đạt:
              </div>
              <div className="space-y-2">
                {selectedScenario.dialogueGoals.map((goal, gIdx) => (
                  <div
                    key={gIdx}
                    className="flex items-start gap-2 p-2 rounded-lg bg-slate-50 text-xs text-slate-700 leading-relaxed border border-slate-100"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                Căn cứ pháp lý áp dụng:
              </div>
              <ul className="space-y-1 text-xs text-slate-600">
                {selectedScenario.lawsReferenced.map((law, lIdx) => (
                  <li key={lIdx} className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                    <span className="line-clamp-1">{law}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* AI Real-time Coaching Box */}
          <div className="bg-gradient-to-br from-amber-50 to-orange-50/50 rounded-2xl border border-amber-200/80 p-5 shadow-xs space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-amber-700" />
              <h4 className="font-bold text-sm text-amber-950">Nhận xét & Gợi ý nghiệp vụ tức thời</h4>
            </div>

            <div className="space-y-2.5 text-xs">
              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 shadow-2xs">
                <span className="font-bold text-amber-900 block mb-1">Đánh giá câu vừa nói:</span>
                <p className="text-slate-700 leading-relaxed">
                  {coachingTip || "Hãy mở đầu bằng lời chào kính trọng và lắng nghe câu chuyện của công dân."}
                </p>
              </div>

              <div className="p-3 bg-white/80 rounded-xl border border-amber-200/60 shadow-2xs">
                <span className="font-bold text-amber-900 block mb-1">Gợi ý hành động tiếp theo:</span>
                <p className="text-slate-700 leading-relaxed">
                  {suggestedAction || "Trấn an và mời công dân cung cấp thông tin hoặc giấy tờ liên quan."}
                </p>
              </div>
            </div>

            <div className="pt-2 flex items-center justify-between text-xs text-amber-900">
              <span className="font-semibold">Quy tắc vàng:</span>
              <span className="italic font-bold">"4 xin, 4 luôn"</span>
            </div>
          </div>

          {/* Prompt Bridge to AI Tutor */}
          {onSendToAI && (
            <button
              onClick={() => {
                onSendToAI(
                  `Xin hãy hướng dẫn tôi cách xử lý chuẩn mực nhất đối với tình huống tiếp công dân: "${selectedScenario.title}" (${selectedScenario.citizenName} tại ${selectedScenario.location}). Vui lòng nêu rõ các quy định pháp luật hiện hành và kịch bản phát ngôn tối ưu cho cán bộ Một cửa.`
                );
              }}
              className="w-full py-2.5 px-3 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors cursor-pointer border border-slate-200"
            >
              <MessageSquare className="w-3.5 h-3.5 text-red-700" />
              <span>Hỏi Cố vấn AI về tình huống này</span>
              <ArrowRight className="w-3.5 h-3.5 ml-auto" />
            </button>
          )}
        </div>
      </div>

      {/* Final Evaluation Report Modal */}
      {showEvalModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-xs animate-fade-in">
          <div className="bg-white rounded-3xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5">
            <div className="flex items-center justify-between pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 text-amber-800 flex items-center justify-center">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">Bảng Thẩm định Kỹ năng Tiếp công dân</h3>
                  <p className="text-xs text-slate-500">
                    Tình huống: {selectedScenario.title} • {selectedScenario.citizenName}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setShowEvalModal(false)}
                className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
              >
                ✕
              </button>
            </div>

            {isEvaluating ? (
              <div className="py-12 flex flex-col items-center justify-center text-center space-y-3">
                <Loader2 className="w-8 h-8 animate-spin text-red-700" />
                <p className="text-sm font-semibold text-slate-700">
                  Hội đồng Giám khảo AI đang phân tích biên bản đối thoại...
                </p>
                <p className="text-xs text-slate-400 max-w-sm">
                  Đang chấm điểm 4 tiêu chí: Văn hóa công vụ, Tính pháp lý, Xoa dịu mâu thuẫn và Hướng dẫn số hóa.
                </p>
              </div>
            ) : evaluation ? (
              <div className="space-y-5">
                {/* Score Header */}
                <div className="bg-gradient-to-br from-red-900 to-rose-950 rounded-2xl p-5 text-white flex items-center justify-between">
                  <div className="space-y-1">
                    <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                      Kết quả tổng thể
                    </span>
                    <h4 className="text-2xl font-black">{evaluation.overallScore} / 100 điểm</h4>
                    <span
                      className={`inline-block text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        evaluation.overallScore >= 90
                          ? "bg-emerald-400 text-slate-950"
                          : evaluation.overallScore >= 75
                          ? "bg-amber-400 text-slate-950"
                          : "bg-rose-400 text-slate-950"
                      }`}
                    >
                      Xếp loại: {evaluation.grade}
                    </span>
                  </div>

                  <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center text-3xl font-bold">
                    {evaluation.overallScore >= 80 ? "🏆" : "🎖️"}
                  </div>
                </div>

                {/* 4 Criteria Matrix */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Văn hóa 4 xin, 4 luôn</span>
                    <span className="text-base font-bold text-red-700">
                      {evaluation.criteriaScores?.attitude || 20}/25
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Căn cứ pháp lý</span>
                    <span className="text-base font-bold text-red-700">
                      {evaluation.criteriaScores?.legalKnowledge || 18}/25
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Xoa dịu xung đột</span>
                    <span className="text-base font-bold text-red-700">
                      {evaluation.criteriaScores?.deEscalation || 20}/25
                    </span>
                  </div>
                  <div className="p-3 bg-slate-50 rounded-xl border border-slate-100 text-center">
                    <span className="text-[11px] text-slate-500 font-medium block">Hướng dẫn số hóa</span>
                    <span className="text-base font-bold text-red-700">
                      {evaluation.criteriaScores?.digitalGuidance || 18}/25
                    </span>
                  </div>
                </div>

                {/* Strengths & Improvements */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="p-4 bg-emerald-50/80 rounded-xl border border-emerald-200/70 space-y-2">
                    <h5 className="font-bold text-xs text-emerald-900 flex items-center gap-1.5">
                      <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                      <span>Ưu điểm phát huy:</span>
                    </h5>
                    <ul className="space-y-1 text-xs text-emerald-950">
                      {evaluation.strengths?.map((s: string, sIdx: number) => (
                        <li key={sIdx} className="leading-relaxed flex items-start gap-1">
                          <span>•</span>
                          <span>{s}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-4 bg-amber-50/80 rounded-xl border border-amber-200/70 space-y-2">
                    <h5 className="font-bold text-xs text-amber-900 flex items-center gap-1.5">
                      <AlertTriangle className="w-4 h-4 text-amber-700" />
                      <span>Điểm cần hoàn thiện:</span>
                    </h5>
                    <ul className="space-y-1 text-xs text-amber-950">
                      {evaluation.improvements?.map((imp: string, iIdx: number) => (
                        <li key={iIdx} className="leading-relaxed flex items-start gap-1">
                          <span>•</span>
                          <span>{imp}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Model Sample Answer */}
                {evaluation.sampleModelAnswer && (
                  <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-1.5">
                    <span className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5 text-red-700" />
                      <span>Kịch bản phát ngôn mẫu mực của Cán bộ giỏi:</span>
                    </span>
                    <p className="text-xs text-slate-700 italic leading-relaxed bg-white p-3 rounded-lg border border-slate-200">
                      "{evaluation.sampleModelAnswer}"
                    </p>
                  </div>
                )}

                <div className="pt-2 flex items-center justify-end gap-2">
                  <button
                    onClick={() => setShowEvalModal(false)}
                    className="px-4 py-2 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-700 font-semibold text-xs transition-colors"
                  >
                    Đóng
                  </button>
                  <button
                    onClick={() => {
                      setShowEvalModal(false);
                      resetScenario(selectedScenario);
                    }}
                    className="px-4 py-2 rounded-xl bg-red-700 hover:bg-red-800 text-white font-semibold text-xs transition-colors"
                  >
                    Luyện tập lại tình huống này
                  </button>
                </div>
              </div>
            ) : null}
          </div>
        </div>
      )}
    </div>
  );
};
