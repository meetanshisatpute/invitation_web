import { wedding, type WeddingEvent } from "@/data/wedding";

const stamp = (local: string) => local.replace(/[-:]/g, "").slice(0, 15);

function details(ev: WeddingEvent) {
  return {
    title: `${ev.title} – ${wedding.groom.name} & ${wedding.bride.name}`,
    location: `${wedding.venue.name}, ${wedding.venue.address}`,
    description: `Join us to celebrate the ${ev.title} of ${wedding.groom.name} & ${wedding.bride.name}. ${wedding.hashtag}`,
  };
}

export function generateICS(ev: WeddingEvent) {
  const d = details(ev);
  const now = new Date().toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
  const ics = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//ShubhamWedsMeetanshi//Invite//EN",
    "CALSCALE:GREGORIAN",
    "BEGIN:VTIMEZONE",
    "TZID:Asia/Kolkata",
    "BEGIN:STANDARD",
    "DTSTART:19700101T000000",
    "TZOFFSETFROM:+0530",
    "TZOFFSETTO:+0530",
    "TZNAME:IST",
    "END:STANDARD",
    "END:VTIMEZONE",
    "BEGIN:VEVENT",
    `UID:${ev.id}-${stamp(ev.start)}@shubhamwedsmeetanshi`,
    `DTSTAMP:${now}`,
    `DTSTART;TZID=Asia/Kolkata:${stamp(ev.start)}`,
    `DTEND;TZID=Asia/Kolkata:${stamp(ev.end)}`,
    `SUMMARY:${d.title}`,
    `LOCATION:${d.location.replace(/,/g, "\\,")}`,
    `DESCRIPTION:${d.description.replace(/,/g, "\\,")}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");

  const blob = new Blob([ics], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `${ev.id}-shubham-meetanshi.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

export function googleCalendarUrl(ev: WeddingEvent) {
  const d = details(ev);
  const p = new URLSearchParams({
    action: "TEMPLATE",
    text: d.title,
    dates: `${stamp(ev.start)}/${stamp(ev.end)}`,
    ctz: "Asia/Kolkata",
    details: d.description,
    location: d.location,
  });
  return `https://calendar.google.com/calendar/render?${p.toString()}`;
}
