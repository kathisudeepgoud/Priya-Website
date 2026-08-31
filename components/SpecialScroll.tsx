"use client";

import { specialIceCreams } from "@/lib/menu-data";
import MenuGrid from "@/components/MenuGrid";

export default function SpecialScroll() {
  return (
    <section id="special-icecreams" className="theme-bg-accent py-24 sm:py-32">
      <div className="mx-auto max-w-[1280px] px-[6vw]">
        <div className="mb-12">
          <span className="eyebrow mb-3 block">Priya Signatures</span>
          <h2 className="font-display text-[clamp(2.4rem,6vw,5rem)] uppercase leading-[0.95]">
            Special Ice Creams
          </h2>
        </div>
        <MenuGrid items={specialIceCreams} />
      </div>
    </section>
  );
}
