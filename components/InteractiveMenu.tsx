"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Flame, UtensilsCrossed, IceCream, Sparkles, GlassWater, PackageCheck, ChevronLeft, ChevronRight } from "lucide-react";
import {
  iceCreams,
  specialIceCreams,
  manchurian,
  riceItems,
  milkshakes,
  milkAndLassi,
  iceCreamParcel,
  basanthiParcel,
  MenuItem
} from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type CategoryDef = {
  id: string;
  name: string;
  label: string;
  icon: any;
  items: MenuItem[];
};

const CATEGORIES: CategoryDef[] = [
  {
    id: "fastfood",
    name: "FAST FOOD",
    label: "FAST FOOD",
    icon: Flame,
    items: manchurian
  },
  {
    id: "rice-noodles",
    name: "RICE & NOODLES",
    label: "RICE & NOODLES",
    icon: UtensilsCrossed,
    items: riceItems
  },
  {
    id: "icecreams",
    name: "ICE CREAMS",
    label: "ICE CREAMS",
    icon: IceCream,
    items: iceCreams
  },
  {
    id: "spl-icecreams",
    name: "SPL. ICE CREAMS",
    label: "SPL. ICE CREAMS",
    icon: Sparkles,
    items: specialIceCreams
  },
  {
    id: "milkshakes",
    name: "MILKSHAKES",
    label: "MILKSHAKES",
    icon: GlassWater,
    items: [...milkshakes, ...milkAndLassi]
  },
  {
    id: "parcels",
    name: "PARCELS",
    label: "PARCELS",
    icon: PackageCheck,
    items: [...iceCreamParcel, ...basanthiParcel]
  }
];

