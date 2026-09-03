"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MapPin, Phone, MessageSquare, Heart } from "lucide-react";
import MagneticButton from "@/components/MagneticButton";
import { businessInfo } from "@/lib/menu-data";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const NAV_LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#signature-dishes", label: "Must Try" },
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "1985 Heritage" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" }
];

export default function Footer() {
  const footerRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: "power4.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 85%",
            end: "bottom top",
            toggleActions: isMobile ? "play none none none" : "play reverse play reverse"
          }
        }
      );

      gsap.fromTo(
        ".footer-cta-btn",
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          stagger: 0.1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            end: "bottom top"
          }
        }
      );
    }, footerRef);

    return () => ctx.revert();
  }, []);

  return (
    <footer
      ref={footerRef}
      className="relative theme-bg-main pt-24 pb-16 overflow-hidden max-w-full text-center gpu-layer"
      aria-label="Priya Ice Creams Fastfood North Indian Footer"
    >
      {/* Background ambient lighting */}
      <div className="pointer-events-none absolute -bottom-20 left-1/2 -translate-x-1/2 h-[500px] w-[600px] rounded-full bg-wine/25 blur-[150px]" />

      <div className="mx-auto max-w-[1400px] px-[5vw] relative z-10 space-y-12">
        
        {/* TOP CALLOUT TYPOGRAPHY */}
        <div className="space-y-4">
          <span className="eyebrow tracking-[0.4em] font-bold block">COME TASTE THE CLASSICS.</span>

          <h2
            ref={titleRef}
            className="font-display text-[clamp(2.2rem,7.5vw,6rem)] uppercase leading-[0.9] text-cream drop-shadow-lg tracking-wide"
          >
            PRIYA ICE CREAMS <br className="hidden sm:block" />
            <span className="text-gold">FASTFOOD NORTH INDIAN</span>
          </h2>

          <div className="font-label text-xs sm:text-sm uppercase tracking-[0.35em] text-champagne/90 font-semibold">
            SINCE 1985 · SHIVALAYAM STREET, PRODDATUR
          </div>
        </div>

        {/* THREE DIRECT CTA BUTTONS */}
        <div className="flex flex-wrap items-center justify-center gap-4 sm:gap-6 pt-4">
          <div className="footer-cta-btn">
            <MagneticButton href={businessInfo.googleMapsUrl} target="_blank" variant="primary" cursorLabel="Maps">
              <span className="flex items-center gap-2">
                <MapPin className="h-4 w-4" /> GET DIRECTIONS
              </span>
            </MagneticButton>
          </div>

          <div className="footer-cta-btn">
            <MagneticButton href="tel:+91" variant="outline" cursorLabel="Call">
              <span className="flex items-center gap-2">
                <Phone className="h-4 w-4" /> CALL PRIYA
              </span>
            </MagneticButton>
          </div>

          <div className="footer-cta-btn">
            <MagneticButton href="https://wa.me/" target="_blank" variant="outline" cursorLabel="Chat">
              <span className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-gold" /> WHATSAPP
              </span>
            </MagneticButton>
          </div>
        </div>

        {/* LOGO & NAVIGATION LINKS */}
        <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-6 text-left">
          
          {/* Logo & Info */}
          <div className="flex items-center gap-3">
            <div className="relative h-12 w-12 rounded-full border border-gold/60 p-0.5 bg-wine/40">
              <Image
                src="/priya-logo.png"
                alt="Priya Logo"
                fill
                className="object-cover rounded-full p-0.5"
              />
            </div>
            <div>
              <b className="font-label text-sm uppercase tracking-widest text-cream block">
                Priya Ice Creams Fastfood North Indian
              </b>
              <span className="font-body text-xs text-silver/70">
                Proddatur, Andhra Pradesh · Since 1985
              </span>
            </div>
          </div>

          {/* Quick Nav Links */}
          <nav className="flex flex-wrap items-center gap-6 sm:gap-8">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-label text-xs uppercase tracking-widest text-silver hover:text-champagne transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

        </div>

        {/* FOOTER BOTTOM LEGAL & CREDITS */}
        <div className="pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-silver/60 gap-4">
          <div>
            © 1985–2026 Priya Ice Creams Fastfood North Indian, Proddatur. All rights reserved.
          </div>
          <div className="flex items-center gap-1">
            Made with <Heart className="h-3.5 w-3.5 fill-wine text-wine inline mx-0.5" /> for Proddatur.
          </div>
        </div>

      </div>
    </footer>
  );
}
