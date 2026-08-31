"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Story() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          end: "bottom 15%",
          toggleActions: "play reverse play reverse"
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
          { xPercent: 40, opacity: 0 },
          { xPercent: 0, opacity: 1, duration: 1.2, ease: "power4.out" },
          0.1
        )
        .fromTo(
          ".story-p",
          { y: 40, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" },
          0.3
        );
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="story" ref={sectionRef} className="overflow-hidden theme-bg-main pt-36 sm:pt-48 pb-32 text-center">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <span className="story-eyebrow eyebrow mb-6 sm:mb-10 block tracking-[0.35em]">Our Story</span>
        <div className="reveal-year font-display text-[clamp(6rem,26vw,20rem)] leading-[0.8]">1985</div>
        <div className="relative z-10 mx-auto -mt-12 max-w-xl">
          <p className="story-p text-[clamp(1rem,2vw,1.3rem)] leading-relaxed text-silver">
            For four decades, <b className="text-cream">Priya Ice Creams &amp; Fast Foods</b> has served
            Proddatur from the same spirit of hospitality — North Indian dishes, hand-scooped ice creams, and
            thick milkshakes, made the way the neighbourhood has always known them.
          </p>
        </div>
      </div>
    </section>
  );
}
