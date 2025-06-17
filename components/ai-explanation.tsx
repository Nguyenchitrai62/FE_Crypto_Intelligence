import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Brain, TrendingUp, TrendingDown, Minus } from "lucide-react"

export function AiExplanation() {
  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-6 w-6 text-blue-500" />
          Giải thích chi tiết về AI Prediction
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <section>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">📊 Công thức tính AI Prediction</h3>
          <div className="bg-gray-900/50 p-4 rounded-lg border border-gray-700">
            <code className="text-green-400 text-sm">
              AI Prediction = (high_10_next - close) / (high_10_next - low_10_next) × 100
            </code>
          </div>
          <div className="mt-3 space-y-2 text-sm text-muted-foreground">
            <p>
              <strong className="text-blue-400">high_10_next:</strong> Giá cao nhất trong 10 phiên kế tiếp
            </p>
            <p>
              <strong className="text-red-400">low_10_next:</strong> Giá thấp nhất trong 10 phiên kế tiếp
            </p>
            <p>
              <strong className="text-yellow-400">close:</strong> Giá đóng cửa hiện tại
            </p>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">🎯 Ý nghĩa của các giá trị</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="bg-green-500/10 border border-green-500/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <span className="font-semibold text-green-400">AI Prediction = 75-100</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Giá hiện tại gần với mức thấp nhất trong 10 phiên tới.
                <strong className="text-green-400"> Khả năng cao sẽ tăng giá.</strong>
              </p>
            </div>

            <div className="bg-yellow-500/10 border border-yellow-500/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Minus className="h-5 w-5 text-yellow-500" />
                <span className="font-semibold text-yellow-400">AI Prediction = 25-75</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Giá hiện tại ở giữa khoảng dao động.
                <strong className="text-yellow-400"> Xu hướng không rõ ràng.</strong>
              </p>
            </div>

            <div className="bg-red-500/10 border border-red-500/20 p-4 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <span className="font-semibold text-red-400">AI Prediction = 0-25</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Giá hiện tại gần với mức cao nhất trong 10 phiên tới.
                <strong className="text-red-400"> Khả năng cao sẽ giảm giá.</strong>
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">💡 Ví dụ minh họa</h3>
          <div className="bg-gray-900/30 p-4 rounded-lg border border-gray-700">
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Giá đóng cửa hiện tại (close):</span>
                <span className="text-blue-400">$50,000</span>
              </div>
              <div className="flex justify-between">
                <span>Giá cao nhất 10 phiên tới (high_10_next):</span>
                <span className="text-green-400">$55,000</span>
              </div>
              <div className="flex justify-between">
                <span>Giá thấp nhất 10 phiên tới (low_10_next):</span>
                <span className="text-red-400">$45,000</span>
              </div>
              <hr className="border-gray-600" />
              <div className="flex justify-between font-semibold">
                <span>AI Prediction:</span>
                <span className="text-orange-400">(55,000 - 50,000) / (55,000 - 45,000) × 100 = 50</span>
              </div>
              <p className="text-muted-foreground text-xs mt-2">
                → Giá hiện tại ở giữa khoảng dao động, xu hướng chưa rõ ràng
              </p>
            </div>
          </div>
        </section>

        <section>
          <h3 className="text-lg font-semibold mb-3 text-orange-400">⚠️ Lưu ý quan trọng</h3>
          <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>• AI Prediction chỉ là công cụ hỗ trợ, không phải lời khuyên đầu tư</li>
              <li>• Độ chính xác cao nhất khi chỉ số gần 100 hoặc gần 0</li>
              <li>• Nên kết hợp với các chỉ báo kỹ thuật khác để ra quyết định</li>
              <li>• Thị trường crypto có tính biến động cao, luôn quản lý rủi ro</li>
            </ul>
          </div>
        </section>
      </CardContent>
    </Card>
  )
}
