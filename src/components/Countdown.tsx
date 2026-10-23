import { AnimatePresence, motion } from "framer-motion";
import { useCountdown } from "@/hooks/useCountdown";
import { wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

function Unit({ value, label }: { value: number; label: string }) {
  const v = String(value).padStart(2, "0");
  return (
    <div className="flex flex-col items-center rounded-lg border border-gold/60 bg-paper py-3 shadow-paper">
      <div className="relative h-9 w-full overflow-hidden text-center">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={v}
            className="absolute inset-0 font-display text-3xl leading-9 text-ink"
            initial={{ y: -26, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 26, opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            {v}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="label-caps mt-1.5 text-[0.5rem] text-muted-foreground">{label}</span>
    </div>
  );
}

export function Countdown() {
  const c = useCountdown(wedding.countdownTarget);
  return (
    <section className="paper-texture px-7 pb-16 pt-4 text-center">
      <Reveal>
        <p className="label-caps text-muted-foreground">Counting every moment</p>
        <h2 className="mt-2 font-script text-5xl text-rose">The Countdown Begins</h2>
      </Reveal>
      {c.done ? (
        <Reveal className="mt-8 font-script text-5xl text-crimson">Today is the day! 🎉</Reveal>
      ) : (
        <Reveal delay={0.15} className="mx-auto mt-7 grid max-w-[340px] grid-cols-4 gap-2.5">
          <Unit value={c.days} label="Days" />
          <Unit value={c.hours} label="Hours" />
          <Unit value={c.minutes} label="Minutes" />
          <Unit value={c.seconds} label="Seconds" />
        </Reveal>
      )}
    </section>
  );
}
