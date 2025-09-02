"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Brain, Zap, Target, Play, Pause, RotateCcw, TrendingUp, AlertTriangle } from "lucide-react"
import { Progress } from "@/components/ui/progress"

interface PredictionModel {
  id: string
  name: string
  accuracy: number
  sport: string
  description: string
  status: "active" | "training" | "inactive"
}

interface GeneratedPrediction {
  id: string
  game: string
  prediction: string
  confidence: number
  expectedValue: number
  riskLevel: "low" | "medium" | "high"
  factors: string[]
  timestamp: Date
}

const aiModels: PredictionModel[] = [
  {
    id: "1",
    name: "DeepSports Neural Network",
    accuracy: 92.3,
    sport: "Basketball",
    description: "Advanced neural network trained on 10+ years of NBA data",
    status: "active",
  },
  {
    id: "2",
    name: "GridIron Predictor",
    accuracy: 89.7,
    sport: "Football",
    description: "Ensemble model combining weather, player stats, and team dynamics",
    status: "active",
  },
  {
    id: "3",
    name: "Soccer Analytics Engine",
    accuracy: 87.1,
    sport: "Soccer",
    description: "Real-time analysis of player positions and team formations",
    status: "training",
  },
  {
    id: "4",
    name: "Baseball Sabermetrics AI",
    accuracy: 91.5,
    sport: "Baseball",
    description: "Statistical analysis model with advanced sabermetrics",
    status: "active",
  },
  {
    id: "5",
    name: "Tennis Match Predictor",
    accuracy: 88.9,
    sport: "Tennis",
    description: "Surface-specific model analyzing player performance patterns",
    status: "inactive",
  },
]

