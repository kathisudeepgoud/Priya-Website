"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { gsap } from "gsap";

export default function Loader() {
  const [done, setDone] = useState(false);
  const [progress, setProgress] = useState(0);
  const rootRef = useRef<HTMLDivElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Prevent body scroll during initial brief loader
    document.body.style.overflow = "hidden";

    // Progress counter animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(100, prev + Math.floor(Math.random() * 25) + 15);
      });
    }, 90);

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        document.body.style.overflowY = "auto";
        setDone(true);
      }
    });

    // 1. Initial logo scale-in and glow entrance
    tl.fromTo(
      logoRef.current,
      { scale: 0.7, opacity: 0, rotate: -10 },
      { scale: 1, opacity: 1, rotate: 0, duration: 0.6, ease: "back.out(1.7)" }
    )
      .fromTo(
        textRef.current,
        { y: 15, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" },
        "-=0.3"
      )
      .fromTo(
        ringRef.current,
        { rotate: 0 },
        { rotate: 360, duration: 1.2, ease: "power1.inOut" },
        0.2
      );

    // 2. Smooth zoom fade transition out
    tl.to(
      [logoRef.current, textRef.current],
      { scale: 1.15, opacity: 0, duration: 0.4, ease: "power2.in" },
      "+=0.4"
    ).to(
      rootRef.current,
      { opacity: 0, scale: 1.05, duration: 0.5, ease: "power3.inOut" },
      "-=0.2"
    );

    return () => {
      clearInterval(progressInterval);
      document.body.style.overflow = "";
      document.body.style.overflowY = "auto";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center theme-bg-main pointer-events-none select-none overflow-hidden transition-colors duration-300"
      aria-hidden="true"
    >
      {/* Background ambient lighting glow */}
      <div className="absolute h-96 w-96 rounded-full bg-wine/30 blur-[120px] animate-pulse-glow" />
      <div className="absolute h-72 w-72 rounded-full bg-champagne/15 blur-[100px]" />

      {/* Floating subtle ambient spark particles */}
      <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(#E5B95C_1px,transparent_1px)] [background-size:32px_32px]" />

      {/* Centered Priya Logo & Rotating Golden Ring */}
      <div className="relative flex flex-col items-center justify-center gap-6">
        <div className="relative flex items-center justify-center">
          {/* Rotating outer dash ring */}
          <div
            ref={ringRef}
            className="absolute -inset-4 rounded-full border border-dashed border-champagne/60 opacity-80"
          />

          {/* Logo container with double border glow */}
          <div
            ref={logoRef}
            className="relative h-28 w-28 sm:h-36 sm:w-36 rounded-full border-2 border-gold p-1 bg-wine/60 shadow-[0_0_50px_rgba(229,185,92,0.4)] overflow-hidden"
          >
            <Image
              src="/priya-logo.png"
              alt="Priya Logo"
              fill
              className="object-cover rounded-full p-1"
              priority
            />
          </div>
        </div>

        {/* Text details */}
        <div ref={textRef} className="flex flex-col items-center text-center space-y-1.5 z-10">
          <span className="eyebrow tracking-[0.4em] font-semibold">
            SINCE 1985
          </span>
          <h1 className="font-display text-4xl sm:text-5xl tracking-wide text-cream drop-shadow-md">
            PRIYA
          </h1>
          <span className="font-label text-[0.65rem] uppercase tracking-[0.3em] text-champagne/90">
            ICE CREAMS &amp; FAST FOODS
          </span>

          {/* Progress percentage indicator */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-1 w-32 overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full bg-gradient-to-r from-wine via-champagne to-gold transition-all duration-150 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-label text-xs font-semibold text-champagne tracking-widest min-w-[36px]">
              {progress}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
