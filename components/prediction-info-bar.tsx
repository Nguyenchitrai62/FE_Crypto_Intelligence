"use client"

import { useSettings } from "@/contexts/settings-context"
import { useWebsocketPrediction } from "@/hooks/use-websocket-prediction"

export default function PredictionInfoBar() {
  const { t, theme } = useSettings()
  const { prediction, isConnected, isLoading, error } = useWebsocketPrediction()

  // Hiển thị trạng thái đang tải
  if (isLoading && !prediction) {
    return (
      <div
        className={`${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-900 text-white"} p-1 h-full flex items-center justify-center`}
      >
        <div className="animate-pulse">Đang kết nối đến server...</div>
      </div>
    )
  }

  // Hiển thị thông báo nếu không có dữ liệu
  if (!prediction) {
    return (
      <div
        className={`${theme === "light" ? "bg-gray-200 text-black" : "bg-gray-900 text-white"} p-1 h-full flex items-center justify-center`}
      >
        <div>Đang chờ dữ liệu dự đoán...</div>
      </div>
    )
  }

  // Xác định hướng dự đoán dựa trên confidence
  let directionText: string
  let directionColor: string
  let directionBg: string

  if (prediction.rawConfidence === 100) {
    // confidence = 1
    directionText = t("up")
    directionColor = "text-green-500"
    directionBg = "bg-green-500"
  } else if (prediction.rawConfidence === 0) {
    // confidence = 0
    directionText = t("down")
    directionColor = "text-red-500"
    directionBg = "bg-red-500"
  } else {
    // confidence = -1 (rawConfidence would be -100)
    directionText = "SIDEWAY"
    directionColor = "text-gray-500"
    directionBg = "bg-gray-500"
  }

  return (
    <div
      className={`${theme === "light" ? "bg-gray-200 text-black border-t border-gray-300" : "bg-gray-900 text-white border-t border-gray-700"} h-full flex items-center`}
    >
      {/* Nội dung thanh thông tin */}
      <div className="w-full px-4">
        <div className="flex flex-wrap items-center justify-between gap-2 text-xs">
          <div className="flex items-center gap-2">
            <span>{t("aiPrediction")}:</span>
            <span className={`${directionBg} text-white px-2 py-0.5 rounded text-xs font-bold`}>{directionText}</span>
            {error && <span className="text-yellow-500 ml-2 text-xs">({error})</span>}
          </div>

          <div className="flex items-center gap-1">
            <span className={`${isConnected ? "text-green-500" : "text-red-500"} text-xs`}>
              {isConnected ? "●" : "○"} {isConnected ? "Connected" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}
