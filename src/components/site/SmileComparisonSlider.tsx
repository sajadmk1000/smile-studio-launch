import React, { useState, useRef, useCallback } from "react";
import { Sparkles, ArrowLeftRight, CheckCircle2 } from "lucide-react";

interface CaseItem {
  id: string;
  title: string;
  category: string;
  description: string;
  beforeImg: string;
  afterImg: string;
  metrics: string[];
}

const CASES: CaseItem[] = [
  {
    id: "veneers-case",
    title: "Bespoke Biomimetic Porcelain Veneers",
    category: "Aesthetic Alignment & Enamel Luminosity",
    description: "Correction of mild incisal edge irregularities, anatomical proportions, and multi-layered natural tooth translucency.",
    beforeImg: "/clinic/cases/case1-before.jpg",
    afterImg: "/clinic/cases/case1-after.jpg",
    metrics: ["0.3mm Minimal Prep", "Handcrafted Feldspathic", "True Enamel Light Transmittance"],
  },
];

export function SmileComparisonSlider() {
  const [sliderPos, setSliderPos] = useState(50); // percentage 0-100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const activeCase = CASES[0];

  const handleMove = useCallback((clientX: number) => {
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percent = Math.max(3, Math.min(97, (x / rect.width) * 100));
    setSliderPos(percent);
  }, []);

  const onPointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    handleMove(e.clientX);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      e.currentTarget.releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <section className="smile-slider-section">
      <div className="container-wide">
        {/* Section Header */}
        <div className="slider-header-row">
          <div>
            <span className="eyebrow-tag light">
              <Sparkles size={13} className="text-accent-champagne" /> SMILE TRANSFORMATIONS
            </span>
            <h2 className="display-section" style={{ color: "var(--fg-inverse)", marginTop: "0.75rem" }}>
              The Royal Silk <br />
              <span className="display-italic">transformation reveal.</span>
            </h2>
          </div>
          <p className="lead-copy" style={{ color: "var(--fg-inverse-muted)", maxWidth: "540px" }}>
            Experience the precision of biomimetic smile designing. Glide the beam of light to witness seamless anatomical balance, true tooth translucency, and natural harmony.
          </p>
        </div>

        {/* Comparison Stage */}
        <div className="slider-interactive-stage">
          <div
            ref={containerRef}
            className={`slider-viewport ${isDragging ? "is-dragging" : ""}`}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            role="slider"
            aria-label="Comparison slider between before and after smile treatment"
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={0}
            aria-valuemax={100}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === "ArrowLeft") setSliderPos((p) => Math.max(5, p - 5));
              if (e.key === "ArrowRight") setSliderPos((p) => Math.min(95, p + 5));
            }}
          >
            {/* After Image (Background Full) */}
            <img
              src={activeCase.afterImg}
              alt="After: Radiant natural smile with bespoke porcelain veneers"
              className="slider-img slider-img-after"
              loading="lazy"
              draggable={false}
            />

            {/* Before Image (Clipped) */}
            <div
              className="slider-before-clip"
              style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
            >
              <img
                src={activeCase.beforeImg}
                alt="Before: Natural smile prior to porcelain veneer treatment"
                className="slider-img slider-img-before"
                loading="lazy"
                draggable={false}
              />
            </div>

            {/* The Beam of Pure Light Divider */}
            <div
              className="slider-light-beam"
              style={{ left: `${sliderPos}%` }}
              aria-hidden="true"
            >
              <div className="beam-glow-line" />
              <div className="beam-handle-orb">
                <ArrowLeftRight size={14} />
              </div>
            </div>

            {/* Badges on Top */}
            <div className="slider-label-pill label-before">Natural Baseline</div>
            <div className="slider-label-pill label-after">Artisan Veneers</div>
          </div>

          {/* Clinical Case Specification Card */}
          <div className="slider-case-details-card">
            <div className="case-card-header">
              <span className="case-id-tag">CASE SPECIFICATION · 01</span>
              <h3 className="case-card-title">{activeCase.title}</h3>
              <p className="case-card-desc">{activeCase.description}</p>
            </div>

            <div className="case-metrics-list">
              {activeCase.metrics.map((m, idx) => (
                <div key={idx} className="case-metric-item">
                  <CheckCircle2 size={16} className="text-accent-champagne" />
                  <span>{m}</span>
                </div>
              ))}
            </div>

            <div className="case-footer-action">
              <span className="case-hint">Drag beam horizontally to inspect enamel anatomy</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
