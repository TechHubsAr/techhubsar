import { ImageResponse } from "next/og"

export const runtime = "edge"

export const alt = "TechHubsAr - Tech Communities in Argentina"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        fontSize: 128,
        background: "linear-gradient(to bottom right, #0077B6, #00B4D8)",
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "white",
        fontWeight: 700,
      }}
    >
      <div style={{ fontSize: 64, marginBottom: 40 }}>TechHubsAr</div>
      <div style={{ fontSize: 36 }}>Tech Communities in Argentina</div>
    </div>,
    {
      ...size,
    },
  )
}

