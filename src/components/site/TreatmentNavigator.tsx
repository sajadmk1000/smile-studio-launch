import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";
import { treatments, type Treatment } from "@/lib/site-data";

export function TreatmentNavigator() {
  const [activeTreatment, setActiveTreatment] = useState<Treatment>(treatments[0]);

  return (
    <div className="treatment-navigator-layout">
      {/* Left Column: Interactive Nav List */}
      <div className="treatment-nav-list" role="tablist" aria-label="Dental Treatment Areas">
        {treatments.map((treatment) => {
          const isActive = activeTreatment.slug === treatment.slug;
          return (
            <div
              key={treatment.slug}
              role="tab"
              aria-selected={isActive}
              tabIndex={0}
              className={`treatment-nav-item ${isActive ? "is-active" : ""}`}
              onMouseEnter={() => setActiveTreatment(treatment)}
              onFocus={() => setActiveTreatment(treatment)}
              onClick={() => setActiveTreatment(treatment)}
              style={{ cursor: "pointer" }}
            >
              <span className="index-num">{treatment.index}</span>
              <div>
                <strong>{treatment.name}</strong>
                <span className="t-short-desc">{treatment.short}</span>
              </div>
              <ArrowUpRight
                size={22}
                style={{
                  color: isActive ? "var(--accent-champagne-dark)" : "var(--fg-muted)",
                  transform: isActive ? "translate(3px, -3px)" : "none",
                  transition: "transform 0.2s, color 0.2s",
                }}
              />
            </div>
          );
        })}
      </div>

      {/* Right Column: Sticky Editorial Preview Card */}
      <div className="treatment-preview-card" aria-live="polite">
        <div className="treatment-preview-img-box">
          <picture>
            <source media="(max-width: 768px)" srcSet={activeTreatment.imageMobile} />
            <img
              key={activeTreatment.slug}
              src={activeTreatment.image}
              alt={`${activeTreatment.name} at Dr. Ameen's Smile Studio`}
              width={800}
              height={450}
              loading="lazy"
            />
          </picture>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: "0.5rem" }}>
          <div className="preview-card-index">{activeTreatment.index}</div>
          <span style={{ fontSize: "0.75rem", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--accent-botanical)", fontWeight: 600 }}>
            {activeTreatment.category}
          </span>
        </div>

        <h3 className="preview-card-title">{activeTreatment.name}</h3>
        <p className="preview-card-tagline">{activeTreatment.tagline}</p>
        <p className="preview-card-body">{activeTreatment.overview}</p>

        <h4 style={{ fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: "0.5rem" }}>
          Key Clinical Considerations:
        </h4>
        <ul className="preview-card-aspects">
          {activeTreatment.keyAspects.map((aspect) => (
            <li key={aspect}>{aspect}</li>
          ))}
        </ul>

        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <Link
            to="/treatments/$slug"
            params={{ slug: activeTreatment.slug }}
            className="btn-primary"
            style={{ height: "46px", paddingInline: "1.35rem" }}
          >
            Explore {activeTreatment.name} <ArrowUpRight size={16} />
          </Link>
          <Link
            to="/contact"
            search={{ interest: activeTreatment.name }}
            className="text-action-link"
          >
            Enquire about this care
          </Link>
        </div>
      </div>
    </div>
  );
}
