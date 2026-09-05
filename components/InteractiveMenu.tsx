"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import {
  Flame,
  UtensilsCrossed,
  IceCream,
  Sparkles,
  GlassWater,
  PackageCheck,
  Soup,
  Wheat,
  ChefHat,
  ChevronLeft,
  ChevronRight
} from "lucide-react";
import {
  gobiItems,
  mushroomItems,
  paneerItems,
  noodlesItems,
  riceItems,
  babyCornItems,
  kajuItems,
  soupItems,
  biryaniItems,
  vegCurryItems,
  tandooriItems,
  vegStarterItems,
  iceCreams,
  specialIceCreams,
  milkshakes,
  iceCreamParcel,
  basanthiParcel,
  MenuItem
} from "@/lib/menu-data";

export type CategoryGroupDef = {
  id: string;
  name: string;
  section: string;
  icon: any;
  items: MenuItem[];
};

const MENU_CATEGORIES: CategoryGroupDef[] = [
  { id: "gobi", name: "Gobi Special", section: "Fast Food", icon: Flame, items: gobiItems },
  { id: "mushroom", name: "Mushroom", section: "Fast Food", icon: Flame, items: mushroomItems },
  { id: "paneer", name: "Paneer Special", section: "Fast Food", icon: Flame, items: paneerItems },
  { id: "noodles", name: "Noodles", section: "Fast Food", icon: UtensilsCrossed, items: noodlesItems },
  { id: "rice-items", name: "Rice Items", section: "Fast Food", icon: UtensilsCrossed, items: riceItems },
  { id: "baby-corn", name: "Baby Corn", section: "Fast Food", icon: Flame, items: babyCornItems },
  { id: "kaju", name: "Kaju Special", section: "Fast Food", icon: Flame, items: kajuItems },
  { id: "soups", name: "Soups", section: "North Indian", icon: Soup, items: soupItems },
  { id: "biryani", name: "Biryani", section: "North Indian", icon: ChefHat, items: biryaniItems },
  { id: "veg-curries", name: "Veg Curries", section: "North Indian", icon: ChefHat, items: vegCurryItems },
  { id: "tandoori", name: "Tandoori & Roti", section: "North Indian", icon: Wheat, items: tandooriItems },
  { id: "veg-starters", name: "Veg Starters", section: "North Indian", icon: ChefHat, items: vegStarterItems },
  { id: "icecreams", name: "Ice Creams", section: "Desserts & Drinks", icon: IceCream, items: iceCreams },
  { id: "spl-icecreams", name: "Spl. Ice Creams", section: "Desserts & Drinks", icon: Sparkles, items: specialIceCreams },
  { id: "milkshakes", name: "Milkshakes & Beverages", section: "Desserts & Drinks", icon: GlassWater, items: milkshakes },
  { id: "icecream-parcels", name: "Ice Cream Parcels", section: "Desserts & Drinks", icon: PackageCheck, items: iceCreamParcel },
  { id: "basanthi-parcels", name: "Basanthi Parcels", section: "Desserts & Drinks", icon: PackageCheck, items: basanthiParcel }
];

