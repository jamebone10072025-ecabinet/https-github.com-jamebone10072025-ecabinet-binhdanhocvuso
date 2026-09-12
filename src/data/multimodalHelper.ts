export interface SampleDocument {
  id: string;
  title: string;
  description: string;
  taskType: "format_check" | "task_matrix" | "error_diagnosis" | "summary";
  content: string;
}

export const SAMPLE_DOCUMENTS: SampleDocument[] = [
  {
    id: "sample-doc-1",
    title: "Dự thảo Công văn có nhiều lỗi thể thức (NĐ 30/2020)",
    description: "Công văn gửi các phòng ban có lỗi tiêu ngữ, số ký hiệu, căn lề và nơi nhận.",
    taskType: "format_check",
    content: `UBND XÃ BIỂN HỒ
SỐ: 45/CV-UBND
Gia Lai, ngày 12 tháng 9 năm 2026

CÔNG VĂN
Về việc triển khai phong trào Bình dân học vụ số tại địa phương

Kính gửi: Các ban ngành, đoàn thể và thôn trưởng các thôn làng

Thực hiện Nghị quyết số 398/NQ-UBTVQH16 ngày 08/8/2026 của Ủy ban Thường vụ Quốc hội về Chương trình Bình dân học vụ số;
UBND xã yêu cầu các đơn vị trực thuộc thực hiện các nội dung sau:
1. Phổ cập 26 chuyên đề kỹ năng số cho 100% cán bộ, công chức xã trước ngày 30/10/2026.
2. Hướng dẫn người dân cài đặt và sử dụng thành thạo VNeID mức độ 2.

Nơi nhận:
- Như trên;
- Lưu: VT.
CHỦ TỊCH
(Đã ký)
Nguyễn Văn A`
  },
  {
    id: "sample-doc-2",
    title: "Quyết định phân công nhiệm vụ Chuyển đổi số năm 2026",
    description: "Quyết định giao chỉ tiêu và thời hạn xử lý hồ sơ hành chính trực tuyến.",
    taskType: "task_matrix",
    content: `ỦY BAN NHÂN DÂN TỈNH GIA LAI
Số: 125/QĐ-UBND
Gia Lai, ngày 05 tháng 9 năm 2026

QUYẾT ĐỊNH
Về việc giao chỉ tiêu số hóa hồ sơ và cung cấp dịch vụ công trực tuyến toàn trình năm 2026

ỦY BAN NHÂN DÂN TỈNH GIA LAI
Căn cứ Luật Tổ chức chính quyền địa phương;
Căn cứ Nghị định số 118/2025/NĐ-CP của Chính phủ về thực hiện thủ tục hành chính trên môi trường điện tử;

QUYẾT ĐỊNH:
Điều 1. Giao chỉ tiêu cho các Sở, ban, ngành và UBND 135 xã, phường:
1. Sở Thông tin và Truyền thông: Chủ trì hoàn thiện kết nối CSDL dân cư và Cổng DVCQG trước ngày 20/10/2026. Báo cáo tiến độ trước 17h00 thứ Sáu hàng tuần.
2. Văn phòng UBND tỉnh: Chủ trì kiểm tra việc tiếp nhận Một cửa tại 135 xã, phường; hoàn thành đợt kiểm tra trước 15/11/2026.
3. UBND 135 xã, phường: Đạt tỷ lệ 100% hồ sơ tiếp nhận được số hóa và ký số điện tử ngay từ khâu tiếp nhận trước ngày 30/10/2026.
4. Công an tỉnh: Phối hợp cấp tài khoản VNeID và làm sạch dữ liệu hộ tịch, hoàn thành trước ngày 25/10/2026.
Điều 2. Quyết định có hiệu lực kể từ ngày ký.`
  },
  {
    id: "sample-doc-3",
    title: "Mô tả sự cố: Lỗi không nhận thiết bị chữ ký số USB Token",
    description: "Cán bộ cắm USB Token để ký số tờ trình nhưng phần mềm báo 'Không tìm thấy chứng thư số'.",
    taskType: "error_diagnosis",
    content: `HỆ THỐNG MỘT CỬA ĐIỆN TỬ LIÊN THÔNG
Màn hình xuất hiện cảnh báo đỏ:
[LỖI KÝ SỐ - MÃ 0x80070002]: 'Không tìm thấy chứng thư số hợp lệ hoặc thiết bị phần cứng PKI Token chưa được kích hoạt'.
Chi tiết:
- Cán bộ đã cắm thiết bị USB Token của Ban Cơ yếu Chính phủ vào cổng USB máy tính.
- Đèn trên USB Token có sáng đỏ.
- Trình duyệt hiển thị: 'Plugin ký số CyberSign / VNPT-CA chưa kết nối được với trình duyệt Chrome (Phiên bản 134)'.`
  }
];

