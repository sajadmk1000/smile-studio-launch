import { useState } from "react";
import { createFileRoute, useSearch } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Copy,
  Check,
  Phone,
  MessageCircle,
  MapPin,
  Clock,
} from "lucide-react";
import { Eyebrow, LocationBlock, PageIntro } from "@/components/site/Elements";
import { clinic, treatments } from "@/lib/site-data";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    interest: typeof search["interest"] === "string" ? search["interest"] : undefined,
  }),
  head: () => ({
    meta: [
      {
        title: "Contact & Consultation Enquiry | Dr. Ameen's Smile Studio, South Koduvally",
      },
      {
        name: "description",
        content:
          "Connect with Dr. Ameen's Smile Studio in South Koduvally near Erapund Juma Masjid. Call +91 73063 08876 or send a WhatsApp enquiry.",
      },
      {
        property: "og:title",
        content: "Contact Dr. Ameen's Smile Studio",
      },
      {
        property: "og:description",
        content: "Find the studio in South Koduvally or schedule a dental consultation.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { interest } = useSearch({ from: "/contact" });
  const [copied, setCopied] = useState(false);
  const [sent, setSent] = useState(false);
  const [phoneError, setPhoneError] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    date: "",
    time: "",
    interest: interest || "",
    message: "",
  });

  const update = (key: keyof typeof form, val: string) => {
    setForm((prev) => ({ ...prev, [key]: val }));
  };

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(clinic.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[+\d\s()-]{8,18}$/.test(form.phone.trim())) {
      setPhoneError("Please enter a valid phone number.");
      return;
    }
    setPhoneError("");

    const message = [
      `Hello Dr. Ameen's Smile Studio, I would like to enquire about an appointment.`,
      `• Patient Name: ${form.name.trim()}`,
      `• Contact Number: ${form.phone.trim()}`,
      form.date ? `• Preferred Date: ${form.date}` : "",
      form.time ? `• Preferred Time: ${form.time}` : "",
      `• Treatment Interest: ${form.interest || "General Consultation"}`,
      form.message.trim() ? `• Note: ${form.message.trim()}` : "",
    ]
      .filter(Boolean)
      .join("\n");

    const waUrl = `https://wa.me/917306308876?text=${encodeURIComponent(message)}`;
    window.open(waUrl, "_blank", "noopener,noreferrer");
    setSent(true);
  };

  return (
    <main>
      <PageIntro
        label="REACH THE STUDIO"
        title={
          <>
            Let&apos;s begin with <br />
            <span className="display-italic">a conversation.</span>
          </>
        }
        copy="Whether you want to explore treatment possibilities, ask about fees, or schedule a consultation in South Koduvally, we are ready to assist you."
      />

      <section className="container-wide contact-layout-grid">
        {/* Direct Contact Details */}
        <div>
          <Eyebrow>DIRECT CONNECTIONS</Eyebrow>
          <div style={{ marginTop: "1.75rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
            <a
              href={`tel:${clinic.tel}`}
              className="btn-secondary"
              style={{ justifyContent: "flex-start", height: "60px", paddingInline: "1.5rem" }}
            >
              <Phone size={20} color="var(--accent-champagne-dark)" />
              <div style={{ textAlign: "left" }}>
                <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
                  Call Reception
                </span>
                <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>{clinic.displayPhone}</span>
              </div>
              <ArrowUpRight size={18} style={{ marginLeft: "auto" }} />
            </a>

            <a
              href="https://wa.me/917306308876"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
              style={{ justifyContent: "flex-start", height: "60px", paddingInline: "1.5rem" }}
            >
              <MessageCircle size={20} color="var(--accent-champagne-dark)" />
              <div style={{ textAlign: "left" }}>
                <span style={{ display: "block", fontSize: "0.7rem", letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--fg-muted)" }}>
                  WhatsApp Directly
                </span>
                <span style={{ fontSize: "1.1rem", fontWeight: 600 }}>Chat with Clinic</span>
              </div>
              <ArrowUpRight size={18} style={{ marginLeft: "auto" }} />
            </a>
          </div>

          <div style={{ marginTop: "3rem" }}>
            <Eyebrow>CLINIC LOCATION</Eyebrow>
            <p className="address-callout" style={{ marginTop: "0.75rem" }}>
              <strong>{clinic.name}</strong>
              <br />
              Near Erapund Juma Masjid, Madrassa Bazar
              <br />
              South Koduvally, Koduvally
              <br />
              Kerala 673572, India
            </p>

            <div style={{ display: "flex", gap: "1rem", marginTop: "1.25rem", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleCopyAddress}
                className="btn-secondary"
                style={{ height: "42px", paddingInline: "1.25rem", fontSize: "0.82rem" }}
              >
                {copied ? <Check size={15} /> : <Copy size={15} />}
                <span>{copied ? "Copied" : "Copy Address"}</span>
              </button>
              <a
                href={clinic.maps}
                target="_blank"
                rel="noopener noreferrer"
                className="text-action-link"
                style={{ fontSize: "0.85rem" }}
              >
                <MapPin size={16} /> Open Directions in Maps <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div style={{ marginTop: "2.5rem" }}>
            <Eyebrow>STUDIO HOURS</Eyebrow>
            <p style={{ marginTop: "0.5rem", fontSize: "1.05rem", fontWeight: 500 }}>
              {clinic.hours}
            </p>
            <span style={{ fontSize: "0.85rem", color: "var(--fg-muted)" }}>
              Monday through Saturday. Sunday closed.
            </span>
          </div>
        </div>

        {/* Consultation Enquiry Form Panel */}
        <div className="enquiry-card">
          <Eyebrow>CONSULTATION ENQUIRY</Eyebrow>
          <h2 className="display-card" style={{ margin: "0.75rem 0 0.5rem" }}>
            Plan your first visit.
          </h2>
          <p style={{ fontSize: "0.92rem", color: "var(--fg-secondary)", lineHeight: 1.6 }}>
            Submitting this form prepares a formatted message directly in WhatsApp. Our reception desk will promptly reply to confirm timing and answer any preliminary questions.
          </p>

          <form onSubmit={handleSubmit} className="enquiry-form-group">
            <label className="form-field-label">
              Patient Full Name *
              <input
                required
                autoComplete="name"
                maxLength={80}
                value={form.name}
                onChange={(e) => update("name", e.target.value)}
                placeholder="e.g. Fathima Rahman"
                className="form-field-input"
              />
            </label>

            <label className="form-field-label">
              Phone Number *
              <input
                required
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                value={form.phone}
                onChange={(e) => update("phone", e.target.value)}
                placeholder="+91 98765 43210"
                className="form-field-input"
                aria-invalid={!!phoneError}
              />
              {phoneError && (
                <span style={{ color: "#d94343", fontSize: "0.78rem" }}>{phoneError}</span>
              )}
            </label>

            <div className="form-grid-row">
              <label className="form-field-label">
                Preferred Date (Optional)
                <input
                  type="date"
                  min={new Date().toISOString().slice(0, 10)}
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className="form-field-input"
                />
              </label>

              <label className="form-field-label">
                Preferred Time (Optional)
                <select
                  value={form.time}
                  onChange={(e) => update("time", e.target.value)}
                  className="form-field-select"
                >
                  <option value="">Any time</option>
                  <option value="Morning (10:00 AM – 1:00 PM)">Morning (10 AM – 1 PM)</option>
                  <option value="Afternoon (1:00 PM – 4:00 PM)">Afternoon (1 PM – 4 PM)</option>
                  <option value="Evening (4:00 PM – 7:00 PM)">Evening (4 PM – 7 PM)</option>
                </select>
              </label>
            </div>

            <label className="form-field-label">
              Primary Treatment Interest
              <select
                value={form.interest}
                onChange={(e) => update("interest", e.target.value)}
                className="form-field-select"
              >
                <option value="">General Consultation & Checkup</option>
                {treatments.map((t) => (
                  <option key={t.slug} value={t.name}>
                    {t.name}
                  </option>
                ))}
              </select>
            </label>

            <label className="form-field-label">
              Anything specific you would like to discuss? (Optional)
              <textarea
                rows={3}
                maxLength={400}
                value={form.message}
                onChange={(e) => update("message", e.target.value)}
                placeholder="Mention any symptoms, past treatments, or questions..."
                className="form-field-textarea"
              />
            </label>

            <button type="submit" className="btn-primary" style={{ height: "50px", marginTop: "0.5rem" }}>
              <span>Continue to WhatsApp Booking</span>
              <ArrowUpRight size={17} />
            </button>

            {sent && (
              <div
                style={{
                  padding: "1rem",
                  backgroundColor: "var(--accent-champagne-light)",
                  borderRadius: "3px",
                  fontSize: "0.85rem",
                  color: "#161918",
                }}
              >
                ✓ WhatsApp has opened. Please send the message to initiate direct confirmation with our clinic staff.
              </div>
            )}
          </form>
        </div>
      </section>

      <LocationBlock />
    </main>
  );
}
