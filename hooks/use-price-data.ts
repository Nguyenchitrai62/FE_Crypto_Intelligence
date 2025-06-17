"use client"

import { useState, useEffect } from "react"

interface PriceData {
  symbol: string
  price: string
  formattedPrice: string
  change24h: number
}

export function usePriceData(symbol = "BTCUSDT", updateInterval = 1000) {
  const [priceData, setPriceData] = useState<PriceData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true
    const controller = new AbortController()

    const fetchPrice = async () => {
      try {
        // Sử dụng Binance API để lấy giá hiện tại
        const response = await fetch(`https://api.binance.com/api/v3/ticker/price?symbol=${symbol}`, {
          signal: controller.signal,
        })

        if (!response.ok) {
          throw new Error(`Failed to fetch price: ${response.status}`)
        }

        const data = await response.json()

        // Tạo giá trị ngẫu nhiên cho phần trăm thay đổi (trong thực tế sẽ lấy từ API)
        const randomChange = (Math.random() * 10 - 5).toFixed(2)

        if (isMounted) {
          const price = Number.parseFloat(data.price)
          setPriceData({
            symbol: data.symbol,
            price: data.price,
            formattedPrice: price.toLocaleString(undefined, {
              minimumFractionDigits: 2,
              maximumFractionDigits: price < 1 ? 6 : 2,
            }),
            change24h: Number.parseFloat(randomChange),
          })
          setError(null)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted && err instanceof Error && err.name !== "AbortError") {
          setError(err.message)
          // Fallback data khi có lỗi
          setPriceData({
            symbol: symbol,
            price: "0",
            formattedPrice: "0",
            change24h: 0,
          })
          setLoading(false)
        }
      }
    }

    fetchPrice()

    // Cập nhật giá theo interval được chỉ định (mặc định là 1 giây)
    const intervalId = setInterval(fetchPrice, updateInterval)

    return () => {
      isMounted = false
      controller.abort()
      clearInterval(intervalId)
    }
  }, [symbol, updateInterval])

  return { priceData, loading, error }
}
