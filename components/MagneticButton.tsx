"use client";

import { motion, useMotionValue, useSpring } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { MouseEvent, ReactNode } from "react";

export default function MagneticButton({
  href,
  children,
  variant = "primary",
  cursorLabel = "",
  target,
  className
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "outline";
  cursorLabel?: string;
  target?: string;
  className?: string;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 200, damping: 15, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 200, damping: 15, mass: 0.4 });

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - rect.left - rect.width / 2) * 0.3);
    y.set((e.clientY - rect.top - rect.height / 2) * 0.45);
  };
  const handleLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      href={href}
      target={target}
      rel={target ? "noopener" : undefined}
      data-cursor={cursorLabel}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      style={{ x: springX, y: springY }}
      whileTap={{ scale: 0.94 }}
      className={cn(
        "inline-flex items-center gap-2 rounded-full px-5 py-2.5 font-label text-xs uppercase tracking-widest transition-colors",
        variant === "primary" && "bg-champagne text-wine-deep font-bold hover:bg-gold",
        variant === "outline" && "border border-cream/40 text-cream hover:border-cream",
        className
      )}
    >
      {children}
      <ArrowUpRight className="h-3.5 w-3.5" />
    </motion.a>
  );
}
