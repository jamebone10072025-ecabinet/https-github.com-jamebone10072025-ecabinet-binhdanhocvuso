import React, { useState, useRef } from "react";
import {
  FileText,
  Upload,
  Sparkles,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  Copy,
  Check,
  RotateCcw,
  Loader2,
  X,
  Eye,
  Layers,
  Wrench,
  HelpCircle,
  Clock,
  ShieldCheck,
  ShieldAlert,
  ArrowRight
} from "lucide-react";
import { SAMPLE_DOCUMENTS, SampleDocument } from "../data/multimodalHelper";

interface DocumentIntelligenceProps {
  onSendToAI?: (prompt: string) => void;
}

export const DocumentIntelligence: React.FC<DocumentIntelligenceProps> = ({ onSendToAI }) => {
  const [taskType, setTaskType] = useState<"format_check" | "task_matrix" | "error_diagnosis" | "summary">("format_check");
  const [documentText, setDocumentText] = useState("");
  const [userNotes, setUserNotes] = useState("");
  const [fileData, setFileData] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string | null>(null);
  const [fileMime, setFileMime] = useState<string | null>(null);
  const [filePreview, setFilePreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const [analyzing, setAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);
  const [modelUsed, setModelUsed] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  const taskOptions = [
    {
      id: "format_check" as const,
      label: "Soát thể thức NĐ 30/2020",
      icon: FileCheck,
      badge: "Phổ biến",
      desc: "Rà soát tiêu ngữ, số ký hiệu, căn lề, nơi nhận, thẩm quyền ký và chữ ký số."
    },
    {
      id: "task_matrix" as const,
      label: "Bóc tách ma trận nhiệm vụ",
      icon: Layers,
      desc: "Trích xuất danh mục việc cần làm, cơ quan chủ trì, phối hợp và hạn chót (deadline)."
    },
    {
      id: "error_diagnosis" as const,
      label: "Chẩn đoán ảnh lỗi phần mềm",
      icon: Wrench,
      desc: "Nhận diện mã lỗi Cổng DVCQG, Một cửa, VNeID, Token chữ ký số và hướng dẫn 3 bước khắc phục."
    },
    {
      id: "summary" as const,
      label: "Tóm lược tham mưu lãnh đạo",
      icon: FileText,
      desc: "Tóm tắt văn bản dài thành Bản ghi nhớ 1 trang phục vụ chỉ đạo điều hành nhanh."
    }
  ];

  const handleFileUpload = (file: File) => {
    if (!file) return;

    if (file.size > 20 * 1024 * 1024) {
      setErrorMessage("Kích thước tệp vượt quá 20MB. Vui lòng chọn tệp nhỏ hơn.");
      return;
    }

    setFileName(file.name);
    setFileMime(file.type);
    setErrorMessage(null);

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setFileData(result);
      if (file.type.startsWith("image/")) {
        setFilePreview(result);
      } else {
        setFilePreview(null);
      }
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const clearFile = () => {
    setFileData(null);
    setFileName(null);
    setFileMime(null);
    setFilePreview(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const loadSample = (sample: SampleDocument) => {
    setTaskType(sample.taskType);
    setDocumentText(sample.content);
    clearFile();
    setAnalysisResult(null);
    setErrorMessage(null);
  };

  const runAnalysis = async () => {
    if (!fileData && (!documentText || !documentText.trim())) {
      setErrorMessage("Vui lòng tải lên tệp ảnh/tài liệu quét hoặc nhập nội dung văn bản cần phân tích.");
      return;
    }

    setAnalyzing(true);
    setErrorMessage(null);
    setAnalysisResult(null);

    try {
      const response = await fetch("/api/document-intelligence", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          fileData,
          mimeType: fileMime,
          documentText: documentText.trim(),
          taskType,
          userNotes: userNotes.trim()
        })
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Không thể phân tích tài liệu.");
      }

      setAnalysisResult(data.analysis);
      setModelUsed(data.model);
    } catch (err: any) {
      console.error(err);
      setErrorMessage(err.message || "Đã xảy ra lỗi trong quá trình phân tích.");
    } finally {
      setAnalyzing(false);
    }
  };

  const copyResult = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-red-950 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-red-900/30">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Google Gemini Multimodal Document Intelligence</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Phân tích văn bản, tài liệu quét & Biểu mẫu công vụ
            </h2>
            <p className="text-sm text-slate-300 max-w-2xl leading-relaxed">
              Trợ lý thẩm định thông minh hỗ trợ cán bộ rà soát chuẩn hóa thể thức theo <strong>Nghị định 30/2020/NĐ-CP</strong>, bóc tách thời hạn công vụ, và chẩn đoán xử lý nhanh sự cố phần mềm qua ảnh chụp màn hình.
            </p>
          </div>

          <div className="shrink-0 bg-white/10 backdrop-blur-xs p-3.5 rounded-xl border border-white/10 text-xs space-y-1.5 text-slate-200">
            <div className="flex items-center gap-2 text-amber-300 font-semibold">
              <ShieldCheck className="w-4 h-4" />
              <span>Bảo đảm bảo mật công vụ</span>
            </div>
            <div>• Tự động che chắn thông tin mật</div>
            <div>• Mô hình 2 cấp tỉnh Gia Lai (135 xã/phường)</div>
          </div>
        </div>
      </div>

      {/* Task Type Selector */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {taskOptions.map((opt) => {
          const Icon = opt.icon;
          const isActive = taskType === opt.id;
          return (
            <button
              key={opt.id}
              onClick={() => {
                setTaskType(opt.id);
                setAnalysisResult(null);
              }}
              className={`text-left p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                isActive
                  ? "bg-red-50/80 border-red-300 ring-2 ring-red-600/20 shadow-xs"
                  : "bg-white border-slate-200 hover:bg-slate-50 hover:border-slate-300"
              }`}
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    isActive ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
                  }`}>
                    <Icon className="w-4 h-4" />
                  </div>
                  {opt.badge && (
                    <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-800 border border-amber-200">
                      {opt.badge}
                    </span>
                  )}
                </div>
                <div className={`font-bold text-sm ${isActive ? "text-red-900" : "text-slate-800"}`}>
                  {opt.label}
                </div>
                <div className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                  {opt.desc}
                </div>
              </div>
              <div className="mt-3 pt-2 border-t border-slate-100 flex items-center justify-between text-[11px] font-medium text-slate-400">
                <span>{isActive ? "Đang chọn" : "Chọn tác vụ"}</span>
                <ArrowRight className={`w-3 h-3 ${isActive ? "text-red-700" : "text-slate-300"}`} />
              </div>
            </button>
          );
        })}
      </div>

      {/* Quick Sample Loader */}
      <div className="bg-slate-100/80 rounded-xl p-3.5 border border-slate-200 flex flex-wrap items-center justify-between gap-2.5">
        <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
          <HelpCircle className="w-4 h-4 text-amber-600" />
          <span>Thử nghiệm nhanh với tài liệu mẫu công vụ:</span>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_DOCUMENTS.map((sample) => (
            <button
              key={sample.id}
              onClick={() => loadSample(sample)}
              className="text-xs px-2.5 py-1 rounded-lg bg-white border border-slate-300 hover:border-red-400 hover:text-red-700 text-slate-700 font-medium transition-colors cursor-pointer shadow-2xs"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* Main Input Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Upload & Input */}
        <div className="lg:col-span-6 space-y-4">
          {/* File Upload Area */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <Upload className="w-4 h-4 text-red-700" />
                <span>1. Tải lên tệp ảnh quét / tài liệu (PDF, JPG, PNG)</span>
              </label>
              {fileData && (
                <button
                  onClick={clearFile}
                  className="text-xs text-rose-600 hover:underline flex items-center gap-1 cursor-pointer font-medium"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Xóa tệp</span>
                </button>
              )}
            </div>

            <div
              onDrop={handleDrop}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-xl p-6 text-center transition-all cursor-pointer ${
                isDragging
                  ? "border-red-500 bg-red-50/50"
                  : fileData
                  ? "border-emerald-400 bg-emerald-50/30"
                  : "border-slate-300 hover:border-red-400 hover:bg-slate-50/70"
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp,application/pdf"
                className="hidden"
                onChange={(e) => {
                  if (e.target.files && e.target.files[0]) {
                    handleFileUpload(e.target.files[0]);
                  }
                }}
              />

              {fileData ? (
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div className="font-semibold text-slate-800 text-sm">{fileName}</div>
                  <div className="text-xs text-slate-500">
                    Đã nạp tệp thành công ({fileMime}) • Sẵn sàng gửi Gemini AI phân tích
                  </div>
                  {filePreview && (
                    <div className="mt-3 inline-block relative border border-slate-200 rounded-lg overflow-hidden max-h-36 shadow-xs">
                      <img
                        src={filePreview}
                        alt="Preview"
                        className="object-contain max-h-36 mx-auto"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-2">
                  <div className="w-10 h-10 mx-auto rounded-full bg-red-50 text-red-700 flex items-center justify-center">
                    <Upload className="w-5 h-5" />
                  </div>
                  <div className="text-sm font-semibold text-slate-700">
                    Kéo thả hoặc <span className="text-red-700 underline">bấm để chọn ảnh/tài liệu</span>
                  </div>
                  <div className="text-xs text-slate-500">
                    Hỗ trợ ảnh chụp văn bản, bản quét scanner, ảnh màn hình báo lỗi hoặc tệp PDF (Tối đa 20MB)
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Text Area Input */}
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-3">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-1.5">
                <FileText className="w-4 h-4 text-slate-600" />
                <span>2. Hoặc dán nội dung văn bản / dự thảo công văn</span>
              </label>
              {documentText && (
                <button
                  onClick={() => setDocumentText("")}
                  className="text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                >
                  Xóa văn bản
                </button>
              )}
            </div>

            <textarea
              rows={8}
              value={documentText}
              onChange={(e) => setDocumentText(e.target.value)}
              placeholder="Dán toàn bộ dự thảo công văn, thông báo, quyết định hoặc mô tả sự cố kỹ thuật tại đây..."
              className="w-full text-xs font-mono p-3 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-red-600 focus:border-transparent bg-slate-50/50 leading-relaxed"
            />

            {/* Custom Notes */}
            <div>
              <label className="block text-[11px] font-semibold text-slate-600 mb-1">
                Ghi chú hoặc yêu cầu trọng tâm cho AI (tùy chọn):
              </label>
              <input
                type="text"
                value={userNotes}
                onChange={(e) => setUserNotes(e.target.value)}
                placeholder="Ví dụ: Kiểm tra kỹ phần Nơi nhận và Thẩm quyền ký theo mô hình 2 cấp..."
                className="w-full text-xs p-2.5 rounded-lg border border-slate-200 focus:ring-2 focus:ring-red-600 bg-white"
              />
            </div>

            {/* Error Display */}
            {errorMessage && (
              <div className="p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 shrink-0 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="pt-2 flex items-center gap-3">
              <button
                onClick={runAnalysis}
                disabled={analyzing}
                className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-red-700 via-rose-800 to-red-800 hover:from-red-800 hover:to-red-900 text-white font-bold text-sm shadow-md shadow-red-900/20 transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
              >
                {analyzing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Gemini AI đang phân tích đa phương thức...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4 text-amber-300" />
                    <span>Bắt đầu phân tích tài liệu bằng AI</span>
                  </>
                )}
              </button>

              <button
                onClick={() => {
                  clearFile();
                  setDocumentText("");
                  setUserNotes("");
                  setAnalysisResult(null);
                  setErrorMessage(null);
                }}
                className="p-3 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100 transition-colors"
                title="Đặt lại"
              >
                <RotateCcw className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Results */}
        <div className="lg:col-span-6">
          <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs h-full flex flex-col">
            <div className="flex items-center justify-between border-b border-slate-100 pb-3 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-red-100 text-red-800 flex items-center justify-center font-bold text-xs">
                  AI
                </div>
                <div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Kết quả thẩm định & Hiệu đính chuẩn hóa
                  </h3>
                  {modelUsed && (
                    <span className="text-[10px] text-slate-400">
                      Mô hình: {modelUsed} • Đã đối chiếu quy chuẩn pháp lý
                    </span>
                  )}
                </div>
              </div>

              {analysisResult && (
                <button
                  onClick={copyResult}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100 text-xs font-semibold text-slate-700 transition-colors cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-600" />
                      <span className="text-emerald-700">Đã sao chép</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-slate-500" />
                      <span>Sao chép kết quả</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Analysis Content or Empty State */}
            <div className="flex-1 overflow-y-auto">
              {analyzing ? (
                <div className="py-20 text-center space-y-4">
                  <div className="w-12 h-12 mx-auto rounded-full bg-red-50 text-red-700 flex items-center justify-center animate-spin">
                    <Loader2 className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <div className="font-bold text-sm text-slate-800">
                      Đang xử lý hình ảnh và văn bản qua Gemini...
                    </div>
                    <div className="text-xs text-slate-500 max-w-sm mx-auto">
                      Hệ thống đang trích xuất dữ liệu, đối chiếu quy định thể thức Nghị định 30/2020/NĐ-CP và tổng hợp phương án tối ưu.
                    </div>
                  </div>
                </div>
              ) : analysisResult ? (
                <div className="prose prose-sm max-w-none text-slate-700 text-xs sm:text-sm leading-relaxed space-y-3 whitespace-pre-wrap font-sans bg-slate-50/70 p-4 rounded-xl border border-slate-100">
                  {analysisResult}
                </div>
              ) : (
                <div className="py-16 text-center space-y-3 text-slate-400">
                  <div className="w-12 h-12 mx-auto rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center">
                    <FileCheck className="w-6 h-6" />
                  </div>
                  <div className="font-medium text-sm text-slate-600">
                    Chưa có kết quả phân tích
                  </div>
                  <p className="text-xs max-w-sm mx-auto text-slate-400 leading-relaxed">
                    Vui lòng tải lên tài liệu quét hoặc dán dự thảo văn bản ở cột bên trái và bấm <strong>Bắt đầu phân tích tài liệu bằng AI</strong>.
                  </p>
                </div>
              )}
            </div>

            {/* Footer tips */}
            <div className="mt-4 pt-3 border-t border-slate-100 text-[11px] text-slate-500 flex items-center justify-between">
              <span className="flex items-center gap-1 text-slate-500">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                Thời gian xử lý: ~2-4 giây
              </span>
              <span className="text-amber-700 font-medium">
                Nguyên tắc: AI làm nhanh, con người làm chuẩn
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
