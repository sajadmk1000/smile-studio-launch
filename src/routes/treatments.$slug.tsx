import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, ArrowUpRight, CheckCircle2, Phone, MessageSquare } from "lucide-react";
import {
  ContactBand,
  Eyebrow,
  FAQList,
} from "@/components/site/Elements";
import { treatments, clinic, whatsapp } from "@/lib/site-data";

export const Route = createFileRoute("/treatments/$slug")({
  loader: ({ params }) => {
    const item = treatments.find((t) => t.slug === params.slug);
    if (!item) throw notFound();
    return item;
  },
  head: ({ loaderData, params }) => ({
    meta: [
      {
        title: loaderData
          ? `${loaderData.name} | Dr. Ameen's Smile Studio, South Koduvally`
          : "Treatment | Dr. Ameen's Smile Studio",
      },
      {
        name: "description",
        content: loaderData
          ? `${loaderData.overview} Detailed clinical information about ${loaderData.name.toLowerCase()} at Dr. Ameen's Smile Studio in South Koduvally, Kerala.`
          : "Treatment information.",
      },
      {
        property: "og:title",
        content: loaderData
          ? `${loaderData.name} | Dr. Ameen's Smile Studio South Koduvally`
          : "Treatment Not Found",
      },
      {
        property: "og:description",
        content: loaderData?.short ?? "Treatment information.",
      },
      { property: "og:type", content: "article" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: `/treatments/${params.slug}` }],
  }),
  component: TreatmentDetailPage,
});

