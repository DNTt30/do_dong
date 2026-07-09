'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import slugify from 'slugify';

interface CategoryFormProps {
  initialData?: any;
}

export default function CategoryForm({ initialData }: CategoryFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const [parentCategories, setParentCategories] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    description: initialData?.description || '',
    slug: initialData?.slug || '',
    parentId: initialData?.parentId || '',
    isActive: initialData?.isActive ?? true,
  });

  useEffect(() => {
    fetchParentCategories();
  }, []);

  const fetchParentCategories = async () => {
    // Only fetch categories that are root (parentId is null) to allow max 2 levels of hierarchy
    const { data } = await supabase
      .from('categories')
      .select('id, name')
      .is('parentId', null);
      
    if (data) {
      // If editing, don't allow setting itself as parent
      setParentCategories(isEditing ? data.filter(c => c.id !== initialData.id) : data);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Auto-generate slug if typing name
    if (name === 'name' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        name: value,
        slug: slugify(value, { lower: true, locale: 'vi', strict: true })
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.slug) {
      toast.error('Vui lòng nhập tên và đường dẫn (slug)');
      return;
    }

    setIsLoading(true);
    
    const payload = {
      name: formData.name,
      description: formData.description,
      slug: formData.slug,
      parentId: formData.parentId || null,
      isActive: formData.isActive,
      updatedAt: new Date().toISOString()
    };
    
    try {
      if (isEditing) {
        const { error } = await supabase
          .from('categories')
          .update(payload)
          .eq('id', initialData.id);
          
        if (error) throw error;
        toast.success('Cập nhật danh mục thành công!');
      } else {
        const { error } = await supabase
          .from('categories')
          .insert([{ ...payload, createdAt: new Date().toISOString() }]);
          
        if (error) throw error;
        toast.success('Thêm danh mục thành công!');
      }
      
      router.push(ROUTES.ADMIN.CATEGORIES);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-6 bg-white p-6 rounded-xl border border-border shadow-sm">
      <div className="flex items-center gap-4 border-b border-border pb-4 mb-6">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="p-2 hover:bg-muted rounded-full transition-colors"
        >
          <ArrowLeft size={20} className="text-muted-foreground" />
        </button>
        <h1 className="text-xl font-bold text-foreground">
          {isEditing ? 'Cập nhật Danh mục' : 'Thêm Danh mục Mới'}
        </h1>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Tên danh mục *</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="VD: Đồ thờ cúng"
            className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Đường dẫn (Slug) *</label>
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            placeholder="do-tho-cung"
            className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
            required
          />
          <p className="text-xs text-muted-foreground mt-1">Đường dẫn trên URL, không dấu và viết liền bằng gạch ngang.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Danh mục cha</label>
          <select
            name="parentId"
            value={formData.parentId}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 bg-transparent"
          >
            <option value="">-- Trống (Đây là danh mục gốc) --</option>
            {parentCategories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          <p className="text-xs text-muted-foreground mt-1">Chọn danh mục cha nếu đây là danh mục con.</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-foreground mb-1.5">Mô tả</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Mô tả về danh mục..."
            className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 resize-none"
          />
        </div>
        
        <label className="flex items-center gap-2 cursor-pointer pt-2">
          <input 
            type="checkbox" 
            name="isActive"
            checked={formData.isActive}
            onChange={handleChange}
            className="w-4 h-4 rounded text-primary"
          />
          <span className="text-sm font-medium text-foreground">Hiển thị danh mục này trên website</span>
        </label>
      </div>

      <div className="flex items-center justify-end gap-3 pt-4 border-t border-border mt-6">
        <button 
          type="button" 
          onClick={() => router.back()}
          className="px-4 py-2 text-sm font-medium border border-border rounded-lg hover:bg-muted transition-colors"
        >
          Hủy
        </button>
        <button 
          type="submit" 
          disabled={isLoading}
          className="btn-primary flex items-center gap-2"
        >
          {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Save size={16} />}
          {isEditing ? 'Lưu cập nhật' : 'Thêm mới'}
        </button>
      </div>
    </form>
  );
}
