import React, { useState, useRef } from "react";
import { Cpu, Scan, Layers, Microscope, ArrowUpRight } from "lucide-react";
import { TiltCard } from "@/components/motion/MotionReveals";

interface TechItem {
  id: string;
  badge: string;
  title: string;
  metric: string;
  copy: string;
  image: string;
  specs: string[];
}

const TECH_ITEMS: TechItem[] = [
  {
    id: "scanner",
    badge: "OPTICAL PHOTOGRAMMETRY · 01",
    title: "Sub-Micron 3D Digital Intraoral Scanning",
    metric: "15 µm Precision",
    copy: "High-speed continuous optical capture creates a live, distortion-free 3D digital model of your teeth in seconds—rendering messy impression putty completely obsolete.",
    image: "/clinic/tech/scanner.jpg",
    specs: ["Zero Gag Reflex Trays", "Instant Diagnostic Color Map", "Direct CAD/CAM Integration"],
  },
  {
    id: "cbct",
    badge: "VOLUMETRIC RADIOGRAPHY · 02",
    title: "Low-Dose 3D Cone Beam Computed Tomography",
    metric: "3D Jaw Mapping",
    copy: "Sub-millimeter volumetric diagnostics visualize underlying bone morphology, mandibular nerve positions, and root canals in true three dimensions for predictable surgery.",
    image: "/clinic/tech/cbct.jpg",
    specs: ["Up to 80% Lower Radiation", "Micron Bone Density Analysis", "Guided Implant Placement"],
  },
  {
    id: "porcelain",
    badge: "BIOMIMETIC RESTORATION · 03",
    title: "Micro-Layered Feldspathic Ceramic Science",
    metric: "True Enamel Translucency",
    copy: "Handcrafted biocompatible porcelain matched anatomically to your adjacent natural teeth, perfectly capturing specular highlights, opalescence, and natural durability.",
    image: "/clinic/tech/porcelain.jpg",
    specs: ["Multi-Layer Opalescent Shades", "Biocompatible Ceramic Bonds", "Decade+ Aesthetic Longevity"],
  },
];

export function TechCarousel() {
  const [activeTab, setActiveTab] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  return (
    <section className="tech-science-section">
      <div className="container-wide">
        {/* Section Heading */}
        <div className="tech-header-row">
          <div>
            <span className="eyebrow-tag light">
              <Cpu size={14} className="text-accent-champagne" /> ADVANCED CLINICAL TECHNOLOGY
            </span>
            <h2 className="display-section" style={{ color: "var(--fg-inverse)", marginTop: "0.85rem" }}>
              The 3D Science of <br />
              <span className="display-italic">celestial precision.</span>
            </h2>
          </div>
          <p className="lead-copy" style={{ color: "var(--fg-inverse-muted)", maxWidth: "560px" }}>
            Behind every serene appointment lies medical-grade digital engineering. We invest in top-tier European & Japanese imaging systems to deliver painless, millimeter-precise clinical outcomes.
          </p>
        </div>

        {/* Tab Selector for Quick Filtering */}
        <div className="tech-nav-pills" role="tablist">
          {TECH_ITEMS.map((item, idx) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={activeTab === idx}
              className={`tech-nav-pill ${activeTab === idx ? "is-active" : ""}`}
              onClick={() => setActiveTab(idx)}
            >
              <span>0{idx + 1}</span>
              {item.title.split(" ")[0]} {item.title.split(" ")[1]}
            </button>
          ))}
        </div>

        {/* 3D Interactive Tech Grid */}
        <div className="tech-cards-grid" ref={trackRef}>
          {TECH_ITEMS.map((item, idx) => {
            const isSelected = activeTab === idx;
            return (
              <TiltCard key={item.id} className={`tech-interactive-card ${isSelected ? "is-focused" : ""}`} maxTilt={6}>
                {/* Media Stage with Laser Scan Animation */}
                <div className="tech-card-media-stage">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="tech-card-image"
                    loading="lazy"
                  />
                  {/* Cyan Laser Micro-Scanning Pulse Line */}
                  <div className="laser-scanner-line" aria-hidden="true" />
                  
                  {/* Floating Metric Pill */}
                  <div className="tech-metric-float-pill">
                    <Scan size={14} className="text-cyan-glow" />
                    <span>{item.metric}</span>
                  </div>
                </div>

                {/* Content Body */}
                <div className="tech-card-content">
                  <span className="tech-badge-code">{item.badge}</span>
                  <h3 className="tech-card-title">{item.title}</h3>
                  <p className="tech-card-copy">{item.copy}</p>

                  <div className="tech-specs-pills">
                    {item.specs.map((spec, sIdx) => (
                      <span key={sIdx} className="tech-spec-item">
                        {spec}
                      </span>
                    ))}
                  </div>
                </div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
