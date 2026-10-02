import { createFileRoute } from "@tanstack/react-router";
import { ContactBand, PageIntro } from "@/components/site/Elements";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | Dr. Ameen's Smile Studio, South Koduvally" },
      {
        name: "description",
        content:
          "Privacy policy for Dr. Ameen's Smile Studio. Learn how your consultation enquiries and communications are handled with strict confidentiality.",
      },
      { property: "og:title", content: "Privacy Policy | Dr. Ameen's Smile Studio" },
      {
        property: "og:description",
        content: "Transparent website privacy details for Dr. Ameen's Smile Studio in South Koduvally, Kerala.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: "/privacy" }],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  return (
    <main>
      <PageIntro
        label="PRIVACY & CONFIDENTIALITY"
        title={
          <>
            Your privacy is <br />
            <span className="display-italic">strictly respected.</span>
          </>
        }
        copy="We believe in absolute transparency. This website is built without third-party tracking, profiling cookies, or data brokers."
      />

      <section className="container-reading" style={{ paddingBlock: "clamp(4rem, 7vw, 6.5rem)" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem", fontSize: "1.02rem", color: "var(--fg-secondary)", lineHeight: 1.8 }}>
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "0 0 -0.5rem" }}>
            1. Zero Third-Party Advertising Trackers
          </h2>
          <p>
            Dr. Ameen&apos;s Smile Studio does not sell, trade, or share your browsing habits with third-party advertising networks. We do not use intrusive cross-site tracking scripts.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "1rem 0 -0.5rem" }}>
            2. Direct Consultation Enquiries
          </h2>
          <p>
            When you complete our consultation inquiry form, your details are packaged into a standard direct WhatsApp message for you to review and send voluntarily. Your clinical data remains between you and Dr. Ameen&apos;s clinic staff.
          </p>

          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "1.85rem", color: "var(--fg-primary)", margin: "1rem 0 -0.5rem" }}>
            3. Clinical Record Confidentiality
          </h2>
          <p>
            All patient records generated during in-person visits to our South Koduvally clinic are safeguarded in compliance with Indian healthcare regulations and professional medical secrecy.
          </p>
        </div>
      </section>

      <ContactBand />
    </main>
  );
}
