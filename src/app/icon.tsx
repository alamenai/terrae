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
        background: "#4264FB",
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: "50%",
      }}
    >
      <svg width="20" height="20" viewBox="0 0 24 24">
        <g transform="rotate(-15, 12, 12)">
          <circle cx="12" cy="12" r="10" fill="none" stroke="white" strokeWidth="1.5" />
          <path d="M 12 2 A 10 10 0 0 0 12 22 Z" fill="white" />
        </g>
      </svg>
    </div>,
    { ...size }
  )
}

export default Icon
