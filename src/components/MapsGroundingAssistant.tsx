import React, { useState } from "react";
import {
  MapPin,
  Navigation,
  Search,
  ExternalLink,
  Building2,
  Clock,
  Phone,
  Compass,
  Sparkles,
  CheckCircle2,
  AlertCircle,
  Info,
  Scale,
  GitBranch
} from "lucide-react";
import {
  GIALAI_PUBLIC_LOCATIONS,
  GIALAI_MERGER_CONTEXT,
  PublicLocation
} from "../data/gialaiPublicServices";

interface GroundingChunk {
  web?: {
    uri: string;
    title: string;
  };
  maps?: {
    uri: string;
    title: string;
    placeAnswerSources?: any[];
  };
}

export const MapsGroundingAssistant: React.FC = () => {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedZone, setSelectedZone] = useState<string>("all");
  const [selectedArea, setSelectedArea] = useState<string>("all");
  const [userLocation, setUserLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [locating, setLocating] = useState(false);
  const [locationError, setLocationError] = useState<string | null>(null);

  // AI Maps Assistant state
  const [aiLoading, setAiLoading] = useState(false);
  const [aiResult, setAiResult] = useState<{
    reply: string;
    groundingChunks: GroundingChunk[];
  } | null>(null);

  // Get user geolocation
  const handleGetLocation = () => {
    if (!navigator.geolocation) {
      setLocationError("Trình duyệt không hỗ trợ định vị GPS.");
      return;
    }
    setLocating(true);
    setLocationError(null);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
        });
        setLocating(false);
      },
      (err) => {
        console.warn("Geolocation error:", err);
        setLocationError("Không thể lấy vị trí hiện tại. Vui lòng cho phép quyền truy cập vị trí.");
        setLocating(false);
      },
      { timeout: 10000 }
    );
  };

  // Calculate distance between two coordinates in km (Haversine)
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Earth radius in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return (R * c).toFixed(1);
  };

  // Filter local directory locations
  const filteredLocations = GIALAI_PUBLIC_LOCATIONS.filter((loc) => {
    const matchesCategory =
      selectedCategory === "all" || loc.category === selectedCategory;
    const matchesZone =
      selectedZone === "all" || loc.zoneType === selectedZone;
    const matchesArea =
      selectedArea === "all" || loc.area.toLowerCase().includes(selectedArea.toLowerCase());
    const matchesSearch =
      query.trim() === "" ||
      loc.name.toLowerCase().includes(query.toLowerCase()) ||
      loc.address.toLowerCase().includes(query.toLowerCase()) ||
      loc.description.toLowerCase().includes(query.toLowerCase()) ||
      (loc.mergerNotice && loc.mergerNotice.toLowerCase().includes(query.toLowerCase())) ||
      loc.digitalServices.some((s) => s.toLowerCase().includes(query.toLowerCase()));
    return matchesCategory && matchesZone && matchesArea && matchesSearch;
  });

  // Query AI Maps Grounding assistant
  const handleSearchAiMaps = async (customPrompt?: string) => {
    const searchQuery = customPrompt || query;
    if (!searchQuery.trim()) return;

    setAiLoading(true);
    setAiResult(null);

    try {
      const res = await fetch("/api/maps-search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          query: searchQuery,
          userLocation,
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setAiResult({
          reply: data.reply,
          groundingChunks: data.groundingChunks || [],
        });
      } else {
        setAiResult({
          reply: "Không thể kết nối đến Trợ lý Bản đồ số. Quý Anh/Chị có thể tham khảo danh bạ địa điểm chính thức của tỉnh Gia Lai bên dưới.",
          groundingChunks: [],
        });
      }
    } catch (err) {
      console.error(err);
      setAiResult({
        reply: "Đã xảy ra lỗi kết nối mạng. Vui lòng kiểm tra lại đường truyền hoặc sử dụng danh bạ điểm tiếp nhận hồ sơ bên dưới.",
        groundingChunks: [],
      });
    } finally {
      setAiLoading(false);
    }
  };

  const samplePrompts = [
    "Theo mô hình mới bỏ cấp huyện, công dân nộp thủ tục hành chính ở đâu?",
    "Sau khi sáp nhập tỉnh Gia Lai và Bình Định, Trung tâm Phục vụ Hành chính công đặt ở đâu?",
    "Xã Tân Sơn đã sáp nhập vào xã Biển Hồ thì giải quyết hồ sơ đất đai, hộ tịch ở đâu?",
    "Thông tin cư trú trên VNeID có tự động cập nhật theo mô hình 135 xã phường không?",
  ];

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="bg-gradient-to-br from-red-900 via-rose-900 to-red-950 rounded-2xl text-white p-6 sm:p-8 shadow-md border border-red-800/80">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-400/20 border border-amber-400/40 text-amber-300 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5" />
              <span>Google Maps Grounding • Cập nhật Địa giới hành chính mới</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black tracking-tight text-white">
              Bản đồ số & Địa điểm Dịch vụ công vụ tỉnh Gia Lai
            </h2>
            <p className="text-rose-100 text-xs sm:text-sm leading-relaxed">
              Cập nhật thông tin thực tế theo các Nghị quyết sắp xếp đơn vị hành chính của Quốc hội: Hợp nhất không gian phát triển Tây Nguyên - Duyên hải miền Trung, mô hình chính quyền địa phương tinh gọn và bản đồ Một cửa điện tử liên thông.
            </p>
          </div>

          <button
            onClick={handleGetLocation}
            disabled={locating}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white text-red-900 hover:bg-amber-50 font-bold text-xs sm:text-sm shadow-md transition-all cursor-pointer disabled:opacity-50 shrink-0"
          >
            <Compass className={`w-4 h-4 text-red-700 ${locating ? "animate-spin" : ""}`} />
            <span>{locating ? "Đang định vị..." : userLocation ? "Đã định vị vị trí" : "Xác định vị trí của tôi"}</span>
          </button>
        </div>

        {userLocation && (
          <div className="mt-4 pt-4 border-t border-red-800/60 flex items-center gap-2 text-xs text-amber-200">
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
            <span>
              Tọa độ hiện tại: {userLocation.latitude.toFixed(4)}, {userLocation.longitude.toFixed(4)} — Hệ thống tự động tính khoảng cách và định tuyến đến điểm Một cửa gần nhất!
            </span>
          </div>
        )}

        {locationError && (
          <div className="mt-3 text-xs text-rose-300 flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}
      </div>

      {/* Administrative Merger Highlight Box */}
      <div className="bg-amber-50/90 border-2 border-amber-300/80 rounded-2xl p-5 sm:p-6 shadow-xs space-y-3">
        <div className="flex items-center gap-2 text-amber-900 font-bold text-sm sm:text-base">
          <GitBranch className="w-5 h-5 text-amber-700 shrink-0" />
          <span>Mô hình Chính quyền 2 Cấp & Sáp nhập Đơn vị Hành chính tỉnh Gia Lai</span>
        </div>
        <p className="text-xs sm:text-sm text-slate-700 leading-relaxed">
          Thực hiện chủ trương của Trung ương và Nghị quyết số 202/2025/QH15 của Quốc hội: <strong>Xóa bỏ hoàn toàn cấp trung gian (cấp Huyện/Thị xã)</strong>, vận hành mô hình chính quyền địa phương 2 cấp gồm <strong>Cấp Tỉnh trực tiếp quản lý 135 Xã/Phường</strong>:
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs pt-1">
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-1">
            <span className="font-bold text-red-900 block flex items-center gap-1.5">
              <Scale className="w-3.5 h-3.5 text-red-700" />
              Không còn cấp Huyện • 135 Xã/Phường
            </span>
            <span className="text-slate-600 block">
              Tỉnh Gia Lai mới có 135 đơn vị hành chính cấp xã (110 xã, 25 phường). Phân cấp thẩm quyền tối đa về Bộ phận Một cửa cơ sở xã/phường để phục vụ người dân trực tiếp.
            </span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-1">
            <span className="font-bold text-red-900 block flex items-center gap-1.5">
              <Building2 className="w-3.5 h-3.5 text-red-700" />
              Sáp nhập cấp tỉnh & Pleiku
            </span>
            <span className="text-slate-600 block">
              Hợp nhất Gia Lai - Bình Định ({'>'}21.550 km², ~3,5 triệu dân). Tại đô thị Pleiku, xã Tân Sơn đã sáp nhập trọn vẹn vào xã Biển Hồ (xã Biển Hồ mới rộng 28,84 km²).
            </span>
          </div>
          <div className="bg-white p-3.5 rounded-xl border border-amber-200 shadow-2xs space-y-1">
            <span className="font-bold text-red-900 block flex items-center gap-1.5">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
              Dịch vụ công & Dữ liệu VNeID
            </span>
            <span className="text-slate-600 block">
              Mọi thủ tục giải quyết tại Một cửa xã/phường hoặc Cổng DVCQG. Dữ liệu địa chỉ cư trú trên VNeID được ngành Công an tự động cập nhật, công dân không phải đổi giấy tờ cũ.
            </span>
          </div>
        </div>
      </div>

      {/* AI Maps Grounding Search Box */}
      <div className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 text-slate-900 font-bold text-base sm:text-lg">
          <Sparkles className="w-5 h-5 text-amber-500" />
          <span>Hỏi Trợ lý Bản đồ số Gia Lai (Gemini Maps Grounding)</span>
        </div>
        <p className="text-xs text-slate-500">
          Tra cứu vị trí giải quyết thủ tục hành chính, Bộ phận Một cửa mới sau sáp nhập, giờ làm việc hoặc điểm hỗ trợ VNeID tại Gia Lai.
        </p>

        <div className="flex flex-col sm:flex-row gap-2.5">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearchAiMaps()}
              placeholder="Ví dụ: Xã Tân Sơn sáp nhập vào Biển Hồ thì nộp hồ sơ ở đâu?"
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-red-600/30 focus:border-red-600 text-sm bg-slate-50/50"
            />
          </div>
          <button
            onClick={() => handleSearchAiMaps()}
            disabled={aiLoading || !query.trim()}
            className="px-5 py-2.5 rounded-xl bg-red-800 hover:bg-red-900 text-white font-semibold text-xs sm:text-sm shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
          >
            {aiLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                <span>Đang tra cứu Maps...</span>
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                <span>Tra cứu bản đồ</span>
              </>
            )}
          </button>
        </div>

        {/* Quick prompt recommendations */}
        <div className="space-y-1.5 pt-2">
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Gợi ý câu hỏi thực tiễn về sáp nhập & địa bàn mới:
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((prompt, pIdx) => (
              <button
                key={pIdx}
                onClick={() => {
                  setQuery(prompt);
                  handleSearchAiMaps(prompt);
                }}
                className="text-xs px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-red-50 hover:text-red-800 border border-slate-200/80 text-slate-700 transition-colors cursor-pointer text-left"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>

        {/* AI Answer Display with Maps Grounding */}
        {aiResult && (
          <div className="mt-5 rounded-xl border border-red-200 bg-red-50/40 p-4 sm:p-6 space-y-4">
            <div className="flex items-center gap-2 text-red-900 font-bold text-sm">
              <Sparkles className="w-4 h-4 text-amber-600" />
              <span>Kết quả phản hồi có xác thực Google Maps Grounding:</span>
            </div>

            <div className="text-xs sm:text-sm text-slate-800 leading-relaxed whitespace-pre-line bg-white p-4 rounded-lg border border-red-100 shadow-2xs">
              {aiResult.reply}
            </div>

            {/* Render grounding citations if available */}
            {aiResult.groundingChunks && aiResult.groundingChunks.length > 0 && (
              <div className="space-y-2 pt-2 border-t border-red-200/60">
                <span className="text-[11px] font-bold text-red-900 uppercase tracking-wider block">
                  Liên kết vị trí thực tế trên Google Maps:
                </span>
                <div className="flex flex-wrap gap-2">
                  {aiResult.groundingChunks.map((chunk, cIdx) => {
                    const uri = chunk.maps?.uri || chunk.web?.uri;
                    const title = chunk.maps?.title || chunk.web?.title || "Xem vị trí trên Google Maps";
                    if (!uri) return null;
                    return (
                      <a
                        key={cIdx}
                        href={uri}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 hover:border-red-300 text-red-700 hover:text-red-900 text-xs font-semibold shadow-2xs transition-colors"
                      >
                        <MapPin className="w-3.5 h-3.5 text-red-600" />
                        <span>{title}</span>
                        <ExternalLink className="w-3 h-3 opacity-60" />
                      </a>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Directory of Key Public Administrative Centers in Gia Lai */}
      <div className="space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
              <Building2 className="w-5 h-5 text-red-700" />
              <span>Danh bạ Trung tâm Hành chính & Bộ phận Một cửa (Mô hình mới)</span>
            </h3>
            <p className="text-xs text-slate-500">
              Cập nhật địa chỉ, đầu mối liên hệ và ghi chú sáp nhập đơn vị hành chính theo Nghị quyết Quốc hội
            </p>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap items-center gap-2">
            <select
              value={selectedZone}
              onChange={(e) => setSelectedZone(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="all">Toàn bộ 135 xã/phường</option>
              <option value="tay_nguyen">Khu vực Tây Nguyên (Pleiku & các xã)</option>
              <option value="duyen_hai">Khu vực Duyên hải (TP. Quy Nhơn & ven biển)</option>
            </select>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="all">Tất cả loại hình cơ quan</option>
              <option value="hanh_chinh_cong">Hành chính công cấp tỉnh</option>
              <option value="mot_cua_xa_phuong">Bộ phận Một cửa Xã / Phường</option>
              <option value="cong_an_vneid">Công an & Định danh VNeID</option>
              <option value="chuyen_doi_so">Chuyển đổi số & Bưu chính</option>
            </select>

            <select
              value={selectedArea}
              onChange={(e) => setSelectedArea(e.target.value)}
              className="text-xs px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-700 focus:outline-none focus:ring-2 focus:ring-red-600/30 font-medium"
            >
              <option value="all">Tất cả cụm địa bàn</option>
              <option value="Pleiku">Khu vực Pleiku</option>
              <option value="Quy Nhơn">Khu vực Quy Nhơn</option>
              <option value="Chư Sê">Khu vực Chư Sê</option>
              <option value="An Khê">Khu vực An Khê</option>
            </select>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {filteredLocations.map((loc) => {
            const distance =
              userLocation &&
              calculateDistance(
                userLocation.latitude,
                userLocation.longitude,
                loc.latitude,
                loc.longitude
              );

            return (
              <div
                key={loc.id}
                className="bg-white rounded-2xl border border-slate-200/90 p-5 shadow-xs hover:shadow-md transition-all flex flex-col justify-between space-y-4 group hover:border-red-200"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-1.5 flex-wrap">
                      <span className="px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-50 text-red-800 border border-red-100">
                        {loc.area}
                      </span>
                      <span className="px-2 py-0.5 rounded-full text-[10px] font-semibold bg-slate-100 text-slate-600">
                        {loc.zoneType === "tay_nguyen" ? "Khu vực Tây Nguyên" : "Khu vực Duyên hải"}
                      </span>
                    </div>
                    {distance && (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200 shrink-0">
                        Cách ~{distance} km
                      </span>
                    )}
                  </div>

                  <h4 className="font-bold text-slate-900 text-base group-hover:text-red-900 transition-colors leading-snug">
                    {loc.name}
                  </h4>

                  {loc.mergerNotice && (
                    <div className="p-2.5 rounded-lg bg-amber-50 border border-amber-200/80 text-[11px] text-amber-900 flex items-start gap-1.5">
                      <Info className="w-3.5 h-3.5 text-amber-700 shrink-0 mt-0.5" />
                      <span>{loc.mergerNotice}</span>
                    </div>
                  )}

                  <div className="space-y-1.5 text-xs text-slate-600">
                    <div className="flex items-start gap-2">
                      <MapPin className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                      <span>{loc.address}</span>
                    </div>
                    {loc.phone && (
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-slate-400 shrink-0" />
                        <span className="font-medium text-slate-700">{loc.phone}</span>
                      </div>
                    )}
                    {loc.workingHours && (
                      <div className="flex items-start gap-2">
                        <Clock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                        <span className="text-slate-500">{loc.workingHours}</span>
                      </div>
                    )}
                  </div>

                  <p className="text-xs text-slate-600 leading-relaxed border-t border-slate-100 pt-2.5">
                    {loc.description}
                  </p>

                  {/* Digital Services badges */}
                  <div className="space-y-1.5">
                    <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">
                      Dịch vụ số tiêu biểu:
                    </span>
                    <ul className="space-y-1">
                      {loc.digitalServices.map((srv, sIdx) => (
                        <li key={sIdx} className="text-xs text-slate-700 flex items-start gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-red-600 shrink-0 mt-0.5" />
                          <span>{srv}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <a
                    href={loc.googleMapsUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-red-800 text-white text-xs font-semibold shadow-xs transition-colors cursor-pointer"
                  >
                    <Navigation className="w-3.5 h-3.5 text-amber-300" />
                    <span>Chỉ đường trên Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-60" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {filteredLocations.length === 0 && (
          <div className="text-center py-12 bg-white rounded-2xl border border-slate-200 text-slate-500 text-sm">
            Không tìm thấy địa điểm công vụ nào phù hợp với bộ lọc hiện tại.
          </div>
        )}
      </div>
    </div>
  );
};
