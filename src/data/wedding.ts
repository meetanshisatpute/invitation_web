import hands from "@/assets/hands.jpg";
import couple from "@/assets/couple.jpg";
import rings from "@/assets/rings.jpg";
import prewed from "@/assets/prewed.jpg";
import haldi from '@/assets/haldi.jpg';
import reception from "@/assets/reception.jpg"

// Single source of truth — edit names, dates, venue and images here.
export const wedding = {
  groom: {
    name: "Shubham",
    parents: "Late Mr. BhagwanSingh Shakywar & Mrs. Gyanshree Shakywar",
  },
  bride: {
    name: "Meetanshi",
    parents: "Mr. Rajesh Satpute & Mrs. Jayshree Satpute",
  },
  monogram: { left: "S", right: "M" },
  hashtag: "#ShubhamWedsMeetanshi",
  dateLabel: { weekday: "Thursday", day: "03", month: "December", year: "2026", short: "3rd December 2026" },
  // Countdown target (IST)
  countdownTarget: "2026-12-03T10:00:00+05:30",
  city: "Indore, Madhya Pradesh",
  venue: {
    name: "Shree Mangal Parinay Marriage Garden",
    address: "MR10, Indore, Madhya Pradesh",
    query: "Shree Mangal Parinay Marriage Garden MR10 Indore",
  },
  // Put your mp3 in the project's /public folder and set its path here, e.g. "/song.mp3".
  // Leave as "" to use the built-in instrumental.
  song: "/song.mp3",
  whatsapp: "919876543210",
  quote: "Two souls, one journey, forever begins here.",
  images: {
    invitationTop: couple,
    invitationBottom: hands,
    rememberBg: hands,
    countdownBg: rings,
    arch: prewed,
    gallery: [couple, prewed, rings, hands],
    events: { ring: rings, haldi: haldi, reception: reception },
  },
  galleryCaptions: [
    "Blessings of the Families",
    "A Walk Together",
    "The Promise of a Lifetime – Ring Ceremony",
    "Hand in Hand, Forever",
  ],
  blessing: "Awaiting Your Noble Presence",
  blessingNote: "Your presence and blessings will make our celebration complete.",
  events: [
    {
      id: "ring",
      type: "Ring Ceremony",
      title: "Ring Ceremony",
      start: "2026-12-03T10:00:00",
      end: "2026-12-03T12:00:00",
      time: "10:00 AM",
      theme: "ring" as const,
      tagline: "An exchange of rings, a promise of forever",
    },
    {
      id: "haldi",
      type: "Haldi",
      title: "Haldi",
      start: "2026-12-03T12:00:00",
      end: "2026-12-03T15:00:00",
      time: "12:00 PM",
      theme: "haldi" as const,
      tagline: "A joyful turmeric ceremony filled with colour, laughter & blessings",
    },
    {
      id: "reception",
      type: "Reception",
      title: "Reception",
      start: "2026-12-03T19:00:00",
      end: "2026-12-03T23:30:00",
      time: "7:00 PM Onwards",
      theme: "reception" as const,
      tagline: "An evening of celebration, music & togetherness with family",
    },
  ],
};

export type WeddingEvent = (typeof wedding.events)[number];

export const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(wedding.venue.query)}`;
export const mapsDirectionsUrl = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(wedding.venue.query)}`;
export const mapsEmbedUrl = `https://maps.google.com/maps?q=${encodeURIComponent(wedding.venue.query)}&z=15&output=embed`;

