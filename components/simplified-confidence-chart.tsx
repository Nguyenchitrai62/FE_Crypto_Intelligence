"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ResponsiveContainer, Tooltip, XAxis, YAxis, Line, ComposedChart, CartesianGrid } from "recharts"
import { useTheme } from "next-themes"
import { AlertCircle, InfoIcon, ArrowRight } from "lucide-react"
import Link from "next/link"

export function SimplifiedConfidenceChart() {
  const [data, setData] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [timezoneOffset, setTimezoneOffset] = useState<number>(7)
  const { theme } = useTheme()

  // Fixed values for simplified version
  const limit = 168 // 1 week
  const symbol = "BTC/USDT"

  const isDarkTheme = theme === "dark"

  useEffect(() => {
    // Get timezone automatically
    try {
      const now = new Date()
      const offsetMinutes = now.getTimezoneOffset()
      const offsetHours = -offsetMinutes / 60
      setTimezoneOffset(offsetHours)
    } catch (e) {
      console.error("Error getting timezone:", e)
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
  }, [])

  const chartData = data
    .map((item, index) => {
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
        index: index,
      }
    })
    .sort((a, b) => a.timestamp - b.timestamp)

  // Calculate min, max for Close values
  const closeValues = chartData.map((item) => item.Close).filter(Boolean)
  const minClose = closeValues.length > 0 ? Math.min(...closeValues) * 0.995 : 0
  const maxClose = closeValues.length > 0 ? Math.max(...closeValues) * 1.005 : 100000

  // Format price
  const formatPrice = (value: number) => {
    if (value >= 1000) {
      return `$${(value / 1000).toFixed(1)}K`
    }
    return `$${value.toFixed(0)}`
  }

  // Custom dot for BTC line
  const renderCustomDot = (props: any) => {
    const { cx, cy, payload } = props

    if (payload && typeof payload.confidencePercent === "number") {
      if (payload.confidencePercent == 100) {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={3}
            fill="#22c55e"
            stroke="#16a34a"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 4px rgba(34, 197, 94, 0.6))" }}
          />
        )
      } else if (payload.confidencePercent == 0) {
        return (
          <circle
            cx={cx}
            cy={cy}
            r={3}
            fill="#dc2626"
            stroke="#b91c1c"
            strokeWidth={2}
            style={{ filter: "drop-shadow(0 0 4px rgba(220, 38, 38, 0.6))" }}
          />
        )
      }
    }

    return null
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Prediction Overview</h2>
          <div className="text-sm text-muted-foreground">
            BTC/USDT • Last 7 days • UTC{timezoneOffset >= 0 ? `+${timezoneOffset}` : timezoneOffset}
          </div>
        </div>
        <Link href="/prediction">
          <Button size="sm" variant="outline" className="flex items-center gap-2">
            See More
            <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>

      <div className="h-[300px] w-full">
        {isLoading ? (
          <div className="h-full flex items-center justify-center">
            <div className="animate-pulse text-muted-foreground">Loading...</div>
          </div>
        ) : error ? (
          <div className="h-full flex items-center justify-center flex-col">
            <AlertCircle className="h-8 w-8 text-red-500 mb-2" />
            <div className="text-center text-red-500 font-medium text-sm">Unable to connect to API</div>
            <div className="text-center text-xs text-muted-foreground mt-1">
              {error.message || "Please check your connection and try again."}
            </div>
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <ComposedChart data={chartData} margin={{ top: 10, right: 30, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={isDarkTheme ? "#374151" : "#e5e7eb"} opacity={0.3} />
              <XAxis
                dataKey="date"
                tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563", fontSize: 11 }}
                tickMargin={8}
                angle={-45}
                textAnchor="end"
                height={50}
                axisLine={false}
                tickLine={false}
              />
              <YAxis
                yAxisId="right"
                orientation="right"
                domain={[minClose, maxClose]}
                tick={{ fill: isDarkTheme ? "#9ca3af" : "#4b5563", fontSize: 11 }}
                tickFormatter={formatPrice}
                axisLine={false}
                tickLine={false}
                width={45}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: isDarkTheme ? "#1f2937" : "#ffffff",
                  borderColor: isDarkTheme ? "#374151" : "#e5e7eb",
                  color: isDarkTheme ? "#f9fafb" : "#111827",
                  borderRadius: "6px",
                  fontSize: "12px",
                  padding: "8px",
                }}
                formatter={(value: any, name: string) => {
                  if (name === "Close") return [`${formatPrice(value)}`, "BTC Price"]
                  return [value, name]
                }}
                labelFormatter={(label) => `Time: ${label}`}
              />
              <Line
                yAxisId="right"
                type="monotone"
                dataKey="Close"
                stroke="#3b82f6"
                strokeWidth={2}
                dot={renderCustomDot}
                activeDot={{ r: 6, stroke: "#3b82f6", strokeWidth: 2, fill: isDarkTheme ? "#1f2937" : "#ffffff" }}
                name="Close"
              />
            </ComposedChart>
          </ResponsiveContainer>
        )}
      </div>

      <div className="mt-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded text-xs flex items-start">
        <InfoIcon className="h-4 w-4 mr-2 text-blue-500 flex-shrink-0 mt-0.5" />
        <p className="text-muted-foreground">
          <span className="text-green-600 font-semibold">Green dots</span> = Buy signals •
          <span className="text-red-600 font-semibold"> Red dots</span> = Sell signals • Click "See More" for detailed
          analysis
        </p>
      </div>
    </Card>
  )
}
