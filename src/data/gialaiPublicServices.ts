export interface PublicLocation {
  id: string;
  name: string;
  category: "hanh_chinh_cong" | "mot_cua_xa_phuong" | "so_nganh" | "chuyen_doi_so" | "cong_an_vneid";
  address: string;
  area: string; // Tên xã/phường/đô thị
  zoneType: "tay_nguyen" | "duyen_hai"; // Phân vùng Tây Nguyên hoặc Duyên hải trong tỉnh Gia Lai mới
  phone?: string;
  workingHours?: string;
  latitude: number;
  longitude: number;
  googleMapsUrl: string;
  digitalServices: string[];
  description: string;
  mergerNotice?: string; // Ghi chú sắp xếp, sáp nhập và mô hình chính quyền 2 cấp
}

export const GIALAI_MERGER_CONTEXT = {
  governanceModel: "Mô hình chính quyền địa phương 2 cấp: Tỉnh trực tiếp quản lý 135 Xã/Phường (bỏ hoàn toàn cấp Huyện)",
  mergerResolutions: [
    "Nghị quyết số 202/2025/QH15 của Quốc hội: Hợp nhất tỉnh Gia Lai và Bình Định thành tỉnh Gia Lai (mới), chính quyền 2 cấp (Tỉnh - Xã/Phường)",
    "Nghị quyết số 1195/NQ-UBTVQH15 và Nghị quyết 1664/NQ-UBTVQH15: Sắp xếp các đơn vị hành chính cấp xã, phường",
    "Xóa bỏ cấp trung gian hành chính (cấp Huyện/Thị xã), phân cấp - ủy quyền tối đa cho 135 xã/phường trực thuộc tỉnh"
  ],
  administrativeScale: "Quy mô diện tích hơn 21.550 km² (lớn thứ hai cả nước), dân số khoảng 3,5 triệu người, gồm 135 đơn vị hành chính cấp xã/phường (110 xã, 25 phường).",
  administrativeCenters: {
    politicalEconomic: "Thành phố Quy Nhơn (Trung tâm chính trị - hành chính tỉnh Gia Lai mới ven biển)",
    highlandHub: "Thành phố Pleiku (Đô thị trung tâm dịch vụ công nghệ - chuyển đổi số Tây Nguyên)"
  }
};

