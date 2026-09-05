"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MagneticButton from "@/components/MagneticButton";
import { businessInfo } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function Location() {
  const textRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (textRef.current) {
        gsap.fromTo(
          textRef.current,
          { x: -40, opacity: 0 },
          {
            x: 0,
            opacity: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "restart pause resume reverse"
            }
          }
        );
      }

      if (mapRef.current) {
        gsap.fromTo(
          mapRef.current,
          { x: 40, opacity: 0, scale: 0.95 },
          {
            x: 0,
            opacity: 1,
            scale: 1,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: sectionRef.current,
              start: "top 85%",
              end: "bottom 15%",
              toggleActions: "restart pause resume reverse"
            }
          }
        );
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="location" ref={sectionRef} className="theme-bg-alt py-32 overflow-hidden max-w-full">
      <div className="mx-auto grid max-w-[1280px] grid-cols-1 items-center gap-12 px-[6vw] md:grid-cols-2">
        <div ref={textRef}>
          <span className="eyebrow mb-3 block">Find Priya</span>
          <h3 className="mb-1 font-label text-2xl uppercase tracking-wide">{businessInfo.name}</h3>
          <p className="leading-relaxed text-silver">{businessInfo.address}</p>
          <div className="mt-7 flex flex-wrap gap-4">
            <MagneticButton href={businessInfo.googleMapsUrl} target="_blank" cursorLabel="Maps">
              Get Directions
            </MagneticButton>
            <MagneticButton href="tel:+91" variant="outline" cursorLabel="Call">
              Call Now
            </MagneticButton>
          </div>
        </div>
        <div ref={mapRef} className="h-[340px] overflow-hidden rounded-[24px] border border-gold/[0.18]">
          <iframe
            src="https://maps.google.com/maps?q=Priya%20Ice%20Creams%20%26%20Fast%20Foods%2C%20Proddatur&t=&z=15&ie=UTF8&iwloc=&output=embed"
            loading="lazy"
            className="h-full w-full border-0 grayscale-[.3] contrast-[1.1]"
          />
        </div>
      </div>
    </section>
  );
}
