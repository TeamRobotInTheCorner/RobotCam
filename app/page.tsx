"use client"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Camera, Settings, Wifi, WifiOff, Play, Pause, RotateCcw, Eye, EyeOff, Monitor } from "lucide-react"

interface CameraFeed {
  id: string
  name: string
  url: string
  status: "connected" | "disconnected" | "connecting"
  resolution: string
  fps: number
}

export default function UnitreeG1CameraViewer() {
  const [robotIP, setRobotIP] = useState("192.168.1.100")
  const [isConnected, setIsConnected] = useState(false)
  const [cameras, setCameras] = useState<CameraFeed[]>([
    {
      id: "head_front",
      name: "Head Front Camera",
      url: "",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "head_left",
      name: "Head Left Camera",
      url: "",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "head_right",
      name: "Head Right Camera",
      url: "",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "depth",
      name: "Depth Camera",
      url: "",
      status: "disconnected",
      resolution: "640x480",
      fps: 15,
    },
  ])

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  const connectToRobot = async () => {
    setIsConnected(true)
    // Simulate connection process
    setCameras((prev) => prev.map((cam) => ({ ...cam, status: "connecting" })))

    // Simulate successful connection after 2 seconds
    setTimeout(() => {
      setCameras((prev) =>
        prev.map((cam) => ({
          ...cam,
          status: "connected",
          url: `http://${robotIP}:8080/camera/${cam.id}/stream`,
        })),
      )
    }, 2000)
  }

  const disconnectFromRobot = () => {
    setIsConnected(false)
    setCameras((prev) =>
      prev.map((cam) => ({
        ...cam,
        status: "disconnected",
        url: "",
      })),
    )
  }

  const toggleCameraFeed = (cameraId: string) => {
    setCameras((prev) =>
      prev.map((cam) =>
        cam.id === cameraId ? { ...cam, status: cam.status === "connected" ? "disconnected" : "connected" } : cam,
      ),
    )
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      default:
        return "bg-red-500"
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-lg">
              <Camera className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Unitree G1 Camera Viewer</h1>
              <p className="text-gray-600">Real-time camera feeds from your Unitree G1 Humanoid</p>
            </div>
          </div>
          <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-2">
            {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
            {isConnected ? "Connected" : "Disconnected"}
          </Badge>
        </div>

        {/* Connection Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Robot Connection
            </CardTitle>
            <CardDescription>Configure connection to your Unitree G1 robot</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-end gap-4">
              <div className="flex-1">
                <Label htmlFor="robot-ip">Robot IP Address</Label>
                <Input
                  id="robot-ip"
                  value={robotIP}
                  onChange={(e) => setRobotIP(e.target.value)}
                  placeholder="192.168.1.100"
                  disabled={isConnected}
                />
              </div>
              <Button
                onClick={isConnected ? disconnectFromRobot : connectToRobot}
                variant={isConnected ? "destructive" : "default"}
                className="flex items-center gap-2"
              >
                {isConnected ? (
                  <>
                    <Pause className="w-4 h-4" />
                    Disconnect
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    Connect
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Camera Feeds Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {cameras.map((camera) => (
            <Card key={camera.id} className="overflow-hidden">
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Monitor className="w-5 h-5" />
                    {camera.name}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <div className={`w-2 h-2 rounded-full ${getStatusColor(camera.status)}`} />
                    <span className="text-sm text-gray-600 capitalize">{camera.status}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <span>{camera.resolution}</span>
                  <Separator orientation="vertical" className="h-4" />
                  <span>{camera.fps} FPS</span>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative aspect-video bg-gray-900 flex items-center justify-center">
                  {camera.status === "connected" ? (
                    <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                      <div className="text-center text-gray-400">
                        <Camera className="w-12 h-12 mx-auto mb-2 opacity-50" />
                        <p className="text-sm">Camera feed would display here</p>
                        <p className="text-xs mt-1">Stream: {camera.url}</p>
                      </div>
                    </div>
                  ) : camera.status === "connecting" ? (
                    <div className="text-center text-gray-400">
                      <RotateCcw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                      <p className="text-sm">Connecting...</p>
                    </div>
                  ) : (
                    <div className="text-center text-gray-500">
                      <EyeOff className="w-8 h-8 mx-auto mb-2" />
                      <p className="text-sm">Camera Offline</p>
                    </div>
                  )}
                </div>
                <div className="p-4 bg-gray-50 border-t">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => toggleCameraFeed(camera.id)}
                    disabled={!isConnected}
                    className="w-full flex items-center gap-2"
                  >
                    {camera.status === "connected" ? (
                      <>
                        <EyeOff className="w-4 h-4" />
                        Hide Feed
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Show Feed
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Status Information */}
        <Card>
          <CardHeader>
            <CardTitle>System Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Robot Model</Label>
                <p className="font-medium">Unitree G1 Humanoid</p>
              </div>
              <div>
                <Label className="text-gray-600">Connection Type</Label>
                <p className="font-medium">TCP/IP Network</p>
              </div>
              <div>
                <Label className="text-gray-600">Active Cameras</Label>
                <p className="font-medium">
                  {cameras.filter((cam) => cam.status === "connected").length} / {cameras.length}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
