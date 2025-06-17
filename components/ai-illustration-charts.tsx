"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ReferenceLine } from "recharts"
import { useTheme } from "next-themes"

// Dữ liệu minh họa cho các trường hợp khác nhau
const scenarioHighPrediction = [
  { time: "T-5", price: 52000, prediction: null },
  { time: "T-4", price: 51000, prediction: null },
  { time: "T-3", price: 50500, prediction: null },
  { time: "T-2", price: 50000, prediction: null },
  { time: "T-1", price: 49500, prediction: null },
  { time: "T0", price: 49000, prediction: 85, high_10: 55000, low_10: 48000 },
  { time: "T+1", price: 49500, prediction: null },
  { time: "T+2", price: 51000, prediction: null },
  { time: "T+3", price: 52500, prediction: null },
  { time: "T+4", price: 54000, prediction: null },
  { time: "T+5", price: 55000, prediction: null },
  { time: "T+6", price: 54500, prediction: null },
  { time: "T+7", price: 53000, prediction: null },
  { time: "T+8", price: 52000, prediction: null },
  { time: "T+9", price: 50000, prediction: null },
  { time: "T+10", price: 48000, prediction: null },
]

const scenarioLowPrediction = [
  { time: "T-5", price: 48000, prediction: null },
  { time: "T-4", price: 49000, prediction: null },
  { time: "T-3", price: 50500, prediction: null },
  { time: "T-2", price: 52000, prediction: null },
  { time: "T-1", price: 53500, prediction: null },
  { time: "T0", price: 54000, prediction: 15, high_10: 55000, low_10: 47000 },
  { time: "T+1", price: 53500, prediction: null },
  { time: "T+2", price: 52000, prediction: null },
  { time: "T+3", price: 50500, prediction: null },
  { time: "T+4", price: 49000, prediction: null },
  { time: "T+5", price: 47500, prediction: null },
  { time: "T+6", price: 47000, prediction: null },
  { time: "T+7", price: 48000, prediction: null },
  { time: "T+8", price: 49500, prediction: null },
  { time: "T+9", price: 51000, prediction: null },
  { time: "T+10", price: 55000, prediction: null },
]

const scenarioNeutralPrediction = [
  { time: "T-5", price: 49000, prediction: null },
  { time: "T-4", price: 50000, prediction: null },
  { time: "T-3", price: 51000, prediction: null },
  { time: "T-2", price: 50500, prediction: null },
  { time: "T-1", price: 51500, prediction: null },
  { time: "T0", price: 52000, prediction: 50, high_10: 55000, low_10: 49000 },
  { time: "T+1", price: 51500, prediction: null },
  { time: "T+2", price: 53000, prediction: null },
  { time: "T+3", price: 54000, prediction: null },
  { time: "T+4", price: 55000, prediction: null },
  { time: "T+5", price: 54500, prediction: null },
  { time: "T+6", price: 53000, prediction: null },
  { time: "T+7", price: 51500, prediction: null },
  { time: "T+8", price: 50000, prediction: null },
  { time: "T+9", price: 49000, prediction: null },
  { time: "T+10", price: 50500, prediction: null },
]

export function AiIllustrationCharts() {
  const { theme } = useTheme()
  const isDarkTheme = theme === "dark"

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div
          className={`p-3 rounded-lg border ${isDarkTheme ? "bg-gray-900 border-gray-700" : "bg-white border-gray-300"}`}
        >
          <p className="font-semibold">{`Time: ${label}`}</p>
          <p className="text-blue-400">{`Price: $${payload[0].value?.toLocaleString()}`}</p>
          {data.prediction && (
            <>
              <p className="text-orange-400">{`AI Prediction: ${data.prediction}`}</p>
              <p className="text-green-400 text-xs">{`High 10: $${data.high_10?.toLocaleString()}`}</p>
              <p className="text-red-400 text-xs">{`Low 10: $${data.low_10?.toLocaleString()}`}</p>
            </>
          )}
        </div>
      )
    }
    return null
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <CardHeader>
        <CardTitle className="text-orange-400">📈 Biểu đồ minh họa AI Prediction</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Scenario 1: High Prediction */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-green-400">
            Trường hợp 1: AI Prediction = 85 (Tín hiệu mua mạnh)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioHighPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="T0" stroke="#ff6b00" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#3b82f6"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#3b82f6" }}
                  activeDot={{ r: 6, fill: "#3b82f6" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong className="text-green-400">Giải thích:</strong> Tại T0, giá $49,000 gần với low_10 ($48,000) hơn là
            high_10 ($55,000). AI dự đoán 85% khả năng giá sẽ tăng → Kết quả: Giá tăng mạnh trong các phiên tiếp theo.
          </p>
        </div>

        {/* Scenario 2: Low Prediction */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-red-400">
            Trường hợp 2: AI Prediction = 15 (Tín hiệu bán mạnh)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioLowPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="T0" stroke="#ff6b00" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#ef4444"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#ef4444" }}
                  activeDot={{ r: 6, fill: "#ef4444" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong className="text-red-400">Giải thích:</strong> Tại T0, giá $54,000 gần với high_10 ($55,000) hơn là
            low_10 ($47,000). AI dự đoán chỉ 15% khả năng giá sẽ tăng → Kết quả: Giá giảm mạnh trong các phiên tiếp
            theo.
          </p>
        </div>

        {/* Scenario 3: Neutral Prediction */}
        <div>
          <h3 className="text-lg font-semibold mb-3 text-yellow-400">
            Trường hợp 3: AI Prediction = 50 (Tín hiệu trung tính)
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scenarioNeutralPrediction} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
                <XAxis
                  dataKey="time"
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  domain={["dataMin - 1000", "dataMax + 1000"]}
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `$${(value / 1000).toFixed(0)}K`}
                />
                <Tooltip content={<CustomTooltip />} />
                <ReferenceLine x="T0" stroke="#ff6b00" strokeDasharray="5 5" />
                <Line
                  type="monotone"
                  dataKey="price"
                  stroke="#eab308"
                  strokeWidth={3}
                  dot={{ r: 4, fill: "#eab308" }}
                  activeDot={{ r: 6, fill: "#eab308" }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
          <p className="text-sm text-muted-foreground mt-2">
            <strong className="text-yellow-400">Giải thích:</strong> Tại T0, giá $52,000 ở giữa khoảng high_10 ($55,000)
            và low_10 ($49,000). AI dự đoán 50% khả năng → Kết quả: Giá dao động không có xu hướng rõ ràng.
          </p>
        </div>

        {/* Summary */}
        <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-400 mb-2">🎯 Tóm tắt chiến lược</h4>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between">
              <span>AI Prediction &gt; 75:</span>
              <span className="text-green-400 font-semibold">Cân nhắc mua (BUY)</span>
            </div>
            <div className="flex justify-between">
              <span>AI Prediction 25-75:</span>
              <span className="text-yellow-400 font-semibold">Quan sát (HOLD)</span>
            </div>
            <div className="flex justify-between">
              <span>AI Prediction &lt; 25:</span>
              <span className="text-red-400 font-semibold">Cân nhắc bán (SELL)</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
