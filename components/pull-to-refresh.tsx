"use client"

import type React from "react"

import { useState } from "react"
import { RefreshCw } from "lucide-react"

interface PullToRefreshProps {
  onRefresh: () => Promise<void>
  children: React.ReactNode
}

export default function PullToRefresh({ onRefresh, children }: PullToRefreshProps) {
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [startY, setStartY] = useState(0)

  const handleTouchStart = (e: React.TouchEvent) => {
    setStartY(e.touches[0].clientY)
  }

  const handleTouchMove = (e: React.TouchEvent) => {
    const currentY = e.touches[0].clientY
    const distance = currentY - startY

    if (distance > 0 && window.scrollY === 0) {
      setPullDistance(Math.min(distance, 100))
    }
  }

  const handleTouchEnd = async () => {
    if (pullDistance > 60 && !isRefreshing) {
      setIsRefreshing(true)
      try {
        await onRefresh()
      } finally {
        setIsRefreshing(false)
      }
    }
    setPullDistance(0)
  }

  return (
    <div onTouchStart={handleTouchStart} onTouchMove={handleTouchMove} onTouchEnd={handleTouchEnd} className="relative">
      {/* Pull to refresh indicator */}
      <div
        className="absolute top-0 left-0 right-0 flex items-center justify-center transition-all duration-200 ease-out z-10"
        style={{
          transform: `translateY(${Math.max(pullDistance - 60, -60)}px)`,
          opacity: pullDistance > 20 ? 1 : 0,
        }}
      >
        <div className="bg-card/90 backdrop-blur-sm rounded-full p-3 shadow-lg border border-border">
          <RefreshCw
            className={`w-5 h-5 text-primary transition-transform duration-200 ${isRefreshing ? "animate-spin" : ""}`}
            style={{
              transform: `rotate(${pullDistance * 3}deg)`,
            }}
          />
        </div>
      </div>

      <div
        className="transition-transform duration-200 ease-out"
        style={{ transform: `translateY(${Math.min(pullDistance * 0.5, 50)}px)` }}
      >
        {children}
      </div>
    </div>
  )
}