export function generateFallbackDocumentAnalysis(taskType: string, text: string, _userNotes?: string): string {
  if (taskType === "format_check") {
    return `### KẾT QUẢ ĐÁNH GIÁ THỂ THỨC VĂN BẢN (THEO NGHỊ ĐỊNH 30/2020/NĐ-CP)

**Điểm đánh giá tuân thủ: 68/100 Điểm (Cần hiệu đính trước khi ban hành)**

#### 1. CÁC LỖI THỂ THỨC PHÁT HIỆN ĐƯỢC:
- **Lỗi 1 (Quốc hiệu & Tiêu ngữ)**: Thiếu Quốc hiệu "CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM" và Tiêu ngữ "Độc lập - Tự do - Hạnh phúc". *Vi phạm Điều 8, Điều 9 NĐ 30/2020/NĐ-CP*.
- **Lỗi 2 (Tên cơ quan ban hành)**: Phải trình bày ở góc trên bên trái, cỡ chữ 12-13 đứng đậm. Cần ghi rõ cơ quan cấp trên trực tiếp (theo mô hình 2 cấp: tỉnh Gia Lai trực tiếp quản lý cấp xã/phường).
- **Lỗi 3 (Số và ký hiệu)**: Ghi "SỐ: 45/CV-UBND" chưa chuẩn. Với Công văn hành chính, không dùng từ "CV", ký hiệu chuẩn là: "Số: 45/UBND-VP" hoặc "Số: 45/UBND-NV". *Vi phạm Điều 10 NĐ 30/2020/NĐ-CP*.
- **Lỗi 4 (Tên loại văn bản)**: Công văn không ghi chữ "CÔNG VĂN" to ở giữa. Công văn hành chính bắt đầu ngay bằng trích yếu nội dung bên dưới Số ký hiệu (ví dụ: "V/v triển khai phong trào Bình dân học vụ số").
- **Lỗi 5 (Địa danh và ngày tháng)**: Cần ghi đúng phông chữ nghiêng cỡ 13-14, ví dụ: *Biển Hồ, ngày 12 tháng 9 năm 2026*.
- **Lỗi 6 (Nơi nhận & Chức vụ người ký)**: Từ "Nơi nhận" phải viết nghiêng đậm cỡ 12. Chức vụ "CHỦ TỊCH" viết in hoa đậm cỡ 13-14, ký số điện tử theo chuẩn PDF.

---

#### 2. DỰ THẢO VĂN BẢN ĐÃ ĐƯỢC HIỆU ĐÍNH CHUẨN MỰC (Nghị định 30/2020/NĐ-CP):

\`\`\`text
ỦY BAN NHÂN DÂN               CỘNG HÒA XÃ HỘI CHỦ NGHĨA VIỆT NAM
  XÃ BIỂN HỒ                      Độc lập - Tự do - Hạnh phúc
Số: 45/UBND-VP                  --------------------------------
V/v triển khai phong trào         Biển Hồ, ngày 12 tháng 9 năm 2026
Bình dân học vụ số

                   Kính gửi:
                     - Các ban ngành, đoàn thể xã;
                     - Trưởng các thôn, làng trên địa bàn.

Thực hiện Nghị quyết số 398/NQ-UBTVQH16 ngày 08/8/2026 của Ủy ban Thường vụ Quốc hội về Chương trình Bình dân học vụ số; Chỉ thị số 14/CT-TTg của Thủ tướng Chính phủ;

Ủy ban nhân dân xã Biển Hồ yêu cầu các đơn vị, bộ phận liên quan nghiêm túc triển khai các nội dung sau:

1. Phổ cập 26 chuyên đề kỹ năng số cho 100% cán bộ, công chức xã; hoàn thành đánh giá sát hạch trực tuyến trước ngày 30/10/2026.
2. Tổ chức các Tổ công nghệ số cộng đồng hướng dẫn người dân kích hoạt, sử dụng VNeID mức 2 và nộp hồ sơ dịch vụ công trực tuyến.

Nơi nhận:                                         CHỦ TỊCH
- Như trên;                                       (Chữ ký số, dấu)
- Thường trực HĐND xã (để b/c);
- Chủ tịch, các PCT UBND xã;
- Lưu: VT.                                        Nguyễn Văn A
\`\`\`
*Đã tối ưu hóa thể thức sẵn sàng sao chép và trình ký.*`;
  }

  if (taskType === "task_matrix") {
    return `### MA TRẬN PHÂN CÔNG NHIỆM VỤ & HẠN ĐỊNH CÔNG VỤ

**Căn cứ văn bản: Quyết định số 125/QĐ-UBND ngày 05/9/2026 của UBND tỉnh Gia Lai**

#### 1. BA VIỆC CẦN TRIỂN KHAI NGAY TRONG 24 - 48 GIỜ:
1. 🚨 **Rà soát chứng thư số và hạ tầng Một cửa**: Kiểm tra 100% tài khoản chữ ký số của chuyên viên tiếp nhận hồ sơ tại bộ phận Một cửa.
2. 🚨 **Đồng bộ mã định danh VNeID**: Phối hợp với Công an cơ sở giải quyết ngay các hồ sơ tồn đọng chưa sạch dữ liệu.
3. 🚨 **Thiết lập chế độ báo cáo thứ Sáu**: Tạo biểu mẫu báo cáo số hóa trực tuyến tự động cho các phòng ban.

#### 2. BẢNG MA TRẬN NHIỆM VỤ CHI TIẾT:

| STT | Nhiệm vụ trọng tâm | Đơn vị chủ trì | Đơn vị phối hợp | Hạn hoàn thành | Sản phẩm đầu ra | Ưu tiên |
| :---: | :--- | :--- | :--- | :---: | :--- | :---: |
| 1 | Kết nối CSDL dân cư và Cổng DVCQG | Sở TT&TT | Công an tỉnh, VNPT Gia Lai | **20/10/2026** | Hệ thống liên thông 100% API | **Hỏa tốc** |
| 2 | Cấp VNeID mức 2 & làm sạch dữ liệu hộ tịch | Công an tỉnh | Tư pháp, UBND 135 xã/phường | **25/10/2026** | 100% công dân đủ điều kiện có VNeID | **Thượng khẩn** |
| 3 | Đạt tỷ lệ 100% hồ sơ số hóa từ khâu tiếp nhận | UBND 135 xã/phường | Bộ phận Một cửa | **30/10/2026** | Báo cáo tỷ lệ số hóa trên Cổng DVC | **Khẩn** |
| 4 | Thanh tra, kiểm tra thực tế Một cửa 135 xã/phường | Văn phòng UBND tỉnh | Sở Nội vụ, Sở TT&TT | **15/11/2026** | Biên bản kiểm tra toàn diện | **Thường** |

#### 3. LƯU Ý AN TOÀN & BẢO VỆ DỮ LIỆU:
- Quá trình số hóa tài liệu có chứa thông tin công dân bắt buộc tuân thủ **Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15** (không lưu ảnh CMND/CCCD trên ổ đĩa chia sẻ không mật khẩu).`;
  }

  if (taskType === "error_diagnosis") {
    return `### KẾT QUẢ CHẨN ĐOÁN SỰ CỐ & HƯỚNG DẪN KHẮC PHỤC

**Phần mềm bị lỗi: Hệ thống Một cửa điện tử liên thông - Ký số văn bản**
**Mã lỗi ghi nhận: 0x80070002 (Không tìm thấy chứng thư số / Token)**

#### 1. NGUYÊN NHÂN KỸ THUẬT:
- Trình duyệt Chrome phiên bản mới chặn tiện ích (Extension) ký số hoặc phần mềm trung gian Token Manager (CyberSign / VNPT Plugin) chưa được khởi động ở chế độ Quản trị viên (Run as administrator).
- Cổng USB máy tính bị lỏng hoặc chân tiếp xúc chưa nhận dạng được chip bảo mật trên USB Token.
- Chứng thư số trong Token có thể đã hết hạn hoặc bị khóa mã PIN do nhập sai quá 3 lần.

#### 2. QUY TRÌNH 3 BƯỚC KHẮC PHỤC NHANH TRONG 2 PHÚT:

- **Bước 1: Rút ra và cắm lại USB Token sang cổng USB phía sau thùng máy tính**
  - Đảm bảo đèn tín hiệu trên USB Token chuyển sang màu xanh ổn định (hoặc đỏ nhấp nháy báo sẵn sàng).
  - Không cắm qua cổng chia USB (USB Hub) vì có thể không đủ điện áp cấp cho chip mã hóa.

- **Bước 2: Khởi động lại ứng dụng Chữ ký số nền (Token Manager)**
  - Tìm biểu tượng phần mềm chữ ký số ở góc phải thanh Taskbar (dưới cùng bên phải màn hình).
  - Chuột phải vào biểu tượng -> chọn **'Khởi động lại'** hoặc vào Menu Start gõ tên phần mềm ký số (ví dụ: *Token Manager / VNPT-CA / Bit4id*) -> Chuột phải chọn **'Run as administrator'**.
  - Kiểm tra xem phần mềm đã nhận tên chứng thư số của đơn vị hay chưa.

- **Bước 3: Bật quyền tiện ích mở rộng trên Trình duyệt Web**
  - Trên trình duyệt Chrome / Edge, truy cập: \`chrome://extensions/\`
  - Tìm tiện ích ký số (CyberSign / VNPT CA Plugin) -> Bật công tắc gạt sang màu xanh.
  - Tải lại trang Một cửa (\`Ctrl + F5\`) và tiến hành ký số lại.

#### 3. CẢNH BÁO AN TOÀN:
- Tuyệt đối không cho mượn USB Token hoặc gửi mật khẩu mã PIN cho người khác ký hộ.
- Nếu nhập mã PIN quá 3 lần bị khóa, liên hệ quản trị viên CNTT của cơ quan để mở khóa mã PUK chính thống, không tải các phần mềm "bẻ khóa token" trôi nổi trên mạng.`;
  }

  return `### BẢN GHI NHỚ TÓM LƯỢC VĂN BẢN (EXECUTIVE SUMMARY)

**Văn bản: ${text.slice(0, 100) || "Tài liệu chỉ đạo công vụ số"}...**

#### 1. BỐI CẢNH & TẦM NHÌN:
Văn bản đặt trọng tâm vào việc đẩy nhanh tiến độ chuyển đổi số trong khối cơ quan nhà nước, bảo đảm tính đồng bộ từ cấp tỉnh đến 135 xã/phường theo mô hình chính quyền địa phương 2 cấp tinh gọn.

#### 2. CÁC NỘI DUNG CHỈ ĐẠO CỐT LÕI:
- Thống nhất một đầu mối tiếp nhận và giải quyết thủ tục hành chính trực tuyến qua Cổng Dịch vụ công Quốc gia.
- Bắt buộc số hóa hồ sơ đầu vào và áp dụng chữ ký số điện tử toàn trình.
- Triển khai học tập, sát hạch 26 chuyên đề kỹ năng số cho toàn thể cán bộ, công chức, viên chức.

#### 3. ĐỀ XUẤT HÀNH ĐỘNG CHO ĐƠN VỊ:
- Tổ chức quán triệt ngay trong cuộc họp giao ban đầu tuần.
- Phân công cán bộ đầu mối phụ trách đôn đốc chỉ tiêu số hóa.`;
}
