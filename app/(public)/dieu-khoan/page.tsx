/**
 * Terms of Service — Điều khoản sử dụng.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Điều Khoản Sử Dụng',
  description: 'Điều khoản và điều kiện sử dụng dịch vụ của Đồ Đồng Thủ Công Nam Định.',
  canonical: '/dieu-khoan',
});

export default function TermsPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <p className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Thông tin pháp lý
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-black mb-4 tracking-tight">
            Điều Khoản Sử Dụng
          </h1>
          <p className="text-gray-400 text-sm">
            Cập nhật lần cuối: Tháng 7, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-gray-600 prose-li:font-light">
          <p>
            Bằng cách truy cập và sử dụng website <strong>dodongnamdinh.vn</strong>, bạn đồng ý với các điều khoản và điều kiện dưới đây. Vui lòng đọc kỹ trước khi sử dụng dịch vụ.
          </p>

          <h2>1. Chấp nhận điều khoản</h2>
          <p>
            Việc sử dụng website này đồng nghĩa bạn chấp nhận toàn bộ các điều khoản được nêu trong tài liệu này. Nếu không đồng ý, vui lòng không sử dụng website.
          </p>

          <h2>2. Sản phẩm và dịch vụ</h2>
          <ul>
            <li>Tất cả sản phẩm được mô tả trung thực theo thực tế. Ảnh sản phẩm có thể có sự khác biệt nhỏ về màu sắc do điều kiện ánh sáng chụp ảnh.</li>
            <li>Chúng tôi có quyền thay đổi giá sản phẩm mà không cần thông báo trước, trừ đơn hàng đã xác nhận.</li>
            <li>Đối với sản phẩm đặt theo yêu cầu, thiết kế được thỏa thuận trước khi sản xuất và không thể thay đổi sau khi đã bắt đầu chế tác.</li>
          </ul>

          <h2>3. Đặt hàng và thanh toán</h2>
          <ul>
            <li>Đơn hàng chỉ được xác nhận sau khi có thỏa thuận rõ ràng (qua Zalo/Messenger/điện thoại).</li>
            <li>Đối với đơn đặt theo yêu cầu, đặt cọc tối thiểu 50% để bắt đầu sản xuất.</li>
            <li>Phương thức thanh toán: chuyển khoản ngân hàng, MoMo, ZaloPay, hoặc tiền mặt (khi nhận hàng).</li>
            <li>Hóa đơn/biên lai được cung cấp theo yêu cầu.</li>
          </ul>

          <h2>4. Giao hàng</h2>
          <ul>
            <li>Thời gian giao hàng ước tính, không phải cam kết tuyệt đối (có thể bị ảnh hưởng bởi đơn vị vận chuyển).</li>
            <li>Rủi ro mất mát/hư hỏng trong quá trình vận chuyển thuộc trách nhiệm của đơn vị vận chuyển. Chúng tôi hỗ trợ xử lý khiếu nại với đơn vị vận chuyển.</li>
            <li>Khách hàng có trách nhiệm cung cấp địa chỉ giao hàng chính xác. Chúng tôi không chịu trách nhiệm nếu giao hàng thất bại do địa chỉ sai.</li>
          </ul>

          <h2>5. Đổi trả và hoàn tiền</h2>
          <ul>
            <li><strong>Hoàn tiền 100%</strong> nếu sản phẩm hư hỏng trong vận chuyển (kèm bằng chứng video khi mở hộp).</li>
            <li><strong>Bảo hành chất liệu trọn đời:</strong> hoàn tiền nếu chứng minh đồng không nguyên chất.</li>
            <li><strong>Sản phẩm có sẵn:</strong> đổi trả trong 7 ngày nếu nguyên vẹn, chưa sử dụng.</li>
            <li><strong>Sản phẩm đặt theo yêu cầu:</strong> không áp dụng đổi trả nếu sản phẩm đúng như thiết kế đã thỏa thuận.</li>
          </ul>

          <h2>6. Quyền sở hữu trí tuệ</h2>
          <p>
            Toàn bộ nội dung trên website (hình ảnh, văn bản, thiết kế) thuộc quyền sở hữu của Đồ Đồng Thủ Công Nam Định. Không được sao chép, sử dụng cho mục đích thương mại mà không có sự đồng ý bằng văn bản.
          </p>

          <h2>7. Giới hạn trách nhiệm</h2>
          <p>
            Chúng tôi không chịu trách nhiệm về:
          </p>
          <ul>
            <li>Thiệt hại gián tiếp phát sinh từ việc sử dụng hoặc không thể sử dụng sản phẩm.</li>
            <li>Sự cố kỹ thuật của website nằm ngoài tầm kiểm soát.</li>
            <li>Thông tin không chính xác do người dùng cung cấp.</li>
          </ul>

          <h2>8. Luật áp dụng</h2>
          <p>
            Các điều khoản này được điều chỉnh bởi pháp luật Việt Nam. Mọi tranh chấp được giải quyết theo pháp luật Việt Nam hiện hành.
          </p>

          <h2>9. Liên hệ</h2>
          <p>
            Mọi thắc mắc về điều khoản sử dụng:
          </p>
          <ul>
            <li><strong>Zalo/Điện thoại:</strong> 0398 731 293</li>
            <li><strong>Địa chỉ:</strong> Thôn Vạn Điểm 1, Huyện Ý Yên, Tỉnh Nam Định</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
