import { SimplifiedConfidenceChart } from "@/components/simplified-confidence-chart"
import { TelegramBotCard } from "@/components/telegram-bot-card"
import { FearGreedCard } from "@/components/fear-greed-card"

export default function Home() {
  return (
    <div className="space-y-6">
    

      <div className="grid gap-4 md:grid-cols-2">
        <FearGreedCard />
        <TelegramBotCard />
      </div>

      <SimplifiedConfidenceChart />
    </div>
  )
}
