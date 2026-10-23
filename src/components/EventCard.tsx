import { motion } from "framer-motion";
import { CalendarPlus, MapPin } from "lucide-react";
import { mapsSearchUrl, wedding, type WeddingEvent } from "@/data/wedding";
import { generateICS, googleCalendarUrl } from "@/utils/generateICS";
import { Garland } from "./Ornaments";
import { Reveal } from "./Reveal";

const tint = {
  ring: "from-ink/50 via-ink/40 to-ink/90",
  haldi: "from-amber-600/40 via-amber-900/40 to-ink/90",
  reception: "from-fuchsia-950/50 via-ink/50 to-ink/90",
};

function Info({ label, value }: { label: string; value: string }) {
  return (
    <div className="text-center">
      <p className="label-caps text-gold-bright">{label}</p>
      <p className="mt-1 font-serif text-lg text-cream">{value}</p>
    </div>
  );
}

export function EventCard({ ev }: { ev: WeddingEvent }) {
  const d = wedding.dateLabel;
  return (
    <motion.article
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.2, 0.8, 0.2, 1] }}
      className="relative overflow-hidden rounded-2xl border border-gold/80 p-1.5"
    >
      <div className="relative overflow-hidden rounded-xl bg-ink">
        <img
          src={wedding.images.events[ev.theme]}
          alt=""
          loading="lazy"
          className={`absolute inset-0 h-full w-full object-cover sepia-[0.6] saturate-200 ${ev.theme === "haldi" ? "hue-rotate-[-8deg] brightness-110" : ""}`}
        />
        <div className={`absolute inset-0 bg-gradient-to-b ${tint[ev.theme]}`} />
        <Garland kind={ev.theme} />
        <div className="relative z-10 flex min-h-[540px] flex-col items-center justify-end px-6 pb-8 pt-40 text-center">
          <h3 className="font-script text-6xl leading-none text-cream text-shadow-soft">{ev.title}</h3>
          <p className="mt-3 max-w-[250px] font-serif text-base italic text-cream/90 text-shadow-soft">{ev.tagline}</p>
          <span className="my-5 h-px w-20 bg-gold/70" />
          <div className="grid w-full gap-4">
            <Info label="Date" value={`${d.weekday}, ${d.day} ${d.month} ${d.year}`} />
            <Info label="Time" value={ev.time} />
            <Info label="Venue" value={`${wedding.venue.name}, ${wedding.venue.address}`} />
          </div>
          <div className="mt-6 grid w-full grid-cols-2 gap-2.5">
            <a href={mapsSearchUrl} target="_blank" rel="noreferrer" className="label-caps flex items-center justify-center gap-1.5 rounded-full border border-gold bg-ink/50 py-3 text-[0.6rem] text-cream backdrop-blur">
              <MapPin className="h-3.5 w-3.5" /> Open Map
            </a>
            <button onClick={() => generateICS(ev)} className="label-caps flex items-center justify-center gap-1.5 rounded-full bg-gold-gradient py-3 text-[0.6rem] text-ink">
              <CalendarPlus className="h-3.5 w-3.5" /> Add to Calendar
            </button>
          </div>
          <a href={googleCalendarUrl(ev)} target="_blank" rel="noreferrer" className="mt-3 font-serif text-sm italic text-cream/80 underline underline-offset-4">
            or add to Google Calendar
          </a>
        </div>
      </div>
    </motion.article>
  );
}

export function Events() {
  return (
    <section className="bg-crimson-pattern px-5 pb-20 pt-16 text-center">
      <Reveal>
        <p className="label-caps text-cream/80">Celebrations of love</p>
        <h2 className="mt-2 font-script text-6xl text-cream text-shadow-soft">Events Schedule</h2>
      </Reveal>
      <div className="mt-10 flex flex-col gap-8">
        {wedding.events.map((ev) => (
          <EventCard key={ev.id} ev={ev} />
        ))}
      </div>
    </section>
  );
}
