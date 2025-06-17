import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">🧠 Giới thiệu nền tảng Crypto Intelligence</h1>
      </div>

      <Card className="bg-card/20 backdrop-blur border-gray-800">
        <CardContent className="p-6">
          <div className="space-y-6">
            <section>
              <h2 className="text-xl font-semibold mb-2">📌 Về chúng tôi</h2>
              <p className="text-muted-foreground">
                <strong>Crypto Intelligence</strong> là một nền tảng phân tích tín hiệu giao dịch tiền điện tử, được phát triển nhằm nâng cao độ chính xác và tính minh bạch trong việc dự đoán xu hướng thị trường. Hệ thống kết hợp giữa các phương pháp phân tích kỹ thuật truyền thống và công nghệ học sâu hiện đại, hỗ trợ người dùng đưa ra quyết định đầu tư hiệu quả hơn trong thị trường crypto đầy biến động.
              </p>
              <p className="text-muted-foreground mt-2">
                Với kiến trúc xử lý hai tầng, Crypto Intelligence nhận diện các mẫu hình giá kinh điển như Double Top và Double Bottom, sau đó xác thực độ tin cậy của từng tín hiệu bằng mô hình học sâu LSTM. Nhờ đó, hệ thống giúp sàng lọc các điểm vào lệnh tiềm năng, tối ưu hóa xác suất thành công và hỗ trợ quản trị rủi ro.
              </p>
              <p className="text-muted-foreground mt-2">
                Crypto Intelligence cung cấp dữ liệu tín hiệu theo thời gian thực, dễ tích hợp, và thân thiện với người dùng, đặc biệt thông qua các nền tảng như Discord. Nền tảng phù hợp với cả nhà đầu tư cá nhân lẫn các tổ chức cần tích hợp AI có khả năng giải thích trong chiến lược giao dịch.
              </p>
              <p className="text-muted-foreground mt-2">
                Được xây dựng trên cơ sở nghiên cứu định lượng và công nghệ tiên tiến, Crypto Intelligence hướng tới việc nâng cao khả năng ra quyết định trong thị trường tài sản kỹ thuật số thông qua các công cụ phân tích đáng tin cậy và dễ sử dụng.
              </p>
            </section>

            <div className="border-t border-gray-800 my-4"></div>

            <section>
              <h2 className="text-xl font-semibold mb-2">📫 Liên hệ</h2>
              <p className="text-muted-foreground">Mọi ý kiến đóng góp hoặc yêu cầu hợp tác, xin vui lòng liên hệ:</p>
              <p className="text-muted-foreground mt-2">
                📧 Email:{" "}
                <a href="mailto:trainguyenchi30@gmail.com" className="text-blue-400 hover:underline">
                  trainguyenchi30@gmail.com
                </a>
              </p>
            </section>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
