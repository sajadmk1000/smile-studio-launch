import React, { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  ArrowRight,
  Copy,
  Check,
  MapPin,
  Clock,
  Phone,
  MessageCircle,
} from "lucide-react";
import { clinic, whatsapp, type Treatment } from "@/lib/site-data";

export function Eyebrow({
  children,
  light = false,
}: {
  children: React.ReactNode;
  light?: boolean;
}) {
  return <p className={`eyebrow-tag ${light ? "light" : ""}`}>{children}</p>;
}

export function SectionHeading({
  index,
  label,
  title,
  copy,
  light = false,
}: {
  index?: string;
  label: string;
  title: React.ReactNode;
  copy?: React.ReactNode;
  light?: boolean;
}) {
  return (
    <div style={{ marginBottom: "clamp(2.5rem, 5vw, 4rem)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "1rem" }}>
        {index && <span className="index-num">{index}</span>}
        <Eyebrow light={light}>{label}</Eyebrow>
      </div>
      <h2 className="display-section" style={{ color: light ? "var(--fg-inverse)" : "var(--fg-primary)" }}>
        {title}
      </h2>
      {copy && (
        <p
          className="lead-copy"
          style={{
            marginTop: "1.25rem",
            maxWidth: "680px",
            color: light ? "var(--fg-inverse-muted)" : "var(--fg-secondary)",
          }}
        >
          {copy}
        </p>
      )}
    </div>
  );
}

export function BookingLinks({
  interest,
  light = false,
}: {
  interest?: string;
  light?: boolean;
}) {
  return (
    <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: "1.25rem" }}>
      <Link
        to="/contact"
        search={{ interest: interest ?? "" }}
        className="btn-primary"
      >
        Book a Consultation <ArrowUpRight size={17} />
      </Link>
      <a
        className="text-action-link"
        style={{ color: light ? "var(--fg-inverse)" : "var(--fg-primary)" }}
        href={whatsapp(interest)}
        target="_blank"
        rel="noopener noreferrer"
      >
        <MessageCircle size={17} />
        <span>WhatsApp Studio</span>
      </a>
    </div>
  );
}

export function LocationBlock() {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(clinic.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <section className="section-location" id="location">
      <div className="container-wide location-layout">
        <div className="location-details-box">
          <div>
            <Eyebrow>VISIT & DIRECTIONS</Eyebrow>
            <h2 className="display-section" style={{ margin: "1rem 0" }}>
              Close to home. <br />
              <span className="display-italic">Easy to find.</span>
            </h2>
          </div>

          <p className="address-callout">
            <strong>Dr. Ameen&apos;s Smile Studio</strong>
            <br />
            Near Erapund Juma Masjid, Madrassa Bazar
            <br />
            South Koduvally, Koduvally
            <br />
            Kozhikode District, Kerala 673572
          </p>

          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={handleCopy}
              className="btn-secondary"
              style={{ paddingInline: "1.25rem", height: "46px" }}
            >
              {copied ? <Check size={16} /> : <Copy size={16} />}
              <span>{copied ? "Address Copied" : "Copy Address"}</span>
            </button>

            <a
              href={clinic.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{ paddingInline: "1.25rem", height: "46px" }}
            >
              <MapPin size={16} />
              <span>Get Directions</span>
              <ArrowUpRight size={15} />
            </a>
          </div>

          <div className="hours-badge">
            <Clock size={16} color="var(--accent-champagne-dark)" />
            <span>{clinic.hours} (Mon–Sat)</span>
          </div>
        </div>

        {/* Minimalist Architectural Map Graphic */}
        <a
          href={clinic.maps}
          target="_blank"
          rel="noopener noreferrer"
          className="map-architectural-frame"
          aria-label="Open directions to Dr. Ameen's Smile Studio in Google Maps"
        >
          <div className="map-grid-lines" />
          <div className="map-road-strip road-a" />
          <div className="map-road-strip road-b" />
          <div className="map-marker-pin">
            <span>✳</span>
            <strong>Dr. Ameen&apos;s Smile Studio</strong>
            <small>South Koduvally · Madrassa Bazar</small>
            <div style={{ marginTop: "0.75rem", fontSize: "0.75rem", color: "var(--accent-champagne)", display: "flex", alignItems: "center", justifyContent: "center", gap: "0.35rem" }}>
              Click to Open Maps <ArrowRight size={14} />
            </div>
          </div>
        </a>
      </div>
    </section>
  );
}

export function FAQList({
  items,
  faqs,
}: {
  items?: { q: string; a: string }[];
  faqs?: { q: string; a: string }[];
}) {
  const list = items || faqs || [];
  return (
    <div className="faq-accordion">
      {list.map((item, index) => (
        <details key={item.q} className="faq-accordion-item">
          <summary className="faq-accordion-summary">
            <span className="index-num">0{index + 1}</span>
            <span>{item.q}</span>
            <span className="faq-accordion-plus">+</span>
          </summary>
          <p className="faq-accordion-content">{item.a}</p>
        </details>
      ))}
    </div>
  );
}

export function ContactBand() {
  return (
    <section className="section-final-cta">
      <div className="container-wide final-cta-layout">
        <div className="final-cta-text">
          <Eyebrow light>THE NEXT STEP</Eyebrow>
          <h2 className="display-section" style={{ color: "var(--fg-inverse)", marginTop: "1rem" }}>
            Let&apos;s begin with <br />
            <span className="display-italic">a conversation.</span>
          </h2>
          <p>
            Whether you are considering cosmetic refinement or have an immediate dental question, Dr. Ameen and our team are here to help you decide with clarity.
          </p>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem", alignItems: "flex-start" }}>
          <BookingLinks light />
          <a
            href={`tel:${clinic.tel}`}
            style={{
              color: "var(--fg-inverse-muted)",
              fontSize: "0.9rem",
              display: "inline-flex",
              alignItems: "center",
              gap: "0.5rem",
              marginTop: "0.5rem",
            }}
          >
            <Phone size={15} /> Direct Reception: {clinic.displayPhone}
          </a>
        </div>
      </div>
    </section>
  );
}

export function PageIntro({
  label,
  title,
  copy,
}: {
  label: string;
  title: React.ReactNode;
  copy: string;
}) {
  return (
    <section className="page-header-intro container-wide">
      <Eyebrow>{label}</Eyebrow>
      <h1 className="display-section">{title}</h1>
      <p className="lead-copy" style={{ maxWidth: "720px", marginTop: "1rem" }}>
        {copy}
      </p>
    </section>
  );
}

export function TreatmentList({ items }: { items: Treatment[] }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", borderTop: "1px solid var(--border-medium)" }}>
      {items.map((t, i) => (
        <Link
          key={t.slug}
          to="/treatments/$slug"
          params={{ slug: t.slug }}
          className="treatment-nav-item"
        >
          <span className="index-num">0{i + 1}</span>
          <div>
            <strong>{t.name}</strong>
            <span className="t-short-desc">{t.short}</span>
          </div>
          <ArrowUpRight size={22} color="var(--accent-champagne-dark)" />
        </Link>
      ))}
    </div>
  );
}
