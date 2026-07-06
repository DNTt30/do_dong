import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default async function ArticleDetailPage() {
  return (
    <div className="bg-white min-h-screen">
      {/* 1. HERO SECTION */}
      <section className="pt-24 pb-16 md:pt-32 md:pb-20 border-b border-gray-100">
        <div className="container max-w-4xl mx-auto px-4 md:px-8">
          <Link href="/kien-thuc" className="inline-flex items-center text-sm font-medium text-gray-400 hover:text-black transition-colors mb-8">
            <ArrowLeft size={16} className="mr-2" /> Quay lại Kiến thức
          </Link>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#B8860B] bg-[#B8860B]/10 px-3 py-1 rounded-full">
              Kiến thức phong thuỷ
            </span>
            <span className="text-sm text-gray-400 font-medium">10/05/2024</span>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif text-black leading-tight tracking-tight mb-8">
            Ý nghĩa bộ Tam sự đồng trong văn hoá thờ cúng người Việt
          </h1>

          <p className="text-xl md:text-2xl text-gray-500 font-light leading-relaxed mb-12">
            Bộ Tam sự không chỉ là vật dụng thờ cúng mà còn mang ý nghĩa tâm linh sâu sắc, thể hiện lòng thành kính của con cháu với tổ tiên.
          </p>

          <div className="relative aspect-[16/9] md:aspect-[21/9] w-full rounded-3xl overflow-hidden bg-[#F5F5F7]">
            <Image 
              src="/images/banner-default.jpg" 
              alt="Ý nghĩa bộ Tam sự" 
              fill 
              className="object-cover mix-blend-multiply opacity-90"
              priority
            />
          </div>
        </div>
      </section>

      {/* 2. CONTENT SECTION */}
      <section className="py-16 md:py-24">
        <div className="container max-w-3xl mx-auto px-4 md:px-8">
          <div className="prose prose-lg md:prose-xl prose-p:font-light prose-p:text-gray-600 prose-p:leading-relaxed prose-headings:font-serif prose-headings:text-black prose-img:rounded-2xl max-w-none">
            <p>
              Trong văn hóa tín ngưỡng của người Việt Nam, ban thờ gia tiên luôn được coi là chốn linh thiêng nhất trong mỗi gia đình. Việc bày biện đồ thờ cúng, đặc biệt là bộ Tam sự, mang những ý nghĩa biểu tượng vô cùng quan trọng.
            </p>
            
            <h2>1. Bộ Tam sự là gì?</h2>
            <p>
              &quot;Tam&quot; có nghĩa là ba, &quot;Sự&quot; có nghĩa là món. Bộ Tam sự gồm ba món đồ vật chính: một đỉnh đồng (lư hương) ở giữa và hai hạc đồng hoặc hai chân nến ở hai bên. Đỉnh đồng thường được dùng để đốt trầm, tạo mùi hương thanh khiết, thể hiện sự thành kính.
            </p>

            <Image src="/images/banner-default.jpg" alt="Đỉnh đồng" width={800} height={500} className="w-full object-cover" />

            <h2>2. Ý nghĩa phong thủy</h2>
            <p>
              Đỉnh đồng được thiết kế với hình tượng con Nghê trên nắp, biểu tượng cho sức mạnh tâm linh, xua đuổi tà khí. Hương trầm tỏa ra từ đỉnh đồng giúp thanh lọc không khí, mang lại sự ấm cúng và linh thiêng cho không gian thờ tự.
            </p>
            <p>
              Hai bên là đôi hạc cưỡi rùa hoặc đôi chân nến. Hạc tượng trưng cho sự thanh cao, trường thọ; rùa tượng trưng cho sự vững chắc, bền bỉ. Sự kết hợp giữa hạc và rùa thể hiện khát vọng về một cuộc sống trường tồn, bình an và hạnh phúc.
            </p>

            <h2>3. Cách bày trí chuẩn</h2>
            <p>
              Đỉnh đồng luôn được đặt ở vị trí trung tâm, phía sau bát hương. Đôi hạc hoặc chân nến được đặt đối xứng hai bên đỉnh đồng. Việc sắp xếp này tuân theo nguyên tắc &quot;Tả thanh long, Hữu bạch hổ&quot;, tạo sự cân bằng âm dương và thu hút tài lộc cho gia chủ.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
