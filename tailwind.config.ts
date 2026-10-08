import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        flunked: {
          bg: "#FDFBF7",         // Warm cream canvas base
          bgSubtle: "#F4EFE6",   // Warm paper tone
          surface: "#FFFFFF",    // Crisp white card surface
          card: "#FFFFFF",       // Crisp white card surface
          cardHover: "#FFFDF9",  // Tactile hover tint
          border: "#000000",     // Solid bold black border
          borderSubtle: "#333333",
          borderActive: "#000000",
          yellow: "#FFE600",     // Electric Canary Yellow (THE ONE bold accent)
          yellowHover: "#FFDD00",
          text: "#000000",       // Jet black
          muted: "#4A4A4A",      // Legible dark charcoal
          mutedLight: "#262626", // Deep charcoal
          danger: "#FF3333",     // Neo-brutalist alert red
          success: "#00C853",    // Neo-brutalist success emerald
        },
      },
      boxShadow: {
        neo: "4px 4px 0px 0px #000000",
        "neo-sm": "2px 2px 0px 0px #000000",
        "neo-lg": "6px 6px 0px 0px #000000",
        "neo-xl": "8px 8px 0px 0px #000000",
        "neo-yellow": "4px 4px 0px 0px #FFE600",
      },
      fontFamily: {
        serif: ["Georgia", "serif"],
        mono: [
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "Liberation Mono",
          "Courier New",
          "monospace",
        ],
        sans: [
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif",
        ],
      },
    },
  },
  plugins: [],
};

export default config;
