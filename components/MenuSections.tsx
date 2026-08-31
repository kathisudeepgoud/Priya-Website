"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MenuGrid from "@/components/MenuGrid";
import {
  iceCreams,
  manchurian,
  riceItems,
  milkshakes,
  milkAndLassi,
  iceCreamParcel,
  basanthiParcel
} from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

function SectionHead({ eyebrow, title }: { eyebrow: string; title: string }) {
  const headRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (!headRef.current) return;
      gsap.fromTo(
        headRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headRef.current,
            start: "top 85%",
            end: "bottom 15%",
            toggleActions: "play reverse play reverse"
          }
        }
      );
    }, headRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={headRef} className="mb-14">
      <span className="eyebrow mb-3 block">{eyebrow}</span>
      <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.95]">{title}</h2>
    </div>
  );
}

function SubHead({ children, first = false }: { children: React.ReactNode; first?: boolean }) {
  return (
    <div
      className={`font-label text-sm uppercase tracking-[0.25em] text-gold ${
        first ? "mb-4 mt-0" : "mb-4 mt-12 border-t border-white/10 pt-8"
      }`}
    >
      {children}
    </div>
  );
}

export function IceCreamsSection() {
  return (
    <section id="icecreams" className="theme-bg-main py-32 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <SectionHead eyebrow="The Classics" title="Ice Creams" />
        <SubHead first>Ice Creams</SubHead>
        <MenuGrid items={iceCreams} />
      </div>
    </section>
  );
}

export function FastFoodSection() {
  return (
    <section id="fastfood" className="theme-bg-alt py-32 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <SectionHead eyebrow="North Indian Dishes" title="Fast Food" />
        <SubHead first>Manchurian</SubHead>
        <MenuGrid items={manchurian} />
        <SubHead>Rice &amp; Noodles</SubHead>
        <MenuGrid items={riceItems} />
      </div>
    </section>
  );
}

export function MilkshakesSection() {
  return (
    <section id="milkshakes" className="theme-bg-main py-32 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <SectionHead eyebrow="Thick & Cold" title="Milkshakes" />
        <SubHead first>Milkshakes</SubHead>
        <MenuGrid items={milkshakes} />
        <SubHead>Milk &amp; Lassi</SubHead>
        <MenuGrid items={milkAndLassi} />
      </div>
    </section>
  );
}

export function ParcelSection() {
  return (
    <section id="parcel" className="theme-bg-alt py-32 overflow-hidden max-w-full">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <SectionHead eyebrow="Take It Home" title="Ice Cream Parcels" />
        <SubHead first>Ice Cream Parcel</SubHead>
        <MenuGrid items={iceCreamParcel} />
        <SubHead>Basanthi Parcel</SubHead>
        <MenuGrid items={basanthiParcel} />
      </div>
    </section>
  );
}
