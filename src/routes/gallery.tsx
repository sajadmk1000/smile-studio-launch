import { createFileRoute } from '@tanstack/react-router';
import exterior from '@/assets/clinic/exterior.webp.asset.json';
import signage from '@/assets/clinic/signage.webp.asset.json';
import reception from '@/assets/clinic/reception.webp.asset.json';
import waiting from '@/assets/clinic/waiting.webp.asset.json';
import room from '@/assets/clinic/treatment-room.webp.asset.json';
import certs from '@/assets/clinic/certificates.webp.asset.json';
import { ContactBand, PageIntro } from '@/components/site/Elements';
import { Reveal } from '@/components/site/Cinematic';

const items = [
  { img: exterior, label: 'ARRIVAL', alt: "Exterior of Dr. Ameen's Smile Studio at dusk" },
  { img: reception, label: 'RECEPTION', alt: 'Reception desk with warm lighting' },
  { img: waiting, label: 'THE LOUNGE', alt: 'Waiting lounge facing the street trees' },
  { img: room, label: 'TREATMENT ROOM', alt: 'Treatment room with dental chair' },
  { img: certs, label: 'CERTIFICATES', alt: 'Framed certificates on the studio wall' },
  { img: signage, label: 'THE GARDEN WALL', alt: 'Illuminated studio sign on a curved wall' },
];

export const Route = createFileRoute('/gallery')({
  head: () => ({
    meta: [
      { title: 'Inside the Clinic | Dr. Ameen’s Smile Studio' },
      { name: 'description', content: 'See the exterior, reception, lounge and treatment room of Dr. Ameen’s Smile Studio in South Koduvally.' },
      { property: 'og:title', content: 'Inside Dr. Ameen’s Smile Studio' },
      { property: 'og:description', content: 'A look around the South Koduvally dental studio.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: '/gallery' }],
  }),
  component: Gallery,
});

function Gallery() {
  return (
    <main>
      <PageIntro label="INSIDE THE STUDIO" title="A walk through the clinic." copy="From the garden wall to the treatment room — the spaces you’ll see when you visit." />
      <section className="container-wide clinic-gallery">
        {items.map((it, i) => (
          <Reveal key={it.label} className={`cg-item cg-${i}`}>
            <img src={it.img.url} loading="lazy" alt={it.alt} />
            <span>0{i + 1} · {it.label}</span>
          </Reveal>
        ))}
      </section>
      <ContactBand />
    </main>
  );
}
