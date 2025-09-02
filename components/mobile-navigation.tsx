"use client"
import { Home, TrendingUp, Calendar, BarChart3, User } from "lucide-react"
import { cn } from "@/lib/utils"

interface MobileNavigationProps {
  activeTab: string
  onTabChange: (tab: string) => void
}

export default function MobileNavigation({ activeTab, onTabChange }: MobileNavigationProps) {
  const navItems = [
    { id: "home", label: "Home", icon: Home },
    { id: "props", label: "Props", icon: TrendingUp },
    { id: "games", label: "Games", icon: Calendar },
    { id: "models", label: "Models", icon: BarChart3 },
    { id: "research", label: "Research", icon: User },
  ]

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-card/95 backdrop-blur-md border-t border-border z-50 safe-area-pb">
      <div className="flex items-center justify-around py-2 px-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = activeTab === item.id

          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={cn(
                "flex flex-col items-center justify-center py-3 px-4 rounded-xl transition-all duration-200 ease-in-out transform active:scale-95 min-w-[60px]",
                isActive
                  ? "text-primary bg-primary/10 shadow-sm"
                  : "text-muted-foreground hover:text-foreground hover:bg-muted/20 active:bg-muted/30",
              )}
            >
              <div className={cn("relative transition-all duration-200", isActive && "transform -translate-y-0.5")}>
                <Icon
                  className={cn("w-5 h-5 mb-1 transition-all duration-200", isActive && "text-primary scale-110")}
                />
                {isActive && (
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-primary rounded-full animate-pulse" />
                )}
              </div>
              <span
                className={cn(
                  "text-xs font-medium transition-all duration-200",
                  isActive ? "text-primary font-semibold" : "text-muted-foreground",
                )}
              >
                {item.label}
              </span>
            </button>
          )
        })}
      </div>
    </nav>
  )
}
