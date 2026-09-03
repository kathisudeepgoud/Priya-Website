"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          end: "bottom 15%",
          toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
        }
      });

      tl.fromTo(
        ".story-eyebrow",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      )
        .fromTo(
          ".reveal-year",
          { scale: 0.85, opacity: 0 },
          { scale: 1, opacity: 1, duration: 1.2, ease: "power4.out" },
          0.1
        )
        .fromTo(
          ".story-head",
          { y: 30, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.3
        )
        .fromTo(
          ".story-p",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.4
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="overflow-hidden theme-bg-main pt-24 sm:pt-36 pb-28 text-center">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <span className="story-eyebrow eyebrow mb-4 block tracking-[0.35em] font-bold">
          Our Story
        </span>
        <div className="reveal-year font-display text-[clamp(5rem,20vw,16rem)] leading-[0.85] tracking-tight">
          1985
        </div>
        <div className="relative z-10 mx-auto mt-6 sm:mt-8 max-w-3xl space-y-4">
          <h2 className="story-head font-display text-[clamp(2rem,5vw,4rem)] uppercase leading-none text-cream tracking-wide">
            FOUR DECADES. ONE NAME. <span className="text-gold">PRIYA.</span>
          </h2>
          <p className="story-p font-body text-sm sm:text-base md:text-lg leading-relaxed text-silver max-w-2xl mx-auto">
            For four decades, <b className="text-cream">Priya Ice Creams &amp; Fast Foods</b> has served
            Proddatur from the same spirit of hospitality — Fast Food, hand-scooped ice creams, and
            thick milkshakes, made the way the neighbourhood has always known them.
          </p>
        </div>
      </div>
    </section>
  );
}
