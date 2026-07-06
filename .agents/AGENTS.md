# Karpathy Guidelines — Dự án Đồ Đồng Nam Định

Behavioral guidelines để giảm thiểu các lỗi phổ biến khi AI coding, dựa trên
[nhận xét của Andrej Karpathy](https://x.com/karpathy/status/2015883857489522876) về các điểm yếu của LLM khi code.

Source: [multica-ai/andrej-karpathy-skills](https://github.com/multica-ai/andrej-karpathy-skills)

**Lưu ý:** Những guidelines này ưu tiên sự thận trọng hơn tốc độ. Với các task đơn giản, hãy tự phán xét.

---

## 1. Think Before Coding — Suy nghĩ trước khi code

**Đừng tự giả định. Đừng giấu sự lúng túng. Làm rõ đánh đổi.**

Trước khi implement:
- Nêu rõ các giả định. Nếu không chắc, hỏi.
- Nếu có nhiều cách hiểu, trình bày chúng — đừng tự chọn âm thầm.
- Nếu có cách đơn giản hơn, hãy nói ra. Phản bác khi cần thiết.
- Nếu thấy mơ hồ, dừng lại. Nêu tên điều chưa rõ. Hỏi.

## 2. Simplicity First — Đơn giản hóa mọi thứ

**Code tối thiểu để giải quyết vấn đề. Không có gì suy đoán thêm.**

- Không thêm tính năng ngoài yêu cầu.
- Không dùng abstraction cho code một lần.
- Không thêm "tính linh hoạt" hay "khả năng cấu hình" không được yêu cầu.
- Không xử lý lỗi cho các tình huống không thể xảy ra.
- Nếu bạn viết 200 dòng mà có thể là 50, hãy viết lại.

Tự hỏi: "Một senior engineer có nói đây là quá phức tạp không?" Nếu có, đơn giản hóa.

## 3. Surgical Changes — Thay đổi có phẫu thuật

**Chỉ chạm vào những gì cần thiết. Dọn dẹp đống lộn xộn của chính mình.**

Khi chỉnh sửa code hiện có:
- Đừng "cải thiện" code, comment, hoặc định dạng xung quanh.
- Đừng refactor thứ không bị hỏng.
- Khớp với style hiện có, dù bạn có thể làm khác.
- Nếu thấy dead code không liên quan, đề cập — đừng xóa.

Khi thay đổi của bạn tạo ra code mồ côi:
- Xóa các import/variable/function mà THAY ĐỔI CỦA BẠN khiến thành unused.
- Đừng xóa dead code có trước trừ khi được yêu cầu.

Kiểm tra: Mỗi dòng thay đổi phải trực tiếp liên quan đến yêu cầu của người dùng.

## 4. Goal-Driven Execution — Thực hiện theo mục tiêu

**Xác định tiêu chí thành công. Loop cho đến khi đạt được.**

Với các task nhiều bước, trình bày kế hoạch ngắn gọn:

```
1. [Bước] → kiểm tra: [điều kiện]
2. [Bước] → kiểm tra: [điều kiện]
3. [Bước] → kiểm tra: [điều kiện]
```

Tiêu chí thành công rõ ràng giúp AI có thể loop độc lập. Tiêu chí yếu ("làm cho nó hoạt động") sẽ cần làm rõ liên tục.

---

## Hướng dẫn riêng cho dự án Đồ Đồng Nam Định

### Stack công nghệ
- **Framework**: Next.js 15+ (App Router)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage (bucket: `public-images`)
- **Auth**: Supabase Auth
- **Styling**: Tailwind CSS

### Nguyên tắc thiết kế
- **Design Philosophy**: Hiện đại, tối giản theo phong cách Apple — không copy vuadodong.vn.
- **Màu sắc**: Sử dụng bảng màu curated, tránh màu generic.
- **Animations**: Micro-animations mượt mà để tăng trải nghiệm.
- **Typography**: Google Fonts (Inter hoặc Outfit).

### Quy ước code
- TypeScript strict — không dùng `any`.
- Tất cả timestamps là `string` (ISO format từ Supabase), không phải FirestoreTimestamp.
- File service: thao tác qua `supabase.from('table')`.
- Phân trang theo page number (không dùng cursor/DocumentSnapshot).
- Biến môi trường: `NEXT_PUBLIC_SUPABASE_URL` và `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
