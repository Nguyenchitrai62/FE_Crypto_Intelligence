"use client"

import { useState, useEffect, useRef } from "react"

interface WebSocketPrediction {
  date: string
  confidence: number
}

interface PredictionData {
  isUp: boolean
  confidence: number
  rawConfidence: number
}

export function useWebsocketPrediction() {
  const [prediction, setPrediction] = useState<PredictionData | null>(null)
  const [isConnected, setIsConnected] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const socketRef = useRef<WebSocket | null>(null)
  const reconnectTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    let isMounted = true

    // Hàm kết nối WebSocket
    const connectWebSocket = () => {
      try {
        // Đóng socket cũ nếu còn tồn tại
        if (socketRef.current) {
          socketRef.current.close()
        }

        // Xóa timeout reconnect cũ nếu có
        if (reconnectTimeoutRef.current) {
          clearTimeout(reconnectTimeoutRef.current)
          reconnectTimeoutRef.current = null
        }

        // Tạo kết nối mới
        const socket = new WebSocket("wss://be-web-crypto.onrender.com/ws")
        socketRef.current = socket

        socket.onopen = () => {
          console.log("WebSocket connected!")
          if (isMounted) {
            setIsConnected(true)
            setError(null)
          }
        }

        socket.onmessage = (event) => {
          try {
            // Parse dữ liệu JSON từ server
            const data: WebSocketPrediction = JSON.parse(event.data)

            // Xác định hướng dự đoán dựa trên confidence
            const isUp = data.confidence >= 0.5

            // Tính toán độ tin cậy hiển thị
            // Nếu confidence >= 0.5: hiển thị confidence
            // Nếu confidence < 0.5: hiển thị 1-confidence
            const displayConfidence = isUp ? data.confidence : 1 - data.confidence

            // Cập nhật dữ liệu dự đoán
            if (isMounted) {
              setPrediction({
                isUp,
                confidence: displayConfidence * 100, // Chuyển sang phần trăm
                rawConfidence: data.confidence * 100, // Lưu giá trị gốc
              })
              setIsLoading(false)
            }
          } catch (err) {
            console.error("Error parsing WebSocket message:", err, event.data)
            if (isMounted) {
              setError("Lỗi khi xử lý dữ liệu từ server")
            }
          }
        }

        socket.onerror = (error) => {
          console.log("WebSocket Error:", error)
          if (isMounted) {
            setError("Lỗi kết nối WebSocket")
            setIsConnected(false)
          }
        }

        socket.onclose = (event) => {
          console.log("WebSocket closed. Reconnecting...")
          if (isMounted) {
            setIsConnected(false)
            setError("Mất kết nối. Đang kết nối lại...")

            // Thử kết nối lại sau 1 giây
            reconnectTimeoutRef.current = setTimeout(() => {
              if (isMounted) {
                connectWebSocket()
              }
            }, 1000)
          }
        }
      } catch (err) {
        console.error("Failed to create WebSocket:", err)
        if (isMounted) {
          setError("Không thể tạo kết nối WebSocket")
          setIsConnected(false)

          // Thử kết nối lại sau 1 giây
          reconnectTimeoutRef.current = setTimeout(() => {
            if (isMounted) {
              connectWebSocket()
            }
          }, 1000)
        }
      }
    }

    // Bắt đầu kết nối
    connectWebSocket()

    // Cleanup khi component unmount
    return () => {
      isMounted = false

      if (socketRef.current) {
        socketRef.current.close()
      }

      if (reconnectTimeoutRef.current) {
        clearTimeout(reconnectTimeoutRef.current)
      }
    }
  }, [])

  return { prediction, isConnected, isLoading, error }
}
