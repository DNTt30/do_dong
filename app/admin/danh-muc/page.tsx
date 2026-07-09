'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, Tag, Loader2, CornerDownRight } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function CategoryAdminPage() {
  const [categories, setCategories] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deletingCategory, setDeletingCategory] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('categories')
      .select('*')
      .order('createdAt', { ascending: true });

    if (error) {
      toast.error('Lỗi khi tải dữ liệu danh mục');
    } else if (data) {
      setCategories(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string, name: string) => {
    // 1. Kiểm tra danh mục con
    const hasChildren = categories.some(c => c.parentId === id);
    if (hasChildren) {
      toast.error(`Không thể xóa danh mục "${name}" vì có chứa danh mục con!`);
      return;
    }

    // 2. Kiểm tra sản phẩm liên kết
    const { count: productCount, error: countErr } = await supabase
      .from('products')
      .select('*', { count: 'exact', head: true })
      .eq('categoryId', id);
      
    if (countErr) {
      toast.error('Lỗi kiểm tra dữ liệu sản phẩm');
      return;
    }
    
    if (productCount && productCount > 0) {
      toast.error(`Không thể xóa "${name}" vì đang có ${productCount} sản phẩm thuộc danh mục này!`);
      return;
    }

    // Mở modal xác nhận xóa
    setDeletingCategory({ id, name });
  };

  const executeDelete = async (id: string) => {
    setIsDeleting(id);
    const { error } = await supabase.from('categories').delete().eq('id', id);
    
    if (error) {
      toast.error('Xóa thất bại: ' + error.message);
    } else {
      toast.success('Đã xóa danh mục');
      setCategories(prev => prev.filter(c => c.id !== id));
    }
    setIsDeleting(null);
  };

  // Build tree data for rendering
  const rootCategories = categories.filter(c => !c.parentId);
  
  const getChildren = (parentId: string) => {
    return categories.filter(c => c.parentId === parentId);
  };

  const renderCategoryRow = (cat: any, level: number = 0) => {
    const children = getChildren(cat.id);
    const hasChildren = children.length > 0;
    
    return (
      <React.Fragment key={cat.id}>
        <tr className="hover:bg-muted/50 transition-colors group">
          <td className="px-6 py-4 font-medium text-foreground">
            <div className="flex items-center gap-2" style={{ paddingLeft: `${level * 24}px` }}>
              {level > 0 ? (
                <CornerDownRight size={16} className="text-muted-foreground shrink-0" />
              ) : (
                <Tag size={16} className="text-amber-600 shrink-0" />
              )}
              <span className="font-semibold">{cat.name}</span>
            </div>
          </td>
          <td className="px-6 py-4 text-muted-foreground font-mono text-xs">
            {cat.slug}
          </td>
          <td className="px-6 py-4">
            <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-50 text-green-600">
              Hoạt động
            </span>
          </td>
          <td className="px-6 py-4 text-right">
            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Link 
                href={ROUTES.ADMIN.CATEGORY_EDIT(cat.id)}
                className="p-2 hover:bg-white rounded shadow-sm border border-transparent hover:border-border text-foreground transition-all"
                title="Sửa"
              >
                <Edit size={16} />
              </Link>
              <button 
                onClick={() => handleDelete(cat.id, cat.name)}
                disabled={isDeleting === cat.id}
                className="p-2 hover:bg-red-50 hover:text-red-600 rounded shadow-sm border border-transparent hover:border-red-100 text-muted-foreground transition-all"
                title="Xóa"
              >
                {isDeleting === cat.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
              </button>
            </div>
          </td>
        </tr>
        {hasChildren && children.map((child) => renderCategoryRow(child, level + 1))}
      </React.Fragment>
    );
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Danh mục</h1>
          <p className="text-muted-foreground text-sm mt-1">Tổng cộng {categories.length} danh mục</p>
        </div>
        <Link href={ROUTES.ADMIN.CATEGORY_NEW} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm danh mục
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-700">Cấu trúc Danh mục</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Đường dẫn (Slug)</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-neutral-700 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Đang tải dữ liệu danh mục...
                  </td>
                </tr>
              ) : categories.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-muted-foreground">
                    Chưa có danh mục nào.
                  </td>
                </tr>
              ) : (
                rootCategories.map((cat) => renderCategoryRow(cat, 0))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deletingCategory}
        title="Xác nhận xóa danh mục"
        message={`Bạn có chắc muốn xóa danh mục "${deletingCategory?.name}"? Hành động này không thể hoàn tác và tất cả danh mục con cũng phải trống.`}
        confirmLabel="Xóa danh mục"
        cancelLabel="Quay lại"
        isDanger
        onConfirm={() => {
          if (deletingCategory) {
            executeDelete(deletingCategory.id);
            setDeletingCategory(null);
          }
        }}
        onCancel={() => setDeletingCategory(null)}
      />
    </div>
  );
}
