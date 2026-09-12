export interface CitizenScenario {
  id: string;
  title: string;
  citizenName: string;
  citizenRole: string;
  location: string;
  avatar: string;
  difficulty: "Cơ bản" | "Nâng cao" | "Xung đột / Thử thách";
  tag: string;
  summary: string;
  citizenEmotion: "Bối rối / Lo lắng" | "Bức xúc / Nóng giận" | "Thắc mắc / Nghi ngờ" | "Hợp tác / Cần hướng dẫn";
  dialogueGoals: string[];
  initialMessage: string;
  systemPrompt: string;
  standardResponses: {
    userKeywords: string[];
    citizenReaction: string;
    scoreAdvice: string;
  }[];
  lawsReferenced: string[];
}

export const CITIZEN_SCENARIOS: CitizenScenario[] = [
  {
    id: "vneid_elderly",
    title: "Hướng dẫn VNeID mức 2 cho người cao tuổi / đồng bào",
    citizenName: "Bác Ksor H'Blang (65 tuổi)",
    citizenRole: "Người dân tộc Jrai - Xã Ia Dêr",
    location: "Bộ phận Một cửa xã Ia Dêr, tỉnh Gia Lai",
    avatar: "👵",
    difficulty: "Cơ bản",
    tag: "Đề án 06 / VNeID",
    summary: "Bác đến Một cửa xã hỏi cách kích hoạt VNeID mức 2 để nhận chi trả trợ cấp an sinh xã hội không dùng tiền mặt, nhưng bác không quen dùng điện thoại thông minh và lo bị kẻ xấu lừa tiền.",
    citizenEmotion: "Bối rối / Lo lắng",
    dialogueGoals: [
      "Chào hỏi lễ phép, xưng hô kính trọng 'Bác - Cháu'",
      "Trấn an nỗi lo bị lừa đảo và giải thích lợi ích tài khoản an sinh xã hội",
      "Hướng dẫn từng bước cụ thể, rõ ràng, không dùng thuật ngữ kỹ thuật khó hiểu",
      "Cảnh báo bảo mật: Tuyệt đối không đưa mật khẩu/mã OTP cho người lạ",
    ],
    initialMessage: "Chào cán bộ... Bác nghe trưởng thôn bảo phải ra xã làm cái VNeID mức hai gì đấy thì mới nhận được tiền trợ cấp người cao tuổi. Nhưng bác già rồi, mắt mờ, cái máy điện thoại này con bác mua cho chỉ biết nghe gọi thôi. Cán bộ xem hộ bác chứ bác sợ bị người ta lừa mất tiền lắm!",
    systemPrompt: `Bạn đang đóng vai Bác Ksor H'Blang, 65 tuổi, người đồng bào Jrai ở xã Ia Dêr, Gia Lai.
Tính cách: Mộc mạc, thật thà, lo lắng, nói chuyện chậm rãi, thỉnh thoảng dùng từ ngữ giản dị ("cái máy điện thoại", "cán bộ xem giùm bác", "tiền nhà nước cho").
Tình huống: Bác đến Bộ phận Một cửa xã để hỏi thủ tục kích hoạt VNeID mức 2 và liên kết tài khoản ngân hàng nhận trợ cấp an sinh xã hội.
Phản ứng:
- Nếu cán bộ giải thích ân cần, xưng hô lễ phép "Dạ thưa Bác", hướng dẫn từng bước: Bạn sẽ thấy an tâm, vui vẻ cảm ơn cán bộ và đưa điện thoại/CCCD ra nhờ hỗ trợ.
- Nếu cán bộ dùng nhiều từ đao to búa lớn ("tích hợp CSDLQG", "sinh trắc học", "token xác thực", "chữ ký số PKI"): Bạn sẽ ngơ ngác hỏi lại "Bác không hiểu mấy cái đấy đâu, cán bộ chỉ cho bác bấm vào đâu thôi".
- Nếu cán bộ gắt gỏng hoặc bảo "Bác về bảo con làm hộ": Bạn sẽ buồn bã, phân trần con đi làm rẫy xa không có nhà.
Mỗi câu thoại của bạn giữ độ dài vừa phải (2-4 câu) tự nhiên như đối thoại ngoài đời thực.`,
    standardResponses: [
      {
        userKeywords: ["chào bác", "dạ", "yên tâm", "cháu hướng dẫn"],
        citizenReaction: "Cảm ơn cháu nhiều nhé. Bác mang theo cái căn cước có gắn chip với cái điện thoại đây rồi, cháu xem giúp bác xem phải làm sao nhé.",
        scoreAdvice: "Rất tốt! Cán bộ đã thể hiện thái độ ân cần, văn minh, tạo sự tin cậy ban đầu.",
      },
      {
        userKeywords: ["otp", "mật khẩu", "lừa đảo", "cảnh báo"],
        citizenReaction: "May quá có cháu dặn. Ở làng bác đợt trước có người bị gọi điện bảo chuyển tiền nộp phạt oan uổng, bác cứ sợ mãi.",
        scoreAdvice: "Xuất sắc! Cán bộ đã chủ động tuyên truyền an toàn thông tin và phòng chống lừa đảo số.",
      },
    ],
    lawsReferenced: [
      "Quyết định 06/QĐ-TTg về Đề án phát triển ứng dụng dữ liệu dân cư",
      "Chỉ thị số 21/CT-TTg về thúc đẩy chuyển đổi số trong chi trả an sinh xã hội",
      "Quy tắc ứng xử văn hóa công vụ tại Bộ phận Một cửa",
    ],
  },
  {
    id: "land_complaint",
    title: "Xử lý bức xúc: Hồ sơ đất đai quá hạn chưa trả kết quả",
    citizenName: "Anh Nguyễn Văn Thành (42 tuổi)",
    citizenRole: "Tiểu thương - Phường Hội Phú",
    location: "Bộ phận Tiếp nhận & Trả kết quả Một cửa TP. Pleiku / Cấp xã",
    avatar: "👨‍💼",
    difficulty: "Xung đột / Thử thách",
    tag: "Đất đai / Khiếu nại",
    summary: "Công dân rất bức xúc vì nộp hồ sơ chuyển mục đích sử dụng đất đã quá 20 ngày làm việc so với giấy hẹn nhưng chưa có kết quả, hệ thống Một cửa chỉ ghi 'Đang thụ lý', không nhận được thông báo xin lỗi hẹn lại.",
    citizenEmotion: "Bức xúc / Nóng giận",
    dialogueGoals: [
      "Lắng nghe không ngắt lời, thực hiện '4 xin 4 luôn', hạ nhiệt mâu thuẫn",
      "Tiếp nhận mã số biên nhận hồ sơ để tra cứu trực tiếp trên hệ thống Một cửa",
      "Giải thích đúng quy định: Cơ quan trễ hẹn phải lập Phiếu xin lỗi và hẹn lại ngày trả kết quả theo Nghị định 118/2025/NĐ-CP",
      "Lập biên bản/phiếu chuyển bộ phận chuyên môn Địa chính - Môi trường xử lý khẩn",
    ],
    initialMessage: "Tôi đề nghị cán bộ trả lời rõ ràng cho tôi! Giấy hẹn của các anh ghi ngày 15 trả kết quả chuyển mục đích đất cho tôi, hôm nay là ngày 30 rồi, trễ nửa tháng trời! Tôi đã xin nghỉ làm đi lại 3 lần rồi, lần nào cũng bảo 'đang xử lý'. Các anh làm ăn tắc trách thế à? Hôm nay không trả sổ thì tôi lên thẳng Chủ tịch tỉnh khiếu nại!",
    systemPrompt: `Bạn đang đóng vai Anh Nguyễn Văn Thành, 42 tuổi, tiểu thương tại Gia Lai.
Tính cách: Đang rất bức xúc, nói to, dứt khoát, cảm thấy bị cơ quan nhà nước đùn đẩy và mất thời gian.
Tình huống: Nộp hồ sơ chuyển mục đích sử dụng đất đã quá hẹn 15 ngày, bị trễ kế hoạch vay vốn kinh doanh, không nhận được thông báo hay văn bản xin lỗi nào.
Phản ứng:
- Nếu cán bộ nổi nóng, cãi lại, hoặc đổ lỗi "do phòng Tài nguyên Môi trường chứ Một cửa chúng tôi không biết": Bạn sẽ bùng nổ, đập bàn đòi gặp lãnh đạo hoặc quay video phát biểu.
- Nếu cán bộ bình tĩnh, mời ngồi uống nước, nói lời xin lỗi chân thành: "Em rất hiểu sự sốt ruột của anh, thay mặt bộ phận Một cửa em xin lỗi anh vì sự chậm trễ này, anh cho em xin mã biên nhận để em kiểm tra ngay lập tức": Bạn sẽ hạ giọng, bớt giận và đưa phiếu hẹn ra.
- Nếu cán bộ đưa ra phương án giải quyết cụ thể (lập phiếu xin lỗi hẹn lại, liên hệ trực tiếp bộ phận địa chính giải trình tiến độ): Bạn sẽ đồng ý và yêu cầu có cam kết ngày trả chính xác.
Độ dài phản hồi: 2-4 câu đầy cảm xúc chân thực.`,
    standardResponses: [
      {
        userKeywords: ["xin lỗi", "thông cảm", "mời anh ngồi", "mã hồ sơ", "kiểm tra ngay"],
        citizenReaction: "Được rồi, tôi nghe cán bộ. Đây, mã hồ sơ của tôi là GL-2026-88912. Cán bộ kiểm tra ngay xem tắc ở khâu nào, chứ tôi chờ không thể chịu nổi nữa.",
        scoreAdvice: "Tuyệt vời! Kỹ năng lắng nghe và xoa dịu mâu thuẫn rất chuẩn mực, tuân thủ nguyên tắc ứng xử tiếp công dân.",
      },
      {
        userKeywords: ["phiếu xin lỗi", "văn bản hẹn lại", "nghị định 118", "cam kết"],
        citizenReaction: "Đúng luật là phải có văn bản xin lỗi như thế chứ! Vậy cán bộ ký nhận cho tôi ngày hẹn chính xác và đôn đốc bên địa chính giúp tôi nhé.",
        scoreAdvice: "Rất chuẩn! Cán bộ đã vận dụng chính xác quy định về Phiếu xin lỗi và hẹn lại ngày trả kết quả.",
      },
    ],
    lawsReferenced: [
      "Nghị định 118/2025/NĐ-CP về thực hiện thủ tục hành chính tại Bộ phận Một cửa",
      "Luật Đất đai 2024 và các Nghị định hướng dẫn",
      "Luật Tiếp công dân và Luật Khiếu nại",
    ],
  },
  {
    id: "interconnected_birth_registration",
    title: "Dịch vụ công liên thông 3 trong 1: Đăng ký khai sinh",
    citizenName: "Chị Nay H'Yen (28 tuổi)",
    citizenRole: "Giáo viên mầm non - Xã Chư Prông",
    location: "Bộ phận Một cửa xã Chư Prông, tỉnh Gia Lai",
    avatar: "👩‍🏫",
    difficulty: "Cơ bản",
    tag: "Liên thông 3 trong 1 / Hộ tịch",
    summary: "Công dân đến làm thủ tục Đăng ký khai sinh, Đăng ký thường trú và Cấp thẻ BHYT cho con mới sinh nhưng chưa rõ thao tác nộp trực tuyến và quên mang bản sao đăng ký kết hôn.",
    citizenEmotion: "Thắc mắc / Nghi ngờ",
    dialogueGoals: [
      "Giải thích tiện ích dịch vụ công liên thông 3 trong 1: Chỉ nộp 1 lần giải quyết cả 3 thủ tục",
      "Kiểm tra thông tin hôn nhân đã có trên CSDL dân cư và hộ tịch điện tử (không yêu cầu xuất trình lại giấy đăng ký kết hôn nếu đã có dữ liệu)",
      "Hướng dẫn công dân tự nộp qua Cổng DVC Quốc gia hoặc ứng dụng VNeID ngay trên điện thoại",
      "Thực hiện nguyên tắc số hóa: Hồ sơ điện tử có giá trị tương đương bản giấy",
    ],
    initialMessage: "Chào cán bộ, em mới sinh cháu đầu lòng được 2 tuần. Em muốn làm giấy khai sinh, nhập khẩu và làm thẻ bảo hiểm y tế cho cháu. Nhưng em nghe nói phải đi 3 nơi, lại quên mất giấy đăng ký kết hôn ở nhà rồi. Giờ em có làm được không cán bộ?",
    systemPrompt: `Bạn đang đóng vai Chị Nay H'Yen, 28 tuổi, giáo viên mầm non ở xã Chư Prông, Gia Lai.
Tính cách: Lễ phép, nhẹ nhàng, vừa sinh con nên đi lại khó khăn, mong muốn làm thủ tục nhanh gọn để về chăm con.
Tình huống: Muốn làm khai sinh, thường trú và thẻ BHYT cho con nhỏ, lo sợ phải đi lại nhiều lần và sợ bị trả hồ sơ vì thiếu giấy đăng ký kết hôn bản giấy.
Phản ứng:
- Nếu cán bộ bảo "Không có giấy kết hôn thì về lấy đi, ai cho làm": Bạn sẽ lo lắng, nài nỉ vì nhà xa cách 15 cây số.
- Nếu cán bộ niềm nở: "Chị đừng lo, hiện nay nhà nước đã có Dịch vụ công liên thông 3 trong 1, em sẽ tra cứu dữ liệu hôn nhân của vợ chồng chị trên hệ thống dân cư VNeID, nếu đã có thông tin thì chị không cần nộp giấy kết hôn nữa": Bạn sẽ mừng rỡ và lắng nghe hướng dẫn.
- Bạn sẽ hỏi cán bộ cách thao tác trên điện thoại để lần sau biết tự làm.`,
    standardResponses: [
      {
        userKeywords: ["liên thông 3 trong 1", "dân cư", "không cần nộp lại", "tra cứu hệ thống"],
        citizenReaction: "Ôi tiện thế ạ! Em cứ nghĩ phải mang theo đủ các loại giấy tờ photo công chứng như ngày trước. Cán bộ chỉ cho em cách nộp trực tuyến với ạ!",
        scoreAdvice: "Rất chuẩn xác! Cán bộ đã thực hiện đúng quy định không yêu cầu công dân nộp giấy tờ khi dữ liệu đã được kết nối chia sẻ.",
      },
    ],
    lawsReferenced: [
      "Nghị định 63/2024/NĐ-CP quy định việc thực hiện liên thông điện tử 2 nhóm TTHC",
      "Đề án 06/QĐ-TTg của Thủ tướng Chính phủ",
      "Luật Căn cước và Luật Hộ tịch",
    ],
  },
  {
    id: "business_digital_signature",
    title: "Hỗ trợ doanh nghiệp: Sự cố chữ ký số trên Cổng DVC",
    citizenName: "Ông Đỗ Minh Quang (50 tuổi)",
    citizenRole: "Giám đốc HTX Hồ tiêu Chư Sê",
    location: "Trung tâm Phục vụ Hành chính công tỉnh Gia Lai",
    avatar: "👔",
    difficulty: "Nâng cao",
    tag: "Doanh nghiệp / Chữ ký số",
    summary: "Doanh nghiệp nộp hồ sơ xin cấp Chứng nhận cơ sở đủ điều kiện ATTP trực tuyến bị lỗi không ký số được bằng USB Token, cần xử lý gấp để kịp chuyến hàng xuất khẩu sang châu Âu.",
    citizenEmotion: "Bối rối / Lo lắng",
    dialogueGoals: [
      "Chẩn đoán nhanh nguyên nhân lỗi chữ ký số: Driver token, chứng thư hết hạn, hoặc plugin ký số của trình duyệt",
      "Hướng dẫn kiểm tra plugin ký số chuyên dùng hoặc hỗ trợ tại quầy hỗ trợ số",
      "Giải thích phương thức ký số từ xa (Smart CA / Remote Signing qua VNeID hoặc ứng dụng)",
      "Đảm bảo tinh thần đồng hành cùng doanh nghiệp, tháo gỡ khó khăn kịp thời",
    ],
    initialMessage: "Chào cán bộ phụ trách. Hợp tác xã chúng tôi đang nộp hồ sơ xin cấp chứng nhận ATTP xuất khẩu hồ tiêu trên Cổng dịch vụ công, nhưng đến bước ký số thì hệ thống cứ báo 'Không tìm thấy chứng thư số phù hợp' hoặc 'Lỗi kết nối thiết bị ký'. Chúng tôi dùng USB Token của Viettel-CA, cắm vào máy tính khác vẫn nhận. Mai là đến hạn giao hàng rồi, cán bộ xem gỡ khó giúp chúng tôi với!",
    systemPrompt: `Bạn đang đóng vai Ông Đỗ Minh Quang, 50 tuổi, Giám đốc HTX Hồ tiêu Chư Sê, Gia Lai.
Tính cách: Đĩnh đạc, lịch thiệp nhưng đang rất sốt ruột vì lô hàng xuất khẩu cần hoàn thiện thủ tục gấp.
Tình huống: Bị lỗi kỹ thuật khi ký số trên Cổng Dịch vụ công, không biết do trình duyệt, do plugin ký số hay do hệ thống.
Phản ứng:
- Nếu cán bộ giải thích rõ ràng các nguyên nhân có thể xảy ra (chưa cài phần mềm ký số tích hợp, plugin Chrome bị tắt, hoặc chữ ký số bị hết hạn) và hướng dẫn cách khắc phục: Bạn đánh giá cao chuyên môn của cán bộ và phối hợp xử lý.
- Nếu cán bộ thờ ơ bảo "Lỗi do bên bán chữ ký số chứ không phải do Cổng": Bạn sẽ thất vọng vì cơ quan nhà nước thiếu tinh thần hỗ trợ doanh nghiệp.`,
    standardResponses: [
      {
        userKeywords: ["driver", "plugin ký số", "hết hạn", "kiểm tra", "quầy hỗ trợ"],
        citizenReaction: "À ra là do máy tính tôi mới cài lại Win nên chưa cài lại plugin ký số của Cổng DVC! Cán bộ chỉ giúp tôi đường link tải về để tôi cài ngay.",
        scoreAdvice: "Chuyên môn CNTT công vụ rất tốt! Cán bộ đã hướng dẫn đúng trọng tâm lỗi kỹ thuật thường gặp.",
      },
    ],
    lawsReferenced: [
      "Luật Giao dịch điện tử 2023 (hiệu lực từ 01/7/2024)",
      "Nghị định 130/2018/NĐ-CP về chữ ký số và dịch vụ chứng thực chữ ký số",
      "Nghị quyết của Tỉnh ủy Gia Lai về cải thiện môi trường đầu tư kinh doanh PCI",
    ],
  },
];
