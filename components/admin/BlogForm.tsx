'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, ArrowLeft, Loader2, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import slugify from 'slugify';

interface BlogFormProps {
  initialData?: any;
}

export default function BlogForm({ initialData }: BlogFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: initialData?.title || '',
    slug: initialData?.slug || '',
    excerpt: initialData?.excerpt || '',
    content: initialData?.content || '',
    category: initialData?.category || '',
    author: initialData?.author || 'Admin',
    published: initialData?.published ?? true,
  });

  const [existingImage, setExistingImage] = useState<string | null>(initialData?.coverImage || null);
  const [newImage, setNewImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
    
    // Auto-generate slug
    if (name === 'title' && !isEditing) {
      setFormData(prev => ({
        ...prev,
        title: value,
        slug: slugify(value, { lower: true, locale: 'vi', strict: true })
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setNewImage(file);
      setPreviewImage(URL.createObjectURL(file));
      setExistingImage(null);
    }
  };

  const handleRemoveImage = () => {
    setNewImage(null);
    setPreviewImage(null);
    setExistingImage(null);
  };

  const uploadImage = async (): Promise<string | null> => {
    if (!newImage) return existingImage;
    
    const fileExt = newImage.name.split('.').pop();
    const fileName = `blog_${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
    const filePath = `blogs/${fileName}`;
    
    const { error } = await supabase.storage
      .from('public-images')
      .upload(filePath, newImage);
      
    if (error) {
      throw new Error(`Upload ảnh thất bại: ${error.message}`);
    }
    
    const { data: publicUrlData } = supabase.storage
      .from('public-images')
      .getPublicUrl(filePath);
      
    return publicUrlData.publicUrl;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.slug) {
      toast.error('Vui lòng nhập Tiêu đề và Đường dẫn (Slug)');
      return;
    }

    setIsLoading(true);
    
    try {
      const coverImageUrl = await uploadImage();
      
      const payload = {
        ...formData,
        coverImage: coverImageUrl,
        updatedAt: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('blogs')
          .update(payload)
          .eq('id', initialData.id);
          
        if (error) throw error;
        toast.success('Cập nhật bài viết thành công!');
      } else {
        const { error } = await supabase
          .from('blogs')
          .insert([{ ...payload, createdAt: new Date().toISOString() }]);
          
        if (error) throw error;
        toast.success('Thêm bài viết mới thành công!');
      }
      
      router.push(ROUTES.ADMIN.BLOGS);
      router.refresh();
    } catch (error: any) {
      console.error(error);
      toast.error(error.message || 'Có lỗi xảy ra');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex items-center justify-between border-b border-border pb-4 mb-6">
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-xl font-bold text-foreground">
            {isEditing ? 'Cập nhật Bài viết' : 'Thêm Bài viết Mới'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
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
            {isEditing ? 'Lưu bài viết' : 'Đăng bài'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tiêu đề bài viết *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="VD: Ý nghĩa của đỉnh đồng trong văn hóa thờ cúng"
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 text-lg font-medium"
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
                placeholder="y-nghia-cua-dinh-dong"
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mô tả ngắn gọn (Excerpt)</label>
              <textarea
                name="excerpt"
                value={formData.excerpt}
                onChange={handleChange}
                rows={3}
                placeholder="Đoạn văn ngắn giới thiệu nội dung bài viết..."
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Nội dung bài viết</label>
              <textarea
                name="content"
                value={formData.content}
                onChange={handleChange}
                rows={15}
                placeholder="Nhập nội dung chi tiết bài viết..."
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-foreground border-b border-border pb-2">Phân loại & Tác giả</h3>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Chuyên mục</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 bg-transparent"
              >
                <option value="">-- Chọn chuyên mục --</option>
                <option value="Kiến thức">Kiến thức đồ đồng</option>
                <option value="Tin tức">Tin tức & Sự kiện</option>
                <option value="Phong thủy">Phong thủy</option>
                <option value="Tư vấn">Tư vấn chọn mua</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tác giả</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
            
            <label className="flex items-center gap-2 cursor-pointer pt-2">
              <input 
                type="checkbox" 
                name="published"
                checked={formData.published}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary"
              />
              <span className="text-sm font-medium text-foreground">Hiển thị công khai</span>
            </label>
          </div>

          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h3 className="font-bold text-foreground border-b border-border pb-2">Ảnh đại diện</h3>
            
            {(existingImage || previewImage) ? (
              <div className="relative rounded-lg border border-border overflow-hidden group">
                <img 
                  src={previewImage || existingImage || ''} 
                  alt="Cover" 
                  className="w-full aspect-video object-cover" 
                />
                <button
                  type="button"
                  onClick={handleRemoveImage}
                  className="absolute top-2 right-2 bg-white/90 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ) : (
              <label className="aspect-video rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors bg-muted/20">
                <ImageIcon size={32} className="mb-2" />
                <span className="text-sm font-medium">Tải ảnh lên</span>
                <input 
                  type="file" 
                  accept="image/*"
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            )}
          </div>
        </div>
      </div>
    </form>
  );
}
