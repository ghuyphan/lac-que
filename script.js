'use strict';
/* ============================================
   Lắc Quẻ Đầu Năm - Tết Bính Ngọ 2026
   Complete Rewrite — Clean & Optimized
   ============================================ */

// ============================================
// Timing Constants (ms)
// ============================================
const SHAKE_MIN_DURATION = 2000;
const SHAKE_RANDOM_RANGE = 800;
const RING_PULSE_INTERVAL = 400;
const STICK_SHOW_DELAY = 1400;
const SHAKE_GENTLE_PHASE = 500;
const SHAKE_SLOWDOWN_PHASE = 800;
const TILT_DURATION = 500;
const RATTLE_INTERVAL = 180;
const RESULT_TRANSITION_DELAY = 550;
const CONFETTI_LAUNCH_DELAY = 300;
const FIREWORK_LAUNCH_DELAY = 500;
const RESET_TRANSITION_DELAY = 600;
const CONFETTI_LIFETIME = 5000;
const SPARKLE_LIFETIME = 1200;
const SHARE_FEEDBACK_DURATION = 2000;
const INSTRUCTION_PULSE_DELAY = 1800;

// ============================================
// Fortune Data (100 quẻ)
// ============================================
const FORTUNES = [
  {
    id: 1,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Ngựa phi trên đỉnh núi cao,\nGió xuân thổi mát, lòng nào chẳng vui.\nĐường đời rộng mở tuyệt vời,\nPhúc lành đến sớm, mỉm cười đón xuân.',
    meaning: 'Quẻ cực tốt, vạn sự hanh thông. Năm Ngọ mang đến vận may lớn, công danh phát đạt, tài lộc dồi dào. Mọi việc đều thuận lợi từ đầu đến cuối năm.',
    advice: 'Hãy tự tin tiến bước, năm nay là năm của bạn. Mạnh dạn đầu tư và mở rộng, cơ hội lớn đang chờ đón.'
  },
  {
    id: 2,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Rồng bay phượng múa giữa trời,\nHoa mai nở rộ, đất trời rạng ngời.\nCông danh sự nghiệp sáng tươi,\nGia đình hạnh phúc, cuộc đời an khang.',
    meaning: 'Quẻ đại cát, mọi việc đều thành. Sự nghiệp thăng tiến vượt bậc, gia đạo êm ấm, con cháu hiếu thảo. Đây là năm may mắn nhất.',
    advice: 'Giữ tâm thiện lành, sẻ chia phúc lộc với mọi người. Làm việc thiện sẽ nhân đôi may mắn.'
  },
  {
    id: 3,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Mây tạnh mưa tan trời lại sáng,\nHoa đào nở muộn vẫn thơm hương.\nKiên tâm bền chí đường xa,\nPhúc đức ông bà độ trì con cháu.',
    meaning: 'Quẻ tốt, sau giai đoạn khó khăn sẽ gặp may mắn. Những nỗ lực trước đây sẽ được đền đáp xứng đáng trong năm nay.',
    advice: 'Kiên nhẫn chờ đợi, thời cơ tốt đẹp sẽ đến từ tháng 3 âm lịch. Đừng vội vàng, hãy chuẩn bị kỹ lưỡng.'
  },
  {
    id: 4,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Ngựa chiến sẵn yên chờ xuất trận,\nGió đông thổi tới, cờ bay cao.\nTài năng tỏa sáng muôn nơi,\nQuý nhân phù trợ, rạng ngời tương lai.',
    meaning: 'Quẻ tốt lành, được quý nhân giúp đỡ. Năm Ngọ hợp tuổi, mọi dự định lớn đều có cơ hội thành công.',
    advice: 'Mở rộng giao tiếp, kết nối với người mới. Quý nhân xuất hiện khi bạn mở lòng đón nhận.'
  },
  {
    id: 5,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Trăng tròn soi sáng đêm xuân,\nNgười hiền gặp phúc, trăm phần an vui.\nLộc trời ban xuống đời người,\nSức khỏe dồi dào, nụ cười rạng ngời.',
    meaning: 'Quẻ sáng sủa, sức khỏe tốt, tinh thần minh mẫn. Tài lộc đến từ nhiều nguồn, gia đình hòa thuận, vợ chồng ân ái.',
    advice: 'Chú trọng sức khỏe và gia đình. Dành thời gian cho người thân, niềm vui và phúc lộc sẽ tự đến.'
  },
  {
    id: 6,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Cá vượt vũ môn hóa thành rồng,\nChí cao ngất trời, lòng như biển đông.\nNăm mới mở ra vạn lối,\nThanh thản đi qua mọi chướng ngại.',
    meaning: 'Quẻ rất tốt cho sự nghiệp và học hành. Những ai đang theo đuổi mục tiêu lớn sẽ gặt hái thành công rực rỡ.',
    advice: 'Đây là năm để vươn lên. Hãy đặt mục tiêu cao và quyết tâm thực hiện, trời sẽ phù hộ.'
  },
  {
    id: 7,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Sen nở giữa bùn vẫn thơm hương,\nĐức dày phúc hậu, nghĩa tình vương.\nNăm Ngọ mang về tin vui,\nGia đình sum vầy, cuộc đời rạng ngời.',
    meaning: 'Quẻ tốt, gia đạo hưng vượng. Có tin vui về con cái hoặc nhà cửa. Công việc ổn định, thu nhập tăng.',
    advice: 'Giữ gìn mối quan hệ gia đình, đó là nền tảng cho mọi thành công. Yêu thương nhiều hơn, nhận lại gấp bội.'
  },
  {
    id: 8,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Đường dài bước ngắn cũng qua,\nNắng mưa thử sức, phong ba rèn mình.\nKiên tâm giữ vững niềm tin,\nCuối năm nhìn lại, ân tình đầy tay.',
    meaning: 'Quẻ trung bình, mọi việc cần kiên nhẫn. Đầu năm có chút trắc trở nhưng cuối năm sẽ thành công. Cần nỗ lực không ngừng.',
    advice: 'Bình tĩnh trước thử thách, đừng nóng vội. Mỗi bước đi nhỏ đều dẫn đến thành công lớn.'
  },
  {
    id: 9,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Nước chảy đá mòn, năm tháng qua,\nMiệt mài không nghỉ, thắng gian tà.\nNgười trồng cây đức, hoa thơm trái,\nBốn mùa an lạc, phúc chan hòa.',
    meaning: 'Quẻ trung bình khá. Sức khỏe tốt, công việc ổn định nhưng không có bước đột phá lớn. Cần tích lũy từ từ.',
    advice: 'Tập trung vào những gì đang có, hoàn thiện bản thân mỗi ngày. Tránh mạo hiểm không cần thiết.'
  },
  {
    id: 10,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Gió thu lay nhẹ cành mai,\nLá rơi lá mọc, đổi thay bốn mùa.\nTùy duyên mà sống, thuận theo,\nBình an chính là phúc cao nhất đời.',
    meaning: 'Quẻ bình, cuộc sống ổn định không sóng gió. Tài chính vừa đủ, sức khỏe bình thường. Nên giữ hiện trạng, tránh thay đổi lớn.',
    advice: 'An phận tu tâm, đừng tham vọng quá. Hãy biết đủ và tận hưởng những gì đang có.'
  },
  {
    id: 11,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Thuyền xuôi dòng nước nhẹ nhàng,\nĐôi khi gặp sóng, vẫn an toàn về.\nNgười đi có bạn đồng hành,\nGiữ lòng thanh tịnh, thong dong đường đời.',
    meaning: 'Quẻ trung bình, cuộc sống có lúc thăng lúc trầm. Có bạn bè và đồng nghiệp hỗ trợ trong lúc khó khăn.',
    advice: 'Trân trọng tình bạn, đừng ngại nhờ giúp đỡ. Sự hợp tác là chìa khóa thành công năm nay.'
  },
  {
    id: 12,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Vườn xuân hoa nở muộn màng,\nNhưng hương vẫn tỏa, sắc vàng vẫn xinh.\nChậm mà chắc, bước an lành,\nĐến nơi đến chốn, hoàn thành ước mơ.',
    meaning: 'Quẻ trung bình, mọi việc sẽ đạt được nhưng chậm hơn dự kiến. Cần kiên nhẫn và bền bỉ, không nên nóng vội.',
    advice: 'Lập kế hoạch dài hạn, đừng kỳ vọng kết quả ngay lập tức. Thời gian là người bạn tốt nhất.'
  },
  {
    id: 13,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Ngựa ròng phi giữa cánh đồng,\nTuy không thắng lớn, nhưng lòng thảnh thơi.\nCơm no áo ấm đủ rồi,\nBình yên thật sự là đời đáng sống.',
    meaning: 'Quẻ bình an, cuộc sống đủ đầy tuy không giàu sang. Gia đình hạnh phúc, công việc thuận lợi, sức khỏe ổn.',
    advice: 'Biết ơn những gì đang có, đó chính là hạnh phúc thật sự. Giữ nếp sống giản dị và lành mạnh.'
  },
  {
    id: 14,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Chim bay về tổ cuối ngày,\nNgười xa nhớ bạn, tháng ngày thiết tha.\nĐường đi tuy có quanh co,\nNhưng lòng tin vững, chẳng lo lạc đường.',
    meaning: 'Quẻ trung bình, có duyên với người xa. Công việc liên quan đến giao tiếp, đi lại sẽ thuận lợi hơn.',
    advice: 'Mở rộng phạm vi hoạt động, đừng ngại đi xa. Cơ hội tốt có thể đến từ nơi xa lạ.'
  },
  {
    id: 15,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Mặt trời ẩn sau đám mây,\nNhưng ánh sáng vẫn xuyên ngày u buồn.\nKhó khăn rồi cũng qua thôi,\nNụ cười kiên nhẫn, cuộc đời sáng trong.',
    meaning: 'Quẻ trung bình thiên tốt. Dù có trở ngại nhỏ nhưng đều vượt qua được. Nửa sau năm tốt hơn nửa đầu.',
    advice: 'Tin vào bản thân, mọi khó khăn chỉ là tạm thời. Giữ thái độ tích cực sẽ thu hút điều tốt đẹp.'
  },
  {
    id: 16,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Tre già măng mọc, luân hồi,\nCũ đi mới đến, cuộc đời xoay vần.\nGiữ tâm bình lặng, an nhiên,\nPhước lành tự đến, không cần kiếm tìm.',
    meaning: 'Quẻ trung bình, có sự thay đổi trong cuộc sống. Có thể đổi việc, đổi nhà hoặc thay đổi mối quan hệ. Thay đổi là tốt.',
    advice: 'Đón nhận thay đổi với tâm thế tích cực. Có bỏ cái cũ mới có cái mới tốt hơn.'
  },
  {
    id: 17,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Con ngựa dừng chân bên suối vắng,\nUống ngụm nước trong, lòng nhẹ nhàng.\nNghỉ ngơi để rồi lại bước,\nĐường dài thênh thang, chẳng vội vàng.',
    meaning: 'Quẻ trung bình, nhắc nhở cần cân bằng giữa công việc và nghỉ ngơi. Sức khỏe cần được chú ý, đặc biệt tâm lý.',
    advice: 'Dành thời gian cho bản thân, thiền định hoặc tập thể dục. Sức khỏe tinh thần là nền tảng cho mọi thành công.'
  },
  {
    id: 18,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Mưa rào rồi cũng tạnh thôi,\nÔng trời không phụ người đời chân tâm.\nGian nan thử sức bền gan,\nVượt qua bão tố, vinh quang đợi chờ.',
    meaning: 'Quẻ hạ nhưng không xấu, chỉ là năm cần cẩn trọng hơn. Có thể gặp khó khăn tài chính nhỏ nhưng sẽ vượt qua.',
    advice: 'Chi tiêu tiết kiệm, tránh vay mượn. Tích cóp dần dần, cuối năm sẽ khá hơn.'
  },
  {
    id: 19,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Đêm dài rồi cũng có ngày mai,\nSương tan nắng ấm, hết u hoài.\nChậm rãi mà đi, từng bước một,\nSẽ đến nơi nào mình mong chờ.',
    meaning: 'Quẻ hạ, cần cẩn thận trong các quyết định lớn. Không nên đầu tư mạo hiểm, nên giữ ổn định.',
    advice: 'Năm nay nên "thủ" nhiều hơn "công". Giữ vững những gì đang có, chờ thời cơ tốt hơn.'
  },
  {
    id: 20,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Cây cao đón gió, đường xa mỏi chân,\nNhưng lòng kiên định, chẳng phân vân.\nNgười hiền gặp khó, trời thương,\nSao rồi cũng sáng, con đường sẽ xuôi.',
    meaning: 'Quẻ hạ, có thử thách về sức khỏe hoặc mối quan hệ. Cần chú ý lời nói, tránh xung đột không đáng.',
    advice: 'Nói ít, làm nhiều. Tránh tranh cãi, giữ hòa khí. Tập thể dục đều đặn để tăng sức đề kháng.'
  },
  {
    id: 21,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Lá rụng về cội, nước chảy xuôi dòng,\nCó qua có lại mới mong viên tròn.\nGieo nhân lành, gặt quả ngon,\nNhẫn nại từ bi, phúc ơn tràn đầy.',
    meaning: 'Quẻ hạ, nhắc nhở về nhân quả. Cần xem lại hành vi của mình, sửa đổi những gì chưa tốt. Làm nhiều việc thiện để chuyển vận.',
    advice: 'Làm từ thiện, giúp đỡ người khác. Phóng sinh, ăn chay, tụng kinh sẽ giúp hóa giải vận xui.'
  },
  {
    id: 22,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Xuân về hoa nở ngập trời,\nBướm bay dập dìu, đất trời hoan ca.\nPhúc đức ông bà để lại,\nCon cháu đời đời, phú quý vinh hoa.',
    meaning: 'Quẻ tốt, được hưởng phúc ấm tổ tiên. Gia đình hòa thuận, con cháu ngoan hiền. Năm nay có nhiều niềm vui bất ngờ.',
    advice: 'Nhớ thắp hương tổ tiên thường xuyên, biết ơn và hướng thiện. Giữ gìn truyền thống gia đình.'
  },
  {
    id: 23,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Ngựa hay gặp chủ hiểu lòng,\nBá Nhạc tri kỷ, anh hùng tương phùng.\nTài năng tỏa sáng năm Ngọ,\nDanh vọng bay cao, khắp chốn tung hoành.',
    meaning: 'Quẻ tốt, được quý nhân phát hiện tài năng. Có cơ hội thăng tiến lớn trong sự nghiệp, đặc biệt trong lĩnh vực mới.',
    advice: 'Tự tin thể hiện bản thân, đừng giấu tài. Năm Ngọ là năm để bạn tỏa sáng, hãy nắm lấy mọi cơ hội.'
  },
  {
    id: 24,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Nắng chiều nghiêng bóng trên sông,\nThuyền ai lướt nhẹ, thong dong cuối trời.\nLòng người bình lặng như mây,\nTùy duyên mà sống, vui vầy tháng năm.',
    meaning: 'Quẻ trung bình, cuộc sống bình lặng và thanh thản. Không có biến cố lớn, phù hợp để tu dưỡng và phát triển nội tâm.',
    advice: 'Dành thời gian đọc sách, học hỏi, nâng cao kiến thức. Sự bình yên là nền tảng cho phát triển bền vững.'
  },
  {
    id: 25,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Kim long xuất hải vẫy vùng,\nPhong vân tế hội, anh hùng ra tay.\nNăm Ngọ vận hội đổi thay,\nPhú quý vinh hoa, tràn đầy ân phước.',
    meaning: 'Quẻ thượng thượng, vận may đỉnh cao. Đây là năm chuyển mình ngoạn mục, từ bình thường thành xuất sắc. Tài lộc, danh vọng đều đến.',
    advice: 'Nắm bắt cơ hội ngay khi nó đến, đừng chần chừ. Năm nay thiên thời địa lợi nhân hòa đều đủ.'
  },
  {
    id: 26,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Đất lành chim đậu, phúc dày,\nNgười hiền gặp chuyện lành may tự tìm.\nTình duyên đẹp tựa trăng rằm,\nĐôi lòng hòa quyện, trăm năm bền lâu.',
    meaning: 'Quẻ tốt cho tình duyên. Người độc thân sẽ gặp người ưng ý. Người có đôi sẽ thêm gắn bó, có thể có tin vui.',
    advice: 'Mở lòng đón nhận tình yêu, đừng quá khắt khe. Người tốt đang ở quanh bạn, chỉ cần bạn chú ý.'
  },
  {
    id: 27,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Mây đen che phủ ánh trăng,\nNhưng trăng vẫn sáng, chẳng hằn lo âu.\nKhó khăn như bóng mây qua,\nGiữ tâm vững chãi, phong ba cũng thường.',
    meaning: 'Quẻ hạ, có giai đoạn bị che khuất tài năng hoặc gặp tiểu nhân. Cần cẩn thận với người xung quanh, tránh bị lợi dụng.',
    advice: 'Chọn bạn mà chơi, giữ khoảng cách với người tiêu cực. Bảo vệ bản thân nhưng đừng đánh mất lòng tốt.'
  },
  {
    id: 28,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Suối nguồn chảy mãi không ngừng,\nGiọt nước nhỏ bé, góp thành biển sâu.\nCông cha nghĩa mẹ ơn sâu,\nBáo đền hiếu thảo, phúc lâu dài còn.',
    meaning: 'Quẻ tốt, nhờ phúc đức và lòng hiếu thảo. Năm nay được tổ tiên phù hộ, sức khỏe tốt, gia đình êm ấm.',
    advice: 'Hiếu thảo với cha mẹ, thăm viếng ông bà. Phúc đức tổ tiên là kho báu vô giá, hãy gìn giữ và phát huy.'
  },
  {
    id: 29,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Vạn lý trường thành ngựa sắt phi,\nOai phong lẫm liệt, chí nam nhi.\nTrời cao đất rộng tung hoành khắp,\nPhú quý vinh hoa, thỏa ước ghi.',
    meaning: 'Quẻ thượng thượng đại cát. Năm nay như ngựa chiến xông pha, không gì cản nổi. Sự nghiệp đạt đỉnh cao, tài lộc vào như nước.',
    advice: 'Dũng cảm tiến lên, đừng ngại thử thách. Năm Ngọ là năm đột phá lớn nhất đời bạn.'
  },
  {
    id: 30,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Hoa đào khoe sắc trước hiên nhà,\nÉn liệng đôi bờ, xuân đã qua.\nPhước đức vun trồng từ năm cũ,\nNăm nay gặt hái thật thiết tha.',
    meaning: 'Quẻ tốt, hoa trái của những nỗ lực trước đây bắt đầu chín muồi. Tình cảm gia đình ấm áp, có thêm tin vui.',
    advice: 'Tiếp tục duy trì nếp sống tốt, đừng thay đổi quá nhiều. Sự ổn định chính là sức mạnh.'
  },
  {
    id: 31,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Sóng yên biển lặng thuyền xuôi gió,\nBuồm căng lướt nhẹ tới chân trời.\nNgười đi thuận nước, trời thương độ,\nĐại cát đại lành, phúc rạng ngời.',
    meaning: 'Quẻ tốt cho người đi xa hoặc làm ăn xa. Mọi chuyến đi đều thuận lợi, công việc suôn sẻ, gặp nhiều may mắn.',
    advice: 'Nếu có cơ hội đi xa, hãy nắm bắt ngay. Du lịch, công tác, hay du học đều tốt.'
  },
  {
    id: 32,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Cánh diều bay giữa trời xanh,\nGió đưa gió đẩy, lung linh sắc màu.\nĐôi khi gió ngược nghiêng đầu,\nNhưng rồi cũng vượt, bay cao hơn người.',
    meaning: 'Quẻ trung bình, có lúc thuận lúc nghịch. Đừng nản lòng khi gặp khó, vì sau mỗi lần vấp ngã là một bài học quý.',
    advice: 'Linh hoạt ứng biến, đừng cứng nhắc. Biết thích nghi là kỹ năng quan trọng nhất năm nay.'
  },
  {
    id: 33,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Bốn mùa hoa nở có khi tàn,\nNhưng rễ vẫn sâu, gốc vẫn bàn.\nNgười giữ gốc vững, cây trường thọ,\nPhúc đức muôn đời, chẳng héo tàn.',
    meaning: 'Quẻ trung bình, nhắc nhở về nền tảng. Đừng chạy theo hào nhoáng bên ngoài mà quên giữ gốc. Gia đình và sức khỏe là ưu tiên.',
    advice: 'Xây dựng nền tảng vững chắc: tiết kiệm, chăm sóc sức khỏe, vun đắp gia đình.'
  },
  {
    id: 34,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Rồng cuộn mây giăng thế trận hùng,\nNgày mai vươn cánh giữa trời đông.\nNam nhi chí lớn không gì cản,\nVượt sóng băng ngàn, lập đại công.',
    meaning: 'Quẻ tốt, dành cho người có hoài bão lớn. Năm nay là thời điểm hoàn hảo để khởi nghiệp hoặc thăng tiến.',
    advice: 'Lập kế hoạch chi tiết và hành động quyết đoán. Đừng để cơ hội trôi qua.'
  },
  {
    id: 35,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Sương mù giăng kín cả lối đi,\nNhưng đừng dừng bước, cứ từ từ.\nMặt trời rồi sẽ xua tan hết,\nĐường sáng hiện ra, bước chẳng chì.',
    meaning: 'Quẻ hạ, đầu năm có thể mờ mịt chưa rõ hướng. Nhưng kiên trì sẽ tìm ra con đường đúng đắn.',
    advice: 'Đừng vội đưa ra quyết định lớn đầu năm. Chờ đến tháng 5-6 âm lịch khi mọi thứ rõ ràng hơn.'
  },
  {
    id: 36,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Trống đồng vang vọng khắp non sông,\nHội xuân rộn rã, tết mênh mông.\nNgười có tâm thành, trời phù hộ,\nVạn sự an lành, phúc lộc song.',
    meaning: 'Quẻ tốt, được trời phật phù hộ nhờ tấm lòng chân thành. Năm nay cả tài lộc và sức khỏe đều tốt.',
    advice: 'Giữ tâm thành kính, thường xuyên làm việc thiện. Phúc đức sẽ tự tìm đến người hiền.'
  },
  {
    id: 37,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Đêm khuya ngồi đọc sách hiền nhân,\nLời vàng ý ngọc, dạ ân cần.\nTri thức là vàng, ai giữ được,\nĐời sau hưởng phúc, mãi thanh tân.',
    meaning: 'Quẻ trung bình, đặc biệt tốt cho người học hành hoặc nghiên cứu. Kiến thức tích lũy năm nay sẽ là tài sản quý giá.',
    advice: 'Đầu tư vào học tập và phát triển bản thân. Đọc sách, tham gia khóa học, mở rộng hiểu biết.'
  },
  {
    id: 38,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Con thuyền lênh đênh giữa biển khơi,\nSóng dồn gió giật, nổi chìm ơi.\nNhưng ai vững lái, thuyền không đắm,\nBến bờ hạnh phúc vẫn chờ người.',
    meaning: 'Quẻ hạ, năm có biến động. Có thể thay đổi công việc hoặc nơi ở. Nhưng nếu bình tĩnh sẽ vượt qua.',
    advice: 'Chuẩn bị tài chính dự phòng, đừng tiêu xài hoang phí. Giữ bình tĩnh trong mọi tình huống.'
  },
  {
    id: 39,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Chim hồng bay vút tận trời mây,\nNhìn xuống nhân gian, lòng sướng thay.\nPhong vân gặp hội, long vân khánh,\nĐại phú đại quý, phúc tràn đầy.',
    meaning: 'Quẻ rất tốt, vận may đặc biệt về tài chính. Có thể nhận được khoản tiền bất ngờ hoặc thăng chức tăng lương.',
    advice: 'Đầu tư khôn ngoan, nhưng đừng tham lam quá. Biết đủ biết dừng là phúc.'
  },
  {
    id: 40,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Giếng nước trong veo giữa đồng xanh,\nNgười khôn biết uống, dạ an lành.\nĐời cho bao nhiêu, ta nhận bấy,\nTùy phận tùy duyên, sống hết mình.',
    meaning: 'Quẻ trung bình, nhắc nhở sống thanh đạm và biết đủ. Của cải vừa phải nhưng tinh thần an lạc.',
    advice: 'Sống chậm lại, tận hưởng từng khoảnh khắc. Hạnh phúc không nằm ở vật chất.'
  },
  {
    id: 41,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Thiên mã hành không, vân trung long,\nPhong vân tế hội, đắc kỳ công.\nNăm Ngọ trời cho vận hanh thông,\nPhú quý vinh hoa, mãi thong dong.',
    meaning: 'Quẻ thượng thượng, vận mệnh cực tốt. Năm Ngọ hợp mệnh, được thiên thời địa lợi nhân hòa. Mọi ước nguyện đều thành.',
    advice: 'Đây là năm vàng, hãy tận dụng tối đa. Mọi dự định lớn đều nên bắt đầu ngay.'
  },
  {
    id: 42,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Cầu vồng bảy sắc sau cơn mưa,\nNụ cười trở lại, hết buồn xưa.\nNgười ơi vui vẻ đón xuân mới,\nPhúc lộc thọ đầy, chẳng thiếu thừa.',
    meaning: 'Quẻ tốt, sau thời gian khó khăn, mọi thứ sáng sủa trở lại. Đặc biệt tốt cho người vừa trải qua giai đoạn u buồn.',
    advice: 'Mở lòng ra, đón nhận niềm vui mới. Quá khứ đã qua, tương lai đang chờ đón bạn.'
  },
  {
    id: 43,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Lửa gần rơm, lâu cũng bén,\nNgười khôn biết tránh, kẻ dại thì quên.\nCẩn thận lời nói, giữ kẽ bên,\nTiểu nhân xa lánh, quý nhân nên gần.',
    meaning: 'Quẻ hạ, cảnh báo về mối quan hệ xung quanh. Có người không tốt đang tiếp cận, cần tỉnh táo phân biệt.',
    advice: 'Chọn bạn mà chơi, chọn nơi mà ở. Tránh xa những người hay nói xấu và gây rối.'
  },
  {
    id: 44,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Lá sen che chở giọt sương mai,\nNgọc trong đá, tìm chẳng sai.\nNgười kiên nhẫn, trời không phụ,\nChậm rãi thành công, chẳng ai tài.',
    meaning: 'Quẻ trung bình, thành công đến từ sự kiên nhẫn và bền bỉ. Không có phép màu, chỉ có nỗ lực từng ngày.',
    advice: 'Kiên trì với mục tiêu, đừng bỏ cuộc giữa chừng. Thành công chỉ cách bạn một bước chân nữa.'
  },
  {
    id: 45,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Đàn sáo sang sông, bay về nam,\nMang theo tin vui khắp xóm làng.\nNgười xa gửi lại lời chúc tết,\nAn khang thịnh vượng, mãi bình an.',
    meaning: 'Quẻ tốt, có tin vui từ phương xa. Người thân ở xa sẽ gửi tin tốt lành. Có thể nhận được quà hoặc cơ hội từ xa.',
    advice: 'Giữ liên lạc với bạn bè và người thân ở xa. Mối quan hệ xa sẽ mang đến cơ hội bất ngờ.'
  },
  {
    id: 46,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Ao sen tĩnh lặng, cá lội vui,\nGió nhẹ lay cành, lá rụng rơi.\nYên bình là phúc, ai hay biết,\nGiữ mãi trong lòng, chẳng đổi thôi.',
    meaning: 'Quẻ trung bình, cuộc sống yên bình và ổn định. Không có sóng gió lớn, phù hợp để nghỉ ngơi và tận hưởng.',
    advice: 'Đừng tìm kiếm sự kích thích, hãy tận hưởng sự bình yên. Đó mới là hạnh phúc thực sự.'
  },
  {
    id: 47,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Ngựa non háu đá, chí hiên ngang,\nĐường dài vạn dặm, bước rộn ràng.\nTuổi trẻ tài cao, trời thương mến,\nDanh thơm lưu mãi, tiếng vang vang.',
    meaning: 'Quẻ tốt, đặc biệt cho người trẻ tuổi. Năng lượng dồi dào, ý tưởng sáng tạo, có cơ hội tỏa sáng trong lĩnh vực mới.',
    advice: 'Tận dụng sức trẻ và nhiệt huyết, đừng ngại thử nghiệm. Sai lầm ở tuổi trẻ là bài học quý.'
  },
  {
    id: 48,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Gió chiều hiu hắt, lá vàng bay,\nĐường xa mỏi gối, bước chân quay.\nNhưng đừng buồn bã, mùa đông hết,\nXuân sang hoa nở, vui sum vầy.',
    meaning: 'Quẻ hạ, có thể gặp mệt mỏi về thể chất và tinh thần. Cần chú ý nghỉ ngơi, đừng ôm quá nhiều việc.',
    advice: 'Ưu tiên sức khỏe trên hết. Tập thể dục, ăn uống lành mạnh, ngủ đủ giấc. Mọi thứ khác đến sau.'
  },
  {
    id: 49,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Đêm trừ tịch, pháo hoa rực rỡ,\nNgười người vui vẻ, nét cười tươi.\nNăm mới bước vào, vạn sự mới,\nGia đình sum họp, ấm tình người.',
    meaning: 'Quẻ tốt, gia đình là điểm tựa vững chắc. Năm nay gia đạo hưng thịnh, con cái giỏi giang, vợ chồng hòa thuận.',
    advice: 'Dành nhiều thời gian cho gia đình, đó là nguồn năng lượng tích cực nhất của bạn.'
  },
  {
    id: 50,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Ông tơ bà nguyệt, duyên ai xe,\nĐôi ta gặp gỡ, chẳng hẹn thề.\nNhưng lòng biết lòng, tình tri kỷ,\nĐường đời có bạn, nhẹ hơn nhiều.',
    meaning: 'Quẻ trung bình, đặc biệt về tình duyên. Người độc thân có thể gặp người hợp ý. Người có đôi cần thêm thấu hiểu.',
    advice: 'Lắng nghe nhiều hơn, nói ít đi. Thấu hiểu là chìa khóa của mọi mối quan hệ.'
  },
  {
    id: 51,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Vàng ròng thử lửa, ngọc mài sáng,\nGian khó rèn người, chí kiên cường.\nNăm Ngọ phi thường, ai dũng cảm,\nThành công rực rỡ, sáng con đường.',
    meaning: 'Quẻ tốt cho người dám nghĩ dám làm. Thử thách đầu năm chỉ là bài kiểm tra, vượt qua sẽ gặt hái lớn.',
    advice: 'Đối mặt với thử thách thay vì trốn tránh. Sau cơn mưa trời lại sáng.'
  },
  {
    id: 52,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Ngồi câu bên suối đợi cá lên,\nKiên nhẫn một chiều, được cá ngon.\nĐời người cũng vậy, chờ thời thế,\nĐến lúc cần đi, bước rất nên.',
    meaning: 'Quẻ trung bình, kiên nhẫn chờ đợi thời cơ. Nửa đầu năm nên tích lũy, nửa sau hành động.',
    advice: 'Quan sát và chuẩn bị trước, đừng vội hành động. Thời cơ chín muồi sẽ tự đến.'
  },
  {
    id: 53,
    type: 'thuong-thuong',
    typeLabel: 'Thượng Thượng',
    poem: 'Mùa xuân hoa nở ngập sắc vàng,\nPhượng hoàng tung cánh giữa trời quang.\nMuôn dân hân hoan mừng năm mới,\nPhúc lộc đầy nhà, vạn sự an.',
    meaning: 'Quẻ thượng thượng, may mắn tột đỉnh. Năm nay mọi ước mơ đều có thể thành hiện thực. Đặc biệt tốt về tài lộc và danh vọng.',
    advice: 'Hãy dám mơ lớn hơn. Năm nay vũ trụ ủng hộ bạn, mọi nỗ lực đều được nhân đôi.'
  },
  {
    id: 54,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Kiến tha lâu đầy tổ,\nMiệt mài chẳng biết mỏi.\nNgười chăm chỉ cần cù,\nTrời chẳng phụ lòng ai.',
    meaning: 'Quẻ hạ, cần cần kiệm và chăm chỉ hơn. Không có đường tắt cho thành công, chỉ có lao động và kiên nhẫn.',
    advice: 'Làm việc chăm chỉ, chi tiêu tiết kiệm, tích tiểu thành đại. Đừng mơ giàu nhanh.'
  },
  {
    id: 55,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Trúc xinh trúc mọc bờ ao,\nEm xinh em đứng chỗ nào cũng xinh.\nNăm mới duyên tốt lành,\nĐôi ta hẹn ước, chung tình trọn đời.',
    meaning: 'Quẻ tốt đặc biệt cho tình duyên. Có thể gặp ý trung nhân hoặc bước sang chương mới trong tình yêu.',
    advice: 'Chủ động hơn trong chuyện tình cảm, đừng ngại bày tỏ. Duyên lành đang chờ bạn.'
  },
  {
    id: 56,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Mùa nào thức ấy, đất nuôi người,\nCày sâu cuốc bẫm, đẹp tươi đời.\nLàm ăn chân chính, lòng thanh thản,\nBốn mùa no ấm, rạng nụ cười.',
    meaning: 'Quẻ trung bình, đề cao lao động chân chính. Thu nhập ổn định, không giàu nhưng đủ. Quan trọng nhất là tâm an.',
    advice: 'Tập trung vào công việc chính, đừng chạy theo trào lưu. Kiếm tiền bằng sức lao động là bền vững nhất.'
  },
  {
    id: 57,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Mây ngũ sắc bay quanh mặt trời,\nRồng vàng phun ngọc, sáng khắp nơi.\nPhúc tinh chiếu mệnh, người may mắn,\nVạn sự như ý, thỏa tâm người.',
    meaning: 'Quẻ tốt, phúc tinh chiếu mệnh. Được trời độ, quý nhân giúp, vạn sự hanh thông. Đặc biệt may về sức khỏe và gia đình.',
    advice: 'Hãy biết ơn và chia sẻ may mắn. Giúp đỡ người khác sẽ nhân lên phúc đức.'
  },
  {
    id: 58,
    type: 'ha',
    typeLabel: 'Hạ',
    poem: 'Mưa dầm thấm lâu, đường trơn trượt,\nBước đi cẩn trọng, chớ vội vàng.\nNgười khôn biết lựa thời mà tiến,\nChờ tạnh mưa tan, bước thênh thang.',
    meaning: 'Quẻ hạ, cần cẩn trọng trong từng bước đi. Đầu tư, ký hợp đồng, cam kết lớn đều nên xem xét kỹ.',
    advice: 'Đọc kỹ trước khi ký, hỏi ý kiến chuyên gia trước khi quyết định lớn. Cẩn tắc vô áy náy.'
  },
  {
    id: 59,
    type: 'thuong',
    typeLabel: 'Thượng',
    poem: 'Tiên rồng hội ngộ giữa trời xuân,\nNgười đức dày, phúc tự gần.\nNăm Ngọ mở ra trang sử mới,\nVinh quang chói lọi, sáng bội phần.',
    meaning: 'Quẻ tốt lành, đặc biệt cho người làm sáng tạo. Ý tưởng mới, dự án mới đều có cơ hội thành công lớn.',
    advice: 'Đừng ngại chia sẻ ý tưởng với mọi người. Sự sáng tạo cần được nuôi dưỡng và thể hiện.'
  },
  {
    id: 60,
    type: 'trung',
    typeLabel: 'Trung',
    poem: 'Bình minh lên, sương tan dần,\nĐường đi rõ nét, bước chân vững vàng.\nTuy chưa tới đích huy hoàng,\nNhưng từng bước một, rõ ràng lối đi.',
    meaning: 'Quẻ trung bình, mọi thứ đang đi đúng hướng dù chậm. Kết quả sẽ đến nếu kiên trì đúng đường.',
    advice: 'Tin vào quá trình, đừng chỉ nhìn kết quả. Hành trình cũng quan trọng như đích đến.'
  },
  // --- New fortunes 61-100 ---
  {
    id: 61, type: 'thuong-thuong', typeLabel: 'Thượng Thượng',
    poem: 'Ngọc hoàng ban chiếu khắp nhân gian,\nPhúc lộc thọ đầy, vạn sự an.\nNgựa thần cất cánh bay muôn dặm,\nVinh hoa phú quý, chẳng gian nan.',
    meaning: 'Quẻ thượng thượng đại cát. Như được ngọc hoàng ban phúc, mọi ước nguyện đều thành hiện thực. Năm Ngọ đặc biệt thuận lợi.',
    advice: 'Hãy lập nguyện lớn và hành động ngay. Trời đất đều ủng hộ bạn trong năm nay.'
  },
  {
    id: 62, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Sáo diều vi vút giữa trời xanh,\nNgười tài đức sáng, phúc long lanh.\nMùa xuân gieo hạt, thu gặt quả,\nCông thành danh toại, tiếng lưu danh.',
    meaning: 'Quẻ tốt, tài năng được công nhận. Những dự án bắt đầu từ đầu năm sẽ mang lại kết quả tốt đẹp vào cuối năm.',
    advice: 'Gieo gì gặt nấy — hãy gieo những hạt giống tốt đẹp ngay từ bây giờ.'
  },
  {
    id: 63, type: 'trung', typeLabel: 'Trung',
    poem: 'Hạc vàng bay lượn giữa mây xanh,\nAn nhiên tự tại, dạ thanh thanh.\nĐời cho gì nhận, lòng không oán,\nPhúc đức tự nhiên đến bên mình.',
    meaning: 'Quẻ trung bình, cuộc sống thanh đạm nhưng bình an. Không có sóng gió lớn, phù hợp để tu tâm dưỡng tính.',
    advice: 'Sống chậm lại, trân trọng từng khoảnh khắc. Hạnh phúc nằm trong những điều giản dị.'
  },
  {
    id: 64, type: 'ha', typeLabel: 'Hạ',
    poem: 'Đèn khuya leo lét giữa đêm trường,\nNhưng vẫn soi đường, chẳng vấn vương.\nGian khó rèn lòng người quân tử,\nSau đêm tối nhất, sáng phi thường.',
    meaning: 'Quẻ hạ, có giai đoạn khó khăn nhưng không kéo dài. Cần giữ vững tinh thần, khó khăn là cơ hội để trưởng thành.',
    advice: 'Đừng sợ bóng tối, hãy tự mình là ngọn đèn. Kiên cường sẽ dẫn đến thành công.'
  },
  {
    id: 65, type: 'ha-ha', typeLabel: 'Hạ Hạ',
    poem: 'Bão táp phong ba, sóng dữ cuồng,\nThuyền nan giữa biển, gió mênh mang.\nNhưng ai vững tay chèo không bỏ,\nSẽ thấy bờ xa, ánh nắng vàng.',
    meaning: 'Quẻ hạ hạ — năm có nhiều thử thách lớn. Tài chính, sức khỏe và mối quan hệ đều cần chú ý đặc biệt. Nhưng đây cũng là năm rèn luyện ý chí mạnh nhất.',
    advice: 'Chuẩn bị tài chính dự phòng, chăm sóc sức khỏe, giữ gìn mối quan hệ. Làm nhiều việc thiện để hóa giải vận xui. Đi chùa cầu an đầu năm.'
  },
  {
    id: 66, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Kỳ lân xuất hiện báo điềm lành,\nNgười nhân đức sáng, phúc trời dành.\nNăm Ngọ hanh thông đường sự nghiệp,\nDanh thơm lưu mãi, tiếng vang danh.',
    meaning: 'Quẻ tốt, điềm lành cho sự nghiệp. Có thể được thăng chức hoặc mở rộng kinh doanh thành công.',
    advice: 'Nắm bắt cơ hội khi nó đến, đừng do dự. Người dũng cảm mới gặp được vận may lớn.'
  },
  {
    id: 67, type: 'trung', typeLabel: 'Trung',
    poem: 'Cánh buồm căng gió giữa trùng khơi,\nĐôi lúc gió ngược, vẫn thảnh thơi.\nNgười biết chờ thời, trời chẳng phụ,\nGió thuận buồm xuôi, đến nơi rồi.',
    meaning: 'Quẻ trung bình, cần biết chờ đợi thời cơ. Nửa đầu năm bình lặng, nửa sau có cơ hội đột phá.',
    advice: 'Tích lũy năng lượng và kiến thức, chờ thời điểm chín muồi để hành động.'
  },
  {
    id: 68, type: 'ha', typeLabel: 'Hạ',
    poem: 'Trời đổ mưa dông, đường ngập nước,\nBước chân trượt ngã, áo lem bùn.\nNhưng đứng dậy rồi, đường vẫn đó,\nMưa tan nắng hạ, sạch bụi trần.',
    meaning: 'Quẻ hạ, có thể vấp ngã trong công việc hoặc tài chính. Nhưng nếu biết đứng dậy, mọi thứ sẽ tốt đẹp trở lại.',
    advice: 'Chấp nhận thất bại là một phần của cuộc sống. Quan trọng là đứng dậy và tiếp tục bước.'
  },
  {
    id: 69, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Đào nở bên hiên, mai nở sân,\nXuân về rộn rã khắp xa gần.\nNgười vui, hoa nở, trời thêm đẹp,\nPhúc lộc tràn đầy, ấm lòng dân.',
    meaning: 'Quẻ tốt, niềm vui đến từ nhiều phía. Gia đình, bạn bè, công việc đều mang lại tin vui.',
    advice: 'Lan tỏa năng lượng tích cực, niềm vui bạn cho đi sẽ trở về gấp đôi.'
  },
  {
    id: 70, type: 'trung', typeLabel: 'Trung',
    poem: 'Cờ tướng một bàn, nghĩ sâu xa,\nNước đi cẩn trọng, chẳng sai ra.\nĐời như ván cờ, ai biết tính,\nThắng thua tùy trí, chẳng tùy may.',
    meaning: 'Quẻ trung bình, thành bại phụ thuộc vào trí tuệ hơn là may mắn. Cần suy nghĩ kỹ trước mỗi quyết định.',
    advice: 'Đừng dựa vào vận may, hãy dùng trí tuệ. Lập kế hoạch chi tiết cho mọi việc quan trọng.'
  },
  {
    id: 71, type: 'thuong-thuong', typeLabel: 'Thượng Thượng',
    poem: 'Rồng vàng vượt sóng hóa thiên long,\nMãnh hổ xuống đồng, vạn thú tôn.\nNăm Ngọ vận trình như ánh sáng,\nChiếu khắp muôn phương, phúc vô cùng.',
    meaning: 'Quẻ thượng thượng tuyệt đỉnh. Vận mệnh sáng như mặt trời. Mọi lĩnh vực đều đạt thành tựu đáng kinh ngạc.',
    advice: 'Đừng giới hạn bản thân — năm nay bạn có thể đạt được những điều phi thường. Hãy dám mơ lớn nhất!'
  },
  {
    id: 72, type: 'ha', typeLabel: 'Hạ',
    poem: 'Chim sẻ trong lồng, cá trong ao,\nTuy không tự do, nhưng no lâu.\nKiên nhẫn chờ thời, lồng sẽ mở,\nCánh chim bay vút, thoát trời cao.',
    meaning: 'Quẻ hạ, cảm giác bị giới hạn hoặc bó buộc. Nhưng đây chỉ là giai đoạn tạm thời, cần kiên nhẫn.',
    advice: 'Đừng vội phá rào, hãy chuẩn bị cho khi cánh cửa mở. Thời điểm giải phóng sẽ đến.'
  },
  {
    id: 73, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Ngựa ô phi nhanh vượt đồng hoang,\nGió lùa bờm dựng, bụi mù tàn.\nChí trai bốn biển là nhà cả,\nĐường dài vạn dặm, bước hiên ngang.',
    meaning: 'Quẻ tốt cho việc đi xa hoặc mở rộng tầm nhìn. Du lịch, du học, kinh doanh quốc tế đều thuận lợi.',
    advice: 'Mở rộng phạm vi hoạt động, đừng ngại bước ra khỏi vùng an toàn. Thế giới rộng lớn đang chờ đón.'
  },
  {
    id: 74, type: 'trung', typeLabel: 'Trung',
    poem: 'Đồng hồ cát chảy, thời gian trôi,\nPhút giây quý báu, chớ buông lơi.\nHôm nay gieo hạt, ngày mai hái,\nChẳng phí thời gian, sống trọn đời.',
    meaning: 'Quẻ trung bình, nhắc nhở về giá trị thời gian. Đừng lãng phí, hãy tận dụng từng ngày để xây dựng tương lai.',
    advice: 'Quản lý thời gian hiệu quả, ưu tiên những việc quan trọng. Thời gian là tài sản quý nhất.'
  },
  {
    id: 75, type: 'ha-ha', typeLabel: 'Hạ Hạ',
    poem: 'Sấm rền chớp giật, đất rung trời,\nCây đổ nhà xiêu, cảnh tả tơi.\nNhưng sau cơn bão, trời lại sáng,\nĐất trời tươi mới, đẹp hơn đời.',
    meaning: 'Quẻ hạ hạ — năm có biến động mạnh, có thể mất mát tài chính hoặc thay đổi lớn trong cuộc sống. Tuy nhiên, sau bão tố luôn là cầu vồng.',
    advice: 'Giữ bình tĩnh trong mọi hoàn cảnh. Chuẩn bị tài chính khẩn cấp. Tìm kiếm sự hỗ trợ từ gia đình và bạn bè. Đừng cố gắng giải quyết một mình.'
  },
  {
    id: 76, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Hồ sen ngát hương, bướm lượn bay,\nNgười đẹp duyên lành, phúc đong đầy.\nTrời cho sắc đẹp, cho trí tuệ,\nDùng để giúp đời, chẳng phí ngày.',
    meaning: 'Quẻ tốt, đặc biệt cho phụ nữ. Sắc đẹp, sức khỏe và trí tuệ đều được gia tăng. Tình duyên rất tốt.',
    advice: 'Tự tin vào vẻ đẹp bên trong, đó là điều thu hút người khác nhất.'
  },
  {
    id: 77, type: 'trung', typeLabel: 'Trung',
    poem: 'Mặt nước hồ thu phẳng lặng tờ,\nGương trời in bóng, mây mơ hồ.\nLòng người thanh tịnh, tâm an lạc,\nĐời cho bao nhiêu, ta đợi chờ.',
    meaning: 'Quẻ trung bình, năm yên tĩnh và bình lặng. Thích hợp để suy ngẫm, thiền định và tìm lại chính mình.',
    advice: 'Dành thời gian một mình để suy ngẫm. Hiểu bản thân là bước đầu tiên để thành công.'
  },
  {
    id: 78, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Mỏ vàng ẩn giấu dưới lòng đất,\nNgười kiên nhẫn đào, sẽ thấy vàng.\nNăm Ngọ tài lộc từ đất mọc,\nCông sức bỏ ra, được đền hoàn.',
    meaning: 'Quẻ tốt về tài chính. Đầu tư bất động sản hoặc kinh doanh liên quan đến đất đai đều thuận lợi.',
    advice: 'Đầu tư vào những gì bền vững. Bất động sản, vàng, hoặc kinh doanh truyền thống là lựa chọn tốt.'
  },
  {
    id: 79, type: 'ha', typeLabel: 'Hạ',
    poem: 'Con kiến leo cành, gặp gió to,\nRơi xuống đất bằng, lại bò lên.\nMiệt mài không biết mệt, không sờn,\nChí cao ngàn trượng, dẫu thân hèn.',
    meaning: 'Quẻ hạ, cần nỗ lực gấp đôi so với bình thường. Kết quả sẽ đến nhưng chậm và vất vả hơn.',
    advice: 'Đừng so sánh với người khác. Mỗi người một con đường, hãy đi đường của mình với lòng kiên trì.'
  },
  {
    id: 80, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Trăm hoa đua nở vườn xuân mới,\nOng bướm dập dìu, nhạc rộn ràng.\nNgười có phúc dày, hoa mãi nở,\nBốn mùa xuân sắc, chẳng héo tàn.',
    meaning: 'Quẻ tốt, cuộc sống phong phú và đa sắc màu. Có nhiều niềm vui đến từ hoạt động xã hội và nghệ thuật.',
    advice: 'Tham gia các hoạt động cộng đồng, lễ hội. Cuộc sống càng phong phú, phúc lộc càng nhiều.'
  },
  {
    id: 81, type: 'trung', typeLabel: 'Trung',
    poem: 'Con đò lặng lẽ sang ngang sông,\nBến cũ người quen, tình mênh mông.\nQua sông nhớ bến, thương người lái,\nNghĩa tình sâu nặng, chẳng phai phôi.',
    meaning: 'Quẻ trung bình, nhắc nhở về tình nghĩa. Giữ gìn những mối quan hệ cũ, đó là tài sản vô giá.',
    advice: 'Liên lạc lại với bạn cũ, thầy xưa. Mối quan hệ cũ có thể mang đến cơ hội mới.'
  },
  {
    id: 82, type: 'ha', typeLabel: 'Hạ',
    poem: 'Rừng sâu lạc lối, sương mù giăng,\nBước đi dò dẫm, dạ bâng khuâng.\nNhưng sao bắc đẩu vẫn trên đó,\nNhìn lên trời cao, sẽ rõ đường.',
    meaning: 'Quẻ hạ, có giai đoạn mất phương hướng. Cần tĩnh tâm, tìm lại mục tiêu và la bàn nội tâm.',
    advice: 'Dừng lại, hít thở, và nhìn lại bức tranh toàn cảnh. Đôi khi lạc đường lại tìm được con đường đẹp hơn.'
  },
  {
    id: 83, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Phượng hoàng niết bàn, tái sinh rồi,\nĐẹp hơn, mạnh hơn, sáng ngời ngời.\nNgười biết buông bỏ, được nhiều hơn,\nĐời mới tươi đẹp, vạn lần tươi.',
    meaning: 'Quẻ tốt cho người đang tìm kiếm sự thay đổi. Kết thúc cũ mở ra khởi đầu mới tốt đẹp hơn.',
    advice: 'Đừng sợ thay đổi, hãy chủ động thay đổi. Phượng hoàng phải qua lửa mới hóa thành bất tử.'
  },
  {
    id: 84, type: 'trung', typeLabel: 'Trung',
    poem: 'Ấm trà buổi sáng, sách bên tay,\nNgày mới bình yên, gió nhẹ bay.\nChẳng cần giàu có, lòng thanh thản,\nAn lạc từ tâm, phúc tràn đầy.',
    meaning: 'Quẻ trung bình, cuộc sống bình dị nhưng đẹp đẽ. Phù hợp cho người tìm kiếm sự bình yên nội tâm.',
    advice: 'Tạo thói quen tốt mỗi ngày: đọc sách, tập thể dục, thiền định. Hạnh phúc nằm trong thói quen.'
  },
  {
    id: 85, type: 'ha-ha', typeLabel: 'Hạ Hạ',
    poem: 'Hạn hán lâu ngày, ruộng nứt toang,\nGiếng cạn suối khô, cỏ héo tàn.\nNhưng mưa rồi sẽ về tưới mát,\nĐất đai phì nhiêu, lúa chín vàng.',
    meaning: 'Quẻ hạ hạ — giai đoạn cạn kiệt năng lượng và tài nguyên. Cần tiết kiệm tối đa, tránh mạo hiểm và đầu tư lớn.',
    advice: 'Hạn chế chi tiêu, tăng cường tiết kiệm. Tập trung vào sức khỏe thể chất và tinh thần. Đừng vay mượn hay cho vay số lớn trong năm nay.'
  },
  {
    id: 86, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Ngựa trắng mang theo tin vui về,\nÁo gấm vinh quy, khắp bốn bề.\nNgười có chí lớn, trời thương mến,\nThanh danh vang dội, chẳng lê thê.',
    meaning: 'Quẻ tốt, có tin vui về danh tiếng hoặc sự công nhận. Được vinh danh hoặc nhận giải thưởng.',
    advice: 'Khiêm tốn khi thành công. Danh vọng chỉ bền lâu khi đi kèm với đức độ.'
  },
  {
    id: 87, type: 'trung', typeLabel: 'Trung',
    poem: 'Sông dài biển rộng, nước xuôi dòng,\nHòn đá nhỏ bé, nằm giữa sông.\nNước chảy mài đá thành ngọc sáng,\nThời gian là bạn, chẳng lo lòng.',
    meaning: 'Quẻ trung bình, thời gian là yếu tố quan trọng nhất. Mọi thứ cần thời gian để trưởng thành và hoàn thiện.',
    advice: 'Kiên nhẫn là đức tính quý nhất năm nay. Đừng vội vàng, hãy để thời gian làm việc cho bạn.'
  },
  {
    id: 88, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Vườn đào thắm sắc đón xuân sang,\nChim hót véo von, nhạc rộn ràng.\nNgười có phúc duyên, trời se sẵn,\nTình đẹp như mơ, vạn sắc vàng.',
    meaning: 'Quẻ tốt, đặc biệt cho hôn nhân và gia đình. Người có đôi sẽ có tin vui, người độc thân gặp ý trung nhân.',
    advice: 'Mở lòng đón nhận tình yêu. Đừng quá cầu toàn, người phù hợp quan trọng hơn người hoàn hảo.'
  },
  {
    id: 89, type: 'ha', typeLabel: 'Hạ',
    poem: 'Con ốc sên bò chậm rì rì,\nĐường dài trước mặt, biết đi thì.\nBao người cười chê, ốc chẳng ngại,\nĐến nơi rồi, ai biết khác gì.',
    meaning: 'Quẻ hạ, mọi việc tiến triển chậm chạp. Cần nhiều kiên nhẫn hơn bình thường. Đừng so sánh tiến độ với người khác.',
    advice: 'Chậm mà chắc. Đừng nản lòng vì tiến độ chậm. Quan trọng là không dừng lại.'
  },
  {
    id: 90, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Chuông chùa ngân vang giữa trời đêm,\nLòng người tĩnh lặng, dạ êm đềm.\nPhật tâm soi sáng đường trần thế,\nPhúc đức vô biên, chẳng hề quên.',
    meaning: 'Quẻ tốt, được phật trời phù hộ. Tâm linh bình an, sức khỏe tốt, gia đạo hưng thịnh.',
    advice: 'Thường xuyên đi chùa, hành thiện tích đức. Tâm an thì vạn sự an.'
  },
  {
    id: 91, type: 'trung', typeLabel: 'Trung',
    poem: 'Con chim bay cao gặp gió ngược,\nHạ cánh nghỉ ngơi, đợi gió xuôi.\nChẳng phải lùi bước, mà là đợi,\nThời cơ chín muồi, bay vào khơi.',
    meaning: 'Quẻ trung bình, nhắc nhở biết lùi để tiến. Đôi khi dừng lại cũng là một chiến lược khôn ngoan.',
    advice: 'Không nhất thiết lúc nào cũng phải tiến. Biết dừng đúng lúc là trí tuệ.'
  },
  {
    id: 92, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Mặt trời lên cao, tỏa nắng hồng,\nVạn vật sinh sôi, đất trời rộng.\nNgười có lòng thành, trời phù hộ,\nMuôn sự như ý, phúc hanh thông.',
    meaning: 'Quẻ tốt, ánh dương chiếu sáng mọi ngóc ngách. Vận may rõ ràng, dễ nhận biết và nắm bắt.',
    advice: 'Khi cơ hội rõ ràng, hãy hành động dứt khoát. Đừng để sự do dự làm lỡ cơ hội.'
  },
  {
    id: 93, type: 'ha', typeLabel: 'Hạ',
    poem: 'Cánh hoa tan tác giữa cơn giông,\nNhưng rễ vẫn sâu, gốc vẫn trồng.\nMùa xuân năm tới, hoa lại nở,\nĐẹp hơn bao giờ, sắc thêm nồng.',
    meaning: 'Quẻ hạ, có thể mất mát hoặc tổn thương. Nhưng gốc rễ vẫn vững, phục hồi nhanh.',
    advice: 'Giữ vững nền tảng: sức khỏe, gia đình, đức tin. Khi gốc vẫn còn, hoa sẽ lại nở.'
  },
  {
    id: 94, type: 'trung', typeLabel: 'Trung',
    poem: 'Bước lên bậc thềm, từng nấc một,\nChẳng ai bay thẳng tới tầng cao.\nHành trình ngàn dặm, từ bước nhỏ,\nChí bền mới biết đỉnh thanh cao.',
    meaning: 'Quẻ trung bình, thành công đến từ những bước nhỏ tích lũy. Không có phép màu, chỉ có sự kiên trì.',
    advice: 'Đặt mục tiêu nhỏ mỗi ngày và hoàn thành nó. Tích tiểu thành đại.'
  },
  {
    id: 95, type: 'ha-ha', typeLabel: 'Hạ Hạ',
    poem: 'Mây đen kéo đến, trời tối sầm,\nGió gào sấm chớp, lạnh lùng tâm.\nNhưng qua cơn bão, cầu vồng hiện,\nBảy sắc lung linh, đẹp vô ngần.',
    meaning: 'Quẻ hạ hạ — năm đầy sóng gió và biến cố bất ngờ. Tuy nhiên, đây cũng là cơ hội để chứng minh bản lĩnh và tái sinh mạnh mẽ.',
    advice: 'Tìm kiếm sự hỗ trợ chuyên nghiệp khi cần. Chăm sóc sức khỏe tinh thần. Nhớ rằng: "cái khó ló cái khôn" — bạn sẽ trưởng thành vượt bậc sau năm nay.'
  },
  {
    id: 96, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Khói hương nghi ngút, lễ đầu năm,\nThành tâm khấn vái, phúc muôn phần.\nTổ tiên phù hộ, con cháu cả,\nĐời đời no ấm, vui trăm năm.',
    meaning: 'Quẻ tốt, phúc đức từ tổ tiên ban xuống. Gia đình hòa thuận, con cháu thành đạt.',
    advice: 'Nhớ thắp hương tổ tiên, giữ gìn gia phong. Phúc ấm từ ông bà là tài sản lớn nhất.'
  },
  {
    id: 97, type: 'trung', typeLabel: 'Trung',
    poem: 'Con tằm rút ruột nhả tơ vàng,\nMiệt mài cống hiến, chẳng than van.\nĐời người có lúc cần hy sinh,\nĐể đổi lấy ngày mai vinh quang.',
    meaning: 'Quẻ trung bình, cần sự cống hiến và hy sinh. Kết quả không đến nhanh nhưng sẽ xứng đáng.',
    advice: 'Đầu tư công sức vào những việc dài hạn. Đừng chọn con đường dễ, hãy chọn con đường đúng.'
  },
  {
    id: 98, type: 'thuong', typeLabel: 'Thượng',
    poem: 'Lân dẫn đầu đoàn, trống vang trời,\nXuân về rộn rã, lộc tiền rơi.\nNgười người hoan hỉ, nhà nhà vui,\nPhúc lộc đầy nhà, thọ rạng ngời.',
    meaning: 'Quẻ tốt, điềm may mắn tràn đầy. Năm nay nhà nhà đều vui, đặc biệt tốt cho kinh doanh buôn bán.',
    advice: 'Khởi đầu kinh doanh hoặc mở rộng buôn bán ngay đầu năm. Vận may đang ở đỉnh cao.'
  },
  {
    id: 99, type: 'ha', typeLabel: 'Hạ',
    poem: 'Chiếc lá cuối cùng rơi khỏi cành,\nMùa đông lạnh giá, dạ mong manh.\nNhưng xuân rồi đến, chồi non nhú,\nĐời vẫn xanh tươi, vẫn long lanh.',
    meaning: 'Quẻ hạ, có giai đoạn cô đơn hoặc buồn bã. Nhưng đây chỉ là mùa đông, xuân sẽ quay trở lại.',
    advice: 'Chăm sóc sức khỏe tinh thần. Nếu buồn, hãy chia sẻ với người thân. Đừng một mình gánh chịu.'
  },
  {
    id: 100, type: 'thuong-thuong', typeLabel: 'Thượng Thượng',
    poem: 'Ngũ phúc lâm môn, vạn sự thành,\nPhúc Lộc Thọ Hỉ Tài — đủ cả danh.\nNăm Ngọ đại cát, trời ban phước,\nMuôn đời ghi nhớ, phúc trường sinh.',
    meaning: 'Quẻ thượng thượng đại cát — ngũ phúc lâm môn. Đây là quẻ may mắn nhất, mọi lĩnh vực đều tốt: sức khỏe, tài lộc, sự nghiệp, gia đình, tình duyên.',
    advice: 'Biết ơn trời đất và chia sẻ phúc lành với mọi người. Người cho đi nhiều nhất chính là người nhận được nhiều nhất.'
  }
];

