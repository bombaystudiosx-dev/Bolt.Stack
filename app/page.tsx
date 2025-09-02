"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, Filter, SortAsc, Wifi, WifiOff } from "lucide-react"
import MobileNavigation from "@/components/mobile-navigation"
import EnhancedSmartSignals from "@/components/enhanced-smart-signals"
import PropTypeAnalytics from "@/components/prop-type-analytics"
import ROIAnalyticsDashboard from "@/components/roi-analytics-dashboard"
import SportsTeams from "@/components/sports-teams"
import GameSchedule from "@/components/game-schedule"
import LoadingSpinner from "@/components/loading-spinner"
import PullToRefresh from "@/components/pull-to-refresh"

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("props")
  const [activeLeague, setActiveLeague] = useState("MLB")
  const [activePropsTab, setActivePropsTab] = useState("Best Props")
  const [isLoading, setIsLoading] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  const leagues = ["MLB", "WNBA", "NFL", "NBA", "NHL"]
  const propsTabs = ["Best Props", "All Props", "Tracked"]

  const handleRefresh = async () => {
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsLoading(false)
  }

  const handleTabChange = (tab: string) => {
    setIsLoading(true)
    setTimeout(() => {
      setActiveTab(tab)
      setIsLoading(false)
    }, 200)
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      <header className="sticky top-0 z-40 bg-background/95 backdrop-blur-md border-b border-border">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <select
              value={activeLeague}
              onChange={(e) => setActiveLeague(e.target.value)}
              className="bg-card border border-border rounded-lg px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-all duration-200 hover:shadow-md focus:ring-2 focus:ring-primary/20"
            >
              {leagues.map((league) => (
                <option key={league} value={league}>
                  {league}
                </option>
              ))}
            </select>

            {/* Connection status indicator */}
            <div className="flex items-center gap-1">
              {isOnline ? <Wifi className="w-4 h-4 text-accent" /> : <WifiOff className="w-4 h-4 text-destructive" />}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-muted/20 active:scale-95 transition-all duration-200"
            >
              <Search className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-muted/20 active:scale-95 transition-all duration-200"
            >
              <SortAsc className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="w-8 h-8 hover:bg-muted/20 active:scale-95 transition-all duration-200"
            >
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Enhanced Props Tabs with smooth transitions */}
        {activeTab === "props" && (
          <div className="flex items-center px-4 pb-3">
            <div className="flex bg-muted/20 rounded-lg p-1 w-full">
              {propsTabs.map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActivePropsTab(tab)}
                  className={`flex-1 px-3 py-2 text-xs font-medium rounded-md transition-all duration-200 active:scale-95 ${
                    activePropsTab === tab
                      ? "bg-card text-foreground shadow-sm transform scale-105"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted/10"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      <PullToRefresh onRefresh={handleRefresh}>
        <main className="px-4 py-4">
          {isLoading && <LoadingSpinner />}

          {!isLoading && (
            <div className="animate-in fade-in-50 duration-300">
              {activeTab === "props" && (
                <>
                  {/* Enhanced Performance Stats with hover effects */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    <Card className="bg-card border-border hover:shadow-md transition-all duration-200 active:scale-95">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">YESTERDAY</p>
                        <p className="text-lg font-bold text-accent">$369.64</p>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <span className="text-muted-foreground">8-4</span>
                          <span className="text-accent">ROI 30.6%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border hover:shadow-md transition-all duration-200 active:scale-95">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">LAST 7</p>
                        <p className="text-lg font-bold text-accent">$873.41</p>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <span className="text-muted-foreground">43-32</span>
                          <span className="text-accent">ROI 11.0%</span>
                        </div>
                      </CardContent>
                    </Card>

                    <Card className="bg-card border-border hover:shadow-md transition-all duration-200 active:scale-95">
                      <CardContent className="p-3 text-center">
                        <p className="text-xs text-muted-foreground mb-1">LAST 30</p>
                        <p className="text-lg font-bold text-accent">$3932.48</p>
                        <div className="flex items-center justify-center gap-1 text-xs">
                          <span className="text-muted-foreground">211-160</span>
                          <span className="text-accent">ROI 9.7%</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>

                  {/* Enhanced Prop Type Toggle */}
                  <div className="flex bg-muted/20 rounded-lg p-1 mb-6">
                    <button className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md shadow-sm transition-all duration-200 active:scale-95">
                      Hitting
                    </button>
                    <button className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 active:scale-95">
                      Pitching
                    </button>
                  </div>

                  {/* Enhanced Filter Buttons */}
                  <div className="flex gap-2 mb-6 overflow-x-auto pb-2">
                    <Badge className="bg-primary text-primary-foreground whitespace-nowrap shadow-sm hover:shadow-md transition-all duration-200 active:scale-95">
                      ⚡ SMART SIGNALS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap hover:bg-muted/20 transition-all duration-200 active:scale-95"
                    >
                      ALL
                    </Badge>
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap hover:bg-muted/20 transition-all duration-200 active:scale-95"
                    >
                      HITS
                    </Badge>
                    <Badge
                      variant="outline"
                      className="whitespace-nowrap hover:bg-muted/20 transition-all duration-200 active:scale-95"
                    >
                      TOTAL BASES
                    </Badge>
                  </div>

                  {/* Content based on active tab */}
                  {activePropsTab === "Tracked" && activeLeague === "WNBA" ? (
                    <PropTypeAnalytics />
                  ) : (
                    <EnhancedSmartSignals league={activeLeague} />
                  )}
                </>
              )}

              {activeTab === "home" && (
                <div className="space-y-6">
                  <Card className="bg-card border-border hover:shadow-md transition-all duration-200">
                    <CardHeader>
                      <CardTitle className="text-foreground">Welcome to BRAXBETA</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">Your AI-powered sports analytics platform</p>
                    </CardContent>
                  </Card>
                  <SportsTeams league={activeLeague} />
                </div>
              )}

              {activeTab === "games" && (
                <div className="space-y-4">
                  <GameSchedule league={activeLeague} />
                </div>
              )}

              {activeTab === "models" && (
                <div className="space-y-4">
                  <ROIAnalyticsDashboard />
                </div>
              )}

              {activeTab === "research" && (
                <div className="space-y-4">
                  <SportsTeams league={activeLeague} />
                </div>
              )}
            </div>
          )}
        </main>
      </PullToRefresh>

      {/* Enhanced Mobile Navigation */}
      <MobileNavigation activeTab={activeTab} onTabChange={handleTabChange} />
    </div>
  )
}
