'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, LogIn } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { loginSchema, type LoginSchema } from '@/utils/validators';

export default function CustomerLoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    setIsLoading(true);
    try {
      await login(data.email, data.password);
      toast.success('Đăng nhập thành công!');
      router.push(ROUTES.HOME);
    } catch (error: any) {
      if (error?.message?.includes('Email not confirmed')) {
        toast.error('Tài khoản chưa được xác thực email. Hãy kiểm tra hộp thư của bạn hoặc liên hệ Admin.');
      } else {
        toast.error('Email hoặc mật khẩu không đúng.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[70vh] bg-gradient-to-br from-primary/5 via-background to-secondary/5 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-card border border-border p-8">
          <div className="text-center mb-8">
            <h1 className="font-serif text-2xl font-bold text-primary mb-2">Đăng Nhập</h1>
            <p className="text-sm text-muted-foreground">Chào mừng bạn trở lại với Đồ Đồng Nam Định</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                Email
              </label>
              <input
                id="email"
                type="email"
                placeholder="Ví dụ: nguyenvanan@gmail.com"
                {...register('email')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
              )}
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-foreground mb-1.5">
                Mật khẩu
              </label>
              <input
                id="password"
                type="password"
                placeholder="••••••••"
                {...register('password')}
                className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <LogIn size={18} />
                  Đăng nhập
                </>
              )}
            </button>
          </form>
          
          <div className="mt-6 text-center text-sm text-muted-foreground">
            Chưa có tài khoản?{' '}
            <Link href={ROUTES.AUTH.REGISTER} className="text-primary font-medium hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
