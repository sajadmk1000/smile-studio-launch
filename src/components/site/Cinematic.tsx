import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, MessageCircle } from "lucide-react";
import { media, clinic, whatsapp } from "@/lib/site-data";

export function CinematicHero() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    const video = videoRef.current;
    if (!video) return;

    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    const handleCanPlay = () => {
      setVideoLoaded(true);
      video.play().catch(() => {
        // Autoplay may be deferred until user interaction on strict browsers
      });
    };

    if (video.readyState >= 3) {
      handleCanPlay();
    } else {
      video.addEventListener("canplaythrough", handleCanPlay);
      video.addEventListener("canplay", handleCanPlay);
    }

    return () => {
      video.removeEventListener("canplaythrough", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, []);

  return (
    <section
      className={`hero-cinematic ${videoLoaded ? "video-ready" : ""}`}
      aria-label="Welcome to Dr. Ameen's Smile Studio"
    >
      <div className="hero-video-wrapper">
        {/* Instant high-resolution poster frame prevents any blank flash */}
        <img
          src={media.heroPoster}
          alt="Exterior and consultation suite of Dr. Ameen's Smile Studio"
          className="hero-poster"
          loading="eager"
          fetchPriority="high"
        />

        {/* Cinematic Walkthrough Video */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            className="hero-video"
            muted
            playsInline
            loop
            autoPlay
            preload="metadata"
            poster={media.heroPoster}
            aria-hidden="true"
          >
            <source src={media.heroVideo} type="video/mp4" />
          </video>
        )}

        {/* Ambient Architectural Vignette & Text Scrim */}
        <div className="hero-scrim" />
      </div>

      {/* Hero Content with Spatial Typography */}
      <div className="container-wide hero-inner-container">
        <div className="hero-badge-row">
          <span className="eyebrow-tag light">
            SOUTH KODUVALLY · KOZHIKODE, KERALA
          </span>
        </div>

        <div className="hero-title-group">
          <h1 className="display-hero">
            Care, down to <br />
            <span className="display-italic">the details.</span>
          </h1>
        </div>

        <p className="hero-lead-text">
          A physical dental sanctuary designed around quiet conversation, facial harmony, and honest medical clarity.
        </p>

        <div className="hero-actions-row">
          <Link
            to="/contact"
            className="btn-primary"
          >
            Book a Consultation <ArrowUpRight size={17} />
          </Link>

          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp</span>
          </a>
        </div>
      </div>

      {/* Smooth Scroll Cue */}
      <a
        href="#discover"
        className="hero-scroll-cue"
        aria-label="Scroll to discover the studio"
      >
        <span>Discover</span>
        <div className="scroll-line-animated" />
        <ArrowDown size={14} />
      </a>
    </section>
  );
}

export function Reveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal-wrapper ${isVisible ? "is-revealed" : ""} ${className}`}
      style={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "none" : "translateY(24px)",
        transition: "opacity 0.9s cubic-bezier(0.16, 1, 0.3, 1), transform 0.9s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
    >
      {children}
    </div>
  );
}
