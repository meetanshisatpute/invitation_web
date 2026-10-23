import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Hand } from "lucide-react";
import confetti from "canvas-confetti";
import { wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function ScratchCard() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [revealed, setRevealed] = useState(false);
  const [touched, setTouched] = useState(false);
  const drawing = useRef(false);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c) return;
    const dpr = window.devicePixelRatio || 1;
    const { width, height } = c.getBoundingClientRect();
    c.width = width * dpr;
    c.height = height * dpr;
    const ctx = c.getContext("2d")!;
    ctx.scale(dpr, dpr);
    const g = ctx.createLinearGradient(0, 0, width, height);
    g.addColorStop(0, "#B8892F");
    g.addColorStop(0.35, "#F6DC83");
    g.addColorStop(0.6, "#D9AE46");
    g.addColorStop(1, "#A97C28");
    ctx.fillStyle = g;
    ctx.fillRect(0, 0, width, height);
    ctx.strokeStyle = "rgba(120,80,10,0.5)";
    ctx.strokeRect(6, 6, width - 12, height - 12);
    ctx.fillStyle = "#5a3a05";
    ctx.textAlign = "center";
    ctx.font = "600 13px Inter, sans-serif";
    ctx.letterSpacing = "3px";
    ctx.fillText("✦ SCRATCH TO REVEAL ✦", width / 2, height / 2 - 2);
    ctx.font = "italic 13px 'Cormorant Garamond', serif";
    ctx.letterSpacing = "0px";
    ctx.fillText("Tap or swipe to unveil the date", width / 2, height / 2 + 20);
  }, []);

  const scratch = (x: number, y: number) => {
    const c = canvasRef.current;
    if (!c || revealed) return;
    const r = c.getBoundingClientRect();
    const ctx = c.getContext("2d")!;
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(x - r.left, y - r.top, 26, 0, Math.PI * 2);
    ctx.fill();
  };

  const check = () => {
    const c = canvasRef.current;
    if (!c || revealed) return;
    const data = c.getContext("2d")!.getImageData(0, 0, c.width, c.height).data;
    let clear = 0;
    for (let i = 3; i < data.length; i += 64) if (data[i] === 0) clear++;
    if (clear / (data.length / 64) > 0.45) {
      setRevealed(true);
      if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches)
        confetti({ particleCount: 110, spread: 80, origin: { y: 0.6 }, colors: ["#C2185B", "#E8728C", "#D4AF37", "#F7EFE2"], shapes: ["circle"] });
    }
  };

  const d = wedding.dateLabel;
  return (
    <section className="paper-texture px-7 pb-6 pt-12 text-center">
      <Reveal delay={0.1} className="relative mx-auto h-44 w-full max-w-[340px]">
        <div className="absolute inset-0 flex flex-col items-center justify-center rounded-xl border border-gold/70 bg-paper shadow-paper">
          <span className="absolute inset-1.5 rounded-lg border border-gold/30" />
          <p className="label-caps text-muted-foreground">Save the date</p>
          <p className="mt-2 font-display text-3xl tracking-[0.12em] text-crimson">{d.day.replace(/^0/, "")}rd {d.month.toUpperCase()}</p>
          <p className="font-display text-3xl tracking-[0.12em] text-crimson">{d.year}</p>
          <p className="mt-2 font-script text-2xl text-gold">{d.weekday}</p>
        </div>
        <motion.canvas
          ref={canvasRef}
          className="absolute inset-0 h-full w-full touch-none rounded-xl shadow-lg"
          animate={revealed ? { opacity: 0, scale: 1.05 } : { opacity: 1 }}
          transition={{ duration: 0.6 }}
          style={{ pointerEvents: revealed ? "none" : "auto" }}
          onPointerDown={(e) => {
            drawing.current = true;
            setTouched(true);
            e.currentTarget.setPointerCapture(e.pointerId);
            scratch(e.clientX, e.clientY);
          }}
          onPointerMove={(e) => drawing.current && scratch(e.clientX, e.clientY)}
          onPointerUp={() => {
            drawing.current = false;
            check();
          }}
        />
        {!touched && (
          <motion.div className="pointer-events-none absolute bottom-3 left-1/2 text-ink/70" animate={{ x: [-40, 40, -40] }} transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}>
            <Hand className="h-7 w-7" />
          </motion.div>
        )}
      </Reveal>
    </section>
  );
}
