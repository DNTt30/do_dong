/**
 * About Page — Premium brand story với founder + mẹ.
 */

import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { generatePageMetadata } from '@/utils/seo';
import { CONTACT_INFO, BUSINESS_STATS } from '@/constants/contact';
import { ROUTES } from '@/constants/routes';

export const metadata: Metadata = generatePageMetadata({
  title: 'Giới Thiệu — Đồ Đồng Thủ Công Nam Định',
  description:
    'Câu chuyện thương hiệu Đồ Đồng Thủ Công Nam Định — gia đình có truyền thống lâu đời trong nghề chế tác đồng tại làng Vạn Điểm, Ý Yên, Nam Định.',
  canonical: '/gioi-thieu',
});

const STATS = [
  { value: BUSINESS_STATS.yearsExperience, label: 'Năm kinh nghiệm' },
  { value: BUSINESS_STATS.productsSold, label: 'Sản phẩm đã bán' },
  { value: BUSINESS_STATS.happyCustomers, label: 'Khách hàng tin dùng' },
  { value: BUSINESS_STATS.provinces, label: 'Tỉnh thành giao hàng' },
];

const VALUES = [
  { title: 'Chân thực', desc: 'Chúng tôi không bao giờ pha tạp hay gian dối về chất liệu. Đồng nguyên chất 100% — đó là danh dự nghề nghiệp.' },
  { title: 'Tỉ mỉ', desc: 'Mỗi đường chạm khắc đều là tâm huyết. Không sản phẩm nào rời xưởng nếu chưa đạt tiêu chuẩn của người thợ.' },
  { title: 'Gia đình', desc: 'Chúng tôi kinh doanh theo giá trị gia đình: uy tín, lâu dài, và tôn trọng khách hàng như người thân.' },
  { title: 'Sáng tạo', desc: 'Trân trọng di sản nhưng không bảo thủ — chúng tôi kết hợp truyền thống với thẩm mỹ hiện đại.' },
];

