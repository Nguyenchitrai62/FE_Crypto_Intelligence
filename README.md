# 🧠 Crypto Intelligence

**Crypto Intelligence** là nền tảng phân tích xu hướng thị trường tiền điện tử theo thời gian thực, kết hợp giữa phương pháp **rule-based** truyền thống và **mô hình học sâu (LSTM)** để hỗ trợ ra quyết định giao dịch. Giao diện web trực quan giúp nhà đầu tư dễ dàng theo dõi tín hiệu mua/bán trên các tài sản số hàng đầu như **Bitcoin (BTC)**, **Ethereum (ETH)**, **Solana (SOL)** và **Ripple (XRP)**.

---

## 🚀 Tính năng nổi bật

- 🟢🔴 Hiển thị tín hiệu mua/bán bằng biểu tượng trực quan trên biểu đồ giá theo thời gian thực  
- 📊 Đánh giá xác suất thành công của tín hiệu bằng mô hình LSTM hồi quy  
- 🧠 Phân tích mẫu hình giá kinh điển như Double Top/Double Bottom bằng thuật toán rule-based  
- 🔔 Cảnh báo xu hướng ngắn hạn với mức độ confidence dựa trên kết quả dự đoán AI  
- 💡 Hỗ trợ đa tài sản: BTC, ETH, SOL, XRP – mở rộng linh hoạt trong tương lai  
- 🧩 Tích hợp biểu đồ TradingView và cập nhật dữ liệu giá thời gian thực qua WebSocket  

---

## 🧪 Công nghệ sử dụng

- **Next.js 14** (App Router, Server Components)  
- **Tailwind CSS** + **shadcn/ui**  
- **TypeScript**  
- **WebSocket** (cập nhật realtime tín hiệu và giá)  
- **TradingView Widget** (nhúng biểu đồ tương tác)  
- **Kết nối backend AI / rule-based qua API hoặc WebSocket**

---

## ⚙️ Cài đặt & chạy local

### Yêu cầu:

- Node.js >= 18.x  
- npm >= 9.x  

### Thao tác:

```bash
# 1. Clone project
git clone https://github.com/Nguyenchitrai62/FE_Crypto_Intelligence
cd FE_Crypto_Intelligence

# 2. Cài đặt thư viện
npm install

# 3. Chạy ứng dụng
npm run dev
```

---

## 🧩 Các thành phần liên quan

- ⚙️ **BE Worker – Xử lý tín hiệu & AI dự đoán (rule-based + LSTM)**  
  👉 [https://github.com/Nguyenchitrai62/BE_Worker](https://github.com/Nguyenchitrai62/BE_Worker)

- 🔧 **BE Web – API và Notification Service**  
  👉 [https://github.com/Nguyenchitrai62/BE_WEB_Crypto](https://github.com/Nguyenchitrai62/BE_WEB_Crypto)
