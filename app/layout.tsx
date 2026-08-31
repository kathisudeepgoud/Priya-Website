import type { Metadata, Viewport } from "next";
import { Anton, Oswald, Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

const anton = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton" });
const oswald = Oswald({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-oswald" });
const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Priya Ice Creams & Fast Foods — Since 1985, Proddatur",
  description:
    "Priya Ice Creams & Fast Foods, Proddatur — North Indian dishes, hand-scooped ice creams and thick milkshakes since 1985.",
  icons: {
    icon: "/priya-logo.png",
    shortcut: "/priya-logo.png",
    apple: "/priya-logo.png"
  }
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${anton.variable} ${oswald.variable} ${inter.variable} overflow-x-hidden max-w-full`}>
      <body className="bg-charcoal text-cream font-body antialiased overflow-x-hidden max-w-full w-full relative">
        <SmoothScroll>
          <CustomCursor />
          <div className="w-full max-w-full overflow-x-hidden relative">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}

