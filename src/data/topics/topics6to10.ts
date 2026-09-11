import { Topic } from "../../types";

export const TOPICS_6_TO_10: Topic[] = [
  {
    id: 6,
    number: 6,
    title: "Tìm kiếm, duyệt và lọc dữ liệu, thông tin số",
    description: "Cú pháp tìm kiếm nâng cao trên Internet, kiểm chứng và đánh giá độ tin cậy của nguồn tin, phương pháp sắp xếp quản lý tài liệu số cá nhân khoa học.",
    category: "Thông tin & Dữ liệu",
    pageRange: "Trang 140 - 151",
    lessonCount: 3,
    lessons: [
      {
        id: "cd6-b1",
        topicId: 6,
        lessonNumber: 1,
        title: "Kỹ năng tìm kiếm thông tin hiệu quả trên Internet",
        objectives: [
          "Sử dụng thành thạo các toán tử tìm kiếm chuyên sâu (site:, filetype:, \"cụm từ chính xác\", OR, -)",
          "Tìm kiếm nhanh văn bản quy phạm pháp luật và số liệu thống kê chính thức",
          "Tránh các kết quả quảng cáo và trang web giả mạo cơ quan nhà nước"
        ],
        summary: "Tìm kiếm thông tin trên Internet là kỹ năng then chốt của cán bộ tham mưu. Sử dụng toán tử tìm kiếm giúp định vị chính xác tài liệu cần tìm mà không bị nhiễu bởi hàng triệu kết quả rác. Ví dụ: `filetype:pdf \"Nghị quyết 398\" site:chinhphu.vn` sẽ chỉ trả về tệp PDF chính thức trên Cổng TTĐT Chính phủ. Cán bộ cần nhận diện đuôi tên miền quốc gia `.gov.vn` để đảm bảo nguồn tin cậy.",
        keyActionMessage: "Tìm kiếm thông minh: Dùng toán tử site:gov.vn và filetype:pdf để lấy văn bản gốc chính xác.",
        legalBases: ["Quy chế quản lý và sử dụng thông tin trên mạng Internet"],
        illustrationText: "Toán tử: site:gov.vn (Tìm trong trang nhà nước) + filetype:pdf (Chỉ lấy file văn bản) + \"Cụm từ\".",
        questions: [
          {
            id: "cd6-b1-q1",
            type: "knowledge",
            question: "Cú pháp tìm kiếm nào sau đây trên Google giúp tìm chính xác tệp văn bản PDF của Chỉ thị số 14 trên cổng thông tin của chính phủ?",
            options: [
              "Chỉ thị 14 mới nhất hôm nay",
              "site:chinhphu.vn filetype:pdf \"Chỉ thị 14/CT-TTg\"",
              "tìm pdf chỉ thị 14 nhanh lên",
              "chinhphu.vn download all"
            ],
            correctAnswerIndex: 1,
            explanation: "Toán tử site: giới hạn trong tên miền chính thức và filetype: lọc đúng định dạng tệp PDF."
          }
        ]
      },
      {
        id: "cd6-b2",
        topicId: 6,
        lessonNumber: 2,
        title: "Kiểm chứng và đánh giá độ tin cậy của thông tin",
        objectives: [
          "Áp dụng quy tắc 5 bước kiểm chứng nguồn tin (Tác giả, Cơ quan chủ quản, Ngày xuất bản, Căn cứ pháp lý, Mục đích xuất bản)",
          "Phân biệt rõ giữa 'Thông tin chính thống' và 'Ý kiến cá nhân/Diễn đàn mạng'",
          "Tuyệt đối không đưa thông tin chưa kiểm chứng vào hồ sơ tham mưu, báo cáo lãnh đạo"
        ],
        summary: "Trong thời đại bùng nổ thông tin, độ tin cậy của tài liệu tham mưu quyết định sinh mệnh pháp lý của văn bản quản lý nhà nước. Cán bộ phải luôn đối chiếu thông tin qua ít nhất hai nguồn chính thống độc lập (Cổng TTĐT cơ quan nhà nước, Công báo, CSDL văn bản quốc gia). Bất kỳ trích dẫn nào không có số hiệu văn bản, ngày ban hành hoặc từ nguồn nặc danh đều không được đưa vào báo cáo.",
        keyActionMessage: "Kiểm chứng trước khi trích dẫn: Một thông tin sai lệch trong văn bản tham mưu sẽ dẫn đến hậu quả pháp lý nghiêm trọng.",
        legalBases: ["Luật Tiếp cận thông tin", "Nghị định 30/2020/NĐ-CP"],
        illustrationText: "Tiếp nhận thông tin -> Kiểm tra tên miền (.gov.vn) -> Tra số hiệu ngày ban hành -> Đối chiếu bản gốc.",
        questions: [
          {
            id: "cd6-b2-q1",
            type: "scenario",
            question: "Khi đọc được một thông tin trên mạng xã hội Facebook về chính sách tiền lương mới có trích dẫn lời lãnh đạo, để đưa vào tài liệu tham mưu, cán bộ phải làm gì?",
            options: [
              "Sao chép ngay vào báo cáo vì thấy có nhiều lượt thích (like) và bình luận",
              "Tìm bản gốc văn bản quy phạm pháp luật hoặc thông cáo báo chí chính thức trên Cổng TTĐT Chính phủ/Bộ Nội vụ để đối chiếu",
              "Hỏi ý kiến bạn bè trên mạng",
              "Chia sẻ bài viết lên trang cá nhân của mình"
            ],
            correctAnswerIndex: 1,
            explanation: "Thông tin mạng xã hội chỉ mang tính tham khảo ban đầu; văn bản tham mưu công vụ bắt buộc phải căn cứ vào văn bản chính thức."
          }
        ]
      },
      {
        id: "cd6-b3",
        topicId: 6,
        lessonNumber: 3,
        title: "Quản lý và lưu trữ thông tin số cá nhân khoa học",
        objectives: [
          "Xây dựng cây thư mục (Folder Structure) quản lý công việc theo năm/lĩnh vực/hồ sơ chuẩn mực",
          "Đặt tên tệp tin (File Naming) theo cấu trúc chuẩn: [NămThángNgày]_[LoạiVB]_[SốHiệu]_[TrichYeu]_[PhienBan]",
          "Thực hiện dọn dẹp và phân loại tài liệu làm việc hàng tuần"
        ],
        summary: "Quản lý dữ liệu khoa học giúp cán bộ tiết kiệm hàng chục giờ tìm kiếm tài liệu mỗi tuần. Quy tắc đặt tên tệp chuẩn là: NămThángNgày_LoạiVB_TrichYeu_vX (Ví dụ: `20260425_BC_ChuyenDoiSo_v1.0.docx`). Không đặt tên file vô nghĩa như `vanban1.docx`, `banchot.docx`. Cây thư mục được phân cấp rõ ràng theo năm và lĩnh vực nghiệp vụ giúp công việc luôn ngăn nắp, dễ bàn giao.",
        keyActionMessage: "Đặt tên file chuẩn, lưu thư mục khoa học: Tìm lại tài liệu sau 5 năm vẫn chỉ mất 5 giây.",
        legalBases: ["Quy định về lập hồ sơ và nộp lưu hồ sơ, tài liệu điện tử vào Lưu trữ cơ quan"],
        illustrationText: "Cây thư mục: [Năm 2026] / [Báo cáo] / [Quý 2] / 20260425_BC_ChuyenDoiSo_v1.0.docx.",
        questions: [
          {
            id: "cd6-b3-q1",
            type: "knowledge",
            question: "Cách đặt tên tệp tin tài liệu nào sau đây là khoa học, chuyên nghiệp nhất trong cơ quan nhà nước?",
            options: [
              "tailieu_moinhat_banchot_sua.docx",
              "20260910_BC_DanhGiaNangLucSo_v1.0.pdf",
              "abcxyz.pdf",
              "file1(1).docx"
            ],
            correctAnswerIndex: 1,
            explanation: "Tên file chuẩn có ngày tháng chuẩn quốc tế ISO (YYYYMMDD), thể loại, trích yếu ngắn gọn và phiên bản kiểm soát."
          }
        ]
      }
    ]
  },
  {
    id: 7,
    number: 7,
    title: "Đánh giá, kiểm chứng và xác thực dữ liệu, thông tin số",
    description: "Nhận diện tin giả, tin sai lệch, công cụ xác thực hình ảnh video (Deepfake), tính toàn vẹn dữ liệu, thủ đoạn lừa đảo trực tuyến và trách nhiệm chia sẻ thông tin công vụ.",
    category: "Thông tin & Dữ liệu",
    pageRange: "Trang 152 - 170",
    lessonCount: 5,
    lessons: [
      {
        id: "cd7-b1",
        topicId: 7,
        lessonNumber: 1,
        title: "Nhận diện tin giả, thông tin sai lệch trên không gian mạng",
        objectives: [
          "Phân biệt Tin giả cố ý (Disinformation) và Thông tin sai lệch vô ý (Misinformation)",
          "Nhận diện các dấu hiệu điển hình của tin giả (tiêu đề giật gân, lỗi chính tả, địa chỉ web mạo danh)",
          "Thực hiện quy trình 4 không: Không tin ngay - Không chia sẻ - Không bình luận - Không lan truyền"
        ],
        summary: "Tin giả trên không gian mạng thường đánh vào tâm lý hoang mang, bức xúc hoặc sự hiếu kỳ của công chúng. Các dấu hiệu nhận diện: Tiêu đề giật gân, kêu gọi chia sẻ khẩn cấp, địa chỉ web thêm đuôi lạ (ví dụ: `.vn.com`, `.net.xyz`), hình ảnh cắt ghép, không dẫn nguồn hoặc dẫn nguồn mơ hồ 'theo chuyên gia'. Cán bộ công chức phải là tấm lá chắn, tuyệt đối không tiếp tay lan truyền thông tin sai lệch.",
        keyActionMessage: "Quy tắc 4 KHÔNG với tin giả: Không tin ngay - Không vội chia sẻ - Không kích động - Không vi phạm pháp luật.",
        legalBases: ["Luật An ninh mạng năm 2018", "Nghị định số 15/2020/NĐ-CP"],
        illustrationText: "Dấu hiệu tin giả: Tiêu đề giật gân, URL lạ, hình cắt ghép -> Dừng lại, đối chiếu trang báo chính thống.",
        questions: [
          {
            id: "cd7-b1-q1",
            type: "knowledge",
            question: "Khi nhận được một thông tin gây sốc lan truyền trên mạng xã hội chưa rõ thực hư, hành động đúng đắn nhất của cán bộ là gì?",
            options: [
              "Chia sẻ ngay lên trang cá nhân và các nhóm chat để cảnh báo mọi người",
              "Bình luận thêm bớt suy đoán của mình vào bài viết",
              "Bình tĩnh, không bấm chia sẻ, kiểm tra đối chiếu trên Cổng TTĐT chính thống và báo chí cách mạng",
              "Lưu về gửi cho người dân"
            ],
            correctAnswerIndex: 2,
            explanation: "Không vội chia sẻ thông tin chưa kiểm chứng là trách nhiệm công dân và chuẩn mực văn hóa công vụ."
          }
        ]
      },
      {
        id: "cd7-b2",
        topicId: 7,
        lessonNumber: 2,
        title: "Phương pháp và công cụ kiểm chứng hình ảnh, video",
        objectives: [
          "Sử dụng công cụ tìm kiếm ngược bằng hình ảnh (Google Reverse Image Search, TinEye)",
          "Nhận diện video, giọng nói giả mạo bằng công nghệ Deepfake AI",
          "Kiểm tra siêu dữ liệu ảnh (EXIF data) để xác định thời gian và thiết bị chụp"
        ],
        summary: "Công nghệ Deepfake cho phép kẻ xấu tạo video giả mạo khuôn mặt và giọng nói của lãnh đạo, người thân để lừa đảo hoặc bôi nhọ uy tín cơ quan. Để nhận diện Deepfake: Quan sát các vùng biên khuôn mặt, chuyển động chớp mắt không tự nhiên, khẩu hình miệng không khớp tiếng nói, ánh sáng bóng đổ bất thường. Dùng Google Lens tìm kiếm ngược để biết bức ảnh gốc được chụp từ bao giờ và ở đâu.",
        keyActionMessage: "Nhận diện Deepfake: Quan sát chuyển động mắt, khẩu hình và luôn gọi điện xác thực lại bằng kênh độc lập.",
        legalBases: ["Cảnh báo an ninh mạng của Cục An toàn thông tin - Bộ TT&TT"],
        illustrationText: "Nghi ngờ ảnh/video -> Tìm kiếm ngược bằng Google Lens -> Soi cử động mắt và khẩu hình -> Gọi trực tiếp xác minh.",
        questions: [
          {
            id: "cd7-b2-q1",
            type: "knowledge",
            question: "Dấu hiệu nào sau đây thường xuất hiện trong các video Deepfake sử dụng AI giả mạo khuôn mặt?",
            options: [
              "Chuyển động chớp mắt bất thường, viền khuôn mặt hơi mờ rung, khẩu hình không khớp hoàn toàn với ngữ âm",
              "Video có độ nét quá cao",
              "Âm thanh có tiếng chim hót",
              "Thời lượng video dài hơn 1 phút"
            ],
            correctAnswerIndex: 0,
            explanation: "Deepfake thường gặp lỗi khi xử lý cử động chớp mắt tự nhiên và khớp khẩu hình với ngữ điệu âm thanh."
          }
        ]
      },
      {
        id: "cd7-b3",
        topicId: 7,
        lessonNumber: 3,
        title: "Xác thực nguồn gốc và tính toàn vẹn của dữ liệu số",
        objectives: [
          "Hiểu nguyên lý kiểm tra chữ ký số và mã băm toàn vẹn (Hash SHA-256, MD5)",
          "Kiểm tra tính hợp lệ của chứng thư số trên tệp văn bản điện tử PDF",
          "Nhận biết tình trạng văn bản bị sửa đổi nội dung sau khi đã ký duyệt"
        ],
        summary: "Văn bản điện tử trong cơ quan nhà nước có giá trị pháp lý khi được ký số hợp lệ theo Luật Giao dịch điện tử. Khi mở tệp PDF trên phần mềm chuyên dụng (Acrobat Reader, phần mềm ký số Ban Cơ yếu Chính phủ), nếu có thông báo 'Signature Valid' và không bị sửa đổi thì văn bản giữ nguyên tính toàn vẹn. Nếu có cảnh báo văn bản đã bị chỉnh sửa sau khi ký, văn bản đó mất giá trị pháp lý.",
        keyActionMessage: "Kiểm tra dấu kiểm chữ ký số hợp lệ: Văn bản số chỉ có giá trị pháp lý khi chứng thư số còn hiệu lực và toàn vẹn.",
        legalBases: ["Luật Giao dịch điện tử năm 2023", "Nghị định số 130/2018/NĐ-CP"],
        illustrationText: "Mở PDF -> Bấm vào dấu chữ ký số -> Kiểm tra chứng thư số và thông báo 'Document has not been modified'.",
        questions: [
          {
            id: "cd7-b3-q1",
            type: "knowledge",
            question: "Khi mở một công văn điện tử dạng PDF, làm thế nào để biết văn bản có bị ai đó chỉnh sửa sau khi lãnh đạo đã ký số hay không?",
            options: [
              "Nhìn bằng mắt thường xem chữ có đẹp không",
              "Phần mềm đọc PDF sẽ hiển thị trạng thái chữ ký số: Báo lỗi hoặc cảnh báo 'Document has been altered or modified'",
              "In ra giấy xem có bị lem mực không",
              "Gửi qua Zalo hỏi người gửi"
            ],
            correctAnswerIndex: 1,
            explanation: "Chữ ký số sử dụng mật mã mã hóa; bất kỳ sự thay đổi dù chỉ 1 dấu chấm sau khi ký sẽ làm hỏng chữ ký số ngay lập tức."
          }
        ]
      },
      {
        id: "cd7-b4",
        topicId: 7,
        lessonNumber: 4,
        title: "Nhận diện các hình thức lừa đảo trên không gian mạng",
        objectives: [
          "Nhận diện các kịch bản lừa đảo phổ biến: Giả danh cơ quan tư pháp/công an, mạo danh lãnh đạo lừa chuyển tiền, đường link độc hại (Phishing)",
          "Nhận biết các trang web mạo danh cổng dịch vụ công trực tuyến",
          "Biết cách xử lý và báo cáo cơ quan chức năng khi phát hiện lừa đảo"
        ],
        summary: "Tội phạm mạng ngày càng tinh vi với các thủ đoạn: Giả mạo tin nhắn thương hiệu (SMS Brandname), giả mạo thông báo cài đặt app VNeID chứa mã độc, gọi video mạo danh công an dọa bắt giữ yêu cầu chuyển tiền vào 'tài khoản an toàn'. Cán bộ cần ghi nhớ: Cơ quan công an và tư pháp không bao giờ làm việc, yêu cầu chuyển tiền qua điện thoại hoặc gửi lệnh bắt qua Zalo.",
        keyActionMessage: "Tuyệt đối không chuyển tiền theo yêu cầu qua điện thoại; cơ quan pháp luật không làm việc qua Zalo hay mạng xã hội.",
        legalBases: ["Cảnh báo phương thức thủ đoạn tội phạm mạng của Bộ Công an"],
        illustrationText: "Kẻ mạo danh hù dọa/gửi link lạ -> Giữ bình tĩnh, không bấm link, không chuyển tiền -> Gọi ngay đường dây nóng công an.",
        questions: [
          {
            id: "cd7-b4-q1",
            type: "scenario",
            question: "Một số điện thoại lạ gọi đến tự xưng là cán bộ Công an tỉnh, thông báo tài khoản của Anh/Chị liên quan đến đường dây rửa tiền và yêu cầu cài đặt một ứng dụng lạ qua file .APK để 'xác minh'. Anh/Chị xử lý thế nào?",
            options: [
              "Lo lắng và làm theo hướng dẫn ngay lập tức",
              "Tuyệt đối không cài đặt ứng dụng lạ, tắt máy và liên hệ ngay với cơ quan công an nơi gần nhất để trình báo",
              "Cung cấp số tài khoản ngân hàng và mã OTP",
              "Vay mượn tiền để chuyển vào tài khoản họ yêu cầu"
            ],
            correctAnswerIndex: 1,
            explanation: "Đây là thủ đoạn lừa đảo mạo danh cơ quan chức năng để cài mã độc chiếm quyền điều khiển điện thoại đánh cắp tài khoản."
          }
        ]
      },
      {
        id: "cd7-b5",
        topicId: 7,
        lessonNumber: 5,
        title: "Trách nhiệm của cán bộ trong tiếp nhận, xử lý và chia sẻ thông tin",
        objectives: [
          "Nắm vững các hành vi bị nghiêm cấm trên không gian mạng theo Luật An ninh mạng",
          "Thực hiện trách nhiệm nêu gương của cán bộ, đảng viên trên mạng xã hội",
          "Bảo đảm nguyên tắc: 'Mỗi cán bộ là một tuyên truyền viên tích cực, lan tỏa thông tin tích cực, đẩy lùi thông tin xấu độc'"
        ],
        summary: "Cán bộ, công chức khi tham gia môi trường số không chỉ đại diện cho cá nhân mà còn gắn liền với hình ảnh của cơ quan nhà nước. Tuyệt đối không đăng tải, chia sẻ tài liệu mật, thông tin nội bộ chưa được phép công bố, hay các bình luận mang tính quy chụp, tiêu cực. Tích cực chia sẻ các chủ trương chính sách đúng đắn, mô hình hay để tạo dòng thông tin tích cực bảo vệ nền tảng tư tưởng.",
        keyActionMessage: "Chiếc áo công vụ không cởi ra trên mạng: Lời nói, hành vi trên không gian số gắn liền với trách nhiệm cán bộ.",
        legalBases: ["Quy định số 85-QĐ/TW của Ban Bí thư về việc cán bộ, đảng viên thiết lập và sử dụng trang thông tin điện tử cá nhân trên Internet"],
        illustrationText: "Chuẩn mực phát ngôn số -> Lan tỏa thông tin chính thống tích cực -> Không chia sẻ tin nội bộ/tin đồn xấu độc.",
        questions: [
          {
            id: "cd7-b5-q1",
            type: "knowledge",
            question: "Theo Quy định số 85-QĐ/TW của Ban Bí thư, cán bộ, đảng viên bị nghiêm cấm thực hiện hành vi nào sau đây trên không gian mạng?",
            options: [
              "Đăng tải thông tin quảng bá danh lam thắng cảnh quê hương",
              "Đăng tải, lưu trữ, phát tán thông tin xấu độc, tài liệu nội bộ, thông tin chưa được kiểm chứng làm ảnh hưởng đến uy tín của Đảng và Nhà nước",
              "Tham gia các nhóm học tập nghiệp vụ chuyên môn",
              "Đọc tin tức trên các báo chính thống"
            ],
            correctAnswerIndex: 1,
            explanation: "Phát tán thông tin xấu độc, tài liệu nội bộ là hành vi bị nghiêm cấm và bị xử lý nghiêm minh theo quy định kỷ luật của Đảng và pháp luật."
          }
        ]
      }
    ]
  },
  {
    id: 8,
    number: 8,
    title: "Quản lý, tổ chức và lưu trữ dữ liệu số",
    description: "Khung quản lý dữ liệu trong cơ quan nhà nước, thu thập chuẩn hóa, lưu trữ sao lưu dữ liệu an toàn (quy tắc 3-2-1), khai thác phân tích, chia sẻ dữ liệu mở và quy trình hủy dữ liệu an toàn.",
    category: "Thông tin & Dữ liệu",
    pageRange: "Trang 171 - 195",
    lessonCount: 6,
    lessons: [
      {
        id: "cd8-b1",
        topicId: 8,
        lessonNumber: 1,
        title: "Tổng quan về quản lý dữ liệu trong cơ quan nhà nước",
        objectives: [
          "Xác định dữ liệu là tài nguyên chiến lược quốc gia và tài sản công",
          "Hiểu kiến trúc dữ liệu và mô hình kho dữ liệu dùng chung cấp tỉnh/bộ",
          "Nắm vững các nguyên tắc cốt lõi: 'Đúng - Đủ - Sạch - Sống' trong quản lý dữ liệu"
        ],
        summary: "Dữ liệu được xác định là nguồn tài nguyên mới của nền kinh tế số. Quản trị dữ liệu trong cơ quan nhà nước nhằm bảo đảm dữ liệu luôn 'Đúng - Đủ - Sạch - Sống'. 'Đúng' là thông tin chính xác; 'Đủ' là không thiếu trường thông tin cốt lõi; 'Sạch' là không trùng lặp, chuẩn hóa định dạng; 'Sống' là được cập nhật thường xuyên theo thời gian thực.",
        keyActionMessage: "Dữ liệu là tài nguyên quốc gia; dữ liệu phải 'Đúng - Đủ - Sạch - Sống' mới phát huy giá trị.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP", "Chiến lược dữ liệu quốc gia đến năm 2030"],
        illustrationText: "Nguyên tắc dữ liệu số: Đúng (Chính xác) - Đủ (Toàn vẹn) - Sạch (Chuẩn hóa) - Sống (Thời gian thực).",
        questions: [
          {
            id: "cd8-b1-q1",
            type: "knowledge",
            question: "Trong quản lý dữ liệu cơ quan nhà nước, tiêu chuẩn 'Sống' của cơ sở dữ liệu có nghĩa là gì?",
            options: [
              "Dữ liệu có khả năng tự di chuyển trên mạng",
              "Dữ liệu được cập nhật liên tục, phản ánh đúng hiện trạng thực tế theo thời gian thực khi có biến động",
              "Dữ liệu được lưu trong máy tính đang bật nguồn",
              "Dữ liệu có chứa hình ảnh video chuyển động"
            ],
            correctAnswerIndex: 1,
            explanation: "Dữ liệu 'Sống' là dữ liệu được vận hành, luân chuyển và cập nhật thường xuyên, không bị đóng băng lỗi thời."
          }
        ]
      },
      {
        id: "cd8-b2",
        topicId: 8,
        lessonNumber: 2,
        title: "Thu thập và chuẩn hóa dữ liệu số",
        objectives: [
          "Áp dụng danh mục dữ liệu dùng chung và tiêu chuẩn kỹ thuật kết nối dữ liệu",
          "Thực hiện chuẩn hóa định dạng ngày tháng (YYYY-MM-DD), mã định danh (CCCD/Mã số thuế), phông chữ Unicode",
          "Tránh việc thu thập trùng lặp thông tin công dân đã có trong CSDL quốc gia"
        ],
        summary: "Thu thập và chuẩn hóa là bước đầu tiên để dữ liệu có thể liên thông chia sẻ. Cán bộ phải tuân thủ nghiêm ngặt bảng mã Unicode tiếng Việt TCVN 6909:2001, định dạng ngày tháng thống nhất. Thực hiện nguyên tắc 'Một việc chỉ khai báo một lần': Nếu thông tin đã có trong Cơ sở dữ liệu quốc gia về dân cư thì không được yêu cầu người dân khai báo lại trên giấy tờ thủ tục.",
        keyActionMessage: "Thu thập chuẩn hóa từ đầu, thực hiện triệt để nguyên tắc 'Người dân chỉ khai báo một lần'.",
        legalBases: ["Quy chuẩn kỹ thuật quốc gia về cấu trúc thông điệp dữ liệu trao đổi trong CQNN"],
        illustrationText: "Thu thập dữ liệu -> Chuẩn hóa Unicode TCVN -> Định dạng ISO YYYY-MM-DD -> Tích hợp CSDL chung.",
        questions: [
          {
            id: "cd8-b2-q1",
            type: "knowledge",
            question: "Theo quy định của Chính phủ, khi giải quyết thủ tục hành chính, cơ quan nhà nước có được yêu cầu công dân nộp giấy tờ để chứng minh thông tin đã có trong Cơ sở dữ liệu quốc gia về dân cư không?",
            options: [
              "Vẫn được yêu cầu nộp đầy đủ bản sao công chứng cho chắc chắn",
              "Không được yêu cầu nộp lại; cán bộ phải khai thác thông tin từ CSDL quốc gia qua hệ thống liên thông",
              "Tùy vào tâm trạng của cán bộ tiếp nhận",
              "Yêu cầu nộp tiền để cán bộ tự đi xác minh"
            ],
            correctAnswerIndex: 1,
            explanation: "Cơ quan nhà nước phải khai thác dữ liệu số liên thông, cấm gây phiền hà bắt người dân nộp lại thông tin đã có trong hệ thống."
          }
        ]
      },
      {
        id: "cd8-b3",
        topicId: 8,
        lessonNumber: 3,
        title: "Tổ chức lưu trữ và sao lưu dữ liệu an toàn",
        objectives: [
          "Nắm vững và thực hành thành thạo nguyên tắc sao lưu dữ liệu 3-2-1",
          "Phân biệt sao lưu đầy đủ (Full Backup), sao lưu vi sai (Differential) và sao lưu gia tăng (Incremental)",
          "Thiết lập lịch sao lưu tự động định kỳ cho các dữ liệu công vụ quan trọng"
        ],
        summary: "Dữ liệu có thể bị mất do hỏng ổ cứng, mã độc tống tiền (Ransomware), thiên tai hoặc thao tác xóa nhầm. Để phòng ngừa, cán bộ và cơ quan phải áp dụng quy tắc 3-2-1: Giữ ít nhất 3 bản sao chép dữ liệu; Lưu trên 2 loại thiết bị khác nhau (như máy chủ và ổ cứng ngoài); Có ít nhất 1 bản lưu ngoại vi hoặc trên đám mây an toàn tách biệt.",
        keyActionMessage: "Quy tắc sao lưu 3-2-1: 3 bản sao - 2 loại phương tiện - 1 bản ngoại vi cách ly.",
        legalBases: ["Quy định về bảo đảm an toàn thông tin theo cấp độ đối với hệ thống thông tin"],
        illustrationText: "Quy tắc 3-2-1: [Bản gốc máy chủ] + [Bản sao ổ cứng rời tại cơ quan] + [Bản sao Cloud/Kho lưu trữ cách ly].",
        questions: [
          {
            id: "cd8-b3-q1",
            type: "knowledge",
            question: "Nguyên tắc sao lưu dữ liệu '3-2-1' kinh điển trong an toàn thông tin bao gồm những yêu cầu nào?",
            options: [
              "Sao lưu trong 3 giờ, gửi cho 2 người, nộp 1 bản giấy",
              "Có ít nhất 3 bản sao dữ liệu; lưu trên 2 loại thiết bị lưu trữ khác nhau; có ít nhất 1 bản lưu tại địa điểm độc lập hoặc đám mây ngoại vi",
              "3 năm mới sao lưu 1 lần",
              "Sao lưu vào 3 thư mục khác nhau trên cùng 1 ổ đĩa C"
            ],
            correctAnswerIndex: 1,
            explanation: "Quy tắc 3-2-1 bảo đảm dữ liệu luôn có thể phục hồi ngay cả khi toàn bộ trụ sở cơ quan gặp sự cố hỏa hoạn hay mã độc tống tiền."
          }
        ]
      },
      {
        id: "cd8-b4",
        topicId: 8,
        lessonNumber: 4,
        title: "Khai thác và phân tích dữ liệu phục vụ quản lý, điều hành",
        objectives: [
          "Biết cách thiết lập bảng điều khiển trực quan (Dashboard) theo dõi chỉ số công vụ (KPIs)",
          "Phân tích dữ liệu lịch sử để dự báo tình hình và hoạch định chính sách địa phương",
          "Chuyển dịch từ phương thức quản lý theo báo cáo giấy sang điều hành dựa trên dữ liệu thời gian thực"
        ],
        summary: "Trung tâm Giám sát Điều hành thông minh (IOC) các cấp thu thập và tổng hợp dữ liệu từ nhiều lĩnh vực: Y tế, giáo dục, giao thông, an ninh trật tự, xử lý hồ sơ dịch vụ công. Cán bộ quản lý có thể nhìn vào Dashboard để thấy ngay các điểm nghẽn, từ đó ra các quyết định điều hành chính xác, kịp thời và minh bạch.",
        keyActionMessage: "Điều hành bằng số liệu thời gian thực: Nhìn thấy bức tranh toàn cảnh để chỉ đạo trúng và đúng.",
        legalBases: ["Quyết định về mô hình Trung tâm giám sát điều hành thông minh (IOC)"],
        illustrationText: "Dữ liệu liên thông đa ngành -> Trung tâm IOC tổng hợp -> Dashboard trực quan -> Ra quyết định nhanh.",
        questions: [
          {
            id: "cd8-b4-q1",
            type: "knowledge",
            question: "Lợi ích đột phá của việc lãnh đạo điều hành dựa trên dữ liệu số (Dashboard/IOC) so với báo cáo giấy truyền thống là gì?",
            options: [
              "Được nhìn màn hình lớn nhiều màu sắc",
              "Nắm bắt số liệu chính xác theo thời gian thực, phát hiện ngay các bất thường và giảm tối đa độ trễ báo cáo",
              "Không cần cán bộ chuyên môn làm việc nữa",
              "Chỉ phục vụ cho khách tham quan chụp ảnh"
            ],
            correctAnswerIndex: 1,
            explanation: "Dashboard trực tuyến phản ánh số liệu tức thì, giúp lãnh đạo phát hiện kịp thời các tồn tại để chỉ đạo xử lý ngay."
          }
        ]
      },
      {
        id: "cd8-b5",
        topicId: 8,
        lessonNumber: 5,
        title: "Chia sẻ và mở dữ liệu trong khu vực công",
        objectives: [
          "Phân biệt Dữ liệu mở (Open Data), Dữ liệu dùng chung nội bộ và Dữ liệu hạn chế/mật",
          "Nắm bắt danh mục dữ liệu mở phục vụ người dân, doanh nghiệp phát triển kinh tế",
          "Tuân thủ quy định bảo vệ bí mật nhà nước và quyền riêng tư khi công bố dữ liệu mở"
        ],
        summary: "Dữ liệu mở là dữ liệu được cơ quan nhà nước công bố rộng rãi dưới định dạng máy có thể đọc được (như CSV, XML, JSON) để bất kỳ ai cũng có thể tự do khai thác, sử dụng cho mục đích nghiên cứu, khởi nghiệp hoặc giám sát xã hội. Khi công bố dữ liệu mở, cơ quan phải sàng lọc kỹ càng để loại trừ tuyệt đối bí mật nhà nước và dữ liệu định danh cá nhân.",
        keyActionMessage: "Mở dữ liệu để kiến tạo giá trị mới cho xã hội, nhưng bảo vệ nghiêm ngặt dữ liệu mật và riêng tư.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP ngày 09/4/2020", "Cổng dữ liệu quốc gia data.gov.vn"],
        illustrationText: "Sàng lọc dữ liệu -> Ẩn danh hóa -> Định dạng chuẩn (CSV/JSON) -> Công bố lên data.gov.vn.",
        questions: [
          {
            id: "cd8-b5-q1",
            type: "knowledge",
            question: "Tiêu chuẩn cơ bản của 'Dữ liệu mở' (Open Data) do cơ quan nhà nước công bố là gì?",
            options: [
              "Dữ liệu được in ra giấy đóng dấu đỏ lưu kho",
              "Dữ liệu công khai, định dạng máy có thể đọc được (CSV, JSON), miễn phí và có thể tái sử dụng hợp pháp",
              "Dữ liệu được khóa bằng mật khẩu phức tạp",
              "Dữ liệu chỉ dành cho cán bộ trong phòng xem"
            ],
            correctAnswerIndex: 1,
            explanation: "Dữ liệu mở phải ở định dạng mở, máy đọc được để thúc đẩy cộng đồng khai thác sáng tạo giá trị gia tăng."
          }
        ]
      },
      {
        id: "cd8-b6",
        topicId: 8,
        lessonNumber: 6,
        title: "Vòng đời dữ liệu và hủy dữ liệu an toàn",
        objectives: [
          "Nắm bắt 6 giai đoạn của vòng đời dữ liệu (Tạo lập - Lưu trữ - Sử dụng - Chia sẻ - Lưu trữ lưu trữ lịch sử - Hủy bỏ)",
          "Hiểu vì sao lệnh xóa 'Delete' thông thường không xóa sạch dữ liệu trên thiết bị",
          "Thực hiện quy trình hủy dữ liệu vĩnh viễn (Sanitization/Degaussing/Phá hủy vật lý) khi thanh lý thiết bị"
        ],
        summary: "Dữ liệu có vòng đời từ khi sinh ra đến khi hết hạn sử dụng. Khi thanh lý máy tính, máy in hoặc ổ cứng cũ của cơ quan, chỉ bấm phím 'Delete' hay 'Format' thông thường thì phần mềm phục hồi vẫn có thể lấy lại 100% dữ liệu. Để hủy an toàn, phải dùng phần mềm ghi đè nhiều lần (Zero-fill), khử từ (Degaussing) hoặc tiêu hủy vật lý ổ đĩa theo quy chuẩn bảo mật.",
        keyActionMessage: "Thanh lý máy tính cũ phải xóa trắng an toàn ổ cứng: Không để lộ lọt tài liệu cơ quan từ bãi phế liệu.",
        legalBases: ["Quy định tiêu hủy thiết bị lưu trữ thông tin của Ban Cơ yếu Chính phủ"],
        illustrationText: "Xóa thường (Dễ phục hồi) -> Dùng phần mềm ghi đè chuyên dụng / Phá hủy vật lý phiến đĩa khi thanh lý.",
        questions: [
          {
            id: "cd8-b6-q1",
            type: "knowledge",
            question: "Khi cơ quan thanh lý máy tính cũ từng lưu trữ các dự thảo văn bản và danh sách công dân, thao tác nào sau đây bảo đảm an toàn dữ liệu tuyệt đối?",
            options: [
              "Chỉ cần bấm Delete rồi dọn thùng rác Recycle Bin",
              "Format ổ đĩa nhanh (Quick Format)",
              "Sử dụng phần mềm xóa trắng dữ liệu chuyên dụng ghi đè nhiều lần hoặc tháo ổ cứng tiêu hủy vật lý theo quy định bảo mật",
              "Dán băng keo lên thùng máy"
            ],
            correctAnswerIndex: 2,
            explanation: "Xóa thông thường hay Quick Format chỉ xóa bảng chỉ mục; chỉ có ghi đè chuyên sâu hoặc phá hủy vật lý mới ngăn chặn phục hồi dữ liệu."
          }
        ]
      }
    ]
  },
  {
    id: 9,
    number: 9,
    title: "Tương tác thông qua các công nghệ số",
    description: "Giao tiếp email công vụ chuyên nghiệp an toàn, ứng dụng nhắn tin họp trực tuyến, tương tác mạng xã hội, kỹ năng điều hành họp trực tuyến, xử lý phản ánh công dân và văn hóa giao tiếp số.",
    category: "Tương tác & Hợp tác số",
    pageRange: "Trang 196 - 220",
    lessonCount: 6,
    lessons: [
      {
        id: "cd9-b1",
        topicId: 9,
        lessonNumber: 1,
        title: "Giao tiếp qua thư điện tử công vụ chuyên nghiệp, an toàn",
        objectives: [
          "Sử dụng hộp thư điện tử công vụ có tên miền `.gov.vn` trong trao đổi công việc chuyên môn",
          "Soạn tiêu đề, nội dung và chữ ký email chuẩn mực hành chính",
          "Nhận biết và phòng ngừa các email giả mạo, đính kèm mã độc tấn công có chủ đích (Spear-phishing)"
        ],
        summary: "Email công vụ là kênh trao đổi thông tin chính thức có giá trị pháp lý trong cơ quan nhà nước. Cán bộ không dùng email cá nhân (Gmail, Yahoo) để gửi nhận công văn, tài liệu của cơ quan. Tiêu đề email phải rõ ràng: `[Tên Cơ Quan] - V/v ...`. Cảnh giác cao độ với các email có tệp đính kèm đuôi `.exe`, `.scr`, `.docm` hoặc thúc ép bấm vào link đăng nhập lạ.",
        keyActionMessage: "100% trao đổi công vụ bằng email đuôi .gov.vn; không dùng email cá nhân xử lý việc công.",
        legalBases: ["Chỉ thị số 34/CT-TTg về tăng cường sử dụng thư điện tử trong hoạt động của CQNN"],
        illustrationText: "Email .gov.vn -> Tiêu đề rõ ràng -> Nội dung lịch sự -> Kiểm tra kỹ file đính kèm trước khi mở.",
        questions: [
          {
            id: "cd9-b1-q1",
            type: "scenario",
            question: "Cán bộ nhận được một email từ địa chỉ 'phongtochuc-tinh@gmail.com' với tiêu đề 'Khẩn: Quyết định nâng lương và kỷ luật cán bộ, tải file đính kèm để xem'. Cán bộ nên xử lý thế nào?",
            options: [
              "Tải ngay file về và mở ra xem vì tò mò",
              "Nghi ngờ ngay vì cơ quan nhà nước không dùng địa chỉ @gmail.com để gửi quyết định chính thức; không mở file đính kèm và báo cho bộ phận CNTT",
              "Chuyển tiếp cho toàn bộ đồng nghiệp cùng xem",
              "Trả lời email xin lỗi"
            ],
            correctAnswerIndex: 1,
            explanation: "Địa chỉ Gmail mạo danh kết hợp tệp đính kèm kích thích sự tò mò là chiêu thức tấn công giả mạo (Phishing) điển hình."
          }
        ]
      },
      {
        id: "cd9-b2",
        topicId: 9,
        lessonNumber: 2,
        title: "Sử dụng ứng dụng nhắn tin và họp trực tuyến hiệu quả",
        objectives: [
          "Sử dụng các nền tảng nhắn tin điều hành công vụ an toàn, có mã hóa đầu cuối",
          "Quản lý các nhóm chat công việc chuyên môn, phân loại kênh thảo luận khoa học",
          "Nguyên tắc bảo mật: Không trao đổi tài liệu mật, thông tin nhạy cảm qua nhóm chat mạng xã hội"
        ],
        summary: "Các ứng dụng nhắn tin (Zalo, Viber, Telegram, phần mềm chuyên dụng) giúp trao đổi thông tin chỉ đạo điều hành nhanh chóng. Tuy nhiên, cán bộ phải phân biệt ranh giới: Nhóm chat chỉ dùng để đôn đốc tiến độ, thông báo lịch họp, chia sẻ tài liệu công khai. Tuyệt đối không chụp ảnh văn bản mật, danh sách nhân sự nội bộ đưa lên nhóm chat vì nguy cơ rò rỉ dữ liệu lên máy chủ nước ngoài.",
        keyActionMessage: "Nhóm chat chỉ phục vụ điều hành nhanh; tuyệt đối không chụp ảnh văn bản mật đưa lên mạng xã hội.",
        legalBases: ["Luật Bảo vệ bí mật nhà nước", "Quy chế bảo vệ an toàn thông tin nội bộ"],
        illustrationText: "Nhóm chat công vụ: Thông báo nhanh, đôn đốc tiến độ (Cấm dán tài liệu mật/thông tin nội bộ).",
        questions: [
          {
            id: "cd9-b2-q1",
            type: "scenario",
            question: "Trong một nhóm chat Zalo của phòng chuyên môn, một cán bộ chụp ảnh một văn bản có đóng dấu độ 'MẬT' gửi lên để hỏi ý kiến đồng nghiệp. Hành vi này:",
            options: [
              "Bình thường và tiện lợi cho công việc",
              "Vi phạm nghiêm trọng Luật Bảo vệ bí mật nhà nước và an toàn thông tin mạng, bị xử lý kỷ luật hoặc truy cứu trách nhiệm hình sự",
              "Được phép nếu xóa ảnh sau 5 phút",
              "Chỉ vi phạm nếu bị người ngoài phát hiện"
            ],
            correctAnswerIndex: 1,
            explanation: "Hành vi chụp ảnh tài liệu mật đưa lên ứng dụng nhắn tin công cộng là vi phạm pháp luật bảo vệ bí mật nhà nước."
          }
        ]
      },
      {
        id: "cd9-b3",
        topicId: 9,
        lessonNumber: 3,
        title: "Tương tác trên các nền tảng mạng xã hội và kênh truyền thông số",
        objectives: [
          "Xây dựng và quản trị trang Fanpage/Zalo OA chính thức của cơ quan nhà nước",
          "Kỹ năng đăng tải thông tin tuyên truyền chính sách hấp dẫn, dễ hiểu, gần gũi với Nhân dân",
          "Xử lý khủng hoảng truyền thông trên không gian mạng bình tĩnh và đúng quy trình"
        ],
        summary: "Mạng xã hội là cầu nối hữu hiệu đưa chính sách đến gần với người dân. Trang Fanpage hoặc Zalo Official Account (OA) của cơ quan cần được xác thực tích xanh, cập nhật thông tin chính xác, ngôn ngữ thân thiện, giải đáp kịp thời băn khoăn của công chúng. Khi có thông tin sai lệch lan truyền, cơ quan cần bình tĩnh đăng thông cáo chính thống làm rõ, không đôi co gay gắt trên mạng.",
        keyActionMessage: "Truyền thông chính sách trên mạng xã hội: Chủ động - Kịp thời - Gần gũi - Lắng nghe Nhân dân.",
        legalBases: ["Chỉ thị số 07/CT-TTg về tăng cường công tác truyền thông chính sách"],
        illustrationText: "Trang OA xác thực -> Đăng tin ngắn gọn, đồ họa đẹp -> Lắng nghe bình luận -> Phản hồi chuẩn mực.",
        questions: [
          {
            id: "cd9-b3-q1",
            type: "knowledge",
            question: "Khi tiếp nhận bình luận bức xúc, phản ánh của người dân trên trang mạng xã hội của cơ quan, người quản trị trang nên ứng xử thế nào?",
            options: [
              "Xóa ngay bình luận và chặn (block) người dùng đó",
              "Chửi bới đôi co lại với người dân bằng tài khoản cơ quan",
              "Lắng nghe, ghi nhận thông tin với thái độ lịch sự, chuyển bộ phận chuyên môn xác minh và phản hồi thỏa đáng theo đúng thẩm quyền",
              "Để mặc kệ không quan tâm"
            ],
            correctAnswerIndex: 2,
            explanation: "Lắng nghe và giải đáp chuẩn mực, văn minh là nguyên tắc giao tiếp số phục vụ nhân dân của cơ quan nhà nước."
          }
        ]
      },
      {
        id: "cd9-b4",
        topicId: 9,
        lessonNumber: 4,
        title: "Kỹ năng tổ chức và điều hành cuộc họp trực tuyến",
        objectives: [
          "Lựa chọn và cấu hình phòng họp số an toàn (đặt mật khẩu phòng, phòng chờ Waiting Room)",
          "Thực hiện nghi thức họp trực tuyến văn minh (bật camera, tắt micro khi không phát biểu, trang phục lịch sự)",
          "Chia sẻ tài liệu trình chiếu mượt mà và ghi biên bản họp điện tử"
        ],
        summary: "Họp trực tuyến giúp tiết kiệm thời gian di chuyển và chi phí ngân sách. Để cuộc họp thành công: Cán bộ phụ trách cần kiểm tra đường truyền và micro trước 15 phút, cài đặt phòng chờ (Waiting Room) để duyệt đúng thành phần tham dự, gửi trước tài liệu số cho đại biểu. Người dự họp cần ăn mặc chỉnh tề, giữ trật tự và chủ động bấm nút 'Giơ tay' khi muốn phát biểu.",
        keyActionMessage: "Họp trực tuyến văn minh: Chuẩn bị trước thiết bị, ăn mặc chỉnh tề và tắt micro khi người khác đang nói.",
        legalBases: ["Quy định về tổ chức họp trực tuyến trong các cơ quan hành chính nhà nước"],
        illustrationText: "Cài đặt mật khẩu + Phòng chờ -> Kiểm tra âm thanh trước 15 phút -> Bật camera, tắt mic khi lắng nghe.",
        questions: [
          {
            id: "cd9-b4-q1",
            type: "knowledge",
            question: "Biện pháp kỹ thuật nào giúp phòng tránh kẻ lạ xâm nhập vào quấy rối phòng họp trực tuyến cơ quan (hiện tượng Zoom-bombing)?",
            options: [
              "Đăng công khai link phòng họp lên Facebook",
              "Đặt mật khẩu phòng họp, bật tính năng Phòng chờ (Waiting Room) và chỉ chia sẻ link cho người có trách nhiệm tham dự",
              "Không cần cài đặt gì",
              "Tắt luôn màn hình máy tính của mình"
            ],
            correctAnswerIndex: 1,
            explanation: "Đặt mật khẩu và kiểm soát người vào từ phòng chờ là biện pháp bảo mật thiết yếu cho các cuộc họp trực tuyến."
          }
        ]
      },
      {
        id: "cd9-b5",
        topicId: 9,
        lessonNumber: 5,
        title: "Tiếp nhận và xử lý phản ánh, kiến nghị của người dân trên môi trường số",
        objectives: [
          "Vận hành quy trình tiếp nhận phản ánh qua Cổng Dịch vụ công quốc gia và ứng dụng công dân số địa phương",
          "Phân loại, chuyển tiếp và phối hợp xử lý dứt điểm kiến nghị đúng thời hạn luật định",
          "Soạn thảo nội dung trả lời công dân rõ ràng, thấu đáo và đúng quy định pháp luật"
        ],
        summary: "Kênh phản ánh hiện trường số cho phép người dân gửi hình ảnh, vị trí định vị các sự cố dân sinh (hư hỏng đường sá, ô nhiễm môi trường, vi phạm trật tự). Cán bộ tiếp nhận phải xử lý theo quy trình khép kín: Tiếp nhận -> Xác minh thực địa -> Chỉ đạo khắc phục -> Chụp ảnh kết quả gửi lại cho công dân trên ứng dụng trong vòng 24 - 48 giờ.",
        keyActionMessage: "Xử lý phản ánh hiện trường: Tiếp nhận nhanh - Xử lý dứt điểm - Phản hồi công khai vì sự hài lòng của Nhân dân.",
        legalBases: ["Quy định về tiếp nhận, xử lý phản ánh, kiến nghị của người dân, doanh nghiệp trên môi trường điện tử"],
        illustrationText: "Dân gửi ảnh sự cố -> Cán bộ thụ lý chuyển đơn vị -> Khắc phục tại hiện trường -> Gửi ảnh báo cáo kết quả.",
        questions: [
          {
            id: "cd9-b5-q1",
            type: "scenario",
            question: "Người dân gửi phản ánh kèm ảnh chụp hố ga mất nắp trên ứng dụng đô thị thông minh của tỉnh. Trách nhiệm của cán bộ tiếp nhận là gì?",
            options: [
              "Để đấy khi nào rảnh thì xem",
              "Xác nhận tiếp nhận tức thì, chuyển ngay cho đơn vị hạ tầng đô thị xử lý khẩn cấp và cập nhật kết quả lên hệ thống cho người dân theo dõi",
              "Trả lời người dân là việc này không thuộc trách nhiệm của ai",
              "Xóa bài phản ánh của dân"
            ],
            correctAnswerIndex: 1,
            explanation: "Xử lý nhanh các nguy cơ mất an toàn công cộng và phản hồi minh bạch trên app là mục tiêu cốt lõi của chính quyền số."
          }
        ]
      },
      {
        id: "cd9-b6",
        topicId: 9,
        lessonNumber: 6,
        title: "Xây dựng văn hóa giao tiếp số chuẩn mực trong công vụ",
        objectives: [
          "Nắm vững chuẩn mực đạo đức, tác phong của cán bộ trên không gian số",
          "Thực hành ứng xử tôn trọng, kiên nhẫn, chuẩn mực ngôn ngữ tiếng Việt trong sáng",
          "Xây dựng hình ảnh người cán bộ công chức tận tụy, liêm chính, thân thiện trong lòng Nhân dân"
        ],
        summary: "Văn hóa giao tiếp số phản chiếu đạo đức công vụ trong thời đại công nghệ. Dù trao đổi qua màn hình máy tính hay điện thoại, cán bộ luôn giữ thái độ hòa nhã, xưng hô đúng mực, trả lời tin nhắn công vụ kịp thời, viết đúng chính tả tiếng Việt có dấu, không sử dụng từ ngữ cộc lốc hay biểu tượng cảm xúc thiếu nghiêm túc.",
        keyActionMessage: "Giao tiếp số chuẩn mực: Lời nói nhã nhặn, chính tả chỉn chu, tận tâm phục vụ.",
        legalBases: ["Bộ Quy tắc ứng xử của cán bộ, công chức, viên chức trong cơ quan nhà nước"],
        illustrationText: "Xưng hô đúng mực -> Tiếng Việt có dấu chuẩn chỉnh -> Phản hồi kịp thời -> Giữ vững uy tín công vụ.",
        questions: [
          {
            id: "cd9-b6-q1",
            type: "knowledge",
            question: "Hành vi giao tiếp nào sau đây là chuẩn mực của cán bộ công chức khi nhắn tin trả lời người dân về thủ tục hành chính?",
            options: [
              "Nhắn tin không dấu, dùng từ ngữ viết tắt teen code khó hiểu",
              "Chào hỏi lịch sự, xưng hô đúng mực, hướng dẫn rõ ràng từng bước bằng tiếng Việt chuẩn xác và gửi kèm đường dẫn hướng dẫn chính thức",
              "Trả lời cụt lủn: 'Tự lên mạng mà đọc'",
              "Đọc tin nhắn xong không thèm phản hồi"
            ],
            correctAnswerIndex: 1,
            explanation: "Thái độ ân cần, ngôn ngữ chuẩn mực và hướng dẫn chu đáo thể hiện phẩm chất của người cán bộ vì dân phục vụ."
          }
        ]
      }
    ]
  },
  {
    id: 10,
    number: 10,
    title: "Chia sẻ thông tin và nội dung số",
    description: "Khái niệm, vai trò, nguyên tắc và phương thức chia sẻ dữ liệu số trong cơ quan nhà nước; phân quyền truy cập an toàn và tuân thủ khung pháp lý theo Nghị định số 47/2020/NĐ-CP.",
    category: "Tương tác & Hợp tác số",
    pageRange: "Trang 221 - 240",
    lessonCount: 5,
    lessons: [
      {
        id: "cd10-b1",
        topicId: 10,
        lessonNumber: 1,
        title: "Khái niệm, vai trò và nguyên tắc chia sẻ thông tin môi trường số",
        objectives: [
          "Nắm vững định nghĩa, tầm quan trọng chiến lược của việc chia sẻ thông tin trong chuyển đổi số",
          "Thấu hiểu 4 nguyên tắc cốt lõi: Phục vụ đúng mục đích, đúng thẩm quyền, kịp thời và bảo mật",
          "Chuyển biến tư duy từ 'sở hữu dữ liệu cục bộ' sang 'chia sẻ dữ liệu dùng chung'"
        ],
        summary: "Chia sẻ dữ liệu là mạch máu của chính quyền số. Dữ liệu chỉ phát huy tối đa giá trị khi được liên thông, chia sẻ thông suốt giữa các cơ quan, đơn vị để phục vụ người dân và doanh nghiệp tốt hơn. Tuy nhiên, việc chia sẻ phải tuân thủ nghiêm ngặt nguyên tắc đúng thẩm quyền, đúng phạm vi mục đích và bảo đảm an toàn, bí mật nhà nước.",
        keyActionMessage: "Dữ liệu sinh ra là để chia sẻ và tạo ra giá trị: Chia sẻ đúng thẩm quyền, đúng mục đích và an toàn tuyệt đối.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP về quản lý, kết nối và chia sẻ dữ liệu số của cơ quan nhà nước"],
        illustrationText: "Dữ liệu chuyên ngành -> Thẩm định tính pháp lý -> Chia sẻ liên thông an toàn -> Tối ưu hóa dịch vụ công.",
        questions: [
          {
            id: "cd10-b1-q1",
            type: "knowledge",
            question: "Trong cơ quan nhà nước, nguyên tắc căn bản nào chi phối hoạt động kết nối, chia sẻ dữ liệu số theo quy định hiện hành?",
            options: [
              "Cơ quan nào thu thập dữ liệu thì giữ kín làm tài sản riêng của đơn vị đó",
              "Dữ liệu được chia sẻ phục vụ hoạt động của CQNN theo quy định, không thu phí đối với hoạt động chia sẻ dữ liệu giữa các cơ quan, bảo đảm an toàn thông tin",
              "Mọi dữ liệu đều phải đăng công khai lên mạng xã hội",
              "Chỉ chia sẻ dữ liệu khi có thư tay đồng ý của thủ trưởng"
            ],
            correctAnswerIndex: 1,
            explanation: "Theo Nghị định số 47/2020/NĐ-CP, việc chia sẻ dữ liệu giữa các cơ quan nhà nước là bắt buộc để phục vụ giải quyết thủ tục hành chính và không thu phí."
          }
        ]
      },
      {
        id: "cd10-b2",
        topicId: 10,
        lessonNumber: 2,
        title: "Các phương thức và nền tảng chia sẻ dữ liệu trong CQNN",
        objectives: [
          "Phân biệt các hình thức chia sẻ dữ liệu: Chia sẻ mặc định (Open data), chia sẻ theo yêu cầu và dịch vụ chia sẻ dữ liệu",
          "Khai thác nền tảng tích hợp, chia sẻ dữ liệu quốc gia (NDXP) và cấp tỉnh (LGSP)",
          "Thao tác gửi nhận tệp tài liệu dung lượng lớn qua dịch vụ lưu trữ đám mây dùng chung an toàn"
        ],
        summary: "Để chia sẻ dữ liệu thông suốt, Nhà nước triển khai hệ thống Nền tảng tích hợp, chia sẻ dữ liệu quốc gia (NDXP) và nền tảng cấp bộ/tỉnh (LGSP). Cán bộ nắm vững phương thức gửi tệp tài liệu số qua hòm thư công vụ và hệ thống lưu trữ tập trung của tỉnh, tránh sử dụng các trang web chia sẻ tệp công cộng không được phê duyệt an ninh mạng.",
        keyActionMessage: "Sử dụng nền tảng chia sẻ dữ liệu chính thức của CQNN (LGSP/NDXP): Đảm bảo mã hóa dữ liệu đường truyền.",
        legalBases: ["Khung Kiến trúc Chính phủ điện tử Việt Nam phiên bản 3.0", "Nghị định số 47/2020/NĐ-CP"],
        illustrationText: "Cơ sở dữ liệu ngành -> Nền tảng chia sẻ cấp tỉnh LGSP -> Trục liên thông quốc gia NDXP -> Các cơ quan thụ hưởng.",
        questions: [
          {
            id: "cd10-b2-q1",
            type: "knowledge",
            question: "Nền tảng kỹ thuật nào đóng vai trò là 'trục xương sống' kết nối, chia sẻ dữ liệu giữa các cơ quan thuộc tỉnh với nhau và kết nối lên trung ương?",
            options: [
              "Nhóm Zalo cơ quan",
              "Nền tảng tích hợp, chia sẻ dữ liệu cấp bộ, cấp tỉnh (LGSP)",
              "Dịch vụ gửi file WeTransfer miễn phí",
              "Ổ cứng di động gắn ngoài"
            ],
            correctAnswerIndex: 1,
            explanation: "LGSP (Local Government Service Platform) là nền tảng dùng chung kết nối các hệ thống thông tin của tỉnh với nền tảng quốc gia NDXP."
          }
        ]
      },
      {
        id: "cd10-b3",
        topicId: 10,
        lessonNumber: 3,
        title: "Phân quyền truy cập, chia sẻ tài liệu và kiểm soát an toàn",
        objectives: [
          "Thiết lập chính xác các cấp độ phân quyền khi chia sẻ tài liệu số: Chỉ xem (View), Nhận xét (Comment), Chỉnh sửa (Edit)",
          "Kiểm soát phạm vi chia sẻ (chia sẻ đích danh qua email công vụ, chia sẻ nội bộ phòng ban, không tạo liên kết công khai bất kỳ ai có link)",
          "Thiết lập ngày hết hạn truy cập và mật khẩu bảo vệ khi gửi tệp dữ liệu quan trọng"
        ],
        summary: "Một sơ suất rất phổ biến dẫn đến lộ lọt thông tin là tạo đường liên kết chia sẻ tài liệu ở chế độ 'Bất kỳ ai có đường liên kết đều có thể xem/chỉnh sửa'. Khi chia sẻ văn bản công vụ trên môi trường đám mây, cán bộ bắt buộc phải phân quyền đích danh tới từng hòm thư công vụ của người nhận, tuyệt đối không mở quyền truy cập công khai.",
        keyActionMessage: "Phân quyền đúng người - Đúng cấp độ: Luôn chọn 'Chia sẻ đích danh qua email', không mở 'Bất kỳ ai có link'.",
        legalBases: ["Luật An toàn thông tin mạng", "Quy chế bảo đảm an toàn thông tin cơ quan"],
        illustrationText: "Tài liệu công vụ -> Chọn 'Chia sẻ hạn chế' -> Thêm email công vụ người nhận -> Đặt quyền 'Chỉ xem' -> Gửi.",
        questions: [
          {
            id: "cd10-b3-q1",
            type: "scenario",
            question: "Khi cần chia sẻ một dự thảo báo cáo quan trọng cho 3 đồng nghiệp trong tổ công tác để xin ý kiến đóng góp, thao tác phân quyền nào sau đây là an toàn và chuẩn mực nhất?",
            options: [
              "Bật chế độ 'Bất kỳ ai có liên kết đều có thể chỉnh sửa' rồi dán link vào nhóm chat công khai",
              "Nhập chính xác địa chỉ email công vụ của từng người, cấp quyền 'Nhận xét' hoặc 'Chỉnh sửa' và bỏ dấu tích chia sẻ cho người ngoài",
              "Tải file lên trang chia sẻ tài liệu công cộng rồi nhờ đồng nghiệp tìm tải về",
              "Chụp màn hình từng trang gửi lên mạng xã hội"
            ],
            correctAnswerIndex: 1,
            explanation: "Chia sẻ đích danh bằng email công vụ giúp xác định chính xác danh tính người truy cập, lưu vết kiểm toán và ngăn ngừa người ngoài xem được nội dung."
          }
        ]
      },
      {
        id: "cd10-b4",
        topicId: 10,
        lessonNumber: 4,
        title: "Tuân thủ quy định pháp lý chia sẻ dữ liệu theo Nghị định 47",
        objectives: [
          "Nắm chắc danh mục dữ liệu mở và danh mục dữ liệu phải chia sẻ có điều kiện theo Nghị định 47/2020/NĐ-CP",
          "Hiểu rõ quyền từ chối cung cấp dữ liệu số khi không có căn cứ pháp lý hoặc vi phạm an ninh, bí mật nhà nước",
          "Trách nhiệm cập nhật, bảo đảm tính 'đúng, đủ, sạch, sống' của dữ liệu do cơ quan mình quản lý khi chia sẻ"
        ],
        summary: "Nghị định 47/2020/NĐ-CP là hành lang pháp lý cao nhất về chia sẻ dữ liệu trong CQNN. Cán bộ phụ trách phải nắm rõ dữ liệu nào được cung cấp dưới dạng dữ liệu mở cho xã hội, dữ liệu nào chỉ chia sẻ nội bộ giữa các cơ quan. Khi cơ quan khác yêu cầu kết nối chia sẻ dữ liệu, phải thực hiện thủ tục thẩm định mục đích sử dụng và ký biên bản thỏa thuận chia sẻ dữ liệu theo quy định.",
        keyActionMessage: "Tuân thủ nghiêm Nghị định 47/2020/NĐ-CP: Chia sẻ dữ liệu có trách nhiệm, dữ liệu phải 'Đúng - Đủ - Sạch - Sống'.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP ngày 09/4/2020 của Chính phủ"],
        illustrationText: "Yêu cầu chia sẻ dữ liệu -> Kiểm tra căn cứ pháp lý -> Thẩm định an toàn an ninh mạng -> Phê duyệt kết nối chia sẻ.",
        questions: [
          {
            id: "cd10-b4-q1",
            type: "knowledge",
            question: "Theo Nghị định số 47/2020/NĐ-CP, dữ liệu số do cơ quan nhà nước chia sẻ cho cơ quan khác phục vụ giải quyết thủ tục hành chính phải đáp ứng tiêu chí nào?",
            options: [
              "Có thể thu một khoản phí dịch vụ cung cấp dữ liệu",
              "Dữ liệu phải chính xác, đầy đủ, cập nhật kịp thời ('đúng, đủ, sạch, sống') và không được thu phí chia sẻ",
              "Chỉ chia sẻ dữ liệu dưới dạng bản in giấy rồi gửi qua đường bưu điện",
              "Không cần kiểm tra độ chính xác, nhận sao chia sẻ vậy"
            ],
            correctAnswerIndex: 1,
            explanation: "Dữ liệu phục vụ hoạt động cơ quan nhà nước phải đảm bảo tính toàn vẹn, cập nhật liên tục và miễn phí chia sẻ giữa các cơ quan công quyền."
          }
        ]
      },
      {
        id: "cd10-b5",
        topicId: 10,
        lessonNumber: 5,
        title: "Xây dựng văn hóa chia sẻ dữ liệu vì lợi ích chung của cơ quan",
        objectives: [
          "Xóa bỏ tư tưởng 'cát cứ thông tin', giấu số liệu để giữ vị thế cá nhân hoặc phòng ban",
          "Tự giác đóng góp, cập nhật dữ liệu vào các phần mềm dùng chung của tỉnh và ngành",
          "Tuyên truyền, lan tỏa thói quen tái sử dụng dữ liệu số, chống lãng phí ngân sách thu thập trùng lặp"
        ],
        summary: "Văn hóa chia sẻ dữ liệu là nhân tố quyết định thành bại của chuyển đổi số. Cán bộ không giữ dữ liệu làm của riêng mà chủ động đưa dữ liệu lên các hệ thống thông tin dùng chung. Khi người dân đã khai báo thông tin một lần ở một cơ quan, các cơ quan khác phải khai thác lại qua dữ liệu liên thông, không bắt người dân nộp lại giấy tờ, thực hiện đúng nguyên tắc 'Một việc - Một lần khai báo'.",
        keyActionMessage: "Xóa bỏ rào cản 'cát cứ thông tin': Chủ động chia sẻ dữ liệu, phục vụ người dân tốt nhất.",
        legalBases: ["Chỉ thị số 04/CT-TTg về đẩy mạnh triển khai Đề án 06", "Nghị định số 47/2020/NĐ-CP"],
        illustrationText: "Chia sẻ dữ liệu tập trung -> Người dân khai báo một lần -> Liên thông đa ngành -> Cắt giảm thủ tục phiền hà.",
        questions: [
          {
            id: "cd10-b5-q1",
            type: "scenario",
            question: "Khi người dân đến giải quyết thủ tục hành chính tại UBND xã, thông tin cư trú của công dân đã có trên Cơ sở dữ liệu quốc gia về dân cư kết nối qua VNeID. Cách xử lý nào sau đây thể hiện văn hóa số đúng đắn nhất?",
            options: [
              "Vẫn yêu cầu công dân về nhà xin giấy xác nhận thông tin cư trú bản giấy có đóng dấu đỏ",
              "Chủ động tra cứu, khai thác thông tin từ hệ thống cơ sở dữ liệu đã liên thông, tuyệt đối không yêu cầu người dân nộp lại giấy xác nhận thông tin cư trú",
              "Từ chối tiếp nhận hồ sơ vì máy tính đang bận",
              "Yêu cầu người dân nộp thêm bản photo sổ hộ khẩu cũ"
            ],
            correctAnswerIndex: 1,
            explanation: "Văn hóa chia sẻ dữ liệu hướng tới việc khai thác tối đa dữ liệu đã có trong hệ thống số, loại bỏ phiền hà và không bắt người dân nộp lại giấy tờ đã số hóa."
          }
        ]
      }
    ]
  }
];
