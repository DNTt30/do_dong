/**
 * Privacy Policy — Chính sách bảo mật.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Chính Sách Bảo Mật',
  description: 'Chính sách bảo mật thông tin khách hàng của Đồ Đồng Thủ Công Nam Định.',
  canonical: '/chinh-sach-bao-mat',
});

export default function PrivacyPolicyPage() {
  return (
    <div className="bg-white py-16 md:py-24">
      <div className="container max-w-3xl mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="mb-12 pb-8 border-b border-gray-100">
          <p className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-3">
            Thông tin pháp lý
          </p>
          <h1 className="font-serif text-4xl md:text-5xl text-black mb-4 tracking-tight">
            Chính Sách Bảo Mật
          </h1>
          <p className="text-gray-400 text-sm">
            Cập nhật lần cuối: Tháng 7, 2025
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none prose-headings:font-serif prose-headings:text-black prose-p:text-gray-600 prose-p:font-light prose-p:leading-relaxed prose-li:text-gray-600 prose-li:font-light">
          <h2>1. Thông tin chúng tôi thu thập</h2>
          <p>
            Khi bạn sử dụng website Đồ Đồng Thủ Công Nam Định (<strong>dodongnamdinh.vn</strong>), chúng tôi có thể thu thập các thông tin sau:
          </p>
          <ul>
            <li>Thông tin liên hệ: họ tên, số điện thoại, địa chỉ email, địa chỉ giao hàng.</li>
            <li>Thông tin đơn hàng: sản phẩm đặt mua, yêu cầu đặc biệt, lịch sử giao dịch.</li>
            <li>Thông tin truy cập: địa chỉ IP, loại trình duyệt, thời gian truy cập (qua Google Analytics).</li>
            <li>Nội dung liên lạc: tin nhắn gửi qua form liên hệ, Zalo, Messenger.</li>
          </ul>

          <h2>2. Mục đích sử dụng thông tin</h2>
          <p>Thông tin của bạn được sử dụng để:</p>
          <ul>
            <li>Xử lý và hoàn thành đơn hàng.</li>
            <li>Liên lạc về trạng thái đơn hàng và giao hàng.</li>
            <li>Tư vấn sản phẩm theo yêu cầu của bạn.</li>
            <li>Cải thiện chất lượng dịch vụ và website.</li>
            <li>Gửi thông tin khuyến mãi (chỉ khi bạn đồng ý).</li>
          </ul>

          <h2>3. Bảo mật thông tin</h2>
          <p>
            Chúng tôi cam kết bảo vệ thông tin cá nhân của bạn. Các biện pháp bảo mật bao gồm:
          </p>
          <ul>
            <li>Website sử dụng giao thức HTTPS (SSL/TLS).</li>
            <li>Dữ liệu được lưu trữ trên máy chủ bảo mật với quyền truy cập hạn chế.</li>
            <li>Nhân viên chỉ truy cập dữ liệu khi cần thiết để xử lý đơn hàng.</li>
            <li>Không chia sẻ thông tin với bên thứ ba trừ đơn vị vận chuyển (chỉ tên và địa chỉ giao hàng).</li>
          </ul>

          <h2>4. Chia sẻ thông tin với bên thứ ba</h2>
          <p>
            Chúng tôi <strong>KHÔNG bán</strong> thông tin của bạn cho bên thứ ba. Thông tin chỉ được chia sẻ trong các trường hợp:
          </p>
          <ul>
            <li>Đơn vị vận chuyển: để giao hàng (chỉ tên và địa chỉ).</li>
            <li>Cơ quan có thẩm quyền: khi có yêu cầu pháp lý.</li>
            <li>Dịch vụ phân tích (Google Analytics): dữ liệu ẩn danh để cải thiện website.</li>
          </ul>

          <h2>5. Cookie</h2>
          <p>
            Website sử dụng cookie để cải thiện trải nghiệm người dùng. Bạn có thể tắt cookie trong cài đặt trình duyệt, tuy nhiên một số tính năng website có thể bị ảnh hưởng.
          </p>

          <h2>6. Quyền của bạn</h2>
          <p>Bạn có quyền:</p>
          <ul>
            <li>Yêu cầu xem, chỉnh sửa hoặc xóa thông tin cá nhân.</li>
            <li>Từ chối nhận email/SMS marketing bất kỳ lúc nào.</li>
            <li>Yêu cầu hạn chế xử lý dữ liệu.</li>
          </ul>
          <p>
            Để thực hiện các quyền trên, liên hệ: <strong>Zalo 0398 731 293</strong> hoặc nhắn tin trực tiếp.
          </p>

          <h2>7. Thay đổi chính sách</h2>
          <p>
            Chúng tôi có thể cập nhật chính sách này theo thời gian. Thay đổi quan trọng sẽ được thông báo trên website. Việc tiếp tục sử dụng dịch vụ sau khi thay đổi đồng nghĩa với việc bạn chấp nhận chính sách mới.
          </p>

          <h2>8. Liên hệ</h2>
          <p>
            Nếu có thắc mắc về chính sách bảo mật, vui lòng liên hệ:
          </p>
          <ul>
            <li><strong>Zalo/Điện thoại:</strong> 0398 731 293</li>
            <li><strong>Địa chỉ:</strong> Thôn Vạn Điểm 1, Huyện Ý Yên, Tỉnh Nam Định</li>
            <li><strong>Giờ làm việc:</strong> 7:00 – 19:00, tất cả các ngày</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
