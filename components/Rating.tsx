"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "motion/react";
import { businessInfo } from "@/lib/menu-data";
import MagneticButton from "@/components/MagneticButton";

export default function Rating() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.4 });
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) {
      setScore(0);
      setCount(0);
      return;
    }
    const scoreAnim = animate(0, businessInfo.googleRating, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setScore(v)
    });
    const countAnim = animate(0, businessInfo.googleReviewCount, {
      duration: 1.8,
      ease: "easeOut",
      onUpdate: (v) => setCount(Math.round(v))
    });
    return () => {
      scoreAnim.stop();
      countAnim.stop();
    };
  }, [isInView]);

  return (
    <section
      id="rating"
      ref={ref}
      className="py-32 text-center theme-bg-main overflow-hidden"
    >
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <div className="mb-4 text-4xl tracking-[0.3rem] text-champagne">★★★★★</div>
        <div className="font-display text-[clamp(4rem,14vw,8rem)] leading-none">{score.toFixed(1)}</div>
        <div className="mt-2 font-label text-sm uppercase tracking-[0.2em] text-silver">
          {count} Google Reviews
        </div>
        <div className="mt-3 inline-block rounded-full border border-champagne/40 px-4 py-1.5 font-label text-[0.65rem] uppercase tracking-[0.25em] text-champagne">
          Google Reviews · Verified Listing
        </div>
        <div className="mt-9">
          <MagneticButton href={businessInfo.googleMapsUrl} target="_blank" cursorLabel="Maps">
            View on Google Maps
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
