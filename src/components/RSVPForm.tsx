import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Heart, MessageCircle } from "lucide-react";
import { wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  guests: z.coerce.number().int().min(1, "At least 1").max(10, "Max 10"),
  attending: z.enum(["yes", "no"], { required_error: "Please choose" }),
  events: z.array(z.string()).default([]),
  message: z.string().max(400).optional(),
});
export type RSVPData = z.infer<typeof schema>;

// Replace this with a Lovable Cloud insert later.
async function submitRSVP(data: RSVPData) {
  console.info("RSVP", data);
}

const field = "w-full rounded-lg border border-border bg-paper px-4 py-3 font-serif text-lg outline-none focus:border-gold focus:ring-2 focus:ring-gold/20";

export function RSVPForm() {
  const [done, setDone] = useState<string | null>(null);
  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<RSVPData>({
    resolver: zodResolver(schema) as never,
    defaultValues: { guests: 1, events: [] },
  });
  const attending = watch("attending");

  const onSubmit = async (d: RSVPData) => {
    await submitRSVP(d);
    setDone(d.name.split(" ")[0] ?? d.name);
  };

  const waText = encodeURIComponent(`Hi! I'd love to RSVP for ${wedding.groom.name} & ${wedding.bride.name}'s wedding on 3rd December 2026. ${wedding.hashtag}`);

  return (
    <section className="paper-texture px-6 py-20 text-center">
      <Reveal>
        <p className="label-caps text-muted-foreground">Kindly respond</p>
        <h2 className="mt-3 font-script text-6xl text-rose">RSVP</h2>
      </Reveal>

      <div className="relative mt-10 rounded-2xl bg-paper/70 p-5 text-left shadow-paper">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div key="thanks" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="relative overflow-hidden py-14 text-center">
              {Array.from({ length: 12 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute bottom-0 text-blush"
                  style={{ left: `${(i * 8 + 4) % 100}%` }}
                  initial={{ y: 0, opacity: 1 }}
                  animate={{ y: -260, opacity: 0, rotate: i * 30 }}
                  transition={{ duration: 2.4, delay: i * 0.12, repeat: Infinity }}
                >
                  <Heart className="h-4 w-4 fill-current" />
                </motion.span>
              ))}
              <p className="font-script text-5xl text-rose">Thank you, {done}!</p>
              <p className="mt-3 font-serif text-lg text-muted-foreground">Your response means the world to us.</p>
            </motion.div>
          ) : (
            <motion.form key="form" onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4" exit={{ opacity: 0 }}>
              <label className="flex flex-col gap-1.5">
                <span className="label-caps text-muted-foreground">Your name</span>
                <input {...register("name")} className={field} placeholder="Full name" />
                {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
              </label>
              <label className="flex flex-col gap-1.5">
                <span className="label-caps text-muted-foreground">Number of guests</span>
                <input type="number" min={1} max={10} {...register("guests")} className={field} />
                {errors.guests && <span className="text-xs text-destructive">{errors.guests.message}</span>}
              </label>
              <div>
                <span className="label-caps text-muted-foreground">Attending?</span>
                <div className="mt-1.5 grid grid-cols-2 gap-2">
                  {[["yes", "Joyfully yes"], ["no", "Regretfully no"]].map(([v, l]) => (
                    <label key={v} className={`cursor-pointer rounded-lg border py-3 text-center font-serif text-lg transition ${attending === v ? "border-gold bg-gold/10" : "border-border"}`}>
                      <input type="radio" value={v} {...register("attending")} className="sr-only" />
                      {l}
                    </label>
                  ))}
                </div>
                {errors.attending && <span className="text-xs text-destructive">{errors.attending.message}</span>}
              </div>
              {attending !== "no" && (
                <div>
                  <span className="label-caps text-muted-foreground">Events</span>
                  <div className="mt-1.5 flex flex-wrap gap-2">
                    {wedding.events.map((e) => (
                      <label key={e.id} className="flex cursor-pointer items-center gap-2 rounded-full border border-border px-3 py-2 font-serif has-[:checked]:border-gold has-[:checked]:bg-gold/10">
                        <input type="checkbox" value={e.id} {...register("events")} className="accent-gold" />
                        {e.title}
                      </label>
                    ))}
                  </div>
                </div>
              )}
              <label className="flex flex-col gap-1.5">
                <span className="label-caps text-muted-foreground">Message (optional)</span>
                <textarea rows={3} {...register("message")} className={field} placeholder="Your wishes for the couple" />
              </label>
              <button disabled={isSubmitting} className="label-caps mt-2 rounded-full bg-crimson py-4 text-cream transition hover:bg-crimson-deep disabled:opacity-60">
                Send RSVP
              </button>
            </motion.form>
          )}
        </AnimatePresence>
      </div>

      <a
        href={`https://wa.me/${wedding.whatsapp}?text=${waText}`}
        target="_blank"
        rel="noreferrer"
        className="label-caps mt-5 inline-flex items-center gap-2 rounded-full border border-crimson px-6 py-3 text-crimson"
      >
        <MessageCircle className="h-4 w-4" /> WhatsApp RSVP
      </a>
    </section>
  );
}
