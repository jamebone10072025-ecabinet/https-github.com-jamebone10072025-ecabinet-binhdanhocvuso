import React, { useState } from "react";
import { Sparkles, Copy, Check, Target, Gauge, ShieldAlert, FileText, CheckCircle2, ArrowRight } from "lucide-react";

interface PracticeToolsProps {
  onSendToAI: (promptText: string) => void;
}

export const PracticeTools: React.FC<PracticeToolsProps> = ({ onSendToAI }) => {
  const [activeSubTool, setActiveSubTool] = useState<"prompt" | "smart" | "gap" | "checklist">("prompt");

  // Prompt Builder State
  const [role, setRole] = useState("Chuyên viên hành chính");
  const [task, setTask] = useState("soạn thảo thông báo mời họp về triển khai phong trào Bình dân học vụ số tại đơn vị");
  const [style, setStyle] = useState("văn phong trang trọng, súc tích, đúng thể thức văn bản hành chính, khoảng 200 chữ");
  const [copiedPrompt, setCopiedPrompt] = useState(false);

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
    </div>
  );
};
