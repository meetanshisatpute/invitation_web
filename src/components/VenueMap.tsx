import { Navigation, Share2 } from "lucide-react";
import { toast } from "sonner";
import { mapsDirectionsUrl, mapsEmbedUrl, mapsSearchUrl, wedding } from "@/data/wedding";
import { Reveal } from "./Reveal";

export function VenueMap() {
  const share = async () => {
    const data = { title: wedding.venue.name, text: `${wedding.venue.name}, ${wedding.venue.address}`, url: mapsSearchUrl };
    if (navigator.share) {
      try { await navigator.share(data); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(mapsSearchUrl);
      toast.success("Location link copied");
    }
  };

  return (
    <section className="paper-texture px-6 pb-20 pt-6 text-center">
      <Reveal>
        <p className="label-caps text-muted-foreground">Venue</p>
        <h2 className="mt-2 font-script text-6xl text-rose">Where We Celebrate</h2>
      </Reveal>
      <Reveal delay={0.15} className="mt-10 overflow-hidden relative rounded-2xl border-2 border-gold p-1.5 shadow-paper">
        <iframe
          title="Venue map"
          src={mapsEmbedUrl}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-72 w-full rounded-xl "
        />
      </Reveal>
      <p className="mt-6 font-display text-xl text-ink">{wedding.venue.name}</p>
      <p className="mt-1 font-serif text-base text-muted-foreground">{wedding.venue.address}</p>
      <div className="mt-6 flex justify-center">
        <a href={mapsDirectionsUrl} target="_blank" rel="noreferrer" className="label-caps flex w-full max-w-xs items-center justify-center gap-2 rounded-full bg-crimson py-3 text-cream">
          <Navigation className="h-3.5 w-3.5" /> Directions
        </a>
        {/* <button onClick={share} className="label-caps flex items-center justify-center gap-2 rounded-full border border-crimson py-3 text-crimson">
          <Share2 className="h-3.5 w-3.5" /> Share
        </button> */}
      </div>
    </section>
  );
}

