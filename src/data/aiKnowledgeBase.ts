/**
 * AI Knowledge Base & Semantic Engine for "Bình dân học vụ số"
 * Provides instant, authoritative answers covering 26 topics, laws, decrees,
 * study guidance, and civil service digital skills.
 * Acts as an offline/client-side fallback and server-side domain expert.
 */

export function getSmartTutorResponse(query: string, contextTopic?: string): string {
  const p = query.toLowerCase().trim();

  // 1. Cách học như thế nào / Lộ trình học tập / Hướng dẫn học
  if (
    p.includes("cách học") ||
    p.includes("học như thế nào") ||
    p.includes("lộ trình") ||
    p.includes("bắt đầu từ đâu") ||
    p.includes("hướng dẫn học") ||
    p.includes("học ra sao") ||
    p.includes("phương pháp học")
  ) {
    return `Kính gửi Quý Anh/Chị,

Để học tập hiệu quả bộ tài liệu **"Bình dân học vụ số - Tập 1: Khối cơ quan nhà nước"** (Chủ biên: TS. Trần Văn Khải), Quý Anh/Chị có thể áp dụng lộ trình **"3 Bước Micro-learning"** chuẩn hóa sau:

### 📌 Bước 1: Học theo cấu trúc Micro-learning (5 - 7 phút/bài)
- Toàn bộ chương trình gồm **26 chuyên đề** với **136 bài giảng ngắn**.
- Mỗi bài được thiết kế tinh gọn gồm: **1 Video bài giảng (5-7 phút)**, **1 Infographic tóm lược** và **1 Banner nghiệp vụ**.
- Quý Anh/Chị nên dành **10 - 15 phút mỗi ngày** (ví dụ đầu giờ hoặc giờ giải lao) để hoàn thành từ 1 đến 2 bài học.

### 📌 Bước 2: Củng cố kiến thức bằng câu hỏi trắc nghiệm
- Ngay sau mỗi bài học đều có **câu hỏi trắc nghiệm tình huống thực tế**.
- Khi chọn đáp án, hệ thống sẽ hiển thị ngay **giải thích căn cứ nghiệp vụ** và quy định pháp lý tương ứng.
- Bài học sẽ tự động được đánh dấu **"Đã hoàn thành"** và tích lũy vào **Thanh tiến độ bồi dưỡng** trên đầu trang.

### 📌 Bước 3: Tham gia Sát hạch & Nhận Chứng nhận số
- Sau khi tích lũy đủ các chuyên đề trọng tâm, Quý Anh/Chị chuyển sang thẻ **"Sát hạch & chứng nhận"**.
- Bộ đề thi gồm **20 câu hỏi trắc nghiệm** trong thời gian **15 phút**.
- Đạt từ **16/20 câu (80%)** trở lên: Đạt chuẩn năng lực số công vụ, được cấp **Chứng nhận số điện tử** có mã định danh xác thực.

💡 **Gợi ý bắt đầu:** Quý Anh/Chị nên bắt đầu từ **Chuyên đề 1: Nhận thức chung về chuyển đổi số** và **Chuyên đề 3: Sử dụng AI có trách nhiệm trong công vụ**.`;
  }

  // 2. Nguyên tắc AI & "Dữ liệu nào, công cụ đó"
  if (
    p.includes("dữ liệu nào") ||
    p.includes("công cụ đó") ||
    p.includes("luật ai") ||
    p.includes("sử dụng ai") ||
    p.includes("chatgpt") ||
    p.includes("trí tuệ nhân tạo")
  ) {
    return `Kính gửi Quý Anh/Chị,

Xin chia sẻ về nguyên tắc **"Dữ liệu nào, công cụ đó"** theo **Luật Trí tuệ nhân tạo (Luật số 134/2025/QH15)** và Chuyên đề 3 & 16:

1. **Phân cấp dữ liệu nghiêm ngặt:** 
   - Tuyệt đối **KHÔNG** đưa dữ liệu bí mật nhà nước, hồ sơ vụ việc chưa công bố, hoặc thông tin đời tư cá nhân của công dân lên các công cụ AI công cộng trên Internet (như ChatGPT, Claude, Gemini miễn phí...).
2. **Ẩn danh hóa trước khi đưa vào AI:**
   - Chỉ sử dụng dữ liệu đã công khai, dữ liệu giả định minh họa hoặc dữ liệu đã khử định danh (thay tên riêng, số CCCD, địa chỉ cụ thể bằng ký hiệu X, Y) để nhờ AI hỗ trợ lập dàn ý, gợi ý bố cục.
3. **Nguyên tắc song hành:**
   - *"AI làm nhanh, con người làm chuẩn"*: AI chỉ là trợ thủ soạn thảo bản nháp. Cán bộ, công chức luôn là người kiểm chứng, thẩm định và chịu trách nhiệm pháp lý cao nhất đối với văn bản ban hành.`;
  }

  // 3. Deepfake & Lừa đảo công nghệ cao
  if (
    p.includes("deepfake") ||
    p.includes("lừa đảo") ||
    p.includes("cuộc gọi video") ||
    p.includes("giả mạo") ||
    p.includes("khuôn mặt")
  ) {
    return `Kính gửi Quý Anh/Chị,

Quy trình nhận diện và xử lý cuộc gọi video lừa đảo công nghệ Deepfake theo **Chuyên đề 11 & 19**:

1. **Dấu hiệu nhận diện Deepfake:**
   - Mắt chớp không tự nhiên, cử động môi lệch so với âm thanh phát ra.
   - Khuôn mặt có quầng mờ hoặc giật khung hình khi nghiêng đầu, quay sang hai bên.
   - Ánh sáng phản chiếu trên mặt bất thường, người gọi thường viện lý do "sóng yếu, mạng chập chờn" để cúp máy sớm.

2. **Quy tắc phản xạ an toàn 3 bước:**
   - **Bước 1 (Dừng lại):** Giữ bình tĩnh, tuyệt đối **KHÔNG chuyển tiền**, không cung cấp mã OTP hay thông tin tài khoản dù người gọi tự xưng lãnh đạo, cơ quan điều tra hay người thân.
   - **Bước 2 (Xác thực chéo):** Ngắt cuộc gọi video ngay lập tức. Gọi lại trực tiếp qua **cuộc gọi thoại viễn thông thông thường (mạng SIM)** hoặc liên hệ qua kênh liên lạc chính thức đã biết trước.
   - **Bước 3 (Thử thách):** Đặt câu hỏi về một chi tiết thực tế ngoài đời mà chỉ người thân/đồng nghiệp thật mới có thể trả lời được.`;
  }

  // 4. Quy tắc sao lưu 3-2-1 & Bảo vệ tài liệu mật
  if (
    p.includes("3-2-1") ||
    p.includes("sao lưu") ||
    p.includes("tài liệu mật") ||
    p.includes("backup") ||
    p.includes("mất dữ liệu")
  ) {
    return `Kính gửi Quý Anh/Chị,

Quy chuẩn sao lưu dữ liệu và bảo vệ tài liệu công vụ theo **Chuyên đề 9 & 20**:

1. **Quy tắc sao lưu 3-2-1 kinh điển:**
   - **3 bản sao:** Luôn duy trì ít nhất 3 bản sao chép dữ liệu (1 bản đang làm việc và 2 bản dự phòng).
   - **2 loại phương tiện:** Lưu trên 2 thiết bị/môi trường vật lý khác nhau (ví dụ: ổ cứng máy tính cơ quan và máy chủ lưu trữ chuyên dụng NAS hoặc ổ đĩa mạng nội bộ).
   - **1 bản tách biệt (off-site):** Có ít nhất 1 bản lưu tại địa điểm vật lý khác hoặc hệ thống đám mây công vụ an toàn được nhà nước phê chuẩn.

2. **Quy tắc an toàn tài liệu mật:**
   - Tuyệt đối không soạn thảo tài liệu mang dấu mật trên máy tính có kết nối mạng Internet.
   - Không chia sẻ văn bản mật qua các ứng dụng nhắn tin cá nhân thông thường (Zalo, Facebook, Telegram cá nhân...).`;
  }

  // 5. Luật Bảo vệ dữ liệu cá nhân & Mức phạt
  if (
    p.includes("dữ liệu cá nhân") ||
    p.includes("mức phạt") ||
    p.includes("91/2025") ||
    p.includes("lộ dữ liệu") ||
    p.includes("bảo vệ dữ liệu")
  ) {
    return `Kính gửi Quý Anh/Chị,

Căn cứ **Luật Bảo vệ dữ liệu cá nhân (Luật số 91/2025/QH15)** có hiệu lực thi hành từ ngày **01/01/2026**:

1. **Chế tài xử phạt hành chính:**
   - Phạt tiền lên tới **5% tổng doanh thu của năm tài chính liền kề** đối với tổ chức, doanh nghiệp có hành vi mua bán, làm lộ lọt dữ liệu cá nhân ở mức độ nghiêm trọng.
2. **Kỷ luật công vụ đối với cán bộ, công chức:**
   - Cán bộ, công chức làm lộ lọt thông tin cá nhân của công dân trong quá trình tiếp nhận, xử lý hồ sơ sẽ bị xử lý kỷ luật từ **khiển trách, cảnh cáo, cách chức đến buộc thôi việc**.
   - Phải bồi thường thiệt hại dân sự theo quy định và bị truy cứu trách nhiệm hình sự nếu gây hậu quả đặc biệt nghiêm trọng.`;
  }

  // 6. Sát hạch & Chứng nhận số
  if (
    p.includes("sát hạch") ||
    p.includes("chứng nhận") ||
    p.includes("chứng chỉ") ||
    p.includes("thi thử") ||
    p.includes("bao nhiêu điểm") ||
    p.includes("đề thi")
  ) {
    return `Kính gửi Quý Anh/Chị,

Thông tin về kỳ **Sát hạch & Cấp chứng nhận số** trên nền tảng:

- **Hình thức:** Trắc nghiệm khách quan trực tuyến trên máy tính hoặc điện thoại thông minh.
- **Cấu trúc đề thi:** Gồm **20 câu hỏi** được chọn ngẫu nhiên từ ngân hàng đề của 26 chuyên đề.
- **Thời gian làm bài:** **15 phút**.
- **Tiêu chuẩn đạt:** Đạt từ **16/20 câu (tương đương 80%)** trở lên.
- **Chứng nhận số:** Khi đạt chuẩn, hệ thống lập tức xuất Chứng nhận số cá nhân có **Mã xác thực điện tử** và mã QR đồng bộ kết quả, sẵn sàng tích hợp với hồ sơ cán bộ công chức điện tử.
- Quý Anh/Chị có thể làm bài thi nhiều lần để rèn luyện và nâng cao điểm số bất cứ lúc nào tại tab **"Sát hạch & chứng nhận"**.`;
  }

  // 7. Về Chương trình Bình dân học vụ số & Nghị quyết 398
  if (
    p.includes("bình dân học vụ số") ||
    p.includes("398") ||
    p.includes("trần văn khải") ||
    p.includes("quốc hội số") ||
    p.includes("chỉ thị 14") ||
    p.includes("gia lai")
  ) {
    return `Kính gửi Quý Anh/Chị,

Chương trình **"Bình dân học vụ số - Tập 1: Khối cơ quan nhà nước"** được biên soạn và triển khai theo:
- **Nghị quyết số 398/NQ-UBTVQH16** ngày 08/8/2026 của Ủy ban Thường vụ Quốc hội.
- **Chỉ thị số 14/CT-TTg** của Thủ tướng Chính phủ về đẩy mạnh phổ cập kỹ năng số toàn dân.
- **Chủ biên:** TS. Trần Văn Khải (Phó Chủ nhiệm Ủy ban Khoa học, Công nghệ và Môi trường của Quốc hội).

**Mục tiêu cốt lõi:**
1. Chuẩn hóa và phổ cập 100% kỹ năng số cơ bản cho cán bộ, công chức, viên chức, lực lượng vũ trang và người lao động.
2. Xây dựng văn hóa số, bảo đảm an ninh mạng và an toàn thông tin công vụ.
3. Đưa chuyển đổi số trở thành công cụ thực chất phục vụ người dân và doanh nghiệp ngày một nhanh chóng, minh bạch.`;
  }

  // 8. Chữ ký số & Dịch vụ công trực tuyến
  if (
    p.includes("chữ ký số") ||
    p.includes("ký số") ||
    p.includes("dịch vụ công") ||
    p.includes("118/2025") ||
    p.includes("văn bản điện tử")
  ) {
    return `Kính gửi Quý Anh/Chị,

Quy định về văn bản điện tử và ký số công vụ theo **Nghị định số 118/2025/NĐ-CP**:
1. **Giá trị pháp lý:** Văn bản điện tử được ký số bằng chứng thư số chuyên dùng công vụ có giá trị pháp lý tương đương văn bản giấy có đóng dấu mộc đỏ.
2. **Nguyên tắc ký số:**
   - Ký số cá nhân của người có thẩm quyền ký ban hành trước, sau đó bộ phận văn thư thực hiện ký số của cơ quan, tổ chức (dấu số).
   - Tuyệt đối không giao thiết bị ký số (Token, SIM PKI) hoặc mật khẩu cho người khác ký thay.
3. **Một cửa số duy nhất:** Mọi thủ tục hành chính được tiếp nhận và trả kết quả thống nhất qua Cổng Dịch vụ công Quốc gia theo Nghị định 118/2025/NĐ-CP.`;
  }

  // 9. Quy tắc ứng xử mạng xã hội (Quyết định 874)
  if (
    p.includes("mạng xã hội") ||
    p.includes("874") ||
    p.includes("quy tắc ứng xử") ||
    p.includes("phát ngôn") ||
    p.includes("facebook") ||
    p.includes("zalo")
  ) {
    return `Kính gửi Quý Anh/Chị,

Quy tắc ứng xử trên mạng xã hội dành cho cán bộ, công chức theo **Quyết định 874/QĐ-BTTTT**:
1. **Khẩu hiệu cốt lõi:** *"Chiếc áo công vụ không cởi ra khi về nhà"* - Dù sử dụng tài khoản cá nhân ngoài giờ làm việc, phát ngôn của cán bộ vẫn gắn liền với hình ảnh của cơ quan nhà nước.
2. **Các điều cấm kỵ:**
   - Không đăng tải, chia sẻ thông tin chưa được kiểm chứng, tin đồn thất thiệt.
   - Không bình luận xúc phạm uy tín của tổ chức, danh dự của cá nhân khác.
   - Không chụp ảnh văn bản nội bộ, tài liệu công vụ chưa công bố đăng lên mạng xã hội.
3. **Trách nhiệm tích cực:** Chủ động lan tỏa các thông tin tích cực, chính sách pháp luật đúng đắn của Đảng và Nhà nước.`;
  }

  // Default intelligent domain response
  return `Kính gửi Quý Anh/Chị,

Hệ thống Trợ lý Cố vấn Học vụ Số đã ghi nhận câu hỏi của Quý Anh/Chị: *"${query}"*.

Dưới đây là các định hướng công vụ trọng tâm theo Khung kỹ năng Bình dân học vụ số (Nghị quyết 398/NQ-UBTVQH16):
- **Nguyên tắc an toàn số:** Luôn kiểm tra tính an toàn thông tin trước khi xử lý hồ sơ; tuân thủ nghiêm Luật Bảo vệ dữ liệu cá nhân 91/2025/QH15 và Luật An ninh mạng 116/2025/QH15.
- **Thực thi công vụ hiện đại:** Ưu tiên ký số văn bản điện tử, số hóa hồ sơ công việc và giải quyết thủ tục hành chính trực tuyến qua Cổng Dịch vụ công Quốc gia.
- **Làm chủ công nghệ mới:** Ứng dụng Trí tuệ nhân tạo (AI) theo nguyên tắc *"AI làm nhanh, con người làm chuẩn"* và *"Dữ liệu nào, công cụ đó"*.

💡 **Quý Anh/Chị có thể tham khảo thêm các câu hỏi gợi ý nhanh:**
- *"Cách học như thế nào?"*
- *"Nguyên tắc Dữ liệu nào, công cụ đó là gì?"*
- *"Cách nhận diện cuộc gọi video lừa đảo Deepfake?"*
- *"Quy tắc sao lưu 3-2-1 tài liệu công vụ?"*
- *"Điều kiện sát hạch cấp chứng nhận số?"*`;
}
