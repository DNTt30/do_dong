/**
 * Order Page — Trang đặt hàng với form + thông tin liên hệ.
 */

import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import { Phone, MessageCircle, MapPin, Clock } from 'lucide-react';
import { CONTACT_INFO } from '@/constants/contact';
import OrderForm from '@/components/order/OrderForm';

export const metadata: Metadata = generatePageMetadata({
  title: 'Đặt Hàng Đồ Đồng',
  description:
    'Đặt hàng đồ đồng thủ công Nam Định: lư đồng, đỉnh đồng, chuông đồng, tượng đồng. Tư vấn miễn phí, giao toàn quốc, nhận hàng theo yêu cầu.',
  canonical: '/dat-hang',
});

const TRUST_BADGES = [
  { icon: '🛡️', text: 'Cam kết hoàn tiền nếu không đúng chất liệu' },
  { icon: '📦', text: 'Đóng gói chuyên biệt, giao hàng nguyên vẹn' },
  { icon: '🔧', text: 'Nhận đặt theo kích thước & thiết kế riêng' },
  { icon: '⚡', text: 'Phản hồi trong vòng 30 phút' },
];

export default function OrderPage() {
  return (
    <main className="min-h-screen bg-[#FBFBFD]">
      {/* Hero */}
      <section className="bg-gradient-to-br from-[#1a1209] via-[#2d1f0a] to-[#1a1209] py-20 md:py-28">
        <div className="container max-w-4xl mx-auto px-4 text-center">
          <p className="text-[#B8860B] uppercase tracking-[0.3em] text-xs font-semibold mb-4">
            ✦ Đặt hàng trực tuyến ✦
          </p>
          <h1 className="font-serif text-4xl md:text-6xl font-bold text-white mb-6 leading-tight tracking-tight">
            Đặt Hàng Đồ Đồng
          </h1>
          <p className="text-white/60 text-lg font-light max-w-xl mx-auto">
            Điền thông tin bên dưới — chúng tôi sẽ tư vấn và báo giá trong vòng 30 phút
          </p>
        </div>
      </section>

      {/* Main content */}
      <section className="py-12 md:py-20">
        <div className="container max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-16">
            
            {/* Form — chiếm 3/5 */}
            <div className="lg:col-span-3">
              <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6 md:p-10">
                <h2 className="text-xl font-semibold text-black mb-1">Thông tin đặt hàng</h2>
                <p className="text-gray-400 text-sm mb-8">
                  Điền đầy đủ để chúng tôi tư vấn chính xác nhất
                </p>
                <OrderForm />
              </div>
            </div>

            {/* Sidebar info — chiếm 2/5 */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Contact card */}
              <div className="bg-[#1a1209] text-white rounded-3xl p-6 md:p-8">
                <h3 className="font-serif text-xl font-bold mb-2">Liên hệ trực tiếp</h3>
                <p className="text-white/50 text-sm mb-6">Nhanh hơn — tư vấn ngay qua điện thoại hoặc Zalo</p>
                
                <div className="space-y-4">
                  <a
                    href={`tel:${CONTACT_INFO.phone}`}
                    className="flex items-center gap-4 bg-white/10 hover:bg-[#B8860B] rounded-2xl px-4 py-4 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-white/10 group-hover:bg-white/20 flex items-center justify-center shrink-0">
                      <Phone size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Gọi điện</div>
                      <div className="font-bold text-base">{CONTACT_INFO.phoneDisplay}</div>
                    </div>
                  </a>

                  <a
                    href={CONTACT_INFO.zaloLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-[#0068FF]/20 hover:bg-[#0068FF] rounded-2xl px-4 py-4 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#0068FF]/30 group-hover:bg-white/20 flex items-center justify-center shrink-0">
                      <MessageCircle size={18} />
                    </div>
                    <div>
                      <div className="text-xs text-white/50 mb-0.5">Nhắn Zalo</div>
                      <div className="font-bold text-base">{CONTACT_INFO.phoneDisplay}</div>
                    </div>
                  </a>
                </div>

                <div className="mt-6 pt-6 border-t border-white/10 space-y-3">
                  <div className="flex items-start gap-3 text-white/60 text-sm">
                    <MapPin size={16} className="shrink-0 mt-0.5 text-[#B8860B]" />
                    <span>{CONTACT_INFO.address}</span>
                  </div>
                  <div className="flex items-start gap-3 text-white/60 text-sm">
                    <Clock size={16} className="shrink-0 mt-0.5 text-[#B8860B]" />
                    <span>{CONTACT_INFO.workingHours}</span>
                  </div>
                </div>
              </div>

              {/* Trust badges */}
              <div className="bg-white rounded-3xl border border-gray-100 p-6">
                <h3 className="font-semibold text-sm text-gray-700 mb-4 uppercase tracking-wide">
                  Cam kết của chúng tôi
                </h3>
                <div className="space-y-3">
                  {TRUST_BADGES.map((badge) => (
                    <div key={badge.text} className="flex items-start gap-3">
                      <span className="text-lg shrink-0">{badge.icon}</span>
                      <p className="text-sm text-gray-600 leading-relaxed">{badge.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="bg-white rounded-3xl border border-gray-100 overflow-hidden">
                <iframe
                  src={`https://maps.google.com/maps?q=${encodeURIComponent(CONTACT_INFO.mapQuery)}&output=embed`}
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Bản đồ cơ sở Đồ Đồng Nam Định"
                />
                <div className="px-5 py-4">
                  <p className="text-xs text-gray-500 flex items-center gap-1.5">
                    <MapPin size={12} />
                    {CONTACT_INFO.address}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
