"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export default function Loader() {
  const [done, setDone] = useState(false);
  const barRef = useRef<HTMLSpanElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
        document.body.style.overflowY = "auto";
        setDone(true);
      }
    });
    tl.to(barRef.current, { width: "100%", duration: 1.1, ease: "power2.inOut" }).to(
      rootRef.current,
      { yPercent: -100, duration: 0.8, ease: "power4.inOut" },
      "+=0.15"
    );

    return () => {
      document.body.style.overflow = "";
      document.body.style.overflowY = "auto";
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={rootRef}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center gap-3 bg-wine-deep pointer-events-none"
    >
      <p className="font-label text-xs uppercase tracking-[0.35em] text-champagne">
        Priya · Ice Creams &amp; Fast Foods
      </p>
      <h1 className="font-display text-6xl leading-none text-cream sm:text-8xl">PRIYA</h1>
      <p className="font-label text-xs uppercase tracking-[0.35em] text-champagne">Since 1985</p>
      <div className="relative mt-6 h-[3px] w-56 overflow-hidden rounded-full bg-white/15">
        <span ref={barRef} className="absolute left-0 top-0 h-full w-0 rounded-full bg-champagne" />
      </div>
    </div>
  );
}
