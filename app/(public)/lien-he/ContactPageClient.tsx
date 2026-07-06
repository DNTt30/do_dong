/**
 * ContactPageClient — contact form, map, and info sections.
 */

'use client';

import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';
import { Phone, Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { contactSchema, type ContactSchema } from '@/utils/validators';
import { submitContactForm } from '@/services/order.service';
import { useSettings } from '@/hooks/useSettings';
import Breadcrumb from '@/components/common/Breadcrumb';
import SectionTitle from '@/components/common/SectionTitle';

export default function ContactPageClient() {
  const { settings } = useSettings();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactSchema>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactSchema) => {
    setIsSubmitting(true);
    try {
      await submitContactForm(data);
      toast.success('Gửi thành công! Chúng tôi sẽ liên hệ lại sớm nhất.');
      reset();
    } catch {
      toast.error('Gửi thất bại. Vui lòng thử lại hoặc gọi trực tiếp cho chúng tôi.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      icon: Phone,
      label: 'Hotline',
      value: settings?.phone,
      href: `tel:${settings?.phone}`,
    },
    {
      icon: Mail,
      label: 'Email',
      value: settings?.email,
      href: `mailto:${settings?.email}`,
    },
    {
      icon: MapPin,
      label: 'Địa chỉ',
      value: settings?.address,
      href: settings?.googleMapUrl,
    },
    {
      icon: Clock,
      label: 'Giờ làm việc',
      value: settings?.workingHours ?? 'Thứ 2 - Chủ nhật: 7:00 - 18:00',
    },
  ].filter((item) => item.value);

  return (
    <div>
      {/* Header */}
      <div className="bg-muted/30 border-b border-border">
        <div className="container py-6">
          <Breadcrumb items={[{ label: 'Liên hệ' }]} />
          <SectionTitle title="Liên Hệ Với Chúng Tôi" align="left" className="mt-2" />
        </div>
      </div>

      <div className="container py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-1"
          >
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
              Thông tin liên hệ
            </h2>

            <div className="space-y-5 mb-8">
              {contactItems.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.label} className="flex items-start gap-4">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon size={20} className="text-primary" />
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-0.5">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          target={item.href.startsWith('http') ? '_blank' : undefined}
                          rel="noopener noreferrer"
                          className="text-sm text-foreground hover:text-primary transition-colors"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="text-sm text-foreground">{item.value}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Social links */}
            <div className="flex flex-col gap-3">
              {settings?.facebook && (
                <a
                  href={settings.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm text-foreground"
                >
                  <span className="font-bold text-blue-600">f</span>
                  Facebook
                </a>
              )}
              {settings?.zaloPhone && (
                <a
                  href={`https://zalo.me/${settings.zaloPhone}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg border border-border hover:border-primary/50 hover:bg-muted transition-colors text-sm text-foreground"
                >
                  <span className="font-bold text-blue-500">ZL</span>
                  Chat Zalo
                </a>
              )}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-2xl border border-border shadow-card p-6 md:p-8">
              <h2 className="font-serif text-xl font-semibold text-foreground mb-6">
                Gửi tin nhắn cho chúng tôi
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Name */}
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-foreground mb-1.5">
                      Họ và tên <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="name"
                      type="text"
                      placeholder="Nguyễn Văn A"
                      {...register('name')}
                      className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-foreground mb-1.5">
                      Số điện thoại <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      placeholder="0912 345 678"
                      {...register('phone')}
                      className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
                    />
                    {errors.phone && (
                      <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
                    )}
                  </div>
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-foreground mb-1.5">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="email@example.com"
                    {...register('email')}
                    className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
                  />
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-foreground mb-1.5">
                    Tiêu đề
                  </label>
                  <input
                    id="subject"
                    type="text"
                    placeholder="Hỏi về sản phẩm lư đồng..."
                    {...register('subject')}
                    className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-foreground mb-1.5">
                    Nội dung <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="message"
                    rows={5}
                    placeholder="Mô tả nhu cầu của bạn..."
                    {...register('message')}
                    className="w-full px-4 py-2.5 rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary text-sm transition-colors resize-none"
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message.message}</p>
                  )}
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn-primary w-full justify-center py-3.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Send size={18} />
                      Gửi tin nhắn
                    </>
                  )}
                </button>
              </form>
            </div>
          </motion.div>
        </div>

        {/* Google Map */}
        {settings?.googleMapEmbed && (
          <div className="mt-12">
            <h2 className="font-serif text-xl font-semibold text-foreground mb-6">Bản đồ</h2>
            <div
              className="rounded-2xl overflow-hidden border border-border h-96"
              dangerouslySetInnerHTML={{ __html: settings.googleMapEmbed }}
            />
          </div>
        )}
      </div>
    </div>
  );
}
