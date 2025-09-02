"use client"

import type React from "react"

import { useState, useCallback } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Upload, X, Eye, Brain, TrendingUp } from "lucide-react"

interface UploadedImage {
  id: string
  file: File
  url: string
  analysis?: {
    sport: string
    confidence: number
    keyInsights: string[]
    prediction: string
    riskLevel: "low" | "medium" | "high"
  }
}

export default function ImageUpload() {
  const [images, setImages] = useState<UploadedImage[]>([])
  const [dragActive, setDragActive] = useState(false)
  const [analyzing, setAnalyzing] = useState<string | null>(null)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }, [])

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = Array.from(e.dataTransfer.files)
    handleFiles(files)
  }, [])

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    handleFiles(files)
  }

  const handleFiles = (files: File[]) => {
    const imageFiles = files.filter((file) => file.type.startsWith("image/"))

    imageFiles.forEach((file) => {
      const id = Math.random().toString(36).substr(2, 9)
      const url = URL.createObjectURL(file)

      const newImage: UploadedImage = { id, file, url }
      setImages((prev) => [...prev, newImage])

      // Start AI analysis
      analyzeImage(id, file)
    })
  }

  const analyzeImage = async (imageId: string, file: File) => {
    setAnalyzing(imageId)

    // Mock AI analysis - simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Mock analysis results
    const sports = ["Basketball", "Football", "Soccer", "Baseball", "Tennis"]
    const sport = sports[Math.floor(Math.random() * sports.length)]
    const confidence = 75 + Math.random() * 20

    const insights = [
      `${sport} game detected with high accuracy`,
      `Player positioning analysis complete`,
      `Weather conditions: Favorable`,
      `Historical performance data integrated`,
    ]

    const predictions = [
      "Home team favored by 3.5 points",
      "Over 2.5 goals likely",
      "Player performance above average",
      "Weather impact minimal",
    ]

    const analysis = {
      sport,
      confidence: Math.round(confidence),
      keyInsights: insights.slice(0, 2 + Math.floor(Math.random() * 2)),
      prediction: predictions[Math.floor(Math.random() * predictions.length)],
      riskLevel: confidence > 85 ? "low" : confidence > 70 ? "medium" : ("high" as const),
    }

    setImages((prev) => prev.map((img) => (img.id === imageId ? { ...img, analysis } : img)))
    setAnalyzing(null)
  }

  const removeImage = (id: string) => {
    setImages((prev) => {
      const image = prev.find((img) => img.id === id)
      if (image) {
        URL.revokeObjectURL(image.url)
      }
      return prev.filter((img) => img.id !== id)
    })
  }

  const getRiskColor = (risk: string) => {
    switch (risk) {
      case "low":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "medium":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "high":
        return "bg-chart-1/20 text-chart-1 border-chart-1/30"
      default:
        return "bg-muted"
    }
  }

  return (
    <div className="space-y-6">
      {/* Upload Area */}
      <Card className="bg-card border-border">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-card-foreground">
            <Upload className="w-5 h-5 text-primary" />
            Image Analysis
          </CardTitle>
          <CardDescription>Upload sports images for AI-powered analysis and insights</CardDescription>
        </CardHeader>
        <CardContent>
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${
              dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
            onClick={() => document.getElementById("file-input")?.click()}
          >
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground mb-1">Drag & drop images or click to browse</p>
            <p className="text-xs text-muted-foreground">Supports JPG, PNG, WebP up to 10MB</p>
          </div>
          <input id="file-input" type="file" multiple accept="image/*" onChange={handleFileInput} className="hidden" />
        </CardContent>
      </Card>

      {/* Uploaded Images */}
      {images.length > 0 && (
        <div className="grid gap-4 md:grid-cols-2">
          {images.map((image) => (
            <Card key={image.id} className="bg-card border-border">
              <CardContent className="p-4">
                <div className="relative mb-4">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt="Uploaded sports image"
                    className="w-full h-48 object-cover rounded-lg"
                  />
                  <Button
                    variant="destructive"
                    size="icon"
                    className="absolute top-2 right-2 w-6 h-6"
                    onClick={() => removeImage(image.id)}
                  >
                    <X className="w-3 h-3" />
                  </Button>
                </div>

                {analyzing === image.id ? (
                  <div className="flex items-center justify-center py-8">
                    <div className="flex items-center gap-3">
                      <Brain className="w-5 h-5 text-primary animate-pulse" />
                      <span className="text-sm text-muted-foreground">AI analyzing image...</span>
                    </div>
                  </div>
                ) : image.analysis ? (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <h4 className="font-semibold text-card-foreground">{image.analysis.sport}</h4>
                      <Badge className={getRiskColor(image.analysis.riskLevel)}>
                        {image.analysis.confidence}% confidence
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-card-foreground flex items-center gap-1">
                        <Eye className="w-3 h-3" />
                        Key Insights
                      </h5>
                      <ul className="text-xs text-muted-foreground space-y-1">
                        {image.analysis.keyInsights.map((insight, idx) => (
                          <li key={idx} className="flex items-start gap-1">
                            <span className="text-primary">•</span>
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2 mb-1">
                        <TrendingUp className="w-3 h-3 text-primary" />
                        <span className="text-xs font-medium text-card-foreground">AI Prediction</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{image.analysis.prediction}</p>
                    </div>
                  </div>
                ) : null}
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
