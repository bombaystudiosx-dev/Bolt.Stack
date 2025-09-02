"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Clock, MapPin, TrendingUp } from "lucide-react"

interface Game {
  id: string
  homeTeam: {
    name: string
    abbreviation: string
    record: string
  }
  awayTeam: {
    name: string
    abbreviation: string
    record: string
  }
  date: string
  time: string
  venue: string
  status: "scheduled" | "live" | "final"
  score?: {
    home: number
    away: number
  }
  predictions?: {
    spread: string
    total: string
    moneyline: string
    confidence: number
  }
}

const todaysGames: Game[] = [
  {
    id: "1",
    homeTeam: {
      name: "Dodgers",
      abbreviation: "LAD",
      record: "98-64",
    },
    awayTeam: {
      name: "Brewers",
      abbreviation: "MIL",
      record: "89-73",
    },
    date: "7/19",
    time: "9:10 PM",
    venue: "Dodger Stadium",
    status: "scheduled",
    predictions: {
      spread: "LAD -1.5",
      total: "O 8.5",
      moneyline: "LAD -145",
      confidence: 78,
    },
  },
  {
    id: "2",
    homeTeam: {
      name: "Yankees",
      abbreviation: "NYY",
      record: "94-68",
    },
    awayTeam: {
      name: "Red Sox",
      abbreviation: "BOS",
      record: "81-81",
    },
    date: "7/19",
    time: "7:05 PM",
    venue: "Yankee Stadium",
    status: "scheduled",
    predictions: {
      spread: "NYY -2.5",
      total: "O 9.0",
      moneyline: "NYY -180",
      confidence: 85,
    },
  },
  {
    id: "3",
    homeTeam: {
      name: "Astros",
      abbreviation: "HOU",
      record: "88-74",
    },
    awayTeam: {
      name: "Mariners",
      abbreviation: "SEA",
      record: "85-77",
    },
    date: "7/19",
    time: "8:10 PM",
    venue: "Minute Maid Park",
    status: "live",
    score: {
      home: 3,
      away: 2,
    },
    predictions: {
      spread: "HOU -1.0",
      total: "U 8.0",
      moneyline: "HOU -125",
      confidence: 72,
    },
  },
]

interface GameScheduleProps {
  league: string
}

export default function GameSchedule({ league }: GameScheduleProps) {
  const games = todaysGames

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">Today's Games</h2>
        <Badge variant="outline" className="text-xs">
          {games.length} Games
        </Badge>
      </div>

      {games.map((game) => (
        <Card key={game.id} className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">{game.time}</span>
                {game.status === "live" && (
                  <Badge className="bg-destructive/20 text-destructive border-destructive/30 animate-pulse">LIVE</Badge>
                )}
              </div>
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <MapPin className="w-3 h-3" />
                {game.venue}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Teams and Score */}
            <div className="flex items-center justify-between">
              <div className="flex-1">
                {/* Away Team */}
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold">{game.awayTeam.abbreviation}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{game.awayTeam.name}</p>
                      <p className="text-xs text-muted-foreground">{game.awayTeam.record}</p>
                    </div>
                  </div>
                  {game.score && <span className="text-lg font-bold text-foreground">{game.score.away}</span>}
                </div>

                {/* Home Team */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
                      <span className="text-xs font-bold text-primary">{game.homeTeam.abbreviation}</span>
                    </div>
                    <div>
                      <p className="text-sm font-medium text-foreground">{game.homeTeam.name}</p>
                      <p className="text-xs text-muted-foreground">{game.homeTeam.record}</p>
                    </div>
                  </div>
                  {game.score && <span className="text-lg font-bold text-foreground">{game.score.home}</span>}
                </div>
              </div>
            </div>

            {/* AI Predictions */}
            {game.predictions && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-center gap-2 mb-2">
                    <TrendingUp className="w-4 h-4 text-primary" />
                    <h4 className="text-sm font-semibold text-foreground">AI Predictions</h4>
                    <Badge className="bg-accent/20 text-accent border-accent/30 text-xs">
                      {game.predictions.confidence}% Confidence
                    </Badge>
                  </div>

                  <div className="grid grid-cols-3 gap-3 text-xs">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Spread</p>
                      <p className="font-medium text-foreground">{game.predictions.spread}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Total</p>
                      <p className="font-medium text-foreground">{game.predictions.total}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-muted-foreground mb-1">Moneyline</p>
                      <p className="font-medium text-foreground">{game.predictions.moneyline}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            <div className="flex gap-2">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                View Props
              </Button>
              <Button size="sm" className="flex-1">
                Get Predictions
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
