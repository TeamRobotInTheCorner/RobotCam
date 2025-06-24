import { type NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const robotIP = searchParams.get("ip")
  const robotPort = searchParams.get("port") || "8080"
  const endpoint = searchParams.get("endpoint") || "/api/status"

  if (!robotIP) {
    return NextResponse.json({ error: "Robot IP is required" }, { status: 400 })
  }

  try {
    const response = await fetch(`http://${robotIP}:${robotPort}${endpoint}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      signal: AbortSignal.timeout(5000),
    })

    if (!response.ok) {
      throw new Error(`Robot responded with status: ${response.status}`)
    }

    const data = await response.text()
    return new NextResponse(data, {
      status: 200,
      headers: {
        "Content-Type": response.headers.get("Content-Type") || "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
      },
    })
  } catch (error) {
    console.error("Robot connection error:", error)
    return NextResponse.json(
      { error: `Failed to connect to robot: ${error instanceof Error ? error.message : "Unknown error"}` },
      { status: 500 },
    )
  }
}

export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  })
}
