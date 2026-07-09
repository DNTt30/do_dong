'use client';

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { CheckCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { supabase } from '@/lib/supabase';
import type { Product } from '@/types/product.types';
import { formatPrice } from '@/utils/format';
import Image from 'next/image';
import Link from 'next/link';

const schema = z.object({
  customerName: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  customerPhone: z
    .string()
    .min(9, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+\s-]+$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  province: z.string().min(1, 'Vui lòng chọn Tỉnh/Thành phố'),
  district: z.string().min(1, 'Vui lòng chọn Quận/Huyện'),
  ward: z.string().min(1, 'Vui lòng chọn Phường/Xã'),
  addressDetail: z.string().min(5, 'Vui lòng nhập số nhà, tên đường'),
  paymentMethod: z.enum(['cash', 'transfer', 'cod'], { required_error: 'Vui lòng chọn phương thức thanh toán' }),
  customerNote: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

interface OrderFormProps {
  initialProduct: Product | null;
  initialQty: number;
}

export default function OrderForm({ initialProduct, initialQty }: OrderFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [provinces, setProvinces] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);
  const [wards, setWards] = useState<any[]>([]);

  // If there's a product, we calculate total based on salePrice or price
  const isContactOnly = initialProduct ? (initialProduct.contactForPrice || !initialProduct.price || initialProduct.price === 0) : false;
  const unitPrice = initialProduct ? (initialProduct.salePrice || initialProduct.price || 0) : 0;
  const totalAmount = isContactOnly ? 0 : unitPrice * initialQty;

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
    setValue,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      paymentMethod: 'cod'
    }
  });

  const watchProvince = watch('province');
  const watchDistrict = watch('district');

  // Load provinces on mount
  useEffect(() => {
    fetch('https://provinces.open-api.vn/api/p/')
      .then(res => res.json())
      .then(data => setProvinces(data))
      .catch(err => console.error('Failed to fetch provinces', err));
  }, []);

  // Load districts when province changes
  useEffect(() => {
    if (watchProvince) {
      fetch(`https://provinces.open-api.vn/api/p/${watchProvince}?depth=2`)
        .then(res => res.json())
        .then(data => {
          setDistricts(data.districts || []);
          setValue('district', '');
          setValue('ward', '');
          setWards([]);
        })
        .catch(err => console.error('Failed to fetch districts', err));
    }
  }, [watchProvince, setValue]);

  // Load wards when district changes
  useEffect(() => {
    if (watchDistrict) {
      fetch(`https://provinces.open-api.vn/api/d/${watchDistrict}?depth=2`)
        .then(res => res.json())
        .then(data => {
          setWards(data.wards || []);
          setValue('ward', '');
        })
        .catch(err => console.error('Failed to fetch wards', err));
    }
  }, [watchDistrict, setValue]);

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const paymentNames = {
        cash: 'Thanh toán bằng tiền mặt',
        transfer: 'Chuyển khoản ngân hàng',
        cod: 'Thanh toán khi nhận hàng'
      };

      const pName = provinces.find(p => p.code.toString() === data.province)?.name || '';
      const dName = districts.find(d => d.code.toString() === data.district)?.name || '';
      const wName = wards.find(w => w.code.toString() === data.ward)?.name || '';
      
      const fullAddress = `${data.addressDetail}, ${wName}, ${dName}, ${pName}`;

      const orderPayload = {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        customerAddress: fullAddress,
        customerNote: [
          `Phương thức thanh toán: ${paymentNames[data.paymentMethod]}`,
          data.customerNote ? `Ghi chú: ${data.customerNote}` : '',
        ].filter(Boolean).join('\n'),
        status: 'pending',
        source: 'checkout',
        totalAmount: totalAmount,
        items: initialProduct ? [{
          productId: initialProduct.id,
          name: initialProduct.name,
          quantity: initialQty,
          price: unitPrice,
          image: initialProduct.images?.[0] || null
        }] : [],
      };

      const { error: supabaseError } = await supabase.from('orders').insert([orderPayload]);
      if (supabaseError) throw supabaseError;

      // Lưu lại số điện thoại vào localStorage để tra cứu tự động
      try {
        if (typeof window !== 'undefined') {
          localStorage.setItem('customerPhone', data.customerPhone);
        }
      } catch (e) {
        console.error('Could not save phone to localStorage');
      }

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error('Order form error:', err);
      setError('Có lỗi xảy ra khi đặt hàng. Vui lòng liên hệ trực tiếp.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8 bg-white rounded-3xl shadow-sm border border-gray-100"
      >
        <div className="w-24 h-24 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle size={48} className="text-green-500" />
        </div>
        <h3 className="text-3xl font-serif font-bold text-black mb-4">
          Đặt hàng thành công!
        </h3>
        <p className="text-gray-600 mb-8 max-w-md leading-relaxed text-lg">
          Cảm ơn bạn đã tin tưởng Đồ Đồng Nam Định. Chúng tôi sẽ liên hệ lại với bạn qua số điện thoại đã cung cấp để xác nhận đơn hàng.
        </p>
        <div className="flex gap-4">
          <Link
            href="/tra-cuu-don-hang"
            className="px-8 py-4 rounded-full bg-[#B8860B] text-white font-medium hover:bg-[#9a7009] transition-colors"
          >
            Theo dõi đơn hàng
          </Link>
          <Link
            href="/"
            className="px-8 py-4 rounded-full bg-gray-100 text-black font-medium hover:bg-gray-200 transition-colors"
          >
            Về trang chủ
          </Link>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Cột trái: Form thông tin */}
      <div className="lg:col-span-7 bg-white rounded-2xl p-6 md:p-8 text-black shadow-sm border border-gray-100">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
          <span>💳</span> Thông tin khách hàng
        </h2>
        
        <form id="checkout-form" onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Họ tên*</label>
              <input
                {...register('customerName')}
                className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition"
              />
              {errors.customerName && <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Điện thoại*</label>
              <input
                {...register('customerPhone')}
                type="tel"
                className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition"
              />
              {errors.customerPhone && <p className="text-red-500 text-xs mt-1">{errors.customerPhone.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Email</label>
            <input
              {...register('customerEmail')}
              type="email"
              className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition"
            />
            {errors.customerEmail && <p className="text-red-500 text-xs mt-1">{errors.customerEmail.message}</p>}
          </div>

          {/* Vùng chọn địa chỉ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Tỉnh/Thành phố*</label>
              <select
                {...register('province')}
                className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition appearance-none"
              >
                <option value="">Chọn Tỉnh/Thành</option>
                {provinces.map((p) => (
                  <option key={p.code} value={p.code}>{p.name}</option>
                ))}
              </select>
              {errors.province && <p className="text-red-500 text-xs mt-1">{errors.province.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Quận/Huyện*</label>
              <select
                {...register('district')}
                disabled={!watchProvince}
                className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition appearance-none disabled:opacity-50"
              >
                <option value="">Chọn Quận/Huyện</option>
                {districts.map((d) => (
                  <option key={d.code} value={d.code}>{d.name}</option>
                ))}
              </select>
              {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district.message}</p>}
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-600 mb-2">Phường/Xã*</label>
              <select
                {...register('ward')}
                disabled={!watchDistrict}
                className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition appearance-none disabled:opacity-50"
              >
                <option value="">Chọn Phường/Xã</option>
                {wards.map((w) => (
                  <option key={w.code} value={w.code}>{w.name}</option>
                ))}
              </select>
              {errors.ward && <p className="text-red-500 text-xs mt-1">{errors.ward.message}</p>}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Số nhà, tên đường*</label>
            <input
              {...register('addressDetail')}
              placeholder="Ví dụ: 123 Đường Nguyễn Trãi"
              className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition"
            />
            {errors.addressDetail && <p className="text-red-500 text-xs mt-1">{errors.addressDetail.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-3">Phương thức thanh toán*</label>
            <div className="space-y-3">
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="radio" value="cash" {...register('paymentMethod')} className="w-4 h-4 mt-1 text-[#B8860B] focus:ring-[#B8860B]" />
                <span className="text-gray-700 group-hover:text-black transition mt-0.5">Thanh toán bằng tiền mặt (Tại xưởng/Cửa hàng)</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="radio" value="transfer" {...register('paymentMethod')} className="w-4 h-4 mt-1 text-[#B8860B] focus:ring-[#B8860B]" />
                <span className="text-gray-700 group-hover:text-black transition mt-0.5">Chuyển khoản ngân hàng</span>
              </label>
              <label className="flex items-start gap-3 cursor-pointer group">
                <input type="radio" value="cod" {...register('paymentMethod')} className="w-4 h-4 mt-1 text-[#B8860B] focus:ring-[#B8860B]" />
                <div className="flex flex-col">
                  <span className="text-gray-700 group-hover:text-black transition">Nhận hàng thanh toán (Cần đặt cọc)</span>
                  <span className="text-xs text-gray-500 mt-1 max-w-sm">Vì đặc thù sản phẩm đồ đồng nặng và phí vận chuyển cao, xưởng yêu cầu cọc trước 10-20% để đảm bảo đơn hàng.</span>
                </div>
              </label>
            </div>
            {errors.paymentMethod && <p className="text-red-500 text-xs mt-1">{errors.paymentMethod.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">Ghi chú thêm</label>
            <textarea
              {...register('customerNote')}
              rows={3}
              className="w-full px-4 py-3 bg-[#F5F5F7] text-black rounded-lg outline-none focus:ring-2 focus:ring-[#B8860B] focus:bg-white transition resize-none"
            />
          </div>

          <AnimatePresence>
            {error && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }} className="bg-red-500/20 text-red-200 px-4 py-3 rounded-lg text-sm">
                {error}
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>

      {/* Cột phải: Giỏ hàng */}
      <div className="lg:col-span-5 bg-white rounded-2xl p-6 md:p-8 text-black shadow-sm border border-gray-100 sticky top-24">
        <h2 className="text-xl font-bold mb-6 flex items-center gap-2 border-b border-gray-200 pb-4">
          <span>🛒</span> Giỏ hàng
        </h2>
        
        <div className="flex justify-between text-sm font-medium text-gray-500 mb-4 pb-2 border-b border-gray-100">
          <span>Sản phẩm</span>
          <span>Thành tiền</span>
        </div>

        {initialProduct ? (
          <div className="flex justify-between items-center py-4 border-b border-gray-100">
            <div className="flex items-center gap-4 flex-1">
              <div className="w-16 h-16 rounded-lg bg-[#F5F5F7] relative overflow-hidden shrink-0 border border-gray-100">
                {initialProduct.images?.[0] && (
                  <Image src={initialProduct.images[0]} alt={initialProduct.name} fill className="object-cover mix-blend-multiply" />
                )}
              </div>
              <div>
                <p className="font-medium text-black line-clamp-2 pr-4">{initialProduct.name}</p>
              </div>
            </div>
            <div className="text-right shrink-0">
              <p className="text-gray-500 text-sm mb-1">{isContactOnly ? 'Liên hệ' : formatPrice(unitPrice)} <span className="text-gray-400">x {initialQty}</span></p>
              <p className={isContactOnly ? "text-red-500 font-bold" : "text-black font-bold"}>
                {isContactOnly ? 'Liên hệ' : formatPrice(unitPrice * initialQty)}
              </p>
            </div>
          </div>
        ) : (
          <div className="py-8 text-center text-gray-400">
            Chưa có sản phẩm nào.
          </div>
        )}

        <div className="flex justify-between items-center py-6">
          <span className="font-medium text-lg text-gray-700">Tổng tiền</span>
          <span className="text-2xl font-bold text-[#B8860B]">
            {isContactOnly ? '0 đ' : formatPrice(totalAmount)}
          </span>
        </div>

        <button
          form="checkout-form"
          type="submit"
          disabled={isLoading || !initialProduct}
          className="w-full bg-[#B8860B] text-white py-4 rounded-xl font-bold text-lg hover:bg-[#9a7009] transition-all disabled:opacity-50 flex items-center justify-center gap-2"
        >
          {isLoading ? <><Loader2 size={20} className="animate-spin" /> Đang xử lý...</> : 'Xác nhận đơn hàng'}
        </button>
      </div>
    </div>
  );
}
