"use client"

import { useState, useEffect } from "react"

export interface FearGreedData {
  value: string
  value_classification: string
  timestamp: string
  time_until_update?: string
}

export interface FearGreedResponse {
  name: string
  data: FearGreedData[]
  metadata: {
    error: string | null
  }
}

export function useFearGreedIndex(limit = 30) {
  const [data, setData] = useState<FearGreedData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      try {
        const response = await fetch(`https://api.alternative.me/fng/?limit=${limit}`)

        if (!response.ok) {
          throw new Error(`API returned status ${response.status}`)
        }

        const result: FearGreedResponse = await response.json()

        if (result.metadata.error) {
          throw new Error(result.metadata.error)
        }

        setData(result.data)
      } catch (err) {
        console.error("Error fetching Fear and Greed Index:", err)
        setError(err instanceof Error ? err : new Error("Unknown error occurred"))
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [limit])

  // Get the latest Fear and Greed index
  const latest = data.length > 0 ? data[0] : null

  return { data, latest, isLoading, error }
}