// ============================================
// DOM Elements
// ============================================
const $ = id => document.getElementById(id);
const shakeState = $('shakeState');
const resultState = $('resultState');
const ongQueWrapper = $('ongQueWrapper');
const ongQue = $('ongQue');
const fallingStick = $('fallingStick');
const stickNumber = $('stickNumber');
const resultCard = $('resultCard');
const btnShake = $('btnShake');
const btnAgain = $('btnAgain');
const instruction = $('instruction');
const fireworkCanvas = $('fireworkCanvas');
const decorations = $('decorations');
const resultQueNumber = $('resultQueNumber');
const resultQueType = $('resultQueType');
const resultPoem = $('resultPoem');
const resultMeaning = $('resultMeaning');
const resultAdvice = $('resultAdvice');

// ============================================
// State
// ============================================
let isShaking = false;
let canShake = true;
let shakeRAF = null;
let ringInterval = null;
let rattleInterval = null;
let recentDraws = []; // Track recent draws to avoid repeats
const MAX_HISTORY = 5;
let motionPermissionRequested = false; // Avoid re-requesting on every tap

// ============================================
// Decorations
// ============================================
function createPetals() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 12; i++) {
    const p = document.createElement('div');
    const r = Math.random();
    p.className = `petal ${r > 0.6 ? 'pink' : r > 0.3 ? '' : 'red'}`;
    p.style.cssText = `left:${Math.random() * 100}%;animation-duration:${10 + Math.random() * 12}s;animation-delay:${Math.random() * 20}s;width:${6 + Math.random() * 10}px;height:${6 + Math.random() * 10}px;`;
    frag.appendChild(p);
  }
  decorations.appendChild(frag);
}

