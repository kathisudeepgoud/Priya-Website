"use client";

import { useRef, useState, useCallback, useEffect } from "react";
import Image from "next/image";
import { Sparkles, UtensilsCrossed, IceCream, Flame } from "lucide-react";
import { HeroItem } from "@/lib/hero-items";

interface HeroRail3DProps {
  items: HeroItem[];
  activeIndex: number;
  onItemSelect: (index: number) => void;
  isHovered: boolean;
  setIsHovered: (hovered: boolean) => void;
}

export default function HeroRail3D({
  items,
  activeIndex,
  onItemSelect,
  isHovered,
  setIsHovered
}: HeroRail3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hoveredCardIndex, setHoveredCardIndex] = useState<number | null>(null);

  // Screen width state for fluid layout calculation across Mobile, Tablet, Laptop
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Drag state
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartX = useRef(0);
  const dragStartTime = useRef(0);

  // Parallax tracking on desktop / laptop
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (typeof window === "undefined" || window.innerWidth < 768) return;
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    setMousePos({ x: x * 2, y: y * 2 });
  }, []);

  const handleMouseLeaveContainer = useCallback(() => {
    setMousePos({ x: 0, y: 0 });
    setIsHovered(false);
    setHoveredCardIndex(null);
  }, [setIsHovered]);

  // Drag / Touch gesture handlers
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    dragStartX.current = e.clientX;
    dragStartTime.current = Date.now();
    setDragOffset(0);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grabbing";
    }
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setDragOffset(deltaX);
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!isDragging) return;
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.cursor = "grab";
    }

    const deltaX = e.clientX - dragStartX.current;
    const deltaTime = Date.now() - dragStartTime.current;
    const velocity = Math.abs(deltaX) / (deltaTime || 1);

    const N = items.length;
    // Swipe left -> Next item, Swipe right -> Prev item
    if (deltaX < -40 || (deltaX < -15 && velocity > 0.4)) {
      onItemSelect((activeIndex + 1) % N);
    } else if (deltaX > 40 || (deltaX > 15 && velocity > 0.4)) {
      onItemSelect((activeIndex - 1 + N) % N);
    }

    setDragOffset(0);
  };

  const getCategoryIcon = (category: string) => {
    if (
      category.toLowerCase().includes("ice cream") ||
      category.toLowerCase().includes("sundae") ||
      category.toLowerCase().includes("dessert")
    ) {
      return <IceCream className="h-6 w-6 text-champagne" />;
    }
    if (
      category.toLowerCase().includes("fast food") ||
      category.toLowerCase().includes("manchurian")
    ) {
      return <Flame className="h-6 w-6 text-champagne" />;
    }
    return <UtensilsCrossed className="h-6 w-6 text-champagne" />;
  };

  const N = items.length;

  // Responsive device parameters
  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;
  const isLaptop = screenWidth >= 1024;

  // Horizontal step gap between Main, Medium, and Small cards
  const stepX = isMobile ? 135 : isTablet ? 180 : 210;

  // Extra left offset margin: 0 for centered mobile/tablet, 35 for laptop
  const leftStartGap = isLaptop ? 35 : 0;

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={handleMouseLeaveContainer}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      className="relative flex h-full w-full select-none items-center justify-center lg:justify-start cursor-grab touch-pan-y overflow-visible"
      style={{ perspective: "1400px" }}
      aria-label="3D Hero Carousel"
      role="region"
    >
      {/* 3D Rail Container with Mouse Parallax Tilt */}
      <div
        className="relative flex h-[340px] sm:h-[390px] md:h-[440px] w-full items-center justify-center lg:justify-start transition-transform duration-500 ease-out"
        style={{
          transformStyle: "preserve-3d",
          transform: `rotateY(${mousePos.x * 4}deg) rotateX(${-mousePos.y * 3}deg) translateX(${mousePos.x * 8}px)`
        }}
      >
        {items.map((item, index) => {
          let forwardOffset = (index - activeIndex + N) % N;

          // Display ONLY 3 items: offset 0 (Main), offset 1 (Medium), offset 2 (Small).
          let isVisible = forwardOffset === 0 || forwardOffset === 1 || forwardOffset === 2;

          let displayOffset = forwardOffset;
          if (forwardOffset === N - 1) {
            displayOffset = -1;
            isVisible = true; // smooth exit slide left
          }

          const isMain = displayOffset === 0;
          const isHoveredCard = hoveredCardIndex === index;

          let tx = leftStartGap + displayOffset * stepX + (isDragging ? dragOffset * 0.7 : 0);
          let tz = 0;
          let rotY = 0;
          let scale = 1;
          let opacity = 0;
          let zIndex = 10;

          if (displayOffset === -1) {
            tx = leftStartGap - stepX * 0.9;
            tz = -120;
            rotY = 20;
            scale = 0.65;
            opacity = 0;
            zIndex = 5;
          } else if (displayOffset === 0) {
            tx = leftStartGap + (isDragging ? dragOffset * 0.7 : 0);
            tz = 70;
            rotY = -3;
            scale = isMobile ? 0.96 : isTablet ? 1.0 : 1.06;
            opacity = 1;
            zIndex = 40;
          } else if (displayOffset === 1) {
            tx = leftStartGap + stepX + (isDragging ? dragOffset * 0.7 : 0);
            tz = -35;
            rotY = -12;
            scale = isMobile ? 0.78 : isTablet ? 0.82 : 0.86;
            opacity = 0.95; // High clarity & low transparency for next image
            zIndex = 30;
          } else if (displayOffset === 2) {
            tx = leftStartGap + stepX * 1.82 + (isDragging ? dragOffset * 0.7 : 0);
            tz = -90;
            rotY = -22;
            scale = isMobile ? 0.62 : isTablet ? 0.68 : 0.72;
            opacity = 0.82; // High clarity for 3rd image
            zIndex = 20;
          } else {
            tx = leftStartGap + stepX * 2.5;
            tz = -250;
            rotY = -45;
            scale = 0.45;
            opacity = 0;
            zIndex = 10;
          }

          // Hover boost on inactive right cards
          if (isHoveredCard && !isMain && isVisible) {
            tz += 30;
            rotY *= 0.6;
            scale += 0.04;
            opacity = 1;
          }

          return (
            <div
              key={item.id}
              onClick={(e) => {
                if (Math.abs(dragOffset) < 10 && isVisible) {
                  e.stopPropagation();
                  onItemSelect(index);
                }
              }}
              onMouseEnter={() => setHoveredCardIndex(index)}
              onMouseLeave={() => setHoveredCardIndex(null)}
              className={`absolute top-1/2 ${isLaptop ? "left-0" : "left-1/2 -ml-[110px] sm:-ml-[135px]"}
                -mt-[150px] sm:-mt-[180px] md:-mt-[200px]
                w-[220px] h-[300px] sm:w-[270px] sm:h-[360px] md:w-[320px] md:h-[400px]
                rounded-3xl transition-all ${isDragging ? "duration-75" : "duration-700 ease-out"}
                will-change-transform cursor-pointer overflow-hidden border-none
                ${isMain ? "shadow-[0_25px_50px_-12px_rgba(0,0,0,0.6),0_0_30px_rgba(122,27,52,0.4)]" : "shadow-xl"}
              `}
              style={{
                transformStyle: "preserve-3d",
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: isVisible ? opacity : 0,
                zIndex: zIndex,
                pointerEvents: isVisible && opacity > 0.1 ? "auto" : "none"
              }}
            >
              {/* Background gradient & grain texture */}
              <div className="absolute inset-0 bg-gradient-to-br from-[#231A1E] via-[#151013] to-[#0B090A]" />

              {/* Metallic glass sheen */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none" />

              {/* Patterned background lines */}
              <div
                className="absolute inset-0 opacity-15 pointer-events-none"
                style={{
                  backgroundImage: `radial-gradient(circle at 50% 50%, #E5B95C 1px, transparent 1px)`,
                  backgroundSize: "24px 24px"
                }}
              />

              {/* CONTENT: Real Image OR Styled Placeholder */}
              {item.image ? (
                <div className="relative h-full w-full">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 220px, (max-width: 1024px) 270px, 320px"
                    className="object-cover transition-transform duration-700 hover:scale-105"
                    priority={isMain}
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent ${isMain ? "opacity-95" : "opacity-75"}`} />
                  <div className="absolute bottom-4 left-4 right-4 text-left">
                    <span className="font-label text-[0.65rem] uppercase tracking-widest text-champagne font-semibold">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl text-white drop-shadow-md">{item.title}</h3>
                    <p className="font-label text-xs sm:text-sm text-white/85">{item.tag}</p>
                  </div>
                </div>
              ) : (
                <div className="relative flex h-full w-full flex-col justify-between p-4 sm:p-5 text-center">
                  {/* Top bar: Category badge & Number */}
                  <div className="flex items-center justify-between">
                    <span className="inline-flex items-center gap-1 sm:gap-1.5 rounded-full border border-champagne/30 bg-charcoal/60 px-2.5 py-0.5 sm:px-3 sm:py-1 font-label text-[0.6rem] sm:text-[0.65rem] uppercase tracking-widest text-champagne backdrop-blur-md">
                      <Sparkles className="h-3 w-3 text-champagne" />
                      {item.category}
                    </span>
                    <span className="font-display text-base sm:text-lg text-cream/40">
                      0{index + 1}
                    </span>
                  </div>

                  {/* Center visual centerpiece */}
                  <div className="my-auto flex flex-col items-center justify-center gap-2 sm:gap-3">
                    <div className="relative flex h-16 w-16 sm:h-20 sm:w-20 items-center justify-center rounded-full border border-gold/40 bg-wine/20 shadow-[0_0_20px_rgba(229,185,92,0.15)] backdrop-blur-sm transition-transform duration-500 group-hover:scale-110">
                      <div className="absolute inset-1 rounded-full border border-dashed border-champagne/40 animate-[spin_20s_linear_infinite]" />
                      {getCategoryIcon(item.category)}
                    </div>

                    <div className="space-y-0.5 sm:space-y-1">
                      <div className="font-label text-[0.65rem] sm:text-[0.7rem] uppercase tracking-[0.25em] text-champagne/90">
                        Image Placeholder
                      </div>
                      <div className="font-body text-[0.6rem] sm:text-[0.65rem] text-silver/60 uppercase tracking-widest">
                        Priya Food Asset #{item.id}
                      </div>
                    </div>
                  </div>

                  {/* Bottom Dish Card Summary */}
                  <div className="rounded-xl sm:rounded-2xl border border-white/10 bg-black/40 p-3 sm:p-3.5 backdrop-blur-md transition-all group-hover:border-champagne/40">
                    <div className="flex items-center justify-between">
                      <div className="text-left">
                        <div className="font-display text-base sm:text-lg leading-none text-cream tracking-wide">
                          {item.title}
                        </div>
                        <div className="font-label text-[0.6rem] sm:text-[0.65rem] uppercase tracking-wider text-silver/80 mt-1">
                          {item.tag}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Glowing Bottom Accent Line */}
                  <div
                    className={`absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-champagne to-transparent transition-opacity ${
                      isMain ? "opacity-100" : "opacity-30"
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
