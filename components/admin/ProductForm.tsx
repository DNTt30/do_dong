'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { X, Upload, Plus, Trash2, Loader2, Save, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';

const generateSlug = (text: string) => {
  return text.toString().toLowerCase()
    .normalize('NFD') // remove accents
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[đĐ]/g, 'd')
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-')
    .replace(/^-+/, '')
    .replace(/-+$/, '') + '-' + Math.floor(Math.random() * 10000); // add random to ensure uniqueness
};

const generateProductCode = (categoryName: string) => {
  if (!categoryName) return '';
  
  // Tạo tiền tố từ các chữ cái đầu tiên của Danh mục (VD: Đồ Thờ Cúng -> DTC)
  const prefix = categoryName
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[đĐ]/g, 'D')
    .split(' ')
    .filter(word => word.length > 0)
    .map(word => word[0].toUpperCase())
    .join('');
    
  // Lấy ngày tháng năm hiện tại (VD: 070626)
  const today = new Date();
  const dd = String(today.getDate()).padStart(2, '0');
  const mm = String(today.getMonth() + 1).padStart(2, '0');
  const yy = String(today.getFullYear()).slice(-2);
  
  // Thêm 3 số ngẫu nhiên để phân biệt các sản phẩm cùng danh mục trong cùng 1 ngày
  const randomSuffix = Math.floor(100 + Math.random() * 900);
  
  return `${prefix}${dd}${mm}${yy}-${randomSuffix}`;
};

interface ProductFormProps {
  initialData?: any;
}