function createGoldenDust() {
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 6; i++) {
    const d = document.createElement('div');
    d.className = 'dust';
    const sz = 2 + Math.random() * 3;
    d.style.cssText = `left:${20 + Math.random() * 60}%;top:${30 + Math.random() * 50}%;animation-duration:${4 + Math.random() * 6}s;animation-delay:${Math.random() * 8}s;width:${sz}px;height:${sz}px;`;
    frag.appendChild(d);
  }
  decorations.appendChild(frag);
}

// ============================================
// Ring Pulse (during shake)
// ============================================
function createRingPulse() {
  const ring = document.createElement('div');
  ring.className = 'ring-pulse';
  ongQue.appendChild(ring);
  setTimeout(() => ring.remove(), 900);
}

// ============================================
// Confetti
// ============================================
const effectsContainer = document.getElementById('effectsContainer');

function launchConfetti() {
  const colors = ['#FFD700', '#FF6B6B', '#FFB7C5', '#E63946', '#FFE55C', '#FFA500'];
  const frag = document.createDocumentFragment();
  for (let i = 0; i < 25; i++) {
    const c = document.createElement('div');
    c.className = 'confetti';
    c.style.cssText = `left:${20 + Math.random() * 60}%;top:-10px;background:${colors[Math.random() * colors.length | 0]};animation-duration:${2.5 + Math.random() * 2}s;animation-delay:${Math.random() * 0.5}s;width:${5 + Math.random() * 5}px;height:${5 + Math.random() * 5}px;border-radius:${Math.random() > 0.5 ? '50%' : '2px'};`;
    frag.appendChild(c);
  }
  effectsContainer.appendChild(frag);
  setTimeout(() => { while (effectsContainer.firstChild) effectsContainer.firstChild.remove(); }, CONFETTI_LIFETIME);
}

