"use client"
import { usePathname } from "next/navigation"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { LayoutDashboard, BarChart2, Globe, Info, Settings, Brain, TrendingUp } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

export function Sidebar() {
  const pathname = usePathname()
  const { t } = useSettings()

  const mainNavItems = [
    {
      name: t("dashboard"),
      href: "/",
      icon: <LayoutDashboard className="h-5 w-5" />,
    },
    {
      name: "Prediction",
      href: "/prediction",
      icon: <TrendingUp className="h-5 w-5" />,
    },
    {
      name: t("fearAndGreed"),
      href: "/fear-and-greed",
      icon: <BarChart2 className="h-5 w-5" />,
    },
    {
      name: t("market"),
      href: "/market",
      icon: <Globe className="h-5 w-5" />,
    },
  ]

  const bottomNavItems = [
    {
      name: t("settings"),
      href: "/settings",
      icon: <Settings className="h-5 w-5" />,
    },
    {
      name: t("about"),
      href: "/about",
      icon: <Info className="h-5 w-5" />,
    },
  ]

  return (
    <aside className="w-[280px] h-screen flex flex-col fixed left-0 top-0 border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-black">
      <div className="flex h-16 items-center gap-2 border-b border-gray-200 dark:border-gray-800 px-6">
        <Brain className="h-6 w-6" />
        <span className="font-bold text-xl">Crypto Intelligence</span>
      </div>

      <div className="px-4 py-4">
        <Input
          placeholder={t("search")}
          className="bg-gray-100 border-gray-200 dark:bg-gray-900 dark:border-gray-800"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 px-3 pb-4">
        <nav className="space-y-1">
          {mainNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-black hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        <nav className="space-y-1 mt-4">
          {bottomNavItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors ${
                pathname === item.href
                  ? "bg-gray-200 dark:bg-gray-800 text-black dark:text-white"
                  : "text-gray-700 dark:text-gray-400 hover:text-black hover:bg-gray-100 dark:hover:text-white dark:hover:bg-gray-900"
              }`}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  )
}
