"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, Users, Calendar } from "lucide-react"

interface Team {
  id: string
  name: string
  city: string
  abbreviation: string
  league: string
  division: string
  wins: number
  losses: number
  winPercentage: number
  streak: string
  lastGame: {
    opponent: string
    score: string
    result: "W" | "L"
    date: string
  }
  nextGame: {
    opponent: string
    date: string
    time: string
    location: string
  }
  keyPlayers: Array<{
    name: string
    position: string
    stats: string
  }>
}

const mlbTeams: Team[] = [
  {
    id: "dodgers",
    name: "Dodgers",
    city: "Los Angeles",
    abbreviation: "LAD",
    league: "MLB",
    division: "NL West",
    wins: 98,
    losses: 64,
    winPercentage: 0.605,
    streak: "W3",
    lastGame: {
      opponent: "vs Brewers",
      score: "8-5",
      result: "W",
      date: "7/18",
    },
    nextGame: {
      opponent: "vs Brewers",
      date: "7/19",
      time: "9:10 PM",
      location: "Dodger Stadium",
    },
    keyPlayers: [
      { name: "Mookie Betts", position: "RF", stats: ".289 BA, 19 HR, 75 RBI" },
      { name: "Freddie Freeman", position: "1B", stats: ".331 BA, 22 HR, 89 RBI" },
      { name: "Walker Buehler", position: "P", stats: "14-4, 3.26 ERA, 159 K" },
    ],
  },
  {
    id: "brewers",
    name: "Brewers",
    city: "Milwaukee",
    abbreviation: "MIL",
    league: "MLB",
    division: "NL Central",
    wins: 89,
    losses: 73,
    winPercentage: 0.549,
    streak: "L2",
    lastGame: {
      opponent: "@ Dodgers",
      score: "5-8",
      result: "L",
      date: "7/18",
    },
    nextGame: {
      opponent: "@ Dodgers",
      date: "7/19",
      time: "9:10 PM",
      location: "Dodger Stadium",
    },
    keyPlayers: [
      { name: "Brice Turang", position: "2B", stats: ".254 BA, 7 HR, 50 RBI" },
      { name: "William Contreras", position: "C", stats: ".281 BA, 15 HR, 78 RBI" },
      { name: "Corbin Burnes", position: "P", stats: "15-9, 2.92 ERA, 181 K" },
    ],
  },
  {
    id: "yankees",
    name: "Yankees",
    city: "New York",
    abbreviation: "NYY",
    league: "MLB",
    division: "AL East",
    wins: 94,
    losses: 68,
    winPercentage: 0.58,
    streak: "W1",
    lastGame: {
      opponent: "vs Red Sox",
      score: "7-3",
      result: "W",
      date: "7/18",
    },
    nextGame: {
      opponent: "vs Red Sox",
      date: "7/19",
      time: "7:05 PM",
      location: "Yankee Stadium",
    },
    keyPlayers: [
      { name: "Aaron Judge", position: "RF", stats: ".322 BA, 58 HR, 144 RBI" },
      { name: "Juan Soto", position: "LF", stats: ".288 BA, 41 HR, 109 RBI" },
      { name: "Gerrit Cole", position: "P", stats: "8-5, 3.41 ERA, 209 K" },
    ],
  },
]

const wnbaTeams: Team[] = [
  {
    id: "aces",
    name: "Aces",
    city: "Las Vegas",
    abbreviation: "LV",
    league: "WNBA",
    division: "Western Conference",
    wins: 27,
    losses: 13,
    winPercentage: 0.675,
    streak: "W2",
    lastGame: {
      opponent: "vs Storm",
      score: "85-78",
      result: "W",
      date: "7/18",
    },
    nextGame: {
      opponent: "@ Liberty",
      date: "7/20",
      time: "3:00 PM",
      location: "Barclays Center",
    },
    keyPlayers: [
      { name: "A'ja Wilson", position: "F", stats: "26.9 PPG, 11.9 RPG, 2.3 BPG" },
      { name: "Kelsey Plum", position: "G", stats: "17.8 PPG, 4.2 APG, 1.8 SPG" },
      { name: "Jackie Young", position: "G", stats: "15.8 PPG, 5.1 APG, 1.9 SPG" },
    ],
  },
]

interface SportsTeamsProps {
  league: string
}

export default function SportsTeams({ league }: SportsTeamsProps) {
  const teams = league === "MLB" ? mlbTeams : league === "WNBA" ? wnbaTeams : []

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-bold text-foreground">{league} Teams</h2>
        <Badge variant="outline" className="text-xs">
          {teams.length} Teams
        </Badge>
      </div>

      {teams.map((team) => (
        <Card key={team.id} className="bg-card border-border">
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                  <span className="text-sm font-bold text-primary">{team.abbreviation}</span>
                </div>
                <div>
                  <CardTitle className="text-base text-foreground">
                    {team.city} {team.name}
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">{team.division}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-bold text-foreground">
                  {team.wins}-{team.losses}
                </p>
                <p className="text-xs text-muted-foreground">{(team.winPercentage * 100).toFixed(1)}%</p>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-4">
            {/* Recent Performance */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground">LAST GAME</h4>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      team.lastGame.result === "W"
                        ? "bg-accent/20 text-accent border-accent/30"
                        : "bg-destructive/20 text-destructive border-destructive/30"
                    }
                  >
                    {team.lastGame.result}
                  </Badge>
                  <span className="text-sm text-foreground">{team.lastGame.opponent}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {team.lastGame.score} • {team.lastGame.date}
                </p>
              </div>

              <div className="space-y-2">
                <h4 className="text-xs font-semibold text-muted-foreground">NEXT GAME</h4>
                <div className="flex items-center gap-2">
                  <Calendar className="w-3 h-3 text-muted-foreground" />
                  <span className="text-sm text-foreground">{team.nextGame.opponent}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {team.nextGame.date} • {team.nextGame.time}
                </p>
              </div>
            </div>

            {/* Current Streak */}
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Current Streak:</span>
              <Badge
                className={
                  team.streak.startsWith("W")
                    ? "bg-accent/20 text-accent border-accent/30"
                    : "bg-destructive/20 text-destructive border-destructive/30"
                }
              >
                {team.streak.startsWith("W") ? (
                  <TrendingUp className="w-3 h-3 mr-1" />
                ) : (
                  <TrendingDown className="w-3 h-3 mr-1" />
                )}
                {team.streak}
              </Badge>
            </div>

            {/* Key Players */}
            <div className="space-y-2">
              <h4 className="text-xs font-semibold text-muted-foreground flex items-center gap-1">
                <Users className="w-3 h-3" />
                KEY PLAYERS
              </h4>
              <div className="space-y-2">
                {team.keyPlayers.map((player, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-foreground">{player.name}</p>
                      <p className="text-xs text-muted-foreground">{player.position}</p>
                    </div>
                    <p className="text-xs text-muted-foreground text-right">{player.stats}</p>
                  </div>
                ))}
              </div>
            </div>

            <Button variant="outline" size="sm" className="w-full bg-transparent">
              View Team Details
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
