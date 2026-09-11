import React, { useState, useEffect, useMemo } from "react";
import { Award, CheckCircle2, XCircle, Clock, AlertTriangle, ShieldCheck, Download, Printer, RefreshCw, QrCode, FileCheck, Share2 } from "lucide-react";
import { TOPICS_DATA } from "../data/curriculumData";
import { Question } from "../types";

export const ExamCertification: React.FC = () => {
  // Collect all questions across all lessons
  const allQuestions: Question[] = useMemo(() => {
    const list: Question[] = [];
    TOPICS_DATA.forEach((topic) => {
      topic.lessons.forEach((lesson) => {
        lesson.questions.forEach((q) => {
          list.push(q);
        });
      });
    });
    return list;
  }, []);

  // Exam States: "idle" | "testing" | "result" | "certificate"
  const [examState, setExamState] = useState<"idle" | "testing" | "result">("idle");
  const [studentName, setStudentName] = useState("Nguyễn Văn An");
  const [agency, setAgency] = useState("Văn phòng Đoàn ĐBQH & HĐND");
  const [examQuestions, setExamQuestions] = useState<Question[]>([]);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [timeLeft, setTimeLeft] = useState(1200); // 20 minutes
  const [score, setScore] = useState(0);
  const [certCode, setCertCode] = useState("");

  const startExam = () => {
    // Select up to 15 questions randomly
    const shuffled = [...allQuestions].sort(() => 0.5 - Math.random());
    const selected = shuffled.slice(0, Math.min(15, shuffled.length));
    setExamQuestions(selected);
    setAnswers({});
    setTimeLeft(900); // 15 minutes
    setExamState("testing");
  };

  useEffect(() => {
    if (examState !== "testing") return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [examState, answers]);

  const handleSubmitExam = () => {
    let correctCount = 0;
    examQuestions.forEach((q) => {
      if (answers[q.id] === q.correctAnswerIndex) {
        correctCount += 1;
      }
    });

    setScore(correctCount);
    // Generate unique Certificate hash code
    const randomHex = Math.random().toString(36).substring(2, 7).toUpperCase();
    setCertCode(`BDHVS-2026-QH16-${randomHex}`);
    setExamState("result");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const isPassed = score >= Math.ceil(examQuestions.length * 0.8); // 80% passing grade

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Intro / Idle State */}
      {examState === "idle" && (
        <div className="bg-white rounded-2xl border border-slate-200 p-6 sm:p-10 shadow-sm space-y-6">
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-500 to-red-700 text-white flex items-center justify-center mx-auto shadow-md shadow-amber-900/20 ring-4 ring-amber-100">
              <Award className="w-9 h-9" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
              Kỳ sát hạch chuẩn đầu ra năng lực số
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              Theo quy định tại <strong>Nghị quyết số 398/NQ-UBTVQH16</strong> và <strong>Chỉ thị số 14/CT-TTg</strong>, người học đạt yêu cầu sát hạch sẽ được cấp Giấy chứng nhận điện tử có mã định danh duy nhất, đồng bộ kết quả trên ứng dụng <strong>VNeID</strong> và liên thông trong toàn hệ thống chính trị.
            </p>
          </div>

          {/* Form Candidate Info */}
          <div className="max-w-md mx-auto bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 text-center">
              Thông tin học viên dự sát hạch
            </h4>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Họ và tên cán bộ:</label>
              <input
                type="text"
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-hidden"
                placeholder="Nhập họ và tên..."
              />
            </div>
            <div className="space-y-1.5">
              <label className="text-xs font-semibold text-slate-700">Cơ quan / Đơn vị công tác:</label>
              <input
                type="text"
                value={agency}
                onChange={(e) => setAgency(e.target.value)}
                className="w-full px-3.5 py-2 rounded-lg border border-slate-300 bg-white text-sm font-medium text-slate-800 focus:ring-2 focus:ring-red-500/20 focus:border-red-600 outline-hidden"
                placeholder="Nhập đơn vị công tác..."
              />
            </div>
          </div>

          {/* Exam Specs Table */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-2xl mx-auto text-center text-xs">
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-medium block">Số lượng câu</span>
              <strong className="text-base text-slate-800 font-bold">15 câu hỏi</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-medium block">Thời gian thi</span>
              <strong className="text-base text-slate-800 font-bold">15 phút</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-medium block">Chuẩn đạt</span>
              <strong className="text-base text-emerald-700 font-bold">80% (12/15)</strong>
            </div>
            <div className="p-3 bg-slate-50 rounded-xl border border-slate-200">
              <span className="text-slate-400 font-medium block">Định danh số</span>
              <strong className="text-base text-sky-700 font-bold">VNeID Sync</strong>
            </div>
          </div>

          {/* Action button */}
          <div className="text-center pt-2">
            <button
              id="start-exam-btn"
              onClick={startExam}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-700 to-rose-800 hover:from-red-600 hover:to-rose-700 text-white font-bold text-sm shadow-md shadow-red-900/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0"
            >
              Bắt đầu làm bài sát hạch
            </button>
          </div>
        </div>
      )}

      {/* Testing Active State */}
      {examState === "testing" && (
        <div className="space-y-5">
          {/* Top Sticky Test Bar */}
          <div className="sticky top-20 z-30 bg-white/95 backdrop-blur rounded-xl border border-slate-200 shadow-sm p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-xs font-semibold text-slate-500">
                Đã trả lời:{" "}
                <strong className="text-slate-900">
                  {Object.keys(answers).length}/{examQuestions.length}
                </strong>
              </span>
              <div className="w-28 sm:w-44 bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-red-600 h-full transition-all duration-300"
                  style={{
                    width: `${(Object.keys(answers).length / examQuestions.length) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            <div className="flex items-center gap-2 font-mono font-bold text-base px-3 py-1 rounded-lg bg-amber-50 text-amber-900 border border-amber-200">
              <Clock className="w-4 h-4 text-amber-700" />
              <span>{formatTime(timeLeft)}</span>
            </div>

            <button
              onClick={handleSubmitExam}
              className="px-4 py-1.5 rounded-lg bg-red-700 hover:bg-red-800 text-white font-bold text-xs shadow-xs transition-colors"
            >
              Nộp bài thi
            </button>
          </div>

          {/* Question list */}
          <div className="space-y-4">
            {examQuestions.map((q, idx) => (
              <div key={q.id} className="bg-white rounded-xl border border-slate-200 p-5 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span
                    className={`font-bold px-2 py-0.5 rounded text-[11px] ${
                      q.type === "scenario" ? "bg-amber-100 text-amber-900" : "bg-indigo-100 text-indigo-900"
                    }`}
                  >
                    {q.type === "scenario" ? "Tình huống công vụ" : "Kiểm tra kiến thức"}
                  </span>
                  <span className="text-slate-400 font-semibold">Câu {idx + 1} / {examQuestions.length}</span>
                </div>

                <p className="font-bold text-slate-900 text-sm sm:text-base leading-relaxed">
                  {q.question}
                </p>

                <div className="space-y-2 pt-1">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = answers[q.id] === optIdx;
                    const letter = String.fromCharCode(65 + optIdx);

                    return (
                      <button
                        key={optIdx}
                        onClick={() => setAnswers({ ...answers, [q.id]: optIdx })}
                        className={`w-full text-left p-3 rounded-lg border text-xs sm:text-sm flex items-start gap-3 transition-colors ${
                          isSelected
                            ? "bg-red-50/80 border-red-500 text-red-950 font-medium"
                            : "bg-white border-slate-200 text-slate-700 hover:bg-slate-50"
                        }`}
                      >
                        <span className={`px-2 py-0.5 rounded text-[11px] font-bold ${
                          isSelected ? "bg-red-700 text-white" : "bg-slate-100 text-slate-700"
                        }`}>
                          {letter}
                        </span>
                        <span className="flex-1 leading-snug">{opt}</span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* Bottom submit button */}
          <div className="text-center py-4">
            <button
              onClick={handleSubmitExam}
              className="px-8 py-3 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md transition-colors"
            >
              Hoàn thành và Nộp bài sát hạch
            </button>
          </div>
        </div>
      )}

      {/* Result & Certificate View */}
      {examState === "result" && (
        <div className="space-y-6">
          {/* Result Overview Banner */}
          <div className={`rounded-2xl p-6 border text-center space-y-3 ${
            isPassed
              ? "bg-emerald-50 border-emerald-300 text-emerald-950"
              : "bg-amber-50 border-amber-300 text-amber-950"
          }`}>
            <div className="inline-flex p-3 rounded-full bg-white shadow-xs">
              {isPassed ? (
                <CheckCircle2 className="w-10 h-10 text-emerald-600" />
              ) : (
                <AlertTriangle className="w-10 h-10 text-amber-600" />
              )}
            </div>

            <h3 className="text-xl sm:text-2xl font-black">
              {isPassed ? "Chúc mừng Quý Anh/Chị đã ĐẠT chuẩn sát hạch!" : "Kết quả chưa đạt chuẩn tối thiểu (80%)"}
            </h3>

            <p className="text-sm">
              Điểm số: <strong className="text-lg">{score}</strong> / {examQuestions.length} câu (
              {Math.round((score / examQuestions.length) * 100)}%)
            </p>

            <p className="text-xs text-slate-600 max-w-xl mx-auto">
              {isPassed
                ? "Giấy chứng nhận điện tử chuẩn mực đã được khởi tạo thành công với mã định danh duy nhất dưới đây."
                : "Quý Anh/Chị có thể ôn luyện lại các chuyên đề trong Bộ học liệu và thực hiện lại bài thi bất cứ lúc nào."}
            </p>

            <div className="pt-2 flex justify-center gap-3">
              <button
                onClick={startExam}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-white border border-slate-300 hover:bg-slate-50 text-xs font-semibold text-slate-800 shadow-xs"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Thi lại lần khác</span>
              </button>
            </div>
          </div>

          {/* Official Simulated Certificate (Visible when passed) */}
          {isPassed && (
            <div
              id="electronic-certificate-card"
              className="relative bg-gradient-to-b from-amber-50/40 via-white to-amber-50/30 rounded-2xl border-4 border-double border-amber-600/60 p-6 sm:p-12 shadow-xl space-y-6 overflow-hidden print:p-8"
            >
              {/* Certificate Watermark Background */}
              <div className="absolute inset-0 flex items-center justify-center opacity-4 pointer-events-none">
                <ShieldCheck className="w-96 h-96 text-red-900" />
              </div>

              {/* National Header */}
              <div className="text-center space-y-1 relative z-10">
                <div className="text-xs sm:text-sm font-bold tracking-widest text-slate-800 uppercase">
                  CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
                </div>
                <div className="text-[11px] sm:text-xs font-semibold text-slate-600 tracking-wider">
                  Độc lập - Tự do - Hạnh phúc
                </div>
                <div className="w-32 h-0.5 bg-amber-600 mx-auto mt-1"></div>
              </div>

              {/* Certificate Title */}
              <div className="text-center space-y-2 pt-2 relative z-10">
                <div className="inline-block px-3 py-1 rounded-full bg-red-100 text-red-900 text-xs font-extrabold uppercase tracking-wide border border-red-200">
                  Bình dân học vụ số tỉnh Gia Lai
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold text-red-900 font-serif tracking-tight">
                  GIẤY CHỨNG NHẬN
                </h2>
                <p className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">
                  HOÀN THÀNH BỘ HỌC LIỆU BÌNH DÂN HỌC VỤ SỐ (TẬP 1 - KHỐI CƠ QUAN NHÀ NƯỚC)
                </p>
                <p className="text-[11px] text-slate-500 italic max-w-lg mx-auto">
                  (Phê chuẩn theo Nghị quyết số 398/NQ-UBTVQH16 ngày 08 tháng 8 năm 2026 của Ủy ban Thường vụ Quốc hội)
                </p>
              </div>

              {/* Candidate Info Body */}
              <div className="text-center space-y-3 py-3 relative z-10">
                <p className="text-xs sm:text-sm text-slate-600">Chứng nhận đồng chí:</p>
                <h3 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-wide underline decoration-amber-500 decoration-2 underline-offset-8">
                  {studentName || "NGUYỄN VĂN AN"}
                </h3>
                <p className="text-sm font-semibold text-slate-700">
                  Đơn vị: <span className="text-slate-900 font-bold">{agency || "Cơ quan Nhà nước"}</span>
                </p>
                <p className="text-xs text-slate-600 max-w-xl mx-auto leading-relaxed pt-2">
                  Đã hoàn thành xuất sắc chương trình sát hạch và đạt chuẩn Khung kiến thức, kỹ năng số cơ bản (Micro-learning) theo Quyết định số 757/QĐ-BKHCN và Chỉ thị số 14/CT-TTg của Thủ tướng Chính phủ.
                </p>
              </div>

              {/* Certificate Footer / QR / Signatures */}
              <div className="grid grid-cols-1 sm:grid-cols-3 items-end gap-6 pt-6 border-t border-amber-200/80 relative z-10">
                {/* QR & VNeID sync badge */}
                <div className="flex flex-col items-center sm:items-start space-y-2">
                  <div className="p-2 bg-white rounded-lg border border-slate-300 shadow-2xs inline-block">
                    <QrCode className="w-16 h-16 text-slate-800" />
                  </div>
                  <div className="text-[10px] text-slate-500 text-center sm:text-left space-y-0.5">
                    <div>Mã định danh: <strong className="font-mono text-slate-800">{certCode}</strong></div>
                    <div className="inline-flex items-center gap-1 text-sky-700 font-bold">
                      <CheckCircle2 className="w-3 h-3 text-sky-600" />
                      <span>Đã đồng bộ trên VNeID</span>
                    </div>
                  </div>
                </div>

                {/* Center Badge */}
                <div className="flex flex-col items-center justify-center text-center space-y-1">
                  <div className="w-14 h-14 rounded-full bg-red-700/10 border-2 border-red-700 flex items-center justify-center text-red-800 font-bold text-xs p-1">
                    QUỐC HỘI VIỆT NAM
                  </div>
                  <span className="text-[10px] text-slate-400 font-semibold tracking-wider uppercase">
                    Mã xác thực quốc gia
                  </span>
                </div>

                {/* Signatory */}
                <div className="text-center sm:text-right space-y-1 text-xs">
                  <div className="text-slate-500 italic">Hà Nội, ngày 10 tháng 09 năm 2026</div>
                  <div className="font-bold text-slate-800 uppercase">CHỦ BIÊN BỘ HỌC LIỆU</div>
                  <div className="text-[11px] text-slate-600">Phó Chủ nhiệm Ủy ban KH, CN & MT</div>
                  <div className="pt-8 font-bold text-slate-900 text-sm font-serif">
                    TS. Trần Văn Khải
                  </div>
                </div>
              </div>

              {/* Action Print / Export Bar */}
              <div className="flex flex-wrap items-center justify-end gap-2 pt-4 border-t border-slate-200 no-print">
                <button
                  onClick={() => window.print()}
                  className="px-3.5 py-1.5 rounded-lg bg-white border border-slate-300 hover:bg-slate-100 text-slate-700 text-xs font-semibold flex items-center gap-1.5 shadow-2xs"
                >
                  <Printer className="w-3.5 h-3.5 text-slate-600" />
                  <span>In chứng nhận</span>
                </button>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(`Tra cứu chứng nhận số: ${certCode} tại Cổng Dịch vụ công Quốc gia hoặc ứng dụng VNeID.`);
                    alert("Đã sao chép mã định danh chứng chỉ vào bộ nhớ tạm!");
                  }}
                  className="px-3.5 py-1.5 rounded-lg bg-slate-900 hover:bg-black text-white text-xs font-semibold flex items-center gap-1.5 shadow-xs"
                >
                  <Share2 className="w-3.5 h-3.5 text-amber-300" />
                  <span>Chia sẻ mã định danh</span>
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
