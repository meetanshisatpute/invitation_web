import { Music2, VolumeX } from "lucide-react";
import { motion } from "framer-motion";

export function MusicToggle({ playing, onToggle }: { playing: boolean; onToggle: () => void }) {
  return (
    <motion.button
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      onClick={onToggle}
      aria-label={playing ? "Mute wedding song" : "Play wedding song"}
      className="label-caps fixed bottom-5 z-40 flex items-center gap-2 rounded-full border border-gold-bright/70 bg-crimson px-4 py-3 text-[0.6rem] text-cream shadow-xl"
      style={{ right: "max(1.25rem, calc(50vw - 240px + 1.25rem))" }}
    >
      {playing ? <Music2 className="h-4 w-4 animate-pulse" /> : <VolumeX className="h-4 w-4" />}
      {/* {"# Wedding Song"} */}
    </motion.button>
  );
}

// Soft synthesized ambient instrumental (no external audio file needed).
// To use a real song, swap this for an <audio> element with your file.
export function createAmbientMusic() {
  const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctx();
  const master = ctx.createGain();
  master.gain.value = 0;
  master.connect(ctx.destination);

  // drone (Sa–Pa)
  [130.81, 196].forEach((f) => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.value = 0.05;
    o.connect(g).connect(master);
    o.start();
  });

  // gentle melody (Raag Yaman-ish notes)
  const notes = [261.63, 293.66, 329.63, 369.99, 392, 440, 493.88, 523.25];
  const pattern = [0, 2, 4, 5, 4, 3, 2, 1, 0, 4, 6, 7, 6, 4, 2, 0];
  let step = 0;
  const id = setInterval(() => {
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "triangle";
    o.frequency.value = notes[pattern[step % pattern.length] ?? 0] ?? 261.63;
    const t = ctx.currentTime;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(0.06, t + 0.08);
    g.gain.exponentialRampToValueAtTime(0.0001, t + 1.6);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + 1.7);
    step++;
  }, 700);

  return {
    play() {
      ctx.resume();
      master.gain.linearRampToValueAtTime(0.7, ctx.currentTime + 1.5);
    },
    pause() {
      master.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.4);
    },
    destroy() {
      clearInterval(id);
      ctx.close();
    },
  };
}

// Plays a real song file (mp3) from the /public folder, looping softly.
export function createSongMusic(src: string) {
  const audio = new Audio(src);
  audio.loop = true;
  audio.volume = 0.7;
  return {
    play() {
      void audio.play().catch(() => {});
    },
    pause() {
      audio.pause();
    },
    destroy() {
      audio.pause();
      audio.src = "";
    },
  };
}

// Uses wedding.song if set, otherwise the built-in synthesized music.
export function createMusic(song?: string) {
  return song ? createSongMusic(song) : createAmbientMusic();
}
