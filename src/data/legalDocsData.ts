export interface LegalDoc {
  id: string;
  code: string;
  title: string;
  issueDate: string;
  effectiveDate?: string;
  authority: string;
  category: "Luật" | "Nghị quyết" | "Nghị định" | "Chỉ thị" | "Quyết định";
  summary: string;
}

export const LEGAL_DOCUMENTS: LegalDoc[] = [
  {
    id: "nq-398-2026",
    code: "Nghị quyết số 398/NQ-UBTVQH16",
    title: "Phê chuẩn Bộ học liệu đa phương tiện (Tập 1) - Bài giảng và câu hỏi trắc nghiệm kiến thức, kỹ năng số cơ bản (Micro-learning) dùng cho cán bộ, công chức, viên chức và người lao động trong khối cơ quan nhà nước",
    issueDate: "08/08/2026",
    authority: "Ủy ban Thường vụ Quốc hội",
    category: "Nghị quyết",
    summary: "Phê chuẩn chính thức và chỉ đạo triển khai thống nhất Bộ học liệu Bình dân học vụ số trên toàn quốc, đồng bộ chứng nhận số trên VNeID và liên thông toàn hệ thống chính trị."
  },
  {
    id: "nq-57-2024",
    code: "Nghị quyết số 57-NQ/TW",
    title: "Về đột phá phát triển khoa học, công nghệ, đổi mới sáng tạo và chuyển đổi số quốc gia",
    issueDate: "22/12/2024",
    authority: "Bộ Chính trị",
    category: "Nghị quyết",
    summary: "Xác định tăng trưởng quốc gia dựa vào KHCN, đổi mới sáng tạo và chuyển đổi số thay vì tài nguyên và lao động giá rẻ. Đặt mục tiêu chuyển dịch toàn diện sang nền kinh tế tri thức."
  },
  {
    id: "ct-14-2026",
    code: "Chỉ thị số 14/CT-TTg",
    title: "Về bồi dưỡng, đánh giá kiến thức, kỹ năng số đối với cán bộ, công chức, viên chức",
    issueDate: "22/04/2026",
    authority: "Thủ tướng Chính phủ",
    category: "Chỉ thị",
    summary: "Đặt mục tiêu đến hết năm 2026, 100% cán bộ, công chức, viên chức có hiểu biết về chuyển đổi số, sử dụng tốt các nền tảng, dịch vụ số phục vụ công việc và tích hợp vào tiêu chí đánh giá cán bộ hằng năm."
  },
  {
    id: "luat-bvdlcn-2025",
    code: "Luật số 91/2025/QH15",
    title: "Luật Bảo vệ dữ liệu cá nhân",
    issueDate: "2025",
    effectiveDate: "01/01/2026",
    authority: "Quốc hội",
    category: "Luật",
    summary: "Phân loại dữ liệu cá nhân cơ bản và nhạy cảm (tài chính, sức khỏe, sinh trắc). Quy định quyền chủ thể dữ liệu (biết, đồng ý, truy cập, xóa). Nghiêm cấm đưa dữ liệu công dân lên AI công cộng."
  },
  {
    id: "luat-ttnt-2025",
    code: "Luật số 134/2025/QH15",
    title: "Luật Trí tuệ nhân tạo (AI)",
    issueDate: "2025",
    effectiveDate: "01/03/2026",
    authority: "Quốc hội",
    category: "Luật",
    summary: "Xác lập nguyên tắc lấy con người làm trung tâm; AI là công cụ phục vụ, không phải tác giả, không thay thế trách nhiệm công vụ. Bắt buộc gắn nhãn/minh bạch nội dung do AI tạo ra; cấm giả mạo deepfake người thật."
  },
  {
    id: "luat-bvbmnn-2025",
    code: "Luật số 117/2025/QH15",
    title: "Luật Bảo vệ bí mật nhà nước (sửa đổi)",
    issueDate: "2025",
    effectiveDate: "01/03/2026",
    authority: "Quốc hội",
    category: "Luật",
    summary: "Quy định 3 cấp độ: Mật - Tối mật - Tuyệt mật. Nghiêm cấm soạn thảo, lưu trữ tài liệu bí mật nhà nước trên thiết bị kết nối Internet (chỉ dùng mạng LAN độc lập và cơ yếu theo luật)."
  },
  {
    id: "luat-anm-2025",
    code: "Luật số 116/2025/QH15",
    title: "Luật An ninh mạng (sửa đổi)",
    issueDate: "2025",
    effectiveDate: "01/07/2026",
    authority: "Quốc hội",
    category: "Luật",
    summary: "Thay thế Luật An ninh mạng 2018. Quy định quy trình ứng cứu sự cố an ninh mạng tầm cơ quan, trách nhiệm của chủ quản hệ thống và nghĩa vụ cung cấp thông tin kịp thời cho cơ quan chức năng."
  },
  {
    id: "qd-757-2025",
    code: "Quyết định số 757/QĐ-BKHCN",
    title: "Ban hành Khung kiến thức, kỹ năng số cơ bản dành cho cán bộ, công chức, viên chức",
    issueDate: "29/04/2025",
    authority: "Bộ Khoa học và Công nghệ",
    category: "Quyết định",
    summary: "Khung chuẩn mực năng lực số 4 cấp độ (Cơ bản, Trung cấp, Nâng cao, Chuyên sâu) làm căn cứ xây dựng chương trình bồi dưỡng và sát hạch trong toàn hệ thống chính trị."
  },
  {
    id: "nd-118-2025",
    code: "Nghị định số 118/2025/NĐ-CP",
    title: "Quy định về Cổng Dịch vụ công Quốc gia",
    issueDate: "2025",
    authority: "Chính phủ",
    category: "Nghị định",
    summary: "Hợp nhất các cổng dịch vụ công cấp tỉnh và cấp bộ về một đầu mối duy nhất tại dichvucong.gov.vn; kết nối định danh điện tử VNeID và triển khai dịch vụ công toàn trình phi địa giới hành chính."
  },
  {
    id: "qd-874-2021",
    code: "Quyết định số 874/QĐ-BTTTT",
    title: "Bộ Quy tắc ứng xử trên mạng xã hội",
    issueDate: "17/06/2021",
    authority: "Bộ Thông tin và Truyền thông",
    category: "Quyết định",
    summary: "4 quy tắc chung: Tôn trọng/tuân thủ pháp luật, Lành mạnh, An toàn/bảo mật, Trách nhiệm. Quy định riêng cho cán bộ công chức về việc minh bạch tên thật, tuân thủ kỷ luật phát ngôn và giữ gìn hình ảnh công vụ."
  }
];
