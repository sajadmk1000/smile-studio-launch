import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2, ShieldCheck, Microscope, HeartHandshake } from "lucide-react";
import { ContactBand, Eyebrow, PageIntro } from "@/components/site/Elements";
import { treatments, clinic, whatsapp } from "@/lib/site-data";

export const Route = createFileRoute("/treatments/")({
  head: () => ({
    meta: [
      {
        title: "Dental Treatments | Dr. Ameen's Smile Studio, South Koduvally",
      },
      {
        name: "description",
        content:
          "Explore specialized dental treatments at Dr. Ameen's Smile Studio in South Koduvally, Kerala: Smile Designing, Orthodontics, Clear Aligners, Porcelain Veneers, Dental Implants, and Root Canal Therapy.",
      },
      {
        property: "og:title",
        content: "Dental Treatments | Dr. Ameen's Smile Studio South Koduvally",
      },
      {
        property: "og:description",
        content:
          "Comprehensive dental care delivered with clinical precision in South Koduvally, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/treatments" }],
  }),
  component: TreatmentsIndexPage,
});

const CATEGORIES = [
  "All Disciplines",
  "Cosmetic & Smile Art",
  "Orthodontic Realignment",
  "Digital Aligners",
  "Restorative & Surgical",
  "Endodontic Tooth Preservation",
] as const;

function TreatmentsIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Disciplines");

  const filteredTreatments = selectedCategory === "All Disciplines"
    ? treatments
    : treatments.filter((t) => t.category === selectedCategory);

  return (
    <main>
      <PageIntro
        label="CLINICAL DISCIPLINES"
        title={
          <>
            Considered care for <br />
            <span className="display-italic">every oral health need.</span>
          </>
        }
        copy="Explore our dental treatment areas. Every treatment plan is based on a thorough clinical examination, digital radiography, and a personal consultation with Dr. Ameen."
      />

      <section className="container-wide" style={{ paddingBottom: "clamp(4rem, 8vw, 7rem)" }}>
        {/* Clinical Diagnostics Metrics Ribbon */}
        <div className="treatments-metrics-grid">
          <div className="treatments-metric-cell">
            <span className="treatments-metric-num">06</span>
            <span className="treatments-metric-label">Treatment Disciplines</span>
          </div>
          <div className="treatments-metric-cell">
            <span className="treatments-metric-num">Digital</span>
            <span className="treatments-metric-label">Intraoral Radiography</span>
          </div>
          <div className="treatments-metric-cell">
            <span className="treatments-metric-num">Tailored</span>
            <span className="treatments-metric-label">Individual Treatment Plans</span>
          </div>
          <div className="treatments-metric-cell">
            <span className="treatments-metric-num">Koduvally</span>
            <span className="treatments-metric-label">South Koduvally, Kerala</span>
          </div>
        </div>

        {/* Category Filter Strip */}
        <div className="treatments-filter-strip" role="tablist" aria-label="Filter treatment categories">
          {CATEGORIES.map((cat) => {
            const isActive = selectedCategory === cat;
            return (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`treatment-filter-pill ${isActive ? "is-active" : ""}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Editorial Treatment Showcase Cards */}
        <div className="treatments-gallery-flow">
          {filteredTreatments.map((treatment, idx) => {
            const isReversed = idx % 2 === 1;

            return (
              <article
                key={treatment.slug}
                className={`treatment-editorial-card ${isReversed ? "reverse" : ""}`}
                id={treatment.slug}
              >
                {/* Pure, Clean High-Resolution Photography */}
                <div className="treatment-card-media-col">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={treatment.imageMobile} />
                    <img
                      src={treatment.image}
                      alt={`${treatment.name} at Dr. Ameen's Smile Studio`}
                      width={1672}
                      height={941}
                      loading={idx < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </picture>
                </div>

                {/* Content Column */}
                <div className="treatment-card-content-col">
                  <div className="treatment-card-header">
                    <span className="treatment-card-index">{treatment.index}</span>
                    <span className="treatment-card-category">{treatment.category}</span>
                  </div>

                  <h2 className="treatment-card-title">{treatment.name}</h2>
                  <p className="treatment-card-tagline">{treatment.tagline}</p>
                  <p className="treatment-card-copy">{treatment.overview}</p>

                  {/* Clinical Specifications Row */}
                  <div className="treatment-card-specs-row">
                    <div className="treatment-mini-spec">
                      <span className="treatment-mini-spec-title">Timeline</span>
                      <span className="treatment-mini-spec-val">{treatment.duration}</span>
                    </div>
                    <div className="treatment-mini-spec">
                      <span className="treatment-mini-spec-title">Anesthesia / Comfort</span>
                      <span className="treatment-mini-spec-val">{treatment.anesthesia}</span>
                    </div>
                    <div className="treatment-mini-spec">
                      <span className="treatment-mini-spec-title">Longevity</span>
                      <span className="treatment-mini-spec-val">{treatment.longevity}</span>
                    </div>
                  </div>

                  <div className="treatment-card-actions">
                    <Link
                      to="/treatments/$slug"
                      params={{ slug: treatment.slug }}
                      className="btn-primary"
                      style={{ height: "48px", paddingInline: "1.5rem" }}
                    >
                      View Details <ArrowUpRight size={17} />
                    </Link>
                    <a
                      href={whatsapp(treatment.name)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-action-link"
                      style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}
                    >
                      Enquire on WhatsApp
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* Clinical Standards & Ethics */}
      <section style={{ backgroundColor: "var(--bg-secondary)", paddingBlock: "clamp(4.5rem, 8vw, 7rem)", borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container-wide">
          <div style={{ maxWidth: "800px", marginBottom: "3rem" }}>
            <Eyebrow>OUR CLINICAL FOUNDATION</Eyebrow>
            <h2 className="display-section" style={{ marginTop: "0.75rem", marginBottom: "1rem" }}>
              Ethical care and <span className="display-italic">natural preservation.</span>
            </h2>
            <p style={{ color: "var(--fg-secondary)", fontSize: "1.05rem", lineHeight: 1.75, margin: 0 }}>
              At Dr. Ameen's Smile Studio, we do not believe in one-size-fits-all treatments. Every care pathway begins with comprehensive diagnostic evaluation and respect for your natural oral anatomy.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "2rem" }}>
            <div style={{ padding: "2rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }}>
              <Microscope size={28} color="var(--accent-champagne-dark)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", margin: "0 0 0.5rem" }}>
                Diagnostic Accuracy
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.65, margin: 0 }}>
                Digital radiographic imaging and clinical photography ensure clear diagnosis before any treatment commences.
              </p>
            </div>

            <div style={{ padding: "2rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }}>
              <ShieldCheck size={28} color="var(--accent-champagne-dark)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", margin: "0 0 0.5rem" }}>
                Tooth Structure Preservation
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.65, margin: 0 }}>
                Natural healthy tooth structure is irreplaceable. Our clinical approach focuses on conservative, biomimetic restoration.
              </p>
            </div>

            <div style={{ padding: "2rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", border: "1px solid var(--border-subtle)" }}>
              <HeartHandshake size={28} color="var(--accent-champagne-dark)" style={{ marginBottom: "1rem" }} />
              <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.45rem", margin: "0 0 0.5rem" }}>
                Direct Doctor Consultation
              </h3>
              <p style={{ fontSize: "0.9rem", color: "var(--fg-secondary)", lineHeight: 1.65, margin: 0 }}>
                You consult directly with Dr. Ameen. Every question regarding options, duration, and expected outcomes is explained clearly.
              </p>
            </div>
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
