'use client';

import React, { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Filter, Eye, Truck, CheckCircle2, Clock, X, MapPin, Phone, User, Mail, Calendar, CreditCard, FileText, Globe, Package } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { toast } from 'sonner';
import { Suspense } from 'react';

interface DBOrder {
  id: string;
  customerName: string;
  customerPhone: string;
  customerEmail?: string;
  customerAddress: string;
  customerNote?: string;
  totalAmount: number;
  status: string;
  paymentMethod?: string;
  source?: string;
  items: Array<{
    id?: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }>;
  createdAt: string;
  updatedAt: string;
}

function OrdersAdminContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const page = Number(searchParams.get('page')) || 1;
  const statusFilter = searchParams.get('status') || 'all';
  const limit = 10;
  
  const [orders, setOrders] = useState<DBOrder[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOrder, setSelectedOrder] = useState<DBOrder | null>(null);
  
  // KPI Stats
  const [kpis, setKpis] = useState({
    new: 0,
    processing: 0,
    shipping: 0,
    completed: 0,
  });

  useEffect(() => {
    fetchOrders();
    fetchKPIs();
  }, [page, statusFilter]);

  const fetchKPIs = async () => {
    const { data } = await supabase.from('orders').select('status');
    if (data) {
      const counts = { new: 0, processing: 0, shipping: 0, completed: 0 };
      data.forEach((o: any) => {
        if (o.status in counts) {
          counts[o.status as keyof typeof counts] += 1;
        }
      });
      setKpis(counts);
    }
  };

  const fetchOrders = async () => {
    setIsLoading(true);
    const offset = (page - 1) * limit;
    
    let query = supabase
      .from('orders')
      .select('*', { count: 'exact' });

    if (statusFilter !== 'all') {
      query = query.eq('status', statusFilter);
    }

    const { data, count, error } = await query
      .order('createdAt', { ascending: false })
      .range(offset, offset + limit - 1);

    if (error) {
      toast.error('Lỗi khi tải dữ liệu đơn hàng');
    } else {
      setOrders((data as DBOrder[]) || []);
      setTotalCount(count || 0);
    }
    setIsLoading(false);
  };

  const updateFilter = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set(key, value);
    if (key !== 'page') params.set('page', '1');
    router.push(`/admin/don-hang?${params.toString()}`);
  };

  const updateOrderStatus = async (orderId: string, newStatus: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: newStatus })
      .eq('id', orderId);

    if (error) {
      toast.error('Cập nhật trạng thái thất bại');
    } else {
      toast.success('Cập nhật trạng thái thành công');
      fetchOrders();
      fetchKPIs();
      // Update state in modal if active
      if (selectedOrder && selectedOrder.id === orderId) {
        setSelectedOrder(prev => prev ? { ...prev, status: newStatus } : null);
      }
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'new': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-blue-100 text-blue-700 font-medium"><Clock size={12}/> Mới tiếp nhận</span>;
      case 'processing': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-amber-100 text-amber-700 font-medium"><Clock size={12}/> Đang chế tác</span>;
      case 'shipping': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-purple-100 text-purple-700 font-medium"><Truck size={12}/> Đang giao</span>;
      case 'completed': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-green-100 text-green-700 font-medium"><CheckCircle2 size={12}/> Đã hoàn thành</span>;
      case 'cancelled': 
        return <span className="flex items-center gap-1.5 px-2.5 py-1 text-xs rounded-full bg-red-100 text-red-700 font-medium">Đã hủy</span>;
      default: 
        return <span className="px-2 py-1 text-xs rounded-full bg-gray-100 text-gray-700 font-medium">Không rõ</span>;
    }
  };

  const totalPages = Math.ceil(totalCount / limit) || 1;

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Quản lý Đơn hàng</h1>
          <p className="text-sm text-muted-foreground mt-1">Tổng cộng {totalCount} đơn hàng</p>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
            <Clock size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase text-[10px]">Mới tiếp nhận</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{kpis.new}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center shrink-0">
            <Package size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase text-[10px]">Đang chế tác</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{kpis.processing}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center shrink-0">
            <Truck size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase text-[10px]">Đang giao hàng</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{kpis.shipping}</p>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-border shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <CheckCircle2 size={22} />
          </div>
          <div>
            <p className="text-xs text-muted-foreground font-medium uppercase text-[10px]">Đã hoàn thành</p>
            <p className="text-xl font-bold text-foreground mt-0.5">{kpis.completed}</p>
          </div>
        </div>
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
          <option value="new">Mới tiếp nhận</option>
          <option value="processing">Đang xử lý/Chế tác</option>
          <option value="shipping">Đang giao</option>
          <option value="completed">Đã hoàn thành</option>
          <option value="cancelled">Đã hủy</option>
        </select>
      </div>

      {/* Order List */}
      <div className="bg-white rounded-xl border border-border overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead className="bg-muted text-muted-foreground border-b border-border">
              <tr>
                <th className="px-6 py-4 font-semibold text-neutral-700">Khách hàng</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Ngày đặt</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Tổng tiền</th>
                <th className="px-6 py-4 font-semibold text-neutral-700">Trạng thái</th>
                <th className="px-6 py-4 font-semibold text-neutral-700 text-right">Hành động</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Đang tải dữ liệu đơn hàng...
                  </td>
                </tr>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-muted-foreground">
                    Không tìm thấy đơn hàng nào.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr key={order.id} className="hover:bg-muted/50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="font-semibold text-foreground">{order.customerName}</p>
                      <p className="text-xs text-muted-foreground">{order.customerPhone}</p>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                    </td>
                    <td className="px-6 py-4 font-bold text-foreground">
                      {Number(order.totalAmount).toLocaleString('vi-VN')} ₫
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(order.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-3">
                        <select 
                          className="text-xs border border-border rounded-lg px-2.5 py-1.5 bg-transparent focus:outline-none focus:ring-1 focus:ring-primary/20"
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value)}
                        >
                          <option value="new">Mới tiếp nhận</option>
                          <option value="processing">Đang chế tác</option>
                          <option value="shipping">Đang giao</option>
                          <option value="completed">Đã hoàn thành</option>
                          <option value="cancelled">Đã hủy</option>
                        </select>
                        <button 
                          onClick={() => setSelectedOrder(order)}
                          className="p-1.5 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          title="Xem chi tiết"
                        >
                          <Eye size={18} />
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

      {/* Modal chi tiết đơn hàng (Apple-Style) */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-[2rem] max-w-2xl w-full max-h-[90vh] overflow-hidden shadow-2xl border border-neutral-100 flex flex-col animate-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="px-8 py-6 border-b border-neutral-100 flex justify-between items-center bg-[#FBFBFD]">
              <div>
                <h3 className="text-xl font-bold text-neutral-900">Chi tiết đơn hàng</h3>
                <p className="text-xs text-neutral-500 font-mono mt-1">#{selectedOrder.id}</p>
              </div>
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="text-neutral-400 hover:text-neutral-600 p-2 rounded-full hover:bg-neutral-100 transition"
              >
                <X size={20} />
              </button>
            </div>

            {/* Body */}
            <div className="p-8 space-y-6 overflow-y-auto">
              
              {/* Delivery Information */}
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Thông tin giao nhận</h4>
                <div className="bg-[#F5F5F7] rounded-2xl p-5 space-y-3.5 border border-neutral-200/50">
                  <div className="flex items-center gap-3 text-neutral-700">
                    <User size={16} className="text-neutral-400 shrink-0" />
                    <span className="font-semibold text-neutral-900">{selectedOrder.customerName}</span>
                  </div>
                  <div className="flex items-center gap-3 text-neutral-700">
                    <Phone size={16} className="text-neutral-400 shrink-0" />
                    <a href={`tel:${selectedOrder.customerPhone}`} className="hover:text-primary transition underline font-medium">{selectedOrder.customerPhone}</a>
                  </div>
                  {selectedOrder.customerEmail && (
                    <div className="flex items-center gap-3 text-neutral-700">
                      <Mail size={16} className="text-neutral-400 shrink-0" />
                      <span>{selectedOrder.customerEmail}</span>
                    </div>
                  )}
                  <div className="flex items-start gap-3 text-neutral-700">
                    <MapPin size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                    <span>{selectedOrder.customerAddress}</span>
                  </div>
                  {selectedOrder.customerNote && (
                    <div className="flex items-start gap-3 text-neutral-700 pt-3 border-t border-neutral-200/60">
                      <FileText size={16} className="text-neutral-400 shrink-0 mt-0.5" />
                      <span className="italic text-neutral-600">Ghi chú: {selectedOrder.customerNote}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Items List */}
              <div>
                <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Sản phẩm đã đặt</h4>
                <div className="divide-y divide-neutral-100 border border-neutral-200/60 rounded-2xl overflow-hidden">
                  {selectedOrder.items && Array.isArray(selectedOrder.items) && selectedOrder.items.length > 0 ? (
                    selectedOrder.items.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4 p-4 hover:bg-neutral-50/50 transition">
                        <div className="w-16 h-16 rounded-xl bg-[#F5F5F7] relative overflow-hidden shrink-0 border border-neutral-200/50 flex items-center justify-center">
                          {item.image ? (
                            <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="text-neutral-300"><Package size={24} /></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h5 className="font-semibold text-neutral-900 text-sm line-clamp-1">{item.name}</h5>
                          <p className="text-xs text-neutral-500 mt-1">Đơn giá: {Number(item.price).toLocaleString('vi-VN')} ₫</p>
                        </div>
                        <div className="text-right shrink-0">
                          <p className="text-sm font-bold text-neutral-900">{Number(item.price * item.quantity).toLocaleString('vi-VN')} ₫</p>
                          <p className="text-xs text-neutral-500 mt-1">SL: x{item.quantity}</p>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="p-6 text-center text-neutral-400 text-sm flex flex-col items-center gap-2">
                      <Package size={28} />
                      Không tìm thấy danh sách sản phẩm
                    </div>
                  )}
                </div>
              </div>

              {/* Payment & System info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Chi tiết thanh toán</h4>
                  <div className="bg-[#F5F5F7] rounded-2xl p-5 space-y-3.5 border border-neutral-200/50">
                    <div className="flex justify-between text-sm">
                      <span className="text-neutral-500">Phương thức:</span>
                      <span className="font-semibold text-neutral-800 uppercase">
                        {selectedOrder.paymentMethod === 'cod' ? 'Thanh toán COD' : selectedOrder.paymentMethod === 'banking' ? 'Chuyển khoản' : selectedOrder.paymentMethod || 'COD'}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm pt-2.5 border-t border-neutral-200">
                      <span className="text-neutral-500 font-semibold">Tổng cộng:</span>
                      <span className="font-bold text-lg text-[#B8860B]">{Number(selectedOrder.totalAmount).toLocaleString('vi-VN')} ₫</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-3">Thông tin đơn hàng</h4>
                  <div className="bg-[#F5F5F7] rounded-2xl p-5 space-y-3 border border-neutral-200/50 text-sm">
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Nguồn đơn:</span>
                      <span className="font-semibold text-neutral-800">
                        {selectedOrder.source === 'order_form' ? 'Đặt hàng nhanh' :
                         selectedOrder.source === 'contact_form' ? 'Form liên hệ' :
                         selectedOrder.source === 'zalo' ? 'Từ Zalo' :
                         selectedOrder.source === 'phone' ? 'Từ Điện thoại' : selectedOrder.source || 'Trực tiếp'}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-neutral-500">Ngày đặt:</span>
                      <span className="font-semibold text-neutral-800">{new Date(selectedOrder.createdAt).toLocaleString('vi-VN')}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-neutral-500">Trạng thái:</span>
                      <span>{getStatusBadge(selectedOrder.status)}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-8 py-5 border-t border-neutral-100 bg-[#FBFBFD] flex justify-end gap-3">
              <button 
                onClick={() => setSelectedOrder(null)} 
                className="px-6 py-2.5 bg-white border border-neutral-200 rounded-xl text-neutral-700 font-bold hover:bg-neutral-50 transition text-sm shadow-sm"
              >
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function OrdersAdminPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-muted-foreground">Đang tải...</div>}>
      <OrdersAdminContent />
    </Suspense>
  );
}
