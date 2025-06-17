import { ConfidenceChart } from "@/components/confidence-chart"
import { LatestPrediction } from "@/components/latest-prediction"
import { AiExplanation } from "@/components/ai-explanation"
import { AiIllustrationCharts } from "@/components/ai-illustration-charts"

export default function AIPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold">🤖 AI Analysis</h1>
          <p className="text-sm text-muted-foreground">Detailed AI prediction analysis and explanations</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-1">
        <LatestPrediction />
      </div>

      <ConfidenceChart />

      <AiExplanation />

      <AiIllustrationCharts />
    </div>
  )
}
