import { ImageResponse } from "next/og"

export const size = {
  width: 32,
  height: 32,
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
        borderRadius: "50%",
      }}
    >
      <span
        style={{
          color: "white",
          fontSize: 22,
          fontWeight: 600,
          fontFamily: "system-ui, sans-serif",
          marginTop: -2,
        }}
      >
        t
      </span>
    </div>,
    { ...size }
  )
}

export default Icon
