'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { supabase } from '@/lib/supabase';
import { Plus, Edit, Trash2, FileText, Loader2 } from 'lucide-react';
import { ROUTES } from '@/constants/routes';
import { toast } from 'sonner';
import { format } from 'date-fns';
import ConfirmModal from '@/components/common/ConfirmModal';

export default function BlogAdminPage() {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [deletingBlog, setDeletingBlog] = useState<{ id: string; title: string } | null>(null);

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from('blogs')
      .select('id, title, category, published, createdAt, coverImage')
      .order('createdAt', { ascending: false });

    if (error) {
      toast.error('Lỗi khi tải dữ liệu bài viết');
    } else if (data) {
      setBlogs(data);
    }
    setIsLoading(false);
  };

  const handleDelete = async (id: string) => {
    setIsDeleting(id);
    const { error } = await supabase.from('blogs').delete().eq('id', id);
    
    if (error) {
      toast.error('Xóa thất bại: ' + error.message);
    } else {
      toast.success('Đã xóa bài viết');
      setBlogs(prev => prev.filter(b => b.id !== id));
    }
    setIsDeleting(null);
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Bài viết</h1>
          <p className="text-muted-foreground text-sm mt-1">Tổng cộng {blogs.length} bài viết</p>
        </div>
        <Link href={ROUTES.ADMIN.BLOG_NEW} className="btn-primary flex items-center gap-2">
          <Plus size={16} /> Thêm bài viết
        </Link>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-700">Bài viết</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Chuyên mục</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Ngày tạo</th>
                <th className="px-6 py-4 font-semibold text-neutral-700 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Đang tải dữ liệu bài viết...
                  </td>
                </tr>
              ) : blogs.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Chưa có bài viết nào.
                  </td>
                </tr>
              ) : (
                blogs.map((blog) => (
                  <tr key={blog.id} className="hover:bg-muted/50 transition-colors group">
                    <td className="px-6 py-4 font-medium text-foreground">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-lg bg-neutral-100 relative overflow-hidden shrink-0 border border-neutral-200/50 flex items-center justify-center">
                          {blog.coverImage ? (
                            <img src={blog.coverImage} alt={blog.title} className="w-full h-full object-cover" />
                          ) : (
                            <FileText size={20} className="text-neutral-400" />
                          )}
                        </div>
                        <span className="font-semibold line-clamp-1">{blog.title}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {blog.category || '—'}
                    </td>
                    <td className="px-6 py-4">
                      {blog.published ? (
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-green-50 text-green-600">Công khai</span>
                      ) : (
                        <span className="text-xs px-2.5 py-1 rounded-full font-medium bg-gray-100 text-gray-600">Bản nháp</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(blog.createdAt), 'dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Link 
                          href={ROUTES.ADMIN.BLOG_EDIT(blog.id)}
                          className="p-2 hover:bg-white rounded shadow-sm border border-transparent hover:border-border text-foreground transition-all"
                          title="Sửa"
                        >
                          <Edit size={16} />
                        </Link>
                        <button 
                          onClick={() => setDeletingBlog({ id: blog.id, title: blog.title })}
                          disabled={isDeleting === blog.id}
                          className="p-2 hover:bg-red-50 hover:text-red-600 rounded shadow-sm border border-transparent hover:border-red-100 text-muted-foreground transition-all"
                          title="Xóa"
                        >
                          {isDeleting === blog.id ? <Loader2 size={16} className="animate-spin" /> : <Trash2 size={16} />}
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <ConfirmModal
        isOpen={!!deletingBlog}
        title="Xác nhận xóa bài viết"
        message={`Bạn có chắc muốn xóa bài viết "${deletingBlog?.title}"? Hành động này không thể hoàn tác.`}
        confirmLabel="Xóa bài viết"
        cancelLabel="Quay lại"
        isDanger
        onConfirm={() => {
          if (deletingBlog) {
            handleDelete(deletingBlog.id);
            setDeletingBlog(null);
          }
        }}
        onCancel={() => setDeletingBlog(null)}
      />
    </div>
  );
}
