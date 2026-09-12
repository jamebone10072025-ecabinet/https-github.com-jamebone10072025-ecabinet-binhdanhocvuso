import { CITIZEN_SCENARIOS, CitizenScenario } from "./citizenScenarios";

export interface DialogueTurn {
  role: "user" | "citizen" | "system";
  content: string;
  sentiment?: "positive" | "neutral" | "negative";
  coachingTip?: string;
  timestamp?: string;
}

export function getFallbackCitizenTurn(
  scenarioId: string,
  userMessage: string,
  history: DialogueTurn[]
): {
  reply: string;
  sentiment: "positive" | "neutral" | "negative";
  coachingTip: string;
  suggestedAction: string;
} {
  const scenario = CITIZEN_SCENARIOS.find((s) => s.id === scenarioId) || CITIZEN_SCENARIOS[0];
  const lower = userMessage.toLowerCase();

  // Check matching standard responses
  for (const std of scenario.standardResponses) {
    const matched = std.userKeywords.some((kw) => lower.includes(kw));
    if (matched) {
      return {
        reply: std.citizenReaction,
        sentiment: "positive",
        coachingTip: std.scoreAdvice,
        suggestedAction: "Tiếp tục duy trì tác phong ân cần, giải thích rõ các bước tiếp theo.",
      };
    }
  }

  // Handle specific emotional keywords
  if (lower.includes("xin lỗi") || lower.includes("thông cảm") || lower.includes("mời anh") || lower.includes("mời bác")) {
    return {
      reply: `Nghe cán bộ nói vậy tôi cũng thấy bớt căng thẳng hơn. Nhưng cán bộ xem giải quyết dứt điểm cho tôi nhé. Tôi cần biết rõ ràng các bước và thời hạn cụ thể.`,
      sentiment: "positive",
      coachingTip: "Tốt! Bạn đã áp dụng chuẩn mực '4 xin, 4 luôn' xoa dịu tâm lý công dân.",
      suggestedAction: "Đưa ra căn cứ quy định hoặc thời hạn xử lý hồ sơ cụ thể.",
    };
  }

  if (lower.includes("không được") || lower.includes("tôi không biết") || lower.includes("về đi") || lower.includes("hỏi phòng khác")) {
    return {
      reply: `Ủa, sao cán bộ lại nói vậy? Tôi đến Bộ phận Một cửa là để được hướng dẫn, nếu cán bộ không giải quyết thì tôi biết kêu ai bây giờ? Tôi đề nghị gặp lãnh đạo trực tiếp dân!`,
      sentiment: "negative",
      coachingTip: "Cảnh báo vi phạm văn hóa công vụ! Tránh đùn đẩy trách nhiệm hoặc nói lời từ chối cộc lốc với công dân.",
      suggestedAction: "Hãy xin lỗi, giải thích thẩm quyền và hướng dẫn liên hệ đúng đơn vị theo quy chế liên thông.",
    };
  }

  if (lower.includes("vneid") || lower.includes("dịch vụ công") || lower.includes("trực tuyến") || lower.includes("điện tử")) {
    return {
      reply: `Dạ, cán bộ cho tôi hỏi làm trên mạng như thế thì có an toàn không? Với lại tôi có cần phải nộp thêm giấy tờ chứng thực giấy tờ cũ nữa không cán bộ?`,
      sentiment: "neutral",
      coachingTip: "Đúng hướng! Đang thúc đẩy công dân chuyển đổi số và tự phục vụ.",
      suggestedAction: "Nhấn mạnh nguyên tắc dữ liệu số hóa có giá trị pháp lý tương đương bản giấy theo Đề án 06.",
    };
  }

  // Default natural progression based on scenario
  if (scenario.id === "vneid_elderly") {
    return {
      reply: "Dạ vâng cán bộ, cái điện thoại đây, cán bộ chỉ cho bác chỗ nào bấm để nhận được trợ cấp hằng tháng nhé. Bác cảm ơn nhiều lắm.",
      sentiment: "positive",
      coachingTip: "Giữ nhịp điệu nói chậm rãi, dùng từ ngữ mộc mạc, tránh thuật ngữ kỹ thuật khó hiểu.",
      suggestedAction: "Hỗ trợ kích hoạt và nhắc nhở không đưa mã OTP cho bất kỳ ai.",
    };
  }

  if (scenario.id === "land_complaint") {
    return {
      reply: "Tôi ghi nhận lời giải thích của cán bộ. Nhưng tôi muốn có văn bản hẹn lại cụ thể theo đúng Nghị định 118, chứ không thể chỉ nói miệng được!",
      sentiment: "neutral",
      coachingTip: "Cán bộ cần chuẩn bị thủ tục in Phiếu xin lỗi và hẹn lại ngày trả kết quả.",
      suggestedAction: "Cam kết ngày trả kết quả cụ thể và bàn giao Phiếu hẹn lại có chữ ký.",
    };
  }

  return {
    reply: "Tôi đã hiểu phần nào. Vậy tiếp theo tôi cần phải chuẩn bị thêm gì hay làm bước nào nữa không cán bộ?",
    sentiment: "positive",
    coachingTip: "Cuộc đối thoại diễn ra tích cực. Hãy tóm tắt lại kết quả tiếp công dân.",
    suggestedAction: "Tóm lược các đầu việc và gửi lời chào văn minh kết thúc phiên tiếp công dân.",
  };
}

