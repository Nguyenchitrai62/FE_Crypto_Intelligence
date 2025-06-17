import { ConfidenceChart } from "@/components/confidence-chart"

export default function PredictionPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">🔮 Prediction</h1>
        </div>
      </div>

      <ConfidenceChart />
    </div>
  )
}
