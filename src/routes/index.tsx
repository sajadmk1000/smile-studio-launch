import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, ShieldCheck, Check } from "lucide-react";
import { CinematicHero, Reveal } from "@/components/site/Cinematic";
import {
  BookingLinks,
  ContactBand,
  Eyebrow,
  FAQList,
  LocationBlock,
  SectionHeading,
} from "@/components/site/Elements";
import { TreatmentNavigator } from "@/components/site/TreatmentNavigator";
import { ClinicStorySequence } from "@/components/site/ClinicStorySequence";
import { clinic, commonFaqs, media, certificates } from "@/lib/site-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Dr. Ameen's Smile Studio | Dental Clinic in South Koduvally, Kerala",
      },
      {
        name: "description",
        content:
          "Experience thoughtful dental care in South Koduvally. Specializing in smile designing, clear aligners, dental implants, veneers, and conservative dental care by Dr. Ameen.",
      },
      {
        property: "og:title",
        content: "Dr. Ameen's Smile Studio | South Koduvally, Kerala",
      },
      {
        property: "og:description",
        content:
          "A calm, architectural dental studio in South Koduvally near Erapund Juma Masjid. Explore treatments and book a clinical consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:url", content: "/" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Dentist",
          name: clinic.name,
          telephone: clinic.phone,
          address: {
            "@type": "PostalAddress",
            streetAddress: "Near Erapund Juma Masjid, Madrassa Bazar, South Koduvally",
            addressLocality: clinic.city,
            addressRegion: clinic.state,
            postalCode: clinic.pincode,
            addressCountry: "IN",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: [
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
              ],
              opens: "10:00",
              closes: "19:00",
            },
          ],
        }),
      },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  return (
    <main>
      {/* SECTION 01 — ARRIVAL (Full-Screen Video Environment) */}
      <CinematicHero />

      {/* SECTION 02 — IDENTITY */}
      <section id="discover" className="section-identity">
        <div className="container-wide identity-grid">
          <div>
            <span className="index-num">01</span>
            <Eyebrow>AN INTRODUCTION</Eyebrow>
          </div>
          <div>
            <h2 className="display-section">
              Every smile is its <br />
              <span className="display-italic">own story.</span>
            </h2>
            <p className="lead-copy" style={{ margin: "1.75rem 0" }}>
              Whether you are seeking clarity on a persistent dental concern or exploring cosmetic refinement, care at Dr. Ameen&apos;s Smile Studio begins with listening. We believe great dentistry is not about rushing procedures—it is about thoughtful diagnosis, facial harmony, and honest guidance.
            </p>
            <Link to="/about" className="text-action-link">
              <span>Learn about our clinic philosophy</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 03 — THE CLINIC (Physical Architectural Progression) */}
      <ClinicStorySequence />

      {/* SECTION 04 — THE PHILOSOPHY */}
      <section className="section-philosophy">
        <div className="container-wide">
          <SectionHeading
            index="03"
            label="THE CLINICAL ETHOS"
            title={
              <>
                Care begins with <br />
                <span className="display-italic">being heard.</span>
              </>
            }
            copy="We respect your time and comfort. Our clinical protocols are structured around three fundamental principles."
          />

          <div className="philosophy-grid">
            <Reveal className="philosophy-column">
              <span className="index-num">01</span>
              <h3>Start with a conversation</h3>
              <p>
                Before any instruments are picked up, we discuss what matters to you—your concerns, your lifestyle, and your oral health expectations.
              </p>
            </Reveal>

            <Reveal className="philosophy-column">
              <span className="index-num">02</span>
              <h3>Explore truthful options</h3>
              <p>
                A thorough examination clarifies which clinical paths are appropriate. We explain the pros, cons, and alternatives without commercial pressure.
              </p>
            </Reveal>

            <Reveal className="philosophy-column">
              <span className="index-num">03</span>
              <h3>Decide with confidence</h3>
              <p>
                You are provided with clear timelines, transparent fee estimates, and aftercare guidance so you make decisions with complete peace of mind.
              </p>
            </Reveal>
          </div>
        </div>
      </section>

      {/* SECTION 05 — TREATMENTS (Interactive Navigator) */}
      <section className="section-treatments" id="treatments">
        <div className="container-wide">
          <SectionHeading
            index="04"
            label="AREAS OF CARE"
            title={
              <>
                Considered treatments for <br />
                <span className="display-italic">every chapter of your smile.</span>
              </>
            }
            copy="Explore our core clinical disciplines. Hover or tap each treatment to review key clinical considerations."
          />

          <TreatmentNavigator />

          <div style={{ marginTop: "3rem", display: "flex", justifyContent: "flex-end" }}>
            <Link to="/treatments" className="text-action-link">
              <span>View all treatment overviews & patient guides</span>
              <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 06 — SMILE DESIGN SPOTLIGHT */}
      <section className="section-smile-design">
        <div className="container-wide smile-design-layout">
          <div className="smile-design-image">
            <picture>
              <source media="(max-width: 768px)" srcSet={media.signageMobile} />
              <img
                src={media.signage}
                alt="Illuminated Dr. Ameen's Smile Studio exterior sign"
                loading="lazy"
              />
            </picture>
          </div>

          <div className="smile-design-content">
            <span className="eyebrow-tag light">05 / BESPOKE AESTHETICS</span>
            <h2 className="display-section" style={{ color: "var(--fg-inverse)" }}>
              Not just a smile. <br />
              <span className="display-italic">Your smile.</span>
            </h2>
            <p>
              Smile designing at Dr. Ameen&apos;s studio is never a copy-paste formula. By analyzing facial contours, lip curvature, and tooth display, we craft enhancements that look completely natural and respect biological tooth structure.
            </p>
            <div style={{ display: "flex", gap: "1.25rem", flexWrap: "wrap", alignItems: "center" }}>
              <Link
                to="/treatments/$slug"
                params={{ slug: "smile-designing" }}
                className="btn-primary"
              >
                Discover Smile Designing <ArrowUpRight size={16} />
              </Link>
              <Link
                to="/contact"
                search={{ interest: "Smile Designing" }}
                className="text-action-link"
                style={{ color: "var(--fg-inverse)" }}
              >
                Schedule an aesthetic consultation
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 07 — TRUST / CREDENTIALS */}
      <section className="section-trust">
        <div className="container-wide trust-layout">
          <div>
            <span className="index-num">06</span>
            <Eyebrow>VERIFIED CREDENTIALS</Eyebrow>
            <h2 className="display-section" style={{ margin: "1rem 0" }}>
              Training you <br />
              <span className="display-italic">can see.</span>
            </h2>
            <p className="lead-copy" style={{ marginBottom: "1.5rem" }}>
              We believe trust in healthcare must be backed by verifiable qualification. Dr. Ameen&apos;s certifications and ongoing memberships are permanently framed on our studio wall.
            </p>

            <div className="credentials-list">
              {certificates.map((cert) => (
                <div key={cert.title} className="credential-item">
                  <h4>{cert.title}</h4>
                  <span>{cert.issuer}</span>
                  <p>{cert.description}</p>
                </div>
              ))}
            </div>
          </div>

          <Reveal className="trust-photo-card">
            <picture>
              <source media="(max-width: 768px)" srcSet={media.certificatesMobile} />
              <img
                src={media.certificates}
                alt="Authentic professional dental certificates displayed on Dr. Ameen's clinic wall"
                loading="lazy"
              />
            </picture>
          </Reveal>
        </div>
      </section>

      {/* SECTION 08 — GALLERY (Editorial Photographic Journey) */}
      <section className="section-gallery">
        <div className="container-wide">
          <SectionHeading
            index="07"
            label="THE PHYSICAL STUDIO"
            title={
              <>
                A photographic journey <br />
                <span className="display-italic">through the studio.</span>
              </>
            }
            copy="Authentic photographs of the spaces you will see when you visit us in South Koduvally."
          />

          <div className="gallery-editorial-grid">
            <Reveal className="gallery-grid-item span-7">
              <img src={media.exterior} alt="Dr. Ameen's Smile Studio exterior at dusk" loading="lazy" />
              <span className="gallery-item-caption">01 · Arrival at Dusk</span>
            </Reveal>

            <Reveal className="gallery-grid-item span-5">
              <img src={media.reception} alt="Warm welcoming reception desk" loading="lazy" />
              <span className="gallery-item-caption">02 · Consultation Reception</span>
            </Reveal>

            <Reveal className="gallery-grid-item span-4">
              <img src={media.signage} alt="Illuminated signage on curved wall" loading="lazy" />
              <span className="gallery-item-caption">03 · Garden Wall</span>
            </Reveal>

            <Reveal className="gallery-grid-item span-8">
              <img src={media.treatmentRoom} alt="Operatory treatment suite with garden window" loading="lazy" />
              <span className="gallery-item-caption">04 · The Operatory Suite</span>
            </Reveal>
          </div>

          <div style={{ marginTop: "2.5rem", textAlign: "center" }}>
            <Link to="/gallery" className="btn-secondary" style={{ paddingInline: "2rem" }}>
              <span>View Full Studio Gallery</span>
              <ArrowUpRight size={16} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 09 — PATIENT EXPERIENCE & ETHICAL CODE */}
      <section className="section-ethics">
        <div className="container-wide">
          <div className="ethics-banner">
            <span className="eyebrow-tag">RESPONSIBLE HEALTHCARE</span>
            <h2 className="display-card" style={{ marginTop: "1rem" }}>
              Truthful communication is our first commitment.
            </h2>
            <p>
              In accordance with medical advertising ethics, we do not showcase paid endorsements, unverified before-and-after composites, or speculative guarantees. Every clinical recommendation is made face-to-face, with full respect for your individuality and oral health.
            </p>
          </div>
        </div>
      </section>

      {/* SECTION 10 — LOCATION & HOURS */}
      <LocationBlock />

      {/* FAQ SECTION */}
      <section className="section-philosophy" style={{ borderTop: "1px solid var(--border-subtle)" }}>
        <div className="container-wide">
          <SectionHeading
            index="08"
            label="COMMON QUESTIONS"
            title={
              <>
                Questions are always <br />
                <span className="display-italic">welcome.</span>
              </>
            }
            copy="Clear answers to help you prepare before getting in touch."
          />

          <FAQList items={commonFaqs.slice(0, 4)} />

          <div style={{ marginTop: "2.5rem" }}>
            <Link to="/faq" className="text-action-link">
              <span>Read all frequently asked questions</span>
              <ArrowUpRight size={17} />
            </Link>
          </div>
        </div>
      </section>

      {/* SECTION 11 — FINAL CONVERSION CTA */}
      <ContactBand />
    </main>
  );
}
