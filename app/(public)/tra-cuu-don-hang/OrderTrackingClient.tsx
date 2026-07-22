'use client';

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import { Search, Package, Clock, CheckCircle, Truck, XCircle, Loader2, Edit3, Trash2, HelpCircle } from 'lucide-react';
import { formatPrice } from '@/utils/format';
import { toast } from 'sonner';
import ConfirmModal from '@/components/common/ConfirmModal';
import Image from 'next/image';

const statusMap: Record<string, { label: string; icon: React.ReactNode; color: string }> = {
  pending: { label: 'Chờ xác nhận', icon: <Clock size={18} />, color: 'text-yellow-600 bg-yellow-50' },
  processing: { label: 'Đang xử lý', icon: <Package size={18} />, color: 'text-blue-600 bg-blue-50' },
  shipping: { label: 'Đang giao hàng', icon: <Truck size={18} />, color: 'text-purple-600 bg-purple-50' },
  completed: { label: 'Hoàn thành', icon: <CheckCircle size={18} />, color: 'text-green-600 bg-green-50' },
  cancelled: { label: 'Đã hủy', icon: <XCircle size={18} />, color: 'text-red-600 bg-red-50' },
};

export default function OrderTrackingClient() {
  const [phone, setPhone] = useState('');
  const [orders, setOrders] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasSearched, setHasSearched] = useState(false);
  const [showSearchForm, setShowSearchForm] = useState(false);
  
  // Client-side Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 5;

  // Inline editing states for address
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [editingAddressValue, setEditingAddressValue] = useState('');
  
  // Cancellation confirm modal state
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);

  // Tự động tìm số điện thoại đã lưu và fetch đơn hàng
  useEffect(() => {
    try {
      const savedPhone = localStorage.getItem('customerPhone');
      if (savedPhone) {
        setPhone(savedPhone);
        fetchOrders(savedPhone);
      } else {
        setIsLoading(false);
        setShowSearchForm(true);
      }
    } catch (e) {
      console.error('Error reading localStorage', e);
      setIsLoading(false);
      setShowSearchForm(true);
    }
  }, []);

  const fetchOrders = async (phoneNumber: string) => {
    setIsLoading(true);
    setHasSearched(true);
    
    try {
      const response = await fetch(`/api/orders/track?phone=${encodeURIComponent(phoneNumber.trim())}`);
      
      if (!response.ok) {
        if (response.status === 429) {
          throw new Error('Bạn thao tác quá nhanh, vui lòng thử lại sau 1 phút.');
        }
        throw new Error('Lỗi khi tải danh sách đơn hàng');
      }

      const fetchedOrders = await response.json();
      setOrders(fetchedOrders);
      setCurrentPage(1); // Reset page to 1
      
      if (fetchedOrders.length === 0) {
        setShowSearchForm(true);
      } else {
        setShowSearchForm(false);
      }
    } catch (err: any) {
      console.error('Error fetching orders:', err);
      toast.error(err.message || 'Lỗi khi tải danh sách đơn hàng');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone.trim()) return;
    
    // Lưu lại số điện thoại nếu họ tự gõ
    try {
      localStorage.setItem('customerPhone', phone.trim());
    } catch (err) {}

    await fetchOrders(phone);
  };

  const handleCancelOrder = async (orderId: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.from('orders').update({ status: 'cancelled' }).eq('id', orderId);
      if (error) throw error;
      setOrders(orders.map(o => o.id === orderId ? { ...o, status: 'cancelled' } : o));
      toast.success('Hủy đơn hàng thành công.');
    } catch (err) {
      console.error(err);
      toast.error('Có lỗi xảy ra khi hủy đơn.');
    } finally {
      setIsLoading(false);
    }
  };

  // handleSaveAddress removed for security reasons (Phase 1)

  if (isLoading && !hasSearched) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <Loader2 size={40} className="animate-spin mb-4 text-[#B8860B]" />
        <p>Đang tải danh sách đơn hàng...</p>
      </div>
    );
  }

  // Calculate current orders to display
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orders.slice(indexOfFirstOrder, indexOfLastOrder);
  const totalPages = Math.ceil(orders.length / ordersPerPage);

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10 relative">
      
      {showSearchForm && (
        <div className="space-y-12">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Nhập số điện thoại của bạn..."
              className="flex-1 px-5 py-4 bg-[#F5F5F7] text-black rounded-xl outline-none focus:ring-2 focus:ring-[#B8860B] transition text-lg font-medium"
              required
            />
            <button
              type="submit"
              disabled={isLoading || !phone.trim()}
              className="px-8 py-4 bg-[#B8860B] text-white font-bold rounded-xl hover:bg-[#9a7009] transition disabled:opacity-50 flex items-center justify-center gap-2 min-w-[160px]"
            >
              {isLoading ? <Loader2 size={20} className="animate-spin" /> : <><Search size={20} /> Tra cứu</>}
            </button>
          </form>

          {/* Guideline section to prevent empty-looking page */}
          <div className="border-t border-neutral-100 pt-10 max-w-4xl mx-auto">
            <h3 className="text-lg font-bold text-neutral-900 mb-8 text-center flex items-center justify-center gap-2">
              <HelpCircle size={20} className="text-[#B8860B]" /> Hướng dẫn tra cứu & Quy trình nhận hàng
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/45 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center mb-4">
                  <Search size={22} />
                </div>
                <h4 className="font-bold text-black mb-2 text-base">1. Nhập Số Điện Thoại</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Sử dụng số điện thoại đặt hàng của bạn để tra cứu nhanh toàn bộ lịch sử đơn hàng đã giao dịch.</p>
              </div>
              
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/45 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center mb-4">
                  <Clock size={22} />
                </div>
                <h4 className="font-bold text-black mb-2 text-base">2. Theo Dõi Tiến Độ</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Theo dõi chi tiết quy trình chế tác, gò khắc hoa văn từ nghệ nhân và trạng thái đóng gói giao đi.</p>
              </div>
              
              <div className="bg-[#F5F5F7] p-6 rounded-2xl border border-neutral-200/45 flex flex-col items-center text-center">
                <div className="w-12 h-12 rounded-full bg-[#B8860B]/10 text-[#B8860B] flex items-center justify-center mb-4">
                  <Truck size={22} />
                </div>
                <h4 className="font-bold text-black mb-2 text-base">3. Đồng Kiểm Khi Nhận</h4>
                <p className="text-gray-500 text-sm font-light leading-relaxed">Quý khách hoàn toàn được quyền mở hộp kiểm tra sản phẩm trước khi thanh toán cho bên vận chuyển.</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {hasSearched && !isLoading && (
        <div className="space-y-6">
          {!showSearchForm && (
            <div className="flex justify-between items-end border-b border-gray-100 pb-4">
              <h2 className="text-xl font-bold text-neutral-900">
                Có {orders.length} đơn hàng được tìm thấy
              </h2>
              <button onClick={() => setShowSearchForm(true)} className="text-[#B8860B] text-sm hover:underline flex items-center gap-1 font-semibold font-bold">
                <Search size={14} /> Tra cứu số khác
              </button>
            </div>
          )}
          
          {orders.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Package size={48} className="mx-auto text-gray-300 mb-4" />
              <p>Chưa có đơn hàng nào được đặt.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {currentOrders.map((order) => {
                const statusInfo = statusMap[order.status] || statusMap.pending;
                const isPending = order.status === 'pending';
                
                return (
                  <div key={order.id} className="border border-gray-200 rounded-xl overflow-hidden relative bg-white">
                    {/* Header đơn hàng */}
                    <div className="bg-gray-50 px-6 py-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-200">
                      <div>
                        <p className="text-sm text-gray-500">Mã đơn hàng</p>
                        <p className="font-mono font-bold text-black">#{order.id.split('-')[0].toUpperCase()}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Ngày đặt</p>
                        <p className="font-medium text-black">
                          {new Date(order.createdAt).toLocaleDateString('vi-VN')}
                        </p>
                      </div>
                      <div className={`px-4 py-2 rounded-full flex items-center gap-2 text-sm font-medium ${statusInfo.color}`}>
                        {statusInfo.icon}
                        {statusInfo.label}
                      </div>
                    </div>

                    {/* Danh sách sản phẩm */}
                    <div className="p-6">
                      <div className="space-y-4">
                        {order.items && order.items.map((item: any, idx: number) => (
                          <div key={idx} className="flex gap-4 items-center">
                            <div className="w-20 h-20 rounded-lg bg-[#F5F5F7] relative overflow-hidden shrink-0 border border-gray-100">
                              {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover mix-blend-multiply" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-300"><Package size={24} /></div>
                              )}
                            </div>
                            <div className="flex-1">
                              <h4 className="font-medium text-black line-clamp-2">{item.name}</h4>
                              <p className="text-gray-500 text-sm mt-1">Số lượng: {item.quantity}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="font-bold text-black">{formatPrice(item.price * item.quantity)}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Thông tin giao hàng & Actions */}
                      <div className="mt-6 pt-6 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-6">
                        <div className="flex-1 text-sm text-gray-600 space-y-2">
                          <p><strong className="text-black">Người nhận:</strong> {order.customerName}</p>
                          
                          <div className="flex items-start gap-2">
                            <p><strong className="text-black">Giao đến:</strong> {order.customerAddress}</p>
                            {/* Chức năng sửa địa chỉ tạm khoá ở Phase 1 */}
                          </div>
                        </div>
                        <div className="text-right flex flex-col items-end">
                          <p className="text-gray-500 mb-1">Tổng tiền thanh toán</p>
                          <p className="text-2xl font-bold text-[#B8860B] mb-4">{formatPrice(order.totalAmount)}</p>
                          
                          {isPending && (
                            <button
                              onClick={() => setCancellingOrderId(order.id)}
                              className="text-red-500 hover:text-red-700 flex items-center gap-1 text-sm font-semibold bg-red-50 hover:bg-red-100 px-4 py-2.5 rounded-xl transition"
                            >
                              <Trash2 size={16} /> Hủy đơn hàng
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Client Pagination Controls */}
              {totalPages > 1 && (
                <div className="flex items-center justify-between pt-6 border-t border-gray-100 bg-[#FBFBFD] px-6 py-4 rounded-xl border border-gray-200/50 shadow-sm">
                  <span className="text-sm text-neutral-500 font-medium">
                    Trang {currentPage} / {totalPages}
                  </span>
                  <div className="flex gap-2">
                    <button
                      disabled={currentPage === 1}
                      onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                      className="px-4.5 py-2 border border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold transition disabled:opacity-50"
                    >
                      Trước
                    </button>
                    <button
                      disabled={currentPage === totalPages}
                      onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                      className="px-4.5 py-2 border border-neutral-200 rounded-xl bg-white hover:bg-neutral-50 text-neutral-700 text-sm font-semibold transition disabled:opacity-50"
                    >
                      Sau
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
      
      {isLoading && hasSearched && (
        <div className="absolute inset-0 bg-white/50 backdrop-blur-sm flex items-center justify-center z-10 rounded-2xl">
          <Loader2 size={40} className="animate-spin text-[#B8860B]" />
        </div>
      )}

      {/* Custom Confirmation Dialog */}
      <ConfirmModal
        isOpen={!!cancellingOrderId}
        title="Xác nhận hủy đơn"
        message="Bạn có chắc chắn muốn hủy đơn hàng này không? Hành động này không thể hoàn tác và đơn của bạn sẽ bị hủy bỏ."
        confirmLabel="Hủy đơn hàng"
        cancelLabel="Quay lại"
        isDanger
        onConfirm={() => {
          if (cancellingOrderId) {
            handleCancelOrder(cancellingOrderId);
            setCancellingOrderId(null);
          }
        }}
        onCancel={() => setCancellingOrderId(null)}
      />
    </div>
  );
}

