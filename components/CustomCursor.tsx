"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");
  const [expanded, setExpanded] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const isTouch =
      typeof window !== "undefined" &&
      (window.matchMedia("(pointer: coarse)").matches || "ontouchstart" in window);

    if (isTouch) {
      setIsTouchDevice(true);
      return;
    }

    const move = (e: MouseEvent) => {
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };
    window.addEventListener("mousemove", move);

    const onEnter = (e: Event) => {
      const el = e.target as HTMLElement;
      const target = el.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setExpanded(true);
        setLabel(target.dataset.cursor || "");
      }
    };
    const onLeave = (e: Event) => {
      const el = e.target as HTMLElement;
      const target = el.closest("[data-cursor]") as HTMLElement | null;
      if (target) {
        setExpanded(false);
        setLabel("");
      }
    };
    document.addEventListener("mouseover", onEnter);
    document.addEventListener("mouseout", onLeave);

    return () => {
      window.removeEventListener("mousemove", move);
      document.removeEventListener("mouseover", onEnter);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  if (isTouchDevice) return null;

  return (
    <div
      ref={dotRef}
      className={`cursor-dot pointer-events-none fixed left-0 top-0 z-[9998] flex items-center justify-center rounded-full transition-[width,height,background,border] duration-200 mix-blend-difference ${
        expanded ? "h-16 w-16 border border-champagne bg-transparent" : "h-2.5 w-2.5 bg-champagne"
      }`}
    >
      <span
        className={`font-label text-[0.6rem] uppercase tracking-widest text-champagne transition-opacity ${
          expanded ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
