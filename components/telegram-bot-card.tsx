import { Card } from "@/components/ui/card"
import { BrandTelegram } from "@/components/ui/lucide-icons"
import { FaDiscord } from "react-icons/fa"

export function TelegramBotCard() {
  return (
    <Card className="bg-card/20 backdrop-blur border-gray-800">
      <div className="p-6">
        <h3 className="text-sm text-muted-foreground mb-2">Discord Bot</h3>
        <div className="flex items-center gap-2">
          <FaDiscord className="h-8 w-8 text-indigo-500" />
          <p className="text-xl font-bold">Get Alerts</p>
        </div>
        <div className="mt-4">
          <a
            href="https://discord.gg/Z5WYPtUeTp"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-blue-400 hover:text-blue-300 transition-colors"
          >
            @Crypto_Intelligence
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-external-link"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
              <polyline points="15 3 21 3 21 9" />
              <line x1="10" y1="14" x2="21" y2="3" />
            </svg>
          </a>
        </div>
      </div>
    </Card>
  )
}
