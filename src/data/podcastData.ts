export interface PodcastEpisode {
  id: number;
  topicId: number;
  title: string;
  category: string;
  duration: string;
  summary: string;
  script: string;
}

export const PODCAST_EPISODES: PodcastEpisode[] = [
  {
    id: 1,
    topicId: 1,
    title: "Chuyên đề 1: Nhận thức & Nền tảng Chuyển đổi số Quốc gia",
    category: "Nhận thức & Nền tảng",
    duration: "02:45",
    summary: "Hiểu đúng bản chất chuyển đổi số: Thay đổi cách nghĩ, cách làm và văn hóa công vụ, lấy người dân làm trung tâm.",
    script: `Kính chào Quý Anh Chị cán bộ, công chức, viên chức! Chào mừng quý vị đến với Kênh học tập số của Chương trình Bình dân học vụ số tỉnh Gia Lai.

Hôm nay, chúng ta cùng lắng nghe bản tin tóm tắt Micro-learning 2 phút về Chuyên đề số 1: Kiến thức, kỹ năng cơ bản về Chuyển đổi số.

Thưa quý anh chị, chuyển đổi số không đơn thuần là việc mua sắm máy tính hay số hóa các tập tài liệu giấy. Cốt lõi của chuyển đổi số nằm ở sự thay đổi phương thức làm việc, văn hóa lãnh đạo và tinh thần phục vụ nhân dân trên môi trường số.

Để thực hiện tốt chuyên đề này trong công tác hàng ngày, xin mời quý vị ghi nhớ 3 nguyên tắc hành động vàng:

Thứ nhất: Lấy người dân và doanh nghiệp làm trung tâm. Mọi quy trình số phải được thiết kế tinh gọn, dễ sử dụng, giúp giảm tối đa thời gian đi lại và thủ tục giấy tờ.

Thứ hai: Quyết định dựa trên dữ liệu. Mỗi cán bộ cần hình thành thói quen theo dõi, đối chiếu số liệu báo cáo thời gian thực từ cơ sở dữ liệu quốc gia và hệ thống Một cửa điện tử.

Thứ ba: Học tập số suốt đời. Không ngại công nghệ mới, chủ động cập nhật các kỹ năng số để thích ứng với môi trường chính quyền số 2 cấp hiện đại của tỉnh Gia Lai.

Xin hãy luôn ghi nhớ: Chuyển đổi số trước hết là chuyển đổi nhận thức. Mỗi cán bộ công chức là một đại sứ số tại cơ sở.

Chúc quý anh chị có một ngày làm việc hiệu quả và tràn đầy năng lượng số!`
  },
  {
    id: 3,
    topicId: 3,
    title: "Chuyên đề 3: Kỹ năng ứng dụng Trí tuệ Nhân tạo (AI) có trách nhiệm",
    category: "Trí tuệ nhân tạo (AI)",
    duration: "02:50",
    summary: "Nguyên tắc vàng AI làm nhanh, con người làm chuẩn và kỷ luật an toàn dữ liệu công vụ.",
    script: `Kính chào Quý Anh Chị cán bộ, công chức, viên chức! Đây là bản tin Micro-learning thuộc Chương trình Bình dân học vụ số tỉnh Gia Lai.

Chuyên đề số 3 hôm nay sẽ đồng hành cùng quý vị về một chủ đề đặc biệt quan trọng: Ứng dụng Trí tuệ Nhân tạo (AI) trong thực thi công vụ.

Sự bùng nổ của các mô hình AI tạo sinh mang đến cơ hội to lớn để cán bộ soạn thảo báo cáo, tổng hợp số liệu và phân tích văn bản nhanh hơn gấp nhiều lần. Tuy nhiên, quyền lực công nghệ luôn đi đôi với trách nhiệm pháp lý.

Xin lưu ý 3 nguyên tắc vàng khi cán bộ công chức sử dụng AI:

Thứ nhất: Nguyên tắc 'AI làm nhanh, con người làm chuẩn'. AI chỉ là công cụ tạo bản nháp ban đầu. Cán bộ công chức chịu trách nhiệm pháp lý 100% trước thủ trưởng cơ quan và pháp luật về tính chính xác của nội dung ban hành.

Thứ hai: Nguyên tắc 'Dữ liệu nào, công cụ đó'. Tuyệt đối KHÔNG dán thông tin bí mật nhà nước, tài liệu nội bộ chưa công bố hoặc dữ liệu cá nhân của công dân lên các công cụ AI công cộng trên Internet. Hãy ẩn danh hoặc gỡ bỏ thông tin nhạy cảm trước khi xử lý.

Thứ ba: Tuân thủ Luật Trí tuệ nhân tạo số 134 năm 2025. Sử dụng AI minh bạch, khách quan, không phân biệt đối xử và không ỷ lại vào máy tính.

Khẩu hiệu hành động của chúng ta: AI là trợ thủ đắc lực, con người là người thẩm định bản lĩnh.

Chúc quý đồng nghiệp khai phóng sức mạnh AI an toàn và chuẩn mực!`
  },
  {
    id: 8,
    topicId: 8,
    title: "Chuyên đề 8: Quản lý, Tổ chức và Lưu trữ Dữ liệu số (Nguyên tắc 3-2-1)",
    category: "Thông tin & Dữ liệu",
    duration: "02:30",
    summary: "Quy tắc sao lưu 3-2-1 phòng ngừa mất mát dữ liệu do ransomware và thảm họa thiết bị.",
    script: `Kính chào Quý Anh Chị! Đây là bản tin âm thanh Micro-learning Chuyên đề số 8: Quản lý, tổ chức và lưu trữ dữ liệu số an toàn.

Thưa quý vị, dữ liệu là tài sản vô giá của cơ quan nhà nước. Một sơ suất nhỏ làm mất dữ liệu quản lý hồ sơ hay thống kê có thể gây đình trệ công việc của cả tập thể.

Để bảo vệ an toàn tuyệt đối cho tài liệu công vụ, xin gửi tới quý vị quy tắc sao lưu 3-2-1 kinh điển trong an toàn thông tin:

Số 3: Luôn lưu giữ ít nhất 3 bản sao của dữ liệu quan trọng, bao gồm 1 bản gốc đang làm việc và 2 bản sao lưu dự phòng.

Số 2: Lưu trữ các bản sao trên ít nhất 2 phương tiện vật lý khác nhau, ví dụ trên ổ cứng máy tính cơ quan và ổ cứng ngoài chuyên dụng hoặc máy chủ lưu trữ nội bộ.

Số 1: Luôn có ít nhất 1 bản sao được đặt ở nơi tách biệt, ví dụ đám mây lưu trữ dùng chung của tỉnh đã được cấp chứng nhận an toàn, phòng khi xảy ra sự cố chập điện hoặc hỏa hoạn tại phòng làm việc.

Đồng thời, quý vị hãy đặt tên tệp tin khoa học theo quy tắc: Năm Tháng Ngày gạch dưới Tên cơ quan gạch dưới Tên văn bản.

Bảo vệ dữ liệu là bảo vệ công sức lao động của chính mình. Chúc quý anh chị luôn an tâm trên không gian số!`
  },
  {
    id: 13,
    topicId: 13,
    title: "Chuyên đề 13: Chuẩn mực Ứng xử và Văn hóa Không gian Mạng",
    category: "Tương tác & Hợp tác số",
    duration: "02:35",
    summary: "Chiếc áo công vụ không cởi ra khi về nhà - Giữ gìn chuẩn mực phát ngôn theo Quyết định 874/QĐ-BTTTT.",
    script: `Kính chào Quý Anh Chị! Bản tin học vụ số hôm nay gửi tới quý vị Chuyên đề 13: Chuẩn mực ứng xử và văn hóa trên không gian mạng.

Trong thời đại số, mỗi cán bộ, công chức, viên chức vừa là công dân số, vừa mang trên mình hình ảnh của cơ quan nhà nước. Có một thông điệp sâu sắc cần ghi nhớ: 'Chiếc áo công vụ không bao giờ cởi ra khi chúng ta về nhà'.

Để ứng xử văn minh và an toàn trên mạng xã hội, chúng ta cùng thực hiện 3 điều sau:

Một là: Tuân thủ Bộ Quy tắc ứng xử trên mạng xã hội ban hành kèm Quyết định số 874 của Bộ Thông tin và Truyền thông. Chia sẻ thông tin tích cực, lan tỏa những tấm gương tốt, câu chuyện đẹp về chính quyền phục vụ.

Hai là: Tuyệt đối không đăng tải, chia sẻ thông tin chưa được kiểm chứng, tin đồn thất thiệt hoặc các tài liệu nội bộ của cơ quan lên Facebook, Zalo, TikTok cá nhân.

Ba là: Khi tham gia tranh luận trên mạng, luôn giữ văn phong lịch thiệp, tôn trọng, không phát ngôn xúc phạm hay gây chia rẽ.

Khẩu hiệu hành động: Mỗi cán bộ là một tấm gương chuẩn mực số; văn hóa ứng xử trên mạng là thước đo uy tín công vụ.

Cảm ơn quý anh chị đã lắng nghe!`
  },
  {
    id: 17,
    topicId: 17,
    title: "Chuyên đề 17: Bản quyền và Thể thức Văn bản Hành chính NĐ 30/2020",
    category: "Sáng tạo nội dung & Bản quyền",
    duration: "02:40",
    summary: "Chuẩn hóa thể thức văn bản hành chính điện tử theo Nghị định 30/2020/NĐ-CP và bảo hộ quyền sở hữu trí tuệ.",
    script: `Chào mừng Quý Anh Chị đến với bản tin Micro-learning Chuyên đề 17: Bản quyền, sở hữu trí tuệ và chuẩn hóa thể thức văn bản hành chính.

Thưa quý đồng nghiệp, một văn bản hành chính được ban hành đúng thể thức không chỉ thể hiện tính tôn nghiêm của pháp luật mà còn phản ánh sự chuyên nghiệp của cơ quan công quyền.

Khi soạn thảo văn bản, xin quý anh chị luôn rà soát kỹ các yếu tố cốt lõi theo Nghị định 30 năm 2020 của Chính phủ:

Thứ nhất: Thể thức tiêu chuẩn. Phông chữ bắt buộc là Times New Roman, cỡ chữ chuẩn cho nội dung từ 13 đến 14. Tiêu ngữ 'Độc lập - Tự do - Hạnh phúc' phải được viết in hoa chữ cái đầu và có gạch ngang nối liền các từ, phía dưới có đường kẻ ngang bằng độ dài của dòng chữ.

Thứ hai: Số và ký hiệu văn bản. Ghi đúng định dạng số thứ tự gạch chéo tên loại văn bản viết tắt gạch ngang tên cơ quan ban hành. Đặc biệt tại tỉnh Gia Lai, mô hình 2 cấp chuyển giao các văn bản cấp xã về trực thuộc tỉnh.

Thứ ba: Chữ ký số và con dấu điện tử. Thực hiện đúng quy định về ký số cá nhân và ký số cơ quan theo định dạng PDF chuẩn, không làm sai lệch vị trí con dấu.

Văn bản chuẩn mực - Kỷ cương hành chính vững vàng. Hãy kiểm tra kỹ thể thức trước khi trình ký!`
  },
  {
    id: 20,
    topicId: 20,
    title: "Chuyên đề 20: Bảo vệ Dữ liệu Cá nhân theo Luật 91/2025/QH15",
    category: "An toàn thông tin & Bảo mật",
    duration: "02:45",
    summary: "Hiệu lực từ 01/01/2026: Trách nhiệm tuyệt đối trong bảo mật CCCD, số điện thoại và hồ sơ công dân.",
    script: `Kính chào Quý Anh Chị! Bản tin âm thanh hôm nay nhấn mạnh Chuyên đề số 20: Bảo vệ dữ liệu cá nhân và quyền riêng tư theo Luật Bảo vệ dữ liệu cá nhân số 91 năm 2025 của Quốc hội, có hiệu lực từ ngày 01 tháng 01 năm 2026.

Trong quá trình tiếp nhận và giải quyết thủ tục hành chính, cán bộ tiếp xúc với rất nhiều thông tin nhạy cảm của người dân: Số định danh cá nhân, hình ảnh sinh trắc học, tình trạng sức khỏe, địa chỉ nơi ở.

Xin lưu ý 3 nguyên tắc bắt buộc:

Một là: Chỉ thu thập dữ liệu cá nhân trong phạm vi tối thiểu cần thiết để giải quyết thủ tục theo quy định pháp luật. Không tự ý đòi hỏi thêm giấy tờ thừa.

Hai là: Tuyệt đối không chụp ảnh căn cước công dân hoặc hồ sơ của người dân để lưu vào điện thoại cá nhân hay gửi qua nhóm mạng xã hội công cộng không bảo mật.

Ba là: Tuân thủ nghĩa vụ thông báo và xóa dữ liệu khi hết thời hạn lưu trữ quy định. Mọi hành vi làm lộ lọt dữ liệu cá nhân đều bị xử lý nghiêm minh theo pháp luật.

Bảo vệ dữ liệu của dân là bảo vệ niềm tin của dân vào chính quyền số. Xin trân trọng cảm ơn quý vị!`
  }
];

