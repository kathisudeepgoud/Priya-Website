"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const LINKS = [
  { href: "#hero", label: "Home" },
  { href: "#icecreams", label: "Menu" },
  { href: "#special-icecreams", label: "Specials" },
  { href: "#story", label: "1985" },
  { href: "#gallery", label: "Gallery" },
  { href: "#location", label: "Location" }
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-[500] transition-all duration-300 ${
        scrolled
          ? "backdrop-blur-md border-b border-gold/20 shadow-xl py-3.5"
          : "bg-gradient-to-b from-black/30 via-transparent to-transparent py-5"
      }`}
      style={{
        backgroundColor: scrolled ? "var(--header-bg)" : "transparent"
      }}
    >
      <div className="flex items-center justify-between px-[5vw] max-w-[1400px] mx-auto">
        <a href="#hero" className="flex items-center gap-3 group">
          <div className="relative rounded-full border border-gold/50 p-0.5 bg-wine/40 group-hover:border-champagne transition-colors">
            <Image
              src="/priya-logo.png"
              alt="Priya logo"
              width={38}
              height={38}
              className="rounded-full object-cover h-9 w-9"
            />
          </div>
          <b className="font-label text-sm sm:text-base uppercase tracking-widest text-cream group-hover:text-champagne transition-colors">
            Priya
          </b>
        </a>
        <nav className="hidden md:block">
          <ul className="flex gap-8">
            {LINKS.map((l) => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="font-label text-xs uppercase tracking-widest text-silver hover:text-champagne transition-colors"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
