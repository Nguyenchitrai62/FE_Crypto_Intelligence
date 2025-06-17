"use client"

import { useEffect } from "react"
import { usePriceData } from "@/hooks/use-price-data"

interface TitleUpdaterProps {
  symbol?: string
  updateInterval?: number
}

export default function TitleUpdater({ symbol = "BTCUSDT", updateInterval = 1000 }: TitleUpdaterProps) {
  const { priceData, loading } = usePriceData(symbol, updateInterval)

  useEffect(() => {
    if (priceData) {
      // Update document title with price and symbol
      document.title = `${symbol} ${priceData.formattedPrice}`
    }
  }, [priceData, symbol])

  // Component không hiển thị gì
  return null
}
