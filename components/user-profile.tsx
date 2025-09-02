"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { TrendingUp, Calendar, Download, Edit, Star, Target } from "lucide-react"
import { Line, LineChart, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

interface BettingHistory {
  id: string
  date: Date
  game: string
  prediction: string
  stake: number
  odds: number
  result: "win" | "loss" | "pending"
  profit: number
  confidence: number
}

interface Achievement {
  id: string
  title: string
  description: string
  icon: string
  unlocked: boolean
  unlockedDate?: Date
}

const mockUser = {
  name: "Alex Rodriguez",
  email: "alex@braxbeta.com",
  avatar: "/placeholder-user.png",
  joinDate: new Date("2024-01-15"),
  tier: "Pro Analyst",
  totalProfit: 2847.5,
  winRate: 89.2,
  totalBets: 247,
  streak: 12,
  favoritesSport: "Basketball",
}

const performanceData = [
  { month: "Jan", profit: 450, winRate: 85 },
  { month: "Feb", profit: 720, winRate: 88 },
  { month: "Mar", profit: 580, winRate: 86 },
  { month: "Apr", profit: 890, winRate: 90 },
  { month: "May", profit: 650, winRate: 87 },
  { month: "Jun", profit: 1120, winRate: 92 },
]

const bettingHistory: BettingHistory[] = [
  {
    id: "1",
    date: new Date("2024-06-15"),
    game: "Lakers vs Warriors",
    prediction: "Lakers -4.5",
    stake: 100,
    odds: 1.91,
    result: "win",
    profit: 91,
    confidence: 89,
  },
  {
    id: "2",
    date: new Date("2024-06-14"),
    game: "Chiefs vs Bills",
    prediction: "Over 47.5",
    stake: 150,
    odds: 1.85,
    result: "win",
    profit: 127.5,
    confidence: 92,
  },
  {
    id: "3",
    date: new Date("2024-06-13"),
    game: "Real Madrid vs Barcelona",
    prediction: "Barcelona ML",
    stake: 200,
    odds: 2.1,
    result: "loss",
    profit: -200,
    confidence: 76,
  },
  {
    id: "4",
    date: new Date("2024-06-12"),
    game: "Yankees vs Red Sox",
    prediction: "Yankees ML",
    stake: 120,
    odds: 1.75,
    result: "win",
    profit: 90,
    confidence: 91,
  },
  {
    id: "5",
    date: new Date("2024-06-11"),
    game: "Celtics vs Heat",
    prediction: "Under 215.5",
    stake: 80,
    odds: 1.95,
    result: "pending",
    profit: 0,
    confidence: 85,
  },
]

const achievements: Achievement[] = [
  {
    id: "1",
    title: "First Win",
    description: "Won your first prediction",
    icon: "🎯",
    unlocked: true,
    unlockedDate: new Date("2024-01-16"),
  },
  {
    id: "2",
    title: "Hot Streak",
    description: "Won 10 predictions in a row",
    icon: "🔥",
    unlocked: true,
    unlockedDate: new Date("2024-03-22"),
  },
  {
    id: "3",
    title: "Profit Master",
    description: "Earned $1000+ in profits",
    icon: "💰",
    unlocked: true,
    unlockedDate: new Date("2024-04-10"),
  },
  {
    id: "4",
    title: "AI Expert",
    description: "Used AI predictions 100+ times",
    icon: "🤖",
    unlocked: true,
    unlockedDate: new Date("2024-05-15"),
  },
  { id: "5", title: "High Roller", description: "Place a bet over $500", icon: "💎", unlocked: false },
  { id: "6", title: "Perfect Month", description: "Win every bet in a calendar month", icon: "⭐", unlocked: false },
]

export default function UserProfile() {
  const [isEditing, setIsEditing] = useState(false)
  const [notifications, setNotifications] = useState(true)
  const [autoAnalysis, setAutoAnalysis] = useState(true)

  const getResultColor = (result: string) => {
    switch (result) {
      case "win":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "loss":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      case "pending":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      default:
        return "bg-muted"
    }
  }

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Pro Analyst":
        return "bg-gradient-to-r from-purple-500 to-blue-500"
      case "Expert":
        return "bg-gradient-to-r from-gold-500 to-yellow-500"
      default:
        return "bg-primary"
    }
  }

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="bg-card border-border">
        <CardContent className="p-6">
          <div className="flex items-start gap-6">
            <div className="relative">
              <Avatar className="w-24 h-24">
                <AvatarImage src={mockUser.avatar || "/placeholder.svg"} alt={mockUser.name} />
                <AvatarFallback className="text-2xl">
                  {mockUser.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <Button
                size="icon"
                variant="outline"
                className="absolute -bottom-2 -right-2 w-8 h-8 bg-transparent"
                onClick={() => setIsEditing(!isEditing)}
              >
                <Edit className="w-3 h-3" />
              </Button>
            </div>

            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-foreground">{mockUser.name}</h2>
                <Badge className={`${getTierColor(mockUser.tier)} text-white border-0`}>{mockUser.tier}</Badge>
              </div>
              <p className="text-muted-foreground mb-4">{mockUser.email}</p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-2xl font-bold text-chart-4">${mockUser.totalProfit.toLocaleString()}</p>
                  <p className="text-xs text-muted-foreground">Total Profit</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.winRate}%</p>
                  <p className="text-xs text-muted-foreground">Win Rate</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-foreground">{mockUser.totalBets}</p>
                  <p className="text-xs text-muted-foreground">Total Bets</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-primary">{mockUser.streak}</p>
                  <p className="text-xs text-muted-foreground">Win Streak</p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="history" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="history">Betting History</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="history" className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-foreground">Recent Betting History</h3>
            <Button variant="outline" className="flex items-center gap-2 bg-transparent">
              <Download className="w-4 h-4" />
              Export CSV
            </Button>
          </div>

          <div className="space-y-3">
            {bettingHistory.map((bet) => (
              <Card key={bet.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-card-foreground">{bet.game}</h4>
                        <Badge className={getResultColor(bet.result)}>{bet.result}</Badge>
                        <Badge variant="outline" className="text-xs">
                          {bet.confidence}% confidence
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{bet.prediction}</p>
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <span>Stake: ${bet.stake}</span>
                        <span>Odds: {bet.odds}</span>
                        <span>{bet.date.toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <p
                        className={`text-lg font-bold ${bet.profit > 0 ? "text-chart-4" : bet.profit < 0 ? "text-chart-1" : "text-muted-foreground"}`}
                      >
                        {bet.profit > 0 ? "+" : ""}${bet.profit.toFixed(2)}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="performance" className="space-y-6">
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Performance Analytics</CardTitle>
              <CardDescription>Your betting performance over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer
                config={{
                  profit: {
                    label: "Monthly Profit",
                    color: "hsl(var(--chart-4))",
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
                      dataKey="profit"
                      stroke="var(--color-profit)"
                      strokeWidth={3}
                      dot={{ fill: "var(--color-profit)", strokeWidth: 2, r: 4 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chart-4/20 rounded-lg flex items-center justify-center">
                    <TrendingUp className="w-5 h-5 text-chart-4" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-card-foreground">+24.7%</p>
                    <p className="text-xs text-muted-foreground">ROI This Month</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chart-1/20 rounded-lg flex items-center justify-center">
                    <Target className="w-5 h-5 text-chart-1" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-card-foreground">Basketball</p>
                    <p className="text-xs text-muted-foreground">Best Sport (94% WR)</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-chart-2/20 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-chart-2" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-card-foreground">156</p>
                    <p className="text-xs text-muted-foreground">Days Active</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`bg-card border-border ${achievement.unlocked ? "ring-1 ring-primary/20" : "opacity-60"}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{achievement.icon}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-card-foreground">{achievement.title}</h4>
                        {achievement.unlocked && <Star className="w-4 h-4 text-primary" />}
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{achievement.description}</p>
                      {achievement.unlocked && achievement.unlockedDate && (
                        <p className="text-xs text-primary">Unlocked {achievement.unlockedDate.toLocaleDateString()}</p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Profile Settings</CardTitle>
                <CardDescription>Manage your account preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Display Name</Label>
                  <Input id="name" defaultValue={mockUser.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue={mockUser.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sport">Favorite Sport</Label>
                  <Select defaultValue="basketball">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="basketball">Basketball</SelectItem>
                      <SelectItem value="football">Football</SelectItem>
                      <SelectItem value="soccer">Soccer</SelectItem>
                      <SelectItem value="baseball">Baseball</SelectItem>
                      <SelectItem value="tennis">Tennis</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Preferences</CardTitle>
                <CardDescription>Customize your BRAXBETA experience</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Push Notifications</Label>
                    <p className="text-xs text-muted-foreground">Get notified about new predictions</p>
                  </div>
                  <Switch checked={notifications} onCheckedChange={setNotifications} />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Analysis</Label>
                    <p className="text-xs text-muted-foreground">Automatically analyze uploaded images</p>
                  </div>
                  <Switch checked={autoAnalysis} onCheckedChange={setAutoAnalysis} />
                </div>

                <div className="pt-4">
                  <Button className="w-full">Save Changes</Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