export function generateEvaluationReport(
  scenario: CitizenScenario,
  dialogue: DialogueTurn[]
): {
  overallScore: number;
  grade: "Xuất sắc" | "Khá" | "Trung bình" | "Cần rèn luyện thêm";
  criteriaScores: {
    attitude: number; // 25
    legalKnowledge: number; // 25
    deEscalation: number; // 25
    digitalGuidance: number; // 25
  };
  strengths: string[];
  improvements: string[];
  sampleModelAnswer: string;
  legalSummary: string;
} {
  const userTurns = dialogue.filter((t) => t.role === "user");
  const turnCount = userTurns.length;
  const userTextCombined = userTurns.map((t) => t.content.toLowerCase()).join(" ");

  let attitude = 18;
  let legal = 17;
  let deEscalation = 18;
  let digital = 17;

  // Check attitude
  if (userTextCombined.includes("chào") || userTextCombined.includes("dạ") || userTextCombined.includes("kính gửi") || userTextCombined.includes("mời")) {
    attitude += 4;
  }
  if (userTextCombined.includes("xin lỗi") || userTextCombined.includes("cảm ơn") || userTextCombined.includes("thông cảm")) {
    attitude += 3;
  }

  // Check legal
  if (userTextCombined.includes("nghị định") || userTextCombined.includes("luật") || userTextCombined.includes("quy định") || userTextCombined.includes("đề án 06") || userTextCombined.includes("thủ tục")) {
    legal += 5;
  }
  if (userTextCombined.includes("mã hồ sơ") || userTextCombined.includes("biên nhận") || userTextCombined.includes("phiếu xin lỗi") || userTextCombined.includes("hẹn lại")) {
    legal += 3;
  }

  // Check de-escalation
  if (userTextCombined.includes("bình tĩnh") || userTextCombined.includes("lắng nghe") || userTextCombined.includes("giải thích") || userTextCombined.includes("giúp đỡ")) {
    deEscalation += 4;
  }
  if (!userTextCombined.includes("không được") && !userTextCombined.includes("về đi") && !userTextCombined.includes("ai bảo")) {
    deEscalation += 3;
  }

  // Check digital guidance
  if (userTextCombined.includes("vneid") || userTextCombined.includes("dịch vụ công") || userTextCombined.includes("trực tuyến") || userTextCombined.includes("số hóa") || userTextCombined.includes("điện tử") || userTextCombined.includes("otp")) {
    digital += 6;
  }

  attitude = Math.min(25, Math.max(12, attitude));
  legal = Math.min(25, Math.max(10, legal));
  deEscalation = Math.min(25, Math.max(10, deEscalation));
  digital = Math.min(25, Math.max(10, digital));

  const overallScore = attitude + legal + deEscalation + digital;

  let grade: "Xuất sắc" | "Khá" | "Trung bình" | "Cần rèn luyện thêm" = "Khá";
  if (overallScore >= 90) grade = "Xuất sắc";
  else if (overallScore >= 75) grade = "Khá";
  else if (overallScore >= 60) grade = "Trung bình";
  else grade = "Cần rèn luyện thêm";

  const strengths: string[] = [];
  const improvements: string[] = [];

  if (attitude >= 22) {
    strengths.push("Tác phong giao tiếp nhã nhặn, tôn trọng nhân dân, thực hiện đúng nguyên tắc '4 xin, 4 luôn' tại Bộ phận Một cửa.");
  } else {
    improvements.push("Cần chủ động sử dụng lời chào, kính ngữ và lời xin lỗi nếu cơ quan để xảy ra chậm trễ.");
  }

  if (legal >= 20) {
    strengths.push("Nắm vững căn cứ pháp lý và trình tự thủ tục hành chính, giải thích rõ ràng quyền lợi và nghĩa vụ của công dân.");
  } else {
    improvements.push("Cần viện dẫn thêm các quy định cụ thể (Nghị định 118/2025/NĐ-CP, Đề án 06) để tăng tính thuyết phục.");
  }

  if (deEscalation >= 20) {
    strengths.push("Bình tĩnh, kiên nhẫn lắng nghe, xoa dịu tâm lý bức xúc của công dân một cách khéo léo.");
  } else {
    improvements.push("Tránh dùng những câu nói cộc lốc hoặc tranh luận tay đôi khi công dân đang nóng giận.");
  }

  if (digital >= 20) {
    strengths.push("Tích cực hướng dẫn công dân trải nghiệm dịch vụ công trực tuyến và cài đặt VNeID, hỗ trợ người dân tự số hóa.");
  } else {
    improvements.push("Cần lồng ghép hướng dẫn công dân nộp hồ sơ qua Cổng Dịch vụ công Quốc gia/VNeID để giảm thời gian đi lại lần sau.");
  }

  let sampleModelAnswer = "";
  if (scenario.id === "vneid_elderly") {
    sampleModelAnswer = "Dạ, cháu chào Bác ạ! Bác cứ yên tâm ngồi uống chén nước, cháu sẽ hướng dẫn Bác kích hoạt tài khoản VNeID mức 2 ngay tại đây ạ. Tài khoản này giúp Bác nhận tiền trợ cấp hưu trí thẳng vào tài khoản an toàn, không sợ bị thất lạc hay trễ ngày. Cháu chỉ xin phép xem Căn cước công dân gắn chip của Bác, cháu hướng dẫn Bác từng bước và tuyệt đối Bác không đưa mã số mật khẩu hay mã OTP cho bất kỳ ai gọi điện thoại đến nhé Bác!";
  } else if (scenario.id === "land_complaint") {
    sampleModelAnswer = "Dạ, trước hết thay mặt Bộ phận Một cửa em thành thật xin lỗi anh vì sự chậm trễ này, em rất hiểu sự sốt ruột của anh khi hồ sơ bị quá hạn. Anh cho em xin mã số biên nhận hồ sơ để em tra cứu trực tiếp trên hệ thống điều hành ngay bây giờ. Đồng thời, theo đúng Nghị định 118/2025/NĐ-CP, cơ quan chúng em sẽ lập Phiếu xin lỗi và hẹn lại ngày trả kết quả chính xác bằng văn bản cho anh, đồng thời em sẽ điện thoại trực tiếp đôn đốc đồng chí phụ trách địa chính báo cáo lãnh đạo xử lý ưu tiên trong hôm nay ạ.";
  } else {
    sampleModelAnswer = "Dạ chào chị! Về thủ tục đăng ký khai sinh, thường trú và thẻ BHYT cho cháu, hiện nay đã có Dịch vụ công liên thông 3 trong 1 rất tiện lợi, chỉ cần nộp 1 lần là giải quyết xong cả 3 việc. Về giấy đăng ký kết hôn, em sẽ tra cứu dữ liệu hộ tịch điện tử trên hệ thống dân cư VNeID; nếu đã có thông tin thì theo Đề án 06 chị không cần phải quay về nhà lấy bản giấy nữa ạ. Em sẽ mở Cổng DVCQG hướng dẫn chị nộp ngay trên điện thoại nhé!";
  }

  return {
    overallScore,
    grade,
    criteriaScores: {
      attitude,
      legalKnowledge: legal,
      deEscalation,
      digitalGuidance: digital,
    },
    strengths,
    improvements,
    sampleModelAnswer,
    legalSummary: scenario.lawsReferenced.join(" • "),
  };
}
