"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const CATEGORIES = [
  {
    label: "01 — Since 1985",
    name: "Ice Creams",
    target: "#icecreams",
    img: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=1200&auto=format&fit=crop"
  },
  {
    label: "02 — North Indian",
    name: "Fast Food",
    target: "#fastfood",
    img: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=1200&auto=format&fit=crop"
  },
  {
    label: "03 — Thick & Fresh",
    name: "Milkshakes",
    target: "#milkshakes",
    img: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=1200&auto=format&fit=crop"
  },
  {
    label: "04 — Take Home",
    name: "Ice Cream Parcels",
    target: "#parcel",
    img: "https://images.unsplash.com/photo-1610650434089-95523d0e4d3b?q=80&w=1200&auto=format&fit=crop"
  }
];

export default function Categories() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".cat-panel",
        { opacity: 0, y: 80 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.15,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 75%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="theme-bg-alt py-20">
      <div ref={gridRef} className="grid grid-cols-1 px-[18px] sm:grid-cols-2" style={{ gap: 18 }}>
        {CATEGORIES.map((c) => (
          <a
            key={c.name}
            href={c.target}
            data-cursor="Explore"
            className="cat-panel group relative flex h-[52vh] min-h-[340px] items-end overflow-hidden rounded-[26px] bg-wine p-9"
          >
            <img
              src={c.img}
              alt={c.name}
              className="absolute inset-0 h-full w-full object-cover opacity-55 transition-[transform,opacity] duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.08] group-hover:opacity-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />
            <div className="absolute right-8 top-8 z-10 flex h-11 w-11 items-center justify-center rounded-full border border-white/40 transition-all duration-400 group-hover:rotate-45 group-hover:border-champagne group-hover:bg-champagne group-hover:text-wine-deep">
              <ArrowUpRight className="h-4 w-4" />
            </div>
            <div className="relative z-10">
              <small className="font-label text-[0.65rem] uppercase tracking-[0.3em] text-champagne">
                {c.label}
              </small>
              <h3 className="mt-1 font-display text-[clamp(1.8rem,3.5vw,3rem)] uppercase leading-none">
                {c.name}
              </h3>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
