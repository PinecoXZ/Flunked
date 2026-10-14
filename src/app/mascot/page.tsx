import { Metadata } from "next";
import { MascotPlayground } from "@/components/mascot/MascotPlayground";

export const metadata: Metadata = {
  title: "Proxy Duck Mascot Animation Lab & Interactive Playground | Flunked",
  description:
    "Test, customize, and animate the Flunked Duck Mascot (Proxy). Preview animations like Campus Waddle, End-Sem Victory Dance, 8 AM Snooze, Shades Drop, and copy ready-to-use React code snippets.",
  openGraph: {
    title: "Proxy Duck Mascot Animation Lab | Flunked",
    description:
      "Interactive animation playground and design showcase for Flunked's official college mascot, Proxy.",
  },
};

export default function MascotPage() {
  return <MascotPlayground />;
}