export default function AIPredictionEngine() {
  const [selectedModel, setSelectedModel] = useState("1")
  const [isGenerating, setIsGenerating] = useState(false)
  const [generationProgress, setGenerationProgress] = useState(0)
  const [predictions, setPredictions] = useState<GeneratedPrediction[]>([])
  const [confidenceThreshold, setConfidenceThreshold] = useState([75])
  const [riskTolerance, setRiskTolerance] = useState("medium")
  const [autoGenerate, setAutoGenerate] = useState(false)

  // Auto-generation effect
  useEffect(() => {
    let interval: NodeJS.Timeout
    if (autoGenerate) {
      interval = setInterval(() => {
        generatePrediction()
      }, 30000) // Generate every 30 seconds
    }
    return () => clearInterval(interval)
  }, [autoGenerate])

  const generatePrediction = async () => {
    setIsGenerating(true)
    setGenerationProgress(0)

    // Simulate AI processing with progress updates
    const progressInterval = setInterval(() => {
      setGenerationProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 200)

    // Simulate processing time
    await new Promise((resolve) => setTimeout(resolve, 2000 + Math.random() * 3000))

    // Generate mock prediction
    const games = [
      "Lakers vs Warriors",
      "Chiefs vs Bills",
      "Real Madrid vs Barcelona",
      "Yankees vs Red Sox",
      "Celtics vs Heat",
      "Cowboys vs Giants",
    ]

    const predictionTypes = ["Point Spread", "Over/Under", "Moneyline", "Player Props", "Team Total"]

    const factors = [
      "Recent team performance",
      "Player injury reports",
      "Weather conditions",
      "Historical matchup data",
      "Home field advantage",
      "Rest days analysis",
      "Coaching strategies",
      "Player momentum",
      "Betting market trends",
    ]

    const game = games[Math.floor(Math.random() * games.length)]
    const predType = predictionTypes[Math.floor(Math.random() * predictionTypes.length)]
    const confidence = Math.floor(Math.random() * 25) + 70 // 70-95%
    const expectedValue = Math.random() * 0.3 + 0.05 // 5-35% EV
    const riskLevel = confidence > 85 ? "low" : confidence > 75 ? "medium" : "high"

    const selectedFactors = factors.sort(() => 0.5 - Math.random()).slice(0, 3 + Math.floor(Math.random() * 3))

    const newPrediction: GeneratedPrediction = {
      id: Math.random().toString(36).substr(2, 9),
      game,
      prediction: `${predType}: ${game.split(" vs ")[0]} ${Math.random() > 0.5 ? "+" : "-"}${(Math.random() * 10 + 1).toFixed(1)}`,
      confidence,
      expectedValue,
      riskLevel: riskLevel as "low" | "medium" | "high",
      factors: selectedFactors,
      timestamp: new Date(),
    }

    setPredictions((prev) => [newPrediction, ...prev.slice(0, 9)]) // Keep last 10
    setIsGenerating(false)
    setGenerationProgress(0)
  }

  const getModelStatus = (status: string) => {
    switch (status) {
      case "active":
        return "bg-chart-4/20 text-chart-4 border-chart-4/30"
      case "training":
        return "bg-chart-2/20 text-chart-2 border-chart-2/30"
      case "inactive":
        return "bg-muted text-muted-foreground"
      default:
        return "bg-muted"
    }
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
      {/* Engine Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
            <Brain className="w-6 h-6 text-primary" />
            AI Prediction Engine
          </h2>
          <p className="text-muted-foreground">Advanced machine learning predictions and analysis</p>
        </div>
        <div className="flex items-center gap-3">
          <Button
            variant={autoGenerate ? "default" : "outline"}
            onClick={() => setAutoGenerate(!autoGenerate)}
            className="flex items-center gap-2"
          >
            {autoGenerate ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            {autoGenerate ? "Stop Auto" : "Auto Generate"}
          </Button>
          <Button onClick={generatePrediction} disabled={isGenerating} className="flex items-center gap-2">
            {isGenerating ? <RotateCcw className="w-4 h-4 animate-spin" /> : <Zap className="w-4 h-4" />}
            Generate Prediction
          </Button>
        </div>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="generate">Generate</TabsTrigger>
          <TabsTrigger value="models">AI Models</TabsTrigger>
          <TabsTrigger value="settings">Settings</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          {/* Generation Status */}
          {isGenerating && (
            <Card className="bg-card border-border">
              <CardContent className="p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Brain className="w-5 h-5 text-primary animate-pulse" />
                  <span className="font-medium text-card-foreground">AI Processing...</span>
                </div>
                <Progress value={generationProgress} className="w-full" />
                <p className="text-xs text-muted-foreground mt-2">Analyzing data patterns and generating predictions</p>
              </CardContent>
            </Card>
          )}

          {/* Recent Predictions */}
          <div className="grid gap-4">
            {predictions.map((prediction) => (
              <Card key={prediction.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h4 className="font-semibold text-card-foreground">{prediction.game}</h4>
                      <p className="text-sm text-muted-foreground">{prediction.prediction}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getRiskColor(prediction.riskLevel)}>{prediction.confidence}% confidence</Badge>
                      <Badge variant="outline" className="text-xs">
                        +{(prediction.expectedValue * 100).toFixed(1)}% EV
                      </Badge>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-xs font-medium text-card-foreground flex items-center gap-1">
                      <Target className="w-3 h-3" />
                      Key Factors
                    </h5>
                    <div className="flex flex-wrap gap-1">
                      {prediction.factors.map((factor, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {factor}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-3 pt-3 border-t border-border">
                    <span className="text-xs text-muted-foreground">
                      Generated {prediction.timestamp.toLocaleTimeString()}
                    </span>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        View Details
                      </Button>
                      <Button size="sm">Place Bet</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {predictions.length === 0 && !isGenerating && (
            <Card className="bg-card border-border">
              <CardContent className="p-8 text-center">
                <Brain className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="font-semibold text-card-foreground mb-2">No Predictions Yet</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  Generate your first AI-powered prediction to get started
                </p>
                <Button onClick={generatePrediction} className="flex items-center gap-2">
                  <Zap className="w-4 h-4" />
                  Generate First Prediction
                </Button>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="models" className="space-y-6">
          <div className="grid gap-4">
            {aiModels.map((model) => (
              <Card key={model.id} className="bg-card border-border">
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h4 className="font-semibold text-card-foreground">{model.name}</h4>
                        <Badge className={getModelStatus(model.status)}>{model.status}</Badge>
                        <Badge variant="outline">{model.sport}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{model.description}</p>
                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-chart-4" />
                          <span className="text-sm font-medium text-card-foreground">{model.accuracy}% Accuracy</span>
                        </div>
                        {model.status === "training" && (
                          <div className="flex items-center gap-2">
                            <AlertTriangle className="w-4 h-4 text-chart-2" />
                            <span className="text-sm text-muted-foreground">Training in progress</span>
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Button size="sm" variant="outline">
                        Configure
                      </Button>
                      <Button
                        size="sm"
                        variant={selectedModel === model.id ? "default" : "outline"}
                        onClick={() => setSelectedModel(model.id)}
                        disabled={model.status !== "active"}
                      >
                        {selectedModel === model.id ? "Selected" : "Select"}
                      </Button>
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
                <CardTitle className="text-card-foreground">Prediction Parameters</CardTitle>
                <CardDescription>Configure AI prediction settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="confidence">Minimum Confidence Threshold</Label>
                  <div className="px-3">
                    <Slider
                      id="confidence"
                      min={50}
                      max={95}
                      step={5}
                      value={confidenceThreshold}
                      onValueChange={setConfidenceThreshold}
                      className="w-full"
                    />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>50%</span>
                      <span className="font-medium">{confidenceThreshold[0]}%</span>
                      <span>95%</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="risk">Risk Tolerance</Label>
                  <Select value={riskTolerance} onValueChange={setRiskTolerance}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Conservative (Low Risk)</SelectItem>
                      <SelectItem value="medium">Balanced (Medium Risk)</SelectItem>
                      <SelectItem value="high">Aggressive (High Risk)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-card-foreground">Auto-Generation</CardTitle>
                <CardDescription>Automated prediction settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="text-sm font-medium">Auto Generate</Label>
                    <p className="text-xs text-muted-foreground">Automatically generate predictions every 30 seconds</p>
                  </div>
                  <Button
                    variant={autoGenerate ? "default" : "outline"}
                    size="sm"
                    onClick={() => setAutoGenerate(!autoGenerate)}
                  >
                    {autoGenerate ? "ON" : "OFF"}
                  </Button>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="model-select">Active Model</Label>
                  <Select value={selectedModel} onValueChange={setSelectedModel}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {aiModels
                        .filter((m) => m.status === "active")
                        .map((model) => (
                          <SelectItem key={model.id} value={model.id}>
                            {model.name} ({model.accuracy}%)
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
