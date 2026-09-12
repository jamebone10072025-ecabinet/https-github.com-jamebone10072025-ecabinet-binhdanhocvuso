import { Lesson, Topic } from "../types";

/**
 * Full pedagogical lecture texts (Bài giảng chi tiết / Kịch bản giảng dạy Micro-learning)
 * for "Bình dân học vụ số - Tập 1: Khối cơ quan nhà nước" (TS. Trần Văn Khải chủ biên).
 */

export const DETAILED_LECTURE_SCRIPTS: Record<string, string> = {
  "cd1-b1": `CHUYỂN ĐỔI SỐ - HAI CHỮ NGHE QUEN MÀ LẠ

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức và người lao động!

Trong những năm gần đây, "chuyển đổi số" đã trở thành cụm từ xuất hiện với tần suất dày đặc trong các văn kiện của Đảng, Nghị quyết của Quốc hội, Quyết định của Thủ tướng Chính phủ và trong các cuộc họp giao ban đầu tuần tại mọi cơ quan, đơn vị. Nhưng giữa muôn vàn thông điệp đó, có bao giờ Quý Anh/Chị tự hỏi: Chuyển đổi số thực chất là gì? Liệu nó có phải là một điều gì đó quá xa vời, chỉ dành riêng cho các kỹ sư công nghệ thông tin hay những chuyên gia lập trình máy tính?

Câu trả lời dứt khoát là: Không! Chuyển đổi số bắt đầu từ chính bàn làm việc của mỗi chúng ta.

1. Ba nấc thang tiến hóa: Số hóa – Tin học hóa – Chuyển đổi số

Để không bị lạc lối trong "ma trận thuật ngữ", chúng ta cần phân định rành mạch ba khái niệm nền tảng:

- Thứ nhất, Số hóa (Digitization): Đây là bước chuyển đổi thông tin từ dạng vật lý sang dạng số. Ví dụ điển hình là khi Quý Anh/Chị dùng máy scan để quét một tập hồ sơ giấy, một quyết định khen thưởng hay một tờ trình thành tệp tin PDF, lưu vào máy tính. Bản thân văn bản giấy đã biến thành tệp tin số, nhưng phương thức làm việc và bản chất quy trình xử lý vẫn chưa hề thay đổi.

- Thứ hai, Tin học hóa (Digitalization): Đây là việc ứng dụng công nghệ thông tin vào quy trình nghiệp vụ sẵn có để làm việc nhanh hơn, năng suất hơn. Ví dụ, thay vì dùng máy đánh chữ hay viết tay, chúng ta soạn thảo trên Microsoft Word; thay vì cử văn thư đi gửi công văn hỏa tốc bằng xe máy, chúng ta gửi qua hòm thư điện tử công vụ; thay vì sổ theo dõi văn bản bằng giấy, chúng ta nhập vào bảng tính Excel. Tuy nhiên, bản chất các bước quy trình, các tầng nấc phê duyệt và lối tư duy quản lý cũ vẫn giữ nguyên vẹn. Tin học hóa là "làm nhanh hơn việc cũ".

- Thứ ba, Chuyển đổi số (Digital Transformation): Đây mới là cuộc cách mạng thực sự. Chuyển đổi số không chỉ là công nghệ, mà là sự thay đổi mang tính hệ thống về mô hình tổ chức, quy trình nghiệp vụ, phương thức cung cấp dịch vụ và đặc biệt là văn hóa làm việc dựa trên dữ liệu số. Chuyển đổi số là tái cấu trúc toàn diện quy trình công vụ. Ví dụ: Trước đây, người dân muốn làm thủ tục hành chính phải mang 5 loại giấy tờ giấy đến trụ sở ủy ban, cán bộ đối chiếu thủ công từng trang; nay với Cơ sở dữ liệu quốc gia về dân cư và Cổng Dịch vụ công, người dân chỉ cần một mã định danh VNeID, các hệ thống tự động xác thực và liên thông dữ liệu, hồ sơ được giải quyết phi địa giới hành chính, không phụ thuộc vào giờ hành chính. Đó chính là Chuyển đổi số: "Làm việc mới theo cách thức hoàn toàn mới".

2. Mỗi cán bộ là một "mắt xích dữ liệu" sống còn

Nhiều Anh/Chị thường băn khoăn: "Tôi làm văn phòng, làm kế toán, hay làm địa chính xã... thì chuyển đổi số có liên quan gì đến tôi?".

Xin thưa rằng, dữ liệu được ví như "dầu mỏ", là nguồn tài nguyên quốc gia quý giá trong thế kỷ 21. Nhưng dầu mỏ muốn sinh ra năng lượng thì phải sạch, không bị lẫn tạp chất. Trong cơ quan nhà nước, hệ thống dù đầu tư hàng trăm tỷ đồng với máy chủ tối tân đến đâu cũng trở nên vô nghĩa nếu dữ liệu đầu vào bị sai, bị thiếu hoặc không được cập nhật kịp thời.

Mỗi khi Anh/Chị tiếp nhận một hồ sơ, cập nhật đúng hạn trạng thái xử lý lên Hệ thống thông tin giải quyết thủ tục hành chính, ký số xác thực một văn bản điện tử thay cho bản giấy, hay số hóa chuẩn xác kết quả thủ tục hành chính... chính là Anh/Chị đang bơm những giọt "dầu dữ liệu" tinh khiết vào cỗ máy điều hành quốc gia. Ngược lại, nếu một khâu chậm trễ, cả chuỗi cung ứng dịch vụ công cho người dân sẽ bị tắc nghẽn. Mỗi chúng ta chính là một mắt xích dữ liệu sống còn quyết định sự thành bại của chuyển đổi số!

3. Tinh thần chỉ đạo của Quốc hội và Chính phủ: Lấy người dân làm trung tâm

Nghị quyết số 398/NQ-UBTVQH16 của Ủy ban Thường vụ Quốc hội và Chỉ thị số 14/CT-TTg của Thủ tướng Chính phủ đã khẳng định nhất quán quan điểm: "Chuyển đổi số trong cơ quan nhà nước phải lấy người dân, doanh nghiệp làm trung tâm phục vụ; lấy sự hài lòng của Nhân dân làm thước đo đánh giá hiệu quả".

Chuyển đổi số không phải là phong trào hình thức, không phải là việc mua sắm thiết bị để trưng bày, mà phải đi vào thực chất, giải phóng cán bộ khỏi những công việc bàn giấy lặp đi lặp lại nhàm chán, để dành thời gian và trí tuệ cho những nhiệm vụ sáng tạo, phục vụ Nhân dân tốt hơn.

Thông điệp cốt lõi mà tôi muốn gửi gắm tới Quý Anh/Chị trong bài mở đầu này:
"Chuyển đổi số không chỉ là mua sắm máy móc mà là thay đổi tư duy và phương thức phụng sự Nhân dân."

Ở bài tiếp theo, tôi sẽ cùng Anh/Chị tìm hiểu những công nghệ số cốt lõi đang lặng lẽ hỗ trợ công việc của chúng ta mỗi ngày. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b2": `NHỮNG CÔNG NGHỆ SỐ CỐT LÕI - ĐỘNG CƠ CỦA NỀN HÀNH CHÍNH HIỆN ĐẠI

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức!

Nếu như ở bài trước, chúng ta đã thống nhất rằng chuyển đổi số trước hết là thay đổi tư duy, thì ở bài học này, chúng ta sẽ làm quen với những "trợ thủ đắc lực" – tức các công nghệ số cốt lõi đang âm thầm vận hành phía sau màn hình làm việc của chúng ta.

Nhiều người e ngại khi nghe những thuật ngữ tiếng Anh phức tạp như Cloud, AI, Big Data, Blockchain, IoT. Nhưng thực tế, chúng không hề xa lạ mà đang hiện diện trong từng nghiệp vụ thường nhật:

1. Điện toán đám mây (Cloud Computing) – Kho tài nguyên dùng chung
Hãy hình dung: Trước đây mỗi cơ quan phải mua một máy chủ vật lý đặt trong phòng lạnh, tốn kém tiền điện và người bảo dưỡng, khi mất điện hay cháy nổ thì toàn bộ dữ liệu có nguy cơ biến mất. Ngày nay, Điện toán đám mây cho phép chúng ta lưu trữ tài liệu, vận hành phần mềm quản lý văn bản trên hạ tầng đám mây công vụ an toàn của quốc gia hoặc của tỉnh. Cán bộ có thể truy cập xử lý công việc từ bất kỳ đâu, trên máy tính cơ quan hay máy tính bảng khi đi công tác, mà dữ liệu luôn được sao lưu liên tục và bảo mật tối đa.

2. Dữ liệu lớn (Big Data) và Trí tuệ nhân tạo (AI) – Cặp đôi dự báo và phân tích
Trong một năm, một tỉnh có thể tiếp nhận hàng trăm nghìn ý kiến phản ánh của cử tri, hàng triệu lượt giải quyết hồ sơ thủ tục hành chính. Sức người không thể đọc hết từng trang để tổng hợp. Big Data tập hợp toàn bộ các dòng dữ liệu đó, và AI sẽ giúp phân loại, phát hiện ngay các điểm nóng: Đơn vị nào đang chậm trễ hồ sơ nhiều nhất? Lĩnh vực nào người dân bức xúc nhất về đất đai hay bảo hiểm? Nhờ đó, lãnh đạo có thể ra quyết định điều hành dựa trên con số thực tế thay vì cảm tính.

3. Internet vạn vật (IoT) – Cảm biến kết nối đời sống
Các trạm quan trắc tự động đo chất lượng không khí, cảm biến giám sát ngập lụt, camera giao thông phạt nguội... tự động gửi dữ liệu về Trung tâm điều hành thông minh (IOC). Đó chính là IoT – đưa thế giới vật lý hòa vào hệ thống giám sát số của chính quyền.

4. Chuỗi khối (Blockchain) – Sổ cái minh bạch chống giả mạo
Blockchain tạo ra các bản ghi dữ liệu không thể chỉnh sửa, giúp bảo chứng bằng cấp, chứng chỉ điện tử, giấy chứng nhận quyền sử dụng đất số, ngăn chặn hoàn toàn tình trạng làm giả giấy tờ công vụ.

Quy tắc vàng của chúng ta khi tiếp cận công nghệ mới:
"Làm chủ công nghệ để công nghệ phục vụ con người, không sùng bái thái quá và không sợ hãi né tránh."

Ở bài tiếp theo, tôi sẽ cùng Anh/Chị khám phá 3 trụ cột chiến lược của chuyển đổi số quốc gia: Chính phủ số, Kinh tế số và Xã hội số. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b3": `CHÍNH PHỦ SỐ, KINH TẾ SỐ VÀ XÃ HỘI SỐ - TAM GIÁC PHÁT TRIỂN BỀN VỮNG

Kính thưa Quý Anh/Chị!

Chiến lược Chuyển đổi số quốc gia của Việt Nam được xây dựng trên một kết cấu "kiềng ba chân" vững chắc: Chính phủ số – Kinh tế số – Xã hội số. Ba trụ cột này gắn bó hữu cơ, tác động qua lại và không thể tách rời:

1. Chính phủ số – Trụ cột kiến tạo và dẫn dắt
Chính phủ số là cơ quan nhà nước các cấp đổi mới phương thức quản lý, vận hành toàn bộ trên môi trường số; xử lý văn bản điện tử toàn trình, họp không giấy tờ; cung cấp 100% dịch vụ công trực tuyến đủ điều kiện lên toàn trình. Chính phủ số phải đi đầu, mở đường và làm gương để người dân và doanh nghiệp tin tưởng đi theo.

2. Kinh tế số – Động lực phát triển của đất nước
Kinh tế số bao gồm công nghiệp ICT, thương mại điện tử, kinh tế nền tảng số và việc số hóa mọi ngành kinh tế truyền thống như nông nghiệp số, du lịch số, tài chính số. Mục tiêu của quốc gia là kinh tế số chiếm từ 20-30% GDP. Khi chính quyền cắt giảm thủ tục phiền hà, doanh nghiệp sẽ tiết kiệm hàng ngàn tỷ đồng chi phí tuân thủ để tập trung sản xuất kinh doanh.

3. Xã hội số – Nền tảng bền vững
Xã hội số là người dân được phổ cập kỹ năng số, có danh tính số (VNeID), tài khoản thanh toán không tiền mặt, tài khoản sử dụng dịch vụ công và được an toàn trên không gian mạng. Nếu người dân không biết dùng điện thoại thông minh để nộp hồ sơ, thì dịch vụ công trực tuyến dù đầu tư hiện đại đến đâu cũng thành lãng phí.

Vì vậy, mỗi cán bộ hướng dẫn một công dân cài đặt ứng dụng số, thanh toán phí lệ phí không dùng tiền mặt chính là đang góp phần xây đắp cho cả 3 trụ cột này.

Thông điệp hành động của bài học:
"Chính phủ số tiên phong mở đường, Kinh tế số tạo nguồn lực, Xã hội số là nền tảng trường tồn."

Ở bài tiếp theo, tôi sẽ cùng Anh/Chị tìm hiểu về Chuyển đổi số trong hoạt động của Quốc hội và HĐND các cấp theo Nghị quyết 398. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b4": `CHUYỂN ĐỔI SỐ TRONG HOẠT ĐỘNG CỦA QUỐC HỘI VÀ HỘI ĐỒNG NHÂN DÂN

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức!

Chuyển đổi số trong các cơ quan dân cử – Quốc hội và Hội đồng nhân dân các cấp – có ý nghĩa đặc biệt quan trọng, bởi đây là nơi thể hiện quyền lực tối cao của Nhân dân, nơi ban hành các quyết sách pháp luật định hình tương lai đất nước. Thực hiện Nghị quyết số 398/NQ-UBTVQH16 của Ủy ban Thường vụ Quốc hội, hoạt động của Quốc hội và HĐND đã và đang diễn ra những bước chuyển mình mang tính lịch sử.

1. Đổi mới căn bản phương thức lập pháp: Từ bàn giấy sang kỳ họp số
Trước đây, mỗi kỳ họp Quốc hội hay HĐND cấp tỉnh tiêu tốn hàng tấn giấy tờ in ấn tài liệu dự thảo, tờ trình, báo cáo thẩm tra. Đại biểu phải mang theo những vali tài liệu nặng trĩu. Ngày nay, mô hình "Kỳ họp không giấy tờ" đã được triển khai đồng bộ. 100% tài liệu được tải lên kho dữ liệu số dùng chung, bảo mật nhiều lớp. Đại biểu sử dụng máy tính bảng chuyên dụng để đọc, đánh dấu, tra cứu và gửi ý kiến góp ý tức thời. Hệ thống biểu quyết điện tử cho kết quả chính xác, minh bạch chỉ sau vài giây bấm nút.

2. Trợ lý ảo AI – Đột phá trong phân tích và thẩm định chính sách
Một dự thảo luật có thể liên quan đến hàng chục bộ luật và hàng trăm nghị định, thông tư khác nhau. Việc rà soát thủ công dễ bỏ sót các điểm chồng chéo. Trợ lý ảo pháp luật ứng dụng công nghệ xử lý ngôn ngữ tự nhiên (NLP) và Trí tuệ nhân tạo có khả năng quét toàn bộ kho tàng văn bản pháp luật, chỉ ra ngay các xung đột về thẩm quyền, thời hạn hay chế tài. Đây là công cụ hỗ trợ đắc lực giúp nâng cao chất lượng lập pháp và công tác thẩm tra của các Ban thuộc HĐND.

3. Giám sát trên dữ liệu và thu hẹp khoảng cách với cử tri
Nhờ các nền tảng họp trực tuyến và tiếp xúc cử tri số, đại biểu có thể lắng nghe ý kiến của cử tri ở những địa bàn xa xôi nhất của tỉnh. Dữ liệu kiến nghị của cử tri được số hóa, phân loại tự động và theo dõi tiến độ giải quyết của các cơ quan hành chính theo thời gian thực. Trách nhiệm giải trình được nâng cao rõ rệt.

Quy tắc vàng của bài học:
"Quốc hội số, HĐND số tăng cường kết nối mật thiết giữa đại biểu với cử tri và Nhân dân."

Ở bài tiếp theo, chúng ta sẽ cùng tìm hiểu Khung kiến thức, kỹ năng số chuẩn hóa gồm 5 miền năng lực dành cho cán bộ công chức. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b5": `KHUNG NĂNG LỰC SỐ CƠ BẢN DÀNH CHO CÁN BỘ, CÔNG CHỨC, VIÊN CHỨC

Kính thưa Quý Anh/Chị!

Để xây dựng thành công Chính phủ số và nền hành chính công vụ hiện đại, yếu tố con người luôn giữ vị trí quyết định. Máy móc hay đường truyền có thể mua sắm trong vài tháng, nhưng năng lực và tác phong làm việc của cán bộ đòi hỏi phải được đào tạo bài bản và bồi dưỡng thường xuyên.

Chính vì vậy, Thủ tướng Chính phủ tại Chỉ thị số 14/CT-TTg và Bộ Thông tin & Truyền thông đã ban hành Khung kỹ năng số chuẩn hóa dành riêng cho cán bộ, công chức, viên chức nhà nước.

1. Vì sao kỹ năng số là tiêu chuẩn bắt buộc của cán bộ thời kỳ mới?
Thời đại ngày nay, cán bộ không thể chỉ dừng lại ở việc biết bật máy tính hay gõ vài dòng văn bản Word. Khi mọi quy trình đều chuyển lên môi trường mạng, việc thiếu kỹ năng số sẽ biến cán bộ thành "điểm nghẽn" của cơ quan, gây chậm trễ hồ sơ của người dân và tiềm ẩn nguy cơ lộ lọt bí mật nhà nước. Năng lực số hiện nay được coi là một tiêu chí đánh giá, xếp loại cán bộ hàng năm.

2. Cấu trúc 5 miền năng lực số cốt lõi:
Khung năng lực số được xây dựng theo chuẩn quốc tế và tinh chỉnh phù hợp với thực tiễn Việt Nam, gồm 5 miền kỹ năng:
- Miền 1: Thông tin và dữ liệu (Biết tìm kiếm chính xác, đánh giá nguồn tin chính thống, nhận diện tin giả và quản lý dữ liệu cá nhân hóa an toàn).
- Miền 2: Giao tiếp và hợp tác số (Sử dụng thành thạo hòm thư công vụ, hệ thống quản lý văn bản, họp trực tuyến và tuân thủ văn hóa ứng xử Netiquette).
- Miền 3: Sáng tạo nội dung số (Soạn thảo văn bản điện tử đúng thể thức chuẩn, số hóa hồ sơ, ký số và tôn trọng bản quyền sở hữu trí tuệ số).
- Miền 4: An toàn thông tin và bảo mật (Bảo vệ thiết bị làm việc, nhận biết email giả mạo lừa đảo, tuân thủ Luật An ninh mạng và Luật Bảo vệ dữ liệu cá nhân).
- Miền 5: Giải quyết vấn đề và thích ứng công nghệ (Khắc phục sự cố kỹ thuật đơn giản, ứng dụng công cụ AI trợ lý và tinh thần tự học nâng cao trình độ liên tục).

Quy tắc vàng của bài học:
"Năng lực số là tiêu chuẩn bắt buộc của cán bộ thời kỳ mới, phải học tập và cập nhật liên tục."

Ở bài tiếp theo, chúng ta sẽ tìm hiểu cách thức Xây dựng văn hóa số trong cơ quan nhà nước và xóa bỏ tâm lý cát cứ dữ liệu. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b6": `XÂY DỰNG VĂN HÓA SỐ VÀ XÓA BỎ TƯ TƯỞNG CÁT CỨ DỮ LIỆU

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức!

Có một thực tế mà nhiều chuyên gia chuyển đổi số đã chỉ ra: "Văn hóa ăn thịt công nghệ vào bữa sáng" (Culture eats technology for breakfast). Một hệ thống phần mềm dù hiện đại đến mấy, nếu cán bộ không chịu dùng, không muốn chia sẻ dữ liệu hoặc sử dụng một cách đối phó thì hệ thống đó cũng trở thành đống sắt vụn vô giá trị. Đó là lý do vì sao chúng ta phải xây dựng Văn hóa số trong mọi cơ quan nhà nước.

1. Văn hóa số trong cơ quan công quyền là gì?
Văn hóa số là tổng hòa các giá trị, thái độ, niềm tin và thói quen hành xử của cán bộ, công chức khi thực thi nhiệm vụ trên môi trường mạng. Văn hóa số được định hình bởi ba trụ cột chính:
- Tinh thần phụng sự trên môi trường số: Lấy sự tiện lợi, nhanh chóng của Nhân dân làm mục tiêu cao nhất;
- Tinh thần hợp tác liên thông: Sẵn sàng kết nối, hỗ trợ đồng nghiệp và các cơ quan khác cùng hoàn thành nhiệm vụ chung;
- Kỷ luật an toàn thông tin: Tự giác bảo vệ dữ liệu công dân và tuân thủ các quy chuẩn an toàn số.

2. Xóa bỏ dứt điểm tư duy "Cát cứ dữ liệu"
Một căn bệnh trầm kha cản trở chuyển đổi số suốt nhiều năm qua là bệnh "cát cứ thông tin". Nhiều đơn vị coi dữ liệu do mình quản lý như tài sản riêng, sợ rằng chia sẻ cho phòng khác hay sở khác thì mình mất quyền lực hoặc bị soi mói. Cán bộ giữ dữ liệu trên máy tính cá nhân, không chịu đồng bộ lên kho dữ liệu dùng chung của tỉnh.
Chúng ta cần nhận thức rõ: Dữ liệu quản lý nhà nước là tài nguyên của quốc gia, là tài sản của Nhân dân giao cho cơ quan nhà nước quản lý. Dữ liệu chỉ sinh ra giá trị khi được chia sẻ và kết nối hợp pháp. Giữ dữ liệu một mình là cản trở sự phát triển của quê hương, đất nước.

3. Chuẩn mực văn minh số của người cán bộ
Người cán bộ trong kỷ nguyên số luôn giữ gìn hình ảnh văn minh khi tham gia môi trường mạng: Không chia sẻ thông tin thất thiệt chưa qua kiểm chứng, không sử dụng thiết bị nghiệp vụ vào mục đích phi công vụ và luôn bảo vệ bí mật nhà nước trên không gian mạng.

Quy tắc vàng:
"Dữ liệu càng chia sẻ hợp pháp, giá trị tạo ra càng lớn; văn hóa số bắt đầu từ sự cởi mở và chuẩn mực."

Ở bài tiếp theo, chúng ta sẽ tìm hiểu Vai trò tiên phong và nêu gương của người đứng đầu trong chuyển đổi số. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b7": `VAI TRÒ NÊU GƯƠNG VÀ ĐỘNG LỰC DẪN DẮT CỦA NGƯỜI ĐỨNG ĐẦU

Kính thưa Quý Anh/Chị!

Chuyển đổi số là một sự thay đổi sâu sắc về phương thức làm việc và thói quen cố hữu suốt hàng chục năm. Mà con người thì luôn có xu hướng ngại thay đổi, muốn ở lại trong "vùng an toàn" quen thuộc. Chính vì vậy, chuyển đổi số chỉ có thể thành công khi có sự cam kết sắt đá và sự nêu gương quyết liệt của người đứng đầu cơ quan, đơn vị.

1. "Thủ trưởng đi trước, cơ quan tiến bước"
Nếu đồng chí Giám đốc Sở, Chủ tịch UBND huyện hay Trưởng phòng chuyên môn vẫn yêu cầu cấp dưới phải in văn bản ra giấy để ký tươi rồi mới đóng dấu, thì cấp dưới sẽ không bao giờ dám bỏ văn bản giấy. Ngược lại, nếu người lãnh đạo kiên quyết từ chối ký văn bản giấy đối với các nội dung đã quy định xử lý số, tiên phong sử dụng chữ ký số cá nhân trên điện thoại, họp hành chỉ dùng tài liệu điện tử, thì cả cơ quan sẽ tự khắc chuyển động theo. Quyết tâm chính trị của người đứng đầu phải được chuyển hóa thành những hành động số cụ thể mỗi ngày.

2. Năng lực ra quyết định dựa trên dữ liệu (Data-driven leadership)
Lãnh đạo trong thời kỳ số không chỉ lắng nghe báo cáo tổng hợp bằng miệng vào cuối tháng. Lãnh đạo số mở Dashboard quản trị lên để xem con số thực tế: Hôm nay đơn vị đã giải quyết bao nhiêu hồ sơ? Có bao nhiêu hồ sơ bị quá hạn và nguyên nhân nghẽn ở khâu nào? Tỷ lệ người dân đánh giá hài lòng là bao nhiêu phần trăm? Dữ liệu số giúp lãnh đạo nhìn rõ bức tranh công vụ thực chất, từ đó chỉ đạo chấn chỉnh kịp thời, công tâm và minh bạch.

3. Bảo vệ và khích lệ cán bộ dám đổi mới sáng tạo
Chuyển đổi số là làm những điều chưa có tiền lệ, chắc chắn sẽ có những bỡ ngỡ, khó khăn ban đầu. Người đứng đầu phải là điểm tựa vững chắc, dám chịu trách nhiệm, tạo môi trường thuận lợi và bảo vệ những cán bộ năng động, sáng tạo dám áp dụng công nghệ mới phục vụ Nhân dân.

Quy tắc vàng:
"Lãnh đạo đi đầu, cán bộ theo sau; quyết tâm chính trị chuyển hóa thành hành động số cụ thể."

Ở bài tiếp theo, chúng ta sẽ cùng tìm hiểu về Đổi mới sáng tạo trong thời đại số – cách biến những sáng kiến nhỏ thành đột phá lớn. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`,

  "cd1-b8": `ĐỔI MỚI SÁNG TẠO - TỪ SÁNG KIẾN NHỎ ĐẾN THÀNH CÔNG LỚN

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức và người lao động!

Chào mừng Quý Anh/Chị đến với bài học cuối cùng khép lại Chuyên đề 1: "Kiến thức, kỹ năng cơ bản về chuyển đổi số". Sau khi đã nắm vững bản chất của chuyển đổi số, các công nghệ nền tảng, các trụ cột chiến lược và văn hóa số, câu hỏi đặt ra là: Ngày mai, khi bước vào phòng làm việc, mỗi chúng ta có thể làm gì để tạo ra sự đổi mới?

1. Đổi mới sáng tạo bắt đầu từ những việc bình dị nhất
Nhiều cán bộ thường nghĩ rằng đổi mới sáng tạo là việc của các nhà khoa học, hay phải có các đề tài nghiên cứu cấp bộ, cấp tỉnh với ngân sách lớn. Thực tế không phải vậy! Đổi mới sáng tạo trong hành chính công bắt đầu từ sự trăn trở với những bất cập hàng ngày:
- Một biểu mẫu thủ tục hành chính quá rườm rà khiến người dân phải điền đi điền lại? Hãy thử đề xuất số hóa thành form điện tử tự động điền sẵn thông tin.
- Việc thống kê báo cáo số liệu thủ công khiến anh chị em phòng chuyên môn phải làm thêm giờ suốt tuần? Hãy lập một bảng tính Excel/Google Sheets dùng chung có công thức tự động tổng hợp.
- Người dân đến bộ phận Một cửa hay hỏi những câu hỏi giống nhau? Hãy in một mã QR hướng dẫn thủ tục dán ở sảnh, hoặc tạo một trang Zalo Official Account trả lời tự động 24/7.

Đó chính là đổi mới sáng tạo số thiết thực! Những sáng kiến nhỏ đó không tốn kém ngân sách nhưng mang lại niềm vui lớn cho người dân và tiết kiệm công sức cho đồng nghiệp.

2. Quy trình 4 bước biến sáng kiến thành hiện thực:
- Bước 1: Phát hiện "nút thắt" – Quan sát xem khâu nào đang tốn nhiều thời gian, giấy tờ hay nhận nhiều phản ánh của người dân nhất.
- Bước 2: Tìm giải pháp số tinh gọn – Lựa chọn những công cụ số đơn giản, dễ dùng, có sẵn để tháo gỡ nút thắt đó.
- Bước 3: Thử nghiệm quy mô nhỏ – Triển khai thử nghiệm trong tổ chuyên môn, lắng nghe phản hồi của người dùng để điều chỉnh ngay.
- Bước 4: Đánh giá và nhân rộng – Báo cáo lãnh đạo đơn vị kết quả cụ thể (giảm được bao nhiêu giờ, tiết kiệm bao nhiêu chi phí) để nhân rộng toàn cơ quan.

3. Lời kết Chuyên đề 1
Chuyển đổi số không phải là đích đến, mà là một hành trình liên tục. Mỗi cán bộ, công chức tỉnh Gia Lai chúng ta, dù ở vị trí công tác nào, đều mang trong mình sứ mệnh phụng sự Nhân dân và Tổ quốc bằng cả trái tim và trí tuệ số.

Quy tắc vàng của bài học:
"Mỗi sáng kiến số nhỏ hàng ngày tích lũy thành bước chuyển biến lớn của nền hành chính hiện đại."

Chúc mừng Quý Anh/Chị đã hoàn thành trọn vẹn toàn bộ 8 bài học của Chuyên đề 1! Hãy vững tin bước tiếp sang Chuyên đề 2: Kiến thức công nghệ số cơ bản. Xin chân thành cảm ơn và kính chúc Quý Anh/Chị dồi dào sức khỏe, hạnh phúc và thành công trên con đường phụng sự!`,

  "cd3-b1": `TỔNG QUAN VỀ TRÍ TUỆ NHÂN TẠO (AI) VÀ CƠ HỘI ĐỘT PHÁ CÔNG VỤ

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức!

Chúng ta đang sống trong giai đoạn bùng nổ mạnh mẽ nhất của Trí tuệ nhân tạo (AI) trong lịch sử nhân loại. Từ chỗ là một môn khoa học trong phòng thí nghiệm, AI nay đã bước thẳng vào văn phòng công sở, hỗ trợ cán bộ xử lý những tập tài liệu dày hàng trăm trang chỉ trong vài giây.

1. AI là gì dưới góc nhìn hành chính công vụ?
AI không phải là một "vị thần biết tuốt", cũng không phải là cỗ máy có cảm xúc hay ý thức. Về bản chất, AI là hệ thống phần mềm được huấn luyện trên lượng dữ liệu khổng lồ để nhận diện quy luật, xử lý ngôn ngữ và đưa ra các đề xuất, dự thảo dựa trên xác suất logic cao nhất.
Trong cơ quan nhà nước, AI đóng vai trò như một "chuyên viên thực tập mẫn cán, tốc độ cao":
- Soạn thảo bản nháp công văn, kế hoạch theo dàn ý cho trước;
- Tóm tắt báo cáo dài 50 trang thành 1 trang cô đọng;
- Tra cứu nhanh các điều khoản luật liên quan đến hồ sơ đang giải quyết;
- Chuyển đổi giọng nói trong các cuộc họp thành biên bản dạng văn bản.

2. Khung pháp lý mới: Luật Trí tuệ nhân tạo (Luật số 134/2025/QH15)
Quốc hội khóa XV đã ban hành Luật Trí tuệ nhân tạo số 134/2025/QH15 nhằm tạo hành lang pháp lý an toàn, minh bạch cho việc phát triển và ứng dụng AI. Luật quy định rõ:
- AI được phân loại theo cấp độ rủi ro (Rủi ro không thể chấp nhận, Rủi ro cao, Rủi ro trung bình và Rủi ro thấp).
- Trong cơ quan nhà nước, mọi quyết định hành chính ảnh hưởng trực tiếp đến quyền và lợi ích hợp pháp của công dân bắt buộc phải do con người phê duyệt, AI tuyệt đối không được phép tự động ra quyết định thay thế thẩm quyền của cán bộ.

3. Nguyên tắc vàng: "AI làm nhanh, con người làm chuẩn"
AI có thể viết xong bản nháp trong 5 giây, nhưng AI không chịu trách nhiệm pháp lý trước pháp luật, trước lãnh đạo cơ quan hay trước Nhân dân. Người ký tên, người đóng dấu mộc đỏ, người chịu trách nhiệm kỷ luật và hình sự luôn luôn là con người. Do đó, nguyên tắc bất di bất dịch của chúng ta là: Luôn đọc kỹ, thẩm định, đối chiếu văn bản quy phạm pháp luật gốc trước khi sử dụng sản phẩm do AI gợi ý.

Ở bài tiếp theo, tôi sẽ cùng Anh/Chị tìm hiểu chi tiết nguyên tắc cốt tử: "Dữ liệu nào, công cụ đó" khi sử dụng AI trong công vụ. Xin chân thành cảm ơn và hẹn gặp lại Quý Anh/Chị!`
};

/**
 * Generates or retrieves the complete, authoritative lecture transcript for any lesson.
 */
export function getLessonFullLecture(lesson: Lesson, topic?: Topic): string {
  // If explicitly provided in the database, return it directly
  if (lesson.fullContent && lesson.fullContent.trim().length > 0) {
    return lesson.fullContent;
  }

  // If we have a dedicated script in our dictionary, return it
  if (DETAILED_LECTURE_SCRIPTS[lesson.id]) {
    return DETAILED_LECTURE_SCRIPTS[lesson.id];
  }

  // Otherwise, construct a rich, highly structured, pedagogical lecture text
  const topicTitle = topic?.title || `Chuyên đề ${lesson.topicId}`;
  const objectivesFormatted = lesson.objectives
    .map((o, idx) => `  ${idx + 1}. ${o}`)
    .join("\n");

  const legalBasesText = lesson.legalBases && lesson.legalBases.length > 0
    ? lesson.legalBases.join(", ")
    : "Nghị quyết số 398/NQ-UBTVQH16 và các quy định quản lý chuyên ngành hiện hành";

  return `${lesson.title.toUpperCase()} - BÀI HỌC THỰC TIỄN CHO CÔNG VIÊN CHỨC

Kính thưa Quý Anh/Chị cán bộ, công chức, viên chức và người lao động!

Chào mừng Quý Anh/Chị đến với Bài học số ${lesson.lessonNumber} thuộc ${topicTitle}: "${lesson.title}". Đây là nội dung trọng tâm trong Khung bồi dưỡng kỹ năng số công vụ theo tinh thần chỉ đạo của Ủy ban Thường vụ Quốc hội tại Nghị quyết số 398/NQ-UBTVQH16 và Quyết định của Thủ tướng Chính phủ.

1. Mục tiêu trọng tâm của bài giảng:
${objectivesFormatted}

2. Nội dung lý luận và thực tiễn nghiệp vụ:
${lesson.summary}

Trong thực tiễn giải quyết công vụ hàng ngày tại các cơ quan, đơn vị, bài học này đặt ra những yêu cầu cụ thể đối với mỗi cán bộ:
- Không ngừng chuẩn hóa tác phong làm việc trên môi trường số, chuyển đổi từ phương thức xử lý thủ công, giấy tờ phân tán sang quy trình liên thông số hóa toàn trình.
- Đảm bảo tính chính xác, kịp thời và toàn vẹn của dữ liệu trong từng thao tác tác nghiệp, coi việc xây dựng và cập nhật dữ liệu sạch là trách nhiệm công vụ bắt buộc.
- Tuân thủ nghiêm ngặt các quy định pháp luật hiện hành, đặc biệt là: ${legalBasesText}.

3. Tình huống công vụ và mô hình áp dụng:
${lesson.illustrationText ? `Mô hình chuẩn hóa: ${lesson.illustrationText}\n\n` : ""}Khi đối mặt với các tình huống nghiệp vụ phức tạp trên không gian số, cán bộ công chức cần giữ vững nguyên tắc bảo mật, chủ động phối hợp với các cơ quan chuyên môn và đặt lợi ích của Nhân dân, doanh nghiệp lên trên hết.

4. Quy tắc vàng và thông điệp hành động:
"${lesson.keyActionMessage}"

Xin trân trọng cảm ơn Quý Anh/Chị đã chú ý theo dõi bài giảng. Chúc Quý Anh/Chị tiếp thu hiệu quả và vận dụng thành công vào công tác chuyên môn tại cơ quan, đơn vị!`;
}
