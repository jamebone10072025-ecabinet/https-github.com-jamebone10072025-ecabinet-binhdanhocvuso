// Dữ liệu viễn thám Google Earth Engine & Phân tích ảnh hiện trường Cloud Vision AI cho tỉnh Gia Lai

export interface ForestZone {
  id: string;
  name: string;
  location: string;
  coordinates: { lat: number; lng: number };
  areaHa: number;
  type: "Đặc dụng" | "Phòng hộ" | "Sản xuất" | "Lâm nghiệp - Nông nghiệp";
  ndviScore: number; // 0 to 1
  nbrScore: number; // -1 to 1
  ndwiScore: number;
  fireRiskLevel: "Cấp I (Thấp)" | "Cấp II (Trung bình)" | "Cấp III (Cao)" | "Cấp IV (Nguy hiểm)" | "Cấp V (Cực kỳ nguy hiểm)";
  activeHotspots: number;
  canopyTrend: "Ổn định" | "Đang suy giảm" | "Tăng trưởng" | "Cảnh báo khẩn cấp";
  lastSatellitePass: string;
  description: string;
  warningNotice?: string;
}

export const GIALAI_FOREST_ZONES: ForestZone[] = [
  {
    id: "zone-konkakin",
    name: "Vườn Quốc gia Kon Ka Kinh",
    location: "Khu vực Đắk Đoa - Kbang - Mang Yang, Gia Lai",
    coordinates: { lat: 14.2833, lng: 108.3833 },
    areaHa: 41960,
    type: "Đặc dụng",
    ndviScore: 0.86,
    nbrScore: 0.78,
    ndwiScore: 0.42,
    fireRiskLevel: "Cấp II (Trung bình)",
    activeHotspots: 0,
    canopyTrend: "Ổn định",
    lastSatellitePass: "Vệ tinh Sentinel-2 (08:45 sáng nay)",
    description: "Khu Dự trữ Sinh quyển Thế giới Tây Nguyên, diện tích rừng kín thường xanh mưa ẩm nhiệt đới nguyên sinh lớn nhất tỉnh. Hệ sinh thái có độ che phủ trên 92%, bảo tồn nguồn gen động thực vật quý hiếm.",
  },
  {
    id: "zone-krongpa",
    name: "Rừng phòng hộ Krông Pa & Thung lũng Chảo lửa Sông Ba",
    location: "Khu vực Krông Pa - Ia Pa (giáp ranh Phú Yên), Gia Lai",
    coordinates: { lat: 13.1833, lng: 108.7333 },
    areaHa: 68400,
    type: "Phòng hộ",
    ndviScore: 0.46,
    nbrScore: 0.18,
    ndwiScore: -0.15,
    fireRiskLevel: "Cấp V (Cực kỳ nguy hiểm)",
    activeHotspots: 3,
    canopyTrend: "Cảnh báo khẩn cấp",
    lastSatellitePass: "Vệ tinh Landsat 9 (10:12 hôm nay)",
    description: "Vùng khí hậu khô hạn đặc trưng với diện tích lớn rừng khộp rụng lá và rừng le. Nhiệt độ mặt đất mùa khô vượt 39°C. Cần duy trì chế độ trực chỉ huy PCCC rừng 24/24.",
    warningNotice: "Phát hiện 3 điểm dị thường nhiệt (Thermal Anomalies) tại Tiểu khu 128 và 135. Khuyến nghị xuất quân xác minh khẩn!",
  },
  {
    id: "zone-konchurang",
    name: "Khu Bảo tồn Thiên nhiên Kon Chư Răng",
    location: "Khu vực Kbang (giáp ranh Quảng Ngãi - Bình Định), Gia Lai",
    coordinates: { lat: 14.5167, lng: 108.6000 },
    areaHa: 15900,
    type: "Đặc dụng",
    ndviScore: 0.89,
    nbrScore: 0.82,
    ndwiScore: 0.55,
    fireRiskLevel: "Cấp I (Thấp)",
    activeHotspots: 0,
    canopyTrend: "Tăng trưởng",
    lastSatellitePass: "Vệ tinh Sentinel-2 (Hôm qua)",
    description: "Rừng đầu nguồn sông Côn, độ ẩm cao quanh năm với hệ sinh thái thác K50. Giám sát không ghi nhận hiện tượng xâm lấn hay chặt phá rừng.",
  },
  {
    id: "zone-ayunpa",
    name: "Rừng đầu nguồn Hồ thủy lợi Ayun Hạ & Đèo Tô Na",
    location: "Khu vực Thị xã Ayun Pa - Huyện Phú Thiện, Gia Lai",
    coordinates: { lat: 13.4167, lng: 108.4500 },
    areaHa: 32500,
    type: "Phòng hộ",
    ndviScore: 0.52,
    nbrScore: 0.29,
    ndwiScore: 0.38,
    fireRiskLevel: "Cấp IV (Nguy hiểm)",
    activeHotspots: 1,
    canopyTrend: "Đang suy giảm",
    lastSatellitePass: "Vệ tinh Sentinel-2 (08:45 sáng nay)",
    description: "Khu vực xung yếu bảo vệ nguồn nước cho công trình đại thủy nông Ayun Hạ. Mùa khô cỏ tranh phát triển mạnh, nguy cơ bén lửa từ hoạt động đốt nương rẫy của người dân lân cận.",
    warningNotice: "Phát hiện 1 vệt khói nhỏ tại sườn Tây Đèo Tô Na, giáp ranh đất canh tác sắn.",
  },
  {
    id: "zone-yaly",
    name: "Lòng hồ Thủy điện Yaly & Rừng vành đai Chư Păh - Ia Grai",
    location: "Khu vực Chư Păh - Ia Grai (giáp Kon Tum), Gia Lai",
    coordinates: { lat: 14.2167, lng: 107.8167 },
    areaHa: 28700,
    type: "Phòng hộ",
    ndviScore: 0.74,
    nbrScore: 0.65,
    ndwiScore: 0.68,
    fireRiskLevel: "Cấp II (Trung bình)",
    activeHotspots: 0,
    canopyTrend: "Ổn định",
    lastSatellitePass: "Vệ tinh Sentinel-2 (Hôm nay)",
    description: "Vành đai sinh thái bao quanh hồ thủy điện Yaly 720MW. Mực nước hồ duy trì ổn định, thảm thực vật ven hồ phát triển tốt.",
  },
  {
    id: "zone-dakdoa-chuse",
    name: "Vùng đất nông - lâm kết hợp Đắk Đoa & Chư Sê",
    location: "Khu vực cao nguyên trung tâm Đắk Đoa - Chư Sê, Gia Lai",
    coordinates: { lat: 13.7833, lng: 108.1500 },
    areaHa: 94000,
    type: "Lâm nghiệp - Nông nghiệp",
    ndviScore: 0.65,
    nbrScore: 0.55,
    ndwiScore: 0.20,
    fireRiskLevel: "Cấp III (Cao)",
    activeHotspots: 0,
    canopyTrend: "Đang suy giảm",
    lastSatellitePass: "Vệ tinh Landsat 9 (Hôm qua)",
    description: "Vùng chuyên canh cà phê, cao su xen kẹt đất lâm nghiệp. Cần kiểm soát biến động mục đích sử dụng đất, tránh tình trạng tự ý ủi đồi phân lô hoặc lấn chiếm đất lâm phần.",
  },
];

