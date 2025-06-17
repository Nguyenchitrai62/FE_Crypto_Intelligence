"use client"

import { useEffect, useRef } from "react"
import PredictionInfoBar from "./prediction-info-bar"
import { useSettings } from "@/contexts/settings-context"

// Define the TradingView widget type
declare global {
  interface Window {
    TradingView: {
      widget: new (config: any) => any
    }
  }
}

export default function TradingViewChart() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { theme } = useSettings()

  // Chiều cao cố định cho thanh thông tin AI
  const infoBarHeight = 40 // px

  useEffect(() => {
    // Tạo script element để tải thư viện TradingView
    const script = document.createElement("script")
    script.src = "https://s3.tradingview.com/tv.js"
    script.async = true
    script.onload = () => {
      if (containerRef.current && window.TradingView) {
        // Xác định theme dựa trên theme của ứng dụng
        const tvTheme = theme === "light" ? "light" : "dark"

        // Tạo widget TradingView với các options cần thiết
        new window.TradingView.widget({
          container_id: containerRef.current.id,
          autosize: true,
          symbol: "BINANCE:BTCUSDT",
          interval: "60",
          timezone: "Etc/UTC",
          theme: tvTheme,
          style: "1",
          locale: "en",
          toolbar_bg: tvTheme === "light" ? "#f1f3f6" : "#2a2e39",
          enable_publishing: false,
          allow_symbol_change: true,
          details: true,
          hotlist: true,
          calendar: true,
          studies: [],
          hide_side_toolbar: false,
          supported_resolutions: ["5", "15", "60", "240", "D", "W"],
          favorites: {
            intervals: ["5", "15", "60", "240"],
          },
          intervals: ["5", "15", "60", "240", "D", "W"],
        })
      }
    }
    document.head.appendChild(script)

    // Cleanup function
    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script)
      }
    }
  }, [theme]) // Thêm theme vào dependencies để cập nhật khi theme thay đổi

  return (
    <div className="flex flex-col w-full h-full">
      {/* Container cho biểu đồ với chiều cao được điều chỉnh */}
      <div style={{ height: `calc(100% - ${infoBarHeight}px)` }}>
        <div id="tradingview_widget" ref={containerRef} className="w-full h-full" />
      </div>

      {/* Thanh thông tin AI ở dưới cùng với chiều cao cố định */}
      <div style={{ height: `${infoBarHeight}px` }}>
        <PredictionInfoBar />
      </div>
    </div>
  )
}
