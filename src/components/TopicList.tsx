import React, { useState } from "react";
import { Search, BookOpen, Layers, CheckCircle2, ChevronRight, Sparkles, Shield, Video, FileText, Image as ImageIcon, Play, Info, ExternalLink, Filter } from "lucide-react";
import { FULL_TOPIC_LIST, TOPICS_DATA } from "../data/curriculumData";
import { MASTER_LESSONS_136, PROGRAM_LEVEL_VIDEOS } from "../data/masterLessons136";
import { Topic, Lesson } from "../types";
import { useProgress } from "../context/ProgressContext";

interface TopicListProps {
  onSelectLesson: (lesson: Lesson, topic: Topic | typeof FULL_TOPIC_LIST[0]) => void;
}

export const TopicList: React.FC<TopicListProps> = ({ onSelectLesson }) => {
  const { isLessonCompleted, getTopicProgress, toggleLessonCompleted, completedCount, totalLessons, completionPercentage } = useProgress();
  const [viewMode, setViewMode] = useState<"topics" | "master136" | "programVideos">("topics");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");
  const [selectedProgramVideo, setSelectedProgramVideo] = useState<typeof PROGRAM_LEVEL_VIDEOS[0] | null>(null);

  const categories = [
    "Tất cả",
    "Nhận thức & Nền tảng",
    "Trí tuệ nhân tạo (AI)",
    "Thiết bị & Văn phòng",
    "Thông tin & Dữ liệu",
    "Tương tác & Hợp tác số",
    "Quyền & Trách nhiệm số",
    "Sáng tạo nội dung & Bản quyền",
    "An toàn, Sức khỏe & Môi trường",
    "Xử lý sự cố & Đổi mới",
    "Đánh giá & Phát triển năng lực"
  ];

  const filteredTopics = FULL_TOPIC_LIST.filter((t) => {
    const matchesCat = selectedCategory === "Tất cả" || t.category === selectedCategory;
    const matchesSearch =
      t.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `chuyên đề ${t.id}`.includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  const filtered136Lessons = MASTER_LESSONS_136.filter((l) => {
    const matchesCat = selectedCategory === "Tất cả" || l.category === selectedCategory;
    const matchesSearch =
      l.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      l.topicTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      `bài ${l.lessonNumber}`.includes(searchTerm.toLowerCase()) ||
      `tt ${l.orderIndex}`.includes(searchTerm.toLowerCase());
    return matchesCat && matchesSearch;
  });

  // Find detailed data if available
  const getDetailedTopic = (id: number): Topic | undefined => {
    return TOPICS_DATA.find((item) => item.id === id);
  };

  const handleOpenLessonByIndex = (topicId: number, lessonNum: number) => {
    const detail = getDetailedTopic(topicId);
    if (detail && detail.lessons) {
      const matched = detail.lessons.find((les) => les.lessonNumber === lessonNum);
      if (matched) {
        onSelectLesson(matched, detail);
        return;
      }
      if (detail.lessons.length > 0) {
        onSelectLesson(detail.lessons[0], detail);
        return;
      }
    }
    // Fallback
    onSelectLesson(TOPICS_DATA[0].lessons[0], TOPICS_DATA[0]);
  };

  return (
    <div className="space-y-8">
      {/* Hero Banner with Official Framework Context */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-slate-900 via-red-950 to-slate-900 text-white p-6 sm:p-8 shadow-xl border border-red-900/30">
        <div className="relative z-10 max-w-4xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Nghị quyết số 398/NQ-UBTVQH16 • Bình dân học vụ số tỉnh Gia Lai</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-white leading-tight">
            Bộ học liệu đa phương tiện <br className="hidden sm:inline" />
            <span className="text-amber-400">Kiến thức, kỹ năng số cơ bản micro-learning</span>
          </h2>

          <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
            Giải pháp tổ chức học tập hiện đại, tinh gọn theo định hướng <strong className="text-white">Micro-learning</strong> dành cho cán bộ, công chức, viên chức và người lao động trong khối cơ quan nhà nước; lan tỏa phong trào <em>"Bình dân học vụ số"</em> thống nhất trong toàn hệ thống chính trị.
          </p>

          {/* Highlights KPI Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3">
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-amber-400">26</div>
              <div className="text-xs text-slate-400 font-medium">Chuyên đề cốt lõi</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-rose-400">136</div>
              <div className="text-xs text-slate-400 font-medium">Bài giảng video ngắn</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-emerald-400">{completionPercentage}%</div>
              <div className="text-xs text-slate-300 font-medium">Tiến độ ({completedCount}/{totalLessons} bài)</div>
            </div>
            <div className="bg-white/5 backdrop-blur border border-white/10 rounded-xl p-3">
              <div className="text-xl sm:text-2xl font-black text-sky-400">VNeID</div>
              <div className="text-xs text-slate-400 font-medium">Đồng bộ chứng nhận số</div>
            </div>
          </div>
        </div>

        {/* Subtle decorative background watermark */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 opacity-10 pointer-events-none">
          <Shield className="w-80 h-80 text-amber-400" />
        </div>
      </div>

      {/* View Switcher Tabs according to Appendix 2 structure */}
      <div className="flex items-center gap-1.5 p-1.5 bg-slate-100/90 rounded-xl border border-slate-200 overflow-x-auto no-scrollbar">
        <button
          onClick={() => setViewMode("topics")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            viewMode === "topics"
              ? "bg-white text-red-900 shadow-sm border border-slate-200/80"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Layers className="w-4 h-4 text-red-700" />
          <span>26 chuyên đề</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-red-100 text-red-800 font-semibold">26</span>
        </button>

        <button
          onClick={() => setViewMode("master136")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            viewMode === "master136"
              ? "bg-white text-red-900 shadow-sm border border-slate-200/80"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <BookOpen className="w-4 h-4 text-red-700" />
          <span>136 bài học</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-amber-100 text-amber-900 font-semibold">136</span>
        </button>

        <button
          onClick={() => setViewMode("programVideos")}
          className={`flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
            viewMode === "programVideos"
              ? "bg-white text-red-900 shadow-sm border border-slate-200/80"
              : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
          }`}
        >
          <Video className="w-4 h-4 text-red-700" />
          <span>Video chương trình</span>
          <span className="px-1.5 py-0.5 rounded-full text-[10px] sm:text-[11px] bg-rose-100 text-rose-900 font-semibold">3</span>
        </button>
      </div>

      {/* Filter and Search Bar (For topics and 136 lessons) */}
      {viewMode !== "programVideos" && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="search-topics-input"
                type="text"
                placeholder={
                  viewMode === "topics"
                    ? "Tìm kiếm chuyên đề, từ khóa (AI, Vibe Coding, 3-2-1, Mật...)"
                    : "Tìm bài học (TT 1-136, tiêu đề bài, tên chuyên đề, AI...)"
                }
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 bg-white text-sm text-slate-800 focus:outline-hidden focus:ring-2 focus:ring-red-500/20 focus:border-red-600 transition-all shadow-xs"
              />
            </div>
            <div className="text-xs text-slate-500 font-medium self-end sm:self-center">
              {viewMode === "topics" ? (
                <>Hiển thị <strong>{filteredTopics.length}</strong> / 26 chuyên đề</>
              ) : (
                <>Hiển thị <strong>{filtered136Lessons.length}</strong> / 136 bài học chuẩn</>
              )}
            </div>
          </div>

          {/* Category Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-2 no-scrollbar text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-full font-medium whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? "bg-slate-900 text-white shadow-xs"
                    : "bg-white text-slate-600 border border-slate-200 hover:bg-slate-100 hover:text-slate-900"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* VIEW 1: 26 TOPICS GRID */}
      {viewMode === "topics" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredTopics.map((item) => {
            const detail = getDetailedTopic(item.id);
            const hasInteractiveLessons = detail && detail.lessons.length > 0;
            const { completed, total, percentage, isFinished } = getTopicProgress(item.id);

            return (
              <div
                key={item.id}
                className="group bg-white rounded-xl border border-slate-200/90 hover:border-red-300 hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden"
              >
                <div className="p-5 space-y-3">
                  {/* Header tag and topic number */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-[11px] font-bold bg-red-100/80 text-red-800 border border-red-200/70">
                      CHUYÊN ĐỀ {item.id}
                    </span>
                    <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>{item.lessons} bài</span>
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-base leading-snug group-hover:text-red-700 transition-colors">
                    {item.title}
                  </h3>

                  <div className="text-xs text-slate-500 font-medium">
                    Phân loại: <span className="text-slate-700 font-semibold">{item.category}</span>
                  </div>

                  {/* Topic Progress Bar */}
                  <div className="space-y-1.5 pt-1">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-semibold text-slate-700 flex items-center gap-1.5">
                        {isFinished ? (
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                        ) : (
                          <span className="w-2 h-2 rounded-full bg-slate-300 shrink-0" />
                        )}
                        <span>Tiến độ: {completed}/{total} bài</span>
                      </span>
                      <span className={`font-bold ${isFinished ? "text-emerald-700" : "text-slate-600"}`}>
                        {percentage}%
                      </span>
                    </div>
                    <div className="w-full bg-slate-100 rounded-full h-1.5 overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-300 ${
                          isFinished ? "bg-emerald-500" : "bg-red-600"
                        }`}
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                  </div>

                  {detail && (
                    <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed">
                      {detail.description}
                    </p>
                  )}

                  {/* Sub-lessons list preview */}
                  {hasInteractiveLessons ? (
                    <div className="pt-2 border-t border-slate-100 space-y-1.5">
                      <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                        Bài học trọng tâm & trắc nghiệm:
                      </div>
                      {detail.lessons.map((lesson) => {
                        const isDone = isLessonCompleted(lesson.id);
                        return (
                          <div
                            key={lesson.id}
                            onClick={() => onSelectLesson(lesson, detail)}
                            className={`flex items-center justify-between p-2 rounded-lg text-xs cursor-pointer transition-colors border ${
                              isDone
                                ? "bg-emerald-50/70 border-emerald-200 text-emerald-950 font-medium hover:bg-emerald-100/80"
                                : "bg-slate-50 hover:bg-red-50/80 text-slate-700 hover:text-red-900 border-slate-100 hover:border-red-200"
                            }`}
                          >
                            <span className="truncate font-medium flex items-center gap-1.5">
                              {isDone && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />}
                              <span>
                                Bài {lesson.lessonNumber}: {lesson.title}
                              </span>
                            </span>
                            <span className="text-[11px] text-slate-400 shrink-0 flex items-center gap-1">
                              {isDone ? <span className="text-emerald-700 font-bold text-[10px]">Đã học</span> : null}
                              <ChevronRight className="w-3.5 h-3.5 text-slate-400 ml-1" />
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  ) : (
                    <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
                      <span>{item.pages} trong giáo trình</span>
                      <span className="text-[11px] bg-slate-100 px-2 py-0.5 rounded text-slate-600">Đầy đủ 136 bài</span>
                    </div>
                  )}
                </div>

                {/* Bottom Card Action */}
                <div className="px-5 py-3 bg-slate-50/80 border-t border-slate-100 flex items-center justify-between text-xs">
                  {hasInteractiveLessons ? (
                    <button
                      onClick={() => onSelectLesson(detail.lessons[0], detail)}
                      className="w-full text-center py-1.5 rounded-lg bg-red-700 text-white font-semibold hover:bg-red-800 transition-colors shadow-xs flex items-center justify-center gap-1.5"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-amber-300" />
                      <span>Học & Làm trắc nghiệm</span>
                    </button>
                  ) : (
                    <button
                      onClick={() => {
                        handleOpenLessonByIndex(item.id, 1);
                      }}
                      className="w-full text-center py-1.5 rounded-lg bg-slate-200/80 text-slate-700 font-medium hover:bg-slate-300 transition-colors flex items-center justify-center gap-1"
                    >
                      <BookOpen className="w-3.5 h-3.5" />
                      <span>Tra cứu bài học ({item.lessons} bài)</span>
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* VIEW 2: FULL 136 LESSONS TABLE (BẢNG 1 - PHỤ LỤC 2) */}
      {viewMode === "master136" && (
        <div className="space-y-4">
          <div className="bg-amber-50/90 border border-amber-200 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <strong className="text-amber-950 font-bold block sm:inline">Phụ lục 2 - Bảng 1: Danh mục học liệu 26 chuyên đề (136 bài học)</strong>
              <p>
                Mỗi bài học được phê chuẩn bao gồm trọn bộ học liệu chuẩn: <strong>1 Video bài giảng ngắn (Micro-learning)</strong>, <strong>1 Infographic tóm lược trực quan</strong> và <strong>1 Banner học tập/tuyên truyền</strong>. Tổng cộng: 136 Video + 136 Infographic + 136 Banner.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto bg-white rounded-xl border border-slate-200 shadow-xs">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-100/90 border-b border-slate-200 text-slate-700 font-bold uppercase tracking-wider">
                  <th className="py-3 px-3 text-center w-14">TT</th>
                  <th className="py-3 px-3 w-28">Chuyên đề</th>
                  <th className="py-3 px-4">Tên bài giảng (Micro-learning)</th>
                  <th className="py-3 px-3 text-center w-24">Video</th>
                  <th className="py-3 px-3 text-center w-24">Infographic</th>
                  <th className="py-3 px-3 text-center w-24">Banner</th>
                  <th className="py-3 px-3 text-center w-24">Tiến độ</th>
                  <th className="py-3 px-3 text-right w-28">Thao tác</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered136Lessons.map((item) => {
                  const lessonUniqueId = `cd${item.topicId}-b${item.lessonNumber}`;
                  const isDone = isLessonCompleted(lessonUniqueId);

                  return (
                    <tr
                      key={item.orderIndex}
                      className="hover:bg-slate-50 transition-colors group"
                    >
                      <td className="py-2.5 px-3 text-center font-bold text-slate-900 bg-slate-50/50">
                        {item.orderIndex}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="inline-block px-2 py-0.5 rounded bg-red-50 text-red-800 font-semibold text-[11px] border border-red-100">
                          CĐ {item.topicId}
                        </span>
                      </td>
                      <td className="py-2.5 px-4">
                        <div className="font-semibold text-slate-900 group-hover:text-red-700 transition-colors">
                          Bài {item.lessonNumber}: {item.title}
                        </div>
                        <div className="text-[11px] text-slate-400 truncate max-w-md">
                          {item.topicTitle} • {item.category}
                        </div>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-rose-50 text-rose-700 font-medium text-[11px]">
                          <Video className="w-3 h-3 text-rose-600" />
                          <span>1 Video</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 font-medium text-[11px]">
                          <FileText className="w-3 h-3 text-blue-600" />
                          <span>1 Graphic</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 text-amber-800 font-medium text-[11px]">
                          <ImageIcon className="w-3 h-3 text-amber-600" />
                          <span>1 Banner</span>
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-center">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonCompleted(lessonUniqueId);
                          }}
                          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full font-bold text-[11px] transition-colors cursor-pointer ${
                            isDone
                              ? "bg-emerald-100 text-emerald-800 border border-emerald-300 hover:bg-emerald-200"
                              : "bg-slate-100 text-slate-500 hover:bg-slate-200 border border-slate-200"
                          }`}
                          title="Nhấp để chuyển đổi trạng thái hoàn thành"
                        >
                          <CheckCircle2 className="w-3 h-3" />
                          <span>{isDone ? "Đã xong" : "Chưa học"}</span>
                        </button>
                      </td>
                      <td className="py-2.5 px-3 text-right">
                        <button
                          onClick={() => handleOpenLessonByIndex(item.topicId, item.lessonNumber)}
                          className="px-2.5 py-1 rounded-md bg-red-700 text-white font-medium hover:bg-red-800 transition-colors text-[11px] inline-flex items-center gap-1"
                        >
                          <span>Học ngay</span>
                          <ChevronRight className="w-3 h-3" />
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* VIEW 3: PROGRAM LEVEL VIDEOS (BẢNG 2 - PHỤ LỤC 2) */}
      {viewMode === "programVideos" && (
        <div className="space-y-6">
          <div className="bg-red-50/90 border border-red-200 rounded-xl p-4 text-xs text-red-950 flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-red-700 shrink-0 mt-0.5" />
            <div className="space-y-1 leading-relaxed">
              <strong className="font-bold text-red-950 block sm:inline">Phụ lục 2 - Bảng 2: Danh mục video giới thiệu, hướng dẫn học tập (cấp chương trình)</strong>
              <p>
                Đây là 3 video nền tảng được Ủy ban Thường vụ Quốc hội phê chuẩn nhằm định hướng tư tưởng, phổ biến khung chương trình và hướng dẫn chuẩn đầu ra cho toàn bộ cán bộ, cơ quan trong hệ thống chính trị.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {PROGRAM_LEVEL_VIDEOS.map((progVid) => (
              <div
                key={progVid.id}
                className="bg-white rounded-2xl border border-slate-200 shadow-sm hover:border-red-300 hover:shadow-md transition-all overflow-hidden flex flex-col justify-between"
              >
                <div>
                  {/* Video Thumbnail Mockup */}
                  <div className="relative aspect-video bg-gradient-to-br from-slate-900 via-slate-800 to-red-950 flex items-center justify-center p-4 text-white overflow-hidden group cursor-pointer"
                    onClick={() => setSelectedProgramVideo(progVid)}
                  >
                    <div className="w-12 h-12 rounded-full bg-red-600/90 hover:bg-red-600 text-white flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform">
                      <Play className="w-5 h-5 fill-current ml-0.5" />
                    </div>
                    <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-black/60 backdrop-blur text-[11px] font-bold text-amber-300 border border-white/10">
                      VIDEO TT {progVid.id}
                    </span>
                    <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded-md bg-black/70 backdrop-blur text-[11px] font-medium text-slate-300">
                      {progVid.durationEstimate}
                    </span>
                  </div>

                  <div className="p-5 space-y-3">
                    <div className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-red-100 text-red-800">
                      {progVid.type}
                    </div>

                    <h3 className="font-bold text-slate-900 text-sm sm:text-base leading-snug">
                      {progVid.title}
                    </h3>

                    <p className="text-xs text-slate-600 leading-relaxed">
                      {progVid.description}
                    </p>

                    <div className="pt-2 border-t border-slate-100 text-[11px] text-slate-500">
                      <strong className="text-slate-700">Đối tượng phục vụ:</strong> {progVid.target}
                    </div>
                  </div>
                </div>

                <div className="p-4 bg-slate-50 border-t border-slate-100">
                  <button
                    onClick={() => setSelectedProgramVideo(progVid)}
                    className="w-full py-2 rounded-lg bg-red-700 text-white text-xs font-semibold hover:bg-red-800 transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    <span>Xem nội dung chi tiết</span>
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Detailed Program Video Modal */}
          {selectedProgramVideo && (
            <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
              <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-slate-200 p-6 space-y-5 animate-in fade-in zoom-in-95 duration-200">
                <div className="flex items-start justify-between gap-3 border-b border-slate-100 pb-4">
                  <div>
                    <span className="inline-block px-2.5 py-0.5 rounded bg-red-100 text-red-800 font-bold text-xs mb-1">
                      Bảng 2 - Video TT {selectedProgramVideo.id} • {selectedProgramVideo.type}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900">
                      {selectedProgramVideo.title}
                    </h3>
                  </div>
                  <button
                    onClick={() => setSelectedProgramVideo(null)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                  >
                    ✕
                  </button>
                </div>

                {/* Video Simulation Canvas */}
                <div className="aspect-video bg-gradient-to-br from-slate-950 via-red-950 to-slate-900 rounded-xl flex flex-col items-center justify-center text-white p-6 text-center space-y-3 relative overflow-hidden border border-red-900/40">
                  <div className="w-16 h-16 rounded-full bg-red-600/90 text-white flex items-center justify-center shadow-2xl animate-pulse">
                    <Play className="w-7 h-7 fill-current ml-1" />
                  </div>
                  <div className="text-sm font-semibold text-amber-300">
                    Học liệu số chuẩn Nghị quyết 398/NQ-UBTVQH16
                  </div>
                  <div className="text-xs text-slate-300 max-w-md">
                    Thời lượng dự kiến: {selectedProgramVideo.durationEstimate} • Định dạng phát trực tuyến bảo đảm băng thông thấp cho cơ quan nhà nước
                  </div>
                </div>

                <div className="space-y-3 text-xs leading-relaxed text-slate-700">
                  <h4 className="font-bold text-sm text-slate-900">Tóm tắt nội dung trọng tâm:</h4>
                  <p className="bg-slate-50 p-3.5 rounded-xl border border-slate-100">
                    {selectedProgramVideo.description}
                  </p>
                  <div>
                    <strong className="text-slate-900">Chuẩn đầu ra và mục tiêu truyền cảm hứng:</strong>
                    <ul className="list-disc pl-5 mt-1 space-y-1 text-slate-600">
                      <li>Khơi dậy tinh thần tự học, tự rèn luyện kỹ năng số như phong trào xóa mù chữ năm 1945.</li>
                      <li>Nắm vững lộ trình 26 chuyên đề, tự tin tham gia sát hạch và ứng dụng vào nhiệm vụ công vụ hàng ngày.</li>
                      <li>Sử dụng thành thạo tài khoản định danh điện tử VNeID và ký số văn bản điện tử.</li>
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => setSelectedProgramVideo(null)}
                    className="px-5 py-2 rounded-xl bg-slate-900 text-white text-xs font-semibold hover:bg-slate-800 transition-colors"
                  >
                    Đóng cửa sổ
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
