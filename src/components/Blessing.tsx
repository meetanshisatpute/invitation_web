import { wedding } from "@/data/wedding";
import { GoldDivider } from "./Ornaments";
import { Reveal } from "./Reveal";

export function Blessing() {
  return (
    <section className="paper-texture px-8 pb-16 pt-10 text-center">
      <Reveal blur>
        <h2 className="font-script text-5xl leading-tight text-rose">{wedding.blessing}</h2>
        <GoldDivider className="my-4" />
        <p className="mx-auto max-w-[280px] font-serif text-lg italic text-ink-soft">{wedding.blessingNote}</p>
        <p className="mt-6 font-display text-gold">{wedding.hashtag}</p>
      </Reveal>
    </section>
  );
}