// ============================================
// Sparkles
// ============================================
function createSparkles() {
  const rect = resultCard.getBoundingClientRect();
  const cx = rect.left + rect.width / 2;
  const cy = rect.top + 50;
  const colors = ['#FFD700', '#FF6B6B', '#FFB7C5', '#FFE55C', '#FFA500'];
  const sparkleContainer = document.createElement('div');
  sparkleContainer.className = 'sparkle-batch';
  for (let i = 0; i < 14; i++) {
    const s = document.createElement('div');
    s.className = 'sparkle';
    const angle = (Math.PI * 2 / 14) * i;
    const dist = 40 + Math.random() * 90;
    s.style.cssText = `left:${cx}px;top:${cy}px;--tx:${Math.cos(angle) * dist}px;--ty:${Math.sin(angle) * dist}px;animation-delay:${Math.random() * 0.2}s;background:${colors[Math.random() * colors.length | 0]};width:${4 + Math.random() * 4}px;height:${4 + Math.random() * 4}px;`;
    sparkleContainer.appendChild(s);
  }
  document.body.appendChild(sparkleContainer);
  setTimeout(() => sparkleContainer.remove(), SPARKLE_LIFETIME);
}

// ============================================
// Shake Flow
// ============================================
function startShake() {
  if (!canShake || isShaking) return;
  isShaking = true;

  ongQueWrapper.style.animation = 'none';
  ongQueWrapper.style.transition = 'none';
  void ongQueWrapper.offsetHeight;
  ongQueWrapper.classList.add('shaking');
  btnShake.classList.add('disabled');
  instruction.textContent = 'Đang lắc quẻ...';
  instruction.style.animation = 'none';
  instruction.classList.remove('pulsing');

  // Realistic rattling sound throughout shaking
  rattleInterval = setInterval(playRattleSound, RATTLE_INTERVAL);
  ringInterval = setInterval(createRingPulse, RING_PULSE_INTERVAL);

  const totalDuration = SHAKE_MIN_DURATION + Math.random() * SHAKE_RANDOM_RANGE;
  let shakeStart = null;
  let risingStick = null;

  function tick(now) {
    if (!shakeStart) shakeStart = now;
    const t = now - shakeStart;

    if (t >= totalDuration) {
      shakeRAF = null;
      finishShake(risingStick);
      return;
    }

    const gentleEnd = SHAKE_GENTLE_PHASE;
    const intenseEnd = totalDuration - SHAKE_SLOWDOWN_PHASE;
    let x, y, rot;

    if (t < gentleEnd) {
      // Phase 1: Gentle sine-wave wobble, intensity ramps up
      const p = t / gentleEnd;
      x = Math.sin(t * 0.02) * 3 * p;
      y = Math.sin(t * 0.015) * 1 * p;
      rot = Math.sin(t * 0.018) * 2 * p;
    } else if (t < intenseEnd) {
      // Phase 2: Layered sine waves for smooth organic shake
      x = Math.sin(t * 0.035) * 4 + Math.sin(t * 0.071) * 1.5;
      y = Math.cos(t * 0.029) * 1.5 + Math.sin(t * 0.053) * 0.8;
      rot = Math.sin(t * 0.025) * 2.5 + Math.cos(t * 0.061) * 1;
    } else {
      // Phase 3: Slowing down with rhythmic tilts
      const p = (t - intenseEnd) / SHAKE_SLOWDOWN_PHASE;
      const decay = 1 - p * 0.8;
      x = Math.sin(t * 0.02) * 3 * decay;
      y = Math.cos(t * 0.015) * 1 * decay;
      rot = Math.sin(t * 0.018) * 2 * decay;
    }

    // Progressively raise one stick out of the tube
    if (!risingStick && t >= gentleEnd) {
      const sticks = ongQue.querySelectorAll('.stick');
      risingStick = sticks[Math.random() * sticks.length | 0];
      risingStick.classList.add('rising');
    }
    if (risingStick && t >= gentleEnd) {
      const riseProgress = Math.min((t - gentleEnd) / (totalDuration - gentleEnd), 1);
      // Ease-in-quad: starts slow, accelerates — like a stick gradually working its way out
      const eased = riseProgress * riseProgress;
      const riseAmount = eased * 55;
      const i = parseInt(risingStick.style.getPropertyValue('--i'));
      const baseRot = (i - 3) * 4;
      risingStick.style.transform = `rotate(${baseRot}deg) translateY(${-riseAmount}px)`;
    }

    ongQueWrapper.style.transform = `translate(${x}px, ${y}px) rotate(${rot}deg)`;
    shakeRAF = requestAnimationFrame(tick);
  }

  shakeRAF = requestAnimationFrame(tick);
}

