# 🧠 Crypto Intelligence

**Crypto Intelligence** là một hệ thống trợ lý giao dịch AI giúp người dùng đánh giá xu hướng giá Bitcoin (BTC) theo thời gian thực, thông qua sự kết hợp giữa phân tích kỹ thuật, chỉ số tâm lý thị trường và mô hình học sâu.

Giao diện này là phần frontend của đồ án tốt nghiệp, được xây dựng bằng **Next.js 14**, **Tailwind CSS**, và bộ giao diện **shadcn/ui**, triển khai theo kiến trúc App Router và hỗ trợ server rendering.

---

## 🚀 Tính năng chính

- 📊 Tổng hợp dữ liệu thị trường crypto: giá, chỉ báo kỹ thuật, chỉ số Fear & Greed
- 🤖 Trực quan hóa kết quả dự đoán từ mô hình AI (Transformer)
- 🔔 Hiển thị tín hiệu giao dịch với mức confidence khác nhau
- 📈 Tích hợp biểu đồ TradingView và tín hiệu theo thời gian thực (WebSocket)
- 📬 Trang liên hệ và giới thiệu đồ án (About)

---

## 🖥️ Công nghệ sử dụng

- **Next.js 14** (App Router, Server Components)
- **Tailwind CSS** + **shadcn/ui**
- **TypeScript**
- **Radix UI** (qua `shadcn/ui`)
- **TradingView Widget**
- **WebSocket** (hiển thị dữ liệu realtime)
- **Hosted on Vercel**

---

## ⚙️ Cài đặt & Chạy local

### Yêu cầu

- Node.js >= 18.x
- npm >= 9.x

### Các bước thực hiện

```bash
# 1. Clone dự án
git clone https://github.com/your-username/crypto-intelligence-frontend.git
cd crypto-intelligence-frontend

# 2. Cài thư viện phụ thuộc
npm install

# 3. Chạy ứng dụng
npm run dev
