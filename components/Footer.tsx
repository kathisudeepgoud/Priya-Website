"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#icecreams", label: "Menu" },
  { href: "#story", label: "Experience" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" },
  { href: "tel:+91", label: "Contact" }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
          end: "bottom top",
          toggleActions: "play reverse play reverse"
        }
      });

      tl.fromTo(
        ".footer-head",
        { y: -30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0
      ).fromTo(
        ".footer-body",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
        0.2
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer ref={footerRef} className="theme-bg-main py-24 text-center overflow-hidden">
      <div className="footer-head">
        <div className="font-display text-[clamp(3rem,12vw,8rem)] uppercase leading-[0.85]">PRIYA</div>
        <div className="mt-2 font-label text-xs uppercase tracking-[0.3em] text-champagne">
          Ice Creams &amp; Fast Foods · Since 1985
        </div>
      </div>
      <div className="footer-body">
        <nav className="my-12 flex flex-wrap justify-center gap-8">
          {LINKS.map((l) => (
            <a key={l.label} href={l.href} className="font-label text-xs uppercase tracking-widest text-silver">
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href="#location"
          className="inline-block rounded-full bg-champagne px-7 py-4 font-label text-xs font-bold uppercase tracking-widest text-wine-deep"
        >
          Come Visit Priya
        </a>
        <div className="mt-14 text-xs text-white/35">
          Proddatur, Andhra Pradesh · Menu prices as listed in-store · Google rating shown as last verified
        </div>
      </div>
    </footer>
  );
}
