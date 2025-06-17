"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Line, ComposedChart, Legend, CartesianGrid } from "recharts"
import { useTheme } from "next-themes"
import { AlertCircle, InfoIcon } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export function ConfidenceChart() {
  const [limit, setLimit] = useState(168)
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [localTimezone, setLocalTimezone] = useState<string>("UTC+7")
  const [timezoneOffset, setTimezoneOffset] = useState<number>(7)
  const [showAiPrediction, setShowAiPrediction] = useState(false)
  const { theme } = useTheme()
  const [symbol, setSymbol] = useState("BTC/USDT")

  const isDarkTheme = theme === "dark"

  useEffect(() => {
    // Lấy múi giờ tự động từ trình duyệt
    try {
      const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone
      setLocalTimezone(timeZone)

      // Tính toán offset từ UTC
      const now = new Date()
      const offsetMinutes = now.getTimezoneOffset()
      // Chuyển đổi từ phút sang giờ và đổi dấu (getTimezoneOffset trả về giá trị âm cho múi giờ dương)
      const offsetHours = -offsetMinutes / 60
      setTimezoneOffset(offsetHours)
    } catch (e) {
      console.error("Error getting timezone:", e)
      // Giữ nguyên giá trị mặc định UTC+7 nếu có lỗi
    }
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`https://be-web-crypto.onrender.com/confidence?limit=${limit}&symbol=${symbol}`, {
          signal: controller.signal,
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          cache: "no-store",
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const result = await response.json()
        setData(result.data || [])
      } catch (err: any) {
        console.error("Error fetching confidence data:", err)
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [limit, symbol])

  const chartData = data
    .map((item, index) => {
      // Chuyển đổi thời gian từ UTC+0 sang múi giờ được phát hiện
      const utcDate = new Date(item.Date)
      const localDate = new Date(utcDate.getTime() + timezoneOffset * 60 * 60 * 1000)

      return {
        date: localDate.toLocaleString("vi-VN", {
          month: "numeric",
          day: "numeric",
          hour: "numeric",
          minute: "numeric",
        }),
        confidence: item.confidence,
        confidencePercent: item.confidence * 100,
        Close: item.Close,
        timestamp: localDate.getTime(),
        index: index, // Thêm index để làm x coordinate cho scatter plot
        predicted_target: item.predicted_target,
      }
    })
    .sort((a, b) => a.timestamp - b.timestamp)

  // Tạo dữ liệu cho các chấm tín hiệu
  const signalData = chartData
    .map((item, index) => ({
      ...item,
      x: index, // Sử dụng index làm x coordinate
      y: item.Close,
      isGreenSignal: item.confidencePercent > 80,
      isRedSignal: item.confidencePercent < 20,
    }))
    .filter((item) => item.isGreenSignal || item.isRedSignal)

  // Tính giá trị min, max của Close để thiết lập domain cho trục Y bên phải
  const closeValues = chartData.map((item) => item.Close).filter(Boolean)
  const minClose = closeValues.length > 0 ? Math.min(...closeValues) * 0.995 : 0 // Giảm 0.5% để có khoảng cách
  const maxClose = closeValues.length > 0 ? Math.max(...closeValues) * 1.005 : 100000 // Tăng 0.5% để có khoảng cách

  // Format giá BTC
  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(0)}`
  }

  const toggleAiPrediction = () => {
    setShowAiPrediction(!showAiPrediction)
  }

  // Custom dot cho line BTC - hiển thị tất cả các chấm với màu khác nhau
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props

    if (payload && typeof payload.confidencePercent === "number") {
      // Check for the new condition: predicted_target exists, is not null, > 1.2, and confidence is 0 or 1
      const isLargeDot =
        payload.predicted_target !== null &&
        (
          (payload.confidencePercent === 100 && payload.predicted_target > 1.1) ||
          (payload.confidencePercent === 0 && payload.predicted_target > 0.9)
        );
      const dotRadius = isLargeDot ? 6 : 4 // Larger radius if condition met

      if (payload.confidencePercent == 100) {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={dotRadius} // Use dynamic radius
            fill="#22c55e"
            stroke="#16a34a"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 6px rgba(34, 197, 94, 0.8))" }}
          />
        )
      } else if (payload.confidencePercent == 0) {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={dotRadius} // Use dynamic radius
            fill="#dc2626"
            stroke="#b91c1c"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 6px rgba(220, 38, 38, 0.8))" }}
          />
        )
      }
    }

    return null
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold">Prediction</h2>
          <div className="text-sm text-muted-foreground">
            Múi giờ: UTC{timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset}
          </div>
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Select value={symbol} onValueChange={setSymbol}>
            <SelectTrigger className="w-[140px] h-8">
              <SelectValue placeholder="Select symbol" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="BTC/USDT">BTC</SelectItem>
              <SelectItem value="ETH/USDT">ETH</SelectItem>
              <SelectItem value="SOL/USDT">SOL</SelectItem>
              <SelectItem value="XRP/USDT">XRP</SelectItem>
            </SelectContent>
          </Select>
          <Button
            size="sm"
            variant={limit === 24 ? "default" : "ghost"}
            className={limit !== 24 ? "text-gray-400 hover:text-white" : ""}
            onClick={() => setLimit(24)}
          >
            1 Ngày
          </Button>
          <Button
            size="sm"
            variant={limit === 72 ? "default" : "ghost"}
            className={limit !== 72 ? "text-gray-400 hover:text-white" : ""}
            onClick={() => setLimit(72)}
          >
            3 Ngày
          </Button>
          <Button
            size="sm"
            variant={limit === 168 ? "default" : "ghost"}
            className={limit !== 168 ? "text-gray-400 hover:text-white" : ""}
            onClick={() => setLimit(168)}
          >
            1 Tuần
          </Button>
          <Button
            size="sm"
            variant={limit === 336 ? "default" : "ghost"}
            className={limit !== 336 ? "text-gray-400 hover:text-white" : ""}
            onClick={() => setLimit(336)}
          >
            2 Tuần
          </Button>
          <Button
            size="sm"
            variant={limit === 720 ? "default" : "ghost"}
            className={limit !== 720 ? "text-gray-400 hover:text-white" : ""}
            onClick={() => setLimit(720)}
          >
            1 Tháng
          </Button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Đang tải...</div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center flex-col">
            <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
            <div className="text-center text-red-500 font-medium">Không thể kết nối đến API</div>
            <div className="text-center text-sm text-muted-foreground mt-1 max-w-md">
              {error.message || "Vui lòng kiểm tra kết nối mạng và thử lại sau."}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 50, left: 10, bottom: 30 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                tickMargin={10}
                angle={-45}
                textAnchor="end"
                height={60}
                axisLine={false}
                tickLine={false}
              />
              {showAiPrediction && (
                <YAxis
                  yAxisId="left"
                  domain={[0, 100]}
                  tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                  tickFormatter={(value) => `${value.toFixed(0)}`}
                  axisLine={false}
                  tickLine={false}
                  label={{
                    value: "Prediction",
                    angle: -90,
                    position: "insideLeft",
                    style: { textAnchor: "middle", fill: isDarkTheme ? "#9ca3af" : "#4b5563" },
                  }}
                />
              )}
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[minClose, maxClose]}
                tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
                tickFormatter={formatPrice}
                axisLine={false}
                tickLine={false}
                width={50}
                label={{
                  value: "",
                  angle: 90,
                  position: "insideRight",
                  style: { textAnchor: "middle", fill: isDarkTheme ? "#9ca3af" : "#4b5563" },
                }}
              />
              <Tooltip
                offset={50}
                contentStyle={{
                  backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
                  borderColor: isDarkTheme ? "#374151" : "#e5e7eb",
                  color: isDarkTheme ? "#f9fafb" : "#111827",
                  borderRadius: "6px",
                  boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
                  padding: "4px 8px",
                }}
                formatter={(value: any, name: string, props: any) => {
                  if (name === "confidencePercent") {
                    return [`${value.toFixed(2)}%`, "Prediction"]
                  }

                  return [value, name]
                }}
                labelFormatter={(label) => `Thời gian: ${label}`}
              />
              <Legend
                verticalAlign="top"
                height={36}
                formatter={(value) => {
                  if (value === "confidencePercent") return "Prediction"
                  if (value === "Close") return `${symbol.split("/")[0]} Price`
                  return value
                }}
              />
              {showAiPrediction && (
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="confidencePercent"
                  stroke="#ff6b00"
                  strokeWidth={2}
                  dot={false}
                  activeDot={{ r: 6, stroke: "#ff6b00", strokeWidth: 2, fill: isDarkTheme ? "#1f2937" : "#ffffff" }}
                  name="confidencePercent"
                />
              )}
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Close"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={renderCustomDot}
                activeDot={{ r: 8, stroke: "#3b82f6", strokeWidth: 2, fill: isDarkTheme ? "#1f2937" : "#ffffff" }}
                name="Close"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded text-sm flex items-center space-x-2">
        <InfoIcon className="h-5 w-5 text-blue-500 flex-shrink-0" />
        <div className="flex justify-between w-full text-muted-foreground text-sm">
          <div>
            • <span className="text-green-600 font-semibold">Chấm xanh</span> là tín hiệu{" "}
            <span className="text-green-600 font-semibold">Mua</span>.
          </div>
          <div>
            • <span className="font-semibold">Chấm to</span> là điểm có độ chính xác cao.
          </div>
          <div>
            • <span className="text-red-600 font-semibold">Chấm đỏ</span> là tín hiệu{" "}
            <span className="text-red-600 font-semibold">Bán</span>.
          </div>
        </div>
      </div>

    </Card>
  )
}