let stickAnimRAF = null;

function finishShake(risingStick) {
  isShaking = false;
  canShake = false;
  ongQueWrapper.classList.remove('shaking');
  clearInterval(ringInterval);
  clearInterval(rattleInterval);

  // Pick a fortune that hasn't been drawn recently
  let fortune;
  let attempts = 0;
  do {
    fortune = FORTUNES[Math.random() * FORTUNES.length | 0];
    attempts++;
  } while (recentDraws.includes(fortune.id) && attempts < 20);
  recentDraws.push(fortune.id);
  if (recentDraws.length > MAX_HISTORY) recentDraws.shift();

  // Tilt phase: ống quẻ tilts gently to pour out a stick
  ongQueWrapper.style.transition = 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)';
  ongQueWrapper.style.transform = 'rotate(-15deg) translateY(-5px)';

  setTimeout(() => {
    stickNumber.textContent = fortune.id;
    stickNumber.classList.remove('visible');
    playWoodSound();

    // ──── Phase 1: Morph (small stick → big stick) ────
    // Position the falling stick exactly at the rising stick's location
    const sceneRect = document.getElementById('scene').getBoundingClientRect();
    let startX, startY, startScale, startRot;

    if (risingStick) {
      const stickRect = risingStick.getBoundingClientRect();
      // Position relative to the scene container
      startX = stickRect.left - sceneRect.left + stickRect.width / 2;
      startY = stickRect.top - sceneRect.top + stickRect.height;
      startScale = stickRect.width / 18; // 18px is the falling-stick-body width
      const i = parseInt(risingStick.style.getPropertyValue('--i'));
      startRot = (i - 3) * 4; // base rotation of the stick
    } else {
      // Fallback: center of the ống quẻ
      const oqRect = ongQue.getBoundingClientRect();
      startX = oqRect.left - sceneRect.left + oqRect.width / 2;
      startY = oqRect.top - sceneRect.top + 30;
      startScale = 0.13;
      startRot = 0;
    }

    // Set initial position and scale
    fallingStick.style.display = '';
    fallingStick.style.left = startX + 'px';
    fallingStick.style.top = startY + 'px';
    fallingStick.style.transform = `translate(-50%, -100%) scale(${startScale}) rotate(${startRot}deg)`;
    fallingStick.classList.add('show');

    // Hide small rising stick after a brief overlap
    if (risingStick) {
      setTimeout(() => {
        risingStick.style.visibility = 'hidden';
        risingStick.classList.remove('rising');
      }, 120);
    }

    // Return ống quẻ to upright position
    setTimeout(() => {
      ongQueWrapper.style.transition = 'transform 0.6s ease-out';
      ongQueWrapper.style.transform = '';
    }, 350);

    // ──── Animate: Morph → Rise → Reveal Number → Show Result ────
    const MORPH_DURATION = 700;     // ms: scale up to full size (slow, smooth)
    const HOLD_DURATION = 700;      // ms: pause to show the number
    const TOTAL_DURATION = MORPH_DURATION + HOLD_DURATION;

    // Target positions
    const centerX = sceneRect.width / 2;
    const targetY = sceneRect.height * 0.30; // center area

    let morphStart = null;

    function easeInOutCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    }
    function easeOutCubic(t) { return 1 - Math.pow(1 - t, 3); }

    function animateStick(now) {
      if (!morphStart) morphStart = now;
      const elapsed = now - morphStart;

      let x, y, scale, rot, numberVisible = false;

      if (elapsed < MORPH_DURATION) {
        // Phase 1: MORPH — smoothly scale up and drift to center
        // Use easeInOutCubic so it starts gently (no snap) and accelerates mid-way
        const p = easeInOutCubic(elapsed / MORPH_DURATION);
        scale = startScale + (1 - startScale) * p;
        x = startX + (centerX - startX) * p;
        y = startY + (targetY - startY) * p;
        rot = startRot * (1 - p); // gradually straighten
        // Reveal number once mostly scaled up
        if (p > 0.6) numberVisible = true;
      } else if (elapsed < TOTAL_DURATION) {
        // Phase 2: HOLD — show the number with a gentle floating bob
        const p = (elapsed - MORPH_DURATION) / HOLD_DURATION;
        const ep = easeOutCubic(p);
        scale = 1;
        x = centerX;
        y = targetY + Math.sin(p * Math.PI) * -4; // gentle bob
        rot = Math.sin(p * Math.PI * 1.5) * 1.5; // very subtle sway
        numberVisible = true;
      } else {
        // Animation complete — transition to result
        stickAnimRAF = null;
        stickNumber.classList.add('visible');
        showResult(fortune);
        return;
      }

      // Apply transforms
      fallingStick.style.left = x + 'px';
      fallingStick.style.top = y + 'px';
      fallingStick.style.transform = `translate(-50%, -100%) scale(${scale}) rotate(${rot}deg)`;
      if (numberVisible) stickNumber.classList.add('visible');

      stickAnimRAF = requestAnimationFrame(animateStick);
    }

    stickAnimRAF = requestAnimationFrame(animateStick);
  }, TILT_DURATION);
}

