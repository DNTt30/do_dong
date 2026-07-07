# Kế hoạch hoàn thiện website Đồ Đồng Nam Định

## 1. Công việc đã hoàn thành (Không cần làm lại)
- ✅ Đã cập nhật constants thông tin liên hệ (Phone, Zalo: 0398731293, Địa chỉ: Thôn Vạn Điểm 1).
- ✅ Đã tạo `OrderForm` và trang Đặt hàng (`/dat-hang`).
- ✅ Đã cải thiện `HeroBanner`, `WhyChooseUs` với giao diện chuyên nghiệp hơn.
- ✅ Đã tạo `FloatingCTA` (nút liên hệ Zalo/Phone góc dưới).
- ✅ Đã sửa `ProductCard` (Nút liên hệ trỏ thẳng sang Zalo).
- ✅ Đã kết nối 9Router để sử dụng AI code miễn phí.

## 2. Công việc đã hoàn thành bởi Cline
1. ✅ **Kiểm tra và chạy thử dự án:**
   - Đã đọc các file (`app/(public)/dat-hang/page.tsx`, `components/order/OrderForm.tsx`, `components/common/FloatingCTA.tsx`).
   - Đã chạy `npm run dev` thành công, không có lỗi giao diện hoặc lỗi import.
2. ✅ **Cập nhật Database Supabase:**
   - Đã thêm trường `source` vào bảng `orders` trong file `database.sql` để đồng bộ với OrderForm.
3. ✅ **Hoàn thiện UI trang Chi tiết sản phẩm:**
   - Đã cập nhật "Quy trình thủ công" thành 4 cards động và đẹp mắt (Thiết kế, Đúc đồng, Chạm khắc, Hoàn thiện).
   - Đã thêm phần "Khách hàng nói gì" với 3 testimonials để tăng độ tin cậy.
4. ✅ **Kiểm tra Navigation:**
   - Đã xác nhận thanh menu Header/Footer có link đến trang `/dat-hang`.
5. ✅ **Cấu hình Sitemap/SEO:**
   - Đã thêm trang `/dat-hang` vào sitemap.ts với priority 0.9.
   - Đã thay thế ContactButtons bằng FloatingCTA trong PublicLayout.

## 3. Công việc tiếp theo (chưa làm)
