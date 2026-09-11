import React, { useState } from "react";
import { X, Search, FileText, Scale, Calendar, Building2 } from "lucide-react";
import { LEGAL_DOCUMENTS, LegalDoc } from "../data/legalDocsData";

interface LegalDocsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LegalDocsModal: React.FC<LegalDocsModalProps> = ({ isOpen, onClose }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCat, setSelectedCat] = useState("Tất cả");

  if (!isOpen) return null;

  const categories = ["Tất cả", "Luật", "Nghị quyết", "Nghị định", "Chỉ thị", "Quyết định"];

  const filtered = LEGAL_DOCUMENTS.filter((doc) => {
    const matchesCat = selectedCat === "Tất cả" || doc.category === selectedCat;
    const matchesSearch =
      doc.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.summary.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs">
      <div className="bg-white w-full max-w-3xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-fadeIn">
        {/* Header */}
        <div className="p-5 bg-gradient-to-r from-red-800 to-rose-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <Scale className="w-5 h-5 text-amber-300" />
            <div>
              <h3 className="font-bold text-base sm:text-lg">
                Hệ thống căn cứ pháp lý và văn bản chỉ đạo
              </h3>
              <p className="text-xs text-red-100">
                Các văn kiện, luật và nghị định ban hành làm cơ sở triển khai Bộ học liệu (2024 - 2026)
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter / Search Bar */}
        <div className="p-4 border-b border-slate-100 bg-slate-50 space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo số hiệu, tên luật (Luật AI, Dữ liệu cá nhân, Nghị quyết 57...)"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-slate-200 bg-white text-xs sm:text-sm text-slate-800 outline-hidden focus:ring-2 focus:ring-red-500/20"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar text-xs">
            {categories.map((c) => (
              <button
                key={c}
                onClick={() => setSelectedCat(c)}
                className={`px-3 py-1 rounded-full font-medium transition-colors ${
                  selectedCat === c
                    ? "bg-red-700 text-white"
                    : "bg-white border border-slate-200 text-slate-600 hover:bg-slate-100"
                }`}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        {/* List of Documents */}
        <div className="p-5 overflow-y-auto space-y-3.5 flex-1">
          {filtered.map((doc: LegalDoc) => (
            <div
              key={doc.id}
              className="p-4 rounded-xl border border-slate-200 hover:border-red-300 hover:bg-red-50/20 transition-all space-y-2"
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-red-100 text-red-900 border border-red-200">
                  {doc.code}
                </span>
                <div className="flex items-center gap-3 text-[11px] text-slate-500 font-medium">
                  <span className="flex items-center gap-1">
                    <Building2 className="w-3 h-3 text-slate-400" />
                    {doc.authority}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-slate-400" />
                    {doc.issueDate}
                  </span>
                </div>
              </div>

              <h4 className="font-bold text-slate-900 text-sm leading-snug">
                {doc.title}
              </h4>

              <p className="text-xs text-slate-600 leading-relaxed">
                {doc.summary}
              </p>

              {doc.effectiveDate && (
                <div className="text-[11px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded inline-block border border-emerald-200">
                  Hiệu lực thi hành từ: {doc.effectiveDate}
                </div>
              )}
            </div>
          ))}

          {filtered.length === 0 && (
            <div className="text-center py-10 text-xs text-slate-400 italic">
              Không tìm thấy văn bản phù hợp với từ khóa.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-semibold"
          >
            Đóng bảng tra cứu
          </button>
        </div>
      </div>
    </div>
  );
};
