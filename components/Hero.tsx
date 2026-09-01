"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ChevronLeft, ChevronRight, Sparkles } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import HeroRail3D from "@/components/HeroRail3D";
import { HERO_ITEMS, HeroItem } from "@/lib/hero-items";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  const [activeIndex, setActiveIndex] = useState(0);
  const [displayedItem, setDisplayedItem] = useState<HeroItem>(HERO_ITEMS[0]);
  const [isHovered, setIsHovered] = useState(false);

  const prevActiveIndex = useRef(activeIndex);

  // Mouse parallax state for desktop
  const [parallax, setParallax] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (typeof window === "undefined" || window.innerWidth < 1024) return;
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    const x = (clientX / innerWidth - 0.5) * 20;
    const y = (clientY / innerHeight - 0.5) * 20;
    setParallax({ x, y });
  };

  // Navigation helpers
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
  }, []);

  const selectIndex = useCallback((idx: number) => {
    setActiveIndex(idx);
  }, []);

  // Autoplay loop timer (3 SECONDS - Fixed for both Desktop/Laptop and Mobile)
  useEffect(() => {
    const timer = setInterval(() => {
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      setActiveIndex((curr) => (curr + 1) % HERO_ITEMS.length);
    }, 3000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToPrev();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [goToNext, goToPrev]);

  // Text transition animation when active item changes
  useEffect(() => {
    if (prevActiveIndex.current === activeIndex) return;

    const textEl = textContainerRef.current;
    if (textEl) {
      gsap.timeline()
        .to(textEl, {
          x: -16,
          opacity: 0,
          duration: 0.22,
          ease: "power2.in",
          onComplete: () => {
            setDisplayedItem(HERO_ITEMS[activeIndex]);
            gsap.fromTo(
              textEl,
              { x: 24, opacity: 0 },
              { x: 0, opacity: 1, duration: 0.35, ease: "power2.out" }
            );
          }
        });
    } else {
      setDisplayedItem(HERO_ITEMS[activeIndex]);
    }

    prevActiveIndex.current = activeIndex;
  }, [activeIndex]);

  // GSAP Entrance & ScrollTrigger Scroll-out transition
  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".hero-fade-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out"
        }
      );

      // ScrollTrigger scroll-out scrub animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      scrollTl
        .to(".hero-left-col", { y: -100, opacity: 0, ease: "power2.in" }, 0)
        .to(".hero-rail-col", { scale: 0.9, opacity: 0.3, ease: "power2.inOut" }, 0)
        .to(".hero-bottom-bar", { y: 40, opacity: 0, ease: "power2.in" }, 0);
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      onMouseMove={handleMouseMove}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-20 pb-6 px-[4vw] sm:px-[5vw] theme-hero-bg gpu-layer"
      aria-label="Priya Ice Creams & Fast Foods Hero Section"
    >
      {/* Background ambient lighting glows with parallax movement */}
      <div
        className="pointer-events-none absolute -top-40 left-1/4 h-[550px] w-[550px] rounded-full bg-wine/30 blur-[150px] transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${parallax.x * 0.8}px, ${parallax.y * 0.8}px, 0)` }}
      />
      <div
        className="pointer-events-none absolute -bottom-20 right-1/4 h-[450px] w-[450px] rounded-full bg-champagne/15 blur-[140px] transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${-parallax.x * 0.5}px, ${-parallax.y * 0.5}px, 0)` }}
      />

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (lg and above) */}
      {/* ========================================================================= */}
      <div className="relative z-10 hidden lg:grid grid-cols-12 items-center gap-10 xl:gap-14 my-auto w-full max-w-[1440px] mx-auto">
        
        {/* LEFT COLUMN: BRAND HEADER + Active Item Highlights + Buttons */}
        <div className="hero-left-col flex flex-col justify-center text-left lg:col-span-6 xl:col-span-5 w-full">
          
          {/* BRAND HEADER BLOCK WITH PRIYA LOGO + TIGHTLY COUPLED "SINCE 1985" AND ENLARGED "PRIYA" TITLE */}
          <div className="flex items-center gap-3.5 sm:gap-4 my-1.5">
            <div className="relative shrink-0 rounded-2xl border-2 border-gold/70 p-1 bg-gradient-to-br from-wine/70 via-charcoal to-black shadow-[0_0_35px_rgba(229,185,92,0.3)]">
              <div className="relative h-24 w-24 sm:h-32 sm:w-32 md:h-36 md:w-36 rounded-xl overflow-hidden">
                <Image
                  src="/priya-logo.png"
                  alt="Priya Logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <div className="flex flex-col justify-center space-y-0.5">
              <div className="hero-fade-item flex items-center gap-1.5">
                <span className="h-px w-5 bg-champagne/60" />
                <span className="font-label text-[0.68rem] sm:text-xs uppercase tracking-[0.35em] text-champagne font-bold">
                  SINCE 1985
                </span>
              </div>

              <h1
                ref={titleRef}
                className="font-display text-[clamp(4.2rem,9.5vw,8.5rem)] leading-[0.8] text-cream drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)] uppercase tracking-normal"
              >
                PRIYA
              </h1>

              <div className="font-label text-[clamp(0.68rem,1.1vw,0.9rem)] uppercase tracking-[0.26em] text-champagne/90 font-semibold pt-0.5">
                ICE CREAMS &amp; FAST FOODS
              </div>
            </div>
          </div>

          <p className="hero-fade-item font-body text-xs sm:text-sm text-silver/85 mt-2 max-w-md leading-relaxed">
            Ice creams, fast food, milkshakes and favourites in Proddatur.
          </p>

          {/* ACTIVE DISH HIGHLIGHT CARD */}
          <div className="hero-fade-item mt-4 sm:mt-5 rounded-2xl border border-gold/30 bg-charcoal/80 p-4 sm:p-5 backdrop-blur-xl shadow-[0_20px_40px_rgba(0,0,0,0.5)] max-w-lg transition-all duration-300 hover:border-gold/50">
            <div ref={textContainerRef} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-champagne/40 bg-wine/40 px-3 py-0.5 font-label text-[0.65rem] uppercase tracking-wider text-champagne font-semibold">
                  <Sparkles className="h-3 w-3 text-champagne" />
                  {displayedItem.category}
                </span>
                <span className="font-display text-lg text-champagne">
                  ₹{displayedItem.price}
                </span>
              </div>

              <h2 className="font-display text-2xl sm:text-3xl text-cream tracking-wide">
                {displayedItem.title}
              </h2>

              <p className="font-body text-xs sm:text-sm text-silver leading-relaxed">
                {displayedItem.description}
              </p>

              <div className="font-label text-[0.65rem] uppercase tracking-widest text-champagne/80 pt-1.5 border-t border-white/10 flex items-center justify-between">
                <span>★ {displayedItem.tag}</span>
                <span className="text-silver/50">Item 0{activeIndex + 1} of 0{HERO_ITEMS.length}</span>
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="hero-fade-item mt-5 flex flex-wrap items-center gap-3 sm:gap-4">
            <MagneticButton href="#signature-dishes" variant="primary" cursorLabel="Explore">
              EXPLORE MENU
            </MagneticButton>
            <MagneticButton href="#location" variant="outline" cursorLabel="Directions">
              GET DIRECTIONS
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D CAROUSEL RAIL */}
        <div className="hero-rail-col relative flex h-[350px] sm:h-[400px] md:h-[480px] w-full max-w-full overflow-hidden items-center justify-center lg:justify-start lg:col-span-6 xl:col-span-7">
          <HeroRail3D
            items={HERO_ITEMS}
            activeIndex={activeIndex}
            onItemSelect={selectIndex}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE LAYOUT (< lg): STRICT USER ORDER: LOGO+TITLE -> IMAGES SCROLLING -> DESCRIPTION -> BUTTONS */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex lg:hidden flex-col items-center gap-3.5 my-auto w-full max-w-full overflow-hidden px-1">
        
        {/* MOBILE STEP 1: LOGO + TITLE + DESCRIPTION */}
        <div className="hero-left-col w-full max-w-xl">
          <div className="hero-fade-item flex items-center gap-3 my-0.5">
            <div className="relative shrink-0 rounded-2xl border-2 border-gold/70 p-1 bg-wine/50 shadow-md">
              <Image
                src="/priya-logo.png"
                alt="Priya Logo"
                width={76}
                height={76}
                className="h-16 w-16 sm:h-20 sm:w-20 rounded-xl object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center space-y-0.5">
              <div className="flex items-center gap-1.5">
                <span className="h-px w-4 bg-champagne/60" />
                <span className="font-label text-[0.65rem] uppercase tracking-[0.35em] text-champagne font-bold">
                  SINCE 1985
                </span>
              </div>

              <h1 className="font-display text-[clamp(3.2rem,10.5vw,5.2rem)] leading-[0.8] text-cream uppercase tracking-normal">
                PRIYA
              </h1>

              <div className="font-label text-[clamp(0.62rem,1.3vw,0.85rem)] uppercase tracking-[0.25em] text-champagne/90 font-semibold pt-0.5">
                ICE CREAMS &amp; FAST FOODS
              </div>
            </div>
          </div>

          <p className="hero-fade-item mt-1 font-body text-xs text-silver/85 max-w-md">
            Ice creams, fast food, milkshakes and favourites in Proddatur.
          </p>
        </div>

        {/* MOBILE STEP 2: IMAGES SCROLLING (3D Hero Rail Carousel - Centered Without Left Empty Gap) */}
        <div className="hero-rail-col relative flex h-[310px] sm:h-[360px] w-full max-w-full overflow-hidden items-center justify-center">
          <HeroRail3D
            items={HERO_ITEMS}
            activeIndex={activeIndex}
            onItemSelect={selectIndex}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        </div>

        {/* MOBILE STEP 3: ACTIVE IMAGE DESCRIPTION BOX */}
        <div className="hero-left-col w-full max-w-xl">
          <div className="hero-fade-item rounded-2xl border border-gold/30 bg-charcoal/85 p-4 backdrop-blur-xl shadow-xl">
            <div ref={textContainerRef} className="space-y-1.5">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-champagne/40 bg-wine/40 px-2.5 py-0.5 font-label text-[0.6rem] uppercase tracking-wider text-champagne font-semibold">
                  <Sparkles className="h-3 w-3 text-champagne" />
                  {displayedItem.category}
                </span>
                <span className="font-display text-base text-champagne">
                  ₹{displayedItem.price}
                </span>
              </div>

              <h2 className="font-display text-xl text-cream tracking-wide">
                {displayedItem.title}
              </h2>

              <p className="font-body text-xs text-silver leading-relaxed">
                {displayedItem.description}
              </p>

              <div className="font-label text-[0.6rem] uppercase tracking-widest text-champagne/80 pt-1 border-t border-white/10 flex items-center justify-between">
                <span>★ {displayedItem.tag}</span>
                <span className="text-silver/50">Item 0{activeIndex + 1} of 0{HERO_ITEMS.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE STEP 4: ACTION BUTTONS */}
        <div className="hero-left-col w-full max-w-xl">
          <div className="hero-fade-item flex flex-wrap items-center justify-start gap-3 mt-1">
            <MagneticButton href="#signature-dishes" variant="primary" cursorLabel="Explore">
              EXPLORE MENU
            </MagneticButton>
            <MagneticButton href="#location" variant="outline" cursorLabel="Directions">
              GET DIRECTIONS
            </MagneticButton>
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROLS & AUTOPLAY PROGRESS INDICATOR */}
      <div className="hero-bottom-bar relative z-20 flex w-full max-w-[1440px] mx-auto items-center justify-between border-t border-white/10 pt-4 mt-4">
        {/* COUNTER */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-display text-lg sm:text-xl text-champagne tracking-wider">
            0{activeIndex + 1}
          </span>
          <span className="font-label text-xs text-silver/50">/</span>
          <span className="font-label text-xs text-silver/70">
            0{HERO_ITEMS.length}
          </span>
        </div>

        {/* AUTOPLAY PROGRESS BAR (3 SECONDS) */}
        <div className="mx-4 sm:mx-6 flex-1 max-w-md">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              key={activeIndex}
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-wine via-champagne to-gold animate-[heroProgress_3s_linear] rounded-full"
            />
          </div>
        </div>

        {/* CONTROLS */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            aria-label="Previous carousel item"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-champagne/30 bg-charcoal/70 text-cream transition-all hover:border-champagne hover:bg-wine/50 hover:text-champagne active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next carousel item"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-champagne/30 bg-charcoal/70 text-cream transition-all hover:border-champagne hover:bg-wine/50 hover:text-champagne active:scale-95"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
