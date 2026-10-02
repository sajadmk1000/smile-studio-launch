import { createFileRoute } from "@tanstack/react-router";
import { ContactBand, Eyebrow, PageIntro } from "@/components/site/Elements";
import { ShieldCheck, MessageSquareHeart } from "lucide-react";

export const Route = createFileRoute("/reviews")({
  head: () => ({
    meta: [
      {
        title: "Patient Experience & Trust | Dr. Ameen's Smile Studio, South Koduvally",
      },
      {
        name: "description",
        content:
          "Our commitment to transparent patient trust. Dr. Ameen's Smile Studio upholds medical ethics with truthful communication and unmanufactured reviews.",
      },
      {
        property: "og:title",
        content: "Patient Experience & Trust | Dr. Ameen's Smile Studio",
      },
      {
        property: "og:description",
        content: "Our ethical commitment to authentic patient care in South Koduvally, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/reviews" }],
  }),
  component: ReviewsPage,
});

function ReviewsPage() {
  return (
    <main>
      <PageIntro
        label="PATIENT VOICES & TRUST"
        title={
          <>
            Trust is earned through <br />
            <span className="display-italic">actions, not claims.</span>
          </>
        }
        copy="We believe ethical healthcare requires complete honesty. We never publish paid testimonials, fabricated reviews, or unverified before-and-after cases."
      />

      <section className="container-wide" style={{ paddingBlock: "clamp(5rem, 9vw, 8rem)" }}>
        <div style={{ maxWidth: "780px", marginInline: "auto", textAlign: "center" }}>
          <div
            style={{
              width: "64px",
              height: "64px",
              margin: "0 auto 1.5rem",
              borderRadius: "50%",
              backgroundColor: "var(--bg-secondary)",
              display: "grid",
              placeItems: "center",
              color: "var(--accent-champagne-dark)",
            }}
          >
            <ShieldCheck size={32} />
          </div>

          <h2 className="display-card" style={{ fontSize: "2.2rem", marginBottom: "1.25rem" }}>
            Authentic Patient Privacy & Ethics
          </h2>
          <p className="lead-copy" style={{ lineHeight: 1.8, marginBottom: "2rem" }}>
            Under dental regulatory guidelines in India, patient confidentiality is absolute. If you have visited Dr. Ameen&apos;s Smile Studio in South Koduvally, we welcome your personal feedback directly, helping us continually refine the quality and warmth of our clinical care.
          </p>

          <div
            style={{
              padding: "2rem",
              backgroundColor: "var(--bg-secondary)",
              borderRadius: "4px",
              border: "1px solid var(--border-subtle)",
              textAlign: "left",
            }}
          >
            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", margin: "0 0 0.5rem" }}>
              Share your experience with the clinic
            </h4>
            <p style={{ margin: "0 0 1rem", fontSize: "0.92rem", color: "var(--fg-secondary)", lineHeight: 1.7 }}>
              Whether you visited for a consultation, clear aligners, or restorative work, Dr. Ameen values your feedback. Please speak directly with our team during your follow-up or send a private note via WhatsApp.
            </p>
            <a
              href="https://wa.me/917306308876"
              target="_blank"
              rel="noopener noreferrer"
              className="text-action-link"
            >
              <MessageSquareHeart size={16} /> Send private feedback to the clinic
            </a>
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
