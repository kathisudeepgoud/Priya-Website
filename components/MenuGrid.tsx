"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import type { MenuItem } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function MenuGrid({ items }: { items: MenuItem[] }) {
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!listRef.current) return;
      gsap.fromTo(
        listRef.current.children,
        { opacity: 0, y: 24 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          stagger: 0.04,
          ease: "power2.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 88%",
            end: "bottom 10%",
            toggleActions: "restart pause resume reverse"
          }
        }
      );
    }, listRef);
    return () => ctx.revert();
  }, [items]);

  return (
    <div ref={listRef} className="grid grid-cols-1 gap-x-10 gap-y-2 md:grid-cols-2">
      {items.map((item) => (
        <div
          key={item.name}
          className="group flex items-center justify-between rounded-xl border-b border-white/10 px-3 py-3 transition-all hover:border-gold/50 hover:bg-white/[0.03]"
        >
          <div className="font-label text-sm sm:text-base md:text-lg uppercase tracking-wide text-cream group-hover:text-champagne transition-colors">
            {item.name}
          </div>
          <div className="mx-3 flex-1 border-b border-dashed border-silver/25 group-hover:border-champagne/50 transition-colors" />
          <div className="font-display text-lg sm:text-xl md:text-2xl text-champagne shrink-0">
            ₹{item.price}
          </div>
        </div>
      ))}
    </div>
  );
}
