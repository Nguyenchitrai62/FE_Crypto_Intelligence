"use client"

import { useState, useEffect } from "react"

interface PredictionData {
  Date: string
  confidence: number
}

interface PredictionHistoryResponse {
  data: PredictionData[]
}

// Dữ liệu mẫu để hiển thị khi không thể kết nối đến API
const generateSampleData = (limit: number): PredictionData[] => {
  return Array.from({ length: limit }, (_, i) => {
    const date = new Date()
    date.setHours(date.getHours() - i)

    return {
      Date: date.toISOString().replace("T", " ").substring(0, 19),
      confidence: Math.random(),
    }
  })
}

export function usePredictionHistory(limit = 20) {
  const [data, setData] = useState<PredictionData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [usingSampleData, setUsingSampleData] = useState(false)

  useEffect(() => {
    const controller = new AbortController()
    const signal = controller.signal

    const fetchPredictionHistory = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Thêm timeout để tránh chờ quá lâu
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch(`https://be-web-crypto.onrender.com/confidence?limit=${limit}`, {
          signal,
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          cache: "no-store",
        })

        clearTimeout(timeoutId)

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`)
        }

        const result: PredictionHistoryResponse = await response.json()
        setData(result.data)
        setUsingSampleData(false)
      } catch (err) {
        console.error("Error fetching prediction history:", err)

        // Sử dụng dữ liệu mẫu khi có lỗi
        setData(generateSampleData(limit))
        setUsingSampleData(true)

        if (err instanceof Error) {
          setError(err)
        } else {
          setError(new Error("Unknown error occurred"))
        }
      } finally {
        setIsLoading(false)
      }
    }

    // Thử lại kết nối sau 1 giây nếu lần đầu thất bại
    const fetchWithRetry = async (retries = 2) => {
      try {
        await fetchPredictionHistory()
      } catch (err) {
        if (retries > 0) {
          setTimeout(() => fetchWithRetry(retries - 1), 1000)
        }
      }
    }

    fetchWithRetry()

    return () => {
      controller.abort()
    }
  }, [limit])

  return { data, isLoading, error, usingSampleData }
}