export interface FieldPresetImage {
  id: string;
  title: string;
  category: "forest_fire" | "deforestation" | "land_encroachment" | "healthy_forest";
  location: string;
  deviceSource: "Drone DJI Matrice 300 RTK" | "Flycam Mini 4 Pro Kiểm lâm" | "Camera giám sát tháp canh lửa" | "Ảnh tuần tra hiện trường smartphone";
  thumbnailColor: string;
  description: string;
  urgency: "urgent" | "warning" | "normal";
  expectedFindings: string[];
}

export const FIELD_IMAGE_PRESETS: FieldPresetImage[] = [
  {
    id: "preset-fire-krongpa",
    title: "Flycam phát hiện đám cháy rừng le & khói bốc cao",
    category: "forest_fire",
    location: "Tiểu khu 128, Xã Ia Mláh, Huyện Krông Pa, Gia Lai",
    deviceSource: "Drone DJI Matrice 300 RTK",
    thumbnailColor: "from-amber-500 to-rose-600",
    description: "Ảnh chụp từ độ cao 180m ghi nhận cột khói trắng dày đặc và ngọn lửa đang lan theo hướng gió Đông Nam qua vạt rừng le khô.",
    urgency: "urgent",
    expectedFindings: [
      "Ngọn lửa bốc cháy khoảng 1.200 m² thảm thực vật rừng le khô",
      "Vệt khói lan rộng về hướng khu dân cư cách 2.5 km",
      "Nguy cơ cháy lan vào rừng gỗ tự nhiên liền kề nếu không khoanh vùng tạo đường băng cản lửa",
    ],
  },
  {
    id: "preset-deforest-kbang",
    title: "Flycam tầm quét phát hiện vết chặt phá cây rừng tự nhiên",
    category: "deforestation",
    location: "Tiểu khu 89, Xã Krong, Huyện Kbang, Gia Lai",
    deviceSource: "Flycam Mini 4 Pro Kiểm lâm",
    thumbnailColor: "from-rose-600 to-red-800",
    description: "Hình ảnh góc rộng phát hiện khoảnh rừng bị đốn hạ loang lổ giữa rừng nguyên sinh, cây gỗ ngã đổ ngổn ngang với dấu vết cưa máy còn mới.",
    urgency: "urgent",
    expectedFindings: [
      "Diện tích cây gỗ bị triệt hạ ước tính 4.500 m²",
      "Phát hiện dấu vết lán trại dựng tạm và đường mòn vận chuyển gỗ",
      "Cần lệnh điều động Tổ Kiểm lâm cơ động và Công an xã lập biên bản hiện trường",
    ],
  },
  {
    id: "preset-encroach-chuse",
    title: "Ảnh flycam máy múc san gạt trái phép đất lâm nghiệp",
    category: "land_encroachment",
    location: "Khu vực Đồi Chè, Xã Ia Glai, Huyện Chư Sê, Gia Lai",
    deviceSource: "Ảnh tuần tra hiện trường smartphone",
    thumbnailColor: "from-amber-600 to-orange-700",
    description: "Cán bộ địa chính - xây dựng xã ghi nhận xe cơ giới tự ý múc đất đồi, hủy hoại thảm cây tái sinh để mở đường tự phát.",
    urgency: "warning",
    expectedFindings: [
      "01 máy xúc bánh xích đang đào bới san phẳng sườn đồi dốc",
      "Đã làm biến dạng địa hình khoảng 3.000 m² đất quy hoạch lâm nghiệp",
      "Hành vi vi phạm Luật Đất đai 2024 và Luật Lâm nghiệp 2017",
    ],
  },
  {
    id: "preset-healthy-konkakin",
    title: "Ảnh tuần tra kiểm lâm: Rừng nguyên sinh Kon Ka Kinh xanh tốt",
    category: "healthy_forest",
    location: "Trạm Kiểm lâm số 3, Vườn Quốc gia Kon Ka Kinh, Gia Lai",
    deviceSource: "Ảnh tuần tra hiện trường smartphone",
    thumbnailColor: "from-emerald-600 to-teal-700",
    description: "Cán bộ tuần tra ghi nhận thảm thực vật đa tầng nguyên vẹn, các loài cây họ Dầu và Dẻ phát triển tốt, nguồn nước khe suối trong sạch.",
    urgency: "normal",
    expectedFindings: [
      "Độ che phủ tán rừng tầng trên đạt 95%",
      "Không phát hiện dấu hiệu xâm hại, chặt phá hay bẫy bắt động vật hoang dã",
      "Trạng thái sinh thái duy trì lý tưởng, độ ẩm thảm mục an toàn",
    ],
  },
];

