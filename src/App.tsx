import { useEffect, useRef, useState } from "react";
import { EnvelopeIntro } from "@/components/EnvelopeIntro";
import { InvitationCard } from "@/components/InvitationCard";
import { ScratchCard } from "@/components/ScratchCard";
import { Countdown } from "@/components/Countdown";
import { Events } from "@/components/EventCard";
import { Gallery } from "@/components/Gallery";
import { VenueMap } from "@/components/VenueMap";
import { Footer } from "@/components/Footer";
import { Blessing } from "@/components/Blessing";
import { Petals } from "@/components/Ornaments";
import { MusicToggle, createMusic } from "@/components/MusicToggle";
import { wedding } from "@/data/wedding";
import { Toaster } from "@/components/ui/sonner";
import couple from "@/assets/couple.jpg";

export default function App() {
  const [opened, setOpened] = useState(false);
  const [playing, setPlaying] = useState(false);
  const music = useRef<ReturnType<typeof createMusic> | null>(null);

  useEffect(() => {
    document.body.style.overflow = opened ? "" : "hidden";
    return () => {
      document.body.style.overflow = "";
    };
  }, [opened]);

  useEffect(() => () => music.current?.destroy(), []);

  const handleOpen = () => {
    try {
      music.current = createMusic(wedding.song);
      music.current.play();
      setPlaying(true);
    } catch {
      /* audio unsupported */
    }
    setTimeout(() => setOpened(true), 1200);
  };

  const toggle = () => {
    if (!music.current) return;
    if (playing) music.current.pause();
    else music.current.play();
    setPlaying(!playing);
  };

  return (
    <div className="relative min-h-screen">
      {/* blurred desktop backdrop */}
      <div className="fixed inset-0 -z-10 hidden md:block">
        <img src={couple} alt="" className="h-full w-full scale-110 object-cover opacity-50 blur-2xl sepia saturate-150" />
      </div>
      <main className="mx-auto max-w-[480px] overflow-hidden bg-cream shadow-2xl">
        <InvitationCard />
        <ScratchCard />
        <Countdown />
        <Events />
        <Gallery />
        <Blessing />
        <VenueMap />
        <Footer />
      </main>
      {opened && <Petals />}
      <EnvelopeIntro onOpen={handleOpen} />
      {opened && <MusicToggle playing={playing} onToggle={toggle} />}
      <Toaster />
    </div>
  );
}
