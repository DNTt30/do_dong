import React from 'react';
import type { Metadata } from 'next';
import Image from 'next/image';
import { generatePageMetadata } from '@/utils/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'Giới thiệu',
  description: 'Tìm hiểu về lịch sử và truyền thống nghề đúc đồng thủ công tại Nam Định. Nơi lưu giữ tinh hoa văn hóa Việt qua từng sản phẩm đồ đồng cao cấp.',
});

export default function AboutPage() {
  return (
    <div className="bg-background pt-20 pb-32">
      {/* Hero Section */}
      <section className="container max-w-5xl mx-auto px-4 md:px-8 mb-24">
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-6xl font-serif font-bold text-secondary mb-6 tracking-tight">
            Tinh Hoa<br />Nghề Đúc Đồng
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground font-light max-w-2xl mx-auto leading-relaxed">
            Hơn một thế kỷ lưu truyền và gìn giữ, làng nghề đúc đồng Nam Định tự hào mang đến những tác phẩm thủ công tinh xảo, đậm đà bản sắc văn hóa Việt.
          </p>
        </div>
        
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-2xl">
          <Image
            src="https://images.unsplash.com/photo-1518707399486-6d702a84ff00?q=80&w=2070&auto=format&fit=crop"
            alt="Xưởng đúc đồng Nam Định"
            fill
            className="object-cover"
            priority
          />
        </div>
      </section>

      {/* Story Section */}
      <section className="container max-w-4xl mx-auto px-4 md:px-8">
        <div className="prose prose-lg prose-headings:font-serif prose-p:font-light md:prose-xl mx-auto text-secondary/80">
          <h2>Lịch sử hình thành</h2>
          <p>
            Làng nghề đúc đồng Nam Định đã có lịch sử từ hàng trăm năm trước, nổi tiếng khắp cả nước với những nghệ nhân tài hoa. Từ những sản phẩm đồ thờ cúng linh thiêng như Lư đồng, Đỉnh đồng cho đến những tác phẩm trang trí mỹ nghệ tinh xảo, mỗi sản phẩm đều chứa đựng tâm huyết và mồ hôi của người thợ.
          </p>
          
          <h2>Quy trình chế tác thủ công</h2>
          <p>
            Điểm đặc biệt làm nên thương hiệu của Đồ Đồng Nam Định chính là quy trình chế tác thủ công truyền thống. Trải qua hàng chục công đoạn phức tạp từ tạo mẫu, làm khuôn, nấu đồng, rót đồng cho đến làm nguội và chạm khắc. Tất cả đều được thực hiện hoàn toàn bằng tay, đòi hỏi sự kiên nhẫn và độ chính xác tuyệt đối.
          </p>
          
          <figure className="my-12">
            <div className="relative w-full aspect-[21/9] rounded-xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1621252179027-94459d278660?q=80&w=2070&auto=format&fit=crop"
                alt="Chạm khắc đồng"
                fill
                className="object-cover"
              />
            </div>
            <figcaption className="text-center text-sm text-muted-foreground mt-4 italic">
              Công đoạn chạm khắc thủ công đòi hỏi sự tỉ mỉ của nghệ nhân.
            </figcaption>
          </figure>

          <h2>Cam kết chất lượng</h2>
          <p>
            Chúng tôi cam kết sử dụng nguyên liệu đồng nguyên chất chất lượng cao nhất, kết hợp cùng kỹ thuật đúc gia truyền để tạo ra những sản phẩm không chỉ đẹp về mặt thẩm mỹ mà còn trường tồn với thời gian. Mỗi sản phẩm khi đến tay khách hàng là một tác phẩm nghệ thuật hoàn hảo, mang đậm giá trị văn hóa và tâm linh.
          </p>
        </div>
      </section>
    </div>
  );
}
