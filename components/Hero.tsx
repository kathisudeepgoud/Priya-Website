"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles, ArrowUpRight } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import HeroRail3D from "@/components/HeroRail3D";
import { HERO_ITEMS, HeroItem } from "@/lib/hero-items";
import { businessInfo } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedItem, setDisplayedItem] = useState<HeroItem>(HERO_ITEMS[0]);
  const prevActiveIndex = useRef(activeIndex);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const selectIndex = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  const resetAutoplayTimer = useCallback(() => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    timerRef.current = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      setActiveIndex((curr) => (curr + 1) % HERO_ITEMS.length);
    }, 5000); // 5-SECOND AUTOPLAY LOOP
  }, []);

  // Initialize & maintain 5-second autoplay loop timer
  useEffect(() => {
    resetAutoplayTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetAutoplayTimer]);

  // Synchronized dish card transition animation
  useEffect(() => {
    if (prevActiveIndex.current === activeIndex) return;

    const textEl = textContainerRef.current;
    if (textEl) {
      gsap.timeline()
        .to(textEl, {
          x: -12,
          opacity: 0,
          duration: 0.18,
          ease: "power2.in",
          onComplete: () => {
            setDisplayedItem(HERO_ITEMS[activeIndex]);
            gsap.fromTo(
              textEl,
              { x: 16, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.28, ease: "power2.out" }
            );
          }
        });
    } else {
      setDisplayedItem(HERO_ITEMS[activeIndex]);
    }

    prevActiveIndex.current = activeIndex;
  }, [activeIndex]);

  // Entrance animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade-item",
        { y: 16, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.06,
          duration: 0.7,
          ease: "power3.out"
        }
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-center overflow-hidden pt-20 pb-8 px-[4vw] sm:px-[5vw] theme-hero-bg gpu-layer"
      aria-label="Priya Ice Creams Fastfood North Indian Hero Section"
    >
      {/* Background ambient lighting glows matching reference screenshot */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-wine/30 blur-[160px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[450px] w-[450px] rounded-full bg-champagne/15 blur-[140px]" />

      <div className="relative z-10 w-full max-w-[1400px] mx-auto my-auto py-2">
        
        {/* ========================================================================= */}
        {/* MOBILE & TABLET LAYOUT (< lg) */}
        {/* ========================================================================= */}
        <div className="flex lg:hidden flex-col items-center gap-4 text-center w-full max-w-xl mx-auto">
          
          {/* LOGO + BRANDING BLOCK (MOBILE: SINCE 1985 PERFECTLY ALIGNED WITH PRIYA) */}
          <div className="hero-fade-item flex items-center justify-center gap-3.5 my-1">
            <div className="relative shrink-0 rounded-2xl border-2 border-gold/70 p-1 bg-gradient-to-br from-wine/80 to-charcoal shadow-md">
              <Image
                src="/priya-logo.png"
                alt="Priya Logo"
                width={76}
                height={76}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover"
                priority
              />
            </div>

            <div className="flex flex-col text-left justify-center space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-champagne/60" />
                <span className="font-label text-[0.68rem] uppercase tracking-[0.3em] text-champagne font-bold">
                  SINCE 1985
                </span>
              </div>

              <h1 className="font-display text-[clamp(3.8rem,14vw,5.5rem)] leading-[0.82] text-cream uppercase tracking-wide drop-shadow-md">
                PRIYA
              </h1>

              <div className="font-label text-[0.65rem] sm:text-[0.78rem] uppercase tracking-[0.2em] text-champagne/90 font-medium leading-tight">
                ICE CREAMS . FAST FOOD . NORTH INDIAN
              </div>
            </div>
          </div>

          {/* RESTAURANT DESCRIPTION */}
          <p className="hero-fade-item font-body text-xs sm:text-sm text-silver/85 max-w-md leading-relaxed px-2">
            Ice creams, fast food, milkshakes and favourites in Proddatur.
          </p>

          {/* 3D CARD CAROUSEL RAIL */}
          <div className="hero-fade-item w-full py-1">
            <HeroRail3D
              items={HERO_ITEMS}
              activeIndex={activeIndex}
              onItemSelect={selectIndex}
              onInteraction={resetAutoplayTimer}
            />
          </div>

          {/* ACTIVE DISH HIGHLIGHT CARD (NO COST DISPLAYED) */}
          <div className="hero-fade-item w-full rounded-2xl border border-gold/30 bg-[#160E11]/90 p-4 sm:p-5 backdrop-blur-xl shadow-2xl text-left max-w-md">
            <div ref={textContainerRef} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-wine/40 px-3 py-1 font-label text-[0.65rem] uppercase tracking-wider text-champagne font-semibold">
                  <Sparkles className="h-3.5 w-3.5 text-champagne" />
                  {displayedItem.category}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-cream tracking-wide">
                {displayedItem.title}
              </h2>

              <p className="font-body text-xs sm:text-sm text-silver/90 leading-relaxed">
                {displayedItem.description}
              </p>

              <div className="font-label text-[0.65rem] uppercase tracking-widest text-champagne/90 pt-2 border-t border-white/10 flex items-center justify-between">
                <span>★ {displayedItem.tag}</span>
                <span className="text-silver/50">ITEM 0{activeIndex + 1} OF 0{HERO_ITEMS.length}</span>
              </div>
            </div>
          </div>

          {/* CTA BUTTONS WITH ARROW ICONS */}
          <div className="hero-fade-item flex flex-wrap items-center justify-center gap-3 w-full pt-1">
            <MagneticButton href="#menu" variant="primary" cursorLabel="Explore">
              <span className="flex items-center gap-1.5">
                EXPLORE MENU <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </MagneticButton>
            <MagneticButton href={businessInfo.googleMapsUrl} target="_blank" variant="outline" cursorLabel="Directions">
              <span className="flex items-center gap-1.5">
                GET DIRECTIONS <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
              </span>
            </MagneticButton>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* DESKTOP & LAPTOP LAYOUT (>= lg) */}
        {/* ========================================================================= */}
        <div className="hidden lg:grid grid-cols-12 items-center gap-8 xl:gap-12 w-full">
          
          {/* LEFT COLUMN: BRANDING + DESCRIPTION + ACTIVE DISH HIGHLIGHT CARD + BUTTONS */}
          <div className="flex flex-col justify-center text-left lg:col-span-6 xl:col-span-5 space-y-4">
            
            {/* LOGO + PRIYA BRANDING BLOCK (LAPTOP: SINCE 1985 PERFECTLY ALIGNED WITH PRIYA WORD) */}
            <div className="hero-fade-item flex items-center gap-4">
              <div className="relative shrink-0 rounded-2xl border-2 border-gold/70 p-1 bg-gradient-to-br from-wine/80 via-charcoal to-black shadow-[0_0_35px_rgba(229,185,92,0.3)]">
                <Image
                  src="/priya-logo.png"
                  alt="Priya Logo"
                  width={100}
                  height={100}
                  className="h-24 w-24 xl:h-28 xl:w-28 rounded-xl object-cover"
                  priority
                />
              </div>

              <div className="flex flex-col justify-center space-y-0.5">
                {/* SINCE 1985 PLACED DIRECTLY INSIDE TEXT COLUMN PERFECTLY ALIGNED WITH PRIYA */}
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="h-px w-5 bg-champagne/60" />
                  <span className="font-label text-xs uppercase tracking-[0.35em] text-champagne font-bold">
                    SINCE 1985
                  </span>
                </div>

                <h1 className="font-display text-[clamp(5rem,9.5vw,8.5rem)] leading-[0.8] text-cream uppercase tracking-wide drop-shadow-2xl">
                  PRIYA
                </h1>
                
                <div className="font-label text-xs sm:text-sm uppercase tracking-[0.2em] text-champagne/90 font-medium pt-0.5">
                  ICE CREAMS . FAST FOOD . NORTH INDIAN
                </div>
              </div>
            </div>

            {/* DESCRIPTION */}
            <p className="hero-fade-item font-body text-sm sm:text-base text-silver/85 max-w-md leading-relaxed">
              Ice creams, fast food, milkshakes and favourites in Proddatur.
            </p>

            {/* ACTIVE DISH HIGHLIGHT CARD (NO COST DISPLAYED) */}
            <div className="hero-fade-item rounded-2xl border border-gold/30 bg-[#160E11]/90 p-5 xl:p-6 backdrop-blur-xl shadow-2xl max-w-lg">
              <div ref={textContainerRef} className="space-y-2.5">
                <div className="flex items-center justify-between">
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-wine/40 px-3.5 py-1 font-label text-[0.65rem] uppercase tracking-wider text-champagne font-semibold">
                    <Sparkles className="h-3.5 w-3.5 text-champagne" />
                    {displayedItem.category}
                  </span>
                </div>

                <h2 className="font-display text-2xl xl:text-3xl text-cream tracking-wide">
                  {displayedItem.title}
                </h2>

                <p className="font-body text-xs sm:text-sm text-silver/90 leading-relaxed">
                  {displayedItem.description}
                </p>

                <div className="font-label text-[0.65rem] uppercase tracking-widest text-champagne/90 pt-2.5 border-t border-white/10 flex items-center justify-between">
                  <span>★ {displayedItem.tag}</span>
                  <span className="text-silver/50">ITEM 0{activeIndex + 1} OF 0{HERO_ITEMS.length}</span>
                </div>
              </div>
            </div>

            {/* CTA BUTTONS WITH ARROW ICONS */}
            <div className="hero-fade-item flex items-center gap-4 pt-1">
              <MagneticButton href="#menu" variant="primary" cursorLabel="Explore">
                <span className="flex items-center gap-2">
                  EXPLORE MENU <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </span>
              </MagneticButton>
              <MagneticButton href={businessInfo.googleMapsUrl} target="_blank" variant="outline" cursorLabel="Directions">
                <span className="flex items-center gap-2">
                  GET DIRECTIONS <ArrowUpRight className="h-4 w-4 stroke-[2.5]" />
                </span>
              </MagneticButton>
            </div>

          </div>

          {/* RIGHT COLUMN: 3D CARD CAROUSEL RAIL */}
          <div className="hero-fade-item flex flex-col items-center lg:col-span-6 xl:col-span-7 w-full">
            <HeroRail3D
              items={HERO_ITEMS}
              activeIndex={activeIndex}
              onItemSelect={selectIndex}
              onInteraction={resetAutoplayTimer}
            />
          </div>

        </div>

      </div>
    </section>
  );
}
