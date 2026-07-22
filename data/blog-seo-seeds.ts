/**
 * Blog SEO seed data — 7 bài viết chuẩn SEO về đồ đồng.
 * 
 * CÁCH SỬ DỤNG:
 * 1. Đăng nhập vào admin: /admin/bai-viet/them-moi
 * 2. Copy nội dung từng bài bên dưới vào form
 * 3. Publish từng bài
 * 
 * Hoặc chạy script seed vào Supabase nếu cần.
 */

export interface BlogSeedItem {
  title: string;
  slug: string;
  excerpt: string;
  seoTitle: string;
  seoDescription: string;
  content: string;
  author: string;
  published: boolean;
}

export const BLOG_SEO_SEEDS: BlogSeedItem[] = [
  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 1: Đồng đỏ vs đồng vàng
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Đồng đỏ và đồng vàng khác nhau thế nào? Nên chọn loại nào cho đồ thờ?',
    slug: 'dong-do-va-dong-vang-khac-nhau-the-nao',
    excerpt: 'Nhiều khách hàng thắc mắc đồng đỏ và đồng vàng loại nào tốt hơn? Bài viết này giải thích rõ sự khác biệt về thành phần, màu sắc, độ bền và giá trị của từng loại.',
    seoTitle: 'Đồng Đỏ và Đồng Vàng Khác Nhau Thế Nào? | Đồ Đồng Nam Định',
    seoDescription: 'So sánh đồng đỏ và đồng vàng: thành phần hóa học, màu sắc, độ bền, giá cả và ứng dụng. Hướng dẫn chọn đúng loại đồng cho đồ thờ và trang trí.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Đồng đỏ là gì?</h2>
<p>Đồng đỏ (copper) là đồng nguyên chất, có hàm lượng đồng từ 99% trở lên. Màu sắc đặc trưng là đỏ cam khi mới đúc, sau đó chuyển sang màu nâu sẫm rồi xanh xám (patina) khi tiếp xúc với không khí theo thời gian.</p>

<h3>Đặc điểm của đồng đỏ:</h3>
<ul>
<li><strong>Màu sắc:</strong> Đỏ cam tươi, sau vài tháng chuyển dần sang nâu đồng truyền thống</li>
<li><strong>Độ bền:</strong> Rất cao, không gỉ, chống ăn mòn tốt</li>
<li><strong>Trọng lượng:</strong> Nặng, mật độ cao (~8.9 g/cm³)</li>
<li><strong>Âm thanh:</strong> Tiếng kêu trầm, trong và vang xa</li>
<li><strong>Giá trị:</strong> Cao hơn đồng vàng do độ tinh khiết</li>
</ul>

<h2>Đồng vàng là gì?</h2>
<p>Đồng vàng (brass) thực chất là hợp kim đồng - kẽm (Cu-Zn), thường có tỉ lệ đồng từ 60-90%, phần còn lại là kẽm. Màu sắc vàng tươi bắt mắt hơn đồng đỏ.</p>

<h3>Đặc điểm của đồng vàng:</h3>
<ul>
<li><strong>Màu sắc:</strong> Vàng sáng, bóng đẹp, ít bị xỉn màu hơn</li>
<li><strong>Độ bền:</strong> Tốt nhưng kém hơn đồng đỏ</li>
<li><strong>Dễ gia công:</strong> Mềm hơn, dễ tạo hoa văn tinh tế</li>
<li><strong>Giá thành:</strong> Thường rẻ hơn đồng đỏ 20-40%</li>
</ul>

<h2>Nên chọn loại nào cho đồ thờ?</h2>
<p>Cả hai loại đều phù hợp cho đồ thờ. Sự lựa chọn phụ thuộc vào:</p>

<h3>Chọn đồng đỏ khi:</h3>
<ul>
<li>Ưu tiên chất liệu chuẩn và giá trị lâu dài</li>
<li>Muốn có màu patina tự nhiên theo năm tháng</li>
<li>Ngân sách linh hoạt hơn</li>
<li>Mua cho đền, chùa, nhà thờ dòng họ</li>
</ul>

<h3>Chọn đồng vàng khi:</h3>
<ul>
<li>Muốn màu sắc sáng bóng, giữ được lâu</li>
<li>Cần hoa văn tinh tế, chạm khắc phức tạp</li>
<li>Ngân sách tiết kiệm hơn</li>
<li>Dùng cho bàn thờ gia đình</li>
</ul>

<h2>Cam kết chất liệu của chúng tôi</h2>
<p>Tại <strong>Đồ Đồng Thủ Công Nam Định</strong>, chúng tôi chỉ sử dụng đồng nguyên chất, không pha tạp. Mỗi sản phẩm đều có thể kiểm tra chất liệu bằng acid test hoặc máy XRF tại cơ sở. <strong>Cam kết hoàn tiền 100%</strong> nếu phát hiện sai chất liệu.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 2: Tam Sự vs Ngũ Sự
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Nên chọn Bộ Tam Sự hay Bộ Ngũ Sự? So sánh chi tiết cho người mua lần đầu',
    slug: 'nen-chon-bo-tam-su-hay-ngu-su',
    excerpt: 'Bộ Tam Sự và Bộ Ngũ Sự đều là đồ thờ đồng quan trọng nhưng nhiều người chưa biết sự khác biệt. Bài viết giải thích ý nghĩa, thành phần và hướng dẫn chọn phù hợp với bàn thờ.',
    seoTitle: 'Bộ Tam Sự vs Bộ Ngũ Sự - Nên Chọn Loại Nào? | Đồ Đồng Nam Định',
    seoDescription: 'So sánh bộ tam sự và bộ ngũ sự đồng thờ: thành phần, ý nghĩa phong thủy, kích thước phù hợp và giá cả. Hướng dẫn chọn mua cho người mới.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Bộ Tam Sự là gì?</h2>
<p><strong>Bộ Tam Sự</strong> (hay Bộ 3 món) là bộ đồ thờ đồng cơ bản, bao gồm <strong>3 vật phẩm</strong>:</p>
<ul>
<li>1 <strong>Lư hương</strong> (đỉnh hương) — đặt giữa</li>
<li>2 <strong>Chân đèn</strong> (lư đèn) — đặt hai bên</li>
</ul>
<p>Đây là bộ đồ thờ phổ biến nhất, phù hợp với bàn thờ gia tiên có kích thước vừa và nhỏ.</p>

<h2>Bộ Ngũ Sự là gì?</h2>
<p><strong>Bộ Ngũ Sự</strong> (hay Bộ 5 món) là bộ đồ thờ hoàn chỉnh hơn, gồm <strong>5 vật phẩm</strong>:</p>
<ul>
<li>1 <strong>Lư hương</strong> — đặt giữa</li>
<li>2 <strong>Chân đèn</strong> — đặt bên trong</li>
<li>2 <strong>Hạc đồng</strong> (đứng trên rùa) — đặt ngoài cùng</li>
</ul>
<p>Bộ Ngũ Sự trang trọng và đầy đủ hơn, phù hợp với bàn thờ lớn, đền thờ, nhà thờ dòng họ.</p>

<h2>Ý nghĩa phong thủy</h2>
<p>Số <strong>3 (Tam)</strong> trong bộ Tam Sự tượng trưng cho Thiên - Địa - Nhân, mang ý nghĩa hài hòa, cân bằng.</p>
<p>Số <strong>5 (Ngũ)</strong> trong bộ Ngũ Sự tượng trưng cho Ngũ Hành (Kim - Mộc - Thủy - Hỏa - Thổ), mang ý nghĩa đầy đủ, trọn vẹn và may mắn.</p>

<h2>Bảng so sánh</h2>
<table>
<thead><tr><th>Tiêu chí</th><th>Bộ Tam Sự</th><th>Bộ Ngũ Sự</th></tr></thead>
<tbody>
<tr><td>Số món</td><td>3</td><td>5</td></tr>
<tr><td>Phù hợp</td><td>Bàn thờ nhỏ-vừa</td><td>Bàn thờ lớn, đền chùa</td></tr>
<tr><td>Chi phí</td><td>Tiết kiệm hơn</td><td>Đầy đủ hơn</td></tr>
<tr><td>Độ trang trọng</td><td>Chuẩn mực</td><td>Trang trọng cao</td></tr>
</tbody>
</table>

<h2>Hướng dẫn chọn theo kích thước bàn thờ</h2>
<ul>
<li><strong>Bàn thờ rộng dưới 60cm:</strong> Bộ Tam Sự nhỏ (đỉnh cao 20-25cm)</li>
<li><strong>Bàn thờ rộng 60-100cm:</strong> Bộ Tam Sự vừa (đỉnh cao 25-35cm)</li>
<li><strong>Bàn thờ rộng 100cm+:</strong> Bộ Ngũ Sự (đỉnh cao 35-50cm)</li>
<li><strong>Đền thờ, nhà thờ họ:</strong> Bộ Ngũ Sự cỡ lớn (đỉnh cao 50-80cm)</li>
</ul>

<p>Nếu chưa chắc chắn, hãy <strong>liên hệ trực tiếp</strong> với chúng tôi — chuyên gia sẽ tư vấn miễn phí theo kích thước bàn thờ thực tế của bạn.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 3: Kích thước đỉnh đồng
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Cách chọn kích thước đỉnh đồng phù hợp với bàn thờ gia tiên',
    slug: 'cach-chon-kich-thuoc-dinh-dong-phu-hop-ban-tho',
    excerpt: 'Sai kích thước đỉnh đồng khiến bàn thờ mất cân đối, kém trang nghiêm. Hướng dẫn chi tiết cách đo và chọn kích thước đỉnh đồng đúng theo kích thước bàn thờ.',
    seoTitle: 'Cách Chọn Kích Thước Đỉnh Đồng Phù Hợp Với Bàn Thờ | Đồ Đồng Nam Định',
    seoDescription: 'Hướng dẫn chi tiết chọn kích thước đỉnh đồng lư hương phù hợp với bàn thờ: công thức tính, bảng tra kích thước theo chiều rộng bàn thờ, lưu ý quan trọng.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Tại sao kích thước đỉnh đồng quan trọng?</h2>
<p>Một đỉnh đồng quá lớn sẽ chiếm hết không gian bàn thờ, gây cảm giác nặng nề. Ngược lại, đỉnh quá nhỏ trông mất cân đối, không trang nghiêm. Đúng kích thước là chìa khóa để bàn thờ đẹp và hài hòa.</p>

<h2>Nguyên tắc cơ bản</h2>
<p>Theo kinh nghiệm dân gian và phong thủy truyền thống:</p>
<ul>
<li>Chiều cao đỉnh đồng nên bằng <strong>1/3 đến 2/5 chiều rộng bàn thờ</strong></li>
<li>Đường kính miệng đỉnh không vượt quá <strong>1/4 chiều rộng bàn thờ</strong></li>
</ul>

<h2>Bảng kích thước tham khảo</h2>
<table>
<thead>
<tr>
<th>Chiều rộng bàn thờ</th>
<th>Chiều cao đỉnh phù hợp</th>
<th>Loại bộ đề xuất</th>
</tr>
</thead>
<tbody>
<tr><td>40 – 55 cm</td><td>15 – 20 cm</td><td>Tam Sự mini</td></tr>
<tr><td>55 – 80 cm</td><td>20 – 28 cm</td><td>Tam Sự vừa</td></tr>
<tr><td>80 – 110 cm</td><td>28 – 38 cm</td><td>Tam Sự lớn / Ngũ Sự nhỏ</td></tr>
<tr><td>110 – 150 cm</td><td>38 – 50 cm</td><td>Ngũ Sự vừa</td></tr>
<tr><td>150 cm+</td><td>50 – 80 cm</td><td>Ngũ Sự lớn / Đền chùa</td></tr>
</tbody>
</table>

<h2>Cách đo kích thước bàn thờ</h2>
<ol>
<li>Đo chiều rộng mặt bàn thờ (không tính diềm)</li>
<li>Đo chiều sâu (từ trước ra sau)</li>
<li>Đo chiều cao trần nhà hoặc bảng thờ phía trên</li>
</ol>
<p>Sau khi có số đo, liên hệ cho chúng tôi — chúng tôi sẽ tư vấn bộ phù hợp nhất, kể cả đặt theo yêu cầu kích thước riêng.</p>

<h2>Lưu ý khi chọn kích thước</h2>
<ul>
<li>Bàn thờ trong nhà thường cần đỉnh nhỏ hơn bàn thờ ngoài trời</li>
<li>Nếu bàn thờ có nóc (hương án), cộng thêm 15-20cm chiều cao bộ đỉnh</li>
<li>Đối với chùa, đền: nên đặt hàng theo yêu cầu để đúng tỉ lệ kiến trúc</li>
</ul>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 4: Bộ Tam Sự gồm những gì
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Bộ Tam Sự Đồng Gồm Những Gì? Ý Nghĩa Từng Vật Phẩm',
    slug: 'bo-tam-su-dong-gom-nhung-gi',
    excerpt: 'Bộ Tam Sự là bộ đồ thờ cơ bản nhất nhưng không phải ai cũng hiểu rõ từng vật phẩm có ý nghĩa gì. Giải thích chi tiết từng món trong bộ Tam Sự đồng truyền thống.',
    seoTitle: 'Bộ Tam Sự Gồm Những Gì? Ý Nghĩa Từng Vật Phẩm | Đồ Đồng Nam Định',
    seoDescription: 'Tìm hiểu bộ tam sự đồng gồm những gì, ý nghĩa phong thủy, cách bày trí đúng trên bàn thờ gia tiên và hướng dẫn lựa chọn chất liệu phù hợp.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Bộ Tam Sự đồng gồm 3 món</h2>
<p>Trong truyền thống thờ cúng của người Việt, <strong>bộ Tam Sự</strong> là bộ đồ thờ không thể thiếu trên bàn thờ gia tiên. Ba vật phẩm được xếp theo thứ tự cân xứng từ trái sang phải:</p>

<h3>1. Lư hương (Đỉnh hương) — Vật phẩm trung tâm</h3>
<p>Đặt ở vị trí trung tâm bàn thờ. Lư hương là vật phẩm dùng để cắm hương (nhang). Khói hương tượng trưng cho sự kết nối giữa cõi dương và cõi âm, giúp truyền tải lời cầu nguyện của con cháu đến tổ tiên.</p>
<p><strong>Ý nghĩa:</strong> Trục trung tâm, kết nối thiên địa, truyền đạt lời cầu nguyện.</p>

<h3>2. Hai chân đèn (Lư đèn) — Đặt hai bên</h3>
<p>Một cặp chân đèn đặt đối xứng hai bên lư hương. Chân đèn dùng để cắm nến hoặc để thắp đèn dầu trong các nghi lễ. Ánh sáng tượng trưng cho sự thanh khiết, soi đường và xua đuổi tà khí.</p>
<p><strong>Ý nghĩa:</strong> Ánh sáng tâm linh, sự dẫn dắt, xua đuổi điều xấu.</p>

<h2>Cách bày trí Bộ Tam Sự đúng cách</h2>
<ol>
<li>Lư hương đặt chính giữa bàn thờ</li>
<li>Hai chân đèn đặt đối xứng, cách đều hai bên lư hương</li>
<li>Khoảng cách từ lư hương đến mỗi chân đèn nên bằng nhau</li>
<li>Tất cả các vật phẩm phải thẳng hàng theo trục trước-sau</li>
</ol>

<h2>Cách chăm sóc Bộ Tam Sự</h2>
<ul>
<li>Lau bằng khăn mềm khô hàng tuần</li>
<li>Tránh dùng chất tẩy mạnh, axít</li>
<li>Đánh bóng bằng kem đánh bóng đồng chuyên dụng 3-6 tháng/lần</li>
<li>Tro hương cần đổ đi khi đầy, tránh để lâu gây ẩm</li>
</ul>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 5: Đồ đồng có bị xuống màu không
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Đồ Đồng Có Bị Xuống Màu Không? Sự Thật Về Patina Đồng',
    slug: 'do-dong-co-bi-xuong-mau-khong',
    excerpt: 'Nhiều người lo lắng đồ đồng mới mua sẽ bị xỉn màu, đổi màu theo thời gian. Giải thích khoa học về hiện tượng patina đồng và cách kiểm soát màu sắc theo ý muốn.',
    seoTitle: 'Đồ Đồng Có Bị Xuống Màu Không? Patina Đồng Là Gì? | Đồ Đồng Nam Định',
    seoDescription: 'Giải thích tại sao đồ đồng đổi màu theo thời gian, hiện tượng patina đồng có phải hỏng không, và cách giữ màu đồng hoặc để patina tự nhiên.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Đồ đồng có bị xuống màu không?</h2>
<p><strong>Có — nhưng đây là điều bình thường và không ảnh hưởng đến chất lượng.</strong> Quá trình đổi màu của đồng được gọi là <em>patina</em>, là phản ứng hóa học tự nhiên khi đồng tiếp xúc với không khí, độ ẩm và ánh sáng.</p>

<h2>Patina là gì?</h2>
<p>Patina là lớp oxit đồng (CuO) và carbonate đồng (CuCO₃) hình thành trên bề mặt đồng theo thời gian. Quá trình xảy ra theo các giai đoạn:</p>
<ol>
<li><strong>0-3 tháng:</strong> Màu đỏ cam sáng, bóng đẹp</li>
<li><strong>3-12 tháng:</strong> Chuyển sang nâu sẫm, ấm áp</li>
<li><strong>1-5 năm:</strong> Nâu đen, trông cổ điển</li>
<li><strong>10+ năm:</strong> Xanh xám (verdigris) — màu đặc trưng của cổ vật đồng</li>
</ol>

<h2>Patina có phải là hỏng không?</h2>
<p><strong>Không.</strong> Patina thực ra <em>bảo vệ</em> kim loại bên trong khỏi bị ăn mòn. Nhiều nhà sưu tầm và nghệ nhân xem patina tự nhiên là vẻ đẹp quý giá của đồ đồng cổ.</p>

<h2>Cách giữ màu đồng sáng bóng như ban đầu</h2>
<ol>
<li>Lau bụi thường xuyên bằng khăn mềm khô</li>
<li>Đánh bóng bằng kem đánh đồng (Brasso, Autosol) mỗi 3 tháng</li>
<li>Phủ một lớp lacquer bảo vệ mỏng sau khi đánh bóng</li>
<li>Tránh để đồ đồng trong môi trường ẩm ướt liên tục</li>
</ol>

<h2>Đồng giả hay hợp kim kém chất lượng có khác không?</h2>
<p>Đồng giả (thường là hợp kim nhôm hoặc kẽm mạ đồng) sẽ bong tróc, lộ màu kim loại bên trong. Đồng thật dù đổi màu vẫn giữ nguyên kết cấu bề mặt, không bong, không nứt.</p>

<blockquote>
<p><strong>Cam kết từ chúng tôi:</strong> Tất cả sản phẩm được làm từ đồng nguyên chất. Nếu phát hiện sản phẩm không phải đồng thật, hoàn tiền 100% không điều kiện.</p>
</blockquote>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 6: Cách vệ sinh đồ đồng
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Cách Vệ Sinh Đồ Đồng Đúng Cách — Giữ Sáng Bóng Hàng Chục Năm',
    slug: 'cach-ve-sinh-do-dong-dung-cach',
    excerpt: 'Hướng dẫn chi tiết cách vệ sinh, đánh bóng và bảo quản đồ đồng tại nhà. Bí quyết từ nghệ nhân đúc đồng 20 năm kinh nghiệm để đồ thờ luôn sáng đẹp như mới.',
    seoTitle: 'Cách Vệ Sinh Đồ Đồng Đúng Cách - Giữ Sáng Bóng Lâu | Đồ Đồng Nam Định',
    seoDescription: 'Hướng dẫn vệ sinh đồ đồng tại nhà: các phương pháp tự nhiên (chanh, muối, giấm), kem đánh đồng chuyên dụng, và cách bảo quản đồ thờ đồng bền đẹp.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Vì sao cần vệ sinh đồ đồng định kỳ?</h2>
<p>Đồ đồng tiếp xúc với khói hương, bụi bẩn, độ ẩm và dầu từ tay người sẽ dần mất đi vẻ sáng bóng. Vệ sinh đúng cách giúp giữ vẻ đẹp và kéo dài tuổi thọ của đồ thờ.</p>

<h2>Phương pháp 1: Vệ sinh hàng ngày (khô)</h2>
<p>Thích hợp cho: bảo dưỡng thường xuyên, đồ mới chưa bị ố.</p>
<ol>
<li>Dùng khăn mềm (microfiber) sạch</li>
<li>Lau nhẹ nhàng theo chiều dọc</li>
<li>Không chà mạnh, tránh xước bề mặt</li>
<li>Tần suất: 1-2 lần/tuần</li>
</ol>

<h2>Phương pháp 2: Vệ sinh bằng chanh + muối (tự nhiên)</h2>
<p>Thích hợp cho: đồng bị ố nhẹ, không có kem đánh đồng.</p>
<ol>
<li>Cắt chanh, rắc ít muối lên mặt cắt</li>
<li>Chà nhẹ lên vùng bị ố theo vòng tròn nhỏ</li>
<li>Để 2-3 phút rồi rửa sạch bằng nước ấm</li>
<li>Lau khô ngay bằng khăn mềm</li>
<li>Kết quả: làm sáng nhẹ, phù hợp ố nhẹ</li>
</ol>

<h2>Phương pháp 3: Kem đánh đồng chuyên dụng (tốt nhất)</h2>
<p>Thích hợp cho: bảo dưỡng sâu 3-6 tháng/lần.</p>
<ol>
<li>Sản phẩm dùng: Brasso, Autosol, hoặc kem đánh đồng nội địa</li>
<li>Thoa kem lên khăn mềm (không thoa trực tiếp)</li>
<li>Chà theo chiều dọc, đều tay, không chà vòng tròn</li>
<li>Để 3-5 phút rồi lau sạch bằng khăn khô khác</li>
<li>Đánh bóng lại bằng vải mềm sạch cho đến khi sáng</li>
</ol>

<h2>Những điều cần tránh khi vệ sinh đồng</h2>
<ul>
<li>❌ Không dùng giấy nhám, bàn chải sắt</li>
<li>❌ Không dùng thuốc tẩy, javel, axit mạnh</li>
<li>❌ Không để nước đọng trên bề mặt đồng</li>
<li>❌ Không rửa bằng máy rửa bát</li>
<li>❌ Không để tiếp xúc với hóa chất gia dụng</li>
</ul>

<h2>Bảo quản đồ đồng sau khi vệ sinh</h2>
<p>Sau khi đánh bóng, phủ một lớp <strong>dầu khoáng (mineral oil)</strong> hoặc <strong>sáp ong</strong> mỏng để tạo lớp bảo vệ, ngăn oxy hóa trở lại. Đây là bí quyết của các nghệ nhân đồng lành nghề.</p>
`,
  },

  // ─────────────────────────────────────────────────────────────────────────
  // BÀI 7: Ý nghĩa hạc đồng
  // ─────────────────────────────────────────────────────────────────────────
  {
    title: 'Ý Nghĩa Của Hạc Đồng Trên Bàn Thờ — Tại Sao Không Thể Thiếu?',
    slug: 'y-nghia-hac-dong-tren-ban-tho',
    excerpt: 'Hạc đồng là biểu tượng tâm linh quan trọng trên bàn thờ người Việt. Tìm hiểu nguồn gốc, ý nghĩa phong thủy và cách chọn hạc đồng phù hợp với không gian thờ tự.',
    seoTitle: 'Ý Nghĩa Hạc Đồng Trên Bàn Thờ - Tại Sao Quan Trọng? | Đồ Đồng Nam Định',
    seoDescription: 'Hạc đồng trên bàn thờ có ý nghĩa gì? Nguồn gốc tín ngưỡng, biểu tượng phong thủy, cách đặt hạc đúng và hướng dẫn chọn mua hạc đồng chất lượng.',
    author: 'Đồ Đồng Thủ Công Nam Định',
    published: true,
    content: `
<h2>Hạc đồng là gì?</h2>
<p><strong>Hạc đồng</strong> là tượng chim hạc đúc bằng đồng, thường đứng trên lưng rùa (hay con cóc) và được đặt thành <em>cặp đôi</em> trên bàn thờ, hai bên lư hương. Đây là vật phẩm đặc trưng trong bộ Ngũ Sự truyền thống của người Việt.</p>

<h2>Nguồn gốc tín ngưỡng</h2>
<p>Chim hạc trong văn hóa phương Đông được coi là:</p>
<ul>
<li><strong>Sứ giả của trời</strong> — thần linh và tiên nhân thường cưỡi hạc</li>
<li><strong>Biểu tượng trường thọ</strong> — hạc sống rất lâu trong truyền thuyết</li>
<li><strong>Sự thanh cao</strong> — hạc bay cao, không vương bụi trần</li>
</ul>

<h2>Ý nghĩa phong thủy của hạc đồng trên bàn thờ</h2>
<p>Cặp hạc đồng đứng trên rùa mang nhiều tầng ý nghĩa:</p>

<h3>Hạc — Cao vút, trường thọ</h3>
<p>Hạc tượng trưng cho khí vận đi lên, sự thịnh vượng và trường thọ. Đặt hạc trên bàn thờ để cầu mong gia đình sống lâu, mạnh khỏe.</p>

<h3>Rùa — Bền vững, hộ mệnh</h3>
<p>Rùa là một trong Tứ Linh (Long, Lân, Quy, Phụng). Rùa tượng trưng cho sự bền vững, che chở và hộ mệnh gia đình khỏi tai ương.</p>

<h3>Hạc đứng trên rùa — Thiên - Địa hợp nhất</h3>
<p>Sự kết hợp hạc (bay cao - Thiên) và rùa (vững chắc - Địa) tượng trưng cho sự hòa hợp Âm Dương, Thiên Địa — ước nguyện gia đình hòa thuận, phát đạt.</p>

<h2>Cách đặt hạc đồng đúng trên bàn thờ</h2>
<ol>
<li>Đặt thành <strong>cặp đôi</strong>, đối xứng nhau</li>
<li>Vị trí: ngoài cùng hai bên (ngoài chân đèn)</li>
<li>Hướng mỏ hạc: <strong>quay vào trong</strong> (hướng về lư hương)</li>
<li>Chiều cao hạc nên cao hơn chân đèn một chút</li>
</ol>

<h2>Cách chọn hạc đồng chất lượng</h2>
<ul>
<li>Kiểm tra trọng lượng — hạc đồng thật nặng hơn hạc giả rõ rệt</li>
<li>Gõ nhẹ — tiếng kêu trong, vang là đồng thật</li>
<li>Xem xét hoa văn — chạm khắc tinh tế, đều đặn là sản phẩm thủ công tốt</li>
<li>Mua từ cơ sở uy tín, có cam kết chất liệu rõ ràng</li>
</ul>

<blockquote>
<p>Tại <strong>Đồ Đồng Thủ Công Nam Định</strong>, mỗi cặp hạc đều được làm thủ công từ đồng nguyên chất, chạm khắc bằng tay bởi nghệ nhân hơn 20 năm kinh nghiệm. Bảo hành chất liệu trọn đời.</p>
</blockquote>
`,
  },
];

export default BLOG_SEO_SEEDS;
