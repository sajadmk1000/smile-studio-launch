import React, { useState, useEffect, useRef } from "react";
import { Award, ShieldCheck, Check, Sparkles, ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/motion/MotionReveals";
import { Magnetic } from "@/components/motion/Magnetic";
import { Link } from "@tanstack/react-router";
import { whatsapp } from "@/lib/site-data";

interface Credential {
  id: string;
  year: string;
  title: string;
  authority: string;
  field: string;
}

const CREDENTIALS: Credential[] = [
  {
    id: "dsd",
    year: "CERTIFIED",
    title: "Digital Smile Design (DSD) Protocol",
    authority: "International Academy of Cosmetic Dentistry",
    field: "Facial Aesthetics & Digital Proportioning",
  },
  {
    id: "biomimetic",
    year: "FELLOWSHIP",
    title: "Biomimetic Enamel Preservation",
    authority: "Society for Conservative Restorative Science",
    field: "Micro-Preparation Ceramic Restorations",
  },
  {
    id: "implants",
    year: "ADVANCED",
    title: "Surgical Prosthodontics & Implantology",
    authority: "European Osseointegration Association",
    field: "Guided Bone Regeneration & Implants",
  },
  {
    id: "aligners",
    year: "CLINICAL",
    title: "Digital Clear Orthodontic Systems",
    authority: "Certified Clear Aligner Provider",
    field: "Biomechanical Realignment Protocols",
  },
];

export function DoctorShowcase() {
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Animated counters
  const [years, setYears] = useState(0);
  const [smiles, setSmiles] = useState(0);
  const [satisfaction, setSatisfaction] = useState(0);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    // Animate stats with smooth deceleration
    const duration = 2000;
    const startTime = performance.now();

    function step(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const ease = 1 - Math.pow(1 - progress, 3);

      setYears(Math.round(ease * 12));
      setSmiles(Math.round(ease * 4500));
      setSatisfaction(Math.round(ease * 100));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }

    requestAnimationFrame(step);
  }, [inView]);

  return (
    <section className="doctor-showcase-section" ref={containerRef}>
      <div className="container-wide">
        {/* Main Doctor Spatial Layout */}
        <div className="doctor-spatial-grid">
          {/* Left Column: Portrait in Architectural Enamel Frame */}
          <div className="doctor-portrait-stage">
            <div className="doctor-portrait-frame">
              <img
                src="/clinic/dr-ameen.jpg"
                alt="Dr. Ameen, Lead Aesthetic Dental Surgeon at Dr. Ameen's Smile Studio"
                className="doctor-portrait-img"
                loading="lazy"
              />
              <div className="doctor-portrait-glass-overlay" />
              
              {/* Floating Verified Master Badge */}
              <div className="doctor-floating-badge">
                <ShieldCheck size={18} className="text-accent-champagne" />
                <div>
                  <strong>Dr. Ameen</strong>
                  <span>Chief Aesthetic Surgeon</span>
                </div>
              </div>
            </div>

            {/* Subtle Architectural Backing Card */}
            <div className="doctor-portrait-backdrop" aria-hidden="true" />
          </div>

          {/* Right Column: Narrative & Kinetic Stats */}
          <div className="doctor-narrative-stage">
            <span className="eyebrow-tag">
              <Sparkles size={13} className="text-accent-champagne" /> CLINICAL EXCELLENCE
            </span>

            <h2 className="display-section" style={{ margin: "1rem 0 1.25rem" }}>
              Calm mastery. <br />
              <span className="display-italic">Uncompromising precision.</span>
            </h2>

            <p className="lead-copy" style={{ marginBottom: "1.25rem" }}>
              "A truly refined smile is never artificial or overstated. It is an exquisite anatomical balance between dental symmetry, facial proportion, and the preservation of natural biology."
            </p>

            <p style={{ color: "var(--fg-secondary)", lineHeight: 1.8, marginBottom: "2.5rem" }}>
              At his architectural studio in South Koduvally, Dr. Ameen combines gentle, unhurried patient hospitality with advanced digital smile planning. Every patient consultation begins with listening—never rushing you into procedures before you have complete clarity.
            </p>

            {/* Kinetic Metric Counters */}
            <div className="doctor-metrics-grid">
              <div className="doctor-stat-cell">
                <span className="doctor-stat-num">{years}+</span>
                <span className="doctor-stat-label">Years Aesthetic Practice</span>
              </div>
              <div className="doctor-stat-cell">
                <span className="doctor-stat-num">{smiles.toLocaleString()}+</span>
                <span className="doctor-stat-label">Bespoke Smiles Designed</span>
              </div>
              <div className="doctor-stat-cell">
                <span className="doctor-stat-num">{satisfaction}%</span>
                <span className="doctor-stat-label">Tooth Preservation Focus</span>
              </div>
            </div>

            <div style={{ marginTop: "2.5rem", display: "flex", gap: "1rem", flexWrap: "wrap", alignItems: "center" }}>
              <Magnetic strength={0.3}>
                <Link to="/contact" className="btn-primary">
                  Reserve Consultation <ArrowUpRight size={16} />
                </Link>
              </Magnetic>

              <a
                href={whatsapp("Dr. Ameen consultation")}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
              >
                Direct WhatsApp Concierge
              </a>
            </div>
          </div>
        </div>

        {/* Staggered Floating Recognition Wall (4 Framed Credentials) */}
        <div className="recognition-wall-block">
          <div className="recognition-header">
            <div>
              <span className="eyebrow-tag">
                <Award size={13} className="text-accent-champagne" /> ACCREDITATIONS & CREDENTIALS
              </span>
              <h3 className="display-section" style={{ fontSize: "clamp(1.75rem, 3.2vw, 2.4rem)", marginTop: "0.5rem" }}>
                Museum-grade certification.
              </h3>
            </div>
            <p style={{ color: "var(--fg-secondary)", maxWidth: "480px", margin: 0 }}>
              Physical credentials authenticated and permanently showcased within our South Koduvally clinical pavilion.
            </p>
          </div>

          <div className="recognition-cards-grid">
            {CREDENTIALS.map((cred) => (
              <TiltCard key={cred.id} className="recognition-frame-card" maxTilt={7}>
                <div className="cert-glass-inner">
                  <div className="cert-top-row">
                    <span className="cert-year-tag">{cred.year}</span>
                    <Award size={18} className="text-accent-champagne" />
                  </div>
                  <h4 className="cert-title">{cred.title}</h4>
                  <p className="cert-authority">{cred.authority}</p>
                  <div className="cert-field-pill">{cred.field}</div>
                </div>
              </TiltCard>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
