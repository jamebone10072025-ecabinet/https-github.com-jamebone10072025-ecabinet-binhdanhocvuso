import React, { useState } from "react";
import {
  Satellite,
  Trees,
  Flame,
  AlertTriangle,
  Layers,
  Camera,
  Upload,
  RefreshCw,
  CheckCircle2,
  FileText,
  Copy,
  Check,
  ShieldAlert,
  ChevronRight,
  Info,
  Sliders,
  Send,
  Download,
  Eye,
  MapPin,
  ExternalLink,
  Sparkles,
  Droplets,
  Activity,
  Maximize2
} from "lucide-react";
import {
  GIALAI_FOREST_ZONES,
  ForestZone,
  FIELD_IMAGE_PRESETS,
  FieldPresetImage,
  VisionAnalysisResult,
  generateFallbackVisionAnalysis
} from "../data/earthVisionData";

interface EarthVisionMonitorProps {
  onSendToAI?: (promptText: string) => void;
}

export const EarthVisionMonitor: React.FC<EarthVisionMonitorProps> = ({ onSendToAI }) => {
  // Main view modes
  const [activeMode, setActiveMode] = useState<"earth_engine" | "vision_ai" | "guidelines">("earth_engine");

  // Earth Engine states
  const [selectedZone, setSelectedZone] = useState<ForestZone>(GIALAI_FOREST_ZONES[1]); // Default Krong Pa
  const [satelliteLayer, setSatelliteLayer] = useState<"ndvi" | "nbr" | "ndwi" | "rgb">("nbr");
  const [scanningSatellite, setScanningSatellite] = useState(false);
  const [scanTimestamp, setScanTimestamp] = useState("Vừa cập nhật hôm nay");

  // Cloud Vision AI states
  const [selectedPreset, setSelectedPreset] = useState<FieldPresetImage>(FIELD_IMAGE_PRESETS[0]);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [customNote, setCustomNote] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<VisionAnalysisResult | null>(null);
  const [copiedReport, setCopiedReport] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  // Handle Satellite refresh scan
  const handleTriggerSatelliteScan = () => {
    setScanningSatellite(true);
    setTimeout(() => {
      setScanningSatellite(false);
      setScanTimestamp(`Cập nhật lúc ${new Date().toLocaleTimeString("vi-VN")}`);
    }, 900);
  };

  // Handle File upload
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setUploadedImage(reader.result as string);
      setAnalysisResult(null);
    };
    reader.readAsDataURL(file);
  };

  // Handle Run Vision Analysis
  const handleRunVisionAnalysis = async () => {
    setIsAnalyzing(true);
    try {
      const response = await fetch("/api/vision-forest-analysis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          category: uploadedImage ? "custom" : selectedPreset.category,
          presetId: uploadedImage ? undefined : selectedPreset.id,
          zoneName: uploadedImage ? "Hiện trường tuần tra Gia Lai" : selectedPreset.location,
          coordinates: "Tây Nguyên, Gia Lai",
          customNote: customNote || (uploadedImage ? "Ảnh cán bộ tuần tra tải lên" : selectedPreset.description),
          image: uploadedImage || undefined,
        }),
      });

      if (!response.ok) {
        throw new Error(`Lỗi máy chủ ${response.status}`);
      }

      const data = await response.json();
      setAnalysisResult(data.result || generateFallbackVisionAnalysis(selectedPreset.category, selectedPreset.id, customNote));
    } catch (err) {
      console.warn("[Vision AI] Fallback triggered:", err);
      setAnalysisResult(generateFallbackVisionAnalysis(selectedPreset.category, selectedPreset.id, customNote));
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Copy report
  const handleCopyReport = () => {
    if (!analysisResult) return;
    navigator.clipboard.writeText(analysisResult.officialReportDraft);
    setCopiedReport(true);
    setTimeout(() => setCopiedReport(false), 2000);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-emerald-900 via-teal-900 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden border border-emerald-800/40">
        <div className="absolute -right-12 -top-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute right-1/4 -bottom-10 w-48 h-48 bg-teal-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-3 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/30 text-xs font-semibold tracking-wide backdrop-blur-xs">
              <Satellite className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
              <span>GOOGLE EARTH ENGINE & CLOUD VISION AI</span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
              <span>GIA LAI SMART MONITORING</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white flex items-center gap-2.5">
              <Trees className="w-7 h-7 text-emerald-400" />
              <span>Giám Sát Tài Nguyên Rừng, Đất Đai & Nông Nghiệp Số</span>
            </h1>

            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Ứng dụng dữ liệu viễn thám đa phổ vệ tinh <strong className="text-emerald-300">Sentinel-2 & Landsat 9</strong> kết hợp 
              thị giác máy tính <strong className="text-amber-300">Cloud Vision AI & Multimodal Gemini</strong> để tự động phát hiện sớm điểm cháy rừng, 
              suy giảm tán rừng và san lấp đất trái phép trên toàn địa bàn tỉnh Gia Lai.
            </p>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 gap-3 shrink-0 bg-white/5 p-3.5 rounded-xl border border-white/10 backdrop-blur-xs text-xs">
            <div className="p-2.5 bg-emerald-950/40 rounded-lg border border-emerald-500/20">
              <div className="text-slate-400 text-[11px]">Diện tích rừng tỉnh</div>
              <div className="text-base sm:text-lg font-black text-emerald-300">648.500 ha</div>
              <div className="text-[10px] text-emerald-400/80">Độ che phủ: 47,2%</div>
            </div>
            <div className="p-2.5 bg-rose-950/40 rounded-lg border border-rose-500/20">
              <div className="text-slate-400 text-[11px]">Điểm nhiệt 24h qua</div>
              <div className="text-base sm:text-lg font-black text-rose-400 flex items-center gap-1">
                <Flame className="w-4 h-4 text-rose-500 animate-bounce" />
                <span>4 điểm nóng</span>
              </div>
              <div className="text-[10px] text-rose-300/80">Krông Pa: Cấp V (Cháy)</div>
            </div>
          </div>
        </div>

        {/* Navigation Sub-Tabs */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap gap-2">
          <button
            onClick={() => setActiveMode("earth_engine")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === "earth_engine"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          >
            <Satellite className="w-4 h-4 text-emerald-600" />
            <span>Vệ Tinh Earth Engine (Sentinel-2)</span>
          </button>

          <button
            onClick={() => setActiveMode("vision_ai")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === "vision_ai"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          >
            <Camera className="w-4 h-4 text-rose-600" />
            <span>Cloud Vision AI (Flycam & Hiện Trường)</span>
          </button>

          <button
            onClick={() => setActiveMode("guidelines")}
            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeMode === "guidelines"
                ? "bg-white text-emerald-950 shadow-md scale-102"
                : "bg-white/10 text-slate-200 hover:bg-white/15"
            }`}
          >
            <FileText className="w-4 h-4 text-teal-600" />
            <span>Quy Chuẩn Kỹ Thuật & Pháp Lý</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODE 1: GOOGLE EARTH ENGINE SATELLITE MONITORING                          */}
      {/* ========================================================================= */}
      {activeMode === "earth_engine" && (
        <div className="space-y-6">
          {/* Top Control Bar */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 shadow-xs border border-slate-200 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Lớp Viễn Thám:</span>
              <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
                <button
                  onClick={() => setSatelliteLayer("nbr")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    satelliteLayer === "nbr"
                      ? "bg-rose-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Flame className="w-3.5 h-3.5" />
                  <span>NBR (Điểm Nhiệt & Cháy Rừng)</span>
                </button>
                <button
                  onClick={() => setSatelliteLayer("ndvi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    satelliteLayer === "ndvi"
                      ? "bg-emerald-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Trees className="w-3.5 h-3.5" />
                  <span>NDVI (Độ Phủ Xanh Thực Vật)</span>
                </button>
                <button
                  onClick={() => setSatelliteLayer("ndwi")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    satelliteLayer === "ndwi"
                      ? "bg-sky-600 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Droplets className="w-3.5 h-3.5" />
                  <span>NDWI (Ẩm & Nguồn Nước)</span>
                </button>
                <button
                  onClick={() => setSatelliteLayer("rgb")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 ${
                    satelliteLayer === "rgb"
                      ? "bg-slate-800 text-white shadow-xs"
                      : "text-slate-700 hover:bg-slate-200"
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>RGB (Màu Tự Nhiên)</span>
                </button>
              </div>
            </div>

            <div className="flex items-center gap-2 self-stretch sm:self-auto justify-between sm:justify-end">
              <span className="text-xs text-slate-500 font-medium">{scanTimestamp}</span>
              <button
                onClick={handleTriggerSatelliteScan}
                disabled={scanningSatellite}
                className="px-3.5 py-1.5 rounded-xl bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50"
              >
                <RefreshCw className={`w-3.5 h-3.5 text-emerald-600 ${scanningSatellite ? "animate-spin" : ""}`} />
                <span>Quét Vệ Tinh Mới</span>
              </button>
            </div>
          </div>

          {/* Main Map & Zone Inspector Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Zone Selector Sidebar */}
            <div className="lg:col-span-4 space-y-3">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600" />
                  <span>Khu Vực Giám Sát Trọng Điểm Gia Lai</span>
                </h3>
                <span className="text-xs px-2 py-0.5 rounded-full bg-slate-100 text-slate-600 font-semibold">
                  {GIALAI_FOREST_ZONES.length} vùng
                </span>
              </div>

              <div className="space-y-2.5 max-h-[580px] overflow-y-auto pr-1">
                {GIALAI_FOREST_ZONES.map((zone) => {
                  const isSelected = selectedZone.id === zone.id;
                  const isHighRisk = zone.fireRiskLevel.includes("Cấp V") || zone.fireRiskLevel.includes("Cấp IV");

                  return (
                    <div
                      key={zone.id}
                      onClick={() => setSelectedZone(zone)}
                      className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left relative overflow-hidden ${
                        isSelected
                          ? "bg-emerald-50/80 border-emerald-500 shadow-sm ring-2 ring-emerald-400/20"
                          : "bg-white border-slate-200 hover:border-slate-300 hover:bg-slate-50/60"
                      }`}
                    >
                      {isHighRisk && (
                        <div className="absolute top-0 right-0 w-2 h-full bg-rose-500" />
                      )}

                      <div className="flex items-start justify-between gap-2">
                        <div className="font-bold text-sm text-slate-900 leading-snug">
                          {zone.name}
                        </div>
                        {zone.activeHotspots > 0 && (
                          <span className="shrink-0 px-2 py-0.5 rounded-full bg-rose-100 text-rose-700 text-[10px] font-black flex items-center gap-1 animate-pulse border border-rose-200">
                            <Flame className="w-3 h-3 text-rose-600" />
                            <span>{zone.activeHotspots} điểm nhiệt</span>
                          </span>
                        )}
                      </div>

                      <div className="text-xs text-slate-500 mt-1 flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                        <span className="truncate">{zone.location}</span>
                      </div>

                      <div className="mt-2.5 grid grid-cols-3 gap-1.5 pt-2 border-t border-slate-100 text-[11px]">
                        <div className="bg-slate-50 p-1.5 rounded text-center">
                          <span className="text-slate-400 block text-[10px]">Diện tích</span>
                          <strong className="text-slate-700 font-bold">{zone.areaHa.toLocaleString()} ha</strong>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded text-center">
                          <span className="text-slate-400 block text-[10px]">Chỉ số NDVI</span>
                          <strong className={`font-bold ${zone.ndviScore > 0.7 ? "text-emerald-700" : "text-amber-700"}`}>
                            {zone.ndviScore}
                          </strong>
                        </div>
                        <div className="bg-slate-50 p-1.5 rounded text-center">
                          <span className="text-slate-400 block text-[10px]">Cháy rừng</span>
                          <strong className={`font-bold text-[10px] ${isHighRisk ? "text-rose-700" : "text-emerald-700"}`}>
                            {zone.fireRiskLevel.split(" ")[0]}
                          </strong>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Interactive Map Visualizer & Deep Zone Detail */}
            <div className="lg:col-span-8 space-y-4">
              <div className="bg-slate-900 rounded-2xl p-5 text-white shadow-md border border-slate-800 relative overflow-hidden">
                {/* Map View Canvas Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                      <h4 className="text-base font-bold text-white tracking-wide">{selectedZone.name}</h4>
                      <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[11px] font-semibold border border-emerald-500/30">
                        {selectedZone.type}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Tọa độ: {selectedZone.coordinates.lat}° N, {selectedZone.coordinates.lng}° E • {selectedZone.lastSatellitePass}
                    </div>
                  </div>

                  {/* Active Indicator Legend */}
                  <div className="flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-xl border border-white/10">
                    <span className="text-slate-300 font-medium">Đang chiếu lớp:</span>
                    <strong className="text-amber-300 uppercase font-black">{satelliteLayer}</strong>
                  </div>
                </div>

                {/* Simulated Earth Engine Multispectral Map Screen */}
                <div className="my-4 relative h-72 sm:h-96 rounded-xl overflow-hidden border border-slate-700 bg-slate-950 flex flex-col justify-between p-4 shadow-inner">
                  {/* Background Earth Imagery Representation based on selected layer */}
                  <div
                    className={`absolute inset-0 transition-all duration-700 opacity-90 ${
                      satelliteLayer === "nbr"
                        ? selectedZone.activeHotspots > 0
                          ? "bg-gradient-to-br from-slate-950 via-amber-950/70 to-rose-950/80"
                          : "bg-gradient-to-br from-slate-950 via-emerald-950/40 to-teal-950/50"
                        : satelliteLayer === "ndvi"
                        ? "bg-gradient-to-br from-emerald-950 via-teal-900 to-green-950"
                        : satelliteLayer === "ndwi"
                        ? "bg-gradient-to-br from-slate-950 via-sky-950 to-blue-900"
                        : "bg-gradient-to-br from-slate-900 via-stone-900 to-emerald-950"
                    }`}
                  >
                    {/* Topographic grid overlay lines */}
                    <div className="absolute inset-0 opacity-15 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:24px_24px]" />
                  </div>

                  {/* Top Map HUD overlay */}
                  <div className="relative z-10 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10">
                      <Satellite className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="font-mono text-[11px] text-emerald-300">SENTINEL-2 L2A MULTISPECTRAL</span>
                    </div>

                    <div className="bg-black/60 px-3 py-1.5 rounded-lg backdrop-blur-md border border-white/10 font-mono text-[11px] text-slate-300">
                      Độ phân giải: 10m/pixel
                    </div>
                  </div>

                  {/* Hotspots / Feature markers on the Map */}
                  <div className="relative z-10 my-auto text-center space-y-3">
                    {selectedZone.activeHotspots > 0 ? (
                      <div className="inline-block p-4 rounded-2xl bg-rose-900/80 border-2 border-rose-500 shadow-2xl backdrop-blur-md max-w-md animate-pulse">
                        <div className="flex items-center justify-center gap-2 text-rose-200 font-bold text-sm">
                          <Flame className="w-5 h-5 text-amber-300 animate-bounce" />
                          <span>PHÁT HIỆN {selectedZone.activeHotspots} ĐIỂM DỊ THƯỜNG NHIỆT (NBR &lt; 0.2)</span>
                        </div>
                        <p className="text-xs text-rose-100/90 mt-1">
                          Vệt khói và bức xạ nhiệt cao tại Tiểu khu 128 (Krông Pa). Nguy cơ bùng phát cháy rừng khộp!
                        </p>
                        <div className="mt-3 flex items-center justify-center gap-2">
                          <button
                            onClick={() => {
                              setActiveMode("vision_ai");
                              setSelectedPreset(FIELD_IMAGE_PRESETS[0]);
                            }}
                            className="px-3 py-1.5 bg-white text-rose-950 rounded-lg text-xs font-black hover:bg-rose-100 transition-colors shadow-md"
                          >
                            Xem Ảnh Flycam Hiện Trường
                          </button>
                        </div>
                      </div>
                    ) : (
                      <div className="inline-block p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/40 shadow-xl backdrop-blur-md max-w-md">
                        <div className="flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
                          <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                          <span>TÁN RỪNG ỔN ĐỊNH • CHỈ SỐ NDVI {selectedZone.ndviScore}</span>
                        </div>
                        <p className="text-xs text-slate-300 mt-1">
                          Độ che phủ thảm thực vật đạt mức lý tưởng. Không phát hiện điểm suy giảm sinh khối rừng trong chu kỳ vệ tinh 5 ngày qua.
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Bottom Map Controls & Legend Scale */}
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs bg-black/70 p-2.5 rounded-xl border border-white/10 backdrop-blur-md">
                    <div className="flex items-center gap-3">
                      <span className="text-slate-400 text-[11px] font-medium">Thang đo giá trị:</span>
                      <div className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-rose-600" title="Rủi ro cao / Khô hạn" />
                        <span className="text-[10px] text-slate-300">0.0 (Nguy hiểm)</span>
                        <div className="w-20 h-2 rounded bg-gradient-to-r from-rose-500 via-amber-400 to-emerald-500" />
                        <span className="w-3 h-3 rounded bg-emerald-500" title="Tốt / Ẩm xanh" />
                        <span className="text-[10px] text-slate-300">1.0 (Xanh tốt)</span>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 font-mono">
                      GIS Gia Lai: 13°10'N - 14°45'N, 107°20'E - 108°50'E
                    </div>
                  </div>
                </div>

                {/* Zone Analysis Breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs">
                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <div className="text-slate-400 text-[11px] flex items-center justify-between">
                      <span>Sức khỏe tán rừng (NDVI)</span>
                      <strong className="text-emerald-300">{selectedZone.ndviScore}</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-emerald-500 h-full rounded-full"
                        style={{ width: `${selectedZone.ndviScore * 100}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 pt-0.5">Mức {selectedZone.ndviScore > 0.7 ? "Cao (Rất tốt)" : "Trung bình"}</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <div className="text-slate-400 text-[11px] flex items-center justify-between">
                      <span>Chỉ số vết cháy (NBR)</span>
                      <strong className={selectedZone.nbrScore < 0.3 ? "text-rose-400" : "text-amber-300"}>
                        {selectedZone.nbrScore}
                      </strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${selectedZone.nbrScore < 0.3 ? "bg-rose-500" : "bg-teal-400"}`}
                        style={{ width: `${Math.max(10, selectedZone.nbrScore * 100)}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 pt-0.5">Cấp cháy: {selectedZone.fireRiskLevel}</div>
                  </div>

                  <div className="p-3 bg-white/5 rounded-xl border border-white/10 space-y-1">
                    <div className="text-slate-400 text-[11px] flex items-center justify-between">
                      <span>Độ ẩm & Nguồn nước (NDWI)</span>
                      <strong className="text-sky-300">{selectedZone.ndwiScore}</strong>
                    </div>
                    <div className="w-full bg-slate-800 rounded-full h-2 overflow-hidden">
                      <div
                        className="bg-sky-500 h-full rounded-full"
                        style={{ width: `${Math.max(10, (selectedZone.ndwiScore + 0.5) * 66)}%` }}
                      />
                    </div>
                    <div className="text-[10px] text-slate-400 pt-0.5">Biến động: {selectedZone.canopyTrend}</div>
                  </div>
                </div>

                {/* Description & Action */}
                <div className="mt-4 p-3.5 rounded-xl bg-white/5 border border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="font-semibold text-slate-200">{selectedZone.description}</div>
                    {selectedZone.warningNotice && (
                      <div className="text-rose-300 font-bold flex items-center gap-1.5">
                        <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                        <span>{selectedZone.warningNotice}</span>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={() => {
                      if (onSendToAI) {
                        onSendToAI(`Hãy phân tích tình trạng viễn thám và chỉ số cháy rừng của khu vực ${selectedZone.name} (${selectedZone.location}) với NDVI ${selectedZone.ndviScore}, NBR ${selectedZone.nbrScore} và đề xuất phương án PCCC theo quy định của tỉnh Gia Lai.`);
                      }
                    }}
                    className="shrink-0 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold flex items-center gap-1.5 transition-colors shadow-xs text-xs"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Hỏi Trợ Lý AI</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 2: CLOUD VISION AI FOR DRONE / FIELD INSPECTION                      */}
      {/* ========================================================================= */}
      {activeMode === "vision_ai" && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Left Column: Preset Selector & Upload Box */}
            <div className="lg:col-span-5 space-y-4">
              <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                    <Camera className="w-4 h-4 text-rose-600" />
                    <span>Tình Huống Ảnh Flycam / Hiện Trường Thực Tế</span>
                  </h3>
                  <span className="text-[11px] text-slate-500 font-medium">Chọn hoặc tải ảnh</span>
                </div>

                {/* Preset List */}
                <div className="space-y-2">
                  {FIELD_IMAGE_PRESETS.map((preset) => {
                    const isSelected = selectedPreset.id === preset.id && !uploadedImage;
                    return (
                      <div
                        key={preset.id}
                        onClick={() => {
                          setSelectedPreset(preset);
                          setUploadedImage(null);
                          setAnalysisResult(null);
                        }}
                        className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                          isSelected
                            ? "bg-rose-50/80 border-rose-500 ring-2 ring-rose-400/20 shadow-xs"
                            : "bg-slate-50/80 border-slate-200 hover:bg-slate-100/70"
                        }`}
                      >
                        <div className="flex items-start justify-between gap-2">
                          <h5 className="font-bold text-xs sm:text-sm text-slate-900 leading-snug">
                            {preset.title}
                          </h5>
                          {preset.urgency === "urgent" ? (
                            <span className="px-1.5 py-0.5 rounded bg-rose-100 text-rose-700 text-[10px] font-black shrink-0">
                              KHẨN CẤP
                            </span>
                          ) : preset.urgency === "warning" ? (
                            <span className="px-1.5 py-0.5 rounded bg-amber-100 text-amber-800 text-[10px] font-bold shrink-0">
                              CẢNH BÁO
                            </span>
                          ) : (
                            <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold shrink-0">
                              AN TOÀN
                            </span>
                          )}
                        </div>

                        <div className="text-[11px] text-slate-500 mt-1 flex items-center gap-1">
                          <MapPin className="w-3 h-3 text-slate-400 shrink-0" />
                          <span className="truncate">{preset.location}</span>
                        </div>

                        <div className="text-[10px] text-slate-400 mt-1">
                          Nguồn thu thập: {preset.deviceSource}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* File Upload Area */}
                <div className="pt-3 border-t border-slate-200 space-y-2">
                  <label className="text-xs font-bold text-slate-700 block">
                    Hoặc Tải Lên Ảnh Tuần Tra Mới (Flycam / Điện thoại)
                  </label>

                  <div
                    onDragOver={(e) => {
                      e.preventDefault();
                      setDragOver(true);
                    }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => {
                      e.preventDefault();
                      setDragOver(false);
                      const file = e.dataTransfer.files?.[0];
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => {
                          setUploadedImage(reader.result as string);
                          setAnalysisResult(null);
                        };
                        reader.readAsDataURL(file);
                      }
                    }}
                    className={`border-2 border-dashed rounded-xl p-4 text-center transition-all cursor-pointer ${
                      dragOver
                        ? "border-rose-500 bg-rose-50"
                        : uploadedImage
                        ? "border-emerald-500 bg-emerald-50/40"
                        : "border-slate-300 hover:border-slate-400 bg-slate-50/50"
                    }`}
                  >
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      id="forest-image-upload"
                    />
                    <label htmlFor="forest-image-upload" className="cursor-pointer space-y-1 block">
                      <Upload className="w-6 h-6 text-slate-400 mx-auto" />
                      <div className="text-xs font-semibold text-slate-700">
                        {uploadedImage ? "Đã tải ảnh thành công (Nhấn để đổi ảnh)" : "Kéo thả ảnh hoặc bấm để chọn tệp"}
                      </div>
                      <div className="text-[10px] text-slate-400">Định dạng JPG, PNG, WEBP (Tối đa 15MB)</div>
                    </label>
                  </div>
                </div>

                {/* Optional Note Field */}
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-700 block">
                    Ghi chú hiện trường bổ sung (nếu có):
                  </label>
                  <input
                    type="text"
                    value={customNote}
                    onChange={(e) => setCustomNote(e.target.value)}
                    placeholder="Ví dụ: Gió thổi mạnh cấp 4 về hướng làng Kép..."
                    className="w-full text-xs px-3 py-2 rounded-xl border border-slate-200 focus:outline-hidden focus:ring-2 focus:ring-rose-500 bg-white"
                  />
                </div>

                {/* Action Button */}
                <button
                  onClick={handleRunVisionAnalysis}
                  disabled={isAnalyzing}
                  className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-rose-700 to-red-700 hover:from-rose-800 hover:to-red-800 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 disabled:opacity-60"
                >
                  {isAnalyzing ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-white" />
                      <span>Cloud Vision AI & Multimodal Đang Quét...</span>
                    </>
                  ) : (
                    <>
                      <Eye className="w-4 h-4 text-amber-300" />
                      <span>Quét Bằng Cloud Vision AI & Gemini</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Column: Visual Frame & Analysis Dashboard */}
            <div className="lg:col-span-7 space-y-4">
              {/* Image Preview with Optical Bounding Boxes */}
              <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 text-white shadow-md border border-slate-800 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                    <span className="font-bold text-white uppercase tracking-wider">
                      Khung Hình Hiện Trường: {uploadedImage ? "Ảnh Cán Bộ Tải Lên" : selectedPreset.title}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400 font-mono">
                    {uploadedImage ? "Camera Hiện trường" : selectedPreset.deviceSource}
                  </span>
                </div>

                {/* Canvas Representation */}
                <div className="relative h-64 sm:h-80 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 flex items-center justify-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Hiện trường tải lên"
                      className="w-full h-full object-contain"
                    />
                  ) : (
                    <div className={`w-full h-full bg-gradient-to-br ${selectedPreset.thumbnailColor} opacity-90 relative flex flex-col justify-between p-4`}>
                      {/* Grid lines */}
                      <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1px,transparent_1px)] [background-size:20px_20px] opacity-20" />

                      {/* Top HUD */}
                      <div className="relative z-10 flex items-center justify-between text-[11px] font-mono text-white/90 bg-black/40 px-2.5 py-1 rounded backdrop-blur-xs">
                        <span>Độ cao: 180m • Góc nghiêng: -45°</span>
                        <span>GPS: 13.1833° N, 108.7333° E</span>
                      </div>

                      {/* Simulated Bounding Boxes Overlay */}
                      <div className="relative z-10 my-auto flex flex-col items-center justify-center">
                        {selectedPreset.category === "forest_fire" && (
                          <div className="border-2 border-dashed border-rose-400 bg-rose-500/20 p-4 rounded-xl backdrop-blur-xs animate-pulse text-center max-w-xs shadow-2xl">
                            <span className="px-2 py-0.5 rounded bg-rose-600 text-white font-mono text-[10px] font-bold inline-block mb-1">
                              AI: ĐÁM CHÁY RỪNG LE (98.2%)
                            </span>
                            <div className="text-white text-xs font-bold">Cột khói lan tỏa 1.250 m²</div>
                            <div className="text-[10px] text-amber-200 mt-0.5">Vận tốc gió: 18 km/h Đông Nam</div>
                          </div>
                        )}

                        {selectedPreset.category === "deforestation" && (
                          <div className="border-2 border-dashed border-amber-400 bg-amber-500/20 p-4 rounded-xl backdrop-blur-xs text-center max-w-xs shadow-2xl">
                            <span className="px-2 py-0.5 rounded bg-amber-600 text-white font-mono text-[10px] font-bold inline-block mb-1">
                              AI: ĐỐN HẠ LÂM SẢN (96.5%)
                            </span>
                            <div className="text-white text-xs font-bold">Vết cưa xẻ gỗ tròn & lán trại</div>
                            <div className="text-[10px] text-amber-100 mt-0.5">Tiểu khu 89 Kbang</div>
                          </div>
                        )}

                        {selectedPreset.category === "land_encroachment" && (
                          <div className="border-2 border-dashed border-orange-400 bg-orange-500/20 p-4 rounded-xl backdrop-blur-xs text-center max-w-xs shadow-2xl">
                            <span className="px-2 py-0.5 rounded bg-orange-600 text-white font-mono text-[10px] font-bold inline-block mb-1">
                              AI: MÁY MÚC SAN GẠT (96.0%)
                            </span>
                            <div className="text-white text-xs font-bold">Đào bới đất đồi dốc tự phát</div>
                            <div className="text-[10px] text-orange-100 mt-0.5">Xã Ia Glai, Chư Sê</div>
                          </div>
                        )}

                        {selectedPreset.category === "healthy_forest" && (
                          <div className="border-2 border-emerald-400 bg-emerald-500/20 p-4 rounded-xl backdrop-blur-xs text-center max-w-xs shadow-2xl">
                            <span className="px-2 py-0.5 rounded bg-emerald-600 text-white font-mono text-[10px] font-bold inline-block mb-1">
                              AI: THẢM THỰC VẬT NGUYÊN VẸN (98.4%)
                            </span>
                            <div className="text-white text-xs font-bold">Vườn Quốc gia Kon Ka Kinh</div>
                            <div className="text-[10px] text-emerald-100 mt-0.5">Không phát hiện xâm hại</div>
                          </div>
                        )}
                      </div>

                      {/* Bottom target status */}
                      <div className="relative z-10 flex items-center justify-between text-[10px] text-white/80 bg-black/40 px-2.5 py-1 rounded font-mono">
                        <span>FOV: 84° • ISO 100 • 1/500s</span>
                        <span>Chi Cục Kiểm Lâm Tỉnh Gia Lai</span>
                      </div>
                    </div>
                  )}
                </div>

                <div className="text-xs text-slate-300">
                  {uploadedImage ? customNote || "Ảnh tải lên từ cán bộ hiện trường" : selectedPreset.description}
                </div>
              </div>

              {/* Analysis Result Card */}
              {analysisResult ? (
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm space-y-4">
                  {/* Result Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-black ${
                          analysisResult.riskLevel.includes("Nguy cấp")
                            ? "bg-rose-100 text-rose-800 border border-rose-300"
                            : analysisResult.riskLevel.includes("Cảnh báo")
                            ? "bg-amber-100 text-amber-800 border border-amber-300"
                            : "bg-emerald-100 text-emerald-800 border border-emerald-300"
                        }`}>
                          {analysisResult.riskLevel}
                        </span>
                        <span className="text-xs text-slate-500 font-semibold">
                          Độ tin cậy AI: <strong className="text-slate-800">{analysisResult.confidenceScore}%</strong>
                        </span>
                      </div>
                      <h4 className="text-base font-bold text-slate-900 mt-1">
                        {analysisResult.title}
                      </h4>
                      <p className="text-xs text-slate-500">{analysisResult.zone}</p>
                    </div>

                    <button
                      onClick={handleCopyReport}
                      className="shrink-0 px-3 py-1.5 rounded-lg border border-slate-200 hover:bg-slate-50 text-xs font-semibold text-slate-700 flex items-center gap-1.5 transition-colors"
                    >
                      {copiedReport ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-600" />
                          <span>Đã sao chép!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-500" />
                          <span>Sao chép biên bản</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Detected Entities List */}
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Thực Thể & Dấu Vết Nhận Diện (Object Detection):
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {analysisResult.detectedObjects.map((obj, i) => (
                        <div key={i} className="p-2.5 rounded-xl bg-slate-50 border border-slate-200 text-xs flex items-center justify-between">
                          <span className="font-semibold text-slate-800">{obj.name}</span>
                          <span className="px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 font-bold text-[10px]">
                            {obj.confidence}%
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Damage Estimate & Severity */}
                  <div className="p-3.5 bg-rose-50/60 rounded-xl border border-rose-200/80 text-xs space-y-1">
                    <div className="font-bold text-rose-950 flex items-center gap-1.5">
                      <ShieldAlert className="w-4 h-4 text-rose-600 shrink-0" />
                      <span>Ước Tính Thiệt Hại & Biến Động:</span>
                    </div>
                    <div className="text-slate-700">
                      • Diện tích ảnh hưởng: <strong className="text-rose-700 font-bold">{analysisResult.damageEstimate.affectedAreaM2.toLocaleString()} m²</strong>
                    </div>
                    <div className="text-slate-700">
                      • Mức độ: <strong>{analysisResult.damageEstimate.severity}</strong>
                    </div>
                  </div>

                  {/* Legal Bases & Actionable Orders */}
                  <div className="space-y-2 text-xs">
                    <span className="text-xs font-bold text-slate-700 uppercase tracking-wider block">
                      Căn Cứ Pháp Lý Áp Dụng:
                    </span>
                    <ul className="space-y-1 text-slate-600 list-disc list-inside">
                      {analysisResult.legalBases.map((law, idx) => (
                        <li key={idx} className="leading-relaxed">{law}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="space-y-2 text-xs">
                    <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block">
                      Kiến Nghị Hành Động Khẩn Cấp (Lực Lượng Cơ Sở):
                    </span>
                    <div className="space-y-1.5">
                      {analysisResult.immediateActions.map((action, idx) => (
                        <div key={idx} className="flex items-start gap-2 p-2 bg-slate-50 rounded-lg border border-slate-200 text-slate-800">
                          <span className="w-5 h-5 rounded-full bg-rose-100 text-rose-700 font-bold flex items-center justify-center shrink-0 text-[11px]">
                            {idx + 1}
                          </span>
                          <span className="leading-snug">{action}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Official Draft Text Box */}
                  <div className="space-y-1.5 pt-2 border-t border-slate-200">
                    <span className="text-xs font-bold text-slate-700 block">
                      Dự thảo Biên bản / Phiếu phản hồi hiện trường số:
                    </span>
                    <pre className="p-3 bg-slate-900 text-slate-200 rounded-xl text-[11px] font-mono whitespace-pre-wrap leading-relaxed border border-slate-800 max-h-40 overflow-y-auto">
                      {analysisResult.officialReportDraft}
                    </pre>
                  </div>
                </div>
              ) : (
                <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-slate-500 space-y-3">
                  <Camera className="w-10 h-10 text-slate-300 mx-auto" />
                  <div className="text-sm font-semibold text-slate-700">
                    Sẵn sàng quét ảnh viễn thám và hiện trường
                  </div>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Chọn một trong các tình huống thực tế mẫu hoặc tải ảnh hiện trường từ máy bay không người lái (Flycam), sau đó bấm nút "Quét Bằng Cloud Vision AI & Gemini".
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODE 3: TECHNICAL GUIDELINES & LEGAL REGIMES                              */}
      {/* ========================================================================= */}
      {activeMode === "guidelines" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <Satellite className="w-5 h-5 text-emerald-600" />
              <h3 className="text-base font-bold text-slate-900">
                Ý Nghĩa Các Chỉ Số Viễn Thám Google Earth Engine
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3 rounded-xl bg-emerald-50/70 border border-emerald-200 space-y-1">
                <strong className="text-emerald-900 font-bold block text-sm">
                  1. NDVI (Normalized Difference Vegetation Index)
                </strong>
                <p>Công thức: <code>(NIR - Red) / (NIR + Red)</code> qua dải sóng B8 và B4 của vệ tinh Sentinel-2.</p>
                <p>• <strong>NDVI &gt; 0.7:</strong> Rừng nguyên sinh, rừng trồng khép tán xanh tốt.</p>
                <p>• <strong>0.4 &lt; NDVI &lt; 0.7:</strong> Cây nông nghiệp (cà phê, cao su), rừng thưa hoặc rừng khộp.</p>
                <p>• <strong>NDVI &lt; 0.2:</strong> Đất trống, đường giao thông, vết chặt phá trơ đất.</p>
              </div>

              <div className="p-3 rounded-xl bg-rose-50/70 border border-rose-200 space-y-1">
                <strong className="text-rose-900 font-bold block text-sm">
                  2. NBR (Normalized Burn Ratio) & dNBR
                </strong>
                <p>Công thức: <code>(NIR - SWIR) / (NIR + SWIR)</code> qua dải sóng B8 và B12.</p>
                <p>• Chuyên dụng để phát hiện sẹo cháy rừng và điểm nhiệt bất thường.</p>
                <p>• So sánh <strong>dNBR (Trước - Sau)</strong> giúp khoanh định chính xác phạm vi rừng bị cháy tính bằng mét vuông mà không cần kiểm lâm phải đo đạc thủ công trong hiểm nguy.</p>
              </div>

              <div className="p-3 rounded-xl bg-sky-50/70 border border-sky-200 space-y-1">
                <strong className="text-sky-900 font-bold block text-sm">
                  3. NDWI (Normalized Difference Water Index)
                </strong>
                <p>Công thức: <code>(Green - NIR) / (Green + NIR)</code>.</p>
                <p>• Giám sát mực nước hồ thủy điện Yaly, hồ Ayun Hạ, các sông lớn Ba, Sê San.</p>
                <p>• Dự báo hạn hán phục vụ chỉ đạo tưới tiêu cho các vùng chuyên canh cà phê, hồ tiêu trong mùa khô.</p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <h3 className="text-base font-bold text-slate-900">
                Quy Trình Phối Hợp Xử Lý Cấp Bách (Chính Quyền 2 Cấp)
              </h3>
            </div>

            <div className="space-y-3 text-xs text-slate-700 leading-relaxed">
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 font-bold block">
                  Bước 1: Hệ thống AI tự động phát hiện & Gửi cảnh báo SMS / Zalo
                </strong>
                <p className="text-slate-600">
                  Khi Earth Engine hoặc ảnh Flycam phát hiện điểm dị thường nhiệt (Cấp V), hệ thống tự động trích xuất tọa độ GPS và gửi cảnh báo đến Đội trưởng Kiểm lâm cơ động và Chủ tịch UBND xã/phường phụ trách lâm phần.
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 font-bold block">
                  Bước 2: Kích hoạt Phương châm "4 Tại Chỗ" cấp Xã/Phường
                </strong>
                <p className="text-slate-600">
                  1. Chỉ huy tại chỗ (Ban chỉ huy PCCC xã/phường).<br />
                  2. Lực lượng tại chỗ (Dân quân tự vệ, chủ rừng, tổ xung kích thôn làng).<br />
                  3. Phương tiện tại chỗ (Máy thổi gió, rựa phát, bình xịt nước, flycam trinh sát).<br />
                  4. Hậu cần tại chỗ (Lương thực, nước uống, sơ cấp cứu y tế).
                </p>
              </div>

              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 space-y-1.5">
                <strong className="text-slate-900 font-bold block">
                  Bước 3: Lập Hồ Sơ Số Hóa & Tích Hợp Cơ Sở Dữ Liệu Tỉnh
                </strong>
                <p className="text-slate-600">
                  Biên bản điện tử được ký số và tích hợp tự động vào Hệ thống Quản trị Dữ liệu Rừng tỉnh Gia Lai, làm căn cứ truy cứu trách nhiệm hoặc yêu cầu phục hồi nguyên trạng rừng theo Luật Lâm nghiệp 2017 và Luật Đất đai 2024.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
