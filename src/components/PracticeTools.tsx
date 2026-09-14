import React, { useState } from "react";
import {
  Sparkles,
  Copy,
  Check,
  Target,
  Gauge,
  ShieldAlert,
  FileText,
  CheckCircle2,
  ArrowRight,
  Globe,
  Search,
  ExternalLink,
  Loader2,
  Send,
  Radio,
  FileCheck,
  Mic,
  Satellite,
  Trees,
} from "lucide-react";

interface PracticeToolsProps {
  onSendToAI: (promptText: string) => void;
  onOpenDocAI?: () => void;
  onOpenPodcast?: (topicId?: number) => void;
  onOpenSimulation?: () => void;
  onOpenEarthVision?: () => void;
}

export const PracticeTools: React.FC<PracticeToolsProps> = ({
  onSendToAI,
  onOpenDocAI,
  onOpenPodcast,
  onOpenSimulation,
  onOpenEarthVision,
}) => {
  const [activeSubTool, setActiveSubTool] = useState<"prompt" | "smart" | "gap" | "checklist" | "search">("prompt");

  // Prompt Builder State
  const [role, setRole] = useState("Chuyên viên hành chính");
  const [task, setTask] = useState("soạn thảo thông báo mời họp về triển khai phong trào Bình dân học vụ số tại đơn vị");
  const [style, setStyle] = useState("văn phong trang trọng, súc tích, đúng thể thức văn bản hành chính, khoảng 200 chữ");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

  // Search Grounding State
  const [searchQuery, setSearchQuery] = useState("Nghị định 118/2025/NĐ-CP về một cửa số duy nhất Cổng DVCQG");
  const [searchLoading, setSearchLoading] = useState(false);
  const [searchResult, setSearchResult] = useState<string | null>(null);
  const [searchSources, setSearchSources] = useState<Array<{ title: string; uri: string }>>([]);
  const [searchQueriesUsed, setSearchQueriesUsed] = useState<string[]>([]);
  const [searchCopied, setSearchCopied] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);

  const searchPresets = [
    "Nghị định 118/2025/NĐ-CP về điểm tiếp nhận một cửa số duy nhất Cổng DVCQG",
    "Mô hình chính quyền địa phương 2 cấp tỉnh Gia Lai năm 2026 (135 xã phường)",
    "Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 hiệu lực từ 01/01/2026",
    "Luật Trí tuệ nhân tạo 134/2025/QH15 và trách nhiệm cán bộ công chức",
    "Hướng dẫn xử lý các hình thức lừa đảo Deepfake trực tuyến năm 2026",
  ];

  const handleRunSearchGrounding = async (queryToRun?: string) => {
    const q = (queryToRun || searchQuery).trim();
    if (!q || searchLoading) return;

    setSearchLoading(true);
    setSearchError(null);
    setSearchResult(null);
    setSearchSources([]);
    setSearchQueriesUsed([]);

    try {
      const res = await fetch("/api/search-grounding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: q }),
      });

      if (!res.ok) {
        throw new Error(`Máy chủ phản hồi mã lỗi ${res.status}`);
      }

      const data = await res.json();
      setSearchResult(data.answer || "Không nhận được phản hồi từ mô hình.");
      setSearchSources(data.sources || []);
      setSearchQueriesUsed(data.searchQueries || []);
    } catch (err: any) {
      setSearchError(err?.message || "Lỗi kết nối khi tra cứu Google Search.");
    } finally {
      setSearchLoading(false);
    }
  };

  const handleCopySearchResult = () => {
    if (!searchResult) return;
    navigator.clipboard.writeText(searchResult);
    setSearchCopied(true);
    setTimeout(() => setSearchCopied(false), 2000);
  };

  const generatedPrompt = `Hãy đóng vai là một ${role} trong cơ quan nhà nước. Nhiệm vụ của bạn là: ${task}. Yêu cầu về hình thức: ${style}. Lưu ý nguyên tắc an toàn: Không đưa thông tin mật, số liệu nội bộ chưa công bố hay thông tin cá nhân của người dân vào bài viết; chỉ sử dụng thông tin công khai hoặc dữ liệu giả định minh họa.`;

  const handleCopyPrompt = () => {
    navigator.clipboard.writeText(generatedPrompt);
    setCopiedPrompt(true);
    setTimeout(() => setCopiedPrompt(false), 2000);
  };

  // SMART Evaluator State
  const [smartGoal, setSmartGoal] = useState("Rút ngắn 50% thời gian xử lý thủ tục hành chính tại bộ phận một cửa trong vòng 6 tháng bằng việc triển khai tiếp nhận hồ sơ trực tuyến");
  const [smartChecks, setSmartChecks] = useState({
    specific: true,
    measurable: true,
    achievable: true,
    realistic: true,
    timebound: true,
  });

  // Competency Gap Evaluator (Chuyên đề 26)
  const [gapScores, setGapScores] = useState<Record<string, number>>({
    officeWork: 2, // 1: Chưa dùng, 2: Cơ bản, 3: Thành thạo
    searchData: 2,
    security: 2,
    aiUsage: 1,
  });

  const totalScore: number = (Object.values(gapScores) as number[]).reduce((a: number, b: number) => a + b, 0);
  const maxScore = 12;

  // Checklist state (Chuyên đề 10 & 20)
  const [checks, setChecks] = useState<Record<string, boolean>>({
    isPublic: false,
    noCitizenData: false,
    properChannel: false,
    hasPassword: false,
    verifyAiOutput: false,
  });

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Featured AI Upgrades Banner */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
        {onOpenSimulation && (
          <div
            onClick={onOpenSimulation}
            className="p-4 rounded-2xl bg-gradient-to-br from-rose-900 to-red-950 text-white border border-rose-700/50 shadow-xs cursor-pointer hover:scale-[1.01] transition-transform flex items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Mic className="w-3 h-3 text-rose-300 animate-pulse" />
                <span>Gemini Live API</span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-amber-200 transition-colors">
                Mô phỏng tiếp công dân ảo
              </h4>
              <p className="text-xs text-rose-200 line-clamp-2 leading-relaxed">
                Hội thoại giọng nói thời gian thực với công dân AI, rèn luyện kỹ năng 4 xin 4 luôn và xử lý bức xúc.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
              <Mic className="w-5 h-5" />
            </div>
          </div>
        )}

        {onOpenDocAI && (
          <div
            onClick={onOpenDocAI}
            className="p-4 rounded-2xl bg-gradient-to-br from-red-900 to-slate-950 text-white border border-red-800/40 shadow-xs cursor-pointer hover:scale-[1.01] transition-transform flex items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30">
                <Sparkles className="w-3 h-3" />
                <span>Multimodal Gemini</span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-amber-200 transition-colors">
                Soát thể thức NĐ 30 & Chẩn đoán ảnh lỗi
              </h4>
              <p className="text-xs text-rose-200 line-clamp-2 leading-relaxed">
                Tải lên bản chụp công văn, ảnh màn hình lỗi Một cửa/VNeID để AI kiểm tra và hướng dẫn sửa ngay.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-amber-300">
              <FileCheck className="w-5 h-5" />
            </div>
          </div>
        )}

        {onOpenPodcast && (
          <div
            onClick={() => onOpenPodcast(1)}
            className="p-4 rounded-2xl bg-gradient-to-br from-slate-900 to-red-950 text-white border border-slate-800 shadow-xs cursor-pointer hover:scale-[1.01] transition-transform flex items-center justify-between gap-3 group"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-400/20 text-rose-300 border border-rose-400/30">
                <Radio className="w-3 h-3 animate-pulse" />
                <span>Micro-learning TTS</span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-rose-200 transition-colors">
                Podcast 26 Chuyên đề công vụ số
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                Bản tin âm thanh phát thanh viên 2-3 phút, nghe mọi lúc mọi nơi trên điện thoại và máy tính.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-rose-300">
              <Radio className="w-5 h-5" />
            </div>
          </div>
        )}

        {/* Tạm thời ẩn theo yêu cầu: Google Earth Engine & Cloud Vision AI */}
        {/*
        {onOpenEarthVision && (
          <div
            onClick={onOpenEarthVision}
            className="p-4 rounded-2xl bg-gradient-to-br from-emerald-950 via-teal-950 to-slate-950 text-white border border-emerald-700/40 shadow-xs cursor-pointer hover:scale-[1.01] transition-transform flex items-center justify-between gap-3 group sm:col-span-2 lg:col-span-1"
          >
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-400/20 text-emerald-300 border border-emerald-400/30">
                <Satellite className="w-3 h-3 text-emerald-400 animate-pulse" />
                <span>Earth Engine & Vision AI</span>
              </div>
              <h4 className="font-bold text-sm text-white group-hover:text-emerald-200 transition-colors">
                Giám sát tài nguyên rừng & đất
              </h4>
              <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                Vệ tinh Sentinel-2, Landsat 9 & Flycam kiểm lâm phát hiện sớm điểm cháy rừng, mất tán rừng và san lấp đất.
              </p>
            </div>
            <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 text-emerald-300">
              <Trees className="w-5 h-5" />
            </div>
          </div>
        )}
        */}
      </div>

      {/* Sub-tool Switcher Header */}
      <div className="bg-white rounded-xl border border-slate-200 p-2 shadow-xs flex flex-wrap gap-1 text-xs sm:text-sm font-semibold">
        <button
          onClick={() => setActiveSubTool("prompt")}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTool === "prompt"
              ? "bg-red-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>Tạo prompt AI 3 phần</span>
        </button>

        <button
          onClick={() => setActiveSubTool("smart")}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTool === "smart"
              ? "bg-red-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Target className="w-4 h-4" />
          <span>Kiểm tra mục tiêu SMART</span>
        </button>

        <button
          onClick={() => setActiveSubTool("gap")}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTool === "gap"
              ? "bg-red-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Gauge className="w-4 h-4" />
          <span>Đánh giá khoảng cách số</span>
        </button>

        <button
          onClick={() => setActiveSubTool("checklist")}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTool === "checklist"
              ? "bg-red-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <ShieldAlert className="w-4 h-4" />
          <span>Rà soát an toàn dữ liệu</span>
        </button>

        <button
          onClick={() => setActiveSubTool("search")}
          className={`flex-1 min-w-[140px] py-2.5 px-3 rounded-lg flex items-center justify-center gap-2 transition-all ${
            activeSubTool === "search"
              ? "bg-blue-700 text-white shadow-xs"
              : "text-slate-600 hover:bg-slate-100"
          }`}
        >
          <Globe className="w-4 h-4 text-blue-300" />
          <span>Google Search Grounding</span>
        </button>
      </div>

      {/* TOOL 1: PROMPT BUILDER */}
      {activeSubTool === "prompt" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span>Chuyên đề 3 & 16 • Bài học nghệ thuật ra đề</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Trình tạo câu lệnh AI công vụ chuẩn 3 phần
            </h3>
            <p className="text-xs text-slate-500">
              Công thức cốt lõi: <strong>Vai trò - Nhiệm vụ - Phong cách & An toàn</strong>. Giúp AI hiểu chính xác yêu cầu mà không vi phạm quy định bảo mật.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-700">1. Vai trò & Bối cảnh:</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 font-medium outline-hidden focus:ring-2 focus:ring-red-500/20"
              >
                <option value="Chuyên viên hành chính">Chuyên viên hành chính</option>
                <option value="Cán bộ phụ trách một cửa & dịch vụ công">Cán bộ bộ phận Một cửa</option>
                <option value="Chuyên viên phụ trách chuyển đổi số">Chuyên viên Chuyển đổi số</option>
                <option value="Cán bộ truyền thông chính sách">Cán bộ truyền thông chính sách</option>
                <option value="Cán bộ văn thư lưu trữ">Cán bộ văn thư lưu trữ</option>
              </select>
            </div>

            <div className="space-y-1.5 sm:col-span-2">
              <label className="text-xs font-bold text-slate-700">2. Nhiệm vụ cụ thể:</label>
              <input
                type="text"
                value={task}
                onChange={(e) => setTask(e.target.value)}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 font-medium outline-hidden focus:ring-2 focus:ring-red-500/20"
                placeholder="Ví dụ: tóm tắt báo cáo, lập dàn ý bài phát biểu..."
              />
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-700">3. Yêu cầu phong cách, dung lượng & quy chuẩn:</label>
            <input
              type="text"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-slate-300 bg-white text-xs text-slate-800 font-medium outline-hidden focus:ring-2 focus:ring-red-500/20"
              placeholder="Ví dụ: trang trọng, ngắn gọn, chuẩn thể thức Nghị định 30/2020..."
            />
          </div>

          {/* Generated Box */}
          <div className="space-y-2 pt-2">
            <label className="text-xs font-bold text-slate-700 flex items-center justify-between">
              <span>Câu lệnh hoàn chỉnh (Prompt):</span>
              <span className="text-[11px] text-emerald-700 font-normal">
                Đã tích hợp lằn ranh an toàn dữ liệu
              </span>
            </label>
            <div className="p-4 rounded-xl bg-slate-900 text-slate-100 font-mono text-xs leading-relaxed border border-slate-800 relative">
              {generatedPrompt}
            </div>

            <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
              <button
                onClick={handleCopyPrompt}
                className="px-3.5 py-1.5 rounded-lg border border-slate-300 hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs transition-colors"
              >
                {copiedPrompt ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedPrompt ? "Đã sao chép!" : "Sao chép prompt"}</span>
              </button>
              <button
                onClick={() => onSendToAI(generatedPrompt)}
                className="px-3.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs transition-colors"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Gửi câu lệnh này cho trợ lý AI</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 2: SMART EVALUATOR */}
      {activeSubTool === "smart" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span>Chuyên đề 24 • Xác định mục tiêu cụ thể</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bộ đánh giá mục tiêu công nghệ theo chuẩn SMART
            </h3>
            <p className="text-xs text-slate-500">
              Kiểm tra xem mục tiêu ứng dụng công nghệ của phòng/ban đã đủ 5 tiêu chí: <strong>Cụ thể - Đo lường được - Khả thi - Thực tế - Có thời hạn</strong>.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700">Mục tiêu bạn dự kiến đặt ra:</label>
            <textarea
              rows={3}
              value={smartGoal}
              onChange={(e) => setSmartGoal(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-800 font-medium outline-hidden focus:ring-2 focus:ring-red-500/20"
              placeholder="Nhập mục tiêu công việc hoặc chuyển đổi số..."
            />
          </div>

          {/* SMART 5 Checklist Items */}
          <div className="space-y-3 pt-2">
            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <input
                type="checkbox"
                id="smart-s"
                checked={smartChecks.specific}
                onChange={(e) => setSmartChecks({ ...smartChecks, specific: e.target.checked })}
                className="mt-1 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="smart-s" className="text-xs space-y-0.5 cursor-pointer flex-1">
                <strong className="text-slate-900 block font-bold">S - Specific (Cụ thể):</strong>
                <span className="text-slate-600">Đã nêu rõ muốn giải quyết việc gì, rút ngắn khâu nào, tránh nói chung chung kiểu 'nâng cao hiệu quả'.</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <input
                type="checkbox"
                id="smart-m"
                checked={smartChecks.measurable}
                onChange={(e) => setSmartChecks({ ...smartChecks, measurable: e.target.checked })}
                className="mt-1 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="smart-m" className="text-xs space-y-0.5 cursor-pointer flex-1">
                <strong className="text-slate-900 block font-bold">M - Measurable (Đo lường được):</strong>
                <span className="text-slate-600">Có con số định lượng cụ thể (ví dụ: giảm 50% thời gian, đạt 90% sự hài lòng, số hóa 1.000 hồ sơ).</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <input
                type="checkbox"
                id="smart-a"
                checked={smartChecks.achievable}
                onChange={(e) => setSmartChecks({ ...smartChecks, achievable: e.target.checked })}
                className="mt-1 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="smart-a" className="text-xs space-y-0.5 cursor-pointer flex-1">
                <strong className="text-slate-900 block font-bold">A - Achievable (Khả thi):</strong>
                <span className="text-slate-600">Vừa sức với nhân lực và điều kiện cơ quan, không đặt chỉ tiêu viển vông dẫn tới lãng phí.</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <input
                type="checkbox"
                id="smart-r"
                checked={smartChecks.realistic}
                onChange={(e) => setSmartChecks({ ...smartChecks, realistic: e.target.checked })}
                className="mt-1 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="smart-r" className="text-xs space-y-0.5 cursor-pointer flex-1">
                <strong className="text-slate-900 block font-bold">R - Realistic (Thực tế & Trọng tâm):</strong>
                <span className="text-slate-600">Giải quyết trúng điểm nghẽn thực tế và mang lại lợi ích thiết thực cho người dân và cơ quan.</span>
              </label>
            </div>

            <div className="flex items-start gap-3 p-3 rounded-lg border border-slate-200 bg-slate-50/50">
              <input
                type="checkbox"
                id="smart-t"
                checked={smartChecks.timebound}
                onChange={(e) => setSmartChecks({ ...smartChecks, timebound: e.target.checked })}
                className="mt-1 rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="smart-t" className="text-xs space-y-0.5 cursor-pointer flex-1">
                <strong className="text-slate-900 block font-bold">T - Time-bound (Có thời hạn rõ ràng):</strong>
                <span className="text-slate-600">Có mốc hạn kiểm chứng cụ thể (ví dụ: 'trong vòng 6 tháng kể từ khi vận hành').</span>
              </label>
            </div>
          </div>
        </div>
      )}

      {/* TOOL 3: COMPETENCY GAP EVALUATOR */}
      {activeSubTool === "gap" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span>Chuyên đề 26 • Tự đánh giá năng lực số</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Khảo sát định vị khoảng cách năng lực số cá nhân
            </h3>
            <p className="text-xs text-slate-500">
              Đối chiếu trình độ thực tế của Quý Anh/Chị theo 4 nhóm năng lực chuẩn của Quyết định số 757/QĐ-BKHCN.
            </p>
          </div>

          <div className="space-y-4">
            {/* Group 1 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                1. Kỹ năng vận hành & xử lý công việc số (Soạn thảo văn bản, bảng tính, họp trực tuyến, đặt tên file)
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { val: 1, label: "Mức 1: Còn chậm, lúng túng" },
                  { val: 2, label: "Mức 2: Sử dụng cơ bản" },
                  { val: 3, label: "Mức 3: Thành thạo, chuẩn quy cách" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setGapScores({ ...gapScores, officeWork: opt.val })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      gapScores.officeWork === opt.val
                        ? "bg-red-700 text-white font-bold border-red-700 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group 2 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                2. Kỹ năng tìm kiếm, khai thác dữ liệu & kiểm chứng tin tức (Toán tử tìm kiếm, nhận diện tin giả, trích nguồn)
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { val: 1, label: "Mức 1: Chưa biết dùng toán tử" },
                  { val: 2, label: "Mức 2: Biết tìm cơ bản" },
                  { val: 3, label: "Mức 3: Kiểm chứng chuẩn 5 bước" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setGapScores({ ...gapScores, searchData: opt.val })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      gapScores.searchData === opt.val
                        ? "bg-red-700 text-white font-bold border-red-700 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group 3 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                3. An toàn thông tin, bảo vệ dữ liệu cá nhân & bí mật nhà nước (2FA, sao lưu 3-2-1, phòng chống Phishing)
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { val: 1, label: "Mức 1: Chưa bật xác thực 2 lớp" },
                  { val: 2, label: "Mức 2: Đã bật 2FA, đổi mật khẩu" },
                  { val: 3, label: "Mức 3: Tuân thủ nghiêm luật & sao lưu 3-2-1" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setGapScores({ ...gapScores, security: opt.val })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      gapScores.security === opt.val
                        ? "bg-red-700 text-white font-bold border-red-700 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Group 4 */}
            <div className="p-4 rounded-xl border border-slate-200 bg-slate-50/40 space-y-2">
              <div className="text-xs font-bold text-slate-800">
                4. Ứng dụng Trí tuệ nhân tạo (AI) trong công việc (Soạn nháp, tóm tắt, tuân thủ nguyên tắc dữ liệu nào công cụ đó)
              </div>
              <div className="grid grid-cols-3 gap-2 text-xs">
                {[
                  { val: 1, label: "Mức 1: Chưa từng sử dụng AI" },
                  { val: 2, label: "Mức 2: Thử nghiệm soạn nháp" },
                  { val: 3, label: "Mức 3: Thành thạo & kiểm chứng" },
                ].map((opt) => (
                  <button
                    key={opt.val}
                    onClick={() => setGapScores({ ...gapScores, aiUsage: opt.val })}
                    className={`p-2 rounded-lg border text-center transition-all ${
                      gapScores.aiUsage === opt.val
                        ? "bg-red-700 text-white font-bold border-red-700 shadow-2xs"
                        : "bg-white text-slate-700 border-slate-200 hover:bg-slate-100"
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Assessment Summary */}
          <div className="p-5 rounded-xl bg-slate-900 text-white space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-300 uppercase tracking-wide">
                Chỉ số sẵn sàng kỹ năng số:
              </span>
              <span className="text-base font-black text-amber-400">
                {totalScore} / {maxScore} điểm ({Math.round((totalScore / maxScore) * 100)}%)
              </span>
            </div>
            <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
              <div
                className="bg-amber-400 h-full transition-all duration-300"
                style={{ width: `${(totalScore / maxScore) * 100}%` }}
              ></div>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {totalScore >= 10
                ? "Quý Anh/Chị đã đạt mức 'Thành thạo và có kiểm chứng', hãy duy trì và lan tỏa chia sẻ kinh nghiệm cho đồng nghiệp trong cơ quan."
                : totalScore >= 7
                ? "Quý Anh/Chị đang ở mức 'Cơ bản vững vàng'. Khuyến nghị tham gia bồi dưỡng thêm chuyên đề về AI an toàn và quy tắc sao lưu 3-2-1."
                : "Quý Anh/Chị cần tham gia đầy đủ các bài giảng Micro-learning cơ bản trong Chuyên đề 1 đến 5 để nâng cao độ thành thạo và tự tin hơn."}
            </p>
          </div>
        </div>
      )}

      {/* TOOL 4: CHECKLIST */}
      {activeSubTool === "checklist" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1 text-xs font-bold text-red-700 uppercase tracking-wide">
              <span>Chuyên đề 10 & 20 • Rà soát an toàn</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Bảng kiểm tra nhanh trước khi chia sẻ hoặc gửi dữ liệu
            </h3>
            <p className="text-xs text-slate-500">
              Nguyên tắc: <strong>Dừng lại 60 giây để kiểm tra</strong> nhằm tránh nguy cơ rò rỉ bí mật nhà nước và thông tin cá nhân của công dân.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: "isPublic", label: "Thông tin này đã được ban hành hoặc cho phép công bố chính thức chưa?" },
              { id: "noCitizenData", label: "Tệp tin đã được loại bỏ thông tin cá nhân của người dân (CCCD, địa chỉ, số điện thoại) chưa?" },
              { id: "properChannel", label: "Kênh gửi có phải kênh công vụ chính thống (hệ thống điều hành, email công vụ) không?" },
              { id: "hasPassword", label: "Với tài liệu nhạy cảm, đã đặt mật khẩu và gửi mật khẩu qua một kênh riêng biệt chưa?" },
              { id: "verifyAiOutput", label: "Nếu có sử dụng AI hỗ trợ, con người đã đọc lại và kiểm chứng tính chuẩn xác với văn bản gốc chưa?" },
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => setChecks({ ...checks, [item.id]: !checks[item.id] })}
                className={`p-3.5 rounded-xl border flex items-start gap-3 cursor-pointer transition-colors ${
                  checks[item.id] ? "bg-emerald-50/50 border-emerald-300" : "bg-white border-slate-200 hover:bg-slate-50"
                }`}
              >
                <div className={`mt-0.5 w-5 h-5 rounded-md flex items-center justify-center ${
                  checks[item.id] ? "bg-emerald-600 text-white" : "border border-slate-300 bg-white"
                }`}>
                  {checks[item.id] && <Check className="w-3.5 h-3.5" />}
                </div>
                <span className="text-xs sm:text-sm font-medium text-slate-800 leading-snug">
                  {item.label}
                </span>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 leading-relaxed">
            <strong>Ghi nhớ:</strong> Khi chưa chắc chắn về mức độ nhạy cảm của tài liệu, hãy chậm lại một nhịp để xin ý kiến phụ trách phòng. Một phút cẩn trọng bảo vệ uy tín của cả cơ quan!
          </div>
        </div>
      )}

      {/* TOOL 5: REAL-TIME SEARCH GROUNDING (gemini-3.5-flash with googleSearch tool) */}
      {activeSubTool === "search" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-700 uppercase tracking-wide">
              <Globe className="w-3.5 h-3.5 text-blue-600" />
              <span>Tra cứu Google Search Grounding thời gian thực • Gemini 3.5 Flash</span>
            </div>
            <h3 className="text-xl font-bold text-slate-900">
              Công cụ tra cứu chính sách, nghị định & kỹ năng số mới nhất
            </h3>
            <p className="text-xs text-slate-500">
              Sử dụng mô hình <strong>gemini-3.5-flash</strong> tích hợp công cụ tìm kiếm <strong>googleSearch</strong> để kết nối dữ liệu mạng Internet trực tiếp, tự động tổng hợp câu trả lời chính xác kèm nguồn trích dẫn pháp lý và tin tức cập nhật.
            </p>
          </div>

          {/* Quick preset chips */}
          <div className="space-y-2">
            <label className="text-xs font-bold text-slate-700 flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Gợi ý chủ đề tra cứu phổ biến:</span>
            </label>
            <div className="flex flex-wrap gap-1.5">
              {searchPresets.map((preset, idx) => (
                <button
                  key={idx}
                  onClick={() => {
                    setSearchQuery(preset);
                    handleRunSearchGrounding(preset);
                  }}
                  className="px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-blue-50 hover:border-blue-300 text-slate-700 text-xs transition-colors cursor-pointer text-left"
                >
                  {preset}
                </button>
              ))}
            </div>
          </div>

          {/* Search Input Box */}
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-2">
              <div className="relative flex-1">
                <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleRunSearchGrounding();
                  }}
                  placeholder="Nhập nội dung cần tra cứu chính sách, hướng dẫn kỹ năng số..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-300 bg-white text-xs sm:text-sm text-slate-900 font-medium outline-hidden focus:ring-2 focus:ring-blue-500/20 focus:border-blue-600 shadow-2xs"
                />
              </div>

              <button
                onClick={() => handleRunSearchGrounding()}
                disabled={!searchQuery.trim() || searchLoading}
                className="px-5 py-2.5 rounded-xl bg-blue-700 hover:bg-blue-800 disabled:opacity-50 text-white text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-sm transition-colors cursor-pointer shrink-0"
              >
                {searchLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang tìm kiếm...</span>
                  </>
                ) : (
                  <>
                    <Globe className="w-4 h-4" />
                    <span>Tra cứu Google</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Search Loading State */}
          {searchLoading && (
            <div className="p-6 rounded-2xl bg-blue-50/70 border border-blue-200 text-blue-900 flex items-center gap-4 animate-pulse">
              <Loader2 className="w-6 h-6 animate-spin text-blue-600 shrink-0" />
              <div>
                <h4 className="font-bold text-sm">Đang truy vấn Google Search qua Gemini 3.5 Flash...</h4>
                <p className="text-xs text-blue-700">Hệ thống đang đối chiếu các nguồn trang điện tử chính thống của Chính phủ, Bộ TT&TT và tỉnh Gia Lai.</p>
              </div>
            </div>
          )}

          {/* Search Error State */}
          {searchError && (
            <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-800">
              {searchError}
            </div>
          )}

          {/* Search Result Display */}
          {searchResult && (
            <div className="space-y-4 pt-2">
              <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200 space-y-4 shadow-2xs">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 pb-3">
                  <div className="flex items-center gap-2">
                    <span className="px-2.5 py-1 rounded-md bg-blue-100 text-blue-900 font-bold text-xs flex items-center gap-1.5 border border-blue-300">
                      <Globe className="w-3.5 h-3.5 text-blue-700" />
                      <span>Kết quả từ Google Search Grounding</span>
                    </span>
                    <span className="text-[11px] text-slate-500 font-medium">gemini-3.5-flash</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={handleCopySearchResult}
                      className="px-2.5 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      {searchCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span className="text-emerald-700">Đã chép</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Sao chép kết quả</span>
                        </>
                      )}
                    </button>

                    <button
                      onClick={() => onSendToAI(`Hãy giải thích chi tiết hơn về kết quả tra cứu: ${searchQuery}`)}
                      className="px-2.5 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
                    >
                      <span>Trao đổi với Trợ lý AI</span>
                      <Send className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                {/* Text Content */}
                <div className="whitespace-pre-wrap text-slate-800 text-xs sm:text-sm leading-relaxed">
                  {searchResult}
                </div>

                {/* Queries Used */}
                {searchQueriesUsed.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 space-y-1.5">
                    <div className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                      <Search className="w-3.5 h-3.5 text-slate-500" />
                      <span>Các truy vấn tìm kiếm đã thực hiện:</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {searchQueriesUsed.map((q, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-1 rounded-md bg-white border border-slate-200 text-slate-700 text-xs font-mono"
                        >
                          "{q}"
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sources List */}
                {searchSources.length > 0 && (
                  <div className="pt-3 border-t border-slate-200 space-y-2">
                    <div className="text-xs font-bold text-slate-800 flex items-center gap-1.5">
                      <ExternalLink className="w-3.5 h-3.5 text-blue-600" />
                      <span>Các nguồn trích dẫn tham chiếu trực tuyến ({searchSources.length}):</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {searchSources.map((source, sIdx) => {
                        let hostname = "";
                        try {
                          hostname = new URL(source.uri).hostname.replace("www.", "");
                        } catch {
                          hostname = "Nguồn tin";
                        }
                        return (
                          <a
                            key={sIdx}
                            href={source.uri}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2.5 rounded-xl bg-white border border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex items-start justify-between gap-2 text-xs text-slate-700 group"
                          >
                            <div className="min-w-0 flex-1">
                              <div className="font-semibold text-blue-900 group-hover:underline truncate">
                                {source.title || "Tài liệu trực tuyến"}
                              </div>
                              <div className="text-[10px] text-slate-400 truncate">{hostname}</div>
                            </div>
                            <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0 mt-0.5" />
                          </a>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
