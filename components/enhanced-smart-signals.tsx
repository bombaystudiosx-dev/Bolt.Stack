"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Zap, TrendingUp, Star, Clock } from "lucide-react"
import { useState } from "react"

interface SmartSignal {
  id: string
  player: string
  position: string
  team: string
  opponent: string
  prop: string
  line: string
  prediction: string
  winProb: string
  roi: string
  time: string
  confidence: number
  factors: string[]
  isHot: boolean
  league: string
  propType: string
}

const smartSignalsData: SmartSignal[] = [
  {
    id: "1",
    player: "Brice Turang",
    position: "2B",
    team: "Brewers",
    opponent: "@ Dodgers",
    prop: "o0.5 Total Bases",
    line: "-145",
    prediction: "1.7",
    winProb: "69.9%",
    roi: "29.9%",
    time: "7/19 9:10 PM",
    confidence: 73,
    factors: ["Brice Turang Props", "Total Bases", "Win Probability 60-70%"],
    isHot: true,
    league: "MLB",
    propType: "Total Bases",
  },
  {
    id: "2",
    player: "Mookie Betts",
    position: "RF",
    team: "Dodgers",
    opponent: "vs Brewers",
    prop: "o1.5 Hits",
    line: "+120",
    prediction: "2.1",
    winProb: "74.2%",
    roi: "22.1%",
    time: "7/19 9:10 PM",
    confidence: 81,
    factors: ["Home Advantage", "Recent Form", "Pitcher Matchup"],
    isHot: true,
    league: "MLB",
    propType: "Hits",
  },
  {
    id: "3",
    player: "A'ja Wilson",
    position: "F",
    team: "Aces",
    opponent: "@ Liberty",
    prop: "o26.5 Points",
    line: "-110",
    prediction: "28.3",
    winProb: "71.8%",
    roi: "18.5%",
    time: "7/20 3:00 PM",
    confidence: 79,
    factors: ["A'ja Wilson Props", "Points", "Away Performance"],
    isHot: true,
    league: "WNBA",
    propType: "Points",
  },
  {
    id: "4",
    player: "Kelsey Plum",
    position: "G",
    team: "Aces",
    opponent: "@ Liberty",
    prop: "o4.5 Assists",
    line: "+105",
    prediction: "5.2",
    winProb: "68.4%",
    roi: "15.3%",
    time: "7/20 3:00 PM",
    confidence: 71,
    factors: ["Kelsey Plum Props", "Assists", "Matchup Advantage"],
    isHot: false,
    league: "WNBA",
    propType: "Assists",
  },
]

interface EnhancedSmartSignalsProps {
  league: string
}

export default function EnhancedSmartSignals({ league }: EnhancedSmartSignalsProps) {
  const [selectedPropType, setSelectedPropType] = useState("all")

  const filteredSignals = smartSignalsData.filter(
    (signal) => signal.league === league && (selectedPropType === "all" || signal.propType === selectedPropType),
  )

  const propTypes = [
    "all",
    ...Array.from(new Set(smartSignalsData.filter((s) => s.league === league).map((s) => s.propType))),
  ]

  return (
    <div className="space-y-4">
      {/* Smart Signals Info */}
      <Card className="bg-gradient-to-r from-primary/10 to-accent/10 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-start gap-3">
            <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
              <Zap className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground mb-1">Smart Signals</h3>
              <p className="text-sm text-muted-foreground">
                AI-detected patterns where the model has shown a high win rate and ROI under specific conditions.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Prop Type Filter */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {propTypes.map((type) => (
          <Button
            key={type}
            variant={selectedPropType === type ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedPropType(type)}
            className="whitespace-nowrap text-xs"
          >
            {type === "all" ? "All Props" : type}
          </Button>
        ))}
      </div>

      {/* Smart Signal Props */}
      {filteredSignals.map((signal) => (
        <Card key={signal.id} className="bg-card border-border">
          <CardContent className="p-4">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-xs font-bold">{signal.team.slice(0, 2)}</span>
                </div>
                <div>
                  <h4 className="font-semibold text-foreground">{signal.player}</h4>
                  <p className="text-xs text-muted-foreground">{signal.position}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {signal.isHot && (
                  <Badge className="bg-primary/20 text-primary border-primary/30">
                    <Zap className="w-3 h-3 mr-1" />
                    SMART SIGNALS
                  </Badge>
                )}
                <Badge className="bg-accent/20 text-accent border-accent/30">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {signal.roi}
                </Badge>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{signal.prop}</span>
                <span className="text-sm font-medium">{signal.line}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">{signal.opponent}</span>
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <Clock className="w-3 h-3" />
                  {signal.time}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">BRAXBETA Predicts:</span>
                <span className="text-sm font-medium">{signal.prediction}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-muted-foreground">Win Prob</span>
                <span className="text-sm font-bold text-accent">{signal.winProb}</span>
              </div>
            </div>

            {/* Confidence Indicator */}
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xs text-muted-foreground">Confidence:</span>
              <div className="flex-1 bg-muted/20 rounded-full h-2">
                <div
                  className="bg-primary h-2 rounded-full transition-all duration-300"
                  style={{ width: `${signal.confidence}%` }}
                />
              </div>
              <span className="text-xs font-medium text-foreground">{signal.confidence}%</span>
            </div>

            {/* Smart Signal Details */}
            {signal.isHot && (
              <Card className="bg-primary/5 border-primary/20">
                <CardContent className="p-3">
                  <div className="flex items-start gap-2 mb-2">
                    <Zap className="w-4 h-4 text-primary mt-0.5" />
                    <div>
                      <h5 className="text-sm font-semibold text-foreground">SMART SIGNALS</h5>
                      <p className="text-xs text-muted-foreground">
                        This bet aligns with where the BRAXBETA Model has been hot.
                      </p>
                    </div>
                  </div>

                  <div className="space-y-1 mb-3">
                    <p className="text-xs text-muted-foreground">When betting on:</p>
                    {signal.factors.map((factor, index) => (
                      <p key={index} className="text-xs text-foreground">
                        • {factor}
                      </p>
                    ))}
                  </div>

                  <p className="text-xs text-muted-foreground mb-2">
                    The model hits{" "}
                    <span className="font-bold text-foreground">{signal.confidence}% of the time this season</span> (
                    {Math.floor(signal.confidence * 0.4)}-{Math.floor(signal.confidence * 0.6)} bets) when these
                    conditions are met.
                  </p>

                  <Button variant="outline" size="sm" className="w-full text-xs bg-transparent">
                    Breakdown ↗
                  </Button>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <div className="flex gap-2 mt-4">
              <Button variant="outline" size="sm" className="flex-1 bg-transparent">
                <Star className="w-3 h-3 mr-1" />
                Track
              </Button>
              <Button size="sm" className="flex-1">
                View Details
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {filteredSignals.length === 0 && (
        <Card className="bg-card border-border">
          <CardContent className="p-8 text-center">
            <Zap className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-foreground mb-2">No Smart Signals</h3>
            <p className="text-muted-foreground">
              No smart signals available for {league} {selectedPropType !== "all" ? selectedPropType : "props"} at the
              moment.
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
