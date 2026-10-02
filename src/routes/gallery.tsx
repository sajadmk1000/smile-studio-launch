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
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 100,
            backgroundColor: "rgba(18, 21, 20, 0.94)",
            backdropFilter: "blur(12px)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
          }}
          onClick={() => setActivePhoto(null)}
        >
          <button
            type="button"
            aria-label="Close modal"
            style={{
              position: "absolute",
              top: "2rem",
              right: "2rem",
              color: "#FAF8F5",
              padding: "0.5rem",
              borderRadius: "50%",
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
            onClick={() => setActivePhoto(null)}
          >
            <X size={26} />
          </button>

          <div
            style={{ maxWidth: "1200px", maxHeight: "80vh", position: "relative" }}
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={activePhoto.alt}
              style={{
                maxWidth: "100%",
                maxHeight: "75vh",
                borderRadius: "4px",
                boxShadow: "0 25px 60px rgba(0,0,0,0.6)",
                objectFit: "contain",
              }}
            />
            <div style={{ marginTop: "1rem", color: "#FAF8F5", textAlign: "center" }}>
              <span style={{ fontSize: "0.75rem", letterSpacing: "0.18em", color: "var(--accent-champagne)", textTransform: "uppercase" }}>
                {activePhoto.label}
              </span>
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.5rem", margin: "0.25rem 0 0" }}>
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
