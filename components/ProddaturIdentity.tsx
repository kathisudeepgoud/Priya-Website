"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Sparkles, Star, Award } from "lucide-react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  { text: "PRODDATUR, ANDHRA PRADESH", icon: MapPin },
  { text: "SINCE 1985", icon: Star },
  { text: "LOCAL ROOTS", icon: Award },
  { text: "FOUR DECADES OF FLAVOUR", icon: Sparkles }
];

export default function ProddaturIdentity() {
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <section
      ref={sectionRef}
      className="relative py-8 theme-bg-main border-y border-gold/30 overflow-hidden select-none gpu-layer"
      aria-label="Proddatur Identity Banner"
    >
      <div className="flex overflow-hidden whitespace-nowrap">
        <div className="animate-marquee flex items-center gap-12 font-label text-xs sm:text-sm uppercase tracking-[0.3em] text-champagne font-bold">
          {ITEMS.concat(ITEMS).concat(ITEMS).map((item, index) => {
            const Icon = item.icon;
            return (
              <div key={index} className="flex items-center gap-3 shrink-0">
                <Icon className="h-4 w-4 text-gold shrink-0 animate-pulse" />
                <span>{item.text}</span>
                <span className="h-1.5 w-1.5 rounded-full bg-gold/60 shrink-0 ml-6" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
