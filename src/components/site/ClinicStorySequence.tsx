import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { Link } from "@tanstack/react-router";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Compass,
  Sparkles,
} from "lucide-react";
import { media } from "@/lib/site-data";
import { Eyebrow } from "./Elements";

const AUTOPLAY_DURATION = 6500; // ms

const clinicSpaces = [
  {
    id: "arrival",
    index: "01",
    tag: "01 · ARRIVAL AT DUSK",
    tabLabel: "Arrival",
    category: "EXTERIOR SANCTUARY",
    title: "The Architectural Arrival",
    subtitle: "A soothing dusk arrival in South Koduvally",
    desc: "Warm 2700K ambient illumination, clean geometric lines, and a private paved courtyard welcoming you into a tranquil dental sanctuary away from street rush.",
    features: ["2700K Warm Signage", "Private Courtyard", "Street Separation"],
    desktopImg: media.exterior,
    mobileImg: media.exteriorMobile,
    alt: "Exterior facade of Dr. Ameen's Smile Studio in South Koduvally with illuminated entrance",
  },
  {
    id: "signage",
    index: "02",
    tag: "02 · THE GARDEN WALL",
    tabLabel: "Garden Wall",
    category: "BIOPHILIC FAÇADE",
    title: "Curved Fluting & Monogram",
    subtitle: "Organic forms that honor natural facial geometry",
    desc: "Architectural undulating wave fluting displaying the illuminated tooth emblem beside lush botanical planter beds and biophilic stone textures.",
    features: ["Undulating Wave Fluting", "Botanical Integration", "Backlit Monogram"],
    desktopImg: media.signage,
    mobileImg: media.signageMobile,
    alt: "Illuminated Dr. Ameen's Smile Studio tooth monogram on curved garden wall",
  },
  {
    id: "reception",
    index: "03",
    tag: "03 · CONSULTATION FOYER",
    tabLabel: "Reception",
    category: "WELCOMING FOYER",
    title: "Consultation & Reception",
    subtitle: "Hospitality and calm, without medical barriers",
    desc: "Warm ambient pendants, natural stone finishes, and a barrier-free travertine consultation desk designed for unhurried, comfortable conversations.",
    features: ["Natural Travertine", "Barrier-Free Desk", "Warm Amber Pendants"],
    desktopImg: media.reception,
    mobileImg: media.receptionMobile,
    alt: "Reception desk with warm lighting and framed wall certificates",
  },
  {
    id: "waiting",
    index: "04",
    tag: "04 · PATIENT LOUNGE",
    tabLabel: "The Lounge",
    category: "RELAXATION SUITE",
    title: "Garden-Facing Sanctuary",
    subtitle: "Unhurried relaxation before your consultation",
    desc: "Handcrafted camel leather seating overlooking mature street foliage through floor-to-ceiling acoustic glass for peaceful relaxation.",
    features: ["Camel Leather Lounges", "Mature Tree Canopy", "Acoustic Glazing"],
    desktopImg: media.waiting,
    mobileImg: media.waitingMobile,
    alt: "Patient lounge with leather seating and view of street trees",
  },
  {
    id: "operatory",
    index: "05",
    tag: "05 · THE OPERATORY",
    tabLabel: "Operatory",
    category: "CLINICAL OPERATORY",
    title: "Precision & Garden View",
    subtitle: "Advanced care bathed in calming daylight",
    desc: "An ergonomic dental suite positioned directly before lush green foliage, pairing hospital-grade sterilization with peaceful natural daylight.",
    features: ["Garden Window Vista", "Ultra-Ergonomic Chair", "Hospital-Grade Hygiene"],
    desktopImg: media.treatmentRoom,
    mobileImg: media.treatmentRoomMobile,
    alt: "Operatory dental chair and cabinetry overlooking garden foliage",
  },
];

