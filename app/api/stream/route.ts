import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const robotIP = searchParams.get("ip")
  const robotPort = searchParams.get("port") || "8080"
  const camera = searchParams.get("camera")

  if (!robotIP || !camera) {
    return NextResponse.json({ error: "Robot IP and camera ID are required" }, { status: 400 })
  }

  try {
    const streamUrl = `http://${robotIP}:${robotPort}/camera/${camera}/stream`

    const response = await fetch(streamUrl, {
      method: "GET",
      headers: {
        Accept: "multipart/x-mixed-replace, image/jpeg",
      },
    })

    if (!response.ok) {
      throw new Error(`Stream not available: ${response.status}`)
    }

    // Proxy the stream with proper headers
    return new NextResponse(response.body, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "multipart/x-mixed-replace; boundary=frame",
        "Access-Control-Allow-Origin": "*",
        "Cache-Control": "no-cache, no-store, must-revalidate",
        Pragma: "no-cache",
        Expires: "0",
      },
    })
  } catch (error) {
    console.error("Stream proxy error:", error)
    return NextResponse.json(
      { error: `Failed to proxy stream: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}
