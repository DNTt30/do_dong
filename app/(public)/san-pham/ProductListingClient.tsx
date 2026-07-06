/**
 * ProductListingClient — client component for product listing with filters.
 */

'use client';

import React, { useState } from 'react';
import { useProducts } from '@/hooks/useProducts';
import { useCategories } from '@/hooks/useCategories';
import ProductCard from '@/components/product/ProductCard';
import { ProductGridSkeleton } from '@/components/common/LoadingSkeleton';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionTitle from '@/components/common/SectionTitle';
import type { ProductFilter } from '@/types/product.types';
import { ChevronDown, Loader2 } from 'lucide-react';

export default function ProductListingClient() {
  const [filter, setFilter] = useState<ProductFilter>({
    published: true,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  });

  const { products, isLoading, hasNextPage, loadMore } = useProducts(filter, 12);
  const { categories } = useCategories();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const handleLoadMore = async () => {
    setIsLoadingMore(true);
    await loadMore();
    setIsLoadingMore(false);
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilter((prev) => ({
      ...prev,
      categoryId: categoryId || undefined,
    }));
  };

  const handleSortChange = (value: string) => {
    const [sortBy, sortDirection] = value.split('-') as [
      ProductFilter['sortBy'],
      ProductFilter['sortDirection']
    ];
    setFilter((prev) => ({ ...prev, sortBy, sortDirection }));
  };

  return (
    <div>
      {/* Page header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-6">
          <Breadcrumb items={[{ label: 'Sản phẩm' }]} />
          <SectionTitle title="Sản Phẩm Đồng Thủ Công" align="left" className="mt-2" />
        </div>
      </div>

      <div className="container py-8">
        {/* Filters bar */}
        <div className="flex flex-wrap items-center gap-3 mb-8">
          {/* Category filter */}
          <div className="relative">
            <select
              onChange={(e) => handleCategoryChange(e.target.value)}
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="">Tất cả danh mục</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Sort */}
          <div className="relative">
            <select
              onChange={(e) => handleSortChange(e.target.value)}
              defaultValue="createdAt-desc"
              className="appearance-none pl-3 pr-8 py-2 rounded-lg border border-border bg-white text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 cursor-pointer"
            >
              <option value="createdAt-desc">Mới nhất</option>
              <option value="createdAt-asc">Cũ nhất</option>
              <option value="price-asc">Giá tăng dần</option>
              <option value="price-desc">Giá giảm dần</option>
              <option value="name-asc">A-Z</option>
            </select>
            <ChevronDown size={14} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          </div>

          {/* Result count */}
          {!isLoading && (
            <span className="text-sm text-muted-foreground ml-auto">
              {products.length} sản phẩm
            </span>
          )}
        </div>

        {/* Product grid */}
        {isLoading && products.length === 0 ? (
          <ProductGridSkeleton count={12} />
        ) : products.length === 0 ? (
          <div className="text-center py-20 text-muted-foreground">
            <p className="text-lg mb-2">Không tìm thấy sản phẩm</p>
            <p className="text-sm">Vui lòng thử bộ lọc khác.</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {products.map((product, index) => (
                <ProductCard key={product.id} product={product} index={index} />
              ))}
            </div>

            {/* Load more */}
            {hasNextPage && (
              <div className="text-center mt-10">
                <button
                  onClick={handleLoadMore}
                  disabled={isLoadingMore}
                  className="btn-outline"
                >
                  {isLoadingMore ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Đang tải...
                    </>
                  ) : (
                    'Xem thêm sản phẩm'
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
