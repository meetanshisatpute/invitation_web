import { Share } from "lucide-react";
import { toast } from "sonner";
import { wedding } from "@/data/wedding";
import { FloralStrip, Monogram } from "./Ornaments";

export function Footer() {
  const share = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try { await navigator.share({ title: `${wedding.groom.name} weds ${wedding.bride.name}`, url }); } catch { /* cancelled */ }
    } else {
      await navigator.clipboard.writeText(url);
      toast.success("Invitation link copied");
    }
  };
  return (
    <footer className="bg-crimson-pattern px-6 pb-28 pt-14 text-center text-cream ">
      <Monogram className="text-6xl" />
      <p className="mt-6 font-script text-4xl text-cream">With love</p>
      <p className="font-script text-4xl text-gold-bright">{wedding.groom.name} &amp; {wedding.bride.name}</p>
      <p className="mt-3 font-display text-sm tracking-widest text-cream/80">{wedding.hashtag}</p>
      {/* <button onClick={share} className="label-caps mt-8 inline-flex items-center gap-2 rounded-full bg-gold-gradient px-6 py-3 text-ink">
        <Share className="h-3.5 w-3.5" /> Share this invitation
      </button> */}
      <FloralStrip flip className="mx-auto mt-10 w-full opacity-90" />
      {/* <p className="label-caps mt-4 text-cream/60">Made with ♥</p> */}
    </footer>
  );
}
