import { Card } from "@/components/ui/card"

interface MetricsCardProps {
  title: string
  value: string
  change: {
    value: string
    percentage: string
    isPositive: boolean
  }
  isLoading?: boolean
}

export function MetricsCard({ title, value, change, isLoading = false }: MetricsCardProps) {
  return (
    <Card className="bg-card/20 backdrop-blur border-gray-800">
      <div className="p-6">
        <h3 className="text-sm text-muted-foreground mb-2">{title}</h3>
        <p className="text-3xl font-bold">{isLoading ? <span className="animate-pulse">Loading...</span> : value}</p>
        <div className="flex items-center gap-1 mt-2">
          <span className="text-sm">{change.value}</span>
          <span className={`text-sm ${change.isPositive ? "text-green-500" : "text-red-500"}`}>
            {change.percentage}
          </span>
        </div>
      </div>
    </Card>
  )
}
