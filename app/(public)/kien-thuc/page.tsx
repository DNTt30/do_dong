import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

const MOCK_ARTICLES = [
  {
    id: '1',
    slug: 'y-nghia-bo-tam-su',
    title: 'Ý nghĩa bộ Tam sự đồng trong văn hoá thờ cúng người Việt',
    excerpt: 'Bộ Tam sự không chỉ là vật dụng thờ cúng mà còn mang ý nghĩa tâm linh sâu sắc, thể hiện lòng thành kính của con cháu với tổ tiên.',
    image: '/images/banner-default.jpg',
    date: '10/05/2024',
    category: 'Kiến thức phong thuỷ'
  },
  {
    id: '2',
    slug: 'cach-danh-bong-do-dong',
    title: 'Cách làm sáng bóng đồ đồng tại nhà đơn giản',
    excerpt: 'Hướng dẫn chi tiết các cách tự làm sạch và đánh bóng đồ đồng thờ cúng bằng những nguyên liệu dễ tìm trong bếp.',
    image: '/images/banner-default.jpg',
    date: '15/05/2024',
    category: 'Mẹo vặt'
  },
  {
    id: '3',
    slug: 'phan-biet-dong-do-dong-thau',
    title: 'Phân biệt đồng đỏ và đồng thau trong chế tác',
    excerpt: 'Đồng đỏ và đồng thau có gì khác nhau? Loại nào bền hơn và phù hợp với không gian thờ cúng nào? Cùng tìm hiểu chi tiết.',
    image: '/images/banner-default.jpg',
    date: '20/05/2024',
    category: 'Kiến thức sản phẩm'
  }
];

export default function KnowledgePage() {
  return (
    <div className="bg-[#FBFBFD] min-h-screen pt-24 pb-32">
      <div className="container max-w-5xl mx-auto px-4 md:px-8">
        <div className="text-center mb-16 md:mb-24">
          <h1 className="text-4xl md:text-6xl font-serif text-black mb-6 tracking-tight">
            Kiến Thức Trầm Tích
          </h1>
          <p className="text-xl text-gray-500 font-light max-w-2xl mx-auto leading-relaxed">
            Nơi chia sẻ những giá trị văn hoá, ý nghĩa tâm linh và kiến thức về nghệ thuật đúc đồng truyền thống.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {MOCK_ARTICLES.map((article) => (
            <Link key={article.id} href={`/kien-thuc/${article.slug}`} className="group block">
              <div className="bg-white rounded-[2rem] overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-500 h-full flex flex-col border border-gray-100">
                <div className="relative aspect-[4/3] bg-gray-100 overflow-hidden">
                  <Image 
                    src={article.image} 
                    alt={article.title} 
                    fill 
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out mix-blend-multiply" 
                  />
                </div>
                <div className="p-8 flex flex-col flex-1">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-[#B8860B]">
                      {article.category}
                    </span>
                    <span className="text-xs text-gray-400 font-medium">
                      {article.date}
                    </span>
                  </div>
                  <h2 className="text-xl font-serif text-black mb-3 leading-snug group-hover:text-[#B8860B] transition-colors">
                    {article.title}
                  </h2>
                  <p className="text-gray-500 text-sm font-light leading-relaxed flex-1">
                    {article.excerpt}
                  </p>
                  <div className="mt-6 pt-4 border-t border-gray-100 text-sm font-medium text-black group-hover:translate-x-2 transition-transform inline-flex items-center">
                    Đọc tiếp <span className="ml-2">→</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
