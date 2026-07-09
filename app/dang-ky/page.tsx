'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, UserPlus } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';

// Define register schema here or import from validators
const registerSchema = z.object({
  name: z.string().min(2, 'Tên phải có ít nhất 2 ký tự').max(50, 'Tên quá dài'),
  phone: z.string().min(10, 'Số điện thoại không hợp lệ').max(15, 'Số điện thoại không hợp lệ'),
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

type RegisterSchema = z.infer<typeof registerSchema>;

export default function CustomerRegisterPage() {
  const router = useRouter();
  const { register: registerUser } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterSchema>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = async (data: RegisterSchema) => {
    setIsLoading(true);
    try {
      await registerUser(data.email, data.password, { name: data.name, phone: data.phone });
      toast.success('Đăng ký thành công! Hãy tiếp tục mua sắm.');
      router.push(ROUTES.HOME);
    } catch (error: any) {
      if (error?.message?.includes('User already registered')) {
        toast.error('Email này đã được sử dụng.');
      } else {
        toast.error('Có lỗi xảy ra khi đăng ký. Vui lòng thử lại sau.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card border border-border p-8 my-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-primary mb-2">Đăng Ký Tài Khoản</h1>
            <p className="text-sm text-muted-foreground">Tạo tài khoản để đặt hàng dễ dàng hơn</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                Họ và Tên
              </label>
              <input
                id="name"
                type="text"
                placeholder="Nguyễn Văn A"
                {...register('name')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>}
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                Số điện thoại
              </label>
              <input
                id="phone"
                type="tel"
                placeholder="0912345678"
                {...register('phone')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.phone && <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>}
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="nguyenvana@gmail.com"
                {...register('email')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="Ít nhất 6 ký tự"
                {...register('password')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-3.5 mt-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Đang xử lý...
                </>
              ) : (
                <>
                  <UserPlus size={18} />
                  Đăng ký ngay
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Đã có tài khoản?{' '}
            <Link href={ROUTES.AUTH.LOGIN} className="text-primary font-medium hover:underline">
              Đăng nhập
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
