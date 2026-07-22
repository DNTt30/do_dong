import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import OrderTrackingClient from './OrderTrackingClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'Tra cứu đơn hàng',
  description: 'Tra cứu trạng thái và lịch sử đơn hàng của bạn tại Đồ Đồng Nam Định.',
  canonical: '/tra-cuu-don-hang',
});

export default function OrderTrackingPage() {
  return (
    <main className="min-h-screen bg-[#F5F5F7] py-12 md:py-20">
      <div className="container max-w-4xl mx-auto px-4">
        <h1 className="font-serif text-3xl md:text-4xl font-bold text-center mb-10">Đơn Hàng Của Bạn</h1>
        
        <OrderTrackingClient />
      </div>
    </main>
  );
}
