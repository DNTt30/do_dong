import type { Metadata } from 'next';
import { generatePageMetadata } from '@/utils/seo';
import Link from 'next/link';
import OrderForm from '@/components/order/OrderForm';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product.types';

export const metadata: Metadata = generatePageMetadata({
  title: 'Thanh toán & Đặt Hàng',
  description: 'Thanh toán đơn hàng đồ đồng Nam Định an toàn, bảo mật.',
  canonical: '/dat-hang',
});

// For Next.js 15, searchParams is a Promise.
type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

export default async function CheckoutPage(props: { searchParams: SearchParams }) {
  const searchParams = await props.searchParams;
  const productSlug = searchParams.product as string | undefined;
  const qtyParam = searchParams.qty as string | undefined;
  
  let initialProduct: Product | null = null;
  let initialQty = 1;

  if (productSlug) {
    const { data } = await supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .single();
      
    if (data) {
      initialProduct = data as Product;
    }
  }

  if (qtyParam && !isNaN(Number(qtyParam))) {
    initialQty = Math.max(1, Number(qtyParam));
  }

  return (
    <main className="min-h-screen bg-[#F5F5F7]">
      {/* Header đơn giản */}
      <div className="bg-white border-b border-gray-200">
        <div className="container max-w-6xl mx-auto px-4 py-6 flex items-center justify-between">
          <h1 className="font-serif text-2xl font-bold text-black">Thanh toán & Đặt hàng</h1>
          <Link href="/san-pham" className="text-sm font-medium text-gray-500 hover:text-black transition">
            &larr; Tiếp tục mua sắm
          </Link>
        </div>
      </div>

      <section className="py-12">
        <div className="container max-w-6xl mx-auto px-4">
          <OrderForm initialProduct={initialProduct} initialQty={initialQty} />
        </div>
      </section>
    </main>
  );
}
