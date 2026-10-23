import { wedding } from "@/data/wedding";
import { FloralStrip, GoldDivider, Lotus } from "./Ornaments";
import { Reveal } from "./Reveal";

export function InvitationCard() {
  return (
    <section className="paper-texture relative overflow-hidden text-center">
      <FloralStrip className="absolute inset-x-0 top-0 w-full opacity-90" />
      <div className="px-7 pb-10 pt-24">
        <Reveal blur>
          <Lotus className="mx-auto w-16" />
          <p className="mt-3 text-sm text-crimson" style={{ fontFamily: "var(--font-deva)" }}>
            ॥ श्री गणेशाय नमः ॥
          </p>
        </Reveal>
        <Reveal blur delay={0.1}>
          <p className="mx-auto mt-6 max-w-[300px] font-serif text-lg leading-snug text-ink-soft">
            We solicit your gracious presence on the auspicious occasion of the wedding celebration of
          </p>
        </Reveal>

        <Reveal blur delay={0.1}>
          <h2 className="mt-8 font-script text-7xl leading-none text-rose">{wedding.groom.name}</h2>
          <p className="mt-3 font-serif text-sm uppercase tracking-widest text-muted-foreground">S/o</p>
          <p className="font-serif text-base text-ink-soft">{wedding.groom.parents}</p>
        </Reveal>
        <Reveal blur>
          <p className="my-4 font-script text-4xl text-gold">with</p>
        </Reveal>
        <Reveal blur delay={0.1}>
          <h2 className="font-script text-7xl leading-none text-rose">{wedding.bride.name}</h2>
          <p className="mt-3 font-serif text-sm uppercase tracking-widest text-muted-foreground">D/o</p>
          <p className="font-serif text-base text-ink-soft">{wedding.bride.parents}</p>
        </Reveal>
        <GoldDivider className="mt-8" />
      </div>

      {/* framed couple portrait with floral base */}
      <Reveal className="relative mx-6 mb-0">
        <div className="overflow-hidden rounded-t-[999px] border-2 border-gold/70 p-1.5">
          <img src={wedding.images.invitationTop} alt={`${wedding.groom.name} and ${wedding.bride.name}`} loading="lazy" width={768} height={1024} className="aspect-[4/5] w-full rounded-t-[999px] object-cover object-top sepia-[0.45] saturate-150" />
        </div>
      </Reveal>
      <FloralStrip flip className="-mt-10 w-full" />
    </section>
  );
}
