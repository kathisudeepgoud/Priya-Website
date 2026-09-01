"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Menu, X } from "lucide-react";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#signature-dishes", label: "Must Try" },
  { href: "#menu", label: "Menu" },
  { href: "#story", label: "1985 Heritage" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMobileMenuOpen(false);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[500] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-gold/20 shadow-xl py-3.5"
          : "bg-gradient-to-b from-black/60 via-black/20 to-transparent py-3.5 sm:py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--header-bg)" : "transparent"
      }}
    >
      <div className="relative flex items-center justify-between px-[5vw] max-w-[1400px] mx-auto">
        <a href="#hero" onClick={closeMenu} className="flex items-center gap-3 group">
          <div className="relative rounded-full border border-gold/50 p-0.5 bg-wine/40 group-hover:border-champagne transition-colors">
            <Image
              src="/priya-logo.png"
              alt="Priya logo"
              width={38}
              height={38}
              className="rounded-full object-cover h-8 w-8 sm:h-9 sm:w-9"
            />
          </div>
          <b className="font-label text-sm sm:text-base uppercase tracking-widest text-cream group-hover:text-champagne transition-colors">
            Priya
          </b>
        </a>

        {/* DESKTOP NAV LINKS */}
        <nav className="hidden md:block">
          <ul className="flex items-center gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-label text-xs uppercase tracking-widest text-silver hover:text-champagne transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-champagne after:transition-all hover:after:w-full"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* MOBILE MENU TOGGLE BUTTON */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="flex md:hidden items-center justify-center p-2 rounded-full border border-gold/40 bg-wine/60 text-champagne backdrop-blur-md transition-all hover:border-champagne hover:bg-wine active:scale-95 shadow-md"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        {/* SIMPLE COMPACT MOBILE DROPDOWN MENU */}
        {mobileMenuOpen && (
          <div className="absolute top-full right-[5vw] mt-2 w-52 rounded-2xl border border-gold/30 bg-[#140D10]/95 p-2 backdrop-blur-xl shadow-[0_15px_35px_rgba(0,0,0,0.6)] animate-in fade-in slide-in-from-top-2 duration-200 md:hidden z-[501]">
            <nav className="flex flex-col gap-0.5">
              {LINKS.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="flex items-center justify-between rounded-xl px-3.5 py-2.5 font-label text-xs uppercase tracking-wider text-cream transition-all hover:bg-wine/40 hover:text-champagne active:bg-wine/60"
                >
                  <span>{l.label}</span>
                  <span className="h-1.5 w-1.5 rounded-full bg-gold/50" />
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}