export const GIALAI_PUBLIC_LOCATIONS: PublicLocation[] = [
  {
    id: "hcc-gialai-pleiku",
    name: "Trung tâm Phục vụ Hành chính công tỉnh Gia Lai (Cơ sở Tây Nguyên - Pleiku)",
    category: "hanh_chinh_cong",
    address: "Số 69 đường Hùng Vương, phường Tây Sơn, TP. Pleiku, tỉnh Gia Lai",
    area: "Phường Tây Sơn, TP. Pleiku",
    zoneType: "tay_nguyen",
    phone: "0269 3888 222",
    workingHours: "Sáng: 07h00 - 11h30, Chiều: 13h30 - 17h00 (Thứ 2 - Thứ 6)",
    latitude: 13.9806,
    longitude: 108.0048,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Phục+vụ+Hành+chính+công+tỉnh+Gia+Lai",
    digitalServices: [
      "Đầu mối tiếp nhận TTHC thẩm quyền cấp tỉnh liên thông 135 xã/phường",
      "Khu hướng dẫn nộp hồ sơ dịch vụ công trực tuyến & số hóa hồ sơ đầu vào",
      "Thanh toán phí/lệ phí không dùng tiền mặt (QR Code, VNeID, Cổng DVCQG)",
      "Liên thông kết quả giải quyết TTHC trực tiếp xuống cơ sở xã/phường qua BCCI"
    ],
    description: "Đầu mối giải quyết TTHC cấp tỉnh phục vụ địa bàn khu vực Tây Nguyên theo mô hình chính quyền 2 cấp liên thông trực tiếp với các xã, phường.",
    mergerNotice: "Vận hành theo mô hình 2 cấp: tiếp nhận các thủ tục cấp tỉnh không còn qua trung gian cấp huyện."
  },
  {
    id: "hcc-gialai-quynhon",
    name: "Trung tâm Phục vụ Hành chính công tỉnh Gia Lai (Cơ sở Duyên hải - TP. Quy Nhơn)",
    category: "hanh_chinh_cong",
    address: "Số 127 đường Hai Bà Trưng, phường Lê Lợi, TP. Quy Nhơn, tỉnh Gia Lai",
    area: "Phường Lê Lợi, TP. Quy Nhơn",
    zoneType: "duyen_hai",
    phone: "0256 3822 555",
    workingHours: "Sáng: 07h00 - 11h30, Chiều: 13h30 - 17h00 (Thứ 2 - Thứ 6)",
    latitude: 13.7765,
    longitude: 109.2312,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Phục+vụ+Hành+chính+công+Quy+Nhơn",
    digitalServices: [
      "Bộ phận Một cửa cấp tỉnh tại trung tâm chính trị - hành chính tỉnh Gia Lai mới",
      "Kiosk định danh công dân VNeID, bốc số và số hóa giấy tờ tự động",
      "Hệ thống Một cửa điện tử số hóa 100% kết quả thủ tục hành chính",
      "Phục vụ thủ tục đầu tư cảng biển, công nghiệp, năng lượng và logistics"
    ],
    description: "Cơ sở tiếp nhận và trả kết quả TTHC cấp tỉnh khu vực Duyên hải theo mô hình tỉnh Gia Lai mới sau sáp nhập.",
    mergerNotice: "Đặt tại trung tâm hành chính mới của tỉnh, kết nối dữ liệu liên thông với toàn bộ 135 xã/phường."
  },
  {
    id: "motcua-bienho-pleiku",
    name: "Bộ phận Một cửa UBND xã Biển Hồ (Mô hình xã sáp nhập mới)",
    category: "mot_cua_xa_phuong",
    address: "Khu vực trung tâm hành chính mới xã Biển Hồ, TP. Pleiku, tỉnh Gia Lai",
    area: "Xã Biển Hồ",
    zoneType: "tay_nguyen",
    phone: "0269 3828 789",
    workingHours: "Sáng: 07h00 - 11h30, Chiều: 13h30 - 17h00",
    latitude: 14.0289,
    longitude: 108.0122,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+xã+Biển+Hồ+Pleiku",
    digitalServices: [
      "Giải quyết 100% TTHC thẩm quyền cấp xã cho nhân dân Tân Sơn cũ và Biển Hồ",
      "Cấp trích lục hộ tịch, xác nhận tình trạng hôn nhân điện tử",
      "Điểm hỗ trợ nộp hồ sơ trực tuyến, thanh toán phí/lệ phí qua QR VNeID",
      "Tiếp nhận thẩm quyền trước đây của cấp huyện được phân cấp về cơ sở"
    ],
    description: "Xã quy mô mới thành lập trên cơ sở sáp nhập nguyên trạng xã Tân Sơn vào xã Biển Hồ theo Nghị quyết 1195/NQ-UBTVQH15 (diện tích 28,84 km²).",
    mergerNotice: "Điển hình mô hình cấp xã mới trực thuộc tỉnh (không qua cấp huyện). Công dân xã Tân Sơn cũ thực hiện giao dịch tại đây."
  },
  {
    id: "motcua-phuong-dienhong",
    name: "Bộ phận Một cửa UBND phường Diên Hồng",
    category: "mot_cua_xa_phuong",
    address: "Số 81 đường Hùng Vương, phường Diên Hồng, TP. Pleiku, tỉnh Gia Lai",
    area: "Phường Diên Hồng",
    zoneType: "tay_nguyen",
    phone: "0269 3823 456",
    workingHours: "Sáng: 07h00 - 11h30, Chiều: 13h30 - 17h00",
    latitude: 13.9775,
    longitude: 108.0021,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=UBND+phường+Diên+Hồng+Pleiku",
    digitalServices: [
      "Bộ phận Một cửa hiện đại cấp phường trực thuộc tỉnh",
      "Chứng thực bản sao điện tử từ bản chính không phụ thuộc địa giới",
      "Giải quyết thủ tục đất đai, xây dựng được phân cấp trực tiếp từ tỉnh",
      "Kiosk số tự động hướng dẫn dịch vụ công trực tuyến 24/7"
    ],
    description: "Một cửa phường trọng điểm tại đô thị Pleiku, thực hiện đầy đủ các thủ tục hành chính phục vụ công dân theo mô hình 2 cấp.",
    mergerNotice: "Là 1 trong 25 phường của tỉnh Gia Lai mới, vận hành liên thông trực tiếp với các Sở, Ban, Ngành cấp tỉnh."
  },
  {
    id: "motcua-xa-chuse",
    name: "Bộ phận Một cửa trung tâm cụm xã Chư Sê",
    category: "mot_cua_xa_phuong",
    address: "Đường Hùng Vương, trung tâm khu vực Chư Sê, tỉnh Gia Lai",
    area: "Khu vực Chư Sê",
    zoneType: "tay_nguyen",
    phone: "0269 3851 234",
    workingHours: "Thứ 2 đến Thứ 6 (Giờ hành chính)",
    latitude: 13.6558,
    longitude: 108.0267,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Trung+tâm+Một+cửa+Chư+Sê+Gia+Lai",
    digitalServices: [
      "Bộ phận Một cửa phục vụ cụm các xã khu vực phía Nam tỉnh Gia Lai mới",
      "Trợ giúp đồng bào DTTS số hóa hồ sơ, khai báo TTHC trên VNeID",
      "Thu nghĩa vụ tài chính và thuế đất đai trực tuyến liên thông kho bạc tỉnh"
    ],
    description: "Bộ phận tiếp nhận TTHC phục vụ mạng lưới các xã phía Nam, kết nối số hóa trực tiếp lên Cổng Dịch vụ công tỉnh Gia Lai.",
    mergerNotice: "Chuyển từ cơ quan cấp huyện sang điểm tiếp nhận TTHC phân cấp trực thuộc mô hình chính quyền 2 cấp."
  },
  {
    id: "motcua-xa-ankhe",
    name: "Bộ phận Một cửa trung tâm cụm xã/phường An Khê",
    category: "mot_cua_xa_phuong",
    address: "Số 551 đường Quang Trung, khu vực An Khê, tỉnh Gia Lai",
    area: "Khu vực An Khê",
    zoneType: "tay_nguyen",
    phone: "0269 3832 234",
    workingHours: "Thứ 2 đến Thứ 6 (Giờ hành chính)",
    latitude: 13.9877,
    longitude: 108.6475,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Bộ+phận+Một+cửa+An+Khê+Gia+Lai",
    digitalServices: [
      "Đầu mối giải quyết TTHC cửa ngõ kết nối Tây Nguyên và Duyên hải",
      "Một cửa số hóa 100% hồ sơ đất đai, tư pháp - hộ tịch, đăng ký kinh doanh",
      "Hệ thống ký số công vụ và trả kết quả điện tử tại chỗ"
    ],
    description: "Điểm phục vụ hành chính kết nối then chốt trên trục Quốc lộ 19 giữa vùng cao nguyên Pleiku và duyên hải Quy Nhơn.",
    mergerNotice: "Vận hành theo mô hình phân quyền hành chính 2 cấp, trực tiếp liên thông về tỉnh."
  },
  {
    id: "congan-qlhc-gialai",
    name: "Phòng Cảnh sát QLHC về TTXH - Công an tỉnh Gia Lai",
    category: "cong_an_vneid",
    address: "Số 267 đường Trần Phú, phường Diên Hồng, TP. Pleiku, tỉnh Gia Lai",
    area: "Phường Diên Hồng, TP. Pleiku",
    zoneType: "tay_nguyen",
    phone: "0269 3869 113",
    workingHours: "Thứ 2 - Thứ 7 (Cấp CCCD & VNeID mức 2)",
    latitude: 13.9856,
    longitude: 108.0125,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Phòng+Cảnh+sát+quản+lý+hành+chính+Công+an+tỉnh+Gia+Lai",
    digitalServices: [
      "Tự động điều chỉnh dữ liệu cư trú trên VNeID theo mô hình 135 xã/phường mới",
      "Cấp căn cước công dân gắn chip & định danh điện tử VNeID mức 2",
      "Điều phối hạ tầng Đề án 06 cho 3,5 triệu dân của tỉnh Gia Lai mới",
      "Xác thực cơ sở dữ liệu quốc gia về dân cư phục vụ liên thông 2 cấp"
    ],
    description: "Cơ quan đầu mối chuẩn hóa dữ liệu dân cư, địa chỉ cư trú trên ứng dụng VNeID theo địa giới hành chính không còn cấp huyện.",
    mergerNotice: "Người dân không cần làm thủ tục đổi giấy tờ; dữ liệu trên VNeID được cơ quan công an tự động cập nhật miễn phí."
  },
  {
    id: "stttt-gialai",
    name: "Sở Khoa học và Công nghệ tỉnh Gia Lai (Cơ quan chủ trì Chuyển đổi số)",
    category: "so_nganh",
    address: "Số 17 đường Trần Hưng Đạo, phường Tây Sơn, TP. Pleiku, tỉnh Gia Lai",
    area: "Phường Tây Sơn, TP. Pleiku",
    zoneType: "tay_nguyen",
    phone: "0269 3824 456",
    workingHours: "Giờ hành chính",
    latitude: 13.9822,
    longitude: 108.0089,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Sở+Thông+tin+và+Truyền+thông+tỉnh+Gia+Lai",
    digitalServices: [
      "Cơ quan thường trực Ban Chỉ đạo Chuyển đổi số tỉnh Gia Lai",
      "Vận hành Cổng Dịch vụ công và Hệ thống thông tin Một cửa điện tử cho 135 xã/phường",
      "Điều phối mạng lưới Tổ Công nghệ số cộng đồng tại 135 xã/phường mới",
      "Giám sát an toàn thông tin mạng CSIRT toàn tỉnh"
    ],
    description: "Đơn vị điều phối hạ tầng số, phần mềm Một cửa điện tử kết nối trực tiếp cấp tỉnh tới 135 xã, phường theo mô hình 2 cấp.",
    mergerNotice: "Bảo đảm hạ tầng số xuyên suốt không gián đoạn khi vận hành mô hình bỏ cấp huyện."
  },
  {
    id: "buudien-tinh-gialai",
    name: "Bưu điện tỉnh Gia Lai - Điểm Tiếp nhận Dịch vụ công BCCI",
    category: "chuyen_doi_so",
    address: "Số 71 đường Hùng Vương, phường Tây Sơn, TP. Pleiku, tỉnh Gia Lai",
    area: "Phường Tây Sơn, TP. Pleiku",
    zoneType: "tay_nguyen",
    phone: "0269 3824 100",
    workingHours: "07h00 - 18h00 hàng ngày (kể cả Thứ 7, Chủ nhật)",
    latitude: 13.9809,
    longitude: 108.0053,
    googleMapsUrl: "https://www.google.com/maps/search/?api=1&query=Bưu+điện+tỉnh+Gia+Lai",
    digitalServices: [
      "Tiếp nhận hồ sơ & chuyển phát kết quả TTHC BCCI tới tận nhà tại 135 xã/phường",
      "Hỗ trợ số hóa hồ sơ cho người cao tuổi, đồng bào DTTS",
      "Mạng lưới bưu cục đóng vai trò cánh tay nối dài của Trung tâm Hành chính công"
    ],
    description: "Mạng lưới bưu chính công ích phủ khắp 135 xã/phường, hỗ trợ công dân nộp và nhận kết quả TTHC không phải đi lại xa.",
    mergerNotice: "Kết nối luồng chuyển phát giấy tờ thông suốt giữa khu vực Tây Nguyên và Duyên hải của tỉnh mới."
  }
];
