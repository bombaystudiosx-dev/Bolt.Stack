"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BarChart3, TrendingUp, Activity, Clock } from "lucide-react"
import {
  Line,
  LineChart,
  Bar,
  BarChart,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

// Mock data for charts
const performanceData = [
  { month: "Jan", wins: 65, losses: 35, accuracy: 85 },
  { month: "Feb", wins: 72, losses: 28, accuracy: 88 },
  { month: "Mar", wins: 68, losses: 32, accuracy: 86 },
  { month: "Apr", wins: 75, losses: 25, accuracy: 90 },
  { month: "May", wins: 71, losses: 29, accuracy: 87 },
  { month: "Jun", wins: 78, losses: 22, accuracy: 92 },
]

const sportsData = [
  { sport: "Basketball", predictions: 145, accuracy: 89, color: "#8b5cf6" },
  { sport: "Football", predictions: 98, accuracy: 92, color: "#06b6d4" },
  { sport: "Soccer", predictions: 87, accuracy: 85, color: "#10b981" },
  { sport: "Baseball", predictions: 76, accuracy: 88, color: "#f59e0b" },
  { sport: "Tennis", predictions: 54, accuracy: 91, color: "#ef4444" },
]

const liveGames = [
  {
    id: 1,
    home: "Lakers",
    away: "Warriors",
    homeScore: 98,
    awayScore: 102,
    quarter: "4th",
    time: "2:34",
    prediction: "Warriors +3.5",
    confidence: 87,
  },
  {
    id: 2,
    home: "Chiefs",
    away: "Bills",
    homeScore: 21,
    awayScore: 14,
    quarter: "3rd",
    time: "8:45",
    prediction: "Over 47.5",
    confidence: 92,
  },
  {
    id: 3,
    home: "Real Madrid",
    away: "Barcelona",
    homeScore: 1,
    awayScore: 2,
    quarter: "78'",
    time: "Live",
    prediction: "Barcelona ML",
    confidence: 78,
  },
]

const recentPredictions = [
  { game: "Celtics vs Heat", prediction: "Celtics -4.5", result: "Win", profit: "+$250", confidence: 89 },
  { game: "Cowboys vs Giants", prediction: "Under 45.5", result: "Win", profit: "+$180", confidence: 85 },
  { game: "Man City vs Liverpool", prediction: "Over 2.5 Goals", result: "Loss", profit: "-$100", confidence: 76 },
  { game: "Yankees vs Red Sox", prediction: "Yankees ML", result: "Win", profit: "+$320", confidence: 91 },
]

export default function SportsDashboard() {
  const [selectedSport, setSelectedSport] = useState("all")
  const [timeRange, setTimeRange] = useState("6m")

  return (
    <div className="space-y-6">
      {/* Dashboard Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground">Sports Analytics Dashboard</h2>
          <p className="text-muted-foreground">Real-time data and AI-powered insights</p>
        </div>
        <div className="flex items-center gap-3">
          <Select value={selectedSport} onValueChange={setSelectedSport}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sports</SelectItem>
              <SelectItem value="basketball">Basketball</SelectItem>
              <SelectItem value="football">Football</SelectItem>
              <SelectItem value="soccer">Soccer</SelectItem>
              <SelectItem value="baseball">Baseball</SelectItem>
            </SelectContent>
          </Select>
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-24">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1w">1W</SelectItem>
              <SelectItem value="1m">1M</SelectItem>
              <SelectItem value="3m">3M</SelectItem>
              <SelectItem value="6m">6M</SelectItem>
              <SelectItem value="1y">1Y</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="live">Live Games</TabsTrigger>
          <TabsTrigger value="history">History</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-1/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-4 h-4 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">89.2%</p>
                    <p className="text-xs text-muted-foreground">Overall Accuracy</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-2/20 rounded-lg flex items-center justify-center">
                    <BarChart3 className="w-4 h-4 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">460</p>
                    <p className="text-xs text-muted-foreground">Total Predictions</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-3/20 rounded-lg flex items-center justify-center">
                    <Activity className="w-4 h-4 text-chart-3" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground text-chart-4">+$2,847</p>
                    <p className="text-xs text-muted-foreground">Total Profit</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-chart-4/20 rounded-lg flex items-center justify-center">
                    <Clock className="w-4 h-4 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-card-foreground">12</p>
                    <p className="text-xs text-muted-foreground">Active Games</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Charts Row */}
          <div className="grid gap-6 md:grid-cols-2">
            {/* Performance Chart */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Monthly Performance</CardTitle>
                <CardDescription>Win rate and accuracy trends</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    accuracy: {
                      label: "Accuracy %",
                      color: "hsl(var(--chart-1))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Line
                        type="monotone"
                        dataKey="accuracy"
                        stroke="var(--color-accuracy)"
                        strokeWidth={2}
                        dot={{ fill: "var(--color-accuracy)" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>

            {/* Sports Distribution */}
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Sports Distribution</CardTitle>
                <CardDescription>Predictions by sport category</CardDescription>
              </CardHeader>
              <CardContent>
                <ChartContainer
                  config={{
                    predictions: {
                      label: "Predictions",
                      color: "hsl(var(--chart-2))",
                    },
                  }}
                  className="h-[300px]"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={sportsData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="predictions"
                        label={({ sport, predictions }) => `${sport}: ${predictions}`}
                      >
                        {sportsData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <ChartTooltip content={<ChartTooltipContent />} />
                    </PieChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Win/Loss Analysis</CardTitle>
              <CardDescription>Monthly breakdown of prediction results</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  wins: {
                    label: "Wins",
                    color: "hsl(var(--chart-4))",
                  },
                  losses: {
                    label: "Losses",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[400px]"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="wins" fill="var(--color-wins)" />
                    <Bar dataKey="losses" fill="var(--color-losses)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="live" className="space-y-6">
          <div className="grid gap-4">
            {liveGames.map((game) => (
              <Card key={game.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <p className="font-semibold text-card-foreground">{game.home}</p>
                        <p className="text-2xl font-bold text-primary">{game.homeScore}</p>
                      </div>
                      <div className="text-center text-muted-foreground">
                        <p className="text-sm">vs</p>
                        <Badge variant="outline" className="text-xs">
                          {game.quarter} {game.time}
                        </Badge>
                      </div>
                      <div className="text-center">
                        <p className="font-semibold text-card-foreground">{game.away}</p>
                        <p className="text-2xl font-bold text-primary">{game.awayScore}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-card-foreground">{game.prediction}</p>
                      <Badge className="bg-chart-4/20 text-chart-4 border-chart-4/30">
                        {game.confidence}% confidence
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Recent Predictions</CardTitle>
              <CardDescription>Latest prediction results and performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentPredictions.map((pred, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                    <div>
                      <p className="font-medium text-card-foreground">{pred.game}</p>
                      <p className="text-sm text-muted-foreground">{pred.prediction}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`${pred.result === "Win" ? "bg-chart-4/20 text-chart-4 border-chart-4/30" : "bg-chart-1/20 text-chart-1 border-chart-1/30"}`}
                      >
                        {pred.result}
                      </Badge>
                      <span
                        className={`font-semibold ${pred.profit.startsWith("+") ? "text-chart-4" : "text-chart-1"}`}
                      >
                        {pred.profit}
                      </span>
                      <Badge variant="outline" className="text-xs">
                        {pred.confidence}%
                      </Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
