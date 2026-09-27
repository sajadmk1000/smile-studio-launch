# Dr. Ameen's Smile Studio

A multi-page dental studio website for South Koduvally, Kerala. Built with TanStack Start, React, TypeScript and Tailwind CSS v4. Start locally with `bun install` and `bun run dev`; the project uses the standard Lovable preview and publish workflow. No environment variables or private keys are required.

## Editing
Clinic facts and treatment copy: `src/lib/site-data.ts`. Source and image provenance: `content/content-registry.md`, `research/` and `assets/image-registry.md`. Palette and typography: `src/styles.css`. Replace conceptual images in `src/assets/` with permitted authentic clinic imagery and update alt text and captions. The temporary monogram is in `src/components/site/SiteShell.tsx` and `public/favicon.svg`.

## Enquiries and privacy
The form builds a message and opens WhatsApp; nothing is stored on this website. The visitor must send the message there, and the clinic must confirm availability. To add real bookings, connect a properly secured persistent service, consent/privacy handling and reliable confirmation before changing the wording. The enquiry interface is in `src/routes/contact.tsx`.

## Search and analytics
Unique route metadata and relative canonical links are included. Home has a Dentist JSON-LD entry using client-provided facts. A sitemap should be generated after a public domain exists. No analytics are installed; obtain consent and update the privacy page before adding a provider.

## Malayalam
English is the only shipped language. For future Malayalam, extract copy from page modules into language dictionaries, arrange professional translation and use locale-aware routes and `lang` attributes; do not machine-publish unreviewed medical copy.

## Deployment
Publish through Lovable after owner verification and live journey tests. See `LAUNCH-CHECKLIST.md` for blockers.