export default function ProductForm({ initialData }: ProductFormProps) {
  const router = useRouter();
  const isEditing = !!initialData;
  const [isLoading, setIsLoading] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);

  // Form State
  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    code: initialData?.code || '',
    categoryId: initialData?.categoryId || '',
    price: initialData?.price || 0,
    contactForPrice: initialData?.contactForPrice || false,
    status: initialData?.status || 'ready',
    stock: initialData?.stock || 0,
    material: initialData?.material || '',
    color: initialData?.color || '',
    weight: initialData?.weight || '',
    size: initialData?.size || '',
    shortDescription: initialData?.shortDescription || '',
    description: initialData?.description || '',
    videoUrl: initialData?.videoUrl || '',
    published: initialData?.published ?? true,
    featured: initialData?.featured ?? false,
  });

  // Images state (existing URLs vs new Files)
  const [existingImages, setExistingImages] = useState<string[]>(initialData?.images || []);
  const [newImages, setNewImages] = useState<File[]>([]);
  const [newImagePreviews, setNewImagePreviews] = useState<string[]>([]);
  const [isGeneratingCode, setIsGeneratingCode] = useState(false);

  useEffect(() => {
    fetchCategories();
    if (!isEditing && !initialData?.code) {
      generateUniqueCode('Đồ Đồng');
    }
  }, []);

  const fetchCategories = async () => {
    const { data } = await supabase.from('categories').select('id, name, "parentId"').order('createdAt', { ascending: true });
    if (data) setCategories(data);
  };

  const rootCategories = categories.filter(c => !c.parentId);
  const getChildren = (parentId: string) => categories.filter(c => c.parentId === parentId);

  const generateUniqueCode = async (categoryName: string) => {
    setIsGeneratingCode(true);
    let newCode = '';
    let isUnique = false;
    let attempts = 0;

    // Thử tạo mã tối đa 5 lần cho đến khi tìm được mã chưa tồn tại trong Database
    while (!isUnique && attempts < 5) {
      newCode = generateProductCode(categoryName);
      
      // Kiểm tra trong database xem mã này đã có ai dùng chưa
      const { count, error } = await supabase
        .from('products')
        .select('*', { count: 'exact', head: true })
        .eq('code', newCode);
        
      if (count === 0) {
        isUnique = true;
      }
      attempts++;
    }
    
    setIsGeneratingCode(false);
    
    if (isUnique) {
      setFormData(prev => ({ ...prev, code: newCode }));
    } else {
      toast.error('Hệ thống đang quá tải mã, vui lòng nhập mã thủ công!');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({ ...prev, [name]: Number(value) }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
      
      // Auto-generate code when category changes (only if it's a new product or user hasn't explicitly locked code)
      if (name === 'categoryId' && !isEditing) {
        const selectedCat = categories.find(c => c.id === value);
        if (selectedCat) {
          generateUniqueCode(selectedCat.name);
        }
      }
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArray = Array.from(e.target.files);
      setNewImages(prev => [...prev, ...filesArray]);
      
      const previewsArray = filesArray.map(file => URL.createObjectURL(file));
      setNewImagePreviews(prev => [...prev, ...previewsArray]);
    }
  };

  const removeExistingImage = (index: number) => {
    setExistingImages(prev => prev.filter((_, i) => i !== index));
  };

  const removeNewImage = (index: number) => {
    setNewImages(prev => prev.filter((_, i) => i !== index));
    setNewImagePreviews(prev => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  const uploadImages = async (): Promise<string[]> => {
    const uploadedUrls: string[] = [];
    for (const file of newImages) {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2, 15)}_${Date.now()}.${fileExt}`;
      const filePath = `products/${fileName}`;
      
      const { data, error } = await supabase.storage
        .from('public-images')
        .upload(filePath, file);
        
      if (error) {
        throw new Error(`Upload failed: ${error.message}`);
      }
      
      const { data: publicUrlData } = supabase.storage
        .from('public-images')
        .getPublicUrl(filePath);
        
      uploadedUrls.push(publicUrlData.publicUrl);
    }
    return uploadedUrls;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.name) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    
    if (!formData.categoryId) {
      toast.error('Vui lòng chọn danh mục');
      return;
    }

    setIsLoading(true);
    
    try {
      // 1. Upload new images if any
      let newlyUploadedUrls: string[] = [];
      if (newImages.length > 0) {
        newlyUploadedUrls = await uploadImages();
      }
      
      const allImages = [...existingImages, ...newlyUploadedUrls];
      
      const productPayload = {
        ...formData,
        categoryId: formData.categoryId || null, // null if empty
        images: allImages,
        slug: initialData?.slug || generateSlug(formData.name),
        updatedAt: new Date().toISOString()
      };

      if (isEditing) {
        const { error } = await supabase
          .from('products')
          .update(productPayload)
          .eq('id', initialData.id);
          
        if (error) {
          if (error.code === '23505') throw new Error('Mã sản phẩm này đã tồn tại! Vui lòng tạo mã khác.');
          throw error;
        }
        toast.success('Cập nhật sản phẩm thành công!');
      } else {
        const { error } = await supabase
          .from('products')
          .insert([{ ...productPayload, createdAt: new Date().toISOString() }]);
          
        if (error) {
          if (error.code === '23505') throw new Error('Mã sản phẩm này đã tồn tại! Vui lòng tạo mã khác.');
          throw error;
        }
        toast.success('Thêm sản phẩm thành công!');
      }
      
      router.push(ROUTES.ADMIN.PRODUCTS);
      router.refresh();
      
    } catch (error: any) {
      console.error(error);
      toast.error(`Có lỗi xảy ra: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Header Actions */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            type="button" 
            onClick={() => router.back()}
            className="p-2 hover:bg-muted rounded-full transition-colors"
          >
            <ArrowLeft size={20} className="text-muted-foreground" />
          </button>
          <h1 className="text-2xl font-bold text-foreground">
            {isEditing ? 'Cập nhật Sản phẩm' : 'Thêm Sản phẩm Mới'}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button 
            type="button" 
            onClick={() => router.push(ROUTES.ADMIN.PRODUCTS)}
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
            {isEditing ? 'Lưu cập nhật' : 'Lưu sản phẩm'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Thông tin cơ bản */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Thông tin cơ bản</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tên sản phẩm *</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Ví dụ: Đỉnh đồng ngũ sắc 60cm"
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Mã sản phẩm (Tự động)</label>
                <div className="relative">
                  <input
                    type="text"
                    name="code"
                    value={formData.code}
                    readOnly
                    placeholder={isGeneratingCode ? "Đang tạo mã..." : "Hệ thống tự động sinh mã"}
                    className="w-full px-4 py-2 rounded-lg border border-border bg-muted/50 text-muted-foreground focus:outline-none cursor-not-allowed"
                  />
                  {isGeneratingCode && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                      <Loader2 size={16} className="animate-spin text-muted-foreground" />
                    </div>
                  )}
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Danh mục *</label>
                <select
                  name="categoryId"
                  value={formData.categoryId}
                  onChange={handleChange}
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 bg-transparent"
                  required
                >
                  <option value="" disabled>-- Chọn danh mục --</option>
                  {rootCategories.map(root => (
                    <React.Fragment key={root.id}>
                      <option value={root.id} className="font-semibold text-foreground">
                        {root.name}
                      </option>
                      {getChildren(root.id).map(child => (
                        <option key={child.id} value={child.id}>
                          &nbsp;&nbsp;&nbsp;└ {child.name}
                        </option>
                      ))}
                    </React.Fragment>
                  ))}
                </select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Mô tả ngắn gọn</label>
              <textarea
                name="shortDescription"
                value={formData.shortDescription}
                onChange={handleChange}
                rows={3}
                placeholder="Một vài dòng tóm tắt về sản phẩm..."
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 resize-none"
              />
            </div>
          </div>

          {/* Hình ảnh */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Hình ảnh sản phẩm</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {/* Existing Images */}
              {existingImages.map((url, idx) => (
                <div key={`exist-${idx}`} className="relative aspect-square rounded-lg border border-border overflow-hidden group">
                  <img src={url} alt={`Image ${idx}`} className="w-full h-full object-cover" />
                  <button
                    type="button"
                    onClick={() => removeExistingImage(idx)}
                    className="absolute top-1 right-1 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              {/* New Images Previews */}
              {newImagePreviews.map((url, idx) => (
                <div key={`new-${idx}`} className="relative aspect-square rounded-lg border border-primary/50 overflow-hidden group">
                  <img src={url} alt={`New ${idx}`} className="w-full h-full object-cover" />
                  <div className="absolute top-1 left-1 bg-primary text-white text-[10px] px-1.5 py-0.5 rounded">Mới</div>
                  <button
                    type="button"
                    onClick={() => removeNewImage(idx)}
                    className="absolute top-1 right-1 bg-white/80 p-1.5 rounded-full text-red-500 hover:bg-red-500 hover:text-white transition-colors opacity-0 group-hover:opacity-100"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              ))}
              
              {/* Add button */}
              <label className="relative aspect-square rounded-lg border-2 border-dashed border-border hover:border-primary cursor-pointer flex flex-col items-center justify-center text-muted-foreground hover:text-primary transition-colors bg-muted/20">
                <Plus size={24} className="mb-2" />
                <span className="text-xs font-medium">Thêm ảnh</span>
                <input 
                  type="file" 
                  accept="image/*" 
                  multiple 
                  className="hidden" 
                  onChange={handleImageChange}
                />
              </label>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-foreground mb-1.5">Link Video (Youtube/Tiktok)</label>
              <input
                type="text"
                name="videoUrl"
                value={formData.videoUrl}
                onChange={handleChange}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Chi tiết */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Bài viết chi tiết</h2>
            <div>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={10}
                placeholder="Nhập nội dung chi tiết về tác phẩm đồ đồng..."
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>
        </div>

        {/* Sidebar Column */}
        <div className="space-y-6">
          {/* Giá và Tồn kho */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Giá & Tồn kho</h2>
            
            <div className="flex items-center gap-2 mb-4">
              <input 
                type="checkbox" 
                id="contactForPrice" 
                name="contactForPrice"
                checked={formData.contactForPrice}
                onChange={handleChange}
                className="w-4 h-4 rounded text-primary focus:ring-primary"
              />
              <label htmlFor="contactForPrice" className="text-sm font-medium text-foreground cursor-pointer">
                Sản phẩm cao cấp (Liên hệ báo giá)
              </label>
            </div>

            {!formData.contactForPrice && (
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Giá bán (VNĐ)</label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="0"
                  min="0"
                  className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
                />
              </div>
            )}

            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Tồn kho</label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                min="0"
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30"
              />
            </div>
          </div>

          {/* Thuộc tính vật lý */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Đặc tả</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Chất liệu</label>
              <input
                type="text"
                name="material"
                value={formData.material}
                onChange={handleChange}
                placeholder="VD: Đồng đỏ, Khảm tam khí"
                className="w-full px-4 py-2 rounded-lg border border-border"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Màu sắc</label>
              <input
                type="text"
                name="color"
                value={formData.color}
                onChange={handleChange}
                placeholder="VD: Vàng hun, Đồng mộc"
                className="w-full px-4 py-2 rounded-lg border border-border"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Kích thước</label>
                <input
                  type="text"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  placeholder="Cao 60cm"
                  className="w-full px-4 py-2 rounded-lg border border-border"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Trọng lượng</label>
                <input
                  type="text"
                  name="weight"
                  value={formData.weight}
                  onChange={handleChange}
                  placeholder="Khoảng 15kg"
                  className="w-full px-4 py-2 rounded-lg border border-border"
                />
              </div>
            </div>
          </div>

          {/* Cấu hình hiển thị */}
          <div className="bg-white p-6 rounded-xl border border-border shadow-sm space-y-4">
            <h2 className="text-lg font-bold text-foreground border-b border-border pb-2">Cấu hình</h2>
            
            <div>
              <label className="block text-sm font-medium text-foreground mb-1.5">Trạng thái chế tác</label>
              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="w-full px-4 py-2 rounded-lg border border-border focus:ring-2 focus:ring-primary/30 bg-transparent"
              >
                <option value="ready">Sẵn sàng giao ngay</option>
                <option value="crafting">Đang trong quá trình chế tác</option>
                <option value="custom">Nhận chế tác theo yêu cầu</option>
                <option value="expired">Tạm ngừng chế tác / Hết hàng</option>
              </select>
            </div>

            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="published"
                  checked={formData.published}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary"
                />
                <span className="text-sm font-medium text-foreground">Hiển thị công khai (Published)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input 
                  type="checkbox" 
                  name="featured"
                  checked={formData.featured}
                  onChange={handleChange}
                  className="w-4 h-4 rounded text-primary"
                />
                <span className="text-sm font-medium text-foreground">Sản phẩm nổi bật (Featured)</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
