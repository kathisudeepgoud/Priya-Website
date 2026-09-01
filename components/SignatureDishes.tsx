"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Sparkles } from "lucide-react";
import { manchurian, specialIceCreams, iceCreams, riceItems } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export type SignatureDish = {
  id: string;
  name: string;
  category: string;
  image: string;
  description: string;
};

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: "gobi-manchurian",
    name: "Gobi Manchurian",
    category: "Fast Food Signature",
    image: "/Gobi.jpeg",
    description: "Proddatur's favorite crispy Indo-Chinese starter with garlic, spring onions, and vibrant chili glaze."
  },
  {
    id: "mushroom-chilli",
    name: "Mushroom Chilli",
    category: "Sizzling Manchurian",
    image: "/Mushroom.jpeg",
    description: "Tender button mushrooms tossed on a blazing wok with authentic Proddatur spices and savory sauces."
  },
  {
    id: "egg-rice",
    name: "Egg Rice",
    category: "Aromatic Rice Stir-Fry",
    image: "/egg-rice.jpg",
    description: "Golden fried rice cooked with fresh eggs, fragrant herbs, and Priya's house-blend wok seasoning."
  },
  {
    id: "3-in-1",
    name: "3 in 1",
    category: "Tri-Flavor Dessert Scoop",
    image: "/3 in 1.jpeg",
    description: "Three handcrafted scoops of signature creaminess blended into one indulgent dessert bowl."
  },
  {
    id: "basanti-ice",
    name: "Basanti Ice",
    category: "Proddatur Royal Special",
    image: "/Basanti.jpeg",
    description: "Traditional condensed saffron milk Rabri chilled over scoops of silky smooth vanilla ice cream."
  },
  {
    id: "priya-special",
    name: "Priya Special",
    category: "House Royal Sundae",
    image: "/priya special.jpeg",
    description: "Our crowning dessert achievement since 1985 — multi-flavored ice cream scoops layered with cashews and berries."
  }
];

export default function SignatureDishes() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // 3D tilt interaction states per card
  const [tilt, setTilt] = useState<{ [key: string]: { x: number; y: number } }>({});

  const handleMouseMoveCard = (id: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window !== "undefined" && window.innerWidth < 768) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16;
    setTilt((prev) => ({ ...prev, [id]: { x, y } }));
  };

  const handleMouseLeaveCard = (id: string) => {
    setTilt((prev) => ({ ...prev, [id]: { x: 0, y: 0 } }));
  };

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".sig-card",
        { y: 60, opacity: 0, scale: 0.95 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="signature-dishes"
      ref={sectionRef}
      className="relative theme-bg-main py-24 sm:py-32 overflow-hidden max-w-full gpu-layer"
      aria-label="Must Try Signature Dishes at Priya"
    >
      {/* Ambient background glows */}
      <div className="pointer-events-none absolute top-10 left-10 h-[400px] w-[400px] rounded-full bg-wine/20 blur-[130px]" />
      <div className="pointer-events-none absolute bottom-10 right-10 h-[400px] w-[400px] rounded-full bg-champagne/10 blur-[130px]" />

      <div className="mx-auto max-w-[1400px] px-[5vw]">
        {/* Header Block */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-6 border-b border-white/10 pb-8">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-champagne" />
              <span className="eyebrow tracking-[0.35em]">PRODDATUR LEGENDS</span>
            </div>
            <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] uppercase leading-none text-cream tracking-wide">
              MUST TRY AT PRIYA
            </h2>
          </div>
          <p className="font-body text-xs sm:text-sm text-silver/80 max-w-md leading-relaxed">
            Six legendary creations that defined Priya Ice Creams &amp; Fast Foods over four decades of culinary excellence in Proddatur.
          </p>
        </div>

        {/* 6 Large Premium Food Cards Grid */}
        <div
          ref={containerRef}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 overflow-x-auto no-scrollbar touch-pan-y"
        >
          {SIGNATURE_DISHES.map((dish) => {
            const cardTilt = tilt[dish.id] || { x: 0, y: 0 };
            return (
              <div
                key={dish.id}
                onMouseMove={(e) => handleMouseMoveCard(dish.id, e)}
                onMouseLeave={() => handleMouseLeaveCard(dish.id)}
                className="sig-card group relative rounded-3xl border border-gold/30 bg-card-surface p-4 sm:p-5 transition-all duration-500 ease-out shadow-[0_15px_40px_rgba(0,0,0,0.5)] hover:border-gold hover:shadow-[0_25px_60px_rgba(229,185,92,0.25)] flex flex-col justify-between"
                style={{
                  perspective: "1000px",
                  transformStyle: "preserve-3d",
                  transform: `rotateX(${cardTilt.y}deg) rotateY(${cardTilt.x}deg)`
                }}
              >
                {/* Image Container with Zoom & Layered Backdrop */}
                <div className="relative h-64 sm:h-72 w-full rounded-2xl overflow-hidden mb-5 border border-white/10 bg-black">
                  <Image
                    src={dish.image}
                    alt={dish.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-[cubic-bezier(.16,1,.3,1)] group-hover:scale-110"
                    priority
                  />
                  {/* Subtle Gradient Reveal Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent transition-opacity duration-300 group-hover:opacity-90" />

                  {/* Bottom Image Overlay Category & Title */}
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="font-label text-[0.65rem] uppercase tracking-widest text-champagne/90 block font-semibold">
                      {dish.category}
                    </span>
                    <h3 className="font-display text-2xl text-cream drop-shadow-md group-hover:text-gold transition-colors">
                      {dish.name}
                    </h3>
                  </div>
                </div>

                {/* Content Body */}
                <div className="px-1 pt-1">
                  <p className="font-body text-xs sm:text-sm text-silver/85 leading-relaxed">
                    {dish.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