function showResult(fortune) {
  // 1) Fade out the shake state entirely
  shakeState.classList.add('hidden');

  // 2) After fade-out transition, swap to result state
  setTimeout(() => {
    // Kill the falling stick completely
    fallingStick.classList.remove('show');
    fallingStick.style.display = 'none';
    fallingStick.style.left = '';
    fallingStick.style.top = '';
    fallingStick.style.transform = '';
    stickNumber.classList.remove('visible');

    // Populate result
    resultQueNumber.textContent = `Quẻ số ${fortune.id}`;
    resultQueType.textContent = fortune.typeLabel;
    resultQueType.className = `result-que-type ${fortune.type}`;
    resultPoem.innerHTML = fortune.poem.replace(/\n/g, '<br>');
    resultMeaning.innerHTML = `<p>${fortune.meaning}</p>`;
    resultAdvice.innerHTML = `<p>${fortune.advice}</p>`;

    // Announce result to screen readers
    const liveRegion = document.getElementById('resultAnnounce');
    if (liveRegion) {
      liveRegion.textContent = `${fortune.typeLabel}. ${fortune.meaning}`;
    }

    // Show result state
    resultState.classList.add('show');

    createSparkles();
    setTimeout(() => launchConfetti(), CONFETTI_LAUNCH_DELAY);

    if (fortune.type === 'thuong-thuong' || fortune.type === 'thuong') {
      setTimeout(() => launchFireworks(), FIREWORK_LAUNCH_DELAY);
    }

    playRevealSound();

    // Scroll to top on mobile for better UX
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, RESULT_TRANSITION_DELAY);
}

function resetGame() {
  // Clean up any ongoing animations
  if (shakeRAF) { cancelAnimationFrame(shakeRAF); shakeRAF = null; }
  if (stickAnimRAF) { cancelAnimationFrame(stickAnimRAF); stickAnimRAF = null; }
  clearInterval(rattleInterval);
  clearInterval(ringInterval);

  // Hide result
  resultState.classList.remove('show');
  stopFireworks();
  // Clear effects container and any sparkle batches
  while (effectsContainer.firstChild) effectsContainer.firstChild.remove();
  document.querySelectorAll('.sparkle-batch').forEach(el => el.remove());

  setTimeout(() => {
    // Fully reset falling stick — keep hidden until next shake
    fallingStick.classList.remove('show');
    fallingStick.style.display = 'none';
    fallingStick.style.left = '';
    fallingStick.style.top = '';
    fallingStick.style.transform = '';
    stickNumber.classList.remove('visible');

    // Reset all stick inline styles from rising animation
    ongQue.querySelectorAll('.stick').forEach(s => {
      s.style.transform = '';
      s.style.visibility = '';
      s.style.zIndex = '';
      s.classList.remove('rising');
    });

    // Restore shake state
    shakeState.classList.remove('hidden');
    ongQueWrapper.classList.remove('shaking');
    ongQueWrapper.style.transform = '';
    ongQueWrapper.style.transition = '';
    btnShake.classList.remove('disabled');
    instruction.textContent = 'Nhấn hoặc lắc điện thoại để xin quẻ';
    instruction.style.animation = '';
    instruction.classList.add('pulsing');
    canShake = true;

    // Re-entrance animation
    ongQueWrapper.style.animation = 'none';
    void ongQueWrapper.offsetHeight;
    ongQueWrapper.style.animation = 'ongQueIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) both';
  }, RESET_TRANSITION_DELAY);
}

// ============================================
// Fireworks (Canvas) — Optimized
// ============================================
const ctx = fireworkCanvas.getContext('2d');
let fireworks = [];
const MAX_PARTICLES = 200;
let particles = new Array(MAX_PARTICLES + 50);
let particleCount = 0;
let fireworkActive = false;
let animFrameId = null;

function resizeCanvas() {
  fireworkCanvas.width = window.innerWidth;
  fireworkCanvas.height = window.innerHeight;
}

class Firework {
  constructor() {
    this.x = fireworkCanvas.width * 0.2 + Math.random() * fireworkCanvas.width * 0.6;
    this.y = fireworkCanvas.height;
    this.targetY = 80 + Math.random() * (fireworkCanvas.height * 0.35);
    this.speed = 5 + Math.random() * 3;
    this.trail = [];
    this.alive = true;
    this.hue = Math.random() * 60 + 10;
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 6) this.trail.shift();
    this.y -= this.speed;
    this.x += Math.sin(this.y * 0.05) * 0.3;
    if (this.y <= this.targetY) {
      this.alive = false;
      this.explode();
    }
  }

  explode() {
    const count = 18 + (Math.random() * 12 | 0);
    const room = MAX_PARTICLES - particleCount;
    const toSpawn = Math.min(count, room);
    for (let i = 0; i < toSpawn; i++) {
      const angle = (Math.PI * 2) * (i / count);
      const speed = 1 + Math.random() * 3;
      particles[particleCount++] = {
        x: this.x, y: this.y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1,
        decay: 0.015 + Math.random() * 0.02,
        hue: this.hue + Math.random() * 40 - 20,
        lum: 50 + Math.random() * 30,
        size: 1.5 + Math.random() * 2
      };
    }
    playExplosionSound();
  }

  draw() {
    for (let i = 0; i < this.trail.length; i++) {
      ctx.globalAlpha = (i / this.trail.length) * 0.4;
      ctx.fillStyle = '#ffdc64';
      ctx.fillRect(this.trail[i].x - 1, this.trail[i].y - 1, 2, 2);
    }
    ctx.globalAlpha = 1;
    ctx.fillStyle = `hsl(${this.hue},100%,65%)`;
    ctx.fillRect(this.x - 1.5, this.y - 1.5, 3, 3);
  }
}

