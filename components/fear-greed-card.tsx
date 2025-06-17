"use client"

import { Card } from "@/components/ui/card"
import { useFearGreedIndex } from "@/hooks/use-fear-greed-index"

export function FearGreedCard() {
  const { latest, isLoading } = useFearGreedIndex(1)

  // Function to determine color based on classification
  const getClassificationColor = (classification: string) => {
    switch (classification) {
      case "Extreme Fear":
        return "text-red-600"
      case "Fear":
        return "text-orange-500"
      case "Neutral":
        return "text-yellow-500"
      case "Greed":
        return "text-green-500"
      case "Extreme Greed":
        return "text-green-600"
      default:
        return "text-blue-500"
    }
  }

  return (
    <Card className="bg-card/20 backdrop-blur border-gray-800">
      <div className="p-6">
        <h3 className="text-sm text-muted-foreground mb-2">Fear & Greed Index</h3>
        {isLoading ? (
          <p className="text-3xl font-bold animate-pulse">Loading...</p>
        ) : latest ? (
          <>
            <p className="text-3xl font-bold">{latest.value}</p>
            <div className="flex items-center gap-1 mt-2">
              <span className={`text-sm ${getClassificationColor(latest.value_classification)}`}>
                {latest.value_classification}
              </span>
            </div>
          </>
        ) : (
          <p className="text-3xl font-bold">N/A</p>
        )}
      </div>
    </Card>
  )
}
