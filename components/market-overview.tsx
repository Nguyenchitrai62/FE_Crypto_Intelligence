"use client"

import { Card } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { useEffect, useState } from "react"

interface CryptoData {
  symbol: string
  name: string
  price: number
  change24h: number
  volume24h: number
  marketCap: number
}

export function MarketOverview() {
  const [cryptoData, setCryptoData] = useState<CryptoData[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Giả lập dữ liệu thị trường
    const mockData: CryptoData[] = [
      {
        symbol: "BTC",
        name: "Bitcoin",
        price: 43567.89,
        change24h: 2.34,
        volume24h: 28765432198,
        marketCap: 845678901234,
      },
      {
        symbol: "ETH",
        name: "Ethereum",
        price: 2345.67,
        change24h: -1.23,
        volume24h: 15678901234,
        marketCap: 278901234567,
      },
      {
        symbol: "SOL",
        name: "Solana",
        price: 123.45,
        change24h: 5.67,
        volume24h: 5678901234,
        marketCap: 45678901234,
      },
      {
        symbol: "BNB",
        name: "Binance Coin",
        price: 345.67,
        change24h: 0.89,
        volume24h: 3456789012,
        marketCap: 56789012345,
      },
      {
        symbol: "ADA",
        name: "Cardano",
        price: 0.45,
        change24h: -2.34,
        volume24h: 2345678901,
        marketCap: 15678901234,
      },
      {
        symbol: "XRP",
        name: "Ripple",
        price: 0.56,
        change24h: 1.23,
        volume24h: 1234567890,
        marketCap: 28901234567,
      },
      {
        symbol: "DOT",
        name: "Polkadot",
        price: 12.34,
        change24h: -0.45,
        volume24h: 987654321,
        marketCap: 12345678901,
      },
      {
        symbol: "DOGE",
        name: "Dogecoin",
        price: 0.12,
        change24h: 3.45,
        volume24h: 876543210,
        marketCap: 15678901234,
      },
    ]

    // Giả lập API call
    setTimeout(() => {
      setCryptoData(mockData)
      setIsLoading(false)
    }, 500)
  }, [])

  // Format số thành chuỗi có dấu phân cách hàng nghìn
  const formatNumber = (num: number): string => {
    return new Intl.NumberFormat("en-US").format(num)
  }

  // Format giá tiền
  const formatPrice = (price: number): string => {
    return price < 1
      ? price.toFixed(4)
      : price < 10
        ? price.toFixed(3)
        : price < 1000
          ? price.toFixed(2)
          : price.toFixed(0)
  }

  // Format khối lượng và vốn hóa thị trường
  const formatLargeNumber = (num: number): string => {
    if (num >= 1000000000000) {
      return `$${(num / 1000000000000).toFixed(2)}T`
    }
    if (num >= 1000000000) {
      return `$${(num / 1000000000).toFixed(2)}B`
    }
    if (num >= 1000000) {
      return `$${(num / 1000000).toFixed(2)}M`
    }
    return `$${formatNumber(num)}`
  }

  return (
    <Card className="p-6 bg-card/20 backdrop-blur border-gray-800">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">Market Overview</h2>
        <p className="text-sm text-muted-foreground">Real-time cryptocurrency market data</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-pulse">Loading market data...</div>
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="w-[100px]">Asset</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>24h Change</TableHead>
              <TableHead>24h Volume</TableHead>
              <TableHead>Market Cap</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {cryptoData.map((crypto) => (
              <TableRow key={crypto.symbol} className="border-gray-800">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                      {crypto.symbol.substring(0, 1)}
                    </div>
                    <div>
                      <div className="font-medium">{crypto.name}</div>
                      <div className="text-xs text-muted-foreground">{crypto.symbol}</div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>${formatPrice(crypto.price)}</TableCell>
                <TableCell className={crypto.change24h >= 0 ? "text-green-500" : "text-red-500"}>
                  {crypto.change24h >= 0 ? "+" : ""}
                  {crypto.change24h.toFixed(2)}%
                </TableCell>
                <TableCell>{formatLargeNumber(crypto.volume24h)}</TableCell>
                <TableCell>{formatLargeNumber(crypto.marketCap)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </Card>
  )
}