function animateFireworks() {
  ctx.globalCompositeOperation = 'destination-out';
  ctx.globalAlpha = 0.18;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
  ctx.globalCompositeOperation = 'lighter';
  ctx.globalAlpha = 1;

  // Fireworks — swap-and-pop
  let fLen = fireworks.length;
  for (let i = fLen - 1; i >= 0; i--) {
    const f = fireworks[i];
    f.update();
    if (f.alive) f.draw();
    else fireworks[i] = fireworks[--fLen];
  }
  fireworks.length = fLen;

  // Particles — swap-and-pop
  for (let i = particleCount - 1; i >= 0; i--) {
    const p = particles[i];
    p.x += p.vx; p.y += p.vy;
    p.vy += 0.03; p.vx *= 0.99;
    p.life -= p.decay;
    if (p.life <= 0) { particles[i] = particles[--particleCount]; continue; }
    const sz = p.size * p.life;
    ctx.globalAlpha = p.life;
    ctx.fillStyle = `hsl(${p.hue},100%,${p.lum}%)`;
    ctx.fillRect(p.x - sz * 0.5, p.y - sz * 0.5, sz, sz);
  }

  ctx.globalAlpha = 1;

  if (fireworks.length > 0 || particleCount > 0 || fireworkActive) {
    animFrameId = requestAnimationFrame(animateFireworks);
  } else {
    ctx.globalCompositeOperation = 'source-over';
    ctx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
    animFrameId = null;
  }
}

