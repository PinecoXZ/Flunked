import { ImageResponse } from "next/og";

export const alt = "Flunked.fun — College Survival Tools for Indian Students";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "space-between",
        backgroundColor: "#080808",
        padding: "60px 80px",
        fontFamily: "sans-serif",
      }}
    >
      {/* Top bar: Brand & Tag */}
      <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
        <div
          style={{
            backgroundColor: "#FFE600",
            color: "#080808",
            padding: "8px 24px",
            borderRadius: "8px",
            border: "3px solid #FFFFFF",
            fontWeight: 900,
            fontSize: "24px",
            letterSpacing: "3px",
            boxShadow: "4px 4px 0px 0px #FFFFFF",
          }}
        >
          FLUNKED.FUN
        </div>
        <div
          style={{
            color: "#FFE600",
            fontSize: "18px",
            fontWeight: 700,
            fontFamily: "monospace",
          }}
        >
          100% STUDENT TOOLS // NO ADS // NO BS
        </div>
      </div>

      {/* Center: Main Headline */}
      <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
        <div
          style={{
            color: "#FFFFFF",
            fontSize: "64px",
            fontWeight: 900,
            lineHeight: 1.1,
            letterSpacing: "-1px",
          }}
        >
          Tools built for the
        </div>
        <div style={{ display: "flex", gap: "16px" }}>
          <span
            style={{
              backgroundColor: "#FFE600",
              color: "#080808",
              padding: "4px 20px",
              border: "4px solid #FFFFFF",
              borderRadius: "12px",
              fontSize: "64px",
              fontWeight: 900,
              boxShadow: "6px 6px 0px 0px #FFFFFF",
            }}
          >
            chaos of college.
          </span>
        </div>
        <div
          style={{
            color: "#A0A0A0",
            fontSize: "24px",
            fontWeight: 500,
            marginTop: "8px",
            maxWidth: "850px",
          }}
        >
          75% Attendance Bunk Limits · Official University CGPA to % · Real In-Hand CTC · Semester
          Survival
        </div>
      </div>

      {/* Bottom bar: Campus Chips */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          borderTop: "2px solid #222222",
          paddingTop: "30px",
        }}
      >
        <div style={{ display: "flex", gap: "12px" }}>
          {["UGC 75%", "VTU", "Anna Univ", "Medical NMC", "BITS Pilani"].map((p) => (
            <div
              key={p}
              style={{
                backgroundColor: "#1A1A1A",
                color: "#FFFFFF",
                border: "2px solid #444444",
                padding: "6px 16px",
                borderRadius: "8px",
                fontSize: "14px",
                fontWeight: 700,
                fontFamily: "monospace",
              }}
            >
              {p}
            </div>
          ))}
        </div>
        <div
          style={{
            color: "#FFE600",
            fontSize: "20px",
            fontWeight: 900,
            fontFamily: "monospace",
          }}
        >
          https://flunked.fun
        </div>
      </div>
    </div>,
    {
      ...size,
    }
  );
}
