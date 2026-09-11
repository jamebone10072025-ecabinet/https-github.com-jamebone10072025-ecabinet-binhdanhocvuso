import React from "react";
import { BookOpen, Award, Wrench, FileText, Bot, ShieldCheck } from "lucide-react";

interface HeaderProps {
  activeTab: "curriculum" | "exam" | "tools" | "legal" | "ai";
  setActiveTab: (tab: "curriculum" | "exam" | "tools" | "legal" | "ai") => void;
  onOpenLegal: () => void;
}

export const Header: React.FC<HeaderProps> = ({ activeTab, setActiveTab, onOpenLegal }) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200 shadow-xs">
      {/* Top red-gold identification bar - doubled height with scaled typography as requested */}
      <div className="bg-gradient-to-r from-red-900 via-rose-900 to-red-950 text-white px-4 sm:px-8 py-5 sm:py-6 lg:py-7 flex flex-wrap items-center justify-between gap-4 border-b-2 border-amber-400/40 shadow-md min-h-[90px] sm:min-h-[105px]">
        <div className="flex items-center gap-3.5 sm:gap-4">
          <div className="w-9 h-9 sm:w-11 sm:h-11 rounded-xl bg-amber-400/20 border-2 border-amber-400 flex items-center justify-center shrink-0 shadow-inner">
            <span className="inline-block w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-amber-400 animate-pulse ring-4 ring-amber-400/30"></span>
          </div>
          <div>
            <span className="block text-lg sm:text-2xl lg:text-3xl font-black tracking-wide uppercase text-amber-300 drop-shadow-md leading-tight">
              Bình dân học vụ số tỉnh Gia Lai
            </span>
            <span className="block text-xs sm:text-sm font-medium text-rose-200 mt-0.5 tracking-normal">
              Chương trình phổ cập kỹ năng số toàn dân & chuẩn hóa năng lực cán bộ công vụ
            </span>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 text-red-100 text-xs sm:text-sm font-semibold">
          <span className="bg-black/30 px-3.5 py-1.5 rounded-lg border border-amber-400/30 text-amber-200 shadow-xs">
            Nghị quyết số 398/NQ-UBTVQH16
          </span>
          <span className="hidden sm:inline opacity-60">|</span>
          <span className="hidden sm:inline bg-black/30 px-3.5 py-1.5 rounded-lg border border-white/20 text-slate-100 shadow-xs">
            Chỉ thị số 14/CT-TTg
          </span>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Logo & Brand */}
          <div 
            className="flex items-center gap-3 cursor-pointer group"
            onClick={() => setActiveTab("curriculum")}
          >
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-red-700 to-rose-900 flex items-center justify-center text-white shadow-md shadow-red-900/20 ring-2 ring-amber-400/50 group-hover:scale-105 transition-transform">
              <ShieldCheck className="w-6 h-6 text-amber-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-bold text-lg sm:text-xl text-slate-900 tracking-tight leading-tight">
                  BÌNH DÂN HỌC VỤ SỐ
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800 border border-red-200">
                  Tập 1: Khối cơ quan nhà nước
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Khung kiến thức và kỹ năng số cơ bản micro-learning
              </p>
            </div>
          </div>

          {/* Nav Items */}
          <nav className="hidden md:flex items-center gap-1.5">
            <button
              id="nav-tab-curriculum"
              onClick={() => setActiveTab("curriculum")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "curriculum"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <BookOpen className="w-4 h-4 text-red-600" />
              <span>26 chuyên đề</span>
            </button>

            <button
              id="nav-tab-exam"
              onClick={() => setActiveTab("exam")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "exam"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Award className="w-4 h-4 text-amber-600" />
              <span>Sát hạch & chứng nhận</span>
            </button>

            <button
              id="nav-tab-tools"
              onClick={() => setActiveTab("tools")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "tools"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Wrench className="w-4 h-4 text-indigo-600" />
              <span>Công cụ số</span>
            </button>

            <button
              id="nav-tab-ai"
              onClick={() => setActiveTab("ai")}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-lg text-sm font-semibold transition-all ${
                activeTab === "ai"
                  ? "bg-red-50 text-red-800 border border-red-200 shadow-xs"
                  : "text-slate-600 hover:text-slate-900 hover:bg-slate-100"
              }`}
            >
              <Bot className="w-4 h-4 text-emerald-600" />
              <span>Trợ lý AI học vụ</span>
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

          {/* Mobile indicator & CTA */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setActiveTab("exam")}
              className="px-3 py-1.5 rounded-lg bg-red-700 text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
            >
              <Award className="w-3.5 h-3.5 text-amber-300" />
              <span>Sát hạch</span>
            </button>
          </div>
        </div>

        {/* Mobile secondary tab row */}
        <div className="flex md:hidden overflow-x-auto py-2 gap-1.5 border-t border-slate-100 text-xs no-scrollbar">
          <button
            onClick={() => setActiveTab("curriculum")}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === "curriculum" ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            26 chuyên đề
          </button>
          <button
            onClick={() => setActiveTab("tools")}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === "tools" ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Công cụ số
          </button>
          <button
            onClick={() => setActiveTab("ai")}
            className={`px-3 py-1.5 rounded-md font-medium whitespace-nowrap ${
              activeTab === "ai" ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
            }`}
          >
            Trợ lý AI
          </button>
          <button
            onClick={onOpenLegal}
            className="px-3 py-1.5 rounded-md font-medium whitespace-nowrap bg-slate-100 text-slate-700 flex items-center gap-1"
          >
            <FileText className="w-3 h-3" />
            <span>Pháp lý</span>
          </button>
        </div>
      </div>
    </header>
  );
};