function launchFireworks() {
  fireworkActive = true;
  resizeCanvas();
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);

  let count = 0;
  const max = 5;
  function spawn() {
    if (count >= max) { fireworkActive = false; return; }
    fireworks.push(new Firework());
    count++;
    setTimeout(spawn, 350 + Math.random() * 450);
  }
  spawn();
  if (animFrameId) cancelAnimationFrame(animFrameId);
  animateFireworks();
}

function stopFireworks() {
  fireworkActive = false;
  fireworks.length = 0;
  particleCount = 0;
  if (animFrameId) { cancelAnimationFrame(animFrameId); animFrameId = null; }
  ctx.globalCompositeOperation = 'source-over';
  ctx.clearRect(0, 0, fireworkCanvas.width, fireworkCanvas.height);
}

// ============================================
// Audio (Web Audio API)
// ============================================
let audioCtx = null;
function getAudioContext() {
  if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playWoodSound() {
  try {
    const ac = getAudioContext();
    [800, 1200].forEach((freq, i) => {
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = i === 0 ? 'triangle' : 'sine';
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ac.currentTime + 0.15);
      gain.gain.setValueAtTime(i === 0 ? 0.25 : 0.1, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.2);
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(ac.currentTime + i * 0.03); osc.stop(ac.currentTime + 0.25);
    });
  } catch (e) { console.warn('Audio: wood sound failed', e); }
}

function playRevealSound() {
  try {
    const ac = getAudioContext();
    [523, 659, 784, 1047].forEach((freq, i) => {
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      gain.gain.setValueAtTime(0, ac.currentTime + i * 0.12);
      gain.gain.linearRampToValueAtTime(0.15, ac.currentTime + i * 0.12 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + i * 0.12 + 0.5);
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(ac.currentTime + i * 0.12); osc.stop(ac.currentTime + i * 0.12 + 0.5);
    });
  } catch (e) { console.warn('Audio: reveal sound failed', e); }
}

function playExplosionSound() {
  try {
    const ac = getAudioContext();
    const len = ac.sampleRate * 0.12;
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const src = ac.createBufferSource(); src.buffer = buf;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.06, ac.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.12);
    const filt = ac.createBiquadFilter(); filt.type = 'lowpass'; filt.frequency.setValueAtTime(1800, ac.currentTime);
    src.connect(filt); filt.connect(gain); gain.connect(ac.destination); src.start();
  } catch (e) { console.warn('Audio: explosion sound failed', e); }
}

function playBellSound() {
  try {
    const ac = getAudioContext();
    [600, 900, 1500].forEach((freq, i) => {
      const osc = ac.createOscillator(), gain = ac.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ac.currentTime);
      gain.gain.setValueAtTime(i === 0 ? 0.2 : 0.08, ac.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + 0.8);
      osc.connect(gain); gain.connect(ac.destination);
      osc.start(ac.currentTime); osc.stop(ac.currentTime + 0.8);
    });
  } catch (e) { console.warn('Audio: bell sound failed', e); }
}

function playRattleSound() {
  try {
    const ac = getAudioContext();
    const now = ac.currentTime;
    const len = ac.sampleRate * 0.035;
    const buf = ac.createBuffer(1, len, ac.sampleRate);
    const data = buf.getChannelData(0);
    for (let i = 0; i < len; i++) data[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 2);
    const src = ac.createBufferSource(); src.buffer = buf;
    const filt = ac.createBiquadFilter(); filt.type = 'bandpass';
    filt.frequency.value = 1800 + Math.random() * 1500; filt.Q.value = 1.5;
    const gain = ac.createGain();
    gain.gain.setValueAtTime(0.04 + Math.random() * 0.02, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.035);
    src.connect(filt); filt.connect(gain); gain.connect(ac.destination); src.start();
  } catch (e) { console.warn('Audio: rattle sound failed', e); }
}

// ============================================
// Device Shake Detection (Mobile)
// ============================================
let lastAcc = null;

function handleMotion(e) {
  if (!canShake || isShaking) return;

  // 1. Try acceleration (without gravity) - cleaner signal
  if (e.acceleration && e.acceleration.x !== null) {
    const { x, y, z } = e.acceleration;
    const mag = Math.sqrt(x * x + y * y + z * z);
    if (mag > 12) { // Threshold ~1.2g
      startShake();
    }
    return;
  }

  // 2. Fallback: accelerationIncludingGravity (delta check)
  const a = e.accelerationIncludingGravity;
  if (!a) return;

  if (!lastAcc) {
    lastAcc = { x: a.x, y: a.y, z: a.z };
    return;
  }

  const dx = Math.abs(a.x - lastAcc.x);
  const dy = Math.abs(a.y - lastAcc.y);
  const dz = Math.abs(a.z - lastAcc.z);
  lastAcc = { x: a.x, y: a.y, z: a.z };

  if ((dx > 12 || dy > 12 || dz > 12)) {
    startShake();
  }
}

function requestMotionPermission() {
  if (motionPermissionRequested) return;
  motionPermissionRequested = true;
  if (typeof DeviceMotionEvent !== 'undefined' && typeof DeviceMotionEvent.requestPermission === 'function') {
    DeviceMotionEvent.requestPermission().then(r => { if (r === 'granted') window.addEventListener('devicemotion', handleMotion); }).catch(() => { motionPermissionRequested = false; });
  } else if ('DeviceMotionEvent' in window) {
    window.addEventListener('devicemotion', handleMotion);
  }
}

// ============================================
// Events
// ============================================
btnShake.addEventListener('click', () => { requestMotionPermission(); playBellSound(); startShake(); });
ongQue.addEventListener('click', () => { requestMotionPermission(); playBellSound(); startShake(); });
ongQue.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); requestMotionPermission(); playBellSound(); startShake(); } });
btnAgain.addEventListener('click', resetGame);
let resizeTimer = null;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(resizeCanvas, 150);
});

// Share button
const btnShare = $('btnShare');
if (btnShare) {
  btnShare.addEventListener('click', shareFortune);
}

function shareFortune() {
  const num = resultQueNumber.textContent;
  const type = resultQueType.textContent;
  const poem = resultPoem.innerText;
  // Extract text from <p> inside meaning/advice, avoiding ::before pseudo-element content
  const meaningP = resultMeaning.querySelector('p');
  const adviceP = resultAdvice.querySelector('p');
  const meaning = meaningP ? meaningP.textContent.trim() : '';
  const advice = adviceP ? adviceP.textContent.trim() : '';
  const text = `🐴 Lắc Quẻ Đầu Năm — Tết Bính Ngọ 2026\n\n${num} — ${type}\n\n${poem}\n\n📜 ${meaning}\n\n🐴 ${advice}\n\n🎆 Chúc Mừng Năm Mới!`;

  if (navigator.share) {
    navigator.share({ title: 'Lắc Quẻ Đầu Năm 2026', text }).catch(() => { });
  } else {
    navigator.clipboard.writeText(text).then(() => {
      btnShare.textContent = '✅ Đã sao chép!';
      setTimeout(() => { btnShare.innerHTML = '<span>📤</span> Chia Sẻ Quẻ'; }, SHARE_FEEDBACK_DURATION);
    }).catch(() => { });
  }
}

setTimeout(() => instruction.classList.add('pulsing'), INSTRUCTION_PULSE_DELAY);

// ============================================
// Init
// ============================================
createPetals();
createGoldenDust();
resizeCanvas();
