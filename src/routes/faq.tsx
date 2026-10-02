import { createFileRoute } from "@tanstack/react-router";
import { ContactBand, FAQList, PageIntro } from "@/components/site/Elements";
import { commonFaqs, treatments } from "@/lib/site-data";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      {
        title: "Frequently Asked Questions | Dr. Ameen's Smile Studio, South Koduvally",
      },
      {
        name: "description",
        content:
          "Helpful answers regarding appointments, location, dental treatments, fees, and safety at Dr. Ameen's Smile Studio in South Koduvally, Kerala.",
      },
      {
        property: "og:title",
        content: "Frequently Asked Questions | Dr. Ameen's Smile Studio",
      },
      {
        property: "og:description",
        content: "Answers to common dental care and appointment questions in South Koduvally.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/faq" }],
  }),
  component: FaqPage,
});

function FaqPage() {
  const treatmentFaqs = treatments.map((t) => ({
    q: `What should I consider before exploring ${t.name.toLowerCase()}?`,
    a: `${t.short} Every individual case is unique; a diagnostic assessment with Dr. Ameen will outline whether this procedure is appropriate for your oral health.`,
  }));

  const allFaqs = [...commonFaqs, ...treatmentFaqs];

  return (
    <main>
      <PageIntro
        label="HELP & GUIDANCE"
        title={
          <>
            Questions are always <br />
            <span className="display-italic">welcome here.</span>
          </>
        }
        copy="We believe informed patients make the best healthcare decisions. Here are answers to common questions about visiting our South Koduvally clinic."
      />

      <section className="container-wide" style={{ paddingBlock: "clamp(4.5rem, 8vw, 7.5rem)" }}>
        <div style={{ maxWidth: "900px", marginInline: "auto" }}>
          <FAQList items={allFaqs} />
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
