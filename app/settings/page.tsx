"use client"

import { useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Globe, Moon, Sun, PaintBucket, Bell, Lock, Mail, BellIcon as BrandTelegram } from "lucide-react"
import { useSettings } from "@/contexts/settings-context"

export default function SettingsPage() {
  const { theme, language, setTheme, setLanguage, t } = useSettings()

  // Lưu thay đổi khi người dùng rời khỏi trang
  useEffect(() => {
    const handleBeforeUnload = () => {
      localStorage.setItem("theme", theme)
      localStorage.setItem("language", language)
    }

    window.addEventListener("beforeunload", handleBeforeUnload)
    return () => {
      window.removeEventListener("beforeUnload", handleBeforeUnload)
    }
  }, [theme, language])

  return (
    <div className="space-y-6">
      <div className="space-y-1">
        <h1 className="text-2xl font-bold">{t("settings")}</h1>
        <p className="text-sm text-muted-foreground">{t("manageData")}</p>
      </div>

      <Tabs defaultValue="appearance">
        <TabsList>
          <TabsTrigger value="appearance">
            <PaintBucket className="h-4 w-4 mr-2" />
            {t("appearance")}
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="h-4 w-4 mr-2" />
            {t("notifications")}
          </TabsTrigger>
          <TabsTrigger value="privacy">
            <Lock className="h-4 w-4 mr-2" />
            {t("privacy")}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="appearance" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("language")}</CardTitle>
              <CardDescription>{t("chooseLanguage")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={language} onValueChange={setLanguage} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="en" id="en" />
                  <Label htmlFor="en" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {t("english")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="vi" id="vi" />
                  <Label htmlFor="vi" className="flex items-center gap-2">
                    <Globe className="h-4 w-4" />
                    {t("vietnamese")}
                  </Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("theme")}</CardTitle>
              <CardDescription>{t("selectTheme")}</CardDescription>
            </CardHeader>
            <CardContent>
              <RadioGroup value={theme} onValueChange={setTheme} className="space-y-3">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="light" id="light" />
                  <Label htmlFor="light" className="flex items-center gap-2">
                    <Sun className="h-4 w-4" />
                    {t("light")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="dark" id="dark" />
                  <Label htmlFor="dark" className="flex items-center gap-2">
                    <Moon className="h-4 w-4" />
                    {t("dark")}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="system" id="system" />
                  <Label htmlFor="system">{t("system")}</Label>
                </div>
              </RadioGroup>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("notificationSettings")}</CardTitle>
              <CardDescription>{t("configureNotifications")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("priceAlerts")}</p>
                  <p className="text-sm text-muted-foreground">{t("receiveNotifications")}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("aiPredictions")}</p>
                  <p className="text-sm text-muted-foreground">{t("getNotified")}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("marketNews")}</p>
                  <p className="text-sm text-muted-foreground">{t("marketUpdates")}</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">{t("emailNotifications")}</h3>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4" />
                  <input
                    type="email"
                    placeholder="your@email.com"
                    className="bg-background border rounded px-3 py-2 text-sm w-full max-w-xs"
                  />
                </div>
              </div>

              <div className="pt-4 border-t">
                <h3 className="text-lg font-medium mb-3">{t("telegramNotifications")}</h3>
                <div className="flex items-center gap-2">
                  <BrandTelegram className="h-4 w-4" />
                  <a
                    href="https://t.me/Crypto_Intelligence_v1_bot"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-blue-500 hover:underline"
                  >
                    @Crypto_Intelligence_v1_bot
                  </a>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="privacy" className="space-y-4 mt-4">
          <Card>
            <CardHeader>
              <CardTitle>{t("privacySettings")}</CardTitle>
              <CardDescription>{t("manageData")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("saveTradingHistory")}</p>
                  <p className="text-sm text-muted-foreground">{t("storeTradingActivity")}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("shareAnalytics")}</p>
                  <p className="text-sm text-muted-foreground">{t("helpImprove")}</p>
                </div>
                <Switch defaultChecked />
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">{t("cookiePreferences")}</p>
                  <p className="text-sm text-muted-foreground">{t("manageCookies")}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
