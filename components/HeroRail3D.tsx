"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { HeroItem } from "@/lib/hero-items";

interface HeroRail3DProps {
  items: HeroItem[];
  activeIndex: number;
  onItemSelect: (index: number) => void;
  onInteraction?: () => void;
}

export default function HeroRail3D({
  items,
  activeIndex,
  onItemSelect,
  onInteraction
}: HeroRail3DProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Screen width state for responsive positioning
  const [screenWidth, setScreenWidth] = useState(1200);

  useEffect(() => {
    const handleResize = () => setScreenWidth(window.innerWidth);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Touch & Mouse Drag State
  const touchStartX = useRef<number | null>(null);
  const touchStartY = useRef<number | null>(null);
  const isHorizontalSwipe = useRef<boolean | null>(null);
  const dragStartX = useRef(0);
  
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);

  // Touch Swipe Handlers (Mobile)
  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    if (e.touches.length !== 1) return;
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    dragStartX.current = e.touches[0].clientX;
    isHorizontalSwipe.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (touchStartX.current === null || touchStartY.current === null) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - touchStartX.current);
    const deltaY = Math.abs(currentY - touchStartY.current);

    if (isHorizontalSwipe.current === null) {
      if (deltaX > 6 || deltaY > 6) {
        isHorizontalSwipe.current = deltaX > deltaY;
        setIsDragging(isHorizontalSwipe.current);
      }
    }

    if (isHorizontalSwipe.current === true) {
      const moveX = currentX - dragStartX.current;
      setDragOffset(moveX);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (isHorizontalSwipe.current === true) {
      const touchEndX = e.changedTouches[0]?.clientX || dragStartX.current;
      const deltaX = touchEndX - dragStartX.current;
      const N = items.length;

      if (deltaX < -35) {
        onItemSelect((activeIndex + 1) % N);
        onInteraction?.();
      } else if (deltaX > 35) {
        onItemSelect((activeIndex - 1 + N) % N);
        onInteraction?.();
      }
    }

    touchStartX.current = null;
    touchStartY.current = null;
    isHorizontalSwipe.current = null;
    setIsDragging(false);
    setDragOffset(0);
  };

  // Mouse Drag Handlers (Desktop / Laptop)
  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    dragStartX.current = e.clientX;
    setDragOffset(0);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const deltaX = e.clientX - dragStartX.current;
    setDragOffset(deltaX);
  };

  const handleMouseUp = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    setIsDragging(false);

    const deltaX = e.clientX - dragStartX.current;
    const N = items.length;

    if (deltaX < -35) {
      onItemSelect((activeIndex + 1) % N);
      onInteraction?.();
    } else if (deltaX > 35) {
      onItemSelect((activeIndex - 1 + N) % N);
      onInteraction?.();
    }

    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setDragOffset(0);
    }
  };

  const N = items.length;
  const isMobile = screenWidth < 640;
  const isTablet = screenWidth >= 640 && screenWidth < 1024;
  const isLaptop = screenWidth >= 1024;

  const stepX = isMobile ? 100 : isTablet ? 150 : 180;
  const leftStartGap = isLaptop ? 35 : 0;

  return (
    <div
      ref={containerRef}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onTouchCancel={handleTouchEnd}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseLeave}
      className={`relative flex h-[380px] sm:h-[440px] md:h-[480px] lg:h-[510px] xl:h-[530px] w-full max-w-full select-none items-center justify-center lg:justify-start touch-pan-y overflow-hidden py-6 ${
        isDragging ? "cursor-grabbing" : "cursor-grab"
      }`}
      style={{ perspective: "1400px" }}
      aria-label="3D Hero Rail Carousel"
    >
      {/* 3D Rail Container */}
      <div
        className="relative flex h-full w-full items-center justify-center lg:justify-start"
        style={{ transformStyle: "preserve-3d" }}
      >
        {items.map((item, index) => {
          let forwardOffset = (index - activeIndex + N) % N;

          // Display 3 cards: Main (0), Second (1), Third (2)
          let isVisible = forwardOffset === 0 || forwardOffset === 1 || forwardOffset === 2;
          let displayOffset = forwardOffset;
          if (forwardOffset === N - 1) {
            displayOffset = -1;
            isVisible = true; // smooth left exit
          }

          const isMain = displayOffset === 0;

          let tx = leftStartGap + displayOffset * stepX + (isDragging ? dragOffset * 0.7 : 0);
          let tz = 0;
          let rotY = 0;
          let scale = 1;
          let opacity = 0;
          let zIndex = 10;

          if (displayOffset === -1) {
            tx = leftStartGap - stepX * 0.85;
            tz = -120;
            rotY = 18;
            scale = 0.68;
            opacity = 0;
            zIndex = 5;
          } else if (displayOffset === 0) {
            tx = leftStartGap + (isDragging ? dragOffset * 0.7 : 0);
            tz = 50;
            rotY = -3;
            scale = isMobile ? 0.94 : isTablet ? 0.98 : 1.0;
            opacity = 1;
            zIndex = 40;
          } else if (displayOffset === 1) {
            tx = leftStartGap + stepX + (isDragging ? dragOffset * 0.7 : 0);
            tz = -40;
            rotY = -14;
            scale = isMobile ? 0.80 : 0.84;
            opacity = 0.92;
            zIndex = 30;
          } else if (displayOffset === 2) {
            tx = leftStartGap + stepX * 1.8 + (isDragging ? dragOffset * 0.7 : 0);
            tz = -100;
            rotY = -24;
            scale = isMobile ? 0.64 : 0.70;
            opacity = 0.75;
            zIndex = 20;
          } else {
            tx = leftStartGap + stepX * 2.5;
            tz = -220;
            rotY = -45;
            scale = 0.45;
            opacity = 0;
            zIndex = 10;
          }

          return (
            <div
              key={item.id}
              onClick={(e) => {
                if (Math.abs(dragOffset) < 10 && isVisible) {
                  e.stopPropagation();
                  onItemSelect(index);
                  onInteraction?.();
                }
              }}
              className={`absolute top-1/2 ${isLaptop ? "left-0" : "left-1/2 -ml-[130px] sm:-ml-[150px]"}
                -mt-[150px] sm:-mt-[180px] md:-mt-[195px] lg:-mt-[205px]
                w-[260px] h-[300px] sm:w-[300px] sm:h-[360px] md:w-[320px] md:h-[390px] lg:w-[340px] lg:h-[410px]
                rounded-[28px] sm:rounded-[32px] transition-all ${isDragging ? "duration-75" : "duration-600 ease-out"}
                will-change-transform cursor-pointer overflow-hidden border-2
                ${
                  isMain
                    ? "border-gold/80 shadow-[0_20px_50px_rgba(0,0,0,0.8),0_0_30px_rgba(229,185,92,0.3)]"
                    : "border-gold/30 shadow-2xl opacity-85"
                }
              `}
              style={{
                transformStyle: "preserve-3d",
                transform: `translateX(${tx}px) translateZ(${tz}px) rotateY(${rotY}deg) scale(${scale})`,
                opacity: isVisible ? opacity : 0,
                zIndex: zIndex,
                pointerEvents: isVisible && opacity > 0.1 ? "auto" : "none"
              }}
            >
              {/* Card Image */}
              {item.image && (
                <div className="relative h-full w-full bg-black">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 260px, (max-width: 1024px) 300px, 340px"
                    className="object-cover object-center transition-transform duration-700 hover:scale-105"
                    priority={isMain}
                  />

                  {/* Gradient overlay at bottom of card */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent z-10" />

                  {/* Card Bottom Details */}
                  <div className="absolute bottom-3 left-3 right-3 z-20 text-left space-y-0.5">
                    <span className="font-label text-[0.6rem] sm:text-[0.65rem] uppercase tracking-[0.2em] text-champagne font-bold block">
                      {item.category}
                    </span>
                    <h3 className="font-display text-lg sm:text-xl text-cream drop-shadow-md leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-label text-[0.6rem] sm:text-[0.65rem] text-silver/90 font-medium truncate">
                      {item.tag}
                    </p>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