function TreatmentDetailPage() {
  const t = Route.useLoaderData();

  const currentIndex = treatments.findIndex((item) => item.slug === t.slug);
  const prevTreatment = treatments[(currentIndex - 1 + treatments.length) % treatments.length];
  const nextTreatment = treatments[(currentIndex + 1) % treatments.length];

  return (
    <main>
      {/* =====================================================================
          1. ARCHITECTURAL HERO HEADER
          ===================================================================== */}
      <section className="treatment-detail-hero">
        <div className="container-wide">
          {/* Breadcrumb Navigation */}
          <Link
            to="/treatments"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              fontSize: "0.85rem",
              color: "var(--accent-champagne)",
              marginBottom: "2rem",
            }}
          >
            <ArrowLeft size={16} /> All Treatments
          </Link>

          <div className="treatment-detail-hero-layout">
            {/* Left Narrative Column */}
            <div>
              <span className="eyebrow-tag light" style={{ marginBottom: "1rem" }}>
                {t.index} · {t.category.toUpperCase()}
              </span>

              <h1 className="display-hero" style={{ margin: "0.75rem 0 1.25rem", color: "var(--fg-inverse)" }}>
                {t.name}
              </h1>

              <p style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.35rem, 2.2vw, 1.85rem)", fontStyle: "italic", color: "var(--accent-champagne-light)", marginBottom: "1.25rem", lineHeight: 1.25 }}>
                "{t.tagline}"
              </p>

              <p className="lead-copy" style={{ color: "var(--fg-inverse-muted)", maxWidth: "580px", marginBottom: "2.25rem" }}>
                {t.short}
              </p>

              <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
                <Link
                  to="/contact"
                  search={{ interest: t.name }}
                  className="btn-primary"
                  style={{ height: "48px", paddingInline: "1.75rem" }}
                >
                  Book Consultation <ArrowUpRight size={17} />
                </Link>
                <a
                  href={whatsapp(t.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    height: "48px",
                    paddingInline: "1.5rem",
                    borderColor: "rgba(250, 248, 245, 0.2)",
                    color: "var(--fg-inverse)",
                  }}
                >
                  WhatsApp Dr. Ameen
                </a>
              </div>
            </div>

            {/* Right Hero Image Frame (Clean, Uncluttered Photography) */}
            <div className="treatment-hero-image-frame">
              <picture>
                <source media="(max-width: 768px)" srcSet={t.imageMobile} />
                <img
                  src={t.image}
                  alt={`${t.name} at Dr. Ameen's Smile Studio`}
                  width={1672}
                  height={941}
                  fetchPriority="high"
                  decoding="async"
                />
              </picture>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. CLINICAL SPECIFICATIONS BANNER
          ===================================================================== */}
      <section className="treatment-specs-bar">
        <div className="container-wide">
          <div className="treatment-specs-bar-grid">
            <div className="treatment-bar-stat">
              <span className="treatment-bar-stat-label">Discipline</span>
              <span className="treatment-bar-stat-value">{t.category}</span>
            </div>
            <div className="treatment-bar-stat">
              <span className="treatment-bar-stat-label">Timeline</span>
              <span className="treatment-bar-stat-value">{t.duration}</span>
            </div>
            <div className="treatment-bar-stat">
              <span className="treatment-bar-stat-label">Anesthesia / Comfort</span>
              <span className="treatment-bar-stat-value">{t.anesthesia}</span>
            </div>
            <div className="treatment-bar-stat">
              <span className="treatment-bar-stat-label">Longevity</span>
              <span className="treatment-bar-stat-value">{t.longevity}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. MAIN CLINICAL JOURNEY & BODY
          ===================================================================== */}
      <section className="container-wide" style={{ paddingBlock: "clamp(5rem, 9vw, 8rem)" }}>
        <div className="identity-grid">
          {/* Left Column: Summary & Consultation Box */}
          <div>
            <span className="index-num">{t.index}</span>
            <Eyebrow>CLINICAL PERSPECTIVE</Eyebrow>

            {/* Candidacy Box */}
            <div style={{ marginTop: "1.75rem", padding: "1.75rem", backgroundColor: "var(--bg-secondary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }}>
              <h4 style={{ margin: "0 0 0.75rem", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-botanical)", fontWeight: 600 }}>
                Clinical Candidacy
              </h4>
              <p style={{ margin: 0, fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.65 }}>
                {t.suitable}
              </p>
            </div>

            {/* Key Clinical Considerations */}
            <div style={{ marginTop: "1.5rem", padding: "1.75rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }}>
              <h4 style={{ margin: "0 0 1rem", fontSize: "0.85rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-primary)", fontWeight: 600 }}>
                Clinical Considerations
              </h4>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {t.keyAspects.map((aspect) => (
                  <li key={aspect} style={{ display: "flex", alignItems: "center", gap: "0.6rem", fontSize: "0.88rem", color: "var(--fg-secondary)" }}>
                    <CheckCircle2 size={16} color="var(--accent-champagne-dark)" style={{ flexShrink: 0 }} />
                    {aspect}
                  </li>
                ))}
              </ul>
            </div>

            {/* Doctor Consultation Card */}
            <div style={{ marginTop: "1.5rem", padding: "1.75rem", backgroundColor: "var(--bg-dark)", color: "var(--fg-inverse)", borderRadius: "4px" }}>
              <h4 style={{ margin: "0 0 0.5rem", fontSize: "0.95rem", letterSpacing: "0.06em", color: "var(--accent-champagne)" }}>
                Speak with Dr. Ameen
              </h4>
              <p style={{ margin: "0 0 1.25rem", fontSize: "0.85rem", color: "var(--fg-inverse-muted)", lineHeight: 1.6 }}>
                Have questions about this treatment or seeking a clinical second opinion? Contact our reception team.
              </p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                <a
                  href={`tel:${clinic.tel}`}
                  className="btn-primary"
                  style={{ width: "100%", height: "42px", fontSize: "0.82rem", justifyContent: "center" }}
                >
                  <Phone size={14} /> Call {clinic.phone}
                </a>
                <a
                  href={whatsapp(t.name)}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-secondary"
                  style={{
                    width: "100%",
                    height: "42px",
                    fontSize: "0.82rem",
                    justifyContent: "center",
                    borderColor: "rgba(250, 248, 245, 0.2)",
                    color: "var(--fg-inverse)",
                  }}
                >
                  <MessageSquare size={14} /> WhatsApp Dr. Ameen
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: In-Depth Exploration */}
          <div>
            <h2 className="display-card" style={{ fontSize: "clamp(2rem, 3.2vw, 2.75rem)" }}>
              About {t.name.toLowerCase()}
            </h2>
            <p className="lead-copy" style={{ margin: "1.25rem 0 2.5rem" }}>
              {t.overview}
            </p>

            <div style={{ height: "1px", backgroundColor: "var(--border-subtle)", marginBlock: "3rem" }} />

            {/* Treatment Pathway */}
            <h3 className="display-card" style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>
              The Treatment Pathway
            </h3>
            <p style={{ color: "var(--fg-secondary)", marginBottom: "2rem", lineHeight: 1.7 }}>
              Every procedure at Dr. Ameen's Smile Studio follows a sequential protocol planned around patient comfort and biological longevity.
            </p>

            <div className="treatment-steps-flow">
              {t.process.map((step) => (
                <div key={step.step} className="treatment-step-card">
                  <span className="treatment-step-tag">Phase {step.step}</span>
                  <h4 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", margin: "0.25rem 0 0.5rem", color: "var(--fg-primary)" }}>
                    {step.title}
                  </h4>
                  <p style={{ margin: 0, fontSize: "0.92rem", color: "var(--fg-secondary)", lineHeight: 1.7 }}>
                    {step.desc}
                  </p>
                </div>
              ))}
            </div>

            <div style={{ height: "1px", backgroundColor: "var(--border-subtle)", marginBlock: "3rem" }} />

            {/* What to Expect Callout */}
            <h3 className="display-card" style={{ fontSize: "2rem", marginBottom: "1rem" }}>
              What to Expect
            </h3>
            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.8, margin: "0 0 2rem" }}>
              {t.expectations}
            </p>

            <div style={{ padding: "1.75rem", backgroundColor: "var(--bg-secondary)", borderRadius: "4px", borderLeft: "3px solid var(--accent-champagne-dark)" }}>
              <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--fg-secondary)", lineHeight: 1.7 }}>
                <strong>Clinical Note:</strong> Individual oral physiology varies. A comprehensive clinical examination, periodontal assessment, and intraoral radiographs at our South Koduvally clinic determine exact suitability and timelines.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. PHOTOGRAPHIC SPOTLIGHT & MATERIALS
          ===================================================================== */}
      <section className="treatment-macro-spotlight">
        <div className="container-wide">
          <div className="treatment-macro-grid">
            <div className="treatment-macro-viewport">
              <picture>
                <source media="(max-width: 768px)" srcSet={t.imageMobile} />
                <img
                  src={t.image}
                  alt={`Detailed photographic view of ${t.name}`}
                  width={1672}
                  height={941}
                  loading="lazy"
                />
              </picture>
            </div>

            <div>
              <span className="eyebrow-tag light" style={{ marginBottom: "1.25rem" }}>
                MATERIALS & CLINICAL PRECISION
              </span>
              <h2 className="display-section" style={{ color: "var(--fg-inverse)", margin: "0.75rem 0 1.25rem" }}>
                Crafted for durability and natural balance.
              </h2>
              <p style={{ color: "var(--fg-inverse-muted)", fontSize: "1rem", lineHeight: 1.75, marginBottom: "1.75rem" }}>
                Whether it is the optical translucency of individual porcelain layers, the biocompatible fit of a titanium implant fixture, or the precision force delivery of sequential aligners, long-term success is founded on careful execution.
              </p>
              <ul style={{ listStyle: "none", padding: 0, margin: "0 0 2.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {t.visualHighlights.map((hl) => (
                  <li key={hl} style={{ display: "flex", alignItems: "center", gap: "0.65rem", fontSize: "0.9rem", color: "var(--accent-champagne-light)" }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", backgroundColor: "var(--accent-champagne)" }} />
                    {hl}
                  </li>
                ))}
              </ul>
              <Link
                to="/contact"
                search={{ interest: t.name }}
                className="btn-primary"
                style={{ height: "46px", paddingInline: "1.5rem" }}
              >
                Schedule Consultation <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. TREATMENT-SPECIFIC FREQUENTLY ASKED QUESTIONS
          ===================================================================== */}
      <section style={{ backgroundColor: "var(--bg-secondary)", paddingBlock: "clamp(5rem, 9vw, 7.5rem)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container-wide">
          <div style={{ maxWidth: "720px", marginBottom: "3rem" }}>
            <Eyebrow>FREQUENTLY ASKED QUESTIONS</Eyebrow>
            <h2 className="display-section" style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
              Questions regarding {t.name.toLowerCase()}.
            </h2>
            <p style={{ color: "var(--fg-secondary)", fontSize: "1rem", lineHeight: 1.7, margin: 0 }}>
              Answers regarding procedure comfort, treatment timelines, and post-care maintenance.
            </p>
          </div>

          <div style={{ maxWidth: "900px" }}>
            <FAQList faqs={t.faqs} />
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. SEAMLESS PREVIOUS / NEXT TREATMENT NAVIGATION
          ===================================================================== */}
      <section className="treatment-nav-footer-bar">
        <div className="container-wide">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.75rem" }}>
            <span style={{ fontSize: "0.8rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-muted)", fontWeight: 600 }}>
              Browse Treatments
            </span>
            <Link to="/treatments" className="text-action-link" style={{ fontSize: "0.85rem" }}>
              View All Treatments →
            </Link>
          </div>

          <div className="treatment-nav-footer-grid">
            {/* Previous Treatment */}
            <Link
              to="/treatments/$slug"
              params={{ slug: prevTreatment.slug }}
              className="treatment-nav-tile"
            >
              <div className="treatment-nav-thumb">
                <img src={prevTreatment.imageMobile} alt={prevTreatment.name} loading="lazy" />
              </div>
              <div style={{ overflow: "hidden" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  <ArrowLeft size={13} /> Previous Treatment
                </span>
                <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg-primary)", marginTop: "0.2rem" }}>
                  {prevTreatment.name}
                </strong>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--fg-secondary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {prevTreatment.short}
                </span>
              </div>
            </Link>

            {/* Next Treatment */}
            <Link
              to="/treatments/$slug"
              params={{ slug: nextTreatment.slug }}
              className="treatment-nav-tile"
            >
              <div className="treatment-nav-thumb">
                <img src={nextTreatment.imageMobile} alt={nextTreatment.name} loading="lazy" />
              </div>
              <div style={{ overflow: "hidden" }}>
                <span style={{ display: "flex", alignItems: "center", gap: "0.35rem", fontSize: "0.75rem", color: "var(--fg-muted)", letterSpacing: "0.08em", textTransform: "uppercase" }}>
                  Next Treatment <ArrowRight size={13} />
                </span>
                <strong style={{ display: "block", fontFamily: "var(--font-display)", fontSize: "1.25rem", color: "var(--fg-primary)", marginTop: "0.2rem" }}>
                  {nextTreatment.name}
                </strong>
                <span style={{ display: "block", fontSize: "0.8rem", color: "var(--fg-secondary)", textOverflow: "ellipsis", overflow: "hidden", whiteSpace: "nowrap" }}>
                  {nextTreatment.short}
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Global Contact & Appointment Band */}
      <ContactBand />
    </main>
  );
}
