import { ImageResponse } from "next/og"

export const size = {
  width: 180,
  height: 180,
}
export const contentType = "image/png"

const Icon = () => {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "black",
        borderRadius: "20%",
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 120,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          marginTop: -10,
        }}
      >
        t
      </span>
    </div>,
    { ...size }
  )
}

export default Icon
