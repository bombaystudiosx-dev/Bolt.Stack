"use client"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, TrendingDown } from "lucide-react"

interface PropTypeData {
  type: string
  winRate: number
  record: string
  roi: number
  isPositive: boolean
}

const propTypeData: PropTypeData[] = [
  {
    type: "Pts + Asts + Rebs",
    winRate: 67.6,
    record: "25 - 11",
    roi: 29.9,
    isPositive: true,
  },
  {
    type: "3 Pts",
    winRate: 62.2,
    record: "23 - 14",
    roi: 22.1,
    isPositive: true,
  },
  {
    type: "Asts",
    winRate: 57.9,
    record: "22 - 16",
    roi: 19.0,
    isPositive: true,
  },
  {
    type: "Reb + Asts",
    winRate: 58.3,
    record: "14 - 10",
    roi: 12.1,
    isPositive: true,
  },
  {
    type: "Pts + Asts",
    winRate: 56.5,
    record: "65 - 50",
    roi: 6.44,
    isPositive: true,
  },
  {
    type: "Rebs",
    winRate: 50.0,
    record: "21 - 21",
    roi: 1.87,
    isPositive: true,
  },
]

export default function PropTypeAnalytics() {
  return (
    <div className="space-y-4">
      <div className="flex bg-muted/20 rounded-lg p-1">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-muted-foreground">By Prop</button>
        <button className="flex-1 px-4 py-2 text-sm font-medium bg-primary text-primary-foreground rounded-md">
          By Prop Type
        </button>
      </div>

      <div className="space-y-3">
        <div className="flex justify-between items-center text-xs font-semibold text-muted-foreground">
          <span>Type</span>
          <span>Win Rate</span>
          <span>ROI ↓</span>
        </div>

        {propTypeData.map((prop, index) => (
          <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-b-0">
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{prop.type}</p>
              <p className="text-xs text-muted-foreground">{prop.record}</p>
            </div>

            <div className="text-center min-w-[60px]">
              <p className="text-sm font-medium text-foreground">{prop.winRate}%</p>
            </div>

            <div className="text-right min-w-[80px]">
              <Badge
                className={`${
                  prop.isPositive
                    ? "bg-accent/20 text-accent border-accent/30"
                    : "bg-destructive/20 text-destructive border-destructive/30"
                }`}
              >
                {prop.isPositive ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                {prop.roi}%
              </Badge>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
