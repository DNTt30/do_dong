'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Phone, MessageCircle, CheckCircle, Loader2, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { CONTACT_INFO } from '@/constants/contact';
import { supabase } from '@/lib/supabase';

const PRODUCT_CATEGORIES = [
  'Đỉnh đồng',
  'Lư hương đồng',
  'Bộ Tam Sự',
  'Bộ Ngũ Sự',
  'Chuông đồng',
  'Tượng đồng',
  'Trống đồng',
  'Đồ phong thủy',
  'Quà tặng đồng',
  'Sản phẩm theo yêu cầu',
];

const schema = z.object({
  customerName: z.string().min(2, 'Vui lòng nhập họ tên (ít nhất 2 ký tự)'),
  customerPhone: z
    .string()
    .min(9, 'Số điện thoại không hợp lệ')
    .regex(/^[0-9+\s-]+$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  customerAddress: z.string().min(5, 'Vui lòng nhập địa chỉ nhận hàng'),
  productInterest: z.string().min(1, 'Vui lòng chọn sản phẩm quan tâm'),
  quantity: z.string().optional(),
  budget: z.string().optional(),
  customerNote: z.string().optional(),
});

type FormData = z.infer<typeof schema>;

export default function OrderForm({ productName }: { productName?: string }) {
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      productInterest: productName ?? '',
    },
  });

  const onSubmit = async (data: FormData) => {
    setIsLoading(true);
    setError(null);
    try {
      const orderPayload = {
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        customerEmail: data.customerEmail || null,
        customerAddress: data.customerAddress,
        customerNote: [
          `Sản phẩm quan tâm: ${data.productInterest}`,
          data.quantity ? `Số lượng: ${data.quantity}` : '',
          data.budget ? `Ngân sách: ${data.budget}` : '',
          data.customerNote ? `Ghi chú: ${data.customerNote}` : '',
        ]
          .filter(Boolean)
          .join('\n'),
        status: 'pending',
        source: 'order_form',
        totalAmount: 0,
        items: [],
      };

      const { error: supabaseError } = await supabase.from('orders').insert([orderPayload]);
      if (supabaseError) throw supabaseError;

      setSubmitted(true);
      reset();
    } catch (err) {
      console.error('Order form error:', err);
      setError('Có lỗi xảy ra. Vui lòng gọi trực tiếp hoặc nhắn Zalo.');
    } finally {
      setIsLoading(false);
    }
  };

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center text-center py-16 px-8"
      >
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mb-6">
          <CheckCircle size={40} className="text-green-500" />
        </div>
        <h3 className="text-2xl font-serif font-bold text-black mb-3">
          Đặt hàng thành công!
        </h3>
        <p className="text-gray-500 mb-6 max-w-sm leading-relaxed">
          Chúng tôi đã nhận được yêu cầu của bạn. Nhân viên sẽ liên hệ trong vòng{' '}
          <strong className="text-black">30 phút</strong> để xác nhận đơn hàng.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <a
            href={`tel:${CONTACT_INFO.phone}`}
            className="flex items-center gap-2 bg-[#B8860B] text-white px-6 py-3 rounded-full font-semibold hover:bg-[#9a7009] transition-colors"
          >
            <Phone size={16} />
            Gọi ngay để xác nhận
          </a>
          <button
            onClick={() => setSubmitted(false)}
            className="px-6 py-3 rounded-full border border-gray-200 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Đặt thêm đơn khác
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      {/* Row 1: Name + Phone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Họ và tên <span className="text-red-500">*</span>
          </label>
          <input
            {...register('customerName')}
            placeholder="Nguyễn Văn A"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm"
          />
          {errors.customerName && (
            <p className="text-red-500 text-xs mt-1">{errors.customerName.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <input
            {...register('customerPhone')}
            placeholder="0912 345 678"
            type="tel"
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm"
          />
          {errors.customerPhone && (
            <p className="text-red-500 text-xs mt-1">{errors.customerPhone.message}</p>
          )}
        </div>
      </div>

      {/* Row 2: Product + Quantity */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Sản phẩm quan tâm <span className="text-red-500">*</span>
          </label>
          <div className="relative">
            <select
              {...register('productInterest')}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm appearance-none bg-white"
            >
              <option value="">-- Chọn sản phẩm --</option>
              {PRODUCT_CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            <ChevronDown
              size={16}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
            />
          </div>
          {errors.productInterest && (
            <p className="text-red-500 text-xs mt-1">{errors.productInterest.message}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1.5">
            Số lượng
          </label>
          <input
            {...register('quantity')}
            placeholder="Ví dụ: 1 bộ, 2 chiếc..."
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm"
          />
        </div>
      </div>

      {/* Row 3: Budget */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Ngân sách dự kiến
        </label>
        <div className="relative">
          <select
            {...register('budget')}
            className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm appearance-none bg-white"
          >
            <option value="">-- Chọn mức ngân sách --</option>
            <option value="Dưới 5 triệu">Dưới 5 triệu đồng</option>
            <option value="5 - 15 triệu">5 – 15 triệu đồng</option>
            <option value="15 - 30 triệu">15 – 30 triệu đồng</option>
            <option value="30 - 50 triệu">30 – 50 triệu đồng</option>
            <option value="Trên 50 triệu">Trên 50 triệu đồng</option>
          </select>
          <ChevronDown
            size={16}
            className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
          />
        </div>
      </div>

      {/* Row 4: Address */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Địa chỉ nhận hàng <span className="text-red-500">*</span>
        </label>
        <input
          {...register('customerAddress')}
          placeholder="Số nhà, đường, phường/xã, quận/huyện, tỉnh thành"
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm"
        />
        {errors.customerAddress && (
          <p className="text-red-500 text-xs mt-1">{errors.customerAddress.message}</p>
        )}
      </div>

      {/* Row 5: Note */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1.5">
          Ghi chú thêm
        </label>
        <textarea
          {...register('customerNote')}
          placeholder="Kích thước đặc biệt, khắc chữ, yêu cầu riêng..."
          rows={3}
          className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-[#B8860B] focus:ring-2 focus:ring-[#B8860B]/20 outline-none transition-all text-sm resize-none"
        />
      </div>

      {/* Error message */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-red-50 border border-red-200 rounded-xl px-4 py-3 text-red-600 text-sm"
          >
            {error}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Submit */}
      <div className="flex flex-col sm:flex-row gap-3 pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="flex-1 flex items-center justify-center gap-2 bg-[#B8860B] text-white py-4 rounded-full font-semibold text-base hover:bg-[#9a7009] transition-all duration-300 disabled:opacity-60 disabled:cursor-not-allowed hover:scale-[1.02] shadow-[0_4px_20px_rgba(184,134,11,0.3)]"
        >
          {isLoading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              Đang gửi...
            </>
          ) : (
            'Gửi đơn đặt hàng'
          )}
        </button>
        <a
          href={CONTACT_INFO.zaloLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 border border-[#0068FF] text-[#0068FF] py-4 px-6 rounded-full font-semibold text-base hover:bg-[#0068FF] hover:text-white transition-all duration-300"
        >
          <MessageCircle size={18} />
          Nhắn Zalo
        </a>
      </div>

      <p className="text-xs text-gray-400 text-center">
        Chúng tôi sẽ liên hệ lại trong vòng 30 phút · Không tính phí tư vấn
      </p>
    </form>
  );
}
