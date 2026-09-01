"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS = [
  { src: "/priya-storefront.jpg", alt: "Priya Storefront Proddatur", label: "Shivalayam Street Storefront", span: "col-span-2 sm:col-span-3 row-span-2" },
  { src: "/Gobi.jpeg", alt: "Gobi Manchurian", label: "Crispy Gobi Manchurian", span: "col-span-1 sm:col-span-3 row-span-1" },
  { src: "/Basanti.jpeg", alt: "Basanti Ice Cream", label: "Traditional Basanti Ice", span: "col-span-1 sm:col-span-3 row-span-1" },
  { src: "/Mushroom.jpeg", alt: "Mushroom Chilli", label: "Wok Chilli Mushroom", span: "col-span-1 sm:col-span-2 row-span-1" },
  { src: "/priya-logo.png", alt: "Priya Logo", label: "Established 1985 Logo", span: "col-span-1 sm:col-span-2 row-span-1", contain: true },
  { src: "/3 in 1.jpeg", alt: "3 in 1 Ice Cream", label: "3 in 1 Scoop Special", span: "col-span-2 sm:col-span-2 row-span-1" }
];

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".gal-item",
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
          }
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="theme-bg-main py-28 sm:py-32 overflow-hidden max-w-full gpu-layer">
      <div className="mx-auto max-w-[1400px] px-[5vw]">
        <div className="mb-14 text-left border-b border-gold/30 pb-6 flex items-end justify-between flex-wrap gap-4">
          <div>
            <span className="eyebrow mb-2 block tracking-[0.35em]">AUTHENTIC FOOD PHOTOGRAPHY</span>
            <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-none text-cream">
              PRIYA GALLERY
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-silver/80 max-w-sm">
            Real food photography from our kitchen and storefront in Proddatur.
          </p>
        </div>

        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-4 sm:grid-cols-6"
          style={{ gridAutoRows: "160px" }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.alt}
              data-cursor="View"
              className={`gal-item group relative overflow-hidden rounded-3xl border border-gold/30 bg-black ${item.span} shadow-xl transition-all duration-500 hover:border-gold hover:shadow-[0_20px_40px_rgba(229,185,92,0.2)]`}
            >
              <Image
                src={item.src}
                alt={item.alt}
                fill
                className={`transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110 ${
                  item.contain ? "object-contain p-4 bg-charcoal" : "object-cover"
                }`}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-95" />
              <div className="absolute bottom-3 left-3 right-3 font-label text-[0.65rem] uppercase tracking-widest text-champagne font-semibold opacity-90 group-hover:text-gold transition-colors">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
