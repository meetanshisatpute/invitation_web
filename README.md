# Shubham weds Meetanshi – Wedding Invitation

Vite + React + TypeScript + Tailwind CSS v4.

## Run
```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build in dist/
```

## Netlify deployment
The root `netlify.toml` sets `npm run build` as the build command and `dist` as
the publish directory. Keep the repository root as the base directory. This is
a Vite application, so it needs the build step; publishing the source directory
or `dist/client` does not serve the generated site.

## Customise
Edit `src/data/wedding.ts` (names, dates, venue, WhatsApp number, images, events).
RSVP submission is a stub in `src/components/RSVPForm.tsx` (`submitRSVP`) – connect it to your backend.
