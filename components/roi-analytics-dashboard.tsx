"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { TrendingUp, DollarSign, Target, Calendar } from "lucide-react"
import { useState } from "react"

const performanceData = [
  { date: "7/1", profit: 245.5, roi: 12.3, bets: 8 },
  { date: "7/2", profit: -89.25, roi: -4.2, bets: 6 },
  { date: "7/3", profit: 412.75, roi: 18.7, bets: 12 },
  { date: "7/4", profit: 156.3, roi: 8.9, bets: 9 },
  { date: "7/5", profit: -45.8, roi: -2.1, bets: 7 },
  { date: "7/6", profit: 298.45, roi: 15.2, bets: 11 },
  { date: "7/7", profit: 189.6, roi: 9.8, bets: 10 },
  { date: "7/8", profit: -123.4, roi: -6.1, bets: 8 },
  { date: "7/9", profit: 367.2, roi: 19.4, bets: 13 },
  { date: "7/10", profit: 234.85, roi: 11.7, bets: 9 },
  { date: "7/11", profit: 445.9, roi: 22.1, bets: 15 },
  { date: "7/12", profit: 178.25, roi: 8.4, bets: 8 },
  { date: "7/13", profit: -67.3, roi: -3.2, bets: 6 },
  { date: "7/14", profit: 389.75, roi: 17.8, bets: 14 },
]

const propTypePerformance = [
  { type: "Total Bases", profit: 1245.8, roi: 29.9, bets: 42, winRate: 67.6 },
  { type: "Hits", profit: 987.45, roi: 22.1, bets: 38, winRate: 62.2 },
  { type: "RBIs", profit: 756.2, roi: 19.0, bets: 35, winRate: 57.9 },
  { type: "Home Runs", profit: 534.15, roi: 12.1, bets: 28, winRate: 58.3 },
  { type: "Strikeouts", profit: 423.9, roi: 6.44, bets: 65, winRate: 56.5 },
  { type: "Walks", profit: 189.75, roi: 1.87, bets: 21, winRate: 50.0 },
]

const recentBets = [
  {
    id: 1,
    player: "Brice Turang",
    prop: "o0.5 Total Bases",
    odds: "-145",
    stake: 100,
    result: "W",
    profit: 68.97,
    date: "7/19",
    confidence: 73,
  },
  {
    id: 2,
    player: "Mookie Betts",
    prop: "o1.5 Hits",
    odds: "+120",
    stake: 75,
    result: "W",
    profit: 90.0,
    date: "7/19",
    confidence: 81,
  },
  {
    id: 3,
    player: "Aaron Judge",
    prop: "o1.5 RBIs",
    odds: "-110",
    stake: 110,
    result: "L",
    profit: -110.0,
    date: "7/18",
    confidence: 65,
  },
  {
    id: 4,
    player: "Juan Soto",
    prop: "o0.5 Home Runs",
    odds: "+180",
    stake: 50,
    result: "W",
    profit: 90.0,
    date: "7/18",
    confidence: 58,
  },
]

export default function ROIAnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState("14d")
  const [viewType, setViewType] = useState("profit")

  const totalProfit = performanceData.reduce((sum, day) => sum + day.profit, 0)
  const totalBets = performanceData.reduce((sum, day) => sum + day.bets, 0)
  const winningDays = performanceData.filter((day) => day.profit > 0).length
  const avgROI = performanceData.reduce((sum, day) => sum + day.roi, 0) / performanceData.length

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-foreground">ROI Analytics</h2>
        <div className="flex gap-2">
          {["7d", "14d", "30d", "90d"].map((period) => (
            <Button
              key={period}
              variant={timeframe === period ? "default" : "outline"}
              size="sm"
              onClick={() => setTimeframe(period)}
              className="text-xs"
            >
              {period}
            </Button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-accent/20 rounded-lg flex items-center justify-center">
                <DollarSign className="w-5 h-5 text-accent" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">${totalProfit.toFixed(2)}</p>
                <p className="text-xs text-muted-foreground">Total Profit</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <TrendingUp className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{avgROI.toFixed(1)}%</p>
                <p className="text-xs text-muted-foreground">Avg ROI</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-3/20 rounded-lg flex items-center justify-center">
                <Target className="w-5 h-5 text-chart-3" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{totalBets}</p>
                <p className="text-xs text-muted-foreground">Total Bets</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-chart-4/20 rounded-lg flex items-center justify-center">
                <Calendar className="w-5 h-5 text-chart-4" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {winningDays}/{performanceData.length}
                </p>
                <p className="text-xs text-muted-foreground">Winning Days</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Chart */}
      <Card className="bg-card border-border">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-foreground">Performance Trend</CardTitle>
            <div className="flex gap-2">
              <Button
                variant={viewType === "profit" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("profit")}
                className="text-xs"
              >
                Profit
              </Button>
              <Button
                variant={viewType === "roi" ? "default" : "outline"}
                size="sm"
                onClick={() => setViewType("roi")}
                className="text-xs"
              >
                ROI
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <ChartContainer
            config={{
              profit: {
                label: "Profit ($)",
                color: "hsl(var(--chart-1))",
              },
              roi: {
                label: "ROI (%)",
                color: "hsl(var(--chart-2))",
              },
            }}
            className="h-[200px]"
          >
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey={viewType}
                  stroke={viewType === "profit" ? "var(--color-chart-1)" : "var(--color-chart-2)"}
                  strokeWidth={2}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </CardContent>
      </Card>

      {/* Prop Type Performance */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Prop Type Performance</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {propTypePerformance.map((prop, index) => (
              <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">{prop.type}</p>
                  <p className="text-xs text-muted-foreground">
                    {prop.bets} bets • {prop.winRate}% win rate
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-bold text-accent">${prop.profit.toFixed(2)}</p>
                  <Badge className="bg-primary/20 text-primary border-primary/30 text-xs">{prop.roi}% ROI</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Bets */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="text-foreground">Recent Bets</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {recentBets.map((bet) => (
              <div key={bet.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-sm font-medium text-foreground">{bet.player}</p>
                    <Badge
                      className={
                        bet.result === "W"
                          ? "bg-accent/20 text-accent border-accent/30"
                          : "bg-destructive/20 text-destructive border-destructive/30"
                      }
                    >
                      {bet.result}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {bet.prop} • {bet.odds}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Stake: ${bet.stake} • {bet.date}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`text-sm font-bold ${bet.profit > 0 ? "text-accent" : "text-destructive"}`}>
                    {bet.profit > 0 ? "+" : ""}${bet.profit.toFixed(2)}
                  </p>
                  <p className="text-xs text-muted-foreground">{bet.confidence}% confidence</p>
                </div>
              </div>
            ))}
          </div>
          <Button variant="outline" className="w-full mt-4 bg-transparent">
            View All Bets
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
