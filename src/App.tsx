import React, { useState } from "react";
import { Header } from "./components/Header";
import { TopicList } from "./components/TopicList";
import { LessonDetail } from "./components/LessonDetail";
import { ExamCertification } from "./components/ExamCertification";
import { PracticeTools } from "./components/PracticeTools";
import { AiTutor } from "./components/AiTutor";
import { LegalDocsModal } from "./components/LegalDocsModal";
import { Lesson, Topic } from "./types";
import { FULL_TOPIC_LIST, TOPICS_DATA } from "./data/curriculumData";
import { ShieldCheck, BookOpen, ExternalLink, Award, FileText } from "lucide-react";

export default function App() {
  const [activeTab, setActiveTab] = useState<"curriculum" | "exam" | "tools" | "legal" | "ai">("curriculum");
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [selectedTopic, setSelectedTopic] = useState<Topic | typeof FULL_TOPIC_LIST[0] | null>(null);
  const [isLegalModalOpen, setIsLegalModalOpen] = useState(false);
  const [aiPromptSeed, setAiPromptSeed] = useState<string>("");

  const handleSelectLesson = (lesson: Lesson, topic: Topic | typeof FULL_TOPIC_LIST[0]) => {
    setSelectedLesson(lesson);
    setSelectedTopic(topic);
    setActiveTab("curriculum");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToTopics = () => {
    setSelectedLesson(null);
    setSelectedTopic(null);
  };

  const handleSendPromptToAI = (promptText: string) => {
    setAiPromptSeed(promptText);
    setActiveTab("ai");
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800 antialiased selection:bg-red-100 selection:text-red-900">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab !== "curriculum") {
            // Keep lesson in background or reset as appropriate
          }
        }}
        onOpenLegal={() => setIsLegalModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {activeTab === "curriculum" && (
          <div>
            {selectedLesson ? (
              <LessonDetail
                lesson={selectedLesson}
                topic={selectedTopic}
                onBack={handleBackToTopics}
                onSelectLesson={(nextL, nextT) => {
                  setSelectedLesson(nextL);
                  setSelectedTopic(nextT);
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
              />
            ) : (
              <TopicList onSelectLesson={handleSelectLesson} />
            )}
          </div>
        )}

        {activeTab === "exam" && <ExamCertification />}

        {activeTab === "tools" && <PracticeTools onSendToAI={handleSendPromptToAI} />}

        {activeTab === "ai" && <AiTutor initialPrompt={aiPromptSeed} />}
      </main>

      {/* Legal Documents Modal */}
      <LegalDocsModal
        isOpen={isLegalModalOpen}
        onClose={() => setIsLegalModalOpen(false)}
      />

      {/* Official Government Aesthetic Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-slate-800 mt-12 py-10 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-800/80 text-white flex items-center justify-center border border-red-700/50">
                <ShieldCheck className="w-6 h-6 text-amber-300" />
              </div>
              <div>
                <h4 className="text-sm font-bold text-white tracking-wide">
                  BÌNH DÂN HỌC VỤ SỐ • TẬP 1: KHỐI CƠ QUAN NHÀ NƯỚC
                </h4>
                <p className="text-[11px] text-slate-400">
                  Bộ học liệu đa phương tiện kiến thức, kỹ năng số cơ bản Micro-learning
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-medium">
              <button
                onClick={() => setIsLegalModalOpen(true)}
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <FileText className="w-3.5 h-3.5" />
                <span>Căn cứ pháp lý</span>
              </button>
              <button
                onClick={() => {
                  setSelectedLesson(null);
                  setActiveTab("curriculum");
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="hover:text-amber-400 transition-colors flex items-center gap-1"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>26 Chuyên đề</span>
              </button>
              <button
                onClick={() => setActiveTab("exam")}
                className="hover:text-amber-400 transition-colors flex items-center gap-1 text-amber-300"
              >
                <Award className="w-3.5 h-3.5" />
                <span>Sát hạch đầu ra</span>
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-[11px] leading-relaxed">
            <div className="space-y-1">
              <div className="text-white font-bold">Cơ quan chủ trì & Phê duyệt</div>
              <div>Ủy ban Khoa học, Công nghệ và Môi trường của Quốc hội Khóa XVI</div>
              <div>Ban chỉ đạo Chuyển đổi số Quốc gia</div>
              <div className="text-amber-400/90 font-medium">Nghị quyết số 398/NQ-UBTVQH16 ngày 08/8/2026</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold">Chủ biên & Ban biên soạn</div>
              <div>Chủ biên: TS. Trần Văn Khải (Phó Chủ nhiệm Ủy ban KH, CN & MT)</div>
              <div>Tổng biên tập: TS. Trần Văn Khải</div>
              <div>Quyết định ban hành số 757/QĐ-BKHCN</div>
            </div>

            <div className="space-y-1">
              <div className="text-white font-bold">Các cơ quan tiếp nhận chuyển giao</div>
              <div>Văn phòng Quốc hội, Ban Nội chính Trung ương, Tòa án nhân dân tối cao, VKSND tối cao, UBND TP. Hồ Chí Minh, Tỉnh ủy Ninh Bình...</div>
              <div className="text-slate-500 pt-1">
                Bảo vệ bản quyền theo quy định pháp luật. Tích hợp AI Gemini phục vụ nghiên cứu và học tập số.
              </div>
            </div>
          </div>

          <div className="pt-4 border-t border-slate-800/80 text-center text-[10px] text-slate-500">
            © 2026 Bình Dân Học Vụ Số. Chương trình phổ cập kỹ năng số quốc gia phục vụ cán bộ, công chức, viên chức.
          </div>
        </div>
      </footer>
    </div>
  );
}
