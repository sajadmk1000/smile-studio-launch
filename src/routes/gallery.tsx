import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { X, ZoomIn } from "lucide-react";
import { ContactBand, PageIntro } from "@/components/site/Elements";
import { Reveal } from "@/components/site/Cinematic";
import { media } from "@/lib/site-data";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      {
        title: "Inside the Studio | Dr. Ameen's Smile Studio Gallery, South Koduvally",
      },
      {
        name: "description",
        content:
          "Explore photographs of Dr. Ameen's Smile Studio in South Koduvally, Kerala: our illuminated facade, reception lounge, and operatory suite.",
      },
      {
        property: "og:title",
        content: "Inside the Studio | Dr. Ameen's Smile Studio Gallery",
      },
      {
        property: "og:description",
        content: "Authentic photographs of Dr. Ameen's Smile Studio in South Koduvally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/gallery" }],
  }),
  component: GalleryPage,
});

const galleryItems = [
  {
    src: media.exterior,
    srcMobile: media.exteriorMobile,
    label: "ARRIVAL AT DUSK",
    title: "Exterior Facade & Courtyard",
    alt: "Exterior facade of Dr. Ameen's Smile Studio in South Koduvally with illuminated signage",
    span: "span-7",
  },
  {
    src: media.reception,
    srcMobile: media.receptionMobile,
    label: "RECEPTION",
    title: "The Consultation Greeting",
    alt: "Curved reception desk with warm pendant lighting and certificates",
    span: "span-5",
  },
  {
    src: media.signage,
    srcMobile: media.signageMobile,
    label: "THE GARDEN WALL",
    title: "Curved Architectural Signage",
    alt: "Illuminated Dr. Ameen's Smile Studio tooth monogram on curved garden wall",
    span: "span-5",
  },
  {
    src: media.waiting,
    srcMobile: media.waitingMobile,
    label: "THE LOUNGE",
    title: "Tranquil Waiting Area",
    alt: "Patient lounge with leather armchairs and street view through full-height glass",
    span: "span-7",
  },
  {
    src: media.treatmentRoom,
    srcMobile: media.treatmentRoomMobile,
    label: "THE OPERATORY",
    title: "Clinical Treatment Suite",
    alt: "Operatory dental chair and cabinetry overlooking garden foliage",
    span: "span-8",
  },
  {
    src: media.certificates,
    srcMobile: media.certificatesMobile,
    label: "CREDENTIALS",
    title: "Framed Professional Accreditations",
    alt: "Indian Dental Association and Malabar Dental College certificates on clinic wall",
    span: "span-4",
  },
];

function GalleryPage() {
  const [activePhoto, setActivePhoto] = useState<typeof galleryItems[0] | null>(null);

  return (
    <main>
      <PageIntro
        label="THE PHYSICAL STUDIO"
        title={
          <>
            A quiet space shaped for <br />
            <span className="display-italic">your comfort.</span>
          </>
        }
        copy="Take a walk through the spaces of Dr. Ameen's Smile Studio in South Koduvally—from our illuminated entrance to the serene treatment room."
      />

      <section className="container-wide" style={{ paddingBlock: "clamp(3.5rem, 6vw, 6.5rem)" }}>
        <div className="gallery-editorial-grid">
          {galleryItems.map((item, index) => (
            <Reveal
              key={item.label}
              className={`gallery-grid-item ${item.span}`}
            >
              <div
                style={{ width: "100%", height: "100%", cursor: "pointer", position: "relative" }}
                onClick={() => setActivePhoto(item)}
              >
                <picture>
                  <source media="(max-width: 768px)" srcSet={item.srcMobile} />
                  <img src={item.src} alt={item.alt} loading="lazy" />
                </picture>
                <span className="gallery-item-caption">
                  0{index + 1} · {item.label}
                </span>
                <div
                  style={{
                    position: "absolute",
                    top: "1rem",
                    right: "1rem",
                    backgroundColor: "rgba(20, 23, 22, 0.6)",
                    backdropFilter: "blur(6px)",
                    borderRadius: "50%",
                    width: "36px",
                    height: "36px",
                    display: "grid",
                    placeItems: "center",
                    color: "#FAF8F5",
                  }}
                >
                  <ZoomIn size={16} />
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Lightbox Modal */}
      {activePhoto && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activePhoto.title}
          className="gallery-lightbox-backdrop"
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            aria-label="Close modal"
            className="gallery-lightbox-close"
            onClick={() => setActivePhoto(null)}
          >
            <X size={24} />
          </button>

          <div
            className="gallery-lightbox-container"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              className="gallery-lightbox-img"
            />
            <div className="gallery-lightbox-meta">
              <span className="gallery-lightbox-tag">
                {activePhoto.label}
              </span>
              <h3 className="gallery-lightbox-title">
                {activePhoto.title}
              </h3>
            </div>
          </div>
        </div>
      )}

      <ContactBand />
    </main>
  );
}