export function ClinicStorySequence() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 38,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isInView, setIsInView] = useState(false);
  const [timerKey, setTimerKey] = useState(0);
  const tabsNavRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Track if carousel section is visible on screen
  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry?.isIntersecting ?? false);
      },
      { threshold: 0.1 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    const snap = emblaApi.selectedScrollSnap();
    setSelectedIndex(snap);
    setTimerKey((k) => k + 1); // Reset the CSS progress bar animation
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("reInit", onSelect);
    };
  }, [emblaApi, onSelect]);

  // Center active tab strictly within the horizontal dock container WITHOUT touching window scroll
  useEffect(() => {
    const container = tabsNavRef.current;
    if (!container) return;
    const activeTab = container.children[selectedIndex] as HTMLElement | undefined;
    if (activeTab) {
      const scrollLeft =
        activeTab.offsetLeft - (container.clientWidth - activeTab.clientWidth) / 2;
      container.scrollTo({
        left: scrollLeft,
        behavior: "smooth",
      });
    }
  }, [selectedIndex]);

  // Autoplay management: only active when carousel is visible on screen
  useEffect(() => {
    if (!emblaApi || !isAutoplay || !isInView) {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
      return;
    }

    const isReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReduced) return;

    autoplayTimerRef.current = setTimeout(() => {
      emblaApi.scrollNext();
    }, AUTOPLAY_DURATION);

    return () => {
      if (autoplayTimerRef.current) clearTimeout(autoplayTimerRef.current);
    };
  }, [emblaApi, isAutoplay, isInView, selectedIndex]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  // Keyboard navigation active only when carousel is visible in viewport
  useEffect(() => {
    if (!isInView) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }
      if (e.key === "ArrowLeft") {
        scrollPrev();
      } else if (e.key === "ArrowRight") {
        scrollNext();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isInView, scrollPrev, scrollNext]);

  return (
    <section
      ref={sectionRef}
      className="apple-walkthrough-section"
      id="clinic-spaces"
      aria-label="Apple-grade Studio Walkthrough Carousel"
    >
      {/* Ambient Architectural Atmospheric Glow */}
      <div className="apple-walkthrough-ambient" aria-hidden="true" />

      <div className="container-wide">
        {/* Editorial Header */}
        <div className="apple-walkthrough-header">
          <div className="apple-header-left">
            <div className="apple-section-eyebrow">
              <span className="apple-numeral-pill">02</span>
              <Eyebrow>PHYSICAL ENVIRONMENT · ARCHITECTURE</Eyebrow>
            </div>
            <h2 className="display-section apple-walkthrough-title">
              A space shaped to make <br />
              <span className="display-italic">every visit tranquil.</span>
            </h2>
          </div>

          <div className="apple-header-right">
            <p className="apple-lead-text">
              We designed Dr. Ameen&apos;s Smile Studio to feel unlike a sterile clinic. From the undulating fluted wave facade to the garden-facing operatory suite, every corner is oriented towards serenity and unhurried medical clarity.
            </p>
            <div className="apple-header-actions">
              <Link to="/gallery" className="apple-gallery-link">
                <span>View Full Architectural Gallery</span>
                <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>

        {/* 2026 Apple VisionOS Floating Frosted Glass Dock */}
        <div className="apple-dock-wrapper">
          <nav
            ref={tabsNavRef}
            className="apple-glass-dock"
            aria-label="Studio Walkthrough Space Selector"
          >
            {clinicSpaces.map((space, idx) => {
              const isActive = selectedIndex === idx;
              return (
                <button
                  key={space.id}
                  type="button"
                  onClick={() => scrollTo(idx)}
                  className={`apple-dock-item ${isActive ? "is-active" : ""}`}
                  aria-current={isActive ? "true" : "false"}
                  aria-label={`Jump to space ${space.index}: ${space.title}`}
                >
                  <span className="apple-dock-index">{space.index}</span>
                  <span className="apple-dock-label">{space.tabLabel}</span>
                  {isActive && <span className="apple-dock-active-glow" aria-hidden="true" />}
                </button>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Main Apple Spatial Carousel Stage */}
      <div
        className="apple-carousel-stage"
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        onTouchStart={() => setIsAutoplay(false)}
        onTouchEnd={() => setIsAutoplay(true)}
      >
        <div className="embla-apple-viewport" ref={emblaRef}>
          <div className="embla-apple-container">
            {clinicSpaces.map((space, index) => {
              const isSelected = selectedIndex === index;
              return (
                <div
                  key={space.id}
                  className={`embla-apple-slide ${isSelected ? "is-selected" : "is-peeking"}`}
                  role="group"
                  aria-roledescription="slide"
                  aria-label={`${index + 1} of ${clinicSpaces.length}: ${space.title}`}
                  onClick={() => !isSelected && scrollTo(index)}
                >
                  <div className="apple-card-surface">
                    {/* Architectural Image with Adaptive Mobile Crop */}
                    <picture>
                      <source media="(max-width: 768px)" srcSet={space.mobileImg} />
                      <img
                        src={space.desktopImg}
                        alt={space.alt}
                        className="apple-card-image"
                        loading={index < 2 ? "eager" : "lazy"}
                      />
                    </picture>

                    {/* Specular Rim Highlight & Subtle Atmospheric Vignette */}
                    <div className="apple-card-specular-rim" />
                    <div className="apple-card-gradient-scrim" />

                    {/* Floating Apple-style Frosted Architectural Information Plaque */}
                    <div className="apple-spatial-plaque">
                      <div className="apple-plaque-glass">
                        <div className="apple-plaque-top-row">
                          <span className="apple-plaque-badge">
                            <Sparkles size={11} className="text-accent-champagne" />
                            <span>{space.tag}</span>
                          </span>
                          <span className="apple-plaque-category">{space.category}</span>
                        </div>

                        <h3 className="apple-plaque-title">{space.title}</h3>
                        <p className="apple-plaque-desc">{space.desc}</p>

                        {/* Spatial Feature Micro-Pills */}
                        <div className="apple-plaque-chips">
                          {space.features.map((feature) => (
                            <span key={feature} className="apple-feature-chip">
                              <span className="apple-chip-dot" />
                              {feature}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Floating Glass Navigation Arrows directly over the Carousel Edge */}
        <div className="apple-floating-nav-arrows" aria-hidden="true">
          <button
            type="button"
            className="apple-nav-chevron is-prev"
            onClick={scrollPrev}
            aria-label="Previous architectural space"
          >
            <ArrowLeft size={20} />
          </button>
          <button
            type="button"
            className="apple-nav-chevron is-next"
            onClick={scrollNext}
            aria-label="Next architectural space"
          >
            <ArrowRight size={20} />
          </button>
        </div>
      </div>

      {/* Segmented Story Progress Bar & Interactive Controller Dock */}
      <div className="container-wide">
        <div className="apple-bottom-controls">
          {/* 5 Segmented Apple Progress Bars */}
          <div
            className="apple-segmented-track"
            role="tablist"
            aria-label="Slide progress segments"
          >
            {clinicSpaces.map((space, idx) => {
              const isPassed = idx < selectedIndex;
              const isCurrent = idx === selectedIndex;
              return (
                <button
                  key={space.id}
                  type="button"
                  className={`apple-segment-pill ${
                    isCurrent ? "is-current" : isPassed ? "is-passed" : ""
                  }`}
                  onClick={() => scrollTo(idx)}
                  aria-label={`Jump to slide ${space.index}: ${space.title}`}
                >
                  <span className="apple-segment-bar-bg">
                    {isCurrent ? (
                      <span
                        key={timerKey}
                        className={`apple-segment-fill is-animating ${
                          !isAutoplay || !isInView ? "is-paused" : ""
                        }`}
                        style={{
                          animationDuration: `${AUTOPLAY_DURATION}ms`,
                        }}
                      />
                    ) : isPassed ? (
                      <span className="apple-segment-fill is-full" />
                    ) : null}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Minimalist Architectural Fraction Counter */}
          <div className="apple-status-cluster">
            <div className="apple-fraction-display" aria-live="polite">
              <span className="apple-fraction-current">0{selectedIndex + 1}</span>
              <span className="apple-fraction-divider">/</span>
              <span className="apple-fraction-total">0{clinicSpaces.length}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
