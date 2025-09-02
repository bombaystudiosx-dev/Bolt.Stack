"use client"

export default function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="relative">
        <div className="w-8 h-8 border-4 border-muted rounded-full animate-spin border-t-primary"></div>
        <div className="absolute inset-0 w-8 h-8 border-4 border-transparent rounded-full animate-ping border-t-primary/20"></div>
      </div>
    </div>
  )
}
