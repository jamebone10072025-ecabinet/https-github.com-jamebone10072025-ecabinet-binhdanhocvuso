import React, { useState } from "react";
import { ArrowLeft, CheckCircle, XCircle, QrCode, PlayCircle, Scale, Sparkles, BookOpen, ChevronLeft, ChevronRight, HelpCircle, ShieldCheck, CheckCircle2, Copy, Check, BookText, FileText, Radio, Headphones, Mic } from "lucide-react";
import { Lesson, Topic, Question } from "../types";
import { TOPICS_DATA } from "../data/curriculumData";
import { useProgress } from "../context/ProgressContext";
import { getLessonFullLecture } from "../data/lessonContentHelper";

interface LessonDetailProps {
  lesson: Lesson;
  topic: Topic | any;
  onBack: () => void;
  onSelectLesson: (nextLesson: Lesson, nextTopic: Topic) => void;
  onOpenPodcast?: (topicId: number) => void;
  onOpenSimulation?: () => void;
}

export const LessonDetail: React.FC<LessonDetailProps> = ({
  lesson,
  topic,
  onBack,
  onSelectLesson,
  onOpenPodcast,
  onOpenSimulation,
}) => {
  const { isLessonCompleted, toggleLessonCompleted, recordQuizResult } = useProgress();
  const [selectedAnswers, setSelectedAnswers] = useState<Record<string, number>>({});
  const [showExplanations, setShowExplanations] = useState<Record<string, boolean>>({});
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<"sm" | "base" | "lg">("base");

  const completed = isLessonCompleted(lesson.id);

  const fullLectureText = getLessonFullLecture(lesson, topic);

  const handleCopy = () => {
    navigator.clipboard.writeText(fullLectureText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectAnswer = (questionId: string, optionIndex: number) => {
    const updatedAnswers = { ...selectedAnswers, [questionId]: optionIndex };
    setSelectedAnswers(updatedAnswers);
    setShowExplanations((prev) => ({ ...prev, [questionId]: true }));

    // Check if all questions have been answered
    const totalQuestions = lesson.questions.length;
    const answeredCount = Object.keys(updatedAnswers).length;
    if (answeredCount >= totalQuestions) {
      let correct = 0;
      lesson.questions.forEach((q) => {
        if (updatedAnswers[q.id] === q.correctAnswerIndex) {
          correct++;
        }
      });
      recordQuizResult(lesson.id, correct, totalQuestions);
    }
  };

  // Find next and prev lessons
  const currentTopic = TOPICS_DATA.find((t) => t.id === lesson.topicId) || topic;
  const currentLessonIndex = currentTopic?.lessons?.findIndex((l: Lesson) => l.id === lesson.id) ?? -1;
  const prevLesson = currentLessonIndex > 0 ? currentTopic.lessons[currentLessonIndex - 1] : null;
  const nextLesson = currentTopic?.lessons && currentLessonIndex < currentTopic.lessons.length - 1 ? currentTopic.lessons[currentLessonIndex + 1] : null;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Back button and navigation breadcrumb */}
      <div className="flex items-center justify-between gap-4">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white text-slate-700 hover:bg-slate-50 text-xs font-semibold shadow-2xs transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Quay lại danh mục 26 chuyên đề</span>
        </button>

        <div className="flex items-center gap-2">
          {prevLesson && (
            <button
              onClick={() => onSelectLesson(prevLesson, currentTopic)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 text-xs font-medium"
            >
              <ChevronLeft className="w-3.5 h-3.5" />
              <span>Bài trước</span>
            </button>
          )}
          {nextLesson && (
            <button
              onClick={() => onSelectLesson(nextLesson, currentTopic)}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-slate-200 bg-white text-slate-600 hover:bg-slate-100 text-xs font-medium"
            >
              <span>Bài kế tiếp</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Lesson Header Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-5">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-red-800 text-white shadow-xs">
              Chuyên đề {lesson.topicId}: {topic?.title || currentTopic?.title}
            </span>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-slate-100 text-slate-700">
              Bài {lesson.lessonNumber}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => toggleLessonCompleted(lesson.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer ${
                completed
                  ? "bg-emerald-600 hover:bg-emerald-700 text-white shadow-emerald-900/20 ring-2 ring-emerald-400/40"
                  : "bg-slate-100 hover:bg-emerald-50 text-slate-700 hover:text-emerald-800 border border-slate-300 hover:border-emerald-300"
              }`}
            >
              <CheckCircle2 className={`w-4 h-4 ${completed ? "text-white" : "text-slate-400"}`} />
              <span>{completed ? "Đã hoàn thành bài học" : "Đánh dấu hoàn thành"}</span>
            </button>
            <div className="hidden sm:flex items-center gap-1.5 text-xs text-slate-500 font-medium">
              <QrCode className="w-4 h-4 text-red-700" />
              <span>Mã QR bài học</span>
            </div>
          </div>
        </div>

        <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight leading-snug">
          {lesson.title}
        </h2>

        {/* Video / Multimedia Player Simulation Box */}
        <div className="rounded-xl overflow-hidden bg-slate-900 text-white border border-slate-800 shadow-inner relative">
          <div className="p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <div className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-red-400 uppercase tracking-wider">
                <PlayCircle className="w-4 h-4" />
                <span>Video bài giảng micro-learning (5-7 phút)</span>
              </div>
              <h4 className="text-sm sm:text-base font-bold text-white">
                Chuyên đề {lesson.topicId} – Bài {lesson.lessonNumber}: {lesson.title}
              </h4>
              <p className="text-xs text-slate-400 max-w-xl">
                Bài giảng truyền cảm hứng theo chuẩn sư phạm 4 lớp, cô đọng tinh thần Nghị quyết 398/NQ-UBTVQH16 và tình huống công vụ.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-2 shrink-0">
              {onOpenSimulation && (
                <button
                  onClick={onOpenSimulation}
                  className="px-3.5 py-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 border border-rose-400/50 text-rose-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                  title="Thực hành hội thoại tiếp công dân ảo với Gemini Live Voice"
                >
                  <Mic className="w-4 h-4 text-rose-400 animate-pulse" />
                  <span>Mô phỏng Tiếp dân AI</span>
                </button>
              )}
              {onOpenPodcast && (
                <button
                  onClick={() => onOpenPodcast(lesson.topicId)}
                  className="px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 border border-amber-400/50 text-amber-300 text-xs font-bold flex items-center gap-2 transition-all cursor-pointer hover:scale-105"
                  title="Nghe Podcast bài giảng tóm tắt 2 phút"
                >
                  <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                  <span>Nghe Podcast 2 phút</span>
                </button>
              )}
              <button
                onClick={() => setIsVideoPlaying(!isVideoPlaying)}
                className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-rose-700 hover:from-red-500 hover:to-rose-600 text-white text-xs font-bold shadow-md shadow-red-900/40 flex items-center gap-2 transition-transform active:scale-95 cursor-pointer"
              >
                <PlayCircle className="w-4 h-4" />
                <span>{isVideoPlaying ? "Tạm dừng phát" : "Mở video bài giảng"}</span>
              </button>
            </div>
          </div>

          {isVideoPlaying && (
            <div className="p-6 bg-slate-950 border-t border-slate-800 space-y-3 animate-fadeIn">
              <div className="aspect-video w-full max-w-2xl mx-auto rounded-lg bg-slate-900 border border-slate-700 flex flex-col items-center justify-center p-6 text-center space-y-3">
                <div className="w-14 h-14 rounded-full bg-red-700/80 flex items-center justify-center text-white ring-4 ring-red-500/30">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <div className="text-sm font-semibold text-slate-200">
                  Đang phát audio/video giảng mẫu: {lesson.title}
                </div>
                <div className="w-full max-w-md bg-slate-800 rounded-full h-1.5 overflow-hidden">
                  <div className="bg-red-500 h-full w-2/5 animate-pulse"></div>
                </div>
                <div className="text-[11px] text-slate-400">
                  Thời lượng: 06:15 • Chuẩn Micro-learning bồi dưỡng công vụ
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Learning Objectives */}
        <div className="rounded-xl p-4 sm:p-5 bg-rose-50/50 border border-rose-200/60 space-y-2.5">
          <div className="flex items-center gap-2 text-red-900 font-bold text-sm uppercase tracking-wide">
            <BookOpen className="w-4 h-4 text-red-700" />
            <span>Mục tiêu bài học</span>
          </div>
          <ul className="space-y-1.5">
            {lesson.objectives.map((obj, idx) => (
              <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-slate-700">
                <span className="text-red-700 font-bold mt-0.5">•</span>
                <span>{obj}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Full Lecture Material (Tài liệu bài giảng toàn văn chi tiết) */}
        <div className="rounded-2xl border border-red-100 bg-linear-to-b from-white to-slate-50/50 p-5 sm:p-7 space-y-5 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-200/80 pb-3.5">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-red-700 text-white flex items-center justify-center shadow-xs">
                <BookText className="w-4 h-4" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base sm:text-lg tracking-tight">
                  Tài liệu bài giảng chi tiết (Toàn văn bài học)
                </h3>
                <p className="text-xs text-slate-500">
                  Chuẩn sư phạm micro-learning • Bình dân học vụ số tỉnh Gia Lai
                </p>
              </div>
            </div>

            {/* Font size switcher and copy button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center border border-slate-200 rounded-lg p-0.5 bg-white text-xs text-slate-600 shadow-2xs">
                <button
                  onClick={() => setFontSize("sm")}
                  className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === "sm" ? "bg-red-800 text-white font-bold" : "hover:bg-slate-100"}`}
                  title="Cỡ chữ nhỏ"
                >
                  A-
                </button>
                <button
                  onClick={() => setFontSize("base")}
                  className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === "base" ? "bg-red-800 text-white font-bold" : "hover:bg-slate-100"}`}
                  title="Cỡ chữ chuẩn"
                >
                  A
                </button>
                <button
                  onClick={() => setFontSize("lg")}
                  className={`px-2 py-1 rounded font-medium transition-colors ${fontSize === "lg" ? "bg-red-800 text-white font-bold" : "hover:bg-slate-100"}`}
                  title="Cỡ chữ lớn"
                >
                  A+
                </button>
              </div>

              <button
                onClick={handleCopy}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-100 text-xs font-semibold text-slate-700 shadow-2xs transition-colors cursor-pointer"
                title="Sao chép toàn bộ nội dung bài giảng"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sao chép bài giảng</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Render Full Lecture Content formatted */}
          <div
            className={`space-y-4 text-slate-800 leading-relaxed ${
              fontSize === "sm"
                ? "text-xs sm:text-sm leading-relaxed"
                : fontSize === "lg"
                ? "text-base sm:text-lg leading-loose"
                : "text-sm sm:text-base leading-relaxed"
            }`}
          >
            {fullLectureText.split("\n\n").map((paragraph, pIdx) => {
              const trimmed = paragraph.trim();

              // Opening greeting
              if (trimmed.startsWith("Kính thưa")) {
                return (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-xl bg-red-50/60 border-l-4 border-red-700 text-red-950 font-medium italic"
                  >
                    {trimmed}
                  </div>
                );
              }

              // Main capitalized heading
              if (pIdx === 0 && trimmed === trimmed.toUpperCase() && trimmed.length < 100) {
                return (
                  <div
                    key={pIdx}
                    className="py-2 border-b border-red-200/80 text-red-900 font-extrabold tracking-tight text-base sm:text-xl uppercase"
                  >
                    {trimmed}
                  </div>
                );
              }

              // Section headings like "1. Ba nấc thang..." or "2. Mỗi cán bộ..."
              if (/^\d+\.\s/.test(trimmed)) {
                const parts = trimmed.split("\n");
                const heading = parts[0];
                const rest = parts.slice(1).join("\n");
                return (
                  <div key={pIdx} className="space-y-2 mt-4 pt-2">
                    <h4 className="font-bold text-slate-900 text-base sm:text-lg flex items-center gap-2 text-red-900">
                      <span className="w-2 h-2 rounded-full bg-red-700"></span>
                      <span>{heading}</span>
                    </h4>
                    {rest && <p className="whitespace-pre-line pl-4 text-slate-700">{rest}</p>}
                  </div>
                );
              }

              // Closing address like "Ở bài tiếp theo,..." or "Chúc mừng..."
              if (trimmed.startsWith("Ở bài tiếp theo,") || trimmed.startsWith("Chúc mừng")) {
                return (
                  <div
                    key={pIdx}
                    className="p-4 rounded-xl bg-slate-900 text-slate-100 border border-slate-800 space-y-1.5 shadow-xs"
                  >
                    <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider">
                      <Sparkles className="w-4 h-4" />
                      <span>Lời kết bài học & Chuyển giao</span>
                    </div>
                    <p className="font-medium text-slate-100 whitespace-pre-line leading-relaxed">
                      {trimmed}
                    </p>
                  </div>
                );
              }

              // Golden rule / quote
              if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
                return (
                  <div
                    key={pIdx}
                    className="p-3.5 rounded-lg bg-amber-50 border-l-4 border-amber-500 text-amber-950 font-semibold text-center italic"
                  >
                    {trimmed}
                  </div>
                );
              }

              // Default standard paragraph
              return (
                <p key={pIdx} className="whitespace-pre-line text-slate-700">
                  {trimmed}
                </p>
              );
            })}
          </div>
        </div>

        {/* Lesson Summary & Key Takeways */}
        <div className="space-y-3 bg-slate-50/80 rounded-xl p-4 sm:p-5 border border-slate-200/80">
          <h3 className="font-bold text-slate-900 text-sm sm:text-base flex items-center gap-2 border-b border-slate-200 pb-2">
            <span>Tóm tắt cốt lõi bài học</span>
          </h3>
          <p className="text-xs sm:text-sm text-slate-700 leading-relaxed whitespace-pre-line">
            {lesson.summary}
          </p>

          {lesson.illustrationText && (
            <div className="p-3 rounded-lg bg-amber-50 border border-amber-200/70 text-xs text-amber-900 font-medium">
              <strong className="text-amber-950 font-bold block mb-1">Mô hình minh họa:</strong>
              {lesson.illustrationText}
            </div>
          )}
        </div>

        {/* Key Action Message / Golden Rule */}
        <div className="rounded-xl p-4 sm:p-5 bg-slate-900 text-white border-l-4 border-amber-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-bold text-xs uppercase tracking-wider">
            <Sparkles className="w-4 h-4" />
            <span>Thông điệp hành động & Quy tắc vàng</span>
          </div>
          <p className="text-sm font-semibold text-slate-100 leading-relaxed">
            "{lesson.keyActionMessage}"
          </p>
        </div>

        {/* Legal Bases */}
        {lesson.legalBases && lesson.legalBases.length > 0 && (
          <div className="p-3 rounded-lg bg-slate-100 border border-slate-200 text-xs text-slate-700 flex items-center gap-2">
            <Scale className="w-4 h-4 text-slate-600 shrink-0" />
            <div>
              <span className="font-bold text-slate-800">Căn cứ pháp lý: </span>
              {lesson.legalBases.join(" • ")}
            </div>
          </div>
        )}
      </div>

      {/* Quiz Section */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 sm:p-8 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div className="space-y-0.5">
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <HelpCircle className="w-5 h-5 text-red-700" />
              <span>Ngân hàng câu hỏi trắc nghiệm sau bài học</span>
            </h3>
            <p className="text-xs text-slate-500">
              Gồm phần Kiểm tra kiến thức và Tình huống công vụ thực tế (chuẩn sát hạch)
            </p>
          </div>
          <span className="text-xs font-bold px-2.5 py-1 rounded-md bg-slate-100 text-slate-700">
            {lesson.questions.length} câu hỏi
          </span>
        </div>

        {/* Questions List */}
        <div className="space-y-6">
          {lesson.questions.map((q: Question, qIdx: number) => {
            const selectedOpt = selectedAnswers[q.id];
            const isAnswered = selectedOpt !== undefined;
            const isCorrect = selectedOpt === q.correctAnswerIndex;

            return (
              <div
                key={q.id}
                className={`p-5 rounded-xl border transition-all ${
                  isAnswered
                    ? isCorrect
                      ? "bg-emerald-50/40 border-emerald-300"
                      : "bg-rose-50/40 border-rose-300"
                    : "bg-slate-50/60 border-slate-200"
                }`}
              >
                {/* Question Header Tag */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span
                    className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wider ${
                      q.type === "scenario"
                        ? "bg-amber-100 text-amber-800 border border-amber-200"
                        : "bg-indigo-100 text-indigo-800 border border-indigo-200"
                    }`}
                  >
                    {q.type === "scenario" ? "Tình huống công vụ" : "Kiểm tra kiến thức"}
                  </span>
                  <span className="text-xs text-slate-400 font-semibold">Câu {qIdx + 1}</span>
                </div>

                <p className="text-sm sm:text-base font-bold text-slate-900 mb-4 leading-relaxed">
                  {q.question}
                </p>

                {/* Options List */}
                <div className="space-y-2">
                  {q.options.map((opt, optIdx) => {
                    const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D
                    const isSelected = selectedOpt === optIdx;
                    const isTheCorrectOne = optIdx === q.correctAnswerIndex;

                    let btnStyle = "bg-white border-slate-200 text-slate-700 hover:bg-slate-100";
                    if (isAnswered) {
                      if (isSelected && isCorrect) {
                        btnStyle = "bg-emerald-600 text-white border-emerald-700 font-medium";
                      } else if (isSelected && !isCorrect) {
                        btnStyle = "bg-rose-600 text-white border-rose-700 font-medium";
                      } else if (!isSelected && isTheCorrectOne) {
                        btnStyle = "bg-emerald-100 border-emerald-300 text-emerald-900 font-medium";
                      } else {
                        btnStyle = "bg-white/60 border-slate-200 text-slate-400 opacity-60";
                      }
                    }

                    return (
                      <button
                        key={optIdx}
                        disabled={isAnswered}
                        onClick={() => handleSelectAnswer(q.id, optIdx)}
                        className={`w-full text-left p-3 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${btnStyle}`}
                      >
                        <span className="font-bold shrink-0 mt-0.5 px-2 py-0.5 rounded bg-black/5 text-[11px]">
                          {optionLetter}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                        {isAnswered && isTheCorrectOne && (
                          <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0" />
                        )}
                        {isAnswered && isSelected && !isCorrect && (
                          <XCircle className="w-4 h-4 text-white shrink-0" />
                        )}
                      </button>
                    );
                  })}
                </div>

                {/* Explanation Box */}
                {isAnswered && (
                  <div
                    className={`mt-4 p-3.5 rounded-lg text-xs leading-relaxed border ${
                      isCorrect
                        ? "bg-emerald-100/70 border-emerald-300 text-emerald-900"
                        : "bg-amber-100/70 border-amber-300 text-amber-950"
                    }`}
                  >
                    <div className="font-bold mb-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-4 h-4" />
                      <span>{isCorrect ? "Chính xác!" : "Đáp án chuẩn & Căn cứ nghiệp vụ:"}</span>
                    </div>
                    <p>{q.explanation}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Quiz Completion Banner */}
        {Object.keys(selectedAnswers).length >= lesson.questions.length && (
          <div className="p-5 rounded-xl bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-300 text-emerald-950 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                <CheckCircle2 className="w-6 h-6" />
              </div>
              <div>
                <h4 className="font-bold text-sm text-emerald-950">
                  Bạn đã hoàn thành câu hỏi trắc nghiệm của bài học này!
                </h4>
                <p className="text-xs text-emerald-800">
                  Tiến độ học tập đã được lưu tự động trên thiết bị của bạn.
                </p>
              </div>
            </div>

            {nextLesson && (
              <button
                onClick={() => onSelectLesson(nextLesson, currentTopic)}
                className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs shadow-sm flex items-center gap-1.5 transition-colors shrink-0"
              >
                <span>Học bài tiếp theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
