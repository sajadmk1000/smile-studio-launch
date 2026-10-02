import { useState, useEffect, useCallback, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeft, ArrowRight, Pause, Play, Compass } from "lucide-react";
import { media } from "@/lib/site-data";
import { Eyebrow } from "./Elements";

export function ClinicStorySequence() {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: "center",
    skipSnaps: false,
    duration: 35,
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const autoplayTimerRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    {
      id: "arrival",
      stepNum: "01",
      tag: "01 · ARRIVAL AT DUSK",
      tabLabel: "01 Arrival",
      title: "The Architectural Arrival",
      desc: "Warm lighting, clean geometric lines, and a paved courtyard welcoming you into South Koduvally.",
      desktopImg: media.exterior,
      mobileImg: media.exteriorMobile,
      alt: "Exterior facade of Dr. Ameen's Smile Studio in South Koduvally with illuminated entrance",
    },
    {
      id: "signage",
      stepNum: "02",
      tag: "02 · THE GARDEN WALL",
      tabLabel: "02 Garden Wall",
      title: "Curved Fluting & Monogram",
      desc: "Architectural white fluting displaying the illuminated tooth emblem beside lush botanical planter beds.",
      desktopImg: media.signage,
      mobileImg: media.signageMobile,
      alt: "Illuminated Dr. Ameen's Smile Studio tooth monogram on curved garden wall",
    },
    {
      id: "reception",
      stepNum: "03",
      tag: "03 · CONSULTATION RECEPTION",
      tabLabel: "03 Reception",
      title: "The Greeting & Consultation Desk",
      desc: "Warm ambient pendants, natural stone finishes, and a calm, quiet reception desk designed without clinical barriers.",
      desktopImg: media.reception,
      mobileImg: media.receptionMobile,
      alt: "Reception desk with warm lighting and framed wall certificates",
    },
    {
      id: "waiting",
      stepNum: "04",
      tag: "04 · THE LOUNGE",
      tabLabel: "04 The Lounge",
      title: "Garden-Facing Relaxation",
      desc: "Comfortable leather seating overlooking the street trees through expansive full-height glass.",
      desktopImg: media.waiting,
      mobileImg: media.waitingMobile,
      alt: "Patient lounge with leather seating and view of street trees",
    },
    {
      id: "operatory",
      stepNum: "05",
      tag: "05 · THE OPERATORY",
      tabLabel: "05 Operatory",
      title: "Precision & Garden View",
      desc: "An ergonomic dental treatment suite bathed in tranquil natural light from the surrounding garden tree canopy.",
      desktopImg: media.treatmentRoom,
      mobileImg: media.treatmentRoomMobile,
      alt: "Operatory dental chair and cabinetry overlooking garden foliage",
    },
  ];

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  const onScroll = useCallback(() => {
    if (!emblaApi) return;
    const progress = Math.max(0, Math.min(1, emblaApi.scrollProgress()));
    setScrollProgress(progress * 100);
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    onScroll();
    emblaApi.on("select", onSelect);
    emblaApi.on("scroll", onScroll);
    emblaApi.on("reInit", onSelect);
    emblaApi.on("reInit", onScroll);

    return () => {
      emblaApi.off("select", onSelect);
      emblaApi.off("scroll", onScroll);
    };
  }, [emblaApi, onSelect, onScroll]);

  // Autoplay functionality with smooth pause/resume
  useEffect(() => {
    if (!emblaApi || !isAutoplay) {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
      return;
    }

    const isReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isReducedMotion) return;

    autoplayTimerRef.current = setInterval(() => {
      emblaApi.scrollNext();
    }, 5500);

    return () => {
      if (autoplayTimerRef.current) clearInterval(autoplayTimerRef.current);
    };
  }, [emblaApi, isAutoplay]);

  const scrollPrev = useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev();
  }, [emblaApi]);

  const scrollNext = useCallback(() => {
    if (emblaApi) emblaApi.scrollNext();
  }, [emblaApi]);

  const scrollTo = useCallback(
    (index: number) => {
      if (emblaApi) emblaApi.scrollTo(index);
    },
    [emblaApi]
  );

  return (
    <section className="carousel-walkthrough-section" id="clinic-spaces" aria-label="Studio Walkthrough Carousel">
      <div className="container-wide">
        {/* Header Row: Title & Top Controls */}
        <div className="carousel-header-row">
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", marginBottom: "0.85rem" }}>
              <span className="index-num">02</span>
              <Eyebrow>PHYSICAL ENVIRONMENT</Eyebrow>
            </div>
            <h2 className="display-section">
              A space shaped to make <br />
              <span className="display-italic">every visit tranquil.</span>
            </h2>
            <p className="lead-copy" style={{ maxWidth: "660px", marginTop: "1rem" }}>
              We designed Dr. Ameen&apos;s Smile Studio to feel unlike a sterile clinic. From the garden wall to the operatory suite, every corner is oriented towards serenity.
            </p>
          </div>

          {/* Desktop Direct Arrow Buttons & Fraction */}
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <div className="carousel-counter-fraction" aria-live="polite">
              <span className="current">0{selectedIndex + 1}</span>
              <span className="total">/ 0{steps.length}</span>
            </div>

            <div className="carousel-arrow-buttons">
              <button
                type="button"
                className="carousel-circle-btn"
                onClick={scrollPrev}
                aria-label="Previous space"
              >
                <ArrowLeft size={18} />
              </button>
              <button
                type="button"
                className="carousel-circle-btn"
                onClick={scrollNext}
                aria-label="Next space"
              >
                <ArrowRight size={18} />
              </button>
            </div>
          </div>
        </div>

        {/* Stepped Architectural Tabs */}
        <nav className="carousel-nav-tabs" aria-label="Walkthrough Slide Selector">
          {steps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              className={`carousel-tab-btn ${selectedIndex === idx ? "is-active" : ""}`}
              onClick={() => scrollTo(idx)}
              aria-current={selectedIndex === idx ? "true" : "false"}
            >
              {step.tabLabel}
            </button>
          ))}
        </nav>
      </div>

      {/* Main Embla Carousel Viewport */}
      <div
        className="embla-walkthrough"
        ref={emblaRef}
        onMouseEnter={() => setIsAutoplay(false)}
        onMouseLeave={() => setIsAutoplay(true)}
        onTouchStart={() => setIsAutoplay(false)}
        onTouchEnd={() => setIsAutoplay(true)}
      >
        <div className="embla-walkthrough__container">
          {steps.map((step, index) => {
            const isSelected = selectedIndex === index;
            return (
              <div
                key={step.id}
                className={`embla-walkthrough__slide ${isSelected ? "is-selected" : ""}`}
                role="group"
                aria-roledescription="slide"
                aria-label={`${index + 1} of ${steps.length}: ${step.title}`}
              >
                <div className="embla-slide-inner">
                  <picture>
                    <source media="(max-width: 768px)" srcSet={step.mobileImg} />
                    <img
                      src={step.desktopImg}
                      alt={step.alt}
                      className="embla-slide-image"
                      loading={index < 2 ? "eager" : "lazy"}
                    />
                  </picture>
                  <div className="embla-slide-scrim" />

                  <div className="embla-slide-content">
                    <span className="embla-slide-tag">
                      <Compass size={13} /> {step.tag}
                    </span>
                    <h3 className="embla-slide-title">{step.title}</h3>
                    <p className="embla-slide-desc">{step.desc}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Interactive Progress & Controls */}
      <div className="container-wide">
        <div className="carousel-controls-bar">
          <div className="carousel-progress-track" aria-hidden="true">
            <div
              className="carousel-progress-bar"
              style={{
                width: `${((selectedIndex + 1) / steps.length) * 100}%`,
              }}
            />
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              type="button"
              onClick={() => setIsAutoplay(!isAutoplay)}
              style={{
                fontSize: "0.75rem",
                color: "var(--fg-muted)",
                display: "inline-flex",
                alignItems: "center",
                gap: "0.35rem",
                cursor: "pointer",
              }}
              aria-label={isAutoplay ? "Pause carousel rotation" : "Play carousel rotation"}
            >
              {isAutoplay ? <Pause size={14} /> : <Play size={14} />}
              <span>{isAutoplay ? "Auto-playing" : "Paused"}</span>
            </button>
            <span style={{ fontSize: "0.75rem", color: "var(--fg-muted)" }}>
              Drag or swipe to explore
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
