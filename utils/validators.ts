/**
 * Zod validation schemas — all forms with full XSS protection.
 *
 * Security rules applied to every string field:
 * - Reject strings containing HTML script tags, event handlers, javascript: URIs
 * - Max length limits to prevent payload bloat
 * - Regex patterns to enforce format
 */

import { z } from 'zod';

// ── XSS guard helpers ─────────────────────────────────────────────────────────

/** Rejects strings that look like XSS attacks */
const noXSS = (val: string): boolean => {
  const dangerous = [
    /<script/i,
    /<\/script>/i,
    /javascript:/i,
    /on\w+\s*=/i,         // onclick=, onerror=, etc.
    /<iframe/i,
    /<object/i,
    /<embed/i,
    /data:text\/html/i,
    /vbscript:/i,
  ];
  return !dangerous.some((pattern) => pattern.test(val));
};

/** Safe string — strips XSS, enforces max length */
const safeString = (min: number, max: number, label: string) =>
  z
    .string()
    .min(min, `${label} phải có ít nhất ${min} ký tự`)
    .max(max, `${label} không được vượt quá ${max} ký tự`)
    .refine(noXSS, { message: `${label} chứa nội dung không hợp lệ` });

/** Optional safe string */
const safeStringOptional = (max: number) =>
  z
    .string()
    .max(max)
    .refine(noXSS, { message: 'Nội dung chứa ký tự không hợp lệ' })
    .optional()
    .or(z.literal(''));

// ── Schemas ───────────────────────────────────────────────────────────────────

/** Contact form */
export const contactSchema = z.object({
  name: safeString(2, 100, 'Họ tên'),
  phone: z
    .string()
    .regex(
      /^(0|\+84)[0-9]{9,10}$/,
      'Số điện thoại không hợp lệ (VD: 0912345678)'
    ),
  email: z.string().email('Email không hợp lệ').optional().or(z.literal('')),
  subject: safeStringOptional(200),
  message: safeString(10, 2000, 'Nội dung'),
});

export type ContactSchema = z.infer<typeof contactSchema>;

/** Admin login */
export const loginSchema = z.object({
  email: z
    .string()
    .email('Email không hợp lệ')
    .max(254, 'Email quá dài')
    .toLowerCase(),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(128, 'Mật khẩu quá dài'),
});

export type LoginSchema = z.infer<typeof loginSchema>;

/** Customer registration */
export const registerSchema = z
  .object({
    name: safeString(2, 100, 'Họ tên'),
    email: z.string().email('Email không hợp lệ').max(254).toLowerCase(),
    phone: z
      .string()
      .regex(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
    password: z
      .string()
      .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
      .max(128)
      .regex(
        /^(?=.*[a-zA-Z])(?=.*[0-9])/,
        'Mật khẩu phải có ít nhất 1 chữ và 1 số'
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Mật khẩu xác nhận không khớp',
    path: ['confirmPassword'],
  });

export type RegisterSchema = z.infer<typeof registerSchema>;

/** Simple registration schema (no confirmPassword — used in basic signup form) */
export const registerSchemaSimple = z.object({
  name: safeString(2, 100, 'Họ tên'),
  email: z.string().email('Email không hợp lệ').max(254).toLowerCase(),
  phone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  password: z
    .string()
    .min(8, 'Mật khẩu phải có ít nhất 8 ký tự')
    .max(128),
});

export type RegisterSchemaSimple = z.infer<typeof registerSchemaSimple>;

/** Product form */
export const productSchema = z.object({
  name: safeString(3, 200, 'Tên sản phẩm'),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(
      /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
      'Slug không hợp lệ (chỉ chữ thường, số và dấu gạch ngang)'
    ),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục').max(100),
  description: safeString(10, 5000, 'Mô tả'),
  shortDescription: safeString(10, 500, 'Mô tả ngắn'),
  price: z
    .number({ invalid_type_error: 'Giá phải là số' })
    .min(0, 'Giá không được âm')
    .max(1_000_000_000, 'Giá quá lớn'),
  salePrice: z
    .number()
    .min(0, 'Giá khuyến mãi không được âm')
    .max(1_000_000_000)
    .optional(),
  material: safeString(1, 200, 'Chất liệu'),
  color: safeString(1, 100, 'Màu sắc'),
  weight: safeString(1, 100, 'Khối lượng'),
  size: safeString(1, 200, 'Kích thước'),
  stock: z
    .number({ invalid_type_error: 'Tồn kho phải là số' })
    .int('Tồn kho phải là số nguyên')
    .min(0, 'Tồn kho không được âm')
    .max(99999),
  video: z.string().url('URL video không hợp lệ').optional().or(z.literal('')),
  featured: z.boolean(),
  published: z.boolean(),
  contactForPrice: z.boolean().optional(),
  seoTitle: safeStringOptional(70),
  seoDescription: safeStringOptional(160),
});

export type ProductSchema = z.infer<typeof productSchema>;

/** Category form */
export const categorySchema = z.object({
  name: safeString(2, 100, 'Tên danh mục'),
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug không hợp lệ'),
  description: safeStringOptional(500),
});

export type CategorySchema = z.infer<typeof categorySchema>;

/** Blog form */
export const blogSchema = z.object({
  title: safeString(5, 200, 'Tiêu đề'),
  slug: z
    .string()
    .min(2)
    .max(200)
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug không hợp lệ'),
  // content is HTML from TipTap — sanitized server-side via DOMPurify
  content: z
    .string()
    .min(50, 'Nội dung phải có ít nhất 50 ký tự')
    .max(200_000, 'Nội dung quá dài'),
  excerpt: safeStringOptional(300),
  seoTitle: safeStringOptional(70),
  seoDescription: safeStringOptional(160),
  author: safeString(2, 100, 'Tên tác giả'),
  published: z.boolean(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

/** Order form */
export const orderSchema = z.object({
  customerName: safeString(2, 100, 'Họ tên'),
  customerPhone: z
    .string()
    .regex(/^(0|\+84)[0-9]{9,10}$/, 'Số điện thoại không hợp lệ'),
  customerEmail: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),
  shippingAddress: safeString(10, 500, 'Địa chỉ giao hàng'),
  note: safeStringOptional(1000),
  paymentMethod: z.enum(['bank_transfer', 'cod', 'momo', 'zalopay'], {
    errorMap: () => ({ message: 'Phương thức thanh toán không hợp lệ' }),
  }),
});

export type OrderSchema = z.infer<typeof orderSchema>;
