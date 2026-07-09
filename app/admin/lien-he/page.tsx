'use client';

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import { Phone, Mail, User, Clock, CheckCircle2, XCircle, AlertCircle, Loader2, Filter } from 'lucide-react';
import { toast } from 'sonner';
import { format } from 'date-fns';

export default function ContactsAdminPage() {
  const [contacts, setContacts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => {
    fetchContacts();
  }, [statusFilter]);

  const fetchContacts = async () => {
    setIsLoading(true);
    let query = supabase
      .from('contacts')
      .select('*')
      .order('createdAt', { ascending: false });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, error } = await query;

    if (error) {
      toast.error('Lỗi khi tải danh sách liên hệ');
    } else {
      setContacts(data || []);
    }
    setIsLoading(false);
  };

  const updateStatus = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from('contacts')
      .update({ status: newStatus })
      .eq('id', id);

    if (error) {
      toast.error('Cập nhật thất bại');
    } else {
      toast.success('Đã cập nhật trạng thái');
      setContacts(prev => prev.map(c => c.id === id ? { ...c, status: newStatus } : c));
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-blue-100 text-blue-700"><AlertCircle size={12}/> Chờ xử lý</span>;
      case 'contacted': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-amber-100 text-amber-700"><Clock size={12}/> Đã liên hệ</span>;
      case 'converted': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-green-100 text-green-700"><CheckCircle2 size={12}/> Đã chốt đơn</span>;
      case 'dead': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-gray-200 text-gray-700"><XCircle size={12}/> Không thành công</span>;
      default: 
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700">Không rõ</span>;
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Khách hàng / Liên hệ</h1>
          <p className="text-sm text-muted-foreground mt-1">Danh sách người dùng cần tư vấn, báo giá</p>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-border flex flex-wrap gap-4 items-center mb-6 shadow-sm">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Filter size={16} className="text-muted-foreground" /> Lọc theo:
        </div>
        
        <select 
          className="text-sm border border-border rounded-lg px-3 py-2 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">Tất cả trạng thái</option>
          <option value="new">Mới - Chờ tư vấn</option>
          <option value="contacted">Đang chăm sóc</option>
          <option value="converted">Đã chốt thành đơn</option>
          <option value="dead">Khách hủy / Spam</option>
        </select>
      </div>

      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground">
              <tr>
                <th className="px-6 py-4 font-medium">Khách hàng</th>
                <th className="px-6 py-4 font-medium">Yêu cầu tư vấn</th>
                <th className="px-6 py-4 font-medium">Ngày gửi</th>
                <th className="px-6 py-4 font-medium">Trạng thái</th>
                <th className="px-6 py-4 font-medium text-right">Chuyển trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center">
                    <Loader2 className="animate-spin text-muted-foreground w-8 h-8 mx-auto" />
                  </td>
                </tr>
              ) : contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-muted-foreground">
                    Chưa có lượt liên hệ nào.
                  </td>
                </tr>
              ) : (
                contacts.map((contact) => (
                  <tr key={contact.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground flex items-center gap-2 mb-1">
                        <User size={14} className="text-muted-foreground" /> {contact.name}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-2 mb-1">
                        <Phone size={14} /> {contact.phone}
                      </p>
                      {contact.email && (
                        <p className="text-xs text-muted-foreground flex items-center gap-2">
                          <Mail size={14} /> {contact.email}
                        </p>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-muted-foreground line-clamp-3 max-w-sm whitespace-pre-wrap">
                        {contact.note || <span className="italic">Không có nội dung</span>}
                      </p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {format(new Date(contact.createdAt), 'HH:mm - dd/MM/yyyy')}
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(contact.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <select 
                        className="text-xs border border-border rounded-md px-2 py-1.5 bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/30"
                        value={contact.status}
                        onChange={(e) => updateStatus(contact.id, e.target.value)}
                      >
                        <option value="new">Mới</option>
                        <option value="contacted">Đã liên hệ</option>
                        <option value="converted">Đã chốt đơn</option>
                        <option value="dead">Hủy</option>
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
