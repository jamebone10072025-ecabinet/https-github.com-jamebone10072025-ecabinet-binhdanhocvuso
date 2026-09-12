import React from "react";
import { BookOpen, Award, Wrench, FileText, Bot, ShieldCheck, CheckCircle2, RotateCcw, MapPin, Radio, FileCheck } from "lucide-react";
import { useProgress } from "../context/ProgressContext";

interface HeaderProps {
  activeTab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai" | "docai" | "podcast";
  setActiveTab: (tab: "curriculum" | "exam" | "tools" | "maps" | "legal" | "ai" | "docai" | "podcast") => void;
  onOpenLegal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenLegal }) => {
  const { completedCount, totalLessons, completionPercentage, resetAllProgress } = useProgress();
  return (
    <header className="relative z-40 bg-white border-b border-slate-200 shadow-xs">
      {/* Top red-gold identification bar */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-950 text-white px-3 sm:px-8 py-3.5 sm:py-6 lg:py-7 flex flex-wrap items-center justify-between gap-2.5 sm:gap-4 border-b-2 border-amber-400/40 shadow-md">
        <div className="flex items-center gap-2.5 sm:gap-4">
          <div className="w-8 h-8 sm:w-11 sm:h-11 rounded-xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <span className="inline-block w-3.5 h-3.5 sm:w-5 sm:h-5 rounded-full bg-amber-400 animate-pulse ring-4 ring-amber-400/30"></span>
          </div>
          <div>
            <span className="block text-base sm:text-2xl lg:text-3xl font-black tracking-wide uppercase text-amber-300 drop-shadow-md leading-tight">
              Bình dân học vụ số tỉnh Gia Lai
            </span>
            <span className="block text-[11px] sm:text-sm font-medium text-rose-200 mt-0.5 tracking-normal line-clamp-1 sm:line-clamp-none">
              Chương trình phổ cập kỹ năng số toàn dân & chuẩn hóa năng lực cán bộ công vụ
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-red-100 text-[11px] sm:text-sm font-semibold">
          <span className="bg-black/30 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-lg border border-amber-400/30 text-amber-200 shadow-xs whitespace-nowrap">
            NQ 398/NQ-UBTVQH16
          </span>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="hidden sm:inline bg-black/30 px-3.5 py-1.5 rounded-lg border border-white/20 text-slate-100 shadow-xs">
            Chỉ thị 14/CT-TTg
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-14 sm:h-18">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group"
            onClick={() => setActiveTab("curriculum")}
          >
            <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-red-700 to-rose-900 flex items-center justify-center text-white shadow-md shadow-red-900/20 ring-2 ring-amber-400/50 group-hover:scale-105 transition-transform shrink-0">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <h1 className="font-black text-base sm:text-xl text-slate-900 tracking-tight leading-tight">
                  BÌNH DÂN HỌC VỤ SỐ
                </h1>
                <span className="hidden sm:inline px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 border border-red-200 whitespace-nowrap">
                  Tập 1: Khối cơ quan nhà nước
                </span>
              </div>
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium line-clamp-1">
                Khung kiến thức và kỹ năng số cơ bản micro-learning
              </p>
            </div>
          </div>

          {/* Nav Items (Desktop) */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-tab-curriculum"
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "curriculum"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>26 chuyên đề</span>
            </button>

            <button
              id="nav-tab-podcast"
              onClick={() => setActiveTab("podcast")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "podcast"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Radio className="w-4 h-4 text-rose-600 animate-pulse" />
              <span>Podcast học vụ</span>
            </button>

            <button
              id="nav-tab-docai"
              onClick={() => setActiveTab("docai")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "docai"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <FileCheck className="w-4 h-4 text-amber-600" />
              <span>Soát văn bản AI</span>
            </button>

            <button
              id="nav-tab-exam"
              onClick={() => setActiveTab("exam")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "exam"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span className="hidden xl:inline">Sát hạch & chứng nhận</span>
              <span className="xl:hidden">Sát hạch</span>
            </button>

            <button
              id="nav-tab-tools"
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "tools"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
              <span>Công cụ số</span>
            </button>

            <button
              id="nav-tab-maps"
              onClick={() => setActiveTab("maps")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "maps"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <MapPin className="w-4 h-4 text-rose-600" />
              <span className="hidden xl:inline">Bản đồ số Gia Lai</span>
              <span className="xl:hidden">Bản đồ</span>
            </button>

            <button
              id="nav-tab-ai"
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "ai"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Trợ lý AI</span>
            </button>

            <button
              id="nav-btn-legal"
              onClick={onOpenLegal}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 transition-colors border border-transparent hover:border-slate-200"
            >
              <FileText className="w-4 h-4 text-slate-500" />
              <span className="hidden lg:inline">Căn cứ pháp lý</span>
            </button>
          </nav>

          {/* Mobile CTA & Legal button */}
          <div className="flex md:hidden items-center gap-1.5">
            <button
              onClick={onOpenLegal}
              className="px-2.5 py-1.5 rounded-lg border border-slate-200 text-slate-700 bg-slate-50 text-xs font-semibold flex items-center gap-1 shadow-2xs"
              title="Căn cứ pháp lý"
            >
              <FileText className="w-3.5 h-3.5 text-slate-500" />
              <span>Pháp lý</span>
            </button>
            <button
              onClick={() => setActiveTab("exam")}
              className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Sát hạch</span>
            </button>
          </div>
        </div>
      </div>

      {/* Real-time Progress Tracking Bar */}
      <div className="bg-slate-50/95 border-t border-slate-200/90 px-3 sm:px-8 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2 flex-wrap min-w-0">
            <span className="inline-flex items-center gap-1 font-bold text-red-950 bg-red-100/90 px-2 py-0.5 rounded-full text-[10px] sm:text-[11px] border border-red-200 shrink-0">
              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
              <span>Tiến độ:</span>
            </span>
            <span className="font-semibold text-slate-800 text-[11px] sm:text-xs truncate">
              <strong className="text-red-700 font-bold">{completedCount}</strong>/{totalLessons} bài học
            </span>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <div className="flex items-center gap-1.5 w-24 sm:w-56 lg:w-72">
              <div className="flex-1 bg-slate-200/90 rounded-full h-2 sm:h-2.5 overflow-hidden shadow-inner">
                <div
                  className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 h-full rounded-full transition-all duration-500 shadow-xs"
                  style={{ width: `${completionPercentage}%` }}
                />
              </div>
              <span className="font-black text-[11px] sm:text-xs text-emerald-700 w-8 sm:w-11 text-right shrink-0">
                {completionPercentage}%
              </span>
            </div>

            {completedCount > 0 && (
              <button
                onClick={() => {
                  if (window.confirm("Bạn có chắc chắn muốn đặt lại toàn bộ tiến độ học tập về 0?")) {
                    resetAllProgress();
                  }
                }}
                title="Đặt lại tiến độ học tập"
                className="text-slate-400 hover:text-rose-600 transition-colors p-1 rounded hover:bg-rose-50 inline-flex items-center gap-1 text-[11px]"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span className="hidden xl:inline">Đặt lại</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
