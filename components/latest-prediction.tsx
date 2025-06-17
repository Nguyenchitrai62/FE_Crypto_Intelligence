"use client"

import { useLatestConfidence } from "@/hooks/use-latest-confidence"
import { MetricsCard } from "@/components/metrics-card"

export function LatestPrediction() {
  const { confidence, isLoading } = useLatestConfidence()

  // Tính toán giá trị confidence để hiển thị
  const confidenceValue = confidence !== null ? (confidence * 100).toFixed(2) : "Loading..."

  // Xác định nếu confidence tăng hay giảm (giả định > 0.5 là tăng, < 0.5 là giảm)
  const isPositive = confidence !== null ? confidence >= 0.5 : null

  // Tính toán phần trăm độ tin cậy
  const confidencePercentage =
    confidence !== null ? ((confidence >= 0.5 ? confidence : 1 - confidence) * 100).toFixed(2) + "%" : "0%"

  // Tính toán giá trị thay đổi để hiển thị
  const changeValue = isPositive !== null ? (isPositive ? "UP" : "DOWN") : ""

  return (
    <MetricsCard
      title="AI Prediction"
      value={confidenceValue}
      change={{ value: changeValue, percentage: confidencePercentage, isPositive: isPositive }}
      isLoading={isLoading}
    />
  )
}
