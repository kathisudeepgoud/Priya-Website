"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Storefront() {
  const imgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { xPercent: 30, opacity: 0, rotate: -4 },
        {
          xPercent: 0,
          opacity: 1,
          rotate: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: imgRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
          }
        }
      );
      gsap.fromTo(
        textRef.current,
        { xPercent: -20, opacity: 0 },
        {
          xPercent: 0,
          opacity: 1,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: textRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
          }
        }
      );
    });
    return () => ctx.revert();
  }, []);

  return (
    <section id="storefront" className="theme-bg-alt py-32 overflow-hidden max-w-full">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-[6vw] md:grid-cols-2">
        <div ref={imgRef} className="relative overflow-hidden rounded-[28px] shadow-[0_40px_80px_rgba(0,0,0,0.5)]">
          <Image
            src="/priya-storefront.jpg"
            alt="Priya Ice Creams storefront, Proddatur"
            width={900}
            height={700}
            className="w-full"
          />
          <div className="absolute bottom-5 left-5 rounded-full bg-champagne px-4 py-2 font-label text-[0.65rem] font-bold uppercase tracking-[0.25em] text-wine-deep">
            Since 1985
          </div>
        </div>
        <div ref={textRef}>
          <span className="eyebrow mb-3 block">This Is Priya.</span>
          <h2 className="font-display text-[clamp(2.5rem,6vw,4.5rem)] uppercase leading-[0.92]">
            The Signboard
            <br />
            You Know.
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-silver">
            Shivalayam Street, Proddatur — the same corner, the same name in lights, serving the
            neighbourhood ice creams and North Indian fast food since 1985.
          </p>
        </div>
      </div>
    </section>
  );
}
