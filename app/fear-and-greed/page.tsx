import { FearGreedChart } from "@/components/fear-greed-chart"

export default function FearAndGreedPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">Fear and Greed Index</h1>
          <p className="text-sm text-muted-foreground">Market sentiment analysis based on multiple factors</p>
        </div>
      </div>

      <FearGreedChart />
    </div>
  )
}