export default function InteractiveMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeCategory, setActiveCategory] = useState<string>("fastfood");
  const [slideDirection, setSlideDirection] = useState<"next" | "prev">("next");
  const [isAnimating, setIsAnimating] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);

  const activeIdx = CATEGORIES.findIndex((c) => c.id === activeCategory);
  const activeDef = CATEGORIES[activeIdx >= 0 ? activeIdx : 0];

  const handleCategorySwitch = useCallback(
    (targetId: string, direction: "next" | "prev") => {
      if (isAnimating || targetId === activeCategory) return;
      setIsAnimating(true);
      setSlideDirection(direction);

      if (listRef.current) {
        const exitX = direction === "next" ? -60 : 60;
        gsap.to(listRef.current.children, {
          x: exitX,
          opacity: 0,
          duration: 0.18,
          stagger: 0.02,
          ease: "power2.in",
          onComplete: () => {
            setActiveCategory(targetId);
          }
        });
      } else {
        setActiveCategory(targetId);
        setIsAnimating(false);
      }
    },
    [activeCategory, isAnimating]
  );

  const goToNextCat = () => {
    if (activeIdx < CATEGORIES.length - 1) {
      handleCategorySwitch(CATEGORIES[activeIdx + 1].id, "next");
    }
  };

  const goToPrevCat = () => {
    if (activeIdx > 0) {
      handleCategorySwitch(CATEGORIES[activeIdx - 1].id, "prev");
    }
  };

  // Animate items entering on category switch
  useEffect(() => {
    if (!listRef.current) return;
    const enterX = slideDirection === "next" ? 60 : -60;

    gsap.fromTo(
      listRef.current.children,
      { x: enterX, opacity: 0, scale: 0.98 },
      {
        x: 0,
        opacity: 1,
        scale: 1,
        duration: 0.3,
        stagger: 0.03,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimating(false);
        }
      }
    );
  }, [activeCategory, slideDirection]);

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="theme-bg-alt py-16 sm:py-28 max-w-full relative overflow-x-clip"
      aria-label="Priya Complete Interactive Menu"
    >
      <div className="mx-auto max-w-[1400px] px-[5vw]">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-12 space-y-3">
          <span className="eyebrow tracking-[0.35em] font-bold">AUTHENTIC PRODDATUR RECIPES</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,5rem)] uppercase leading-none text-cream">
            EXPLORE OUR MENU
          </h2>
          <p className="font-body text-xs sm:text-sm text-silver/90">
            Hand-crafted Indo-Chinese fast foods, royal ice creams, and thick milkshakes. All prices in INR.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* MOBILE ONLY NATIVE CSS STICKY CATEGORY NAV (< md) - BOUNDED TO MENU SECTION */}
        {/* ========================================================================= */}
        <div className="md:hidden sticky top-14 z-30 -mx-[5vw] px-[5vw] py-2.5 bg-charcoal/95 backdrop-blur-xl border-b border-gold/25 shadow-[0_12px_30px_rgba(0,0,0,0.4)] flex flex-col items-center gap-2 mb-8 transition-all duration-300">
          
          {/* Carousel Control Row */}
          <div className="flex items-center justify-between gap-3 w-full max-w-md">
            
            {/* LEFT ARROW BUTTON */}
            <button
              onClick={goToPrevCat}
              disabled={activeIdx === 0 || isAnimating}
              aria-label="Previous Category"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                activeIdx === 0
                  ? "opacity-20 cursor-not-allowed text-silver/40 border border-transparent"
                  : "text-champagne bg-wine/30 border border-gold/35 hover:bg-wine hover:text-white active:scale-95 shadow-md"
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            {/* ACTIVE CATEGORY DISPLAY BUTTON */}
            <button
              key={activeDef.id}
              onClick={() => {}}
              className="flex-1 flex items-center justify-center gap-2.5 px-4 py-2.5 rounded-xl bg-champagne text-wine-deep border border-gold font-bold shadow-md transition-all duration-300 active:scale-98"
            >
              <activeDef.icon className="h-5 w-5 text-wine-deep stroke-[2.5] shrink-0" />
              <span className="font-label text-sm uppercase tracking-wider font-bold truncate">
                {activeDef.name}
              </span>
            </button>

            {/* RIGHT ARROW BUTTON */}
            <button
              onClick={goToNextCat}
              disabled={activeIdx === CATEGORIES.length - 1 || isAnimating}
              aria-label="Next Category"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl transition-all duration-300 ${
                activeIdx === CATEGORIES.length - 1
                  ? "opacity-20 cursor-not-allowed text-silver/40 border border-transparent"
                  : "text-champagne bg-wine/30 border border-gold/35 hover:bg-wine hover:text-white active:scale-95 shadow-md"
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>

          </div>

          {/* PROGRESS DOTS (● ○ ○ ○ ○ ○) */}
          <div className="flex items-center justify-center gap-2 py-0.5">
            {CATEGORIES.map((cat, i) => {
              const isCurrent = i === activeIdx;
              return (
                <button
                  key={cat.id}
                  onClick={() => handleCategorySwitch(cat.id, i > activeIdx ? "next" : "prev")}
                  disabled={isAnimating}
                  aria-label={`Select category ${cat.name}`}
                  className={`transition-all duration-300 rounded-full ${
                    isCurrent
                      ? "w-6 h-2.5 bg-champagne border border-gold shadow-sm scale-105"
                      : "w-2.5 h-2.5 bg-white/20 hover:bg-gold/40 border border-white/10"
                  }`}
                />
              );
            })}
          </div>
        </div>

        {/* ========================================================================= */}
        {/* DESKTOP CATEGORY NAV (>= md) — UNCHANGED */}
        {/* ========================================================================= */}
        <div className="hidden md:flex flex-wrap justify-center items-center gap-3 mb-10 w-full p-2 rounded-full bg-wine-deep/60 backdrop-blur-md">
          {CATEGORIES.map((cat, i) => {
            const Icon = cat.icon;
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => handleCategorySwitch(cat.id, i > activeIdx ? "next" : "prev")}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-label text-sm uppercase tracking-wider transition-all duration-300 ${
                  isActive
                    ? "text-wine-deep bg-champagne font-bold shadow-md scale-105 border border-gold"
                    : "text-cream bg-white/10 border border-white/15 hover:border-gold hover:text-champagne hover:bg-white/20"
                }`}
              >
                <Icon className={`h-4 w-4 shrink-0 ${isActive ? "text-wine-deep stroke-[2.5]" : "text-champagne"}`} />
                <span className="whitespace-nowrap">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Active Category Header */}
        <div className="flex items-center justify-between border-b border-gold/30 pb-4 mb-8 scroll-mt-28">
          <div className="flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-gold bg-wine text-champagne shadow-md shrink-0">
              <activeDef.icon className="h-6 w-6 text-champagne" />
            </div>
            <div>
              <h3 className="font-display text-3xl sm:text-4xl text-cream tracking-wide uppercase">
                {activeDef.name}
              </h3>
              <p className="font-label text-xs uppercase tracking-widest text-champagne font-semibold mt-0.5">
                {activeDef.items.length} Items Available
              </p>
            </div>
          </div>
        </div>

        {/* Menu Items Grid with Slide/Fade Transition */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-3.5 min-h-[300px]"
        >
          {activeDef.items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group flex items-center justify-between rounded-xl border border-white/15 bg-black/40 px-4.5 py-4 transition-all duration-300 hover:border-gold hover:bg-wine/30 shadow-md hover:shadow-xl"
            >
              <div>
                <h4 className="font-display text-lg sm:text-xl uppercase tracking-wide text-cream group-hover:text-champagne transition-colors">
                  {item.name}
                </h4>
              </div>

              {/* Middle: Dashed separator */}
              <div className="mx-4 flex-1 border-b border-dashed border-silver/30 group-hover:border-champagne/60 transition-colors" />

              {/* Right: Price */}
              <div className="flex items-center gap-2 shrink-0">
                <span className="font-display text-xl sm:text-2xl text-champagne font-semibold group-hover:scale-105 transition-transform">
                  ₹{item.price}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
