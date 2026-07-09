'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Plus, Filter, Edit, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import { Suspense } from 'react';
import ConfirmModal from '@/components/common/ConfirmModal';

interface DBCategory {
  id: string;
  name: string;
  parentId?: string;
}

interface DBProduct {
  id: string;
  name: string;
  code?: string;
  price: number;
  contactForPrice: boolean;
  status: string;
  published: boolean;
  stock: number;
  images: string[];
  categories?: {
    name: string;
  };
}

function ProductsAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;
  const statusFilter = searchParams.get('status') || 'all';
  const categoryFilter = searchParams.get('category') || 'all';
  const limit = 10;
  
  const [products, setProducts] = useState<DBProduct[]>([]);
  const [categories, setCategories] = useState<DBCategory[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeletingId, setIsDeletingId] = useState<string | null>(null);
  const [deletingProduct, setDeletingProduct] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [page, statusFilter, categoryFilter]);

  const fetchCategories = async () => {
    const { data } = await supabase
      .from('categories')
      .select('id, name, "parentId"')
      .order('createdAt', { ascending: true });
    if (data) setCategories(data as DBCategory[]);
  };

  const rootCategories = categories.filter(c => !c.parentId);
  const getChildren = (parentId: string) => categories.filter(c => c.parentId === parentId);

  const fetchProducts = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('products')
      .select('id, name, code, price, "contactForPrice", status, published, stock, images, categories(name)', { count: 'exact' });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }
    if (categoryFilter !== 'all') {
      query = query.eq('categoryId', categoryFilter);
    }

    const { data, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      toast.error('Lỗi khi tải dữ liệu sản phẩm');
    } else {
      setProducts((data as unknown as DBProduct[]) || []);
      setTotalCount(count || 0);
    }
    setIsLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    setIsDeletingId(id);
    const { error } = await supabase.from('products').delete().eq('id', id);
    if (error) {
      toast.error('Xóa sản phẩm thất bại: ' + error.message);
    } else {
      toast.success('Đã xóa sản phẩm thành công');
      fetchProducts();
    }
    setIsDeletingId(null);
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== 'page') params.set('page', '1'); // Reset to page 1 on filter change
    router.push(`${ROUTES.ADMIN.PRODUCTS}?${params.toString()}`);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ready': return <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-green-50 text-green-700">Sẵn sàng giao</span>;
      case 'crafting': return <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-amber-50 text-amber-700">Đang chế tác</span>;
      case 'custom': return <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-purple-50 text-purple-700">Nhận làm theo y/c</span>;
      case 'expired': return <span className="px-2.5 py-1 text-xs rounded-full font-medium bg-red-50 text-red-700">Đã hết hạn</span>;
      default: return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">Không rõ</span>;
    }
  };

  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Sản phẩm</h1>
          <p className="text-sm text-muted-foreground mt-1">Tổng cộng {totalCount} sản phẩm</p>
        </div>
        <Link href={ROUTES.ADMIN.PRODUCT_NEW} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm sản phẩm
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-xl border border-border flex flex-wrap gap-4 items-center mb-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Filter size={16} className="text-muted-foreground" /> Lọc theo:
        </div>
        
        <select 
          className="text-sm border border-border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={statusFilter}
          onChange={(e) => updateFilter('status', e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="ready">Sẵn sàng giao</option>
          <option value="crafting">Đang chế tác</option>
          <option value="custom">Nhận làm theo yêu cầu</option>
          <option value="expired">Đã hết hạn</option>
        </select>

        <select 
          className="text-sm border border-border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={categoryFilter}
          onChange={(e) => updateFilter('category', e.target.value)}
        >
          <option value="all">Tất cả danh mục</option>
          {rootCategories.map(root => (
            <React.Fragment key={root.id}>
              <option value={root.id} className="font-semibold">{root.name}</option>
              {getChildren(root.id).map(child => (
                <option key={child.id} value={child.id}>&nbsp;&nbsp;&nbsp;└ {child.name}</option>
              ))}
            </React.Fragment>
          ))}
        </select>
      </div>

      {/* Product List */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-700">Sản phẩm</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Danh mục</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Giá</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-neutral-700 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Đang tải dữ liệu sản phẩm...
                  </td>
                </tr>
              ) : products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Không tìm thấy sản phẩm nào.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 relative overflow-hidden shrink-0 border border-neutral-200/50 flex items-center justify-center">
                          {product.images && product.images.length > 0 ? (
                            <img src={product.images[0]} alt={product.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-neutral-400 text-xs font-semibold">No image</div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-foreground">{product.name}</p>
                          <p className="text-xs text-muted-foreground">Mã: {product.code || 'N/A'}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {product.categories?.name || '—'}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {product.contactForPrice ? (
                        <span className="text-amber-600 font-medium">Liên hệ</span>
                      ) : (
                        `${product.price.toLocaleString('vi-VN')} ₫`
                      )}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(product.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={ROUTES.ADMIN.PRODUCT_EDIT(product.id)}
                          className="p-2 hover:bg-white rounded shadow-sm border border-transparent hover:border-border text-foreground transition-all"
                          title="Sửa"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          disabled={isDeletingId === product.id}
                          onClick={() => setDeletingProduct({ id: product.id, name: product.name })}
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded shadow-sm border border-transparent hover:border-red-100 text-muted-foreground transition-all"
                          title="Xóa"
                        >
                          {isDeletingId === product.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="px-6 py-4 border-t border-border flex items-center justify-between bg-neutral-50/50">
            <span className="text-sm text-muted-foreground font-medium">
              Trang {page} / {totalPages}
            </span>
            <div className="flex gap-2">
              <button
                disabled={page === 1}
                onClick={() => updateFilter('page', String(page - 1))}
                className="px-4.5 py-2 text-sm border border-border rounded-xl bg-white hover:bg-muted disabled:opacity-50 transition font-medium"
              >
                Trước
              </button>
              <button
                disabled={page === totalPages}
                onClick={() => updateFilter('page', String(page + 1))}
                className="px-4.5 py-2 text-sm border border-border rounded-xl bg-white hover:bg-muted disabled:opacity-50 transition font-medium"
              >
                Sau
              </button>
            </div>
          </div>
        )}
      </div>

      <ConfirmModal
        isOpen={!!deletingProduct}
        title="Xác nhận xóa sản phẩm"
        message={`Bạn có chắc muốn xóa sản phẩm "${deletingProduct?.name}"? Hành động này không thể hoàn tác.`}
        confirmLabel="Xóa sản phẩm"
        cancelLabel="Quay lại"
        isDanger
        onConfirm={() => {
          if (deletingProduct) {
            handleDeleteProduct(deletingProduct.id);
            setDeletingProduct(null);
          }
        }}
        onCancel={() => setDeletingProduct(null)}
      />
    </div>
  );
}

export default function ProductsAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Đang tải...</div>}>
      <ProductsAdminContent />
    </Suspense>
  );
}