export default function InteractiveMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("gobi");

  // ScrollSpy: Detect which category section is currently in view
  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-100px 0px -50% 0px",
      threshold: 0
    };

    const handleIntersect: IntersectionObserverCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("data-section-id");
          if (id) {
            setActiveCategory(id);
          }
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, observerOptions);

    MENU_CATEGORIES.forEach((cat) => {
      const el = document.getElementById(`cat-${cat.id}`);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Smooth scroll to selected category section on pill click (Generous offset to keep headings fully visible)
  const scrollToCategory = useCallback((catId: string) => {
    setActiveCategory(catId);
    const targetEl = document.getElementById(`cat-${catId}`);
    if (targetEl) {
      const headerOffset = typeof window !== "undefined" && window.innerWidth < 640 ? 134 : 148;
      const elementPosition = targetEl.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: Math.max(0, offsetPosition),
        behavior: "smooth"
      });
    }
  }, []);

  // Keep active category pill centered inside horizontal category navbar track
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;
    const activeBtn = container.querySelector<HTMLButtonElement>(`[data-cat-id="${activeCategory}"]`);
    if (activeBtn) {
      const scrollLeftTarget = activeBtn.offsetLeft - container.offsetWidth / 2 + activeBtn.offsetWidth / 2;
      container.scrollTo({
        left: Math.max(0, scrollLeftTarget),
        behavior: "smooth"
      });
    }
  }, [activeCategory]);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: -220, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({ left: 220, behavior: "smooth" });
    }
  };

  return (
    <section
      id="menu"
      ref={sectionRef}
      className="theme-bg-alt py-16 sm:py-24 max-w-full relative"
      aria-label="Priya Complete Interactive Menu"
    >
      <div className="mx-auto max-w-[1400px] px-[4vw] sm:px-[5vw] mb-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5">
          <span className="eyebrow tracking-[0.35em] font-bold">AUTHENTIC PRODDATUR RECIPES</span>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] uppercase leading-none text-cream">
            EXPLORE OUR MENU
          </h2>
          <p className="font-body text-xs sm:text-sm text-silver/90">
            Hand-crafted Indo-Chinese fast foods, North Indian dishes, royal ice creams, and thick milkshakes.
          </p>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* PERMANENT STICKY CATEGORY NAVBAR (PINNED AT TOP-[64PX]/[76PX] BELOW TOP NAV BAR) */}
      {/* ========================================================================= */}
      <div className="sticky top-[64px] sm:top-[76px] z-[400] w-full py-3 bg-[#140D10]/98 backdrop-blur-2xl border-y border-gold/30 shadow-[0_12px_30px_rgba(0,0,0,0.8)] mb-12 transition-all">
        <div className="relative flex items-center max-w-[1400px] mx-auto px-[4vw] sm:px-[5vw]">
          
          {/* Scroll Left Button */}
          <button
            onClick={scrollLeft}
            aria-label="Scroll categories left"
            className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-wine/60 text-champagne hover:bg-wine hover:border-champagne transition-all active:scale-95 mr-2"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          {/* Horizontal Category Track */}
          <div
            ref={scrollContainerRef}
            className="flex items-center gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1 w-full touch-pan-x"
          >
            {MENU_CATEGORIES.map((cat) => {
              const Icon = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  data-cat-id={cat.id}
                  onClick={() => scrollToCategory(cat.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-label text-xs uppercase tracking-wider whitespace-nowrap transition-all duration-300 shrink-0 ${
                    isActive
                      ? "text-wine-deep bg-champagne font-bold shadow-lg border border-gold scale-105"
                      : "text-cream bg-white/10 border border-white/15 hover:border-gold hover:text-champagne hover:bg-white/20"
                  }`}
                >
                  <Icon className={`h-3.5 w-3.5 shrink-0 ${isActive ? "text-wine-deep stroke-[2.5]" : "text-champagne"}`} />
                  <span>{cat.name}</span>
                </button>
              );
            })}
          </div>

          {/* Scroll Right Button */}
          <button
            onClick={scrollRight}
            aria-label="Scroll categories right"
            className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-wine/60 text-champagne hover:bg-wine hover:border-champagne transition-all active:scale-95 ml-2"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

        </div>
      </div>

      {/* ========================================================================= */}
      {/* CONTINUOUS ALL CATEGORIES MENU SECTIONS */}
      {/* ========================================================================= */}
      <div className="mx-auto max-w-[1400px] px-[4vw] sm:px-[5vw] space-y-16 sm:space-y-20">
        {MENU_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          return (
            <div
              key={cat.id}
              id={`cat-${cat.id}`}
              data-section-id={cat.id}
              className="scroll-mt-36 sm:scroll-mt-40"
            >
              {/* Category Header */}
              <div className="flex items-center justify-between border-b border-gold/30 pb-4 mb-6">
                <div className="flex items-center gap-3.5">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-wine text-champagne shadow-md shrink-0">
                    <Icon className="h-5 w-5 text-champagne" />
                  </div>
                  <div>
                    <span className="font-label text-[0.65rem] uppercase tracking-widest text-champagne font-bold">
                      {cat.section}
                    </span>
                    <h3 className="font-display text-2xl sm:text-3xl text-cream tracking-wide uppercase leading-tight">
                      {cat.name}
                    </h3>
                  </div>
                </div>
                <span className="font-label text-xs uppercase tracking-widest text-silver/60 font-semibold">
                  {cat.items.length} Items
                </span>
              </div>

              {/* Category Items Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {cat.items.map((item, idx) => (
                  <div
                    key={`${item.name}-${idx}`}
                    className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 transition-all duration-300 hover:border-gold/60 hover:bg-wine/30 shadow-md"
                  >
                    <div className="flex items-center gap-2.5 pr-2 min-w-0 flex-1">
                      {/* Veg / Egg Badge Indicator */}
                      <div
                        title={item.isEgg ? "Egg Item" : "Vegetarian Item"}
                        className={`h-4 w-4 shrink-0 rounded-sm border p-0.5 flex items-center justify-center ${
                          item.isEgg ? "border-amber-500" : "border-emerald-500"
                        }`}
                      >
                        <div
                          className={`h-2 w-2 rounded-full ${
                            item.isEgg ? "bg-amber-500" : "bg-emerald-500"
                          }`}
                        />
                      </div>

                      {/* Name & Telugu Script Inline in Brackets */}
                      <div className="min-w-0 flex-1">
                        <h4 className="font-display text-base sm:text-lg uppercase tracking-wide text-cream group-hover:text-champagne transition-colors flex items-baseline flex-wrap gap-1.5">
                          <span>{item.name}</span>
                          {item.teluguName && (
                            <span className="font-body text-xs text-silver/75 font-normal normal-case shrink-0">
                              ({item.teluguName})
                            </span>
                          )}
                        </h4>
                      </div>
                    </div>

                    {/* Price */}
                    <div className="shrink-0 pl-2">
                      <span className="font-display text-lg sm:text-xl text-champagne font-semibold">
                        ₹{item.price}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
