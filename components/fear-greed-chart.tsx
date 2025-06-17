"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useFearGreedIndex } from "@/hooks/use-fear-greed-index"
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from "recharts"
import { useTheme } from "next-themes"
import { AlertCircle } from "lucide-react"

export function FearGreedChart() {
  const [limit, setLimit] = useState(90)
  const { data, isLoading, error } = useFearGreedIndex(limit)
  const { theme } = useTheme()

  const isDarkTheme = theme === "dark"

  // Process data for the chart
  const chartData = data
    .map((item) => {
      const date = new Date(Number.parseInt(item.timestamp) * 1000)
      return {
        date: date.toLocaleDateString(),
        value: Number.parseInt(item.value),
        classification: item.value_classification,
      }
    })
    .reverse() // Reverse to show oldest to newest

  // Function to determine color based on value
  const getValueColor = (value: number) => {
    if (value <= 25) return "#e53e3e" // Extreme Fear (red)
    if (value <= 40) return "#ed8936" // Fear (orange)
    if (value <= 60) return "#ecc94b" // Neutral (yellow)
    if (value <= 80) return "#48bb78" // Greed (green)
    return "#2f855a" // Extreme Greed (dark green)
  }

  // Function to get gradient stops based on value ranges
  const getGradientStops = () => {
    return (
      <>
        <stop offset="0%" stopColor="#e53e3e" stopOpacity={0.8} />
        <stop offset="25%" stopColor="#ed8936" stopOpacity={0.8} />
        <stop offset="50%" stopColor="#ecc94b" stopOpacity={0.8} />
        <stop offset="75%" stopColor="#48bb78" stopOpacity={0.8} />
        <stop offset="100%" stopColor="#2f855a" stopOpacity={0.8} />
      </>
    )
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <div className="mb-4 flex items-center justify-between flex-wrap gap-2">
        <div className="flex gap-2 items-center">
          <Button size="sm" variant={limit === 30 ? "default" : "ghost"} onClick={() => setLimit(30)}>
            1 Tháng
          </Button>
          <Button size="sm" variant={limit === 90 ? "default" : "ghost"} onClick={() => setLimit(90)}>
            3 Tháng
          </Button>
          <Button size="sm" variant={limit === 180 ? "default" : "ghost"} onClick={() => setLimit(180)}>
            6 Tháng 
          </Button>
          <Button size="sm" variant={limit === 360 ? "default" : "ghost"} onClick={() => setLimit(360)}>
            1 Năm
          </Button>
        </div>
      </div>

      <div className="h-[400px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center flex-col">
            <AlertCircle className="h-10 w-10 text-red-500 mb-2" />
            <div className="text-center text-red-500 font-medium">Failed to load data</div>
            <div className="text-center text-sm text-muted-foreground mt-1 max-w-md">{error.message}</div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 30, left: 0, bottom: 30 }}>
              <defs>
                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                  {getGradientStops()}
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
              <XAxis dataKey="date" tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }} tickMargin={10} />
              <YAxis domain={[0, 100]} tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
                  borderColor: isDarkTheme ? "#374151" : "#e5e7eb",
                  color: isDarkTheme ? "#f9fafb" : "#111827",
                }}
                formatter={(value: number) => [`${value}`, "Value"]}
                labelFormatter={(label) => `Date: ${label}`}
              />
              <Legend />
              <Area type="monotone" dataKey="value" stroke="#ff6b00" fill="url(#colorValue)" activeDot={{ r: 8 }} />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-4 grid grid-cols-5 gap-2 text-center text-xs">
        <div className="bg-red-600/20 p-2 rounded">
          <div className="font-bold text-red-600">0-25</div>
          <div>Extreme Fear</div>
        </div>
        <div className="bg-orange-500/20 p-2 rounded">
          <div className="font-bold text-orange-500">26-40</div>
          <div>Fear</div>
        </div>
        <div className="bg-yellow-500/20 p-2 rounded">
          <div className="font-bold text-yellow-500">41-60</div>
          <div>Neutral</div>
        </div>
        <div className="bg-green-500/20 p-2 rounded">
          <div className="font-bold text-green-500">61-80</div>
          <div>Greed</div>
        </div>
        <div className="bg-green-600/20 p-2 rounded">
          <div className="font-bold text-green-600">81-100</div>
          <div>Extreme Greed</div>
        </div>
      </div>
    </Card>
  )
}
