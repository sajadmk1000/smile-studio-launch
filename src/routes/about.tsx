import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Award, ShieldCheck, HeartHandshake } from "lucide-react";
import { ContactBand, Eyebrow, PageIntro } from "@/components/site/Elements";
import { Reveal } from "@/components/site/Cinematic";
import { clinic, media, certificates } from "@/lib/site-data";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Dr. Ameen's Smile Studio | South Koduvally, Kerala" },
      {
        name: "description",
        content:
          "Learn about Dr. Ameen's Smile Studio in South Koduvally. Our clinical philosophy combines gentle, conservative dentistry, facial aesthetics, and patient-first transparency.",
      },
      { property: "og:title", content: "About Dr. Ameen's Smile Studio" },
      {
        property: "og:description",
        content: "Discover our patient-first approach to dental care in South Koduvally, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <PageIntro
        label="ABOUT THE CLINIC"
        title={
          <>
            A dental sanctuary designed around <br />
            <span className="display-italic">calm, unhurried care.</span>
          </>
        }
        copy="Dr. Ameen's Smile Studio was conceived as an architectural retreat where clinical excellence meets serene hospitality in South Koduvally, Kerala."
      />

      {/* Philosophy Feature Story */}
      <section className="container-wide" style={{ paddingBlock: "clamp(4.5rem, 8vw, 7.5rem)" }}>
        <div className="identity-grid">
          <div>
            <span className="index-num">01</span>
            <Eyebrow>OUR PHILOSOPHY</Eyebrow>
          </div>
          <div>
            <h2 className="display-section">
              Clarity before <br />
              <span className="display-italic">any procedure.</span>
            </h2>
            <p className="lead-copy" style={{ margin: "1.5rem 0" }}>
              Dental decisions are deeply personal. We believe you should never feel rushed or pressured into treatments you do not fully understand. At Dr. Ameen&apos;s studio, every patient journey starts with an exploratory conversation, followed by diagnostic imaging and a clear explanation of options.
            </p>
            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.8, marginBottom: "2rem" }}>
              From biomimetic smile designing to gentle root canal therapies, our treatment protocols focus on preserving maximum natural tooth structure. We combine modern materials with an eye for anatomical harmony.
            </p>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginTop: "2rem" }}>
              <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}>
                <ShieldCheck size={24} color="var(--accent-champagne-dark)" style={{ marginBottom: "0.5rem" }} />
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem", fontFamily: "var(--font-display)" }}>Hospital-Grade Sterilization</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Autoclaved instrument packs sealed and opened in front of you.</p>
              </div>
              <div style={{ padding: "1.25rem", backgroundColor: "var(--bg-secondary)", borderRadius: "4px" }}>
                <HeartHandshake size={24} color="var(--accent-champagne-dark)" style={{ marginBottom: "0.5rem" }} />
                <h4 style={{ margin: "0 0 0.25rem", fontSize: "1.1rem", fontFamily: "var(--font-display)" }}>Conservative Dentistry</h4>
                <p style={{ margin: 0, fontSize: "0.85rem", color: "var(--fg-secondary)" }}>Prioritizing natural tooth preservation above unnecessary intervention.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Visual Showcase: Reception & Lounge */}
      <section className="container-wide" style={{ paddingBottom: "clamp(4.5rem, 8vw, 7.5rem)" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: "1.75rem" }}>
          <Reveal style={{ position: "relative", borderRadius: "4px", overflow: "hidden", minHeight: "440px" }}>
            <img
              src={media.reception}
              alt="Consultation desk at Dr. Ameen's Smile Studio"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </Reveal>
          <Reveal style={{ position: "relative", borderRadius: "4px", overflow: "hidden", minHeight: "440px" }}>
            <img
              src={media.waiting}
              alt="Waiting lounge facing street trees"
              style={{ width: "100%", height: "100%", objectFit: "cover" }}
              loading="lazy"
            />
          </Reveal>
        </div>
      </section>

      {/* Verified Qualifications */}
      <section style={{ backgroundColor: "var(--bg-secondary)", paddingBlock: "clamp(5rem, 9vw, 8rem)", borderBlock: "1px solid var(--border-subtle)" }}>
        <div className="container-wide">
          <div style={{ maxWidth: "700px", marginBottom: "3rem" }}>
            <Eyebrow>VERIFIED CREDENTIALS</Eyebrow>
            <h2 className="display-section" style={{ marginTop: "1rem" }}>
              Clinical foundation & <br />
              <span className="display-italic">continuing education.</span>
            </h2>
            <p className="lead-copy" style={{ marginTop: "1rem" }}>
              Dr. Ameen maintains active professional standing and continually incorporates validated techniques in aesthetic and restorative care.
            </p>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "1.5rem" }}>
            {certificates.map((cert) => (
              <div key={cert.title} style={{ padding: "1.75rem", backgroundColor: "var(--bg-primary)", borderRadius: "4px", border: "1px solid var(--border-subtle)", boxShadow: "var(--shadow-sm)" }}>
                <span className="index-num" style={{ fontSize: "1rem", color: "var(--accent-champagne-dark)", display: "block", marginBottom: "0.5rem" }}>{cert.issuer}</span>
                <h3 style={{ fontFamily: "var(--font-display)", fontSize: "1.35rem", margin: "0 0 0.5rem" }}>{cert.title}</h3>
                <p style={{ margin: 0, fontSize: "0.88rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>{cert.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
