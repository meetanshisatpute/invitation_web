import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Lotus } from "./Ornaments";
import { wedding } from "@/data/wedding";

export function EnvelopeIntro({ onOpen }: { onOpen: () => void }) {
  const [opening, setOpening] = useState(false);
  const [gone, setGone] = useState(false);

  const open = () => {
    if (opening) return;
    setOpening(true);
    onOpen();
    setTimeout(() => setGone(true), 2000);
  };

  return (
    <AnimatePresence>
      {!gone && (
        <motion.div className="fixed inset-0 z-50 flex justify-center" exit={{ opacity: 0, scale: 1.06 }} transition={{ duration: 0.7 }}>
          <div
            className="relative flex h-full w-full max-w-[480px] flex-col items-center justify-center overflow-hidden"
            style={{ background: "linear-gradient(180deg, oklch(0.98 0.02 20), oklch(0.95 0.04 10) 70%, oklch(0.93 0.05 8))" }}
          >
            <Lotus className="absolute left-5 top-6 w-9 opacity-60" />
            <Lotus className="absolute bottom-6 right-5 w-9 opacity-40" />

            {/* envelope */}
            <motion.div
              className="relative aspect-[3/2] w-[78%] max-w-[330px] cursor-pointer"
              style={{ perspective: 900 }}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.9 }}
              onClick={open}
            >
              <div className="absolute inset-0 rounded-md bg-crimson-deep shadow-2xl" />
              {/* inner card peeking out */}
              <motion.div
                className="absolute inset-x-3 top-2 bottom-2 z-10 rounded-sm bg-cream"
                animate={opening ? { y: "-55%" } : { y: 0 }}
                transition={{ delay: 0.7, duration: 0.9, ease: "easeOut" }}
              >
                <p className="mt-6 text-center font-script text-3xl text-rose">
                  {wedding.groom.name} &amp; {wedding.bride.name}
                </p>
              </motion.div>
              {/* front pocket */}
              <svg viewBox="0 0 300 200" preserveAspectRatio="none" className="absolute inset-0 z-20 h-full w-full" aria-hidden>
                <path d="M0 0 L150 110 L0 200Z" fill="oklch(0.46 0.2 22)" />
                <path d="M300 0 L150 110 L300 200Z" fill="oklch(0.44 0.2 22)" />
                <path d="M0 200 L150 90 L300 200Z" fill="oklch(0.52 0.22 24)" />
              </svg>
              {/* flap */}
              <motion.svg
                viewBox="0 0 300 120"
                preserveAspectRatio="none"
                className="absolute inset-x-0 top-0 z-30 h-[60%] w-full origin-top drop-shadow-md"
                animate={opening ? { rotateX: 180, transitionEnd: { zIndex: 5 } } : { rotateX: 0 }}
                transition={{ delay: 0.15, duration: 0.7, ease: "easeInOut" }}
                aria-hidden
              >
                <path d="M0 0 H300 L150 118Z" fill="oklch(0.55 0.22 24)" />
              </motion.svg>
              {/* gold seal */}
              <motion.button
                aria-label="Open invitation"
                className="absolute left-1/2 top-[48%] z-40 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full"
                style={{ background: "var(--gradient-seal)", boxShadow: "var(--shadow-seal)" }}
                animate={opening ? { scale: [1, 1.2, 0], opacity: 0 } : { scale: 1 }}
                transition={{ duration: 0.5 }}
              >
                <span className="absolute -inset-3 rounded-full border-2 border-gold-bright" style={{ animation: "glow-ring 1.8s ease-out infinite" }} />
                <span className="absolute inset-1.5 rounded-full border border-ink/25" />
                <span className="font-script text-xl text-ink/70">S&amp;M</span>
              </motion.button>
            </motion.div>

            <motion.div className="mt-12 text-center" animate={opening ? { opacity: 0 } : { opacity: 1 }}>
              <h1 className="font-script text-5xl text-rose">You&rsquo;re Invited</h1>
              <p className="mt-3 font-serif text-base italic text-ink/60">Tap the envelope to open your invitation</p>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
