import "@/styles/globals.css"
import { Inter } from "next/font/google"
import { Sidebar } from "@/components/sidebar"
import { SettingsProvider } from "@/contexts/settings-context"
import type { Metadata } from "next"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Crypto Intelligence",
  description: "Cryptocurrency analytics and AI-powered predictions from multiple sources",
  icons: {
    icon: "/favicon.png",
    apple: "/favicon.png",
  },
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} bg-black text-white`} suppressHydrationWarning>
        <SettingsProvider>
          <div className="flex min-h-screen">
            <Sidebar />
            <div className="ml-[280px] flex-1 p-6">{children}</div>
          </div>
        </SettingsProvider>
      </body>
    </html>
  )
}
