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
  const [progress, setProgress] = useState(0);

  const prevActiveIndex = useRef(activeIndex);

  // Manual navigation helper
  const goToNext = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % HERO_ITEMS.length);
    setProgress(0);
  }, []);

  const goToPrev = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + HERO_ITEMS.length) % HERO_ITEMS.length);
    setProgress(0);
  }, []);

  const selectIndex = useCallback((idx: number) => {
    setActiveIndex(idx);
    setProgress(0);
  }, []);

  // Autoplay loop timer (EXACTLY 3 SECONDS continuous auto-scroll)
  useEffect(() => {
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    if (prefersReduced) return;

    const timer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setActiveIndex((curr) => (curr + 1) % HERO_ITEMS.length);
      setProgress(0);
    }, 3000);

    const progressTimer = setInterval(() => {
      if (document.visibilityState !== "visible") return;
      setProgress((prev) => (prev >= 100 ? 0 : prev + 1.0));
    }, 30);

    return () => {
      clearInterval(timer);
      clearInterval(progressTimer);
    };
  }, []);

  // Keyboard arrow listener
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

  // GSAP Entrance & ScrollTrigger Scroll-out animation into existing #story section
  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance timeline with bidirectional toggleActions
      const letters = titleRef.current?.querySelectorAll(".title-char");
      const entranceTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top 80%",
          end: "bottom 10%",
          toggleActions: "play reverse play reverse"
        }
      });

      if (letters && letters.length > 0) {
        entranceTl.fromTo(
          letters,
          { yPercent: 100, rotateX: 45, opacity: 0 },
          {
            yPercent: 0,
            rotateX: 0,
            opacity: 1,
            stagger: 0.06,
            duration: 1,
            ease: "power4.out"
          },
          0
        );
      }

      entranceTl.fromTo(
        ".hero-fade-item",
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power3.out"
        },
        0.3
      );

      // ScrollTrigger scroll-out transition into #story (scrub is inherently bidirectional)
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: 0.8
        }
      });

      scrollTl
        .to(
          ".hero-left-col",
          {
            y: -120,
            opacity: 0,
            ease: "power2.in"
          },
          0
        )
        .to(
          ".hero-rail-col",
          {
            scale: 0.92,
            opacity: 0.3,
            ease: "power2.inOut"
          },
          0
        )
        .to(
          ".hero-bottom-bar",
          {
            y: 40,
            opacity: 0,
            ease: "power2.in"
          },
          0
        );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden pt-20 pb-6 px-[4vw] sm:px-[5vw] theme-hero-bg"
      aria-label="Priya Ice Creams & Fast Foods Hero Section"
    >
      {/* Background ambient lighting glows */}
      <div className="pointer-events-none absolute -top-40 left-1/4 h-[500px] w-[500px] rounded-full bg-wine/25 blur-[140px]" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-[400px] w-[400px] rounded-full bg-champagne/10 blur-[130px]" />

      {/* ========================================================================= */}
      {/* DESKTOP LAYOUT (>= lg): ORIGINAL CLEAN LAYOUT FROM SCREENSHOT 1 */}
      {/* ========================================================================= */}
      <div className="relative z-10 hidden lg:grid grid-cols-12 items-center gap-12 xl:gap-20 my-auto w-full">
        {/* LEFT COLUMN: BRAND & ACTIVE ITEM DETAILS */}
        <div className="hero-left-col flex flex-col justify-center text-left lg:col-span-5 xl:col-span-5 max-w-xl">
          {/* Eyebrow badge */}
          <div className="hero-fade-item flex items-center gap-2 mb-1.5 sm:mb-2">
            <span className="h-px w-6 sm:w-8 bg-champagne/60" />
            <span className="font-label text-[0.7rem] sm:text-xs uppercase tracking-[0.35em] text-champagne font-semibold">
              SINCE 1985
            </span>
          </div>

          {/* Title Row with Logo Beside PRIYA */}
          <div className="hero-fade-item flex items-center gap-3 sm:gap-4 my-1">
            <div className="relative shrink-0 rounded-full border-2 border-gold/60 p-1 bg-wine/50 shadow-[0_0_25px_rgba(229,185,92,0.35)]">
              <Image
                src="/priya-logo.png"
                alt="Priya Logo"
                width={64}
                height={64}
                className="h-12 w-12 sm:h-16 sm:w-16 rounded-full object-cover"
                priority
              />
            </div>
            <div>
              <h1
                ref={titleRef}
                className="flex font-display text-[clamp(3rem,6.5vw,6rem)] leading-[0.85] text-cream drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]"
              >
                {"PRIYA".split("").map((ch, i) => (
                  <span key={i} className="title-char inline-block">
                    {ch}
                  </span>
                ))}
              </h1>
              <div className="font-label text-[clamp(0.65rem,1.1vw,0.95rem)] uppercase tracking-[0.28em] text-champagne/90 font-medium mt-1">
                ICE CREAMS &amp; FAST FOODS
              </div>
            </div>
          </div>

          <p className="hero-fade-item mt-2 font-body text-xs sm:text-sm text-silver/80 max-w-md">
            Ice creams, fast food, milkshakes and favourites in Proddatur.
          </p>

          {/* ACTIVE DISH HIGHLIGHT BOX */}
          <div className="hero-fade-item mt-4 sm:mt-5 rounded-2xl border border-gold/30 bg-charcoal/75 p-4 sm:p-5 backdrop-blur-md shadow-2xl max-w-lg">
            <div ref={textContainerRef} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-champagne/40 bg-wine/40 px-2.5 py-0.5 sm:px-3 sm:py-0.5 font-label text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-champagne">
                  <Sparkles className="h-3 w-3 text-champagne" />
                  {displayedItem.category}
                </span>
              </div>

              <h2 className="font-display text-xl sm:text-2xl md:text-3xl text-cream tracking-wide">
                {displayedItem.title}
              </h2>

              <p className="font-body text-xs sm:text-sm text-silver leading-relaxed">
                {displayedItem.description}
              </p>

              <div className="font-label text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-champagne/80 pt-1 border-t border-white/10">
                ★ {displayedItem.tag}
              </div>
            </div>
          </div>

          {/* ACTION BUTTONS */}
          <div className="hero-fade-item mt-5 sm:mt-6 flex flex-wrap items-center gap-3">
            <MagneticButton href="#icecreams" variant="primary" cursorLabel="Explore">
              EXPLORE MENU
            </MagneticButton>
            <MagneticButton href="#location" variant="outline" cursorLabel="Directions">
              GET DIRECTIONS
            </MagneticButton>
          </div>
        </div>

        {/* RIGHT COLUMN: 3D HORIZONTAL CAROUSEL RAIL */}
        <div className="hero-rail-col relative flex h-[440px] md:h-[480px] w-full max-w-full overflow-hidden items-center justify-start lg:col-span-7 xl:col-span-7 pl-6">
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
      {/* MOBILE LAYOUT (< lg): CUSTOM ORDERED MOBILE SEQUENCE */}
      {/* ========================================================================= */}
      <div className="relative z-10 flex lg:hidden flex-col items-center gap-5 my-auto w-full max-w-full overflow-hidden">
        
        {/* MOBILE ORDER 1: BRAND TITLE & LARGE 3-LINE LOGO */}
        <div className="hero-left-col w-full max-w-xl">
          <div className="hero-fade-item flex items-center gap-3 sm:gap-5 my-1">
            <div className="relative shrink-0 rounded-full border-2 border-gold/60 p-1 bg-wine/50 shadow-[0_0_30px_rgba(229,185,92,0.4)]">
              <Image
                src="/priya-logo.png"
                alt="Priya Logo"
                width={100}
                height={100}
                className="h-20 w-20 sm:h-24 sm:w-24 rounded-full object-cover"
                priority
              />
            </div>

            <div className="flex flex-col justify-center">
              <div className="flex items-center gap-2 mb-0.5">
                <span className="h-px w-5 bg-champagne/60" />
                <span className="font-label text-[0.65rem] uppercase tracking-[0.35em] text-champagne font-semibold">
                  SINCE 1985
                </span>
              </div>

              <h1 className="flex font-display text-[clamp(2.6rem,8vw,4.5rem)] leading-[0.85] text-cream drop-shadow-[0_10px_35px_rgba(0,0,0,0.6)]">
                {"PRIYA".split("").map((ch, i) => (
                  <span key={i} className="title-char inline-block">
                    {ch}
                  </span>
                ))}
              </h1>

              <div className="font-label text-[clamp(0.6rem,1.2vw,0.85rem)] uppercase tracking-[0.25em] text-champagne/90 font-medium mt-1">
                ICE CREAMS &amp; FAST FOODS
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ORDER 2: ITEM DESCRIPTION BOX */}
        <div className="hero-left-col w-full max-w-xl">
          <p className="hero-fade-item mt-1 font-body text-xs text-silver/80 max-w-md">
            Ice creams, fast food, milkshakes and favourites in Proddatur.
          </p>

          <div className="hero-fade-item mt-3 rounded-2xl border border-gold/30 bg-charcoal/75 p-4 backdrop-blur-md shadow-2xl">
            <div ref={textContainerRef} className="space-y-2">
              <div className="flex items-center justify-between gap-2">
                <span className="inline-flex items-center gap-1 rounded-full border border-champagne/40 bg-wine/40 px-2.5 py-0.5 font-label text-[0.6rem] uppercase tracking-wider text-champagne">
                  <Sparkles className="h-3 w-3 text-champagne" />
                  {displayedItem.category}
                </span>
              </div>

              <h2 className="font-display text-xl text-cream tracking-wide">
                {displayedItem.title}
              </h2>

              <p className="font-body text-xs text-silver leading-relaxed">
                {displayedItem.description}
              </p>

              <div className="font-label text-[0.6rem] uppercase tracking-widest text-champagne/80 pt-1 border-t border-white/10">
                ★ {displayedItem.tag}
              </div>
            </div>
          </div>
        </div>

        {/* MOBILE ORDER 3: HERO ITEMS 3D CAROUSEL RAIL */}
        <div className="hero-rail-col relative flex h-[340px] sm:h-[380px] w-full max-w-full overflow-hidden items-center justify-center">
          <HeroRail3D
            items={HERO_ITEMS}
            activeIndex={activeIndex}
            onItemSelect={selectIndex}
            isHovered={isHovered}
            setIsHovered={setIsHovered}
          />
        </div>

        {/* MOBILE ORDER 4: ACTION BUTTONS */}
        <div className="hero-left-col w-full max-w-xl">
          <div className="hero-fade-item flex flex-wrap items-center justify-start gap-3 mt-1">
            <MagneticButton href="#icecreams" variant="primary" cursorLabel="Explore">
              EXPLORE MENU
            </MagneticButton>
            <MagneticButton href="#location" variant="outline" cursorLabel="Directions">
              GET DIRECTIONS
            </MagneticButton>
          </div>
        </div>

      </div>

      {/* BOTTOM CONTROLS & PROGRESS BAR */}
      <div className="hero-bottom-bar relative z-20 flex w-full items-center justify-between border-t border-white/10 pt-4 mt-4">
        {/* COUNTER DISPLAY */}
        <div className="flex items-center gap-2 sm:gap-3">
          <span className="font-display text-lg sm:text-xl text-champagne tracking-wider">
            0{activeIndex + 1}
          </span>
          <span className="font-label text-xs text-silver/50">/</span>
          <span className="font-label text-xs text-silver/70">
            0{HERO_ITEMS.length}
          </span>
        </div>

        {/* AUTOPLAY PROGRESS INDICATOR (5 SECONDS) */}
        <div className="mx-4 sm:mx-6 flex-1 max-w-md">
          <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/10">
            <div
              className="absolute left-0 top-0 h-full bg-gradient-to-r from-wine via-champagne to-gold transition-all duration-75 ease-linear rounded-full"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* NAVIGATION CHEVRONS */}
        <div className="flex items-center gap-2">
          <button
            onClick={goToPrev}
            aria-label="Previous carousel item"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-champagne/30 bg-charcoal/60 text-cream transition-all hover:border-champagne hover:bg-wine/40 hover:text-champagne active:scale-95"
          >
            <ChevronLeft className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
          <button
            onClick={goToNext}
            aria-label="Next carousel item"
            className="flex h-9 w-9 sm:h-10 sm:w-10 items-center justify-center rounded-full border border-champagne/30 bg-charcoal/60 text-cream transition-all hover:border-champagne hover:bg-wine/40 hover:text-champagne active:scale-95"
          >
            <ChevronRight className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}
