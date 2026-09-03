import type { Metadata, Viewport } from "next";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";

export const metadata: Metadata = {
  title: "Priya Ice Creams Fastfood North Indian — Since 1985, Proddatur",
  description:
    "Priya Ice Creams Fastfood North Indian, Proddatur — Ice creams, fast food, milkshakes and North Indian dishes since 1985.",
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
    <html lang="en" className="overflow-x-clip max-w-full">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Anton&family=Inter:wght@400;500;600;700;800&family=Oswald:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-charcoal text-cream font-body antialiased overflow-x-clip max-w-full w-full relative">
        <SmoothScroll>
          <CustomCursor />
          <div className="w-full relative">
            {children}
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