export default function AboutPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="relative bg-[#111] text-white py-24 md:py-36 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1518707399486-6d702a84ff00?q=80&w=2070&auto=format&fit=crop"
            alt="Xưởng chế tác đồng"
            fill
            className="object-cover opacity-25"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/80" />
        </div>
        <div className="container max-w-4xl mx-auto px-4 text-center relative z-10">
          <p className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-5">
            Câu chuyện thương hiệu
          </p>
          <h1 className="font-serif text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6 tracking-tight leading-tight">
            Tinh hoa nghề đồng
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-yellow-500">
              từ làng Vạn Điểm
            </span>
          </h1>
          <p className="text-white/70 text-lg md:text-xl font-light max-w-2xl mx-auto leading-relaxed">
            Một gia đình, hai thế hệ, một niềm đam mê — chế tác những tác phẩm đồng
            mang linh hồn nghề thủ công truyền thống Nam Định.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-[#FDFBF7] border-b border-amber-100/50 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {STATS.map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-[#B8860B] mb-2">{stat.value}</div>
                <div className="text-gray-500 text-sm font-light">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main story */}
      <section className="py-16 md:py-24">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-20">
            {/* Text */}
            <div>
              <h2 className="font-serif text-3xl md:text-4xl text-black mb-6 tracking-tight">
                Nơi công nghệ gặp gỡ truyền thống
              </h2>
              <div className="space-y-5 text-gray-600 font-light leading-relaxed">
                <p>
                  <strong className="font-semibold text-black">Đồ Đồng Thủ Công Nam Định</strong> được thành lập tại Thôn Vạn Điểm 1, Huyện Ý Yên — một trong những làng nghề đúc đồng lâu đời nhất Việt Nam. Chúng tôi là mô hình kinh doanh gia đình, nơi mỗi thành viên đóng một vai trò riêng, cùng nhau tạo nên giá trị trọn vẹn.
                </p>
                <p>
                  Thương hiệu này là câu chuyện của hai thế hệ: <strong className="font-semibold text-black">Mẹ tôi</strong> — người thợ đồng với hơn 20 năm kinh nghiệm, người nắm giữ bí quyết chế tác và kiểm soát chất lượng từng sản phẩm. Và <strong className="font-semibold text-black">tôi</strong> — người con trai, người xây dựng nền tảng công nghệ, marketing và bán hàng để đưa tinh hoa gia đình ra thị trường rộng lớn hơn.
                </p>
                <p>
                  Kết hợp giữa tay nghề thủ công truyền thống và tư duy kinh doanh hiện đại, chúng tôi tự hào mang đến cho khách hàng những sản phẩm đồng chất lượng cao, giá minh bạch và dịch vụ chân thành.
                </p>
              </div>
            </div>
            {/* Image */}
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-[#F5F5F7]">
              <Image
                src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=1035&auto=format&fit=crop"
                alt="Nghệ nhân chế tác đồng"
                fill
                className="object-cover"
              />
            </div>
          </div>

          {/* Two-column story */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
            {/* Mom */}
            <div className="bg-[#FDFBF7] rounded-3xl p-8 border border-amber-100/50">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B8860B] to-amber-700 flex items-center justify-center text-white text-2xl font-serif font-bold mb-5">
                M
              </div>
              <h3 className="font-serif text-2xl text-black mb-3">Mẹ — Chuyên gia đồng</h3>
              <p className="text-gray-500 font-light leading-relaxed text-sm">
                Với hơn 20 năm gắn bó với nghề đúc đồng tại làng Vạn Điểm, Mẹ tôi là người thợ chính kiểm soát toàn bộ quy trình sản xuất. Bà trực tiếp tư vấn kỹ thuật cho khách hàng, lựa chọn nguyên liệu đồng, và kiểm tra từng sản phẩm trước khi giao. Đôi mắt và đôi tay của bà là tiêu chuẩn chất lượng cao nhất của xưởng.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#B8860B] font-semibold uppercase tracking-widest">
                <span>⚱️</span>
                <span>Tư vấn & Kiểm định chất lượng</span>
              </div>
            </div>

            {/* Founder */}
            <div className="bg-[#111] rounded-3xl p-8 text-white">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gray-700 to-gray-900 border border-white/20 flex items-center justify-center text-white text-2xl font-serif font-bold mb-5">
                T
              </div>
              <h3 className="font-serif text-2xl text-white mb-3">Tôi — Người sáng lập</h3>
              <p className="text-white/60 font-light leading-relaxed text-sm">
                Tôi xây dựng website, quản lý mạng xã hội, chăm sóc khách hàng và phát triển kinh doanh. Mục tiêu của tôi là đưa tinh hoa nghề đồng của gia đình đến với nhiều khách hàng hơn — không chỉ ở Nam Định mà trên toàn quốc và quốc tế. Tôi tin rằng sản phẩm thủ công Việt Nam xứng đáng được tôn vinh với mức độ chuyên nghiệp cao nhất.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs text-[#B8860B] font-semibold uppercase tracking-widest">
                <span>💻</span>
                <span>Công nghệ & Marketing & Kinh doanh</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 md:py-20 bg-[#FDFBF7] border-t border-amber-100/50">
        <div className="container max-w-5xl mx-auto px-4 md:px-8">
          <div className="text-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-black mb-3">Giá trị cốt lõi</h2>
            <p className="text-gray-500 font-light">Những nguyên tắc chúng tôi không bao giờ từ bỏ</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {VALUES.map((value, i) => (
              <div key={value.title} className="bg-white rounded-2xl p-6 shadow-[0_2px_15px_rgba(0,0,0,0.05)] border border-gray-100">
                <div className="text-[#B8860B] text-2xl font-black font-serif mb-2 opacity-20">0{i + 1}</div>
                <h3 className="font-semibold text-black text-lg mb-2">{value.title}</h3>
                <p className="text-gray-500 text-sm font-light leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 md:py-20 bg-white text-center">
        <div className="container max-w-2xl mx-auto px-4">
          <h2 className="font-serif text-3xl md:text-4xl text-black mb-4">
            Hãy để chúng tôi phục vụ bạn
          </h2>
          <p className="text-gray-500 font-light mb-8 max-w-lg mx-auto">
            Dù bạn cần mua sẵn hay đặt theo yêu cầu — chúng tôi luôn sẵn sàng tư vấn tận tâm, miễn phí.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href={ROUTES.PRODUCTS}
              className="inline-flex items-center gap-2 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-[#B8860B] transition-all duration-300 hover:scale-105"
            >
              Xem sản phẩm →
            </Link>
            <a
              href={CONTACT_INFO.zaloLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-black/20 text-black px-8 py-4 rounded-full font-semibold hover:bg-black hover:text-white transition-all duration-300"
            >
              Liên hệ qua Zalo
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
