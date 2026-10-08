import { ImageResponse } from "next/og";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamic Favicon Generator for Flunked.online
export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#FFE600",
        border: "2px solid #080808",
        borderRadius: "6px",
        color: "#080808",
        fontWeight: 900,
        fontSize: "20px",
        fontFamily: "monospace, sans-serif",
        boxShadow: "1px 1px 0px 0px #080808",
      }}
    >
      F
    </div>,
    {
      ...size,
    }
  );
}