export function getFallbackPodcastScript(topicId?: number, topicTitle?: string): string {
  const matched = PODCAST_EPISODES.find((ep) => ep.topicId === topicId);
  if (matched) {
    return matched.script;
  }
  return `Kính chào Quý Anh Chị cán bộ, công chức, viên chức! Chào mừng quý vị đến với Kênh học tập số của Chương trình Bình dân học vụ số tỉnh Gia Lai.

Hôm nay chúng ta cùng theo dõi bản tin âm thanh Micro-learning 2 phút về: ${topicTitle || "Kỹ năng số cơ bản khối cơ quan nhà nước"}.

Trong kỷ nguyên chính quyền số hiện đại, việc thành thạo kỹ năng số không chỉ giúp giảm bớt áp lực công việc hàng ngày mà còn nâng cao chất lượng phục vụ công dân.

Xin gửi tới quý vị 3 nguyên tắc cốt lõi:
1. Đặt an toàn thông tin và tính bảo mật của tài liệu công vụ lên hàng đầu.
2. Ứng dụng các công cụ số một cách chủ động, sáng tạo và có trách nhiệm.
3. Không ngừng học hỏi, rèn luyện để trở thành nhân tố tích cực trong phong trào Bình dân học vụ số tại đơn vị.

Khẩu hiệu hành động: Bình dân học vụ số - Năng lực mới, tương lai mới!

Chúc quý anh chị một ngày làm việc tràn đầy năng lượng và hiệu quả cao!`;
}
