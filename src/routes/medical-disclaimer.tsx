import { createFileRoute } from "@tanstack/react-router";
import { ContactBand, PageIntro } from "@/components/site/Elements";

export const Route = createFileRoute("/medical-disclaimer")({
  head: () => ({
    meta: [
      {
        title: "Medical & Dental Disclaimer | Dr. Ameen's Smile Studio, South Koduvally",
      },
      {
        name: "description",
        content:
          "Important clinical and educational disclaimer for Dr. Ameen's Smile Studio. Online content is educational and does not constitute a diagnostic medical opinion.",
      },
      {
        property: "og:title",
        content: "Medical Disclaimer | Dr. Ameen's Smile Studio",
      },
      {
        property: "og:description",
        content: "Educational content notice for Dr. Ameen's Smile Studio in South Koduvally, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/medical-disclaimer" }],
  }),
  component: MedicalDisclaimerPage,
});

function MedicalDisclaimerPage() {
  return (
    <main>
      <PageIntro
        label="CLINICAL NOTICE"
        title={
          <>
            Educational guidance, <br />
            <span className="display-italic">not an individual diagnosis.</span>
          </>
        }
        copy="Please read this important notice regarding the informational material provided across our digital pages."
      />

      <section className="container-reading" style={{ paddingBlock: "clamp(4rem, 7vw, 6.5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontSize: "1.02rem", color: "var(--fg-secondary)", lineHeight: 1.8 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "0 0 -0.5rem" }}>
            1. Nature of Online Information
          </h2>
          <p>
            The explanations regarding smile designing, clear aligners, dental implants, veneers, orthodontics, and root canal therapy published on this website are designed strictly for patient education. They do not constitute formal dental diagnosis or clinical treatment planning.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "1rem 0 -0.5rem" }}>
            2. Necessity of Face-to-Face Clinical Examination
          </h2>
          <p>
            Every smile and biological oral structure is distinct. Suitability for any specific restorative or aesthetic procedure can only be determined through comprehensive intraoral examination, medical history review, and necessary digital radiographs conducted by Dr. Ameen at our studio in South Koduvally.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "1rem 0 -0.5rem" }}>
            3. Acute Dental Emergencies
          </h2>
          <p>
            If you are experiencing severe oral facial swelling, bleeding, acute trauma, or intense pain, please contact our emergency line (+91 73063 08876) or visit the nearest hospital emergency department without delay.
          </p>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
