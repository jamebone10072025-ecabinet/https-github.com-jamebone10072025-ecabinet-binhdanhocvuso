import { Topic } from "../types";
import { TOPICS_1_TO_5 } from "./topics/topics1to5";
import { TOPICS_6_TO_10 } from "./topics/topics6to10";
import { TOPICS_11_TO_15 } from "./topics/topics11to15";
import { TOPICS_16_TO_20 } from "./topics/topics16to20";
import { TOPICS_21_TO_26 } from "./topics/topics21to26";

export const TOPICS_DATA: Topic[] = [
  ...TOPICS_1_TO_5,
  ...TOPICS_6_TO_10,
  ...TOPICS_11_TO_15,
  ...TOPICS_16_TO_20,
  ...TOPICS_21_TO_26
];

// Complete list of 26 topics for the master index
export const FULL_TOPIC_LIST = [
  { id: 1, title: "Kiến thức, kỹ năng cơ bản về chuyển đổi số", lessons: 8, pages: "18-50", category: "Nhận thức & Nền tảng" },
  { id: 2, title: "Kiến thức công nghệ số cơ bản", lessons: 2, pages: "51-59", category: "Nhận thức & Nền tảng" },
  { id: 3, title: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)", lessons: 9, pages: "60-97", category: "Trí tuệ nhân tạo (AI)" },
  { id: 4, title: "Sử dụng thiết bị số", lessons: 5, pages: "98-118", category: "Thiết bị & Văn phòng" },
  { id: 5, title: "Các phần mềm, ứng dụng phổ biến", lessons: 5, pages: "119-139", category: "Thiết bị & Văn phòng" },
  { id: 6, title: "Tìm kiếm, duyệt và lọc dữ liệu, thông tin số", lessons: 3, pages: "140-151", category: "Thông tin & Dữ liệu" },
  { id: 7, title: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số", lessons: 5, pages: "152-170", category: "Thông tin & Dữ liệu" },
  { id: 8, title: "Quản lý, tổ chức và lưu trữ dữ liệu số", lessons: 6, pages: "171-195", category: "Thông tin & Dữ liệu" },
  { id: 9, title: "Tương tác thông qua các công nghệ số", lessons: 6, pages: "196-220", category: "Tương tác & Hợp tác số" },
  { id: 10, title: "Chia sẻ thông tin và nội dung số", lessons: 5, pages: "221-240", category: "Tương tác & Hợp tác số" },
  { id: 11, title: "Tham gia công dân thông qua công nghệ số", lessons: 5, pages: "241-261", category: "Quyền & Trách nhiệm số" },
  { id: 12, title: "Hợp tác thông qua sử dụng công nghệ số", lessons: 5, pages: "262-282", category: "Tương tác & Hợp tác số" },
  { id: 13, title: "Chuẩn mực ứng xử và văn hóa trên không gian mạng (Netiquette)", lessons: 5, pages: "283-302", category: "Tương tác & Hợp tác số" },
  { id: 14, title: "Quản lý danh tính số", lessons: 6, pages: "303-327", category: "Quyền & Trách nhiệm số" },
  { id: 15, title: "Sáng tạo và phát triển nội dung số", lessons: 5, pages: "328-348", category: "Sáng tạo nội dung & Bản quyền" },
  { id: 16, title: "Tích hợp và tái tạo nội dung số", lessons: 5, pages: "349-369", category: "Sáng tạo nội dung & Bản quyền" },
  { id: 17, title: "Bản quyền và sở hữu trí tuệ số", lessons: 5, pages: "370-390", category: "Sáng tạo nội dung & Bản quyền" },
  { id: 18, title: "Lập trình cơ bản và tự động hóa công việc", lessons: 5, pages: "391-411", category: "Lập trình & Đổi mới" },
  { id: 19, title: "Bảo vệ thiết bị số", lessons: 6, pages: "412-436", category: "An toàn thông tin & Bảo mật" },
  { id: 20, title: "Bảo vệ dữ liệu cá nhân và quyền riêng tư", lessons: 5, pages: "437-460", category: "An toàn thông tin & Bảo mật" },
  { id: 21, title: "Bảo vệ sức khỏe thể chất và tinh thần trong môi trường số", lessons: 5, pages: "461-480", category: "Sức khỏe & Môi trường số" },
  { id: 22, title: "Bảo vệ môi trường trong chuyển đổi số xanh", lessons: 5, pages: "481-505", category: "Sức khỏe & Môi trường số" },
  { id: 23, title: "Giải quyết các vấn đề và sự cố kỹ thuật", lessons: 5, pages: "506-525", category: "Hỗ trợ & Ứng cứu kỹ thuật" },
  { id: 24, title: "Xác định nhu cầu và lựa chọn giải pháp công nghệ", lessons: 5, pages: "526-545", category: "Lập trình & Đổi mới" },
  { id: 25, title: "Sử dụng sáng tạo công nghệ số trong công việc", lessons: 5, pages: "546-565", category: "Lập trình & Đổi mới" },
  { id: 26, title: "Xác định khoảng cách và phát triển năng lực số", lessons: 5, pages: "566-588", category: "Học tập & Phát triển số" }
];
