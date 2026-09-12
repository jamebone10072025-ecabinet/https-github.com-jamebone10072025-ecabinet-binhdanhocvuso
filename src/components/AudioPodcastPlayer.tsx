import React, { useState, useEffect, useRef } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  Headphones,
  BookOpen,
  Copy,
  Check,
  Radio,
  Sliders,
  SkipBack,
  SkipForward,
  Loader2,
  Share2,
  ListMusic,
  CheckCircle2,
  Clock,
  Mic
} from "lucide-react";
import { PODCAST_EPISODES, PodcastEpisode, getFallbackPodcastScript } from "../data/podcastData";
import { FULL_TOPIC_LIST } from "../data/curriculumData";

interface AudioPodcastPlayerProps {
  initialTopicId?: number;
  initialLessonTitle?: string;
  onSelectTopic?: (topicId: number) => void;
}

export const AudioPodcastPlayer: React.FC<AudioPodcastPlayerProps> = ({
  initialTopicId,
  initialLessonTitle,
  onSelectTopic
}) => {
  const [selectedTopicId, setSelectedTopicId] = useState<number>(initialTopicId || 1);
  const [currentEpisode, setCurrentEpisode] = useState<PodcastEpisode>(() => {
    return PODCAST_EPISODES.find((ep) => ep.topicId === (initialTopicId || 1)) || PODCAST_EPISODES[0];
  });

  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState<number>(1.0);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [currentTime, setCurrentTime] = useState("00:00");
  const [totalDuration, setTotalDuration] = useState("02:45");
  const [copied, setCopied] = useState(false);

  // AI Script generation modal/state
  const [customTopicInput, setCustomTopicInput] = useState("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [generationSuccess, setGenerationSuccess] = useState(false);

  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);
  const timerRef = useRef<any>(null);
  const totalSecondsRef = useRef<number>(165); // default 2m45s

  // Initialize and select episode when topic changes
  useEffect(() => {
    const matched = PODCAST_EPISODES.find((ep) => ep.topicId === selectedTopicId);
    if (matched) {
      setCurrentEpisode(matched);
      setTotalDuration(matched.duration);
    } else {
      const topicInfo = FULL_TOPIC_LIST.find((t) => t.id === selectedTopicId);
      const fallbackEp: PodcastEpisode = {
        id: selectedTopicId,
        topicId: selectedTopicId,
        title: `Chuyên đề ${selectedTopicId}: ${topicInfo?.title || "Kỹ năng số"}`,
        category: topicInfo?.category || "Chuyển đổi số",
        duration: "02:30",
        summary: `Bản tin âm thanh tóm tắt kỹ năng số cốt lõi Chuyên đề ${selectedTopicId}.`,
        script: getFallbackPodcastScript(selectedTopicId, topicInfo?.title)
      };
      setCurrentEpisode(fallbackEp);
      setTotalDuration("02:30");
    }
    stopAudio();
  }, [selectedTopicId]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const formatSeconds = (sec: number) => {
    const m = Math.floor(sec / 60);
    const s = Math.floor(sec % 60);
    return `${m < 10 ? "0" : ""}${m}:${s < 10 ? "0" : ""}${s}`;
  };

  const stopAudio = () => {
    if ("speechSynthesis" in window) {
      window.speechSynthesis.cancel();
    }
    if (timerRef.current) clearInterval(timerRef.current);
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime("00:00");
  };

  const handlePlayPause = () => {
    if (!("speechSynthesis" in window)) {
      alert("Trình duyệt của bạn không hỗ trợ tính năng chuyển văn bản thành giọng nói (Web Speech API).");
      return;
    }

    if (isPlaying) {
      window.speechSynthesis.pause();
      if (timerRef.current) clearInterval(timerRef.current);
      setIsPlaying(false);
    } else {
      if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
        setIsPlaying(true);
        startTimer();
      } else {
        startSpeaking();
      }
    }
  };

  const startSpeaking = () => {
    window.speechSynthesis.cancel();

    const textToRead = currentEpisode.script;
    const utterance = new SpeechSynthesisUtterance(textToRead);

    // Set Vietnamese voice
    const voices = window.speechSynthesis.getVoices();
    const viVoice = voices.find(
      (v) => v.lang.startsWith("vi") || v.name.toLowerCase().includes("vietnam") || v.name.toLowerCase().includes("vietnamese")
    );
    if (viVoice) {
      utterance.voice = viVoice;
    }
    utterance.lang = "vi-VN";
    utterance.rate = playbackRate;
    utterance.pitch = 1.0;

    // Estimate duration based on word count & playbackRate
    const wordCount = textToRead.split(/\s+/).length;
    // average speaking rate: ~150 words per minute
    const estimatedSeconds = Math.max(30, Math.round((wordCount / 150) * 60 / playbackRate));
    totalSecondsRef.current = estimatedSeconds;
    setTotalDuration(formatSeconds(estimatedSeconds));

    utterance.onstart = () => {
      setIsPlaying(true);
      startTimer();
    };

    utterance.onend = () => {
      stopAudio();
      setProgress(100);
      setCurrentTime(totalDuration);
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      stopAudio();
    };

    utteranceRef.current = utterance;
    window.speechSynthesis.speak(utterance);
  };

  const startTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    let elapsed = Math.round((progress / 100) * totalSecondsRef.current);

    timerRef.current = setInterval(() => {
      elapsed += 1;
      const currentPct = Math.min(100, (elapsed / totalSecondsRef.current) * 100);
      setProgress(currentPct);
      setCurrentTime(formatSeconds(elapsed));

      if (elapsed >= totalSecondsRef.current) {
        clearInterval(timerRef.current);
      }
    }, 1000);
  };

  const handleSpeedChange = (rate: number) => {
    setPlaybackRate(rate);
    if (isPlaying) {
      // restart with new rate
      startSpeaking();
    }
  };

  const handleCopyScript = () => {
    navigator.clipboard.writeText(currentEpisode.script);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateAIPodcast = async () => {
    const topicToGen = customTopicInput.trim() || `Chuyên đề ${selectedTopicId}: ${currentEpisode.title}`;
    setIsGeneratingScript(true);
    setGenerationSuccess(false);

    try {
      const resp = await fetch("/api/podcast-script", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topicId: selectedTopicId,
          topicTitle: topicToGen,
          lessonTitle: initialLessonTitle,
          customTopic: customTopicInput.trim()
        })
      });

      const data = await resp.json();
      if (data.script) {
        const newEp: PodcastEpisode = {
          id: Date.now(),
          topicId: selectedTopicId,
          title: `Bản tin AI: ${topicToGen}`,
          category: "Podcast AI Tạo sinh",
          duration: "02:30",
          summary: `Kịch bản phát thanh biên tập tự động qua Gemini cho: ${topicToGen}`,
          script: data.script
        };
        setCurrentEpisode(newEp);
        setGenerationSuccess(true);
        setTimeout(() => setGenerationSuccess(false), 3000);
        // Start speaking new script
        setTimeout(() => {
          startSpeaking();
        }, 500);
      }
    } catch (err) {
      console.error("Lỗi tạo podcast:", err);
    } finally {
      setIsGeneratingScript(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-red-950 via-rose-900 to-red-900 text-white rounded-2xl p-6 sm:p-8 shadow-sm border border-red-800/40">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-amber-400/20 text-amber-300 border border-amber-400/30">
              <Radio className="w-3.5 h-3.5 animate-pulse" />
              <span>Kênh Phát thanh Học vụ số Micro-learning (Text-to-Speech)</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white">
              Podcast Âm thanh 26 Chuyên đề & Kỹ năng số
            </h2>
            <p className="text-sm text-rose-100 max-w-2xl leading-relaxed">
              Học tập mọi lúc mọi nơi qua bản tin âm thanh công vụ 2-3 phút. Được thiết kế theo phương pháp <strong>Micro-learning</strong> cô đọng: Bối cảnh, 3 nguyên tắc hành động vàng và thông điệp công vụ.
            </p>
          </div>

          <div className="shrink-0 bg-black/30 backdrop-blur-xs p-3.5 rounded-xl border border-white/10 text-xs text-rose-100 space-y-1">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Headphones className="w-4 h-4" />
              <span>Âm thanh chuẩn tiếng Việt</span>
            </div>
            <div>• Tự động đồng bộ giọng đọc AI</div>
            <div>• 26 Chuyên đề công vụ số</div>
          </div>
        </div>
      </div>

      {/* Main Audio Player Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-md overflow-hidden">
        {/* Active Episode Header */}
        <div className="p-6 sm:p-8 bg-gradient-to-b from-slate-50 to-white border-b border-slate-100 space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-700 to-rose-900 text-white flex items-center justify-center shadow-md shadow-red-900/20 ring-2 ring-amber-400/50 shrink-0">
                <Radio className={`w-6 h-6 ${isPlaying ? "animate-pulse text-amber-300" : "text-white"}`} />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-red-700 uppercase tracking-wider">
                    {currentEpisode.category}
                  </span>
                  <span className="text-slate-300">•</span>
                  <span className="text-xs text-slate-500 flex items-center gap-1 font-medium">
                    <Clock className="w-3 h-3" />
                    {totalDuration}
                  </span>
                </div>
                <h3 className="text-base sm:text-xl font-bold text-slate-900 leading-tight">
                  {currentEpisode.title}
                </h3>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyScript}
                className="px-3 py-1.5 rounded-lg border border-slate-200 bg-white hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer"
                title="Sao chép kịch bản phát thanh"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-slate-500" />
                    <span>Sao chép kịch bản</span>
                  </>
                )}
              </button>
            </div>
          </div>

          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed max-w-3xl">
            {currentEpisode.summary}
          </p>

          {/* Audio Wave Visualizer Simulation */}
          <div className="h-10 flex items-end justify-center gap-1.5 bg-slate-900/90 rounded-xl px-4 py-2 shadow-inner">
            {[40, 65, 30, 80, 50, 95, 45, 75, 60, 90, 35, 70, 85, 55, 100, 40, 60, 80, 50, 65, 35, 90, 75, 50, 70, 85, 60].map(
              (height, i) => (
                <div
                  key={i}
                  className={`w-1 rounded-full transition-all duration-300 ${
                    isPlaying
                      ? "bg-gradient-to-t from-red-500 to-amber-400"
                      : "bg-slate-700"
                  }`}
                  style={{
                    height: isPlaying ? `${Math.max(15, (height * (progress % 20 + 80)) / 100)}%` : "20%"
                  }}
                />
              )
            )}
          </div>

          {/* Progress Bar & Scrubber */}
          <div className="space-y-1.5">
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden relative cursor-pointer">
              <div
                className="bg-gradient-to-r from-red-700 to-rose-600 h-full rounded-full transition-all duration-200"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-[11px] font-mono text-slate-500 font-medium">
              <span>{currentTime}</span>
              <span>{totalDuration}</span>
            </div>
          </div>

          {/* Playback Controls */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => {
                  const prevId = selectedTopicId > 1 ? selectedTopicId - 1 : 26;
                  setSelectedTopicId(prevId);
                }}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Chuyên đề trước"
              >
                <SkipBack className="w-4 h-4" />
              </button>

              <button
                onClick={handlePlayPause}
                className="px-5 py-2.5 rounded-xl bg-red-700 hover:bg-red-800 text-white font-bold text-sm shadow-md shadow-red-900/20 flex items-center gap-2 transition-all cursor-pointer hover:scale-[1.02]"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 fill-current" />
                    <span>Tạm dừng</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 fill-current ml-0.5" />
                    <span>Phát Podcast</span>
                  </>
                )}
              </button>

              <button
                onClick={stopAudio}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Dừng & Đặt lại từ đầu"
              >
                <RotateCcw className="w-4 h-4" />
              </button>

              <button
                onClick={() => {
                  const nextId = selectedTopicId < 26 ? selectedTopicId + 1 : 1;
                  setSelectedTopicId(nextId);
                }}
                className="p-2 rounded-xl border border-slate-200 hover:bg-slate-100 text-slate-600 transition-colors cursor-pointer"
                title="Chuyên đề kế tiếp"
              >
                <SkipForward className="w-4 h-4" />
              </button>
            </div>

            {/* Speed Selector */}
            <div className="flex items-center gap-1.5 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs font-semibold">
              <span className="text-[10px] text-slate-400 px-2 font-medium">Tốc độ:</span>
              {[0.8, 1.0, 1.25, 1.5].map((rate) => (
                <button
                  key={rate}
                  onClick={() => handleSpeedChange(rate)}
                  className={`px-2 py-1 rounded-lg transition-colors cursor-pointer ${
                    playbackRate === rate
                      ? "bg-white text-red-700 shadow-xs font-bold"
                      : "text-slate-600 hover:text-slate-900"
                  }`}
                >
                  {rate}x
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Live Interactive Transcript & Script Section */}
        <div className="p-6 sm:p-8 space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-red-700" />
              <span>Lời thoại kịch bản phát thanh công vụ</span>
            </h4>
            <span className="text-[11px] text-slate-500">
              Giọng đọc phát thanh viên hành chính tỉnh Gia Lai
            </span>
          </div>

          <div className="p-5 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 text-sm leading-relaxed whitespace-pre-line font-serif shadow-inner">
            {currentEpisode.script}
          </div>
        </div>
      </div>

      {/* AI Custom Podcast Generator Section */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
            <Sparkles className="w-4 h-4 text-amber-600" />
            <span>Tạo Podcast AI theo yêu cầu riêng (Gemini AI Script Generator)</span>
          </div>
          <span className="text-[11px] font-semibold text-amber-800 bg-amber-100 px-2.5 py-0.5 rounded-full">
            Micro-learning 2 phút
          </span>
        </div>

        <p className="text-xs text-amber-800 leading-relaxed">
          Nhập chủ đề nghiệp vụ hoặc quy trình bạn muốn nghe tóm tắt (Ví dụ: <em>Cách xử lý hồ sơ đăng ký kinh doanh trễ hạn trên VNeID</em> hoặc <em>Quy định bảo vệ dữ liệu cá nhân cán bộ</em>). Gemini sẽ tự động biên tập kịch bản chuẩn phát thanh và phát âm thanh ngay.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <input
            type="text"
            value={customTopicInput}
            onChange={(e) => setCustomTopicInput(e.target.value)}
            placeholder="Nhập nội dung hoặc tên chuyên đề muốn AI biên tập podcast..."
            className="flex-1 text-xs sm:text-sm p-3 rounded-xl border border-amber-300 bg-white focus:outline-hidden focus:ring-2 focus:ring-amber-500 font-medium text-slate-800"
          />
          <button
            onClick={generateAIPodcast}
            disabled={isGeneratingScript}
            className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs sm:text-sm transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-xs disabled:opacity-50"
          >
            {isGeneratingScript ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Đang biên tập kịch bản AI...</span>
              </>
            ) : (
              <>
                <Mic className="w-4 h-4" />
                <span>Biên tập & Phát Podcast AI</span>
              </>
            )}
          </button>
        </div>

        {generationSuccess && (
          <div className="text-xs text-emerald-700 font-semibold flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4" />
            <span>Kịch bản phát thanh AI đã sẵn sàng và đang bắt đầu phát!</span>
          </div>
        )}
      </div>

      {/* 26 Topics Playlist Grid */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <div className="flex items-center gap-2">
            <ListMusic className="w-5 h-5 text-red-700" />
            <h3 className="font-bold text-sm text-slate-800">
              Danh mục Podcast 26 Chuyên đề Chuẩn Quốc gia
            </h3>
          </div>
          <span className="text-xs text-slate-500">
            26 bản tin tóm tắt • Chọn để nghe ngay
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
          {FULL_TOPIC_LIST.map((topic) => {
            const isCurrent = selectedTopicId === topic.id;
            return (
              <button
                key={topic.id}
                onClick={() => {
                  setSelectedTopicId(topic.id);
                  if (onSelectTopic) onSelectTopic(topic.id);
                  window.scrollTo({ top: 120, behavior: "smooth" });
                }}
                className={`text-left p-3 rounded-xl border transition-all cursor-pointer flex items-center justify-between gap-2 ${
                  isCurrent
                    ? "bg-red-50 border-red-300 ring-2 ring-red-600/20 shadow-xs"
                    : "bg-slate-50/70 border-slate-200 hover:bg-slate-100"
                }`}
              >
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <span>Chuyên đề {topic.id}</span>
                    <span>•</span>
                    <span className="truncate">{topic.category}</span>
                  </div>
                  <div className={`text-xs font-bold mt-0.5 truncate ${
                    isCurrent ? "text-red-900 font-extrabold" : "text-slate-800"
                  }`}>
                    {topic.title}
                  </div>
                </div>

                <div className={`w-7 h-7 rounded-lg flex items-center justify-center shrink-0 ${
                  isCurrent ? "bg-red-700 text-white" : "bg-white text-slate-400 border border-slate-200"
                }`}>
                  <Play className="w-3 h-3 fill-current ml-0.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
