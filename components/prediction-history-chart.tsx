"use client"

import { useMemo, useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { usePredictionHistory } from "@/hooks/use-prediction-history"
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts"
import { useTheme } from "next-themes"
import { AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

const LIMIT_OPTIONS = [5, 10, 20, 50, 100]

export function PredictionHistoryChart() {
  const [limit, setLimit] = useState(20)
  const { data, isLoading, error, usingSampleData } = usePredictionHistory(limit)
  const { theme } = useTheme()

  const isDarkTheme = theme === "dark"

  const chartData = useMemo(() => {
    return data
      .map((item) => {
        const date = new Date(item.Date)
        return {
          date: date.toLocaleString("vi-VN", {
            month: "numeric",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          }),
          confidence: item.confidence,
          timestamp: date.getTime(),
        }
      })
      .sort((a, b) => a.timestamp - b.timestamp) // Sắp xếp theo thời gian tăng dần
  }, [data])

  if (isLoading) {
    return (
      <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
        <CardHeader>
          <CardTitle>Lịch sử dự đoán AI</CardTitle>
          <CardDescription>Đang tải dữ liệu...</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Đang tải...</div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Lịch sử dự đoán AI</CardTitle>
            <CardDescription>
              {usingSampleData
                ? "Hiển thị dữ liệu mẫu do không thể kết nối đến API"
                : `${limit} dự đoán gần nhất từ AI`}
            </CardDescription>
          </div>

          <div className="flex items-center gap-2">
            <div className="text-sm text-muted-foreground mr-2">Số phiên:</div>
            {LIMIT_OPTIONS.map((option) => (
              <Button
                key={option}
                size="sm"
                variant={limit === option ? "default" : "outline"}
                onClick={() => setLimit(option)}
                className="h-8 px-3"
              >
                {option}
              </Button>
            ))}
          </div>
        </div>

        {usingSampleData && (
          <div className="flex items-center text-amber-500 text-sm mt-2">
            <AlertCircle className="h-4 w-4 mr-1" />
            <span>Dữ liệu mẫu</span>
          </div>
        )}

        {error && !isLoading && (
          <div className="mt-2 p-2 bg-red-500/10 border border-red-500/20 rounded text-sm text-red-500">
            Không thể kết nối đến API. Đang hiển thị dữ liệu mẫu. Lỗi: {error.message}
          </div>
        )}
      </CardHeader>
      <CardContent className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 60 }}>
            <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} />
            <XAxis
              dataKey="date"
              tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
              tickMargin={10}
              angle={-45}
              textAnchor="end"
              height={60}
            />
            <YAxis
              domain={[0, 1]}
              tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }}
              tickFormatter={(value) => `${(value * 100).toFixed(0)}%`}
              label={{
                value: "Confidence",
                angle: -90,
                position: "insideLeft",
                style: { textAnchor: "middle", fill: isDarkTheme ? "#9ca3af" : "#4b5563" },
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
                borderColor: isDarkTheme ? "#374151" : "#e5e7eb",
                color: isDarkTheme ? "#f9fafb" : "#111827",
              }}
              formatter={(value: number) => [`${(value * 100).toFixed(2)}%`, "Confidence"]}
              labelFormatter={(label) => `Thời gian: ${label}`}
            />
            <Line
              type="monotone"
              dataKey="confidence"
              stroke="#ff6b00"
              strokeWidth={2}
              dot={{ r: 2, fill: "#ff6b00" }}
              activeDot={{ r: 5, fill: "#ff6b00" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
