"use client"

import { useState, useEffect } from "react"

export function useLatestConfidence() {
  const [confidence, setConfidence] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchLatestConfidence = async () => {
      setIsLoading(true)
      setError(null)

      try {
        const controller = new AbortController()
        const timeoutId = setTimeout(() => controller.abort(), 10000)

        const response = await fetch("https://be-web-crypto.onrender.com/confidence?limit=1", {
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
        if (result.data && result.data.length > 0) {
          setConfidence(result.data[0].confidence)
        } else {
          throw new Error("No confidence data available")
        }
      } catch (err: any) {
        console.error("Error fetching latest confidence:", err)
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchLatestConfidence()

    // Cập nhật mỗi 60 giây
    const intervalId = setInterval(fetchLatestConfidence, 60000)

    return () => {
      clearInterval(intervalId)
    }
  }, [])

  return { confidence, isLoading, error }
}
