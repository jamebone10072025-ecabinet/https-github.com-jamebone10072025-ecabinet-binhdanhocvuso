import { Topic } from "../../types";

export const TOPICS_1_TO_5: Topic[] = [
  {
    id: 1,
    number: 1,
    title: "Kiến thức, kỹ năng cơ bản về chuyển đổi số",
    description: "Khái niệm, các công nghệ số cốt lõi, 3 trụ cột quốc gia (Chính phủ số, Kinh tế số, Xã hội số), tư duy & văn hóa số, vai trò lãnh đạo và đổi mới sáng tạo trong thời đại số.",
    category: "Nhận thức & Nền tảng",
    pageRange: "Trang 18 - 50",
    lessonCount: 8,
    lessons: [
      {
        id: "cd1-b1",
        topicId: 1,
        lessonNumber: 1,
        title: "Tổng quan về chuyển đổi số",
        objectives: [
          "Phân biệt rõ ba khái niệm: Số hóa - Tin học hóa - Chuyển đổi số trong cơ quan nhà nước",
          "Hiểu vì sao mỗi cán bộ, công chức, viên chức là một mắt xích của nền hành chính số",
          "Nắm bắt các mục tiêu trọng tâm theo Chỉ thị 14/CT-TTg và Nghị quyết 398/NQ-UBTVQH16"
        ],
        summary: "Số hóa là chuyển tài liệu giấy sang dạng số (quét PDF). Tin học hóa là dùng máy tính/phần mềm để thực hiện nhanh hơn quy trình nghiệp vụ cũ. Chuyển đổi số là sự thay đổi mang tính hệ thống về mô hình hoạt động, quy trình giải quyết công vụ và văn hóa làm việc dựa trên dữ liệu số và công nghệ số để tạo ra giá trị mới (như dịch vụ công phi địa giới, điều hành dựa trên dữ liệu thời gian thực). Mỗi cán bộ là một mắt xích dữ liệu quyết định chất lượng của toàn bộ hệ thống.",
        keyActionMessage: "Chuyển đổi số không chỉ là mua sắm máy móc mà là thay đổi tư duy và phương thức phụng sự Nhân dân.",
        legalBases: ["Chỉ thị số 14/CT-TTg ngày 22/4/2026", "Nghị quyết số 398/NQ-UBTVQH16"],
        illustrationText: "Số hóa (Scan tài liệu) -> Tin học hóa (Gửi email, gõ Word) -> Chuyển đổi số (Quy trình liên thông số hóa toàn trình, dữ liệu dùng chung).",
        questions: [
          {
            id: "cd1-b1-q1",
            type: "knowledge",
            question: "Đâu là điểm khác biệt cốt lõi giữa 'chuyển đổi số' và 'tin học hóa'?",
            options: [
              "Không khác nhau, đều chỉ việc trang bị máy vi tính cho văn phòng.",
              "Tin học hóa giữ nguyên quy trình cũ và làm nhanh hơn; chuyển đổi số thay đổi mô hình và quy trình dựa trên dữ liệu số.",
              "Chuyển đổi số chỉ áp dụng cho doanh nghiệp công nghệ, không dùng cho cơ quan nhà nước.",
              "Chuyển đổi số chỉ tập trung vào việc số hóa các hồ sơ giấy lưu trữ."
            ],
            correctAnswerIndex: 1,
            explanation: "Tin học hóa tự động hóa quy trình sẵn có; chuyển đổi số tái cấu trúc quy trình công vụ và tạo giá trị mới dựa trên dữ liệu."
          },
          {
            id: "cd1-b1-q2",
            type: "scenario",
            question: "Một cơ quan cấp xã triển khai tiếp nhận và giải quyết 100% hồ sơ thủ tục hành chính liên thông trên Hệ thống một cửa điện tử, người dân không phải nộp lại giấy tờ đã có trong Cơ sở dữ liệu quốc gia. Đây là biểu hiện của:",
            options: [
              "Chỉ đơn thuần là số hóa tài liệu",
              "Trang bị máy tính văn phòng",
              "Chuyển đổi số thực chất trong phục vụ hành chính công",
              "Tin học hóa cục bộ một bộ phận"
            ],
            correctAnswerIndex: 2,
            explanation: "Tái cấu trúc quy trình, khai thác dữ liệu số dùng chung để cắt giảm thủ tục cho người dân là bản chất của chuyển đổi số."
          }
        ]
      },
      {
        id: "cd1-b2",
        topicId: 1,
        lessonNumber: 2,
        title: "Các công nghệ số cốt lõi",
        objectives: [
          "Nhận diện các công nghệ số cốt lõi: Điện toán đám mây (Cloud), Trí tuệ nhân tạo (AI), Dữ liệu lớn (Big Data), Chuỗi khối (Blockchain) và IoT",
          "Hiểu ứng dụng thực tiễn của các công nghệ này trong hoạt động của cơ quan nhà nước",
          "Ý thức về an toàn thông tin khi tiếp cận các công nghệ mới"
        ],
        summary: "Các công nghệ số cốt lõi đóng vai trò là động cơ dẫn dắt chuyển đổi số. Điện toán đám mây cho phép lưu trữ và chia sẻ tài nguyên dùng chung linh hoạt. Trí tuệ nhân tạo hỗ trợ phân tích và tự động hóa xử lý văn bản. Dữ liệu lớn giúp phát hiện xu hướng và dự báo chính sách. IoT kết nối các cảm biến phục vụ giám sát môi trường, đô thị thông minh. Blockchain bảo đảm tính toàn vẹn và chống giả mạo hồ sơ pháp lý.",
        keyActionMessage: "Hiểu đúng công nghệ để làm chủ công cụ, tránh tâm lý sùng bái công nghệ hoặc e ngại thay đổi.",
        legalBases: ["Quyết định số 749/QĐ-TTg phê duyệt Chương trình CĐS quốc gia"],
        illustrationText: "Hạ tầng Cloud -> Dữ liệu Big Data/IoT -> Phân tích bằng AI -> Bảo chứng bằng Blockchain.",
        questions: [
          {
            id: "cd1-b2-q1",
            type: "knowledge",
            question: "Công nghệ nào đóng vai trò lưu trữ linh hoạt, chia sẻ tài nguyên máy chủ dùng chung cho các cơ quan nhà nước mà không cần đầu tư máy chủ vật lý phân tán?",
            options: [
              "Điện toán đám mây (Cloud Computing)",
              "Cáp quang biển",
              "Mạng xã hội công cộng",
              "Mã nguồn mở máy tính cá nhân"
            ],
            correctAnswerIndex: 0,
            explanation: "Điện toán đám mây giúp tập trung hóa tài nguyên, tiết kiệm chi phí đầu tư hạ tầng và đảm bảo an toàn thông tin mức bộ/ngành/địa phương."
          },
          {
            id: "cd1-b2-q2",
            type: "scenario",
            question: "Khi cơ quan muốn phân tích hàng triệu ý kiến cử tri và phản ánh của người dân để tìm ra các vấn đề dân sinh nổi cộm nhất, công nghệ nào phù hợp nhất để hỗ trợ?",
            options: [
              "Quét ảnh tài liệu",
              "Dữ liệu lớn (Big Data) và Trí tuệ nhân tạo (AI) xử lý ngôn ngữ tự nhiên",
              "Phần mềm gõ tiếng Việt Unikey",
              "Trang bị thêm máy fax"
            ],
            correctAnswerIndex: 1,
            explanation: "Big Data kết hợp AI NLP có khả năng xử lý, phân cụm và trích xuất thông điệp từ khối lượng dữ liệu phản ánh khổng lồ."
          }
        ]
      },
      {
        id: "cd1-b3",
        topicId: 1,
        lessonNumber: 3,
        title: "Chính phủ số, kinh tế số và xã hội số",
        objectives: [
          "Nắm vững 3 trụ cột của Chiến lược Chuyển đổi số quốc gia",
          "Hiểu mối quan hệ tương hỗ giữa Chính phủ số định hướng - Kinh tế số làm động lực - Xã hội số làm nền tảng",
          "Xác định vị trí và trách nhiệm của cán bộ công chức trong trụ cột Chính phủ số"
        ],
        summary: "Chuyển đổi số quốc gia phát triển dựa trên 3 trụ cột đồng bộ: (1) Chính phủ số: Cơ quan nhà nước vận hành dựa trên dữ liệu số, cung cấp dịch vụ công trực tuyến toàn trình thuận tiện cho người dân; (2) Kinh tế số: Đóng góp tỷ trọng ngày càng cao vào GDP, thúc đẩy kinh doanh số, thương mại điện tử; (3) Xã hội số: Người dân được trang bị kỹ năng số, văn hóa số, bình đẳng tiếp cận cơ hội phát triển trên môi trường mạng.",
        keyActionMessage: "Chính phủ số dẫn dắt, tiên phong mở đường để kiến tạo kinh tế số và xã hội số phồn vinh.",
        legalBases: ["Chiến lược phát triển Chính phủ số giai đoạn 2021-2025, định hướng đến năm 2030"],
        illustrationText: "Tam giác kiềng 3 chân: Chính phủ số (Kiến tạo) - Kinh tế số (Động lực) - Xã hội số (Bền vững).",
        questions: [
          {
            id: "cd1-b3-q1",
            type: "knowledge",
            question: "Ba trụ cột xuyên suốt của công cuộc Chuyển đổi số quốc gia tại Việt Nam là gì?",
            options: [
              "Chính phủ điện tử, Mạng Internet và Máy tính văn phòng",
              "Chính phủ số, Kinh tế số và Xã hội số",
              "Cải cách tiền lương, Mạng di động 5G và Bán hàng trực tuyến",
              "Xây dựng trung tâm dữ liệu, Mua sắm máy tính và Lắp đặt camera"
            ],
            correctAnswerIndex: 1,
            explanation: "Ba trụ cột quốc gia được xác định rõ là Chính phủ số, Kinh tế số và Xã hội số."
          },
          {
            id: "cd1-b3-q2",
            type: "scenario",
            question: "Cán bộ Bộ phận Một cửa tích cực hướng dẫn người dân cài đặt định danh VNeID, thanh toán không dùng tiền mặt và nộp hồ sơ trực tuyến. Hoạt động này tác động đến trụ cột nào?",
            options: [
              "Chỉ tác động đến việc xếp loại cá nhân",
              "Tác động đồng bộ thúc đẩy cả Chính phủ số, Xã hội số và Kinh tế số",
              "Không liên quan đến chuyển đổi số",
              "Chỉ phục vụ ngành Công an"
            ],
            correctAnswerIndex: 1,
            explanation: "Hành động này giúp người dân hình thành thói quen số (Xã hội số), giao dịch không tiền mặt (Kinh tế số) và sử dụng dịch vụ công trực tuyến (Chính phủ số)."
          }
        ]
      },
      {
        id: "cd1-b4",
        topicId: 1,
        lessonNumber: 4,
        title: "Chuyển đổi số trong hoạt động của Quốc hội",
        objectives: [
          "Hiểu định hướng xây dựng Quốc hội số theo Nghị quyết 398/NQ-UBTVQH16",
          "Nắm bắt các ứng dụng số phục vụ kỳ họp Quốc hội, HĐND các cấp (kỳ họp không giấy tờ, trợ lý ảo lập pháp)",
          "Thấy rõ vai trò của dữ liệu và công nghệ trong nâng cao chất lượng lập pháp và giám sát tối cao"
        ],
        summary: "Chuyển đổi số trong hoạt động của Quốc hội và HĐND các cấp là bước đột phá nhằm nâng cao tính công khai, minh bạch và hiệu lực trong lập pháp, giám sát và quyết định các vấn đề quan trọng. Việc triển khai phòng họp số, cung cấp tài liệu kỳ họp điện tử, biểu quyết điện tử và trợ lý ảo phân tích chính sách giúp các đại biểu tiếp cận thông tin đa chiều, chính xác và kịp thời.",
        keyActionMessage: "Quốc hội số, HĐND số tăng cường kết nối mật thiết giữa đại biểu với cử tri và Nhân dân.",
        legalBases: ["Nghị quyết số 398/NQ-UBTVQH16"],
        illustrationText: "Kỳ họp không giấy tờ -> Trợ lý ảo tra cứu luật -> Biểu quyết điện tử -> Giám sát trên dữ liệu số.",
        questions: [
          {
            id: "cd1-b4-q1",
            type: "knowledge",
            question: "Mục tiêu trọng tâm của việc xây dựng Quốc hội số theo tinh thần Nghị quyết 398/NQ-UBTVQH16 là gì?",
            options: [
              "Thay thế hoàn toàn vai trò của các Đại biểu Quốc hội bằng trí tuệ nhân tạo.",
              "Đổi mới căn bản phương thức hoạt động của Quốc hội dựa trên công nghệ số, nâng cao hiệu quả lập pháp, giám sát và gắn kết với cử tri.",
              "Chỉ phục vụ mục đích mua sắm máy tính bảng cho đại biểu.",
              "Giảm bớt thời lượng các phiên chất vấn tại nghị trường."
            ],
            correctAnswerIndex: 1,
            explanation: "Quốc hội số nhằm đổi mới phương thức làm việc, nâng cao chất lượng công tác lập pháp, giám sát và lắng nghe nguyện vọng cử tri."
          }
        ]
      },
      {
        id: "cd1-b5",
        topicId: 1,
        lessonNumber: 5,
        title: "Khung kiến thức, kỹ năng số",
        objectives: [
          "Nắm vững cấu trúc khung năng lực số cơ bản gồm 5 miền kỹ năng và 26 chuyên đề chuẩn",
          "Hiểu yêu cầu chuẩn hóa kỹ năng số cho cán bộ, công chức theo vị trí việc làm",
          "Xác định lộ trình tự học và hoàn thiện năng lực số cá nhân"
        ],
        summary: "Khung kiến thức, kỹ năng số quốc gia xác định chuẩn năng lực số tối thiểu cho cán bộ, công chức, viên chức trong khu vực công. Khung được thiết kế theo phương pháp Micro-learning gồm 5 miền năng lực chính: Thông tin và dữ liệu; Giao tiếp và cộng tác số; Sáng tạo nội dung số; An toàn thông tin và bảo vệ quyền riêng tư; Xử lý sự cố và thích ứng công nghệ mới.",
        keyActionMessage: "Năng lực số là tiêu chuẩn bắt buộc của cán bộ thời kỳ mới, phải học tập và cập nhật liên tục.",
        legalBases: ["Chỉ thị số 14/CT-TTg", "Thông tư hướng dẫn chuẩn kỹ năng số"],
        illustrationText: "5 Miền kỹ năng: Dữ liệu -> Giao tiếp số -> Sáng tạo nội dung -> An toàn bảo mật -> Giải quyết vấn đề.",
        questions: [
          {
            id: "cd1-b5-q1",
            type: "knowledge",
            question: "Khung năng lực số cơ bản dành cho cán bộ công chức được xây dựng nhằm mục đích gì?",
            options: [
              "Để chấm điểm thi đua một lần rồi bỏ qua.",
              "Chuẩn hóa kiến thức, kỹ năng số cần thiết để cán bộ làm việc an toàn, hiệu quả trên môi trường số.",
              "Chỉ dành riêng cho cán bộ chuyên trách công nghệ thông tin.",
              "Phục vụ riêng cho các cơ quan trung ương, cấp tỉnh và xã không áp dụng."
            ],
            correctAnswerIndex: 1,
            explanation: "Khung năng lực số chuẩn hóa năng lực làm việc trên môi trường số cho toàn thể đội ngũ cán bộ công chức các cấp."
          }
        ]
      },
      {
        id: "cd1-b6",
        topicId: 1,
        lessonNumber: 6,
        title: "Xây dựng văn hóa số trong cơ quan nhà nước",
        objectives: [
          "Hiểu khái niệm văn hóa số trong tổ chức công vụ",
          "Nhận diện các đặc trưng: Tinh thần chia sẻ dữ liệu, cởi mở đổi mới, kỷ luật bảo mật và chuẩn mực văn minh số",
          "Xóa bỏ tư tưởng cát cứ thông tin, giữ dữ liệu làm của riêng"
        ],
        summary: "Văn hóa số là hệ thống các chuẩn mực, niềm tin và hành vi ứng xử của cán bộ trên không gian số. Trọng tâm của văn hóa số là: sẵn sàng chia sẻ dữ liệu, làm việc cộng tác đa ngành, lấy người dân làm trung tâm phục vụ, tôn trọng bản quyền và tuân thủ nghiêm ngặt quy chế an toàn thông tin mạng. Xóa bỏ tâm lý 'cát cứ dữ liệu' là khâu then chốt trong xây dựng văn hóa số.",
        keyActionMessage: "Dữ liệu càng chia sẻ hợp pháp, giá trị tạo ra càng lớn; văn hóa số bắt đầu từ sự cởi mở và chuẩn mực.",
        legalBases: ["Quy chế văn hóa công vụ và quy tắc ứng xử trên mạng xã hội"],
        illustrationText: "Chấm dứt cát cứ dữ liệu -> Chia sẻ dữ liệu dùng chung -> Hợp tác liên thông -> Phụng sự minh bạch.",
        questions: [
          {
            id: "cd1-b6-q1",
            type: "scenario",
            question: "Một cán bộ phòng chuyên môn giữ lại cơ sở dữ liệu theo dõi địa bàn trên ổ cứng máy tính cá nhân, không tải lên kho dữ liệu dùng chung của cơ quan vì sợ phòng khác xem được. Hành vi này vi phạm nguyên tắc văn hóa số nào?",
            options: [
              "Nguyên tắc tiết kiệm điện văn phòng",
              "Nguyên tắc chia sẻ dữ liệu và xóa bỏ tư duy cát cứ thông tin trong cơ quan nhà nước",
              "Nguyên tắc sử dụng bàn phím máy tính",
              "Không vi phạm vì dữ liệu cá nhân quản lý là tốt"
            ],
            correctAnswerIndex: 1,
            explanation: "Dữ liệu phục vụ quản lý nhà nước là tài sản công, phải được tích hợp vào kho dữ liệu chung, không được cát cứ cá nhân."
          }
        ]
      },
      {
        id: "cd1-b7",
        topicId: 1,
        lessonNumber: 7,
        title: "Vai trò của lãnh đạo trong chuyển đổi số",
        objectives: [
          "Hiểu vai trò 'Đầu tàu - Gương mẫu - Quyết đoán' của người đứng đầu trong chuyển đổi số",
          "Nắm bắt kỹ năng ra quyết định dựa trên dữ liệu (Data-driven decision making)",
          "Xây dựng cơ chế khuyến khích, bảo vệ cán bộ dám nghĩ, dám làm, dám đổi mới sáng tạo"
        ],
        summary: "Chuyển đổi số thành công hay thất bại phụ thuộc 80% vào nhận thức và quyết tâm của người đứng đầu. Lãnh đạo số không cần là chuyên gia lập trình nhưng phải gương mẫu sử dụng chữ ký số, điều hành công việc qua hệ thống điện tử, kiên quyết từ chối ký văn bản giấy đối với các nội dung đã quy định xử lý số, và chỉ đạo quản lý dựa trên các báo cáo số liệu thời gian thực.",
        keyActionMessage: "Lãnh đạo đi đầu, cán bộ theo sau; quyết tâm chính trị chuyển hóa thành hành động số cụ thể.",
        legalBases: ["Nghị quyết số 76/NQ-CP về Chương trình tổng thể cải cách hành chính nhà nước"],
        illustrationText: "Lãnh đạo tiên phong ký số -> Xử lý văn bản điện tử -> Quyết định dựa trên Dashboard số liệu.",
        questions: [
          {
            id: "cd1-b7-q1",
            type: "knowledge",
            question: "Hành động nào sau đây thể hiện rõ nhất vai trò nêu gương của người đứng đầu cơ quan trong chuyển đổi số?",
            options: [
              "Yêu cầu cấp dưới in công văn ra giấy để ký tay rồi mới quét gửi lại.",
              "Gương mẫu phê duyệt hồ sơ bằng chữ ký số cá nhân và chỉ đạo điều hành qua Hệ thống quản trị văn bản điện tử.",
              "Giao khoán toàn bộ công tác chuyển đổi số cho nhân viên tin học tự quyết định.",
              "Không sử dụng máy tính và điện thoại thông minh trong công việc."
            ],
            correctAnswerIndex: 1,
            explanation: "Lãnh đạo gương mẫu ký số điện tử và điều hành trên môi trường mạng là yếu tố quyết định sự chuyển động của cả cơ quan."
          }
        ]
      },
      {
        id: "cd1-b8",
        topicId: 1,
        lessonNumber: 8,
        title: "Đổi mới sáng tạo trong thời đại số",
        objectives: [
          "Hiểu mối quan hệ biện chứng giữa chuyển đổi số và đổi mới sáng tạo",
          "Nắm bắt phương pháp cải tiến quy trình công vụ bằng công nghệ số",
          "Thực hành tư duy thử nghiệm nhỏ, đo lường nhanh và mở rộng mô hình hiệu quả"
        ],
        summary: "Đổi mới sáng tạo trong kỷ nguyên số là việc áp dụng các ý tưởng, công nghệ hoặc quy trình số mới để giải quyết các nút thắt trong hoạt động công vụ. Đổi mới không nhất thiết phải là dự án triệu đô, mà có thể là một biểu mẫu trực tuyến thông minh, một bảng tính tự động cảnh báo hạn xử lý hồ sơ, hoặc một nhóm tương tác Zalo công vụ giải đáp nhanh thắc mắc của Nhân dân.",
        keyActionMessage: "Mỗi sáng kiến số nhỏ hàng ngày tích lũy thành bước chuyển biến lớn của nền hành chính hiện đại.",
        legalBases: ["Kết luận số 14-KL/TW về chủ trương khuyến khích và bảo vệ cán bộ năng động, sáng tạo"],
        illustrationText: "Phát hiện nút thắt công vụ -> Đề xuất giải pháp số tinh gọn -> Thử nghiệm và đánh giá -> Nhân rộng toàn đơn vị.",
        questions: [
          {
            id: "cd1-b8-q1",
            type: "scenario",
            question: "Một công chức văn phòng sáng kiến tạo một biểu mẫu Google Form/Microsoft Forms có gắn mã QR tại sảnh tiếp dân để người dân đánh giá mức độ hài lòng tức thì, giúp phòng xử lý ngay các phản ánh chậm trễ. Đây là ví dụ của:",
            options: [
              "Lãng phí thời gian của cơ quan",
              "Sáng kiến đổi mới sáng tạo số thiết thực từ thực tiễn công vụ",
              "Vi phạm quy chế tiếp dân",
              "Hành vi tự ý can thiệp hệ thống"
            ],
            correctAnswerIndex: 1,
            explanation: "Sáng kiến ứng dụng công cụ số tinh gọn để đo lường và cải thiện chất lượng phục vụ dân là tinh thần đổi mới sáng tạo đáng khen ngợi."
          }
        ]
      }
    ]
  },
  {
    id: 2,
    number: 2,
    title: "Kiến thức công nghệ số cơ bản",
    description: "Tổng quan kiến trúc phần cứng, phần mềm, mạng máy tính, điện toán đám mây và các xu hướng công nghệ chủ chốt định hình tương lai công vụ.",
    category: "Nhận thức & Nền tảng",
    pageRange: "Trang 51 - 59",
    lessonCount: 2,
    lessons: [
      {
        id: "cd2-b1",
        topicId: 2,
        lessonNumber: 1,
        title: "Công nghệ số và các hệ thống số cơ bản",
        objectives: [
          "Phân biệt phần cứng, phần mềm hệ thống (HĐH) và phần mềm ứng dụng",
          "Hiểu nguyên lý hoạt động của mạng máy tính nội bộ (LAN) và mạng diện rộng (WAN/Internet)",
          "Nắm được vai trò của trung tâm dữ liệu (Data Center) và hệ thống lưu trữ số"
        ],
        summary: "Hệ thống số cơ bản bao gồm: phần cứng (máy tính, thiết bị mạng, máy chủ) đóng vai trò nền tảng vật lý; hệ điều hành (Windows, Linux, iOS, Android) quản lý tài nguyên; và phần mềm ứng dụng phục vụ tác nghiệp chuyên môn. Việc hiểu rõ cấu trúc mạng giúp cán bộ nhận diện được đường truyền nội bộ an toàn và biết cách tự bảo vệ khi kết nối ra Internet.",
        keyActionMessage: "Nắm vững nguyên lý cơ bản của thiết bị và đường truyền để vận hành thiết bị an toàn, bền bỉ.",
        legalBases: ["Quy định quản lý vận hành hạ tầng kỹ thuật CNTT cơ quan nhà nước"],
        illustrationText: "Người dùng -> Phần mềm ứng dụng -> Hệ điều hành -> Phần cứng -> Mạng kết nối.",
        questions: [
          {
            id: "cd2-b1-q1",
            type: "knowledge",
            question: "Hệ điều hành máy tính (như Windows, Linux) giữ vai trò gì trong hệ thống số?",
            options: [
              "Chỉ để lướt web giải trí",
              "Quản lý, điều phối phần cứng và cung cấp môi trường để các phần mềm ứng dụng hoạt động",
              "Là phần cứng vi mạch xử lý bên trong máy tính",
              "Là công cụ diệt virus trực tuyến"
            ],
            correctAnswerIndex: 1,
            explanation: "Hệ điều hành là phần mềm nền tảng quản lý tài nguyên phần cứng và làm cầu nối cho các ứng dụng chạy trên máy."
          }
        ]
      },
      {
        id: "cd2-b2",
        topicId: 2,
        lessonNumber: 2,
        title: "Các công nghệ số chủ chốt định hình tương lai",
        objectives: [
          "Cập nhật các bước tiến công nghệ mới: AI thế hệ mới, Điện toán biên (Edge Computing), Mạng 5G/6G, Bản sao số (Digital Twin)",
          "Dự báo tác động của công nghệ số đến phương thức quản trị quốc gia và dịch vụ công",
          "Xây dựng tâm thế chủ động học tập, không bị tụt hậu trước làn sóng công nghệ mới"
        ],
        summary: "Công nghệ số đang phát triển với tốc độ cấp số nhân. Mạng 5G mang lại kết nối siêu tốc độ và độ trễ cực thấp. Bản sao số (Digital Twin) mô phỏng chính xác đô thị, lưu vực sông giúp phòng chống thiên tai và quy hoạch chính xác. AI thế hệ mới giúp tự động hóa tổng hợp chính sách. Cán bộ công chức cần liên tục cập nhật để kịp thời tham mưu và ứng dụng công nghệ hiệu quả vào ngành mình.",
        keyActionMessage: "Không ngừng cập nhật tri thức mới để công nghệ luôn là trợ lực đắc lực cho công vụ.",
        legalBases: ["Chiến lược quốc gia về nghiên cứu, phát triển và ứng dụng Trí tuệ nhân tạo đến năm 2030"],
        illustrationText: "5G Kết nối siêu tốc -> Cảm biến IoT thu thập dữ liệu -> Digital Twin mô phỏng -> AI phân tích điều hành.",
        questions: [
          {
            id: "cd2-b2-q1",
            type: "knowledge",
            question: "Khái niệm 'Bản sao số' (Digital Twin) trong quản lý đô thị thông minh có ý nghĩa gì?",
            options: [
              "Là bản chụp ảnh vệ tinh thông thường của thành phố",
              "Mô hình ảo tái tạo chính xác trạng thái thực tế của đô thị theo thời gian thực để mô phỏng, dự báo và điều hành",
              "Là trang web bản đồ số công cộng như Google Maps",
              "Là bản sao lưu các file văn bản word của ủy ban"
            ],
            correctAnswerIndex: 1,
            explanation: "Digital Twin tạo bản sao kỹ thuật số sống động của các công trình, giao thông, môi trường thực tế để phân tích và ra quyết định."
          }
        ]
      }
    ]
  },
  {
    id: 3,
    number: 3,
    title: "Kiến thức, kỹ năng số về Trí tuệ nhân tạo (AI)",
    description: "Nguyên lý AI, Machine Learning, Deep Learning, kỹ năng ứng dụng trợ lý ảo, soạn thảo văn bản bằng AI, phân tích dữ liệu, tự động hóa và đạo đức AI trong công vụ.",
    category: "Trí tuệ nhân tạo (AI)",
    pageRange: "Trang 60 - 97",
    lessonCount: 9,
    lessons: [
      {
        id: "cd3-b1",
        topicId: 3,
        lessonNumber: 1,
        title: "Tổng quan về Trí tuệ nhân tạo (AI)",
        objectives: [
          "Hiểu định nghĩa và các cấp độ phát triển của Trí tuệ nhân tạo",
          "Phân biệt AI hẹp (Narrow AI), AI tạo sinh (Generative AI) và Trí tuệ nhân tạo tổng quát (AGI)",
          "Nắm vững nguyên tắc 'AI hỗ trợ - Con người chịu trách nhiệm cuối cùng'"
        ],
        summary: "Trí tuệ nhân tạo (AI) là khả năng của máy tính mô phỏng các năng lực trí tuệ của con người như học hỏi, suy luận, nhận dạng giọng nói và hình ảnh. AI thế hệ mới (GenAI) có khả năng tự sáng tạo nội dung văn bản, đồ họa và mã lệnh. Trong công vụ, AI là người trợ lý tăng tốc độ xử lý, nhưng cán bộ công chức luôn là người chịu trách nhiệm pháp lý cao nhất đối với quyết định ban hành.",
        keyActionMessage: "AI làm nhanh - Con người làm chuẩn; AI là trợ thủ, con người giữ quyền quyết định.",
        legalBases: ["Chiến lược quốc gia về nghiên cứu, phát triển và ứng dụng AI đến năm 2030"],
        illustrationText: "Dữ liệu lớn -> Mô hình học thuật toán -> AI suy luận và tạo câu trả lời -> Cán bộ thẩm định và phê duyệt.",
        questions: [
          {
            id: "cd3-b1-q1",
            type: "knowledge",
            question: "Khi sử dụng các công cụ AI (như ChatGPT, Gemini) để hỗ trợ công việc hành chính, nguyên tắc cốt lõi cán bộ phải tuân thủ là gì?",
            options: [
              "Sao chép nguyên văn câu trả lời của AI vào văn bản chính thức mà không cần đọc lại.",
              "AI chỉ đóng vai trò trợ lý gợi ý; cán bộ phải kiểm chứng độ chính xác và chịu hoàn toàn trách nhiệm về nội dung.",
              "Nếu văn bản có sai sót thì lỗi hoàn toàn thuộc về công ty sản xuất AI.",
              "Cán bộ không được phép áp dụng AI vào bất kỳ khâu nào trong công việc."
            ],
            correctAnswerIndex: 1,
            explanation: "Cán bộ công chức giữ trách nhiệm công vụ pháp lý, AI chỉ là công cụ hỗ trợ."
          }
        ]
      },
      {
        id: "cd3-b2",
        topicId: 3,
        lessonNumber: 2,
        title: "Học máy (Machine Learning) và Học sâu (Deep Learning)",
        objectives: [
          "Nắm bắt khái niệm Học máy (ML) và Học sâu dựa trên mạng nơ-ron (Deep Learning)",
          "Hiểu vai trò sống còn của dữ liệu sạch đối với độ chính xác của mô hình học",
          "Nhận biết hiện tượng 'Ảo giác AI' (Hallucination) và cách phòng ngừa"
        ],
        summary: "Học máy giúp hệ thống tự rút ra quy luật từ lượng lớn dữ liệu mà không cần lập trình cứng từng dòng lệnh. Học sâu sử dụng các mạng nơ-ron nhân tạo nhiều lớp để xử lý hình ảnh, âm thanh phức tạp. Chất lượng đầu ra của AI phụ thuộc vào dữ liệu huấn luyện: 'Dữ liệu rác thì kết quả rác'. Cán bộ cần cảnh giác với hiện tượng AI tạo ra thông tin trông rất thuyết phục nhưng hoàn toàn bịa đặt (Ảo giác AI).",
        keyActionMessage: "Cảnh giác với 'ảo giác AI': Luôn đối chiếu trích dẫn điều luật từ văn bản quy phạm pháp luật gốc.",
        legalBases: ["Quy chuẩn kỹ thuật quốc gia về cấu trúc dữ liệu và mô hình thuật toán số"],
        illustrationText: "Dữ liệu huấn luyện sạch -> Thuật toán Machine Learning -> Dự đoán chính xác (Kiểm tra tránh Ảo giác AI).",
        questions: [
          {
            id: "cd3-b2-q1",
            type: "knowledge",
            question: "Hiện tượng 'Ảo giác của AI' (AI Hallucination) nghĩa là gì?",
            options: [
              "Màn hình máy tính hiển thị màu sắc ảo diệu",
              "AI tạo ra câu trả lời nghe rất trôi chảy, tự tin nhưng thực chất thông tin sai sự thật hoặc bịa đặt",
              "Máy tính bị nhiễm virus làm chậm đường truyền",
              "AI bị mất kết nối mạng Internet"
            ],
            correctAnswerIndex: 1,
            explanation: "Ảo giác AI là hiện tượng mô hình ngôn ngữ tự bịa đặt thông tin, trích dẫn sai số hiệu văn bản pháp luật nếu không được đối chiếu."
          }
        ]
      },
      {
        id: "cd3-b3",
        topicId: 3,
        lessonNumber: 3,
        title: "Quy trình phát triển và ứng dụng AI",
        objectives: [
          "Nắm bắt 5 bước cơ bản triển khai AI: Thu thập dữ liệu - Tiền xử lý - Huấn luyện - Đánh giá - Triển khai giám sát",
          "Hiểu các tiêu chuẩn thẩm định giải pháp AI trước khi áp dụng vào cơ quan nhà nước",
          "Biết cách phát hiện và khắc phục sai lệch (Bias) trong dữ liệu công vụ"
        ],
        summary: "Triển khai AI trong khu vực công đòi hỏi quy trình chặt chẽ để đảm bảo tính công bằng, minh bạch và an toàn. Quy trình gồm: Xác định bài toán nghiệp vụ, chuẩn hóa và gán nhãn dữ liệu, huấn luyện mô hình, đánh giá độ chính xác và rủi ro đạo đức, cuối cùng là triển khai có sự giám sát liên tục của con người (Human-in-the-loop).",
        keyActionMessage: "Đưa AI vào công vụ phải qua quy trình thẩm định an toàn thông tin và kiểm thử nghiêm ngặt.",
        legalBases: ["Khung hướng dẫn triển khai ứng dụng AI có trách nhiệm trong cơ quan nhà nước"],
        illustrationText: "Xác định nhu cầu -> Dữ liệu sạch -> Huấn luyện & Kiểm thử an toàn -> Giám sát liên tục.",
        questions: [
          {
            id: "cd3-b3-q1",
            type: "knowledge",
            question: "Trong quy trình ứng dụng AI vào cơ quan nhà nước, cơ chế 'Con người giám sát' (Human-in-the-loop) có nghĩa là gì?",
            options: [
              "Để con người tự tay gõ lại từng chữ của máy tính",
              "Mọi kết quả đầu ra quan trọng của AI trước khi ban hành đều phải qua sự kiểm tra, phê duyệt của cán bộ có thẩm quyền",
              "Một cán bộ đứng canh máy chủ 24/24 giờ",
              "Cấm không cho AI tự động chạy bất kỳ tác vụ tính toán nào"
            ],
            correctAnswerIndex: 1,
            explanation: "Human-in-the-loop đảm bảo quyết định hành chính cuối cùng luôn thuộc quyền kiểm soát và trách nhiệm của cán bộ."
          }
        ]
      },
      {
        id: "cd3-b4",
        topicId: 3,
        lessonNumber: 4,
        title: "Trợ lý ảo và ứng dụng trong công việc",
        objectives: [
          "Hiểu cơ chế hoạt động của Trợ lý ảo công vụ (Virtual Assistant/Chatbot)",
          "Thực hành khai thác trợ lý ảo để tra cứu văn bản pháp luật, thủ tục hành chính nhanh chóng",
          "Tuân thủ tuyệt đối quy định không đưa dữ liệu Mật, Tối mật lên các trợ lý ảo công cộng"
        ],
        summary: "Trợ lý ảo chuyên ngành (như Trợ lý ảo Tòa án, Trợ lý ảo lập pháp, Chatbot dịch vụ công) giúp tra cứu tức thì hàng chục ngàn văn bản pháp quy, án lệ và hướng dẫn nghiệp vụ. Khi sử dụng trợ lý ảo công cộng (Gemini, ChatGPT), cán bộ phải tuân thủ nguyên tắc 'Dữ liệu nào, công cụ đó': Tuyệt đối không nhập thông tin bí mật nhà nước, dữ liệu cá nhân nhạy cảm của người dân.",
        keyActionMessage: "Dữ liệu nào - Công cụ đó: Tuyệt đối không nạp dữ liệu mật vào các trợ lý ảo công cộng.",
        legalBases: ["Luật Bảo vệ bí mật nhà nước số 117/2025/QH15", "Luật An ninh mạng"],
        illustrationText: "Tra cứu trợ lý ảo: Câu hỏi chuẩn xác -> Kết quả điều luật chính xác (Không dán dữ liệu mật/nội bộ).",
        questions: [
          {
            id: "cd3-b4-q1",
            type: "scenario",
            question: "Cán bộ đang chuẩn bị dự thảo quyết định xử phạt vi phạm hành chính có chứa họ tên, số CCCD, địa chỉ cư trú của công dân. Cán bộ có được dán nguyên văn bản này lên ChatGPT công cộng để nhờ sửa lỗi ngữ pháp không?",
            options: [
              "Được phép, vì ChatGPT bảo mật rất an toàn.",
              "Tuyệt đối không được phép, vì vi phạm Luật Bảo vệ dữ liệu cá nhân và an toàn thông tin cơ quan.",
              "Được phép nếu dán vào ban đêm.",
              "Được phép nếu chỉ hỏi một đoạn ngắn."
            ],
            correctAnswerIndex: 1,
            explanation: "Dán thông tin cá nhân định danh lên AI công cộng vi phạm pháp luật bảo vệ dữ liệu cá nhân và an toàn thông tin."
          }
        ]
      },
      {
        id: "cd3-b5",
        topicId: 3,
        lessonNumber: 5,
        title: "Ứng dụng AI trong soạn thảo và xử lý văn bản",
        objectives: [
          "Nắm vững kỹ năng viết câu lệnh (Prompt Engineering) chuẩn mực để AI tạo dàn ý, tóm tắt công văn",
          "Sử dụng AI hỗ trợ sửa lỗi chính tả, chuẩn hóa văn phong hành chính theo Nghị định 30/2020/NĐ-CP",
          "Thẩm định tính chính xác của căn cứ pháp lý do AI gợi ý"
        ],
        summary: "Kỹ năng ra lệnh (Prompting) là chìa khóa để khai thác sức mạnh của AI trong soạn thảo văn bản. Một câu lệnh tốt gồm 4 yếu tố: Vai trò (Role) + Bối cảnh (Context) + Nhiệm vụ cụ thể (Task) + Định dạng mong muốn (Format). AI có thể giúp tạo khung đề cương báo cáo, rút gọn văn bản dài hàng chục trang thành 1 trang tóm tắt chỉ trong vài giây.",
        keyActionMessage: "Công thức câu lệnh chuẩn: Vai trò + Bối cảnh + Nhiệm vụ cụ thể + Định dạng đầu ra.",
        legalBases: ["Nghị định số 30/2020/NĐ-CP về công tác văn thư"],
        illustrationText: "Prompt: [Vai trò chuyên gia] + [Bối cảnh cơ quan] + [Nhiệm vụ: Tóm tắt 5 điểm] + [Định dạng: Gạch đầu dòng].",
        questions: [
          {
            id: "cd3-b5-q1",
            type: "knowledge",
            question: "Cấu trúc một câu lệnh (Prompt) chuẩn để AI hỗ trợ soạn thảo dự thảo kế hoạch công vụ bao gồm các thành phần nào?",
            options: [
              "Chỉ cần gõ một chữ duy nhất như: 'Viết kế hoạch'",
              "Vai trò (Role) + Bối cảnh (Context) + Yêu cầu nhiệm vụ cụ thể (Task) + Định dạng kết quả (Format)",
              "Tên của lãnh đạo cơ quan và mật khẩu máy tính",
              "Địa chỉ email của cán bộ soạn thảo"
            ],
            correctAnswerIndex: 1,
            explanation: "Prompt đầy đủ 4 thành phần giúp AI định vị chính xác ngữ cảnh công vụ và trả về kết quả chất lượng cao."
          }
        ]
      },
      {
        id: "cd3-b6",
        topicId: 3,
        lessonNumber: 6,
        title: "Ứng dụng AI trong phân tích dữ liệu và ra quyết định",
        objectives: [
          "Biết cách dùng AI để đọc hiểu và trích xuất số liệu từ các bảng tính phức tạp",
          "Khai thác biểu đồ phân tích xu hướng phục vụ báo cáo định kỳ",
          "Nhận diện các giới hạn thống kê của AI để tránh quyết định sai lệch"
        ],
        summary: "AI có khả năng phân tích hàng ngàn dòng dữ liệu thống kê kinh tế - xã hội, phát hiện các điểm bất thường (như hồ sơ chậm trễ tăng đột biến ở một khâu) và tạo báo cáo trực quan nhanh chóng. Cán bộ cần hiểu các chỉ số cơ bản để đọc hiểu biểu đồ và đưa ra đề xuất chính sách chuẩn xác cho lãnh đạo.",
        keyActionMessage: "Dữ liệu kể chuyện, AI tìm xu hướng, cán bộ đề xuất chính sách vì lợi ích của Nhân dân.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP về quản lý, kết nối và chia sẻ dữ liệu số"],
        illustrationText: "Bảng dữ liệu thô -> AI tính toán chỉ số & phát hiện dị biệt -> Đề xuất phương án xử lý.",
        questions: [
          {
            id: "cd3-b6-q1",
            type: "scenario",
            question: "Sau khi nạp bảng số liệu tiếp nhận hồ sơ hành chính vào công cụ phân tích, AI báo cáo tỷ lệ trễ hạn tập trung 80% tại khâu thẩm định đất đai. Cán bộ nên xử lý thế nào?",
            options: [
              "Bỏ qua báo cáo vì AI không biết gì.",
              "Báo cáo ngay lãnh đạo để kiểm tra thực tế quy trình thẩm định đất đai nhằm tháo gỡ điểm nghẽn cho người dân.",
              "Xóa số liệu trễ hạn để báo cáo thành tích 100% đúng hạn.",
              "Yêu cầu người dân không nộp hồ sơ đất đai nữa."
            ],
            correctAnswerIndex: 1,
            explanation: "Dữ liệu phân tích giúp phát hiện điểm nghẽn thực tế để điều chỉnh quy trình và phân bổ nhân lực kịp thời."
          }
        ]
      },
      {
        id: "cd3-b7",
        topicId: 3,
        lessonNumber: 7,
        title: "Ứng dụng AI trong tự động hóa quy trình nghiệp vụ",
        objectives: [
          "Hiểu khái niệm tự động hóa quy trình bằng robot phần mềm (RPA) kết hợp AI",
          "Nhận diện các tác vụ lặp đi lặp lại có thể tự động hóa (phân loại đơn thư, nhập liệu biểu mẫu)",
          "Đánh giá hiệu quả tiết kiệm thời gian và giảm thiểu sai sót do con người"
        ],
        summary: "Sự kết hợp giữa AI và Tự động hóa quy trình (RPA) tạo nên 'Tự động hóa thông minh'. Thay vì cán bộ phải gõ lại từng thông tin từ đơn thư quét scan vào phần mềm, AI OCR đọc chữ và tự động điền vào các trường tương ứng trên cơ sở dữ liệu. Nhờ đó, thời gian xử lý thủ tục hành chính giảm từ vài ngày xuống vài phút.",
        keyActionMessage: "Giải phóng cán bộ khỏi các công việc lặp lại thủ công để tập trung giải quyết các vấn đề chuyên sâu.",
        legalBases: ["Đề án đơn giản hóa thủ tục hành chính và số hóa quy trình giải quyết công vụ"],
        illustrationText: "Quét đơn thư (OCR AI) -> Trích xuất dữ liệu tự động -> Điền vào phần mềm một cửa -> Gửi thông báo SMS.",
        questions: [
          {
            id: "cd3-b7-q1",
            type: "knowledge",
            question: "Lợi ích lớn nhất của việc kết hợp AI OCR và tự động hóa trong khâu tiếp nhận hồ sơ hành chính là gì?",
            options: [
              "Cán bộ không cần phải đến cơ quan làm việc nữa",
              "Tự động trích xuất thông tin giấy tờ chính xác, giảm thời gian nhập liệu thủ công và hạn chế sai sót",
              "Làm cho hồ sơ giấy biến mất vĩnh viễn",
              "Không cần người dân phải ký tên"
            ],
            correctAnswerIndex: 1,
            explanation: "Tự động hóa nhập liệu giúp tăng năng suất lao động, giảm thời gian chờ đợi của công dân và loại trừ lỗi gõ sai."
          }
        ]
      },
      {
        id: "cd3-b8",
        topicId: 3,
        lessonNumber: 8,
        title: "Đạo đức AI và sử dụng AI có trách nhiệm",
        objectives: [
          "Nắm vững 5 nguyên tắc đạo đức AI: Công bằng, Minh bạch, An toàn, Trách nhiệm và Bảo vệ quyền riêng tư",
          "Nhận diện các rủi ro thiên kiến phân biệt đối xử của thuật toán",
          "Thực hiện nghiêm túc chuẩn mực đạo đức công vụ khi ứng dụng các giải pháp số thông minh"
        ],
        summary: "Đạo đức AI là yêu cầu bắt buộc khi ứng dụng công nghệ vào khu vực công. Các hệ thống AI phải đảm bảo tính công bằng (không phân biệt đối xử theo giới tính, dân tộc, vùng miền), minh bạch (có thể giải trình được lý do đưa ra kết quả), bảo vệ quyền riêng tư và luôn nằm dưới sự kiểm soát đạo đức của con người.",
        keyActionMessage: "Công nghệ phục vụ con người; đạo đức công vụ là kim chỉ nam định hướng mọi thuật toán AI.",
        legalBases: ["Khung nguyên tắc đạo đức AI của UNESCO và hướng dẫn quốc gia"],
        illustrationText: "5 Trụ cột đạo đức AI: Công bằng - Minh bạch - Quyền riêng tư - Trách nhiệm giải trình - Vì con người.",
        questions: [
          {
            id: "cd3-b8-q1",
            type: "knowledge",
            question: "Khi cơ quan ứng dụng AI hỗ trợ chấm điểm hồ sơ tuyển dụng hoặc xét duyệt trợ cấp, yêu cầu đạo đức quan trọng hàng đầu là gì?",
            options: [
              "Giữ kín hoàn toàn thuật toán không cho ai biết",
              "Bảo đảm thuật toán công bằng, không thiên vị, minh bạch và có thể giải trình rõ ràng lý do cho người dân",
              "Để AI tự quyết định loại hồ sơ mà không cần giải thích",
              "Ưu tiên người quen của lập trình viên"
            ],
            correctAnswerIndex: 1,
            explanation: "Nguyên tắc công bằng và khả năng giải trình (Explainability) là cốt lõi của đạo đức AI trong nền hành chính công."
          }
        ]
      },
      {
        id: "cd3-b9",
        topicId: 3,
        lessonNumber: 9,
        title: "Xu hướng phát triển của AI và tác động đến công vụ",
        objectives: [
          "Nắm bắt xu thế AI đa phương thức (Multimodal AI) và các tác tử tự hành (AI Agents)",
          "Dự báo sự chuyển dịch trong vị trí việc làm và yêu cầu kỹ năng mới của cán bộ công chức",
          "Chủ động rèn luyện tư duy phản biện và khả năng thích ứng linh hoạt trong kỷ nguyên số"
        ],
        summary: "AI đang tiến hóa từ việc chỉ trả lời văn bản sang AI đa phương thức (xử lý đồng thời hình ảnh, âm thanh, video) và các AI Agent có khả năng chủ động phối hợp thực hiện chuỗi tác vụ phức tạp. Cán bộ công chức trong tương lai sẽ làm việc bên cạnh các đồng nghiệp ảo (Co-pilots). Kỹ năng tư duy phản biện, thấu cảm và giải quyết vấn đề phức tạp sẽ trở thành giá trị không thể thay thế của con người.",
        keyActionMessage: "AI không thay thế cán bộ; cán bộ biết sử dụng AI thành thạo sẽ thay thế cán bộ không chịu đổi mới.",
        legalBases: ["Nghị quyết Trung ương về phát triển nguồn nhân lực chất lượng cao"],
        illustrationText: "Cán bộ công chức + Trợ lý AI đồng hành = Hiệu suất x10, phục vụ Nhân dân chuyên nghiệp hơn.",
        questions: [
          {
            id: "cd3-b9-q1",
            type: "knowledge",
            question: "Nhận định nào sau đây là chuẩn xác nhất về tương lai của cán bộ công chức trong thời đại trí tuệ nhân tạo?",
            options: [
              "Toàn bộ công chức sẽ bị robot thay thế hoàn toàn trong vòng 2 năm tới.",
              "AI không thay thế con người, nhưng cán bộ biết ứng dụng AI thành thạo sẽ làm việc hiệu quả vượt trội so với người không chịu thay đổi.",
              "Cán bộ không cần học thêm kỹ năng gì vì AI sẽ làm thay mọi việc.",
              "Càng dùng AI thì công việc càng chậm chạp hơn."
            ],
            correctAnswerIndex: 1,
            explanation: "Sự kết hợp giữa trí tuệ con người và sức mạnh tính toán của AI sẽ tạo ra năng suất và chất lượng công vụ vượt bậc."
          }
        ]
      }
    ]
  },
  {
    id: 4,
    number: 4,
    title: "Sử dụng thiết bị số",
    description: "Thao tác máy tính, thiết bị ngoại vi, thiết bị di động thông minh, cài đặt quản lý phần mềm, kết nối mạng và bảo trì xử lý sự cố thiết bị cơ bản.",
    category: "Thiết bị & Văn phòng",
    pageRange: "Trang 98 - 118",
    lessonCount: 5,
    lessons: [
      {
        id: "cd4-b1",
        topicId: 4,
        lessonNumber: 1,
        title: "Sử dụng máy tính và các thiết bị ngoại vi",
        objectives: [
          "Nắm vững các cổng kết nối chuẩn (USB, HDMI, LAN, Type-C) và cách đấu nối an toàn",
          "Thao tác sử dụng máy in, máy quét (scanner), máy chiếu và thiết bị ký số",
          "Tuân thủ quy tắc an toàn điện và bảo vệ phần cứng máy tính công vụ"
        ],
        summary: "Máy tính để bàn, máy tính xách tay và các thiết bị ngoại vi là công cụ làm việc thiết yếu hàng ngày. Cán bộ cần nhận biết đúng các cổng giao tiếp, sử dụng máy in hai mặt tiết kiệm giấy, quét tài liệu với độ phân giải chuẩn (200-300 dpi cho văn bản hành chính) và tháo lắp các thiết bị ngoại vi an toàn (chọn Eject an toàn trước khi rút USB).",
        keyActionMessage: "Sử dụng thiết bị đúng kỹ thuật, ngắt kết nối an toàn để bảo vệ tuổi thọ phần cứng và dữ liệu.",
        legalBases: ["Quy định quản lý tài sản công và thiết bị văn phòng"],
        illustrationText: "Cắm đúng cổng -> Chọn đúng máy in/máy scan -> Eject trước khi rút USB lưu trữ.",
        questions: [
          {
            id: "cd4-b1-q1",
            type: "knowledge",
            question: "Trước khi rút ổ cứng di động hoặc USB chứa tài liệu ra khỏi máy tính, thao tác an toàn bắt buộc là gì?",
            options: [
              "Rút mạnh trực tiếp thật nhanh",
              "Chọn tính năng 'Safely Remove Hardware and Eject Media' trên khay hệ thống rồi mới rút",
              "Tắt màn hình máy tính rồi rút",
              "Khởi động lại máy tính"
            ],
            correctAnswerIndex: 1,
            explanation: "Eject an toàn giúp hệ điều hành ghi hết các bộ đệm dữ liệu dở dang, tránh sốc điện và hỏng file trên USB."
          }
        ]
      },
      {
        id: "cd4-b2",
        topicId: 4,
        lessonNumber: 2,
        title: "Sử dụng thiết bị di động thông minh trong công việc",
        objectives: [
          "Sử dụng smartphone, máy tính bảng để xử lý công việc từ xa an toàn",
          "Cài đặt và sử dụng các ứng dụng công vụ (VNeID, e-Cabinet, Quản lý văn bản điện tử)",
          "Bật khóa bảo mật sinh trắc học và mã hóa trên thiết bị di động"
        ],
        summary: "Thiết bị di động giúp cán bộ xử lý công việc linh hoạt mọi lúc mọi nơi. Tuy nhiên, rủi ro mất cắp thiết bị hoặc lộ thông tin qua màn hình là rất lớn. Bắt buộc phải cài đặt khóa màn hình bằng mã PIN phức tạp hoặc vân tay/khuôn mặt, không lưu trữ mật khẩu trần trên ghi chú, và kích hoạt tính năng tìm kiếm thiết bị / xóa dữ liệu từ xa khi bị mất.",
        keyActionMessage: "Thiết bị di động gắn liền với công vụ: Luôn khóa bảo mật sinh trắc học và không lưu mật khẩu sơ hở.",
        legalBases: ["Quy định về bảo đảm an toàn thông tin trên thiết bị di động của cơ quan nhà nước"],
        illustrationText: "Khóa PIN/Vân tay -> Cài ứng dụng từ nguồn tin cậy -> Bật xóa từ xa nếu thất lạc.",
        questions: [
          {
            id: "cd4-b2-q1",
            type: "scenario",
            question: "Cán bộ sử dụng điện thoại cá nhân có cài đặt ứng dụng email công vụ và điều hành văn bản của cơ quan. Để đảm bảo an toàn, cán bộ cần thiết lập tối thiểu điều gì?",
            options: [
              "Để màn hình mở tự do không cần khóa để mở cho nhanh",
              "Cài mật khẩu mở khóa màn hình (hoặc sinh trắc học) và không cho người lạ mượn máy",
              "Ghi mật khẩu vào ốp lưng điện thoại",
              "Tắt tính năng cập nhật bảo mật"
            ],
            correctAnswerIndex: 1,
            explanation: "Mật khẩu màn hình hoặc sinh trắc học là phòng tuyến đầu tiên bảo vệ dữ liệu công vụ khi thiết bị rời khỏi tầm tay cán bộ."
          }
        ]
      },
      {
        id: "cd4-b3",
        topicId: 4,
        lessonNumber: 3,
        title: "Cài đặt và quản lý phần mềm trên thiết bị số",
        objectives: [
          "Hiểu quy trình cài đặt phần mềm có bản quyền và nguồn gốc an toàn",
          "Nhận biết nguy cơ mã độc khi cài đặt phần mềm 'bẻ khóa' (Crack), lậu",
          "Quản lý gỡ bỏ các ứng dụng không cần thiết và kiểm soát quyền ứng dụng (Permissions)"
        ],
        summary: "Máy tính cơ quan nhà nước tuyệt đối không được tự ý cài đặt các phần mềm lậu, game, hoặc công cụ bẻ khóa trôi nổi trên mạng vì đây là con đường lây nhiễm mã độc gián điệp nguy hiểm nhất. Mọi phần mềm chuyên môn phải do bộ phận CNTT phê duyệt hoặc tải từ trang chính thức của nhà sản xuất uy tín.",
        keyActionMessage: "Tuyệt đối không tải phần mềm bẻ khóa (Crack) vào máy tính cơ quan: 99% phần mềm lậu chứa mã độc ẩn.",
        legalBases: ["Chỉ thị về bảo đảm an toàn thông tin mạng trong các cơ quan nhà nước"],
        illustrationText: "Tải từ nguồn chính thống -> Kiểm tra chữ ký số phần mềm -> Quét virus trước khi cài.",
        questions: [
          {
            id: "cd4-b3-q1",
            type: "knowledge",
            question: "Tại sao cán bộ công chức tuyệt đối không được tải các phần mềm bẻ khóa (Crack) trên mạng vào máy tính cơ quan?",
            options: [
              "Vì phần mềm crack chạy nhanh quá làm hỏng chuột",
              "Vì phần mềm crack tiềm ẩn mã độc, backdoor cho phép hacker chiếm quyền điều khiển và đánh cắp dữ liệu cơ quan",
              "Vì không có hình ảnh đẹp",
              "Vì máy tính cơ quan không đọc được tệp tin zip"
            ],
            correctAnswerIndex: 1,
            explanation: "Phần mềm lậu thường bị cấy mã độc gián điệp nhằm đột nhập vào hệ thống mạng nội bộ cơ quan nhà nước."
          }
        ]
      },
      {
        id: "cd4-b4",
        topicId: 4,
        lessonNumber: 4,
        title: "Kết nối mạng và chia sẻ dữ liệu giữa các thiết bị",
        objectives: [
          "Phân biệt mạng nội bộ cơ quan (mạng LAN dùng riêng) và mạng Internet thông thường",
          "Thiết lập chia sẻ file an toàn trong mạng nội bộ có phân quyền người dùng",
          "Nhận biết rủi ro khi cắm thiết bị lưu trữ chia sẻ không kiểm soát"
        ],
        summary: "Kết nối mạng cho phép các máy tính trong cơ quan chia sẻ máy in và tệp tài liệu thuận tiện. Khi chia sẻ thư mục trên mạng nội bộ, cán bộ chỉ phân quyền truy cập cho đúng đối tượng được phép (Read-only hoặc Read/Write), không mở quyền 'Everyone' không có mật khẩu. Sử dụng đường truyền mạng dùng riêng của cơ quan khi xử lý các dữ liệu nhạy cảm.",
        keyActionMessage: "Phân quyền chia sẻ thư mục chặt chẽ; không mở quyền truy cập tự do cho mọi người trong mạng.",
        legalBases: ["Quy chế vận hành Mạng truyền số liệu chuyên dùng của cơ quan Đảng, Nhà nước"],
        illustrationText: "Tạo thư mục -> Phân quyền đúng người nhận -> Đặt mật khẩu -> Khóa quyền Everyone.",
        questions: [
          {
            id: "cd4-b4-q1",
            type: "scenario",
            question: "Khi chia sẻ một thư mục tài liệu dự thảo báo cáo cho đồng nghiệp cùng phòng qua mạng LAN, cán bộ nên thiết lập quyền nào để người khác không vô tình xóa nhầm file gốc?",
            options: [
              "Quyền Full Control cho toàn bộ người dùng",
              "Quyền Đọc (Read-only) và chỉ cấp quyền ghi cho người được phân công chỉnh sửa",
              "Tắt luôn mật khẩu mạng",
              "Đổi tên thư mục thành tên ngẫu nhiên"
            ],
            correctAnswerIndex: 1,
            explanation: "Cấp quyền Read-only giúp người khác xem được nội dung mà không thể ghi đè hoặc xóa mất tài liệu gốc."
          }
        ]
      },
      {
        id: "cd4-b5",
        topicId: 4,
        lessonNumber: 5,
        title: "Bảo trì và xử lý sự cố cơ bản trên thiết bị số",
        objectives: [
          "Thực hiện vệ sinh công nghiệp, bảo dưỡng định kỳ máy tính và thiết bị văn phòng",
          "Xử lý các sự cố cơ bản: Treo máy (Not Responding), máy in kẹt giấy, mất kết nối mạng",
          "Biết cách sử dụng Task Manager để tắt ứng dụng bị đơ mà không cần rút nguồn đột ngột"
        ],
        summary: "Bảo trì định kỳ giúp thiết bị hoạt động ổn định và kéo dài tuổi thọ. Khi phần mềm bị treo, cán bộ không nên rút dây nguồn đột ngột (gây sốc điện hỏng ổ cứng) mà hãy dùng tổ hợp phím Ctrl + Shift + Esc để mở Task Manager và tắt ứng dụng bị lỗi. Kiểm tra cáp mạng, khởi động lại modem/máy in khi gặp sự cố kết nối cơ bản.",
        keyActionMessage: "Không rút nguồn đột ngột khi máy tính bị treo: Dùng Task Manager để đóng tiến trình an toàn.",
        legalBases: ["Quy định sử dụng và bảo dưỡng trang thiết bị công nghệ văn phòng"],
        illustrationText: "Treo máy -> Bấm Ctrl+Shift+Esc -> Chọn End Task phần mềm lỗi (Tránh giật nguồn).",
        questions: [
          {
            id: "cd4-b5-q1",
            type: "knowledge",
            question: "Khi một phần mềm soạn thảo văn bản đột ngột bị đơ (Not Responding), thao tác xử lý đúng kỹ thuật là gì?",
            options: [
              "Rút ngay dây cắm nguồn điện phía sau máy tính",
              "Nhấn tổ hợp phím Ctrl + Shift + Esc để mở Task Manager, chọn phần mềm bị treo và bấm 'End Task'",
              "Lấy tay đập mạnh vào thùng máy",
              "Đập bàn phím nhiều lần"
            ],
            correctAnswerIndex: 1,
            explanation: "Sử dụng Task Manager giúp đóng phần mềm bị lỗi an toàn mà không làm tổn hại hệ điều hành và ổ cứng."
          }
        ]
      }
    ]
  },
  {
    id: 5,
    number: 5,
    title: "Các phần mềm, ứng dụng phổ biến",
    description: "Kỹ năng chuyên sâu về phần mềm văn phòng: Soạn thảo văn bản chuẩn thể thức, bảng tính và trực quan hóa dữ liệu, trình chiếu chuyên nghiệp, cộng tác trực tuyến và khai thác CSDL chuyên ngành.",
    category: "Thiết bị & Văn phòng",
    pageRange: "Trang 119 - 139",
    lessonCount: 5,
    lessons: [
      {
        id: "cd5-b1",
        topicId: 5,
        lessonNumber: 1,
        title: "Sử dụng phần mềm soạn thảo văn bản nâng cao",
        objectives: [
          "Áp dụng chuẩn thể thức văn bản hành chính theo Nghị định số 30/2020/NĐ-CP (Font chữ, căn lề, số trang, đề mục)",
          "Thành thạo tính năng Trộn thư (Mail Merge) để phát hành giấy mời, thông báo hàng loạt",
          "Sử dụng công cụ theo dõi chỉnh sửa (Track Changes) và so sánh văn bản (Compare Documents)"
        ],
        summary: "Soạn thảo văn bản là kỹ năng cốt lõi hàng ngày của cán bộ. Nghị định 30/2020/NĐ-CP quy định chuẩn: Phông chữ Times New Roman, cỡ chữ 13-14, căn lề trên/dưới 20-25mm, lề trái 30-35mm, lề phải 15-20mm. Thành thạo tính năng Mail Merge giúp tạo hàng trăm giấy mời hội nghị chỉ trong 1 phút; tính năng Track Changes giúp nhiều người cùng tham gia đóng góp ý kiến vào dự thảo một cách minh bạch.",
        keyActionMessage: "Soạn thảo chuẩn thể thức Nghị định 30/2020/NĐ-CP là danh dự và tính chuyên nghiệp của người làm công vụ.",
        legalBases: ["Nghị định số 30/2020/NĐ-CP ngày 05/3/2020 về công tác văn thư"],
        illustrationText: "Font Times New Roman -> Căn lề chuẩn (Trái 3-3.5cm, Phải 1.5-2cm) -> Dùng Track Changes kiểm soát sửa đổi.",
        questions: [
          {
            id: "cd5-b1-q1",
            type: "knowledge",
            question: "Theo Nghị định 30/2020/NĐ-CP, quy định căn lề trang văn bản khổ A4 (lề trái) của văn bản hành chính chuẩn là bao nhiêu?",
            options: [
              "10 - 15 mm",
              "30 - 35 mm",
              "20 - 25 mm",
              "40 - 50 mm"
            ],
            correctAnswerIndex: 1,
            explanation: "Lề trái được quy định rộng 30 - 35 mm để chừa mép ghim đóng tập tài liệu lưu trữ."
          }
        ]
      },
      {
        id: "cd5-b2",
        topicId: 5,
        lessonNumber: 2,
        title: "Sử dụng phần mềm bảng tính và trực quan hóa dữ liệu",
        objectives: [
          "Sử dụng thành thạo các hàm tính toán cơ bản và thống kê (SUM, AVERAGE, IF, VLOOKUP/XLOOKUP, COUNTIF)",
          "Tạo bảng tổng hợp PivotTable và lọc dữ liệu nâng cao",
          "Vẽ biểu đồ hình cột, hình tròn trực quan hóa số liệu báo cáo"
        ],
        summary: "Phần mềm bảng tính (Excel, Google Sheets) là công cụ đắc lực để tổng hợp số liệu kinh tế - xã hội, ngân sách và theo dõi tiến độ công việc. Sử dụng PivotTable cho phép cán bộ tổng hợp báo cáo từ hàng ngàn dòng dữ liệu trong tích tắc. Trực quan hóa số liệu bằng biểu đồ chuẩn giúp lãnh đạo dễ dàng nắm bắt bức tranh toàn cảnh khi phê duyệt kế hoạch.",
        keyActionMessage: "Làm chủ bảng tính và biểu đồ: Biến số liệu thô thành thông tin giá trị phục vụ lãnh đạo ra quyết định.",
        legalBases: ["Quy định chế độ báo cáo thống kê định kỳ cơ quan hành chính nhà nước"],
        illustrationText: "Bảng dữ liệu chuẩn -> Áp dụng hàm thống kê -> Tạo PivotTable -> Xuất biểu đồ trực quan.",
        questions: [
          {
            id: "cd5-b2-q1",
            type: "knowledge",
            question: "Công cụ nào trong Excel giúp cán bộ nhanh chóng tổng hợp, xoay chiều và phân tích dữ liệu lớn từ nhiều khía cạnh mà không cần viết các công thức phức tạp?",
            options: [
              "PivotTable (Bảng tổng hợp động)",
              "Đổi màu ô tô đậm",
              "Chức năng kiểm tra lỗi chính tả Word",
              "Chức năng vẽ hình vuông"
            ],
            correctAnswerIndex: 0,
            explanation: "PivotTable là công cụ mạnh mẽ hàng đầu để phân nhóm, tính tổng và tổng hợp báo cáo đa chiều từ tập dữ liệu lớn."
          }
        ]
      },
      {
        id: "cd5-b3",
        topicId: 5,
        lessonNumber: 3,
        title: "Sử dụng phần mềm trình chiếu chuyên nghiệp",
        objectives: [
          "Thiết kế bài thuyết trình báo cáo theo nguyên tắc 6x6 hoặc 7x7 (ít chữ, nhiều hình ảnh minh họa)",
          "Sử dụng hiệu ứng chuyển động (Animation/Transition) vừa phải, lịch sự và trang trọng",
          "Tự tin trình chiếu và điều khiển bài thuyết trình trong các cuộc họp, hội nghị"
        ],
        summary: "Trình chiếu (PowerPoint, Google Slides) là phương tiện truyền đạt thông điệp chính sách hiệu quả trong các cuộc họp và hội thảo. Một bài trình chiếu công vụ chuyên nghiệp cần tuân thủ: màu sắc trang nhã, tương phản tốt, không nhồi nhét quá nhiều chữ lên slide, sử dụng sơ đồ và biểu đồ thay cho các đoạn văn bản dài dòng.",
        keyActionMessage: "Slide báo cáo công vụ: Tối giản chữ - Tối đa trực quan - Tôn trọng thời gian của người nghe.",
        legalBases: ["Chuẩn mực trình bày báo cáo tại các cuộc họp, hội nghị cơ quan nhà nước"],
        illustrationText: "Ý tưởng chính -> Sơ đồ hóa trực quan -> Ít chữ, font lớn rõ ràng -> Thuyết trình tự tin.",
        questions: [
          {
            id: "cd5-b3-q1",
            type: "knowledge",
            question: "Nguyên tắc thiết kế slide báo cáo hội nghị nào sau đây được coi là chuẩn mực và chuyên nghiệp?",
            options: [
              "Sao chép nguyên văn toàn bộ 10 trang báo cáo giấy lên slide với cỡ chữ 8 thật nhỏ",
              "Trình bày cô đọng các luận điểm then chốt, kết hợp biểu đồ trực quan, phông chữ lớn dễ đọc và màu sắc trang nhã",
              "Dùng thật nhiều hiệu ứng hoạt hình lòe loẹt, âm thanh nổ rền vang để gây ấn tượng",
              "Để màn hình nền màu đen chữ màu xám tối khó nhìn"
            ],
            correctAnswerIndex: 1,
            explanation: "Slide chuyên nghiệp tập trung vào thông điệp cốt lõi, trực quan sinh động và đảm bảo người ngồi xa vẫn đọc rõ."
          }
        ]
      },
      {
        id: "cd5-b4",
        topicId: 5,
        lessonNumber: 4,
        title: "Sử dụng các công cụ làm việc cộng tác trực tuyến",
        objectives: [
          "Sử dụng thành thạo bộ công cụ cộng tác đám mây (Google Workspace, Microsoft 365, nền tảng dùng chung)",
          "Thực hành đồng chỉnh sửa (Co-authoring) tài liệu văn bản, bảng tính cùng lúc với đồng nghiệp",
          "Quản lý lịch làm việc nhóm và phân công nhiệm vụ trực tuyến"
        ],
        summary: "Công cụ cộng tác trực tuyến xóa bỏ tình trạng gửi đi gửi lại hàng chục bản thảo qua email có tên 'Dự thảo cuối', 'Dự thảo chốt'. Bằng việc lưu trữ tài liệu trên kho lưu trữ đám mây dùng chung và cấp quyền truy cập, nhiều cán bộ có thể cùng lúc chỉnh sửa một văn bản, xem lịch sử thay đổi và để lại nhận xét tức thì.",
        keyActionMessage: "Một tệp tin duy nhất, nhiều người cùng làm việc: Chấm dứt vòng luẩn quẩn gửi email đính kèm 'bản chốt'.",
        legalBases: ["Quy định triển khai nền tảng làm việc số trong các cơ quan nhà nước"],
        illustrationText: "Tạo tài liệu chung -> Cấp quyền đúng người -> Đồng chỉnh sửa thời gian thực -> Xem lịch sử phiên bản.",
        questions: [
          {
            id: "cd5-b4-q1",
            type: "scenario",
            question: "Khi cần 5 chuyên viên cùng viết 5 phần khác nhau của một báo cáo tổng kết trong cùng 1 buổi chiều, cách làm việc hiệu quả và hiện đại nhất là gì?",
            options: [
              "Một người viết xong gửi USB cho người thứ 2 lần lượt",
              "Tạo 1 tài liệu chung trên nền tảng đám mây cơ quan, phân quyền cho cả 5 người cùng vào soạn thảo đồng thời",
              "In ra giấy viết tay rồi gom lại gõ sau",
              "Mỗi người tự viết 1 file riêng rồi không ghép lại"
            ],
            correctAnswerIndex: 1,
            explanation: "Đồng chỉnh sửa trực tuyến giúp tiết kiệm tối đa thời gian và theo dõi được tiến độ công việc theo thời gian thực."
          }
        ]
      },
      {
        id: "cd5-b5",
        topicId: 5,
        lessonNumber: 5,
        title: "Khai thác các hệ thống thông tin, cơ sở dữ liệu chuyên ngành",
        objectives: [
          "Khai thác đúng quy trình các CSDL quốc gia (Dân cư, Đăng ký doanh nghiệp, Đất đai, Bảo hiểm)",
          "Sử dụng thành thạo Hệ thống thông tin giải quyết thủ tục hành chính và Trục liên thông văn bản quốc gia",
          "Tuân thủ quy định về bảo mật tài khoản và phân quyền truy cập thông tin chuyên ngành"
        ],
        summary: "Cơ sở dữ liệu quốc gia và chuyên ngành là kho tài nguyên quý giá nhất của Chính phủ số. Cán bộ khi được cấp quyền tra cứu phục vụ nghiệp vụ phải tuân thủ nghiêm ngặt nguyên tắc: Tra cứu đúng thẩm quyền, đúng mục đích công vụ; tuyệt đối không tự ý tra cứu thông tin cá nhân của người khác vì mục đích riêng tư hoặc cung cấp cho bên thứ ba.",
        keyActionMessage: "Tra cứu đúng thẩm quyền, đúng mục đích công vụ: Mọi hành vi tra cứu đều được lưu vết hệ thống.",
        legalBases: ["Nghị định số 47/2020/NĐ-CP", "Luật Giao dịch điện tử"],
        illustrationText: "Đăng nhập xác thực 2 lớp -> Tra cứu đúng số hồ sơ thụ lý -> Nhật ký (Log) lưu vết vĩnh viễn.",
        questions: [
          {
            id: "cd5-b5-q1",
            type: "scenario",
            question: "Một người quen nhờ cán bộ có tài khoản tra cứu Cơ sở dữ liệu quốc gia tra giúp thông tin về tài sản, hộ khẩu của một cá nhân vì lý do việc riêng. Cán bộ nên ứng xử thế nào?",
            options: [
              "Tra cứu giúp ngay vì chỗ người quen thân thiết",
              "Từ chối dứt khoát vì tra cứu CSDL quốc gia ngoài mục đích công vụ là vi phạm pháp luật nghiêm trọng và bị hệ thống ghi log kiểm toán",
              "Tra cứu xong in ra giấy đưa cho người quen",
              "Cung cấp luôn mật khẩu của mình cho người quen tự tra"
            ],
            correctAnswerIndex: 1,
            explanation: "Mọi hành vi tra cứu ngoài phạm vi công vụ được giao đều vi phạm pháp luật và bị hệ thống giám sát ghi vết xử lý kỷ luật."
          }
        ]
      }
    ]
  }
];