export interface VisionAnalysisResult {
  title: string;
  zone: string;
  category: string;
  riskLevel: "Nguy cấp (Cần xử lý ngay)" | "Cảnh báo cao" | "Bình thường / Ổn định";
  confidenceScore: number;
  detectedObjects: { name: string; confidence: number; boundingArea: string }[];
  damageEstimate: {
    affectedAreaM2: number;
    severity: string;
    fireOrLossType: string;
  };
  legalBases: string[];
  immediateActions: string[];
  officialReportDraft: string;
}

export function generateFallbackVisionAnalysis(
  category: string,
  presetId?: string,
  customNote?: string
): VisionAnalysisResult {
  if (category === "forest_fire" || presetId === "preset-fire-krongpa") {
    return {
      title: "Báo cáo Phân tích AI: Điểm phát nhiệt & Đám cháy Rừng Le Khẩn cấp",
      zone: "Tiểu khu 128, Rừng phòng hộ Krông Pa, tỉnh Gia Lai",
      category: "Cảnh báo Cháy rừng (Forest Fire Detection)",
      riskLevel: "Nguy cấp (Cần xử lý ngay)",
      confidenceScore: 96.4,
      detectedObjects: [
        { name: "Khói cháy thảm mục (Dense Smoke Plume)", confidence: 98.2, boundingArea: "Góc Tây Bắc ảnh, cao 180m" },
        { name: "Lửa bốc rực sáng (Open Flame / Hotspot)", confidence: 95.8, boundingArea: "Tâm điểm sườn đồi tiểu khu 128" },
        { name: "Rừng le khô & thảm cỏ dễ bén (Fuel Bed)", confidence: 97.1, boundingArea: "Vùng rìa xung quanh 2.000m²" },
        { name: "Đường mòn tự nhiên (Natural Buffer)", confidence: 88.4, boundingArea: "Phía Nam đám cháy cách 70m" },
      ],
      damageEstimate: {
        affectedAreaM2: 1250,
        severity: "Đang lan nhanh theo vận tốc gió 18 km/h",
        fireOrLossType: "Cháy bề mặt rừng le khô mùa khô Tây Nguyên",
      },
      legalBases: [
        "Luật Lâm nghiệp năm 2017 (Điều 53 về Phòng cháy và chữa cháy rừng)",
        "Nghị định số 156/2018/NĐ-CP quy định chi tiết thi hành một số điều của Luật Lâm nghiệp",
        "Chỉ thị của Chủ tịch UBND tỉnh Gia Lai về công tác PCCC rừng mùa khô năm 2026",
      ],
      immediateActions: [
        "Kích hoạt cấp báo động cháy rừng Cấp V (Cực kỳ nguy hiểm) cho Đội Kiểm lâm Krông Pa và UBND xã Ia Mláh.",
        "Điều động ngay 02 tổ cơ động (20 cán bộ, dân quân tự vệ) tiếp cận sườn đồi mang theo máy thổi gió và bình xịt nước.",
        "Phát dọn gấp đường băng cản lửa rộng 8-10m phía Nam để chặn lửa lan vào rừng phòng hộ gỗ lớn.",
        "Sử dụng Flycam tiếp tục phát sóng truyền trực tiếp tọa độ cho Ban chỉ huy PCCC huyện.",
      ],
      officialReportDraft: `CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM\nĐộc lập - Tự do - Hạnh phúc\n----------\nPHIẾU BÁO CÁO NHANH SỐ HÓA HIỆN TRƯỜNG CHÁY RỪNG\n(Trích xuất tự động từ Hệ thống Google Earth Engine & Cloud Vision AI Gia Lai)\n\n1. Thời gian phát hiện: ${new Date().toLocaleTimeString("vi-VN")} ngày ${new Date().toLocaleDateString("vi-VN")}\n2. Địa điểm: Tiểu khu 128, lâm phần Rừng phòng hộ Krông Pa, Gia Lai (Tọa độ: 13.1833° N, 108.7333° E).\n3. Kết quả quét Vision AI: Phát hiện khói đặc và ngọn lửa đang bốc cháy diện tích khoảng 1.250 m² rừng le khô. Nguy cơ cháy lan cấp cực kỳ nguy hiểm.\n4. Đề xuất: Ban chỉ huy PCCC rừng huyện Krông Pa khẩn cấp xuất quân khoanh vùng dập lửa theo phương châm 4 tại chỗ.\n\nNgười lập phiếu: Cán bộ trực ban Viễn thám số tỉnh Gia Lai`,
    };
  }

  if (category === "deforestation" || presetId === "preset-deforest-kbang") {
    return {
      title: "Báo cáo Phân tích AI: Phát hiện Điểm Chặt phá Lâm sản Trái phép",
      zone: "Tiểu khu 89, Lâm trường Krong, Huyện Kbang, Gia Lai",
      category: "Xâm hại Rừng Tự nhiên (Illegal Deforestation)",
      riskLevel: "Nguy cấp (Cần xử lý ngay)",
      confidenceScore: 94.8,
      detectedObjects: [
        { name: "Cây gỗ lớn bị đốn hạ (Felled Timber Trunks)", confidence: 96.5, boundingArea: "Tọa độ trung tâm khoảnh rừng" },
        { name: "Vết cưa máy xẻ gỗ (Sawdust & Stumps)", confidence: 93.2, boundingArea: "Gốc cây đường kính 45-60cm" },
        { name: "Lán trại dã chiến tạm thời (Makeshift Shelter)", confidence: 89.1, boundingArea: "Góc Đông Nam bìa suối" },
        { name: "Đường mòn kéo gỗ (Skid Trail)", confidence: 92.0, boundingArea: "Hướng ra đường liên thôn" },
      ],
      damageEstimate: {
        affectedAreaM2: 4600,
        severity: "Phá rừng tự nhiên nghiêm trọng, có tổ chức",
        fireOrLossType: "Khai thác lâm sản trái pháp luật",
      },
      legalBases: [
        "Điều 243 Bộ luật Hình sự năm 2015 (sửa đổi, bổ sung 2017) về Tội hủy hoại rừng",
        "Luật Lâm nghiệp năm 2017 (Điều 9 các hành vi bị nghiêm cấm trong hoạt động lâm nghiệp)",
        "Nghị định số 35/2019/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực Lâm nghiệp",
      ],
      immediateActions: [
        "Hạt Kiểm lâm huyện Kbang phối hợp Công an huyện và Viện Kiểm sát tổ chức khám nghiệm hiện trường khẩn cấp.",
        "Chốt chặn các ngả đường mòn tại Tiểu khu 89 ngăn chặn tẩu tán lâm sản ra ngoài bìa rừng.",
        "Đo đếm số lượng cây bị cưa hạ, lập biên bản niêm phong gỗ tại chỗ.",
        "Trích xuất dữ liệu vệ tinh Sentinel-2 lưu trữ 15 ngày qua để xác định chính xác thời điểm bắt đầu xảy ra hành vi phá rừng.",
      ],
      officialReportDraft: `BIÊN BẢN GHI NHẬN HIỆN TRƯỜNG BIẾN ĐỘNG RỪNG BẰNG CÔNG NGHỆ SỐ\nCăn cứ kết quả phân tích Cloud Vision AI và thiết bị bay không người lái (Flycam):\n- Địa điểm: Tiểu khu 89, Huyện Kbang, Gia Lai.\n- Hiện trạng: 4.600 m² rừng tự nhiên bị chặt hạ; phát hiện 18 lóng gỗ tròn và lán trại khai thác lâm sản trái phép.\n- Đề nghị Cơ quan chức năng tiến hành khởi tố vụ án theo quy định của pháp luật.`,
    };
  }

  if (category === "land_encroachment" || presetId === "preset-encroach-chuse") {
    return {
      title: "Báo cáo Phân tích AI: San gạt & Thay đổi Hiện trạng Đất Lâm nghiệp Trái phép",
      zone: "Khu vực Đồi Chè, Xã Ia Glai, Huyện Chư Sê, Gia Lai",
      category: "Hành vi Vi phạm Đất đai (Land Encroachment)",
      riskLevel: "Cảnh báo cao",
      confidenceScore: 92.7,
      detectedObjects: [
        { name: "Phương tiện cơ giới / Máy múc (Excavator)", confidence: 96.0, boundingArea: "Giữa thửa đất số 42" },
        { name: "Vết đào múc taluy đất đồi (Excavation Scar)", confidence: 94.3, boundingArea: "Khu vực sườn đồi dốc" },
        { name: "Đống đất đá phế thải san phẳng (Flattened Ground)", confidence: 91.5, boundingArea: "Diện tích 3.000m²" },
      ],
      damageEstimate: {
        affectedAreaM2: 3200,
        severity: "Làm hủy hoại đất, thay đổi độ dốc địa hình nguy cơ sạt lở mùa mưa",
        fireOrLossType: "Tự ý chuyển mục đích sử dụng đất không được phép",
      },
      legalBases: [
        "Luật Đất đai năm 2024 (Điều 9 về Người sử dụng đất có trách nhiệm bảo vệ đất, Điều 15 về các hành vi bị nghiêm cấm)",
        "Nghị định số 123/2024/NĐ-CP quy định xử phạt vi phạm hành chính trong lĩnh vực đất đai",
      ],
      immediateActions: [
        "UBND xã Ia Glai cử Tổ công tác Địa chính - Công an xã đến hiện trường lập biên bản đình chỉ thi công ngay lập tức.",
        "Tạm giữ phương tiện máy múc vi phạm để xác minh chủ đầu tư và đối tượng thuê mướn.",
        "Buộc khôi phục lại tình trạng ban đầu của đất trước khi vi phạm và xử phạt hành chính theo quy định.",
      ],
      officialReportDraft: `THÔNG BÁO XỬ LÝ VI PHẠM ĐẤT ĐAI QUA HỆ THỐNG GIÁM SÁT VIỄN THÁM\nKính gửi: Chủ tịch UBND xã Ia Glai, huyện Chư Sê.\nHệ thống AI phát hiện hoạt động san ủi trái phép diện tích 3.200 m² đất đồi tại thửa số 42. Đề nghị UBND xã lập tức kiểm tra hiện trường, đình chỉ hành vi vi phạm.`,
    };
  }

  // Default: healthy forest / normal inspection
  return {
    title: "Báo cáo Phân tích AI: Hiện trạng Thảm thực vật Rừng Nguyên sinh Tốt",
    zone: "Trạm Kiểm lâm số 3, Vườn Quốc gia Kon Ka Kinh, Gia Lai",
    category: "Đánh giá Sức khỏe Thảm thực vật (Canopy Health Inspection)",
    riskLevel: "Bình thường / Ổn định",
    confidenceScore: 97.8,
    detectedObjects: [
      { name: "Tán rừng nguyên sinh đa tầng (Multi-tier Forest Canopy)", confidence: 98.4, boundingArea: "Toàn bộ khung ảnh" },
      { name: "Thực vật họ Dầu và Dẻ phát triển mạnh (Dipterocarpaceae)", confidence: 94.6, boundingArea: "Tầng cây cao vượt tán" },
      { name: "Thảm tươi mục duy trì độ ẩm tự nhiên (Leaf Litter)", confidence: 95.0, boundingArea: "Mặt đất dưới tán" },
      { name: "Dòng suối đầu nguồn trong mát (Pristine Stream)", confidence: 96.1, boundingArea: "Băng qua thung lũng" },
    ],
    damageEstimate: {
      affectedAreaM2: 0,
      severity: "Không có biến động tiêu cực",
      fireOrLossType: "Hệ sinh thái tự nhiên nguyên vẹn",
    },
    legalBases: [
      "Luật Lâm nghiệp năm 2017 (Quy định quản lý Vườn Quốc gia và Khu bảo tồn)",
      "Quy chế quản lý Vườn Quốc gia Kon Ka Kinh ban hành kèm Quyết định của UBND tỉnh Gia Lai",
    ],
    immediateActions: [
      "Duy trì chế độ tuần tra bảo vệ định kỳ bằng flycam và lực lượng kiểm lâm đi bộ.",
      "Ghi nhận nhật ký tuần tra số vào Cơ sở dữ liệu tài nguyên rừng tỉnh Gia Lai.",
      "Tiếp tục bảo vệ nguồn gen quý hiếm và cây di sản trong lâm phần.",
    ],
    officialReportDraft: `NHẬT KÝ TUẦN TRA RỪNG THÔNG MINH - SỐ HÓA VƯỜN QUỐC GIA KON KA KINH\n- Ngày kiểm tra: ${new Date().toLocaleDateString("vi-VN")}\n- Hiện trạng: Thảm thực vật tầng trên và tầng dưới phát triển tốt, không phát hiện dấu vết xâm hại.\n- Kết luận: Lâm phần ổn định, an toàn tuyệt đối.`,
  };
}
