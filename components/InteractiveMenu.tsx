"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
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

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type CategoryGroupDef = {
  id: string;
  name: string;
  section: string;
  icon: any;
  items: MenuItem[];
};

const MENU_CATEGORIES: CategoryGroupDef[] = [
  {
    id: "gobi",
    name: "Gobi Special",
    section: "Fast Food",
    icon: Flame,
    items: gobiItems
  },
  {
    id: "mushroom",
    name: "Mushroom",
    section: "Fast Food",
    icon: Flame,
    items: mushroomItems
  },
  {
    id: "paneer",
    name: "Paneer Special",
    section: "Fast Food",
    icon: Flame,
    items: paneerItems
  },
  {
    id: "noodles",
    name: "Noodles",
    section: "Fast Food",
    icon: UtensilsCrossed,
    items: noodlesItems
  },
  {
    id: "rice-items",
    name: "Rice Items",
    section: "Fast Food",
    icon: UtensilsCrossed,
    items: riceItems
  },
  {
    id: "baby-corn",
    name: "Baby Corn",
    section: "Fast Food",
    icon: Flame,
    items: babyCornItems
  },
  {
    id: "kaju",
    name: "Kaju Special",
    section: "Fast Food",
    icon: Flame,
    items: kajuItems
  },
  {
    id: "soups",
    name: "Soups",
    section: "North Indian",
    icon: Soup,
    items: soupItems
  },
  {
    id: "biryani",
    name: "Biryani",
    section: "North Indian",
    icon: ChefHat,
    items: biryaniItems
  },
  {
    id: "veg-curries",
    name: "Veg Curries",
    section: "North Indian",
    icon: ChefHat,
    items: vegCurryItems
  },
  {
    id: "tandoori",
    name: "Tandoori & Roti",
    section: "North Indian",
    icon: Wheat,
    items: tandooriItems
  },
  {
    id: "veg-starters",
    name: "Veg Starters",
    section: "North Indian",
    icon: ChefHat,
    items: vegStarterItems
  },
  {
    id: "icecreams",
    name: "Ice Creams",
    section: "Desserts & Drinks",
    icon: IceCream,
    items: iceCreams
  },
  {
    id: "spl-icecreams",
    name: "Spl. Ice Creams",
    section: "Desserts & Drinks",
    icon: Sparkles,
    items: specialIceCreams
  },
  {
    id: "milkshakes",
    name: "Milkshakes & Beverages",
    section: "Desserts & Drinks",
    icon: GlassWater,
    items: milkshakes
  },
  {
    id: "icecream-parcels",
    name: "Ice Cream Parcels",
    section: "Desserts & Drinks",
    icon: PackageCheck,
    items: iceCreamParcel
  },
  {
    id: "basanthi-parcels",
    name: "Basanthi Parcels",
    section: "Desserts & Drinks",
    icon: PackageCheck,
    items: basanthiParcel
  }
];

export default function InteractiveMenu() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const [activeCategory, setActiveCategory] = useState<string>("gobi");
  const [isAnimating, setIsAnimating] = useState(false);

  const activeIdx = MENU_CATEGORIES.findIndex((c) => c.id === activeCategory);
  const activeDef = MENU_CATEGORIES[activeIdx >= 0 ? activeIdx : 0];

  const handleCategorySwitch = useCallback(
    (targetId: string) => {
      if (isAnimating || targetId === activeCategory) return;
      setIsAnimating(true);

      if (listRef.current) {
        gsap.to(listRef.current.children, {
          opacity: 0,
          y: -10,
          duration: 0.15,
          stagger: 0.015,
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

  // Scroll active pill into center inside horizontal category navbar track only
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

  // Animate items entering on category switch
  useEffect(() => {
    if (!listRef.current) return;
    gsap.fromTo(
      listRef.current.children,
      { y: 15, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.28,
        stagger: 0.02,
        ease: "power2.out",
        onComplete: () => {
          setIsAnimating(false);
        }
      }
    );
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
      className="theme-bg-alt py-16 sm:py-28 max-w-full relative overflow-x-clip"
      aria-label="Priya Complete Interactive Menu"
    >
      <div className="mx-auto max-w-[1400px] px-[4vw] sm:px-[5vw]">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-12 space-y-2.5">
          <span className="eyebrow tracking-[0.35em] font-bold">AUTHENTIC PRODDATUR RECIPES</span>
          <h2 className="font-display text-[clamp(2.4rem,6vw,4.8rem)] uppercase leading-none text-cream">
            EXPLORE OUR MENU
          </h2>
          <p className="font-body text-xs sm:text-sm text-silver/90">
            Hand-crafted Indo-Chinese fast foods, North Indian dishes, royal ice creams, and thick milkshakes.
          </p>
        </div>

        {/* ========================================================================= */}
        {/* STICKY HORIZONTALLY SCROLLABLE CATEGORY NAVIGATION BAR */}
        {/* ========================================================================= */}
        <div className="sticky top-14 z-40 -mx-[4vw] sm:-mx-[5vw] px-[4vw] sm:px-[5vw] py-3 bg-[#140D10]/95 backdrop-blur-xl border-y border-gold/25 shadow-[0_10px_25px_rgba(0,0,0,0.5)] mb-8 transition-all">
          <div className="relative flex items-center max-w-[1400px] mx-auto">
            
            {/* Scroll Left Button */}
            <button
              onClick={scrollLeft}
              aria-label="Scroll categories left"
              className="hidden md:flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-wine/60 text-champagne hover:bg-wine hover:border-champagne transition-all active:scale-95 mr-2"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>

            {/* Horizontal Scroll Track */}
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
                    onClick={() => handleCategorySwitch(cat.id)}
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

        {/* Active Category Title & Item Count Header */}
        <div className="flex items-center justify-between border-b border-gold/30 pb-4 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="flex h-11 w-11 items-center justify-center rounded-full border border-gold bg-wine text-champagne shadow-md shrink-0">
              <activeDef.icon className="h-5 w-5 text-champagne" />
            </div>
            <div>
              <span className="font-label text-[0.65rem] uppercase tracking-widest text-champagne font-bold">
                {activeDef.section}
              </span>
              <h3 className="font-display text-2xl sm:text-3xl text-cream tracking-wide uppercase leading-tight">
                {activeDef.name}
              </h3>
            </div>
          </div>
          <span className="font-label text-xs uppercase tracking-widest text-silver/60">
            {activeDef.items.length} Items
          </span>
        </div>

        {/* Menu Items Grid */}
        <div
          ref={listRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 min-h-[260px]"
        >
          {activeDef.items.map((item, idx) => (
            <div
              key={`${item.name}-${idx}`}
              className="group flex items-center justify-between rounded-xl border border-white/10 bg-black/40 px-4 py-3.5 transition-all duration-300 hover:border-gold/60 hover:bg-wine/30 shadow-md"
            >
              <div className="flex items-center gap-2.5 pr-2 min-w-0">
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

                {/* Name & Telugu Script */}
                <div className="min-w-0">
                  <h4 className="font-display text-base sm:text-lg uppercase tracking-wide text-cream group-hover:text-champagne transition-colors truncate">
                    {item.name}
                  </h4>
                  {item.teluguName && (
                    <span className="font-body text-xs text-silver/70 block leading-tight truncate">
                      {item.teluguName}
                    </span>
                  )}
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
    </section>
  );
}
