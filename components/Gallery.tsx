"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ITEMS = [
  { src: "/priya-storefront.jpg", alt: "Storefront", span: "col-span-3 row-span-2" },
  {
    src: "https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?q=80&w=800&auto=format&fit=crop",
    alt: "Ice cream",
    span: "col-span-3 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?q=80&w=800&auto=format&fit=crop",
    alt: "Gobi manchurian",
    span: "col-span-3 row-span-1"
  },
  {
    src: "https://images.unsplash.com/photo-1572490122747-3968b75cc699?q=80&w=800&auto=format&fit=crop",
    alt: "Milkshake",
    span: "col-span-2 row-span-1"
  },
  { src: "/priya-logo.png", alt: "Priya logo", span: "col-span-2 row-span-1", contain: true },
  {
    src: "https://images.unsplash.com/photo-1610650434089-95523d0e4d3b?q=80&w=800&auto=format&fit=crop",
    alt: "Ice cream parcel",
    span: "col-span-2 row-span-1"
  }
];

export default function Gallery() {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
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
            start: "top 78%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, gridRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" className="theme-bg-main py-32 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <div className="mb-14">
          <span className="eyebrow mb-3 block">A Closer Look</span>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.95]">Gallery</h2>
        </div>
        <div
          ref={gridRef}
          className="grid grid-cols-2 gap-3 sm:grid-cols-6"
          style={{ gridAutoRows: "140px" }}
        >
          {ITEMS.map((item) => (
            <div
              key={item.alt}
              data-cursor="View"
              className={`gal-item group relative overflow-hidden rounded-[18px] bg-black ${item.span}`}
            >
              <img
                src={item.src}
                alt={item.alt}
                className={`h-full w-full transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-[1.12] ${
                  item.contain ? "object-contain bg-white" : "object-cover"
                }`}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
