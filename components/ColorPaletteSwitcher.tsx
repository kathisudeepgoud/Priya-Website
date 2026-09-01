"use client";

import { useEffect, useState } from "react";
import { Palette, Check, Sparkles, X } from "lucide-react";

export type PaletteTheme = {
  id: string;
  name: string;
  category: "light" | "dark";
  colors: [string, string, string, string]; // [bg, primary, accent, text]
  tagline: string;
};

export const COLOR_PALETTES: PaletteTheme[] = [
  {
    id: "dark",
    name: "01 — MIDNIGHT LUXURY",
    category: "dark",
    colors: ["#0B0908", "#7A1B34", "#E5B95C", "#EFE6D2"],
    tagline: "Original Dark Luxury Theme"
  },
  {
    id: "vanilla",
    name: "02 — VANILLA CREAM",
    category: "light",
    colors: ["#FAF4E8", "#6E162C", "#8C5E14", "#241815"],
    tagline: "Original Light Ivory & Warm Gold"
  }
];

export default function ColorPaletteSwitcher() {
  const [activeTheme, setActiveTheme] = useState<string>("dark");
  const [isOpen, setIsOpen] = useState<boolean>(false);

  useEffect(() => {
    const saved = localStorage.getItem("priya-theme");
    const themeToApply = saved && COLOR_PALETTES.some((p) => p.id === saved) ? saved : "dark";
    setActiveTheme(themeToApply);
    document.documentElement.setAttribute("data-theme", themeToApply);
  }, []);

  const changeTheme = (themeId: string) => {
    setActiveTheme(themeId);
    document.documentElement.setAttribute("data-theme", themeId);
    localStorage.setItem("priya-theme", themeId);
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-[600]">
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Color Palette Switcher"
        className="group flex items-center gap-2.5 rounded-full border border-champagne/60 bg-wine px-4 py-3 text-champagne shadow-[0_10px_30px_rgba(0,0,0,0.5)] transition-all duration-300 hover:scale-105 hover:border-champagne hover:bg-wine/90 active:scale-95"
      >
        <Palette className="h-5 w-5 animate-pulse text-champagne group-hover:rotate-12 transition-transform" />
        <span className="font-label text-xs uppercase tracking-widest text-cream font-semibold hidden sm:inline">
          Themes
        </span>
        <span className="flex h-2 w-2 rounded-full bg-gold" />
      </button>

      {/* Expanded Palette Drawer / Panel */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[calc(100vw-2rem)] max-w-[340px] sm:w-[340px] rounded-3xl border border-gold/40 bg-charcoal/95 p-5 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.7)] animate-in fade-in slide-in-from-bottom-4 duration-300">
          <div className="flex items-center justify-between border-b border-white/10 pb-3 mb-4">
            <div className="flex items-center gap-2">
              <Sparkles className="h-4 w-4 text-champagne" />
              <h3 className="font-display text-lg uppercase text-cream tracking-wide">
                Color Themes
              </h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="rounded-full p-1 text-silver hover:bg-white/10 hover:text-cream transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <p className="font-body text-xs text-silver/80 mb-4 leading-relaxed">
            Select between the two signature Priya themes:
          </p>

          <div className="space-y-3">
            {COLOR_PALETTES.map((palette) => {
              const isSelected = activeTheme === palette.id;
              return (
                <button
                  key={palette.id}
                  onClick={() => changeTheme(palette.id)}
                  className={`w-full text-left flex items-center justify-between p-3.5 rounded-2xl border transition-all duration-200 ${
                    isSelected
                      ? "border-champagne bg-white/10 shadow-lg ring-1 ring-champagne/50"
                      : "border-white/10 bg-white/[0.03] hover:border-gold/40 hover:bg-white/[0.07]"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {/* Visual Color Swatches */}
                    <div className="flex items-center gap-1 shrink-0 p-1.5 rounded-full bg-black/40 border border-white/10">
                      {palette.colors.map((c, i) => (
                        <span
                          key={i}
                          className="h-3 w-3 rounded-full border border-black/30 shadow-sm"
                          style={{ backgroundColor: c }}
                        />
                      ))}
                    </div>

                    <div>
                      <div className="font-label text-xs uppercase tracking-wider text-cream flex items-center gap-1.5 font-semibold">
                        {palette.name}
                      </div>
                      <div className="font-body text-[0.65rem] text-silver/70 mt-0.5">
                        {palette.tagline}
                      </div>
                    </div>
                  </div>

                  {isSelected && (
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-gold text-wine-deep shrink-0 ml-2">
                      <Check className="h-3.5 w-3.5 stroke-[3]" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 text-center">
            <span className="font-label text-[0.65rem] uppercase tracking-widest text-champagne/80">
              Active: {COLOR_PALETTES.find((p) => p.id === activeTheme)?.name}
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
