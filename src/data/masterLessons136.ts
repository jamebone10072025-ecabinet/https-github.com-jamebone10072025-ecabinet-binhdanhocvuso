import { MasterLessonItem, ProgramLevelVideo } from "../types";

export const PROGRAM_LEVEL_VIDEOS: ProgramLevelVideo[] = [
  {
    id: 1,
    title: "Video tọa đàm (Podcast) giới thiệu tổng quan phong trào 'Bình dân học vụ số'",
    type: "Podcast tọa đàm",
    durationEstimate: "25 phút",
    description: "Đàm luận chính sách về tinh thần diệt 'giặc dốt số', ý nghĩa lịch sử của phong trào Bình dân học vụ năm 1945 và yêu cầu cấp thiết về phổ cập năng lực số trong kỷ nguyên mới.",
    target: "Toàn thể cán bộ, công chức, viên chức, người lao động và Nhân dân"
  },
  {
    id: 2,
    title: "Video giới thiệu khung kiến thức, kỹ năng số và khung chương trình 26 chuyên đề - 136 bài học",
    type: "Phim đồ họa & giới thiệu khung",
    durationEstimate: "15 phút",
    description: "Tổng quan cấu trúc sư phạm vi mô (Micro-learning) gồm 26 chuyên đề và 136 bài giảng, bản đồ năng lực số và ma trận kỹ năng đáp ứng Nghị quyết 398/NQ-UBTVQH16.",
    target: "Lãnh đạo cơ quan, đơn vị, giảng viên, cán bộ phụ trách chuyển đổi số"
  },
  {
    id: 3,
    title: "Video giới thiệu chương trình học: nội dung chương trình đào tạo, cách thức tham gia học tập và chuẩn đầu ra",
    type: "Hướng dẫn thực hành số",
    durationEstimate: "12 phút",
    description: "Hướng dẫn lộ trình tự học, phương pháp tiếp cận học liệu đa phương tiện (Video, Infographic, Banner, Ebook), làm bài trắc nghiệm và quy trình sát hạch cấp chứng nhận điện tử.",
    target: "Người học trực tiếp tại các cơ quan, đơn vị, địa phương"
  }
];

