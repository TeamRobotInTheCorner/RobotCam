"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Camera,
  Settings,
  Wifi,
  WifiOff,
  Play,
  Pause,
  RotateCcw,
  Eye,
  EyeOff,
  Monitor,
  AlertCircle,
  Home,
  Globe,
  Shield,
  Info,
} from "lucide-react"

interface CameraFeed {
  id: string
  name: string
  endpoint: string
  status: "connected" | "disconnected" | "connecting" | "error"
  resolution: string
  fps: number
  streamUrl?: string
}

export default function UnitreeG1CameraViewer() {
  const [robotIP, setRobotIP] = useState("192.168.1.100")
  const [robotPort, setRobotPort] = useState("8080")
  const [isConnected, setIsConnected] = useState(false)
  const [connectionError, setConnectionError] = useState("")
  const [isLocalNetwork, setIsLocalNetwork] = useState(true)
  const [cameras, setCameras] = useState<CameraFeed[]>([
    {
      id: "head_front",
      name: "Head Front Camera",
      endpoint: "/camera/front/stream",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "head_left",
      name: "Head Left Camera",
      endpoint: "/camera/left/stream",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "head_right",
      name: "Head Right Camera",
      endpoint: "/camera/right/stream",
      status: "disconnected",
      resolution: "1920x1080",
      fps: 30,
    },
    {
      id: "depth",
      name: "Depth Camera",
      endpoint: "/camera/depth/stream",
      status: "disconnected",
      resolution: "640x480",
      fps: 15,
    },
  ])

  const videoRefs = useRef<{ [key: string]: HTMLVideoElement | null }>({})

  // Detect if running locally
  useEffect(() => {
    const hostname = window.location.hostname
    const isLocal = hostname === "localhost" || hostname === "127.0.0.1" || hostname.startsWith("192.168.")
    setIsLocalNetwork(isLocal)
  }, [])

  // Test robot connectivity
  const testRobotConnection = async (ip: string, port: string): Promise<boolean> => {
    try {
      let testUrl: string

      if (isLocalNetwork) {
        // Direct connection for local network
        testUrl = `http://${ip}:${port}/api/status`
      } else {
        // Use proxy for remote connections
        testUrl = `/api/robot?ip=${ip}&port=${port}&endpoint=/api/status`
      }

      const response = await fetch(testUrl, {
        method: "GET",
        mode: isLocalNetwork ? "cors" : "same-origin",
        headers: {
          "Content-Type": "application/json",
        },
        signal: AbortSignal.timeout(10000), // 10 second timeout for remote
      })
      return response.ok
    } catch (error) {
      console.error("Connection test failed:", error)
      return false
    }
  }

  // Connect to robot
  const connectToRobot = async () => {
    setConnectionError("")
    setIsConnected(false)
    setCameras((prev) => prev.map((cam) => ({ ...cam, status: "connecting" })))

    try {
      // Test basic connectivity first
      const isReachable = await testRobotConnection(robotIP, robotPort)

      if (!isReachable) {
        const errorMsg = isLocalNetwork
          ? `Cannot reach robot at ${robotIP}:${robotPort}. Please check IP address and ensure both devices are on the same WiFi network.`
          : `Cannot reach robot at ${robotIP}:${robotPort}. Please check port forwarding configuration and public IP address.`
        throw new Error(errorMsg)
      }

      setIsConnected(true)

      // Initialize camera streams
      const updatedCameras = cameras.map((camera) => ({
        ...camera,
        status: "connected" as const,
        streamUrl: isLocalNetwork
          ? `http://${robotIP}:${robotPort}${camera.endpoint}`
          : `/api/stream?ip=${robotIP}&port=${robotPort}&camera=${camera.id}`,
      }))

      setCameras(updatedCameras)

      // Start video streams
      setTimeout(() => {
        updatedCameras.forEach((camera) => {
          startVideoStream(camera.id, camera.streamUrl!)
        })
      }, 1000)
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown connection error"
      setConnectionError(errorMessage)
      setCameras((prev) => prev.map((cam) => ({ ...cam, status: "error" })))
    }
  }

  // Start individual video stream
  const startVideoStream = async (cameraId: string, streamUrl: string) => {
    const videoElement = videoRefs.current[cameraId]
    if (!videoElement) return

    try {
      videoElement.src = streamUrl
      videoElement.load()

      videoElement.onloadstart = () => {
        setCameras((prev) => prev.map((cam) => (cam.id === cameraId ? { ...cam, status: "connected" } : cam)))
      }

      videoElement.onerror = () => {
        setCameras((prev) => prev.map((cam) => (cam.id === cameraId ? { ...cam, status: "error" } : cam)))
      }
    } catch (error) {
      console.error(`Failed to start stream for ${cameraId}:`, error)
      setCameras((prev) => prev.map((cam) => (cam.id === cameraId ? { ...cam, status: "error" } : cam)))
    }
  }

  // Disconnect from robot
  const disconnectFromRobot = () => {
    setIsConnected(false)
    setConnectionError("")

    // Stop all video streams
    Object.values(videoRefs.current).forEach((video) => {
      if (video) {
        video.src = ""
        video.load()
      }
    })

    setCameras((prev) =>
      prev.map((cam) => ({
        ...cam,
        status: "disconnected",
        streamUrl: undefined,
      })),
    )
  }

  // Toggle individual camera feed
  const toggleCameraFeed = (cameraId: string) => {
    const camera = cameras.find((cam) => cam.id === cameraId)
    if (!camera || !isConnected) return

    const videoElement = videoRefs.current[cameraId]
    if (!videoElement) return

    if (camera.status === "connected") {
      videoElement.src = ""
      setCameras((prev) => prev.map((cam) => (cam.id === cameraId ? { ...cam, status: "disconnected" } : cam)))
    } else {
      if (camera.streamUrl) {
        startVideoStream(cameraId, camera.streamUrl)
      }
    }
  }

  // Get status color for UI
  const getStatusColor = (status: string) => {
    switch (status) {
      case "connected":
        return "bg-green-500"
      case "connecting":
        return "bg-yellow-500"
      case "error":
        return "bg-red-500"
      default:
        return "bg-gray-500"
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
          <div className="flex items-center gap-3">
            <Badge variant={isLocalNetwork ? "default" : "secondary"} className="flex items-center gap-2">
              {isLocalNetwork ? <Home className="w-4 h-4" /> : <Globe className="w-4 h-4" />}
              {isLocalNetwork ? "Local Network" : "Remote Access"}
            </Badge>
            <Badge variant={isConnected ? "default" : "secondary"} className="flex items-center gap-2">
              {isConnected ? <Wifi className="w-4 h-4" /> : <WifiOff className="w-4 h-4" />}
              {isConnected ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </div>

        {/* Setup Instructions */}
        {!isLocalNetwork && (
          <Card className="border-orange-200 bg-orange-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800">
                <Shield className="w-5 h-5" />
                Remote Access Detected
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-sm text-orange-700 space-y-2">
                <p>
                  You're accessing this app remotely. For security and performance, we recommend running it locally on
                  your network.
                </p>
                <div className="flex items-center gap-2">
                  <Info className="w-4 h-4" />
                  <span>
                    <strong>Local Setup:</strong> Download and run{" "}
                    <code className="bg-orange-100 px-1 rounded">npm run dev</code> on your laptop
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Connection Panel */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Robot Connection
            </CardTitle>
            <CardDescription>
              {isLocalNetwork
                ? "Connect to your Unitree G1 robot on the local network"
                : "Connect to your Unitree G1 robot via port forwarding"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="md:col-span-2">
                <Label htmlFor="robot-ip">
                  {isLocalNetwork ? "Robot IP Address (Local)" : "Public IP Address / Domain"}
                </Label>
                <Input
                  id="robot-ip"
                  value={robotIP}
                  onChange={(e) => setRobotIP(e.target.value)}
                  placeholder={isLocalNetwork ? "192.168.1.100" : "your-public-ip.com"}
                  disabled={isConnected}
                />
              </div>
              <div>
                <Label htmlFor="robot-port">Port</Label>
                <Input
                  id="robot-port"
                  value={robotPort}
                  onChange={(e) => setRobotPort(e.target.value)}
                  placeholder="8080"
                  disabled={isConnected}
                />
              </div>
            </div>

            {connectionError && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-500" />
                <span className="text-sm text-red-700">{connectionError}</span>
              </div>
            )}

            <div className="flex items-center gap-4">
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

              <div className="text-sm text-gray-600">
                {isLocalNetwork
                  ? "Make sure your G1 and laptop are on the same WiFi network"
                  : "Ensure port forwarding is configured on your router"}
              </div>
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
                <div className="relative aspect-video bg-gray-900">
                  {camera.status === "connected" && camera.streamUrl ? (
                    <video
                      ref={(el) => (videoRefs.current[camera.id] = el)}
                      className="w-full h-full object-cover"
                      autoPlay
                      muted
                      playsInline
                      controls={false}
                    />
                  ) : camera.status === "connecting" ? (
                    <div className="w-full h-full flex items-center justify-center text-gray-400">
                      <div className="text-center">
                        <RotateCcw className="w-8 h-8 mx-auto mb-2 animate-spin" />
                        <p className="text-sm">Connecting to camera...</p>
                      </div>
                    </div>
                  ) : camera.status === "error" ? (
                    <div className="w-full h-full flex items-center justify-center text-red-400">
                      <div className="text-center">
                        <AlertCircle className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Camera Error</p>
                        <p className="text-xs mt-1">Check robot connection</p>
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-gray-500">
                      <div className="text-center">
                        <EyeOff className="w-8 h-8 mx-auto mb-2" />
                        <p className="text-sm">Camera Offline</p>
                      </div>
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
                        Stop Feed
                      </>
                    ) : (
                      <>
                        <Eye className="w-4 h-4" />
                        Start Feed
                      </>
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Setup Instructions Tabs */}
        <Card>
          <CardHeader>
            <CardTitle>Setup Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue={isLocalNetwork ? "local" : "remote"} className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="local" className="flex items-center gap-2">
                  <Home className="w-4 h-4" />
                  Local Network (Recommended)
                </TabsTrigger>
                <TabsTrigger value="remote" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  Remote Access
                </TabsTrigger>
              </TabsList>

              <TabsContent value="local" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">1. Connect G1 to WiFi</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Access G1's network settings</li>
                      <li>• Connect to your home/office WiFi</li>
                      <li>• Note the assigned IP address</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Run App Locally</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Download this code to your laptop</li>
                      <li>
                        • Run: <code className="bg-gray-100 px-1 rounded">npm run dev</code>
                      </li>
                      <li>
                        • Access at: <code className="bg-gray-100 px-1 rounded">localhost:3000</code>
                      </li>
                    </ul>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="remote" className="space-y-4">
                <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-md mb-4">
                  <div className="flex items-center gap-2 text-yellow-800">
                    <Shield className="w-4 h-4" />
                    <strong>Security Warning:</strong> Port forwarding exposes your robot to the internet
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h4 className="font-medium mb-2">1. Configure Router</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Access router admin panel</li>
                      <li>• Forward port 8080 to G1's IP</li>
                      <li>• Note your public IP address</li>
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2">2. Connect Remotely</h4>
                    <ul className="text-sm text-gray-600 space-y-1">
                      <li>• Enter your public IP above</li>
                      <li>• Use strong passwords</li>
                      <li>• Consider VPN instead</li>
                    </ul>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        {/* System Information */}
        <Card>
          <CardHeader>
            <CardTitle>Connection Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-sm">
              <div>
                <Label className="text-gray-600">Target Address</Label>
                <p className="font-medium">
                  {robotIP}:{robotPort}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Connection Type</Label>
                <p className="font-medium">{isLocalNetwork ? "Local Network" : "Remote Access"}</p>
              </div>
              <div>
                <Label className="text-gray-600">Active Cameras</Label>
                <p className="font-medium">
                  {cameras.filter((cam) => cam.status === "connected").length} / {cameras.length}
                </p>
              </div>
              <div>
                <Label className="text-gray-600">Stream Protocol</Label>
                <p className="font-medium">HTTP/MJPEG</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
