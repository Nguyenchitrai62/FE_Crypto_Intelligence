"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type Theme = "light" | "dark" | "system"
type Language = "en" | "vi"

interface SettingsContextType {
  theme: Theme
  language: Language
  setTheme: (theme: Theme) => void
  setLanguage: (language: Language) => void
  translations: Record<string, Record<string, string>>
  t: (key: string) => string
}

const defaultTranslations = {
  en: {
    dashboard: "Dashboard",
    ai: "AI Analysis",
    statistics: "Statistics & Income",
    fearAndGreed: "Fear and Greed",
    market: "Market",
    about: "About",
    settings: "Settings",
    search: "Search",
    appearance: "Appearance",
    notifications: "Notifications",
    privacy: "Privacy",
    language: "Language",
    theme: "Theme",
    light: "Light",
    dark: "Dark",
    system: "System",
    english: "English",
    vietnamese: "Vietnamese",
    saveChanges: "Save Changes",
    cancel: "Cancel",
    notificationSettings: "Notification Settings",
    configureNotifications: "Configure how you receive notifications.",
    priceAlerts: "Price Alerts",
    receiveNotifications: "Receive notifications for price changes",
    aiPredictions: "AI Predictions",
    getNotified: "Get notified about new AI predictions",
    marketNews: "Market News",
    marketUpdates: "Updates about important market events",
    emailNotifications: "Email Notifications",
    telegramNotifications: "Telegram Notifications",
    telegramBot: "Telegram Bot",
    privacySettings: "Privacy Settings",
    manageData: "Manage your data and privacy preferences.",
    saveTradingHistory: "Save Trading History",
    storeTradingActivity: "Store your trading activity for analysis",
    shareAnalytics: "Share Analytics",
    helpImprove: "Help improve our AI predictions",
    cookiePreferences: "Cookie Preferences",
    manageCookies: "Manage cookies and tracking",
    manage: "Manage",
    chooseLanguage: "Choose your preferred language for the interface.",
    selectTheme: "Select your preferred color theme.",
    aiPrediction: "Prediction",
    confidence: "Confidence",
    up: "UP",
    down: "DOWN",
    prediction: "Prediction",
  },
  vi: {
    dashboard: "Trang chủ",
    ai: "Phân tích AI",
    statistics: "Thống kê & Thu nhập",
    fearAndGreed: "Chỉ số Sợ hãi và Tham lam",
    market: "Thị trường",
    about: "Giới thiệu",
    settings: "Cài đặt",
    search: "Tìm kiếm",
    appearance: "Giao diện",
    notifications: "Thông báo",
    privacy: "Quyền riêng tư",
    language: "Ngôn ngữ",
    theme: "Chủ đề",
    light: "Sáng",
    dark: "Tối",
    system: "Hệ thống",
    english: "Tiếng Anh",
    vietnamese: "Tiếng Việt",
    saveChanges: "Lưu thay đổi",
    cancel: "Hủy",
    notificationSettings: "Cài đặt thông báo",
    configureNotifications: "Cấu hình cách bạn nhận thông báo.",
    priceAlerts: "Cảnh báo giá",
    receiveNotifications: "Nhận thông báo về thay đổi giá",
    aiPredictions: "Dự đoán",
    getNotified: "Nhận thông báo về dự đoán AI mới",
    marketNews: "Tin tức thị trường",
    marketUpdates: "Cập nhật về sự kiện thị trường quan trọng",
    emailNotifications: "Thông báo qua Email",
    telegramNotifications: "Thông báo qua Telegram",
    telegramBot: "Bot Telegram",
    privacySettings: "Cài đặt quyền riêng tư",
    manageData: "Quản lý dữ liệu và tùy chọn quyền riêng tư của bạn.",
    saveTradingHistory: "Lưu lịch sử giao dịch",
    storeTradingActivity: "Lưu trữ hoạt động giao dịch của bạn để phân tích",
    shareAnalytics: "Chia sẻ phân tích",
    helpImprove: "Giúp cải thiện dự đoán AI của chúng tôi",
    cookiePreferences: "Tùy chọn cookie",
    manageCookies: "Quản lý cookie và theo dõi",
    manage: "Quản lý",
    chooseLanguage: "Chọn ngôn ngữ ưa thích cho giao diện.",
    selectTheme: "Chọn chủ đề màu ưa thích của bạn.",
    aiPrediction: "AI Dự Đoán",
    confidence: "Tin cậy",
    up: "TĂNG",
    down: "GIẢM",
    prediction: "Dự đoán",
  },
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined)

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("dark")
  const [language, setLanguageState] = useState<Language>("en")
  const [translations] = useState(defaultTranslations)

  // Khởi tạo theme từ localStorage hoặc mặc định
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") as Theme
    if (storedTheme) {
      setThemeState(storedTheme)
      applyTheme(storedTheme)
    } else {
      applyTheme("dark")
    }

    const storedLanguage = localStorage.getItem("language") as Language
    if (storedLanguage) {
      setLanguageState(storedLanguage)
    }
  }, [])

  // Áp dụng theme
  const applyTheme = (theme: Theme) => {
    const root = document.documentElement
    const isDark = theme === "dark" || (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches)

    if (isDark) {
      root.classList.add("dark")
      document.body.style.backgroundColor = "#000"
      document.body.style.color = "#fff"
    } else {
      root.classList.remove("dark")
      document.body.style.backgroundColor = "#fff"
      document.body.style.color = "#000"
    }
  }

  // Lưu và áp dụng theme
  const setTheme = (newTheme: Theme) => {
    localStorage.setItem("theme", newTheme)
    setThemeState(newTheme)
    applyTheme(newTheme)
  }

  // Lưu ngôn ngữ
  const setLanguage = (newLanguage: Language) => {
    localStorage.setItem("language", newLanguage)
    setLanguageState(newLanguage)
  }

  // Hàm dịch
  const t = (key: string) => {
    return translations[language]?.[key] || key
  }

  // Theo dõi thay đổi theme hệ thống
  useEffect(() => {
    if (theme !== "system") return

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)")
    const handleChange = () => {
      applyTheme("system")
    }

    mediaQuery.addEventListener("change", handleChange)
    return () => mediaQuery.removeEventListener("change", handleChange)
  }, [theme])

  return (
    <SettingsContext.Provider
      value={{
        theme,
        language,
        setTheme,
        setLanguage,
        translations,
        t,
      }}
    >
      {children}
    </SettingsContext.Provider>
  )
}

export const useSettings = () => {
  const context = useContext(SettingsContext)
  if (context === undefined) {
    throw new Error("useSettings must be used within a SettingsProvider")
  }
  return context
}