export const MASTER_LESSONS_136: (MasterLessonItem & { topicTitle: string; category: string })[] = [
  // Chuyên đề 1
  { orderIndex: 1, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 1, title: "Tổng quan về chuyển đổi số và Cách mạng CN 4.0", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 2, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 2, title: "Các công nghệ số cốt lõi và xu hướng phát triển", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 3, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 3, title: "Chính phủ số, kinh tế số, xã hội số và công dân số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 4, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 4, title: "Chuyển đổi số trong hoạt động của Quốc hội và cơ quan dân cử", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 5, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 5, title: "Khung kiến thức, kỹ năng số chuẩn cho cán bộ, công chức", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 6, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 6, title: "Xây dựng văn hóa số và môi trường làm việc số trong CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 7, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 7, title: "Vai trò và kỹ năng của lãnh đạo, quản lý trong CĐS", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 8, topicId: 1, topicTitle: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", category: "Nhận thức & Nền tảng", lessonNumber: 8, title: "Đổi mới sáng tạo và thích ứng linh hoạt trong kỷ nguyên số", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 2
  { orderIndex: 9, topicId: 2, topicTitle: "Kiến thức công nghệ số cơ bản", category: "Nhận thức & Nền tảng", lessonNumber: 1, title: "Khái niệm công nghệ số, kiến trúc hệ thống và hạ tầng số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 10, topicId: 2, topicTitle: "Kiến thức công nghệ số cơ bản", category: "Nhận thức & Nền tảng", lessonNumber: 2, title: "Các công nghệ số chủ chốt định hình tương lai công vụ", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 3
  { orderIndex: 11, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 1, title: "Tổng quan về Trí tuệ nhân tạo (AI) và ứng dụng khu vực công", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 12, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 2, title: "Học máy (Machine Learning), Học sâu và AI tạo sinh (GenAI)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 13, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 3, title: "Quy trình ứng dụng AI hiệu quả và an toàn trong công việc", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 14, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 4, title: "Kỹ thuật đặt câu lệnh (Prompt) và sử dụng trợ lý ảo AI", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 15, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 5, title: "Ứng dụng AI trong soạn thảo, tóm tắt và xử lý văn bản", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 16, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 6, title: "Ứng dụng AI trong phân tích dữ liệu, tổng hợp báo cáo", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 17, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 7, title: "Ứng dụng AI trong tự động hóa quy trình nghiệp vụ hành chính", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 18, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 8, title: "Đạo đức AI, tính minh bạch và tuân thủ Luật Trí tuệ nhân tạo", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 19, topicId: 3, topicTitle: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", category: "Trí tuệ nhân tạo (AI)", lessonNumber: 9, title: "Xu hướng phát triển của AI và chuẩn bị thích ứng của cán bộ", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 4
  { orderIndex: 20, topicId: 4, topicTitle: "Sử dụng thiết bị số", category: "Thiết bị & Văn phòng", lessonNumber: 1, title: "Sử dụng máy tính và các thiết bị ngoại vi an toàn, hiệu quả", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 21, topicId: 4, topicTitle: "Sử dụng thiết bị số", category: "Thiết bị & Văn phòng", lessonNumber: 2, title: "Sử dụng thiết bị di động thông minh trong xử lý công vụ", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 22, topicId: 4, topicTitle: "Sử dụng thiết bị số", category: "Thiết bị & Văn phòng", lessonNumber: 3, title: "Cài đặt, cập nhật và quản lý phần mềm trên thiết bị số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 23, topicId: 4, topicTitle: "Sử dụng thiết bị số", category: "Thiết bị & Văn phòng", lessonNumber: 4, title: "Thiết lập kết nối mạng (LAN, Wi-Fi) và chia sẻ dữ liệu an toàn", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 24, topicId: 4, topicTitle: "Sử dụng thiết bị số", category: "Thiết bị & Văn phòng", lessonNumber: 5, title: "Vệ sinh, bảo trì định kỳ và xử lý sự cố thiết bị số cơ bản", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 5
  { orderIndex: 25, topicId: 5, topicTitle: "Các phần mềm, ứng dụng phổ biến", category: "Thiết bị & Văn phòng", lessonNumber: 1, title: "Soạn thảo văn bản hành chính chuẩn thể thức bằng phần mềm", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 26, topicId: 5, topicTitle: "Các phần mềm, ứng dụng phổ biến", category: "Thiết bị & Văn phòng", lessonNumber: 2, title: "Quản lý số liệu, tính toán và trực quan hóa dữ liệu bảng tính", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 27, topicId: 5, topicTitle: "Các phần mềm, ứng dụng phổ biến", category: "Thiết bị & Văn phòng", lessonNumber: 3, title: "Thiết kế bài trình chiếu và báo cáo đa phương tiện chuyên nghiệp", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 28, topicId: 5, topicTitle: "Các phần mềm, ứng dụng phổ biến", category: "Thiết bị & Văn phòng", lessonNumber: 4, title: "Sử dụng các nền tảng số làm việc cộng tác và quản lý công việc", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 29, topicId: 5, topicTitle: "Các phần mềm, ứng dụng phổ biến", category: "Thiết bị & Văn phòng", lessonNumber: 5, title: "Khai thác các hệ thống thông tin, CSDL quốc gia chuyên ngành", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 6
  { orderIndex: 30, topicId: 6, topicTitle: "Tìm kiếm, duyệt và lọc dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 1, title: "Kỹ năng tìm kiếm thông tin chuyên sâu và cú pháp nâng cao", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 31, topicId: 6, topicTitle: "Tìm kiếm, duyệt và lọc dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 2, title: "Kỹ năng sàng lọc, phân loại và đánh giá độ phù hợp dữ liệu", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 32, topicId: 6, topicTitle: "Tìm kiếm, duyệt và lọc dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 3, title: "Quản lý lịch sử duyệt web, dấu trang và lưu trữ khoa học", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 7
  { orderIndex: 33, topicId: 7, topicTitle: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 1, title: "Nhận diện tin giả, thông tin sai lệch trên không gian mạng", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 34, topicId: 7, topicTitle: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 2, title: "Phương pháp và công cụ kiểm chứng hình ảnh, video (Deepfake)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 35, topicId: 7, topicTitle: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 3, title: "Xác thực nguồn gốc, độ tin cậy và tính toàn vẹn dữ liệu số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 36, topicId: 7, topicTitle: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 4, title: "Nhận diện các hình thức lừa đảo trực tuyến và phi kỹ thuật", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 37, topicId: 7, topicTitle: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", category: "Thông tin & Dữ liệu", lessonNumber: 5, title: "Trách nhiệm của cán bộ trong thẩm tra, xử lý và chia sẻ tin", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 8
  { orderIndex: 38, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 1, title: "Tổng quan dữ liệu số và vòng đời dữ liệu trong CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 39, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 2, title: "Thu thập, phân loại, làm sạch và chuẩn hóa dữ liệu số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 40, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 3, title: "Tổ chức cây thư mục, đặt tên tệp chuẩn và lưu trữ khoa học", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 41, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 4, title: "Sao lưu dữ liệu dự phòng định kỳ (Backup) và phục hồi sự cố", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 42, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 5, title: "Khai thác, phân tích và chia sẻ dữ liệu mở khu vực công", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 43, topicId: 8, topicTitle: "Quản lý, tổ chức và lưu trữ dữ liệu số", category: "Thông tin & Dữ liệu", lessonNumber: 6, title: "Lưu trữ điện tử lâu dài và quy trình hủy dữ liệu an toàn", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 9
  { orderIndex: 44, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 1, title: "Sử dụng thư điện tử công vụ chuyên nghiệp, đúng quy chế", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 45, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 2, title: "Sử dụng ứng dụng nhắn tin tức thời trao đổi công vụ văn minh", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 46, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 3, title: "Kỹ năng tổ chức, điều hành và dự cuộc họp trực tuyến", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 47, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 4, title: "Tương tác trên Cổng thông tin và kênh mạng xã hội cơ quan", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 48, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 5, title: "Tiếp nhận, phản hồi ý kiến phục vụ người dân, doanh nghiệp", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 49, topicId: 9, topicTitle: "Tương tác thông qua các công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 6, title: "Xây dựng văn hóa tương tác số chuẩn mực và giữ gìn uy tín", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 10
  { orderIndex: 50, topicId: 10, topicTitle: "Chia sẻ thông tin và nội dung số", category: "Tương tác & Hợp tác số", lessonNumber: 1, title: "Khái niệm, vai trò và nguyên tắc chia sẻ thông tin môi trường số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 51, topicId: 10, topicTitle: "Chia sẻ thông tin và nội dung số", category: "Tương tác & Hợp tác số", lessonNumber: 2, title: "Các phương thức và nền tảng chia sẻ dữ liệu trong CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 52, topicId: 10, topicTitle: "Chia sẻ thông tin và nội dung số", category: "Tương tác & Hợp tác số", lessonNumber: 3, title: "Phân quyền truy cập, chia sẻ tài liệu và kiểm soát an toàn", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 53, topicId: 10, topicTitle: "Chia sẻ thông tin và nội dung số", category: "Tương tác & Hợp tác số", lessonNumber: 4, title: "Tuân thủ quy định pháp lý chia sẻ dữ liệu theo Nghị định 47", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 54, topicId: 10, topicTitle: "Chia sẻ thông tin và nội dung số", category: "Tương tác & Hợp tác số", lessonNumber: 5, title: "Xây dựng văn hóa chia sẻ dữ liệu vì lợi ích chung của cơ quan", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 11
  { orderIndex: 55, topicId: 11, topicTitle: "Tham gia công dân thông qua công nghệ số", category: "Quyền & Trách nhiệm số", lessonNumber: 1, title: "Thực thi quyền và nghĩa vụ công dân trên không gian số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 56, topicId: 11, topicTitle: "Tham gia công dân thông qua công nghệ số", category: "Quyền & Trách nhiệm số", lessonNumber: 2, title: "Sử dụng Cổng Dịch vụ công QG và hệ thống giải quyết TTHC", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 57, topicId: 11, topicTitle: "Tham gia công dân thông qua công nghệ số", category: "Quyền & Trách nhiệm số", lessonNumber: 3, title: "Ứng dụng VNeID và định danh điện tử trong quyền công dân số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 58, topicId: 11, topicTitle: "Tham gia công dân thông qua công nghệ số", category: "Quyền & Trách nhiệm số", lessonNumber: 4, title: "Tham gia đóng góp ý kiến chính sách, pháp luật trên mạng", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 59, topicId: 11, topicTitle: "Tham gia công dân thông qua công nghệ số", category: "Quyền & Trách nhiệm số", lessonNumber: 5, title: "Trách nhiệm giám sát xã hội và phản ánh hiện trường số", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 12
  { orderIndex: 60, topicId: 12, topicTitle: "Hợp tác thông qua sử dụng công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 1, title: "Kỹ năng làm việc nhóm trên các nền tảng cộng tác số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 61, topicId: 12, topicTitle: "Hợp tác thông qua sử dụng công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 2, title: "Đồng chỉnh sửa và cộng tác thời gian thực trên tài liệu số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 62, topicId: 12, topicTitle: "Hợp tác thông qua sử dụng công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 3, title: "Quản lý nhiệm vụ, theo dõi tiến độ và giao việc bằng công cụ số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 63, topicId: 12, topicTitle: "Hợp tác thông qua sử dụng công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 4, title: "Phối hợp liên cơ quan trên Trục liên thông văn bản quốc gia", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 64, topicId: 12, topicTitle: "Hợp tác thông qua sử dụng công nghệ số", category: "Tương tác & Hợp tác số", lessonNumber: 5, title: "Xây dựng môi trường hợp tác số tin cậy, đạt hiệu suất cao", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 13
  { orderIndex: 65, topicId: 13, topicTitle: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", category: "Tương tác & Hợp tác số", lessonNumber: 1, title: "Bộ Quy tắc ứng xử trên mạng xã hội và văn hóa công vụ số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 66, topicId: 13, topicTitle: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", category: "Tương tác & Hợp tác số", lessonNumber: 2, title: "Quy tắc giao tiếp số trong CQNN: văn phong và phép lịch sự", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 67, topicId: 13, topicTitle: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", category: "Tương tác & Hợp tác số", lessonNumber: 3, title: "Quản lý cảm xúc và giải quyết mâu thuẫn trên môi trường số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 68, topicId: 13, topicTitle: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", category: "Tương tác & Hợp tác số", lessonNumber: 4, title: "Nhận diện, phòng chống bạo lực mạng và hành vi lệch chuẩn", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 69, topicId: 13, topicTitle: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", category: "Tương tác & Hợp tác số", lessonNumber: 5, title: "Xây dựng hình ảnh người cán bộ, công chức mẫu mực trên mạng", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 14
  { orderIndex: 70, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 1, title: "Khái niệm danh tính số và tầm quan trọng của việc bảo vệ", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 71, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 2, title: "Quản lý tài khoản VNeID và tích hợp giấy tờ số trong công việc", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 72, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 3, title: "Thiết lập mật khẩu mạnh và xác thực đa yếu tố an toàn (MFA)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 73, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 4, title: "Chữ ký số, chứng thư số công vụ và quy trình ký số văn bản", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 74, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 5, title: "Bảo vệ uy tín số của bản thân và uy tín của cơ quan, tổ chức", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 75, topicId: 14, topicTitle: "Quản lý danh tính số", category: "Quyền & Trách nhiệm số", lessonNumber: 6, title: "Quy trình xử lý khi bị giả mạo hoặc lộ lọt danh tính số", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 15
  { orderIndex: 76, topicId: 15, topicTitle: "Sáng tạo và phát triển nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 1, title: "Tổng quan về sáng tạo nội dung số trong thông tin, tuyên truyền", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 77, topicId: 15, topicTitle: "Sáng tạo và phát triển nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 2, title: "Thiết kế ấn phẩm số, Infographic chính sách bằng công cụ đồ họa", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 78, topicId: 15, topicTitle: "Sáng tạo và phát triển nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 3, title: "Biên tập và sản xuất video ngắn, Podcast phổ biến pháp luật", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 79, topicId: 15, topicTitle: "Sáng tạo và phát triển nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 4, title: "Kỹ năng viết bài và biên tập tin tức cho Cổng thông tin điện tử", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 80, topicId: 15, topicTitle: "Sáng tạo và phát triển nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 5, title: "Tối ưu hóa định dạng nội dung số cho đa nền tảng truyền thông", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 16
  { orderIndex: 81, topicId: 16, topicTitle: "Tích hợp và tái tạo nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 1, title: "Nguyên tắc kết hợp, phối trộn và tái cấu trúc nội dung số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 82, topicId: 16, topicTitle: "Tích hợp và tái tạo nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 2, title: "Chuyển đổi định dạng tệp và tích hợp đa phương tiện vào văn bản", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 83, topicId: 16, topicTitle: "Tích hợp và tái tạo nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 3, title: "Khai thác kho dữ liệu mở, hình ảnh và tài nguyên công cộng", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 84, topicId: 16, topicTitle: "Tích hợp và tái tạo nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 4, title: "Trực quan hóa dữ liệu và xây dựng báo cáo động tương tác", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 85, topicId: 16, topicTitle: "Tích hợp và tái tạo nội dung số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 5, title: "Đánh giá hiệu quả tiếp cận nội dung số và cải tiến liên tục", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 17
  { orderIndex: 86, topicId: 17, topicTitle: "Bản quyền và sở hữu trí tuệ số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 1, title: "Pháp luật về quyền tác giả và quyền liên quan trên môi trường số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 87, topicId: 17, topicTitle: "Bản quyền và sở hữu trí tuệ số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 2, title: "Hệ thống giấy phép Creative Commons (CC) và áp dụng trong CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 88, topicId: 17, topicTitle: "Bản quyền và sở hữu trí tuệ số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 3, title: "Trích dẫn hợp lý, dẫn nguồn chuẩn và trường hợp ngoại lệ theo luật", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 89, topicId: 17, topicTitle: "Bản quyền và sở hữu trí tuệ số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 4, title: "Nhận diện hành vi vi phạm bản quyền số và chế tài xử lý pháp lý", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 90, topicId: 17, topicTitle: "Bản quyền và sở hữu trí tuệ số", category: "Sáng tạo nội dung & Bản quyền", lessonNumber: 5, title: "Ý thức tôn trọng SHTT và sử dụng phần mềm có bản quyền", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 18
  { orderIndex: 91, topicId: 18, topicTitle: "Lập trình cơ bản và tự động hóa công việc", category: "Lập trình & Đổi mới", lessonNumber: 1, title: "Tư duy tính toán (Computational Thinking) và logic giải quyết", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 92, topicId: 18, topicTitle: "Lập trình cơ bản và tự động hóa công việc", category: "Lập trình & Đổi mới", lessonNumber: 2, title: "Các khái niệm lập trình căn bản và nguyên lý của mã lệnh", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 93, topicId: 18, topicTitle: "Lập trình cơ bản và tự động hóa công việc", category: "Lập trình & Đổi mới", lessonNumber: 3, title: "Tự động hóa tác vụ văn phòng định kỳ bằng Macro, Scripts", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 94, topicId: 18, topicTitle: "Lập trình cơ bản và tự động hóa công việc", category: "Lập trình & Đổi mới", lessonNumber: 4, title: "Sử dụng nền tảng Low-code / No-code xây dựng quy trình tự động", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 95, topicId: 18, topicTitle: "Lập trình cơ bản và tự động hóa công việc", category: "Lập trình & Đổi mới", lessonNumber: 5, title: "Ứng dụng trợ lý AI hỗ trợ viết mã và gỡ lỗi (AI-assisted coding)", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 19
  { orderIndex: 96, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 1, title: "Nhận diện các mối đe dọa an toàn thông tin với thiết bị", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 97, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 2, title: "Cài đặt, cấu hình phần mềm chống mã độc (Antivirus/EDR)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 98, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 3, title: "Cập nhật bản vá hệ điều hành và sao lưu cấu hình bảo mật", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 99, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 4, title: "An toàn khi kết nối Wi-Fi công cộng, sử dụng VPN và truyền tệp", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 100, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 5, title: "Quản lý quyền ứng dụng và kiểm soát thiết bị ngoại vi (USB)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 101, topicId: 19, topicTitle: "Bảo vệ thiết bị số", category: "An toàn thông tin & Bảo mật", lessonNumber: 6, title: "Quy trình xử lý khẩn cấp khi thiết bị nhiễm độc hoặc mất cắp", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 20
  { orderIndex: 102, topicId: 20, topicTitle: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", category: "An toàn thông tin & Bảo mật", lessonNumber: 1, title: "Quy định của Luật Bảo vệ dữ liệu cá nhân và Nghị định số 13", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 103, topicId: 20, topicTitle: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", category: "An toàn thông tin & Bảo mật", lessonNumber: 2, title: "Phân loại dữ liệu cá nhân và trách nhiệm bảo vệ trong CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 104, topicId: 20, topicTitle: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", category: "An toàn thông tin & Bảo mật", lessonNumber: 3, title: "Biện pháp kỹ thuật và quy trình quản trị bảo vệ bí mật đời tư", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 105, topicId: 20, topicTitle: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", category: "An toàn thông tin & Bảo mật", lessonNumber: 4, title: "Thực hiện quyền của chủ thể dữ liệu (biết, đồng ý, truy cập)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 106, topicId: 20, topicTitle: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", category: "An toàn thông tin & Bảo mật", lessonNumber: 5, title: "Quy trình ứng phó và báo cáo sự cố lộ lọt dữ liệu cá nhân", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 21
  { orderIndex: 107, topicId: 21, topicTitle: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", category: "Sức khỏe & Môi trường số", lessonNumber: 1, title: "Tác động của công nghệ số đến sức khỏe thể chất và giấc ngủ", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 108, topicId: 21, topicTitle: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", category: "Sức khỏe & Môi trường số", lessonNumber: 2, title: "Bố trí không gian làm việc công thái học (Ergonomics) chuẩn", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 109, topicId: 21, topicTitle: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", category: "Sức khỏe & Môi trường số", lessonNumber: 3, title: "Nhận diện hội chứng kiệt sức số (Burnout) và căng thẳng số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 110, topicId: 21, topicTitle: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", category: "Sức khỏe & Môi trường số", lessonNumber: 4, title: "Kỹ năng ngắt kết nối chủ động (Digital Detox) và cân bằng sống", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 111, topicId: 21, topicTitle: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", category: "Sức khỏe & Môi trường số", lessonNumber: 5, title: "Xây dựng thói quen và lối sống số lành mạnh, bền vững", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 22
  { orderIndex: 112, topicId: 22, topicTitle: "Bảo vệ môi trường trong chuyển đổi số xanh", category: "Sức khỏe & Môi trường số", lessonNumber: 1, title: "Khái niệm Chuyển đổi kép và tác động môi trường của công nghệ", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 113, topicId: 22, topicTitle: "Bảo vệ môi trường trong chuyển đổi số xanh", category: "Sức khỏe & Môi trường số", lessonNumber: 2, title: "Đo lường và giảm thiểu dấu chân carbon số (Carbon Footprint)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 114, topicId: 22, topicTitle: "Bảo vệ môi trường trong chuyển đổi số xanh", category: "Sức khỏe & Môi trường số", lessonNumber: 3, title: "Thực hành tiết kiệm năng lượng khi dùng thiết bị và hạ tầng số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 115, topicId: 22, topicTitle: "Bảo vệ môi trường trong chuyển đổi số xanh", category: "Sức khỏe & Môi trường số", lessonNumber: 4, title: "Phân loại, tái chế và xử lý an toàn rác thải điện tử (E-waste)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 116, topicId: 22, topicTitle: "Bảo vệ môi trường trong chuyển đổi số xanh", category: "Sức khỏe & Môi trường số", lessonNumber: 5, title: "Thực hành công sở số không giấy tờ và phát triển bền vững", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 23
  { orderIndex: 117, topicId: 23, topicTitle: "Giải quyết các vấn đề và sự cố kỹ thuật", category: "Hỗ trợ & Ứng cứu kỹ thuật", lessonNumber: 1, title: "Phương pháp tư duy chuẩn đoán, phân loại và cô lập sự cố", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 118, topicId: 23, topicTitle: "Giải quyết các vấn đề và sự cố kỹ thuật", category: "Hỗ trợ & Ứng cứu kỹ thuật", lessonNumber: 2, title: "Xử lý các sự cố mạng nội bộ (LAN), Wi-Fi và kết nối Internet", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 119, topicId: 23, topicTitle: "Giải quyết các vấn đề và sự cố kỹ thuật", category: "Hỗ trợ & Ứng cứu kỹ thuật", lessonNumber: 3, title: "Khắc phục lỗi hệ điều hành, phần mềm và xung đột ứng dụng", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 120, topicId: 23, topicTitle: "Giải quyết các vấn đề và sự cố kỹ thuật", category: "Hỗ trợ & Ứng cứu kỹ thuật", lessonNumber: 4, title: "Xử lý lỗi máy in, máy quét, thiết bị ngoại vi và đường cáp", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 121, topicId: 23, topicTitle: "Giải quyết các vấn đề và sự cố kỹ thuật", category: "Hỗ trợ & Ứng cứu kỹ thuật", lessonNumber: 5, title: "Quy trình báo cáo và phối hợp hiệu quả với hỗ trợ kỹ thuật", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 24
  { orderIndex: 122, topicId: 24, topicTitle: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", category: "Lập trình & Đổi mới", lessonNumber: 1, title: "Khảo sát thực trạng, nhận diện điểm nghẽn và nhu cầu số hóa", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 123, topicId: 24, topicTitle: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", category: "Lập trình & Đổi mới", lessonNumber: 2, title: "Tiêu chí và phương pháp đánh giá lựa chọn giải pháp phù hợp", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 124, topicId: 24, topicTitle: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", category: "Lập trình & Đổi mới", lessonNumber: 3, title: "So sánh giải pháp nguồn mở và thương mại trong khu vực công", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 125, topicId: 24, topicTitle: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", category: "Lập trình & Đổi mới", lessonNumber: 4, title: "Đánh giá chi phí đầu tư, hiệu quả sử dụng và quản trị rủi ro", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 126, topicId: 24, topicTitle: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", category: "Lập trình & Đổi mới", lessonNumber: 5, title: "Lập kế hoạch lộ trình triển khai thử nghiệm và chuyển giao", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 25
  { orderIndex: 127, topicId: 25, topicTitle: "Sử dụng sáng tạo công nghệ số trong công việc", category: "Lập trình & Đổi mới", lessonNumber: 1, title: "Tư duy đổi mới sáng tạo và áp dụng Design Thinking trong công vụ", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 128, topicId: 25, topicTitle: "Sử dụng sáng tạo công nghệ số trong công việc", category: "Lập trình & Đổi mới", lessonNumber: 2, title: "Cải tiến quy trình nghiệp vụ và dịch vụ công bằng công nghệ số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 129, topicId: 25, topicTitle: "Sử dụng sáng tạo công nghệ số trong công việc", category: "Lập trình & Đổi mới", lessonNumber: 3, title: "Khởi xướng, xây dựng và thử nghiệm các sáng kiến số tại CQNN", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 130, topicId: 25, topicTitle: "Sử dụng sáng tạo công nghệ số trong công việc", category: "Lập trình & Đổi mới", lessonNumber: 4, title: "Xây dựng văn hóa khuyến khích đổi mới và học từ thất bại", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 131, topicId: 25, topicTitle: "Sử dụng sáng tạo công nghệ số trong công việc", category: "Lập trình & Đổi mới", lessonNumber: 5, title: "Đánh giá hiệu quả, nhân rộng các mô hình chuyển đổi số thành công", videoCount: 1, infographicCount: 1, bannerCount: 1 },

  // Chuyên đề 26
  { orderIndex: 132, topicId: 26, topicTitle: "Xác định khoảng cách và phát triển năng lực số", category: "Học tập & Phát triển số", lessonNumber: 1, title: "Khung năng lực số quốc gia và chuẩn năng lực công chức số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 133, topicId: 26, topicTitle: "Xác định khoảng cách và phát triển năng lực số", category: "Học tập & Phát triển số", lessonNumber: 2, title: "Phương pháp tự đánh giá và xác định khoảng cách năng lực số", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 134, topicId: 26, topicTitle: "Xác định khoảng cách và phát triển năng lực số", category: "Học tập & Phát triển số", lessonNumber: 3, title: "Xây dựng kế hoạch phát triển năng lực số cá nhân (IDP số)", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 135, topicId: 26, topicTitle: "Xác định khoảng cách và phát triển năng lực số", category: "Học tập & Phát triển số", lessonNumber: 4, title: "Các kênh và phương pháp học tập số liên tục, suốt đời", videoCount: 1, infographicCount: 1, bannerCount: 1 },
  { orderIndex: 136, topicId: 26, topicTitle: "Xác định khoảng cách và phát triển năng lực số", category: "Học tập & Phát triển số", lessonNumber: 5, title: "Vai trò lan tỏa, hỗ trợ đồng nghiệp và cộng đồng nâng cao năng lực", videoCount: 1, infographicCount: 1, bannerCount: 1 }
];
