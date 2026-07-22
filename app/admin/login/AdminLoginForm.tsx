'use client';

/**
 * AdminLoginForm — client component with rate limiting and useSearchParams.
 * Must be wrapped in Suspense by the parent page.tsx.
 */

import React, { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Loader2, LogIn, AlertTriangle, ShieldOff, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { loginSchema, type LoginSchema } from '@/utils/validators';

// ── Client-side rate limiter ──────────────────────────────────────────────────

const STORAGE_KEY = 'admin_login_attempts';
const MAX_ATTEMPTS = 5;
const LOCKOUT_MS = 30_000;

interface AttemptState {
  count: number;
  lockedUntil: number | null;
}

function getState(): AttemptState {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { count: 0, lockedUntil: null };
  } catch {
    return { count: 0, lockedUntil: null };
  }
}

function saveState(s: AttemptState) {
  try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(s)); } catch { /* ok */ }
}

function clearState() {
  try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ok */ }
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function AdminLoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { login } = useAuth();

  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [cooldown, setCooldown] = useState(0);
  const [attemptsLeft, setAttemptsLeft] = useState(MAX_ATTEMPTS);

  useEffect(() => {
    const s = getState();
    if (s.lockedUntil && s.lockedUntil > Date.now()) {
      setCooldown(Math.ceil((s.lockedUntil - Date.now()) / 1000));
      setAttemptsLeft(0);
    } else {
      setAttemptsLeft(MAX_ATTEMPTS - s.count);
    }
  }, []);

  useEffect(() => {
    if (cooldown <= 0) return;
    const t = setInterval(() => {
      setCooldown((prev) => {
        if (prev <= 1) {
          clearInterval(t);
          saveState({ count: 0, lockedUntil: null });
          setAttemptsLeft(MAX_ATTEMPTS);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [cooldown]);

  const { register, handleSubmit, formState: { errors } } = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginSchema) => {
    const s = getState();
    if (s.lockedUntil && s.lockedUntil > Date.now()) {
      setCooldown(Math.ceil((s.lockedUntil - Date.now()) / 1000));
      toast.error(`Vui lòng chờ ${cooldown}s.`);
      return;
    }

    setIsLoading(true);
    try {
      await login(data.email, data.password);
      clearState();
      toast.success('Đăng nhập thành công!');
      const next = searchParams.get('next');
      router.push(next?.startsWith('/admin') ? next : ROUTES.ADMIN.DASHBOARD);
      router.refresh();
    } catch {
      const ns: AttemptState = { count: s.count + 1, lockedUntil: null };
      if (ns.count >= MAX_ATTEMPTS) {
        ns.lockedUntil = Date.now() + LOCKOUT_MS;
        saveState(ns);
        setCooldown(LOCKOUT_MS / 1000);
        setAttemptsLeft(0);
        toast.error('Quá nhiều lần thử sai. Vui lòng chờ 30 giây.');
      } else {
        saveState(ns);
        const left = MAX_ATTEMPTS - ns.count;
        setAttemptsLeft(left);
        toast.error(`Email hoặc mật khẩu không đúng. Còn ${left} lần thử.`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  const isLocked = cooldown > 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#B8860B] to-amber-700 mx-auto mb-4 flex items-center justify-center text-white text-2xl font-serif font-bold">
              ⚱
            </div>
            <h1 className="font-serif text-2xl font-bold text-black">Đồ Đồng Nam Định</h1>
            <p className="text-sm text-gray-500 mt-1">Quản trị viên — Đăng nhập</p>
          </div>

          {/* Lockout warning */}
          {isLocked && (
            <div className="mb-5 p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
              <ShieldOff size={18} className="text-red-500 shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-semibold text-red-700">Tài khoản bị tạm khóa</p>
                <p className="text-xs text-red-600 mt-0.5">
                  Vui lòng chờ <strong>{cooldown}s</strong> trước khi thử lại.
                </p>
              </div>
            </div>
          )}

          {/* Attempts warning */}
          {!isLocked && attemptsLeft < MAX_ATTEMPTS && attemptsLeft > 0 && (
            <div className="mb-5 p-3 bg-amber-50 border border-amber-200 rounded-xl flex items-center gap-2">
              <AlertTriangle size={16} className="text-amber-600 shrink-0" />
              <p className="text-xs text-amber-700">
                Còn <strong>{attemptsLeft}</strong> lần thử trước khi tạm khóa.
              </p>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            <div>
              <label htmlFor="login-email" className="block text-sm font-medium text-black mb-1.5">Email</label>
              <input
                id="login-email"
                type="email"
                autoComplete="username"
                placeholder="admin@example.com"
                disabled={isLocked}
                {...register('email')}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] text-sm transition-colors disabled:opacity-50"
              />
              {errors.email && <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>}
            </div>

            <div>
              <label htmlFor="login-password" className="block text-sm font-medium text-black mb-1.5">Mật khẩu</label>
              <div className="relative">
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  placeholder="••••••••"
                  disabled={isLocked}
                  {...register('password')}
                  className="w-full px-4 py-2.5 pr-11 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#B8860B]/30 focus:border-[#B8860B] text-sm transition-colors disabled:opacity-50"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  tabIndex={-1}
                  aria-label={showPassword ? 'Ẩn mật khẩu' : 'Hiện mật khẩu'}
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              {errors.password && <p className="text-xs text-red-500 mt-1">{errors.password.message}</p>}
            </div>

            <button
              type="submit"
              disabled={isLoading || isLocked}
              className="w-full flex items-center justify-center gap-2 bg-black text-white py-3.5 rounded-xl font-semibold text-sm hover:bg-[#B8860B] transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <><Loader2 size={16} className="animate-spin" />Đang đăng nhập...</>
              ) : isLocked ? (
                <><ShieldOff size={16} />Chờ {cooldown}s...</>
              ) : (
                <><LogIn size={16} />Đăng nhập</>
              )}
            </button>
          </form>
        </div>
        <p className="text-center text-xs text-gray-500 mt-4">
          Chỉ tài khoản quản trị viên được cấp quyền mới có thể truy cập.
        </p>
      </div>
    </div>
  );
}
