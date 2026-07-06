/**
 * Zod validation schemas for all form data.
 */

import { z } from 'zod';

/** Contact form validation schema */
export const contactSchema = z.object({
  name: z
    .string()
    .min(2, 'Họ tên phải có ít nhất 2 ký tự')
    .max(100, 'Họ tên không được vượt quá 100 ký tự'),
  phone: z
    .string()
    .regex(
      /^(0|\+84)[0-9]{9,10}$/,
      'Số điện thoại không hợp lệ (VD: 0912345678)'
    ),
  email: z
    .string()
    .email('Email không hợp lệ')
    .optional()
    .or(z.literal('')),
  subject: z.string().max(200).optional(),
  message: z
    .string()
    .min(10, 'Nội dung phải có ít nhất 10 ký tự')
    .max(2000, 'Nội dung không được vượt quá 2000 ký tự'),
});

export type ContactSchema = z.infer<typeof contactSchema>;

/** Product form validation schema */
export const productSchema = z.object({
  name: z.string().min(3, 'Tên sản phẩm phải có ít nhất 3 ký tự').max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug không hợp lệ (chỉ chữ thường, số và dấu gạch ngang)'),
  categoryId: z.string().min(1, 'Vui lòng chọn danh mục'),
  description: z.string().min(10, 'Mô tả phải có ít nhất 10 ký tự'),
  shortDescription: z.string().min(10).max(500, 'Mô tả ngắn tối đa 500 ký tự'),
  price: z.number().min(0, 'Giá phải lớn hơn 0'),
  salePrice: z.number().min(0).optional(),
  material: z.string().min(1, 'Vui lòng nhập chất liệu'),
  color: z.string().min(1, 'Vui lòng nhập màu sắc'),
  weight: z.string().min(1, 'Vui lòng nhập khối lượng'),
  size: z.string().min(1, 'Vui lòng nhập kích thước'),
  stock: z.number().int().min(0),
  video: z.string().url('URL video không hợp lệ').optional().or(z.literal('')),
  featured: z.boolean(),
  published: z.boolean(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
});

export type ProductSchema = z.infer<typeof productSchema>;

/** Category form validation schema */
export const categorySchema = z.object({
  name: z.string().min(2, 'Tên danh mục phải có ít nhất 2 ký tự').max(100),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug không hợp lệ'),
  description: z.string().max(500).optional(),
});

export type CategorySchema = z.infer<typeof categorySchema>;

/** Blog form validation schema */
export const blogSchema = z.object({
  title: z.string().min(5, 'Tiêu đề phải có ít nhất 5 ký tự').max(200),
  slug: z
    .string()
    .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, 'Slug không hợp lệ'),
  content: z.string().min(50, 'Nội dung phải có ít nhất 50 ký tự'),
  excerpt: z.string().max(300).optional(),
  seoTitle: z.string().max(70).optional(),
  seoDescription: z.string().max(160).optional(),
  author: z.string().min(2).max(100),
  published: z.boolean(),
});

export type BlogSchema = z.infer<typeof blogSchema>;

/** Admin login form validation schema */
export const loginSchema = z.object({
  email: z.string().email('Email không hợp lệ'),
  password: z.string().min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

export type LoginSchema = z.infer<typeof loginSchema>;
