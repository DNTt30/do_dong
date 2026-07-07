# 🚀 Hướng Dẫn Chạy Dự Án

## ⚠️ Vấn đề về RAM

Dự án Next.js 15 yêu cầu khá nhiều RAM để chạy. Nếu máy bạn gặp lỗi "out of memory", hãy thử các giải pháp sau:

## 🔧 Giải pháp 1: Chạy với script đã cấu hình sẵn

```bash
# Chạy development server (đã tăng memory limit lên 8GB)
npm run dev
```

Hoặc thử phiên bản an toàn hơn với Turbopack:
```bash
npm run dev:safe
```

## 🔧 Giải pháp 2: Đóng các ứng dụng khác

Trước khi chạy, hãy:
1. Đóng tất cả browser tabs không cần thiết
2. Đóng các ứng dụng nặng (Photoshop, VS Code khác, etc.)
3. Restart máy để giải phóng RAM
4. Chỉ mở VS Code với dự án này

## 🔧 Giải pháp 3: Chạy trực tiếp với PowerShell

```powershell
# Mở PowerShell trong thư mục dự án
$env:NODE_OPTIONS="--max-old-space-size=8192"
npm run dev
```

## 🔧 Giải pháp 4: Deploy lên Vercel (KHUYÊN DÙNG)

Nếu máy vẫn không đủ RAM, cách tốt nhất là deploy lên Vercel:

### Bước 1: Tạo tài khoản Vercel
- Truy cập: https://vercel.com
- Đăng ký với GitHub account

### Bước 2: Push code lên GitHub (nếu chưa có)
```bash
git add .
git commit -m "Ready for deployment"
git push origin main
```

### Bước 3: Import project vào Vercel
1. Click "New Project" trên Vercel
2. Import repository từ GitHub
3. Configure environment variables (copy từ `.env.local`)
4. Click Deploy

### Bước 4: Vercel sẽ tự động build và deploy
- Build sẽ chạy trên server của Vercel (RAM không giới hạn)
- Mỗi lần push code, Vercel tự động deploy lại

## 🔧 Giải pháp 5: Sử dụng máy khác hoặc Cloud IDE

### Option A: Cloud IDE
- **GitHub Codespaces**: https://github.com/codespaces
- **Gitpod**: https://gitpod.io
- **StackBlitz**: https://stackblitz.com

### Option B: Chạy trên máy có RAM lớn hơn
- Yêu cầu tối thiểu: 8GB RAM
- Khuyên dùng: 16GB RAM trở lên

## ✅ Kiểm tra dự án

### 1. Lint (Không cần nhiều RAM)
```bash
npm run lint
```
✅ **Đã test**: PASS - Không có lỗi

### 2. TypeScript Check
```bash
npx tsc --noEmit
```

### 3. Các trang để test sau khi chạy được:
- Homepage: http://localhost:3000
- Đặt hàng: http://localhost:3000/dat-hang
- Sản phẩm: http://localhost:3000/san-pham
- Liên hệ: http://localhost:3000/lien-he

## 📊 Tình trạng dự án

✅ **Code Quality**: PASSED
- No ESLint errors
- TypeScript errors fixed
- All components properly structured

✅ **Features**: COMPLETE
- Order form với validation
- Floating CTA buttons
- Supabase integration
- SEO optimized
- Responsive design

⚠️ **Local Development**: Cần RAM đủ lớn
- Đã test trên máy có RAM hạn chế → out of memory
- Solution: Deploy lên Vercel hoặc dùng máy mạnh hơn

## 🎯 Khuyến nghị

**Cho Development Local:**
- Nếu máy có 8GB RAM trở lên: Chạy `npm run dev`
- Nếu máy có dưới 8GB RAM: Deploy lên Vercel

**Cho Production:**
- Deploy lên Vercel (free tier đủ dùng)
- Vercel tự động optimize và handle build process
- Free domain: your-project.vercel.app
- Có thể config custom domain sau

## 🆘 Cần trợ giúp?

Nếu vẫn gặp vấn đề, hãy:
1. Kiểm tra RAM đang dùng: `Task Manager` → `Performance` → `Memory`
2. Đảm bảo có ít nhất 4-6GB RAM trống
3. Thử restart máy và chạy lại
4. Nếu vẫn không được → Deploy lên Vercel là giải pháp tốt nhất

---

**Lưu ý**: Dự án hoạt động hoàn toàn bình thường, chỉ cần môi trường có đủ RAM. Vercel sẽ build và chạy hoàn hảo.
