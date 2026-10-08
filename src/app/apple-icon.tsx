import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE600",
        border: "8px solid #080808",
        borderRadius: "36px",
        color: "#080808",
        fontWeight: 900,
        fontFamily: "monospace, sans-serif",
        boxShadow: "8px 8px 0px 0px #080808",
      }}
    >
      <span style={{ fontSize: "96px", lineHeight: 1 }}>F</span>
      <span style={{ fontSize: "16px", letterSpacing: "2px", marginTop: "4px" }}>FLUNKED</span>
    </div>,
    {
      ...size,
    }
  );
}
