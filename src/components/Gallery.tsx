import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { X } from "lucide-react";
import { wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function Gallery() {
  const [open, setOpen] = useState<string | null>(null);
  const [active, setActive] = useState(0);
  const imgs = wedding.images.gallery;

  return (
    <section className="paper-texture pb-14 pt-16 text-center">
      <Reveal>
        <p className="label-caps text-muted-foreground">A glimpse of our journey</p>
        <h2 className="mt-2 font-script text-6xl text-rose">Our Gallery</h2>
      </Reveal>

      <div
        className="mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-[11%] pb-4 [scrollbar-width:none]"
        onScroll={(e) => {
          const el = e.currentTarget;
          setActive(Math.round(el.scrollLeft / (el.scrollWidth / imgs.length)));
        }}
      >
        {imgs.map((src, i) => (
          <button key={i} onClick={() => setOpen(src)} className="w-[78%] shrink-0 snap-center rounded-2xl border-2 border-gold/70 bg-paper p-2 text-left shadow-paper">
            <img src={src} alt={wedding.galleryCaptions[i]} loading="lazy" className="aspect-[4/5] w-full rounded-xl object-cover sepia-[0.45] saturate-150" />
            <p className="px-1 pb-1 pt-3 text-center font-serif text-base italic text-ink-soft">{wedding.galleryCaptions[i]}</p>
          </button>
        ))}
      </div>
      <div className="mt-1 flex justify-center gap-1.5">
        {imgs.map((_, i) => (
          <span key={i} className={`h-1.5 rounded-full transition-all ${i === active ? "w-5 bg-crimson" : "w-1.5 bg-crimson/25"}`} />
        ))}
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="fixed inset-0 z-[60] flex items-center justify-center bg-ink/90 p-6" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setOpen(null)}>
            <button aria-label="Close" className="absolute right-5 top-5 text-cream">
              <X />
            </button>
            <motion.img src={open} alt="" initial={{ scale: 0.9 }} animate={{ scale: 1 }} className="max-h-[85vh] max-w-full rounded-xl sepia-[0.45]" />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
