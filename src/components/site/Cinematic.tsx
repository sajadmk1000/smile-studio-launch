import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, Eye, EyeOff, MessageCircle, Sparkles } from "lucide-react";
import { media, clinic, whatsapp } from "@/lib/site-data";
import { Magnetic } from "@/components/motion/Magnetic";

interface CinematicHeroProps {
  onOpenBooking?: () => void;
}

export function CinematicHero({ onOpenBooking }: CinematicHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);

    if (mediaQuery.matches) {
      setHeroRevealed(true);
    }

    const video = videoRef.current;
    let revealTimer: ReturnType<typeof setTimeout> | null = null;

    const triggerReveal = () => {
      setHeroRevealed(true);
    };

    // User interaction failsafe: immediate reveal if user intends to interact
    const onUserAction = () => {
      triggerReveal();
    };
    window.addEventListener("scroll", onUserAction, { passive: true, once: true });
    window.addEventListener("wheel", onUserAction, { passive: true, once: true });
    window.addEventListener("touchmove", onUserAction, { passive: true, once: true });

    // Fallback timer: ensure text reveals within 1.8s even on slow network
    const fallbackTimer = setTimeout(() => {
      triggerReveal();
    }, 1800);

    if (!video) {
      return () => {
        clearTimeout(fallbackTimer);
        window.removeEventListener("scroll", onUserAction);
        window.removeEventListener("wheel", onUserAction);
        window.removeEventListener("touchmove", onUserAction);
      };
    }

    if (mediaQuery.matches) {
      video.pause();
      return;
    }

    // Force strict mobile video attributes for iOS & Android
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const scheduleSpatialReveal = () => {
      if (!revealTimer) {
        // Let the establishing shot move toward the clinic room unobstructed for 1.3s
        revealTimer = setTimeout(() => {
          triggerReveal();
        }, 1300);
      }
    };

    const markReadyAndPlay = () => {
      setVideoLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            scheduleSpatialReveal();
          })
          .catch(() => {
            // Autoplay deferred by browser policy
            triggerReveal();
          });
      }
    };

    video.addEventListener("loadeddata", markReadyAndPlay);
    video.addEventListener("canplay", markReadyAndPlay);
    video.addEventListener("playing", scheduleSpatialReveal);

    // Initial check if video is already ready in cache
    if (video.readyState >= 2) {
      markReadyAndPlay();
    }

    // Touch-to-unlock for mobile browsers with strict autoplay policies
    const handleFirstTouch = () => {
      if (video && video.paused) {
        video
          .play()
          .then(() => {
            setVideoLoaded(true);
            scheduleSpatialReveal();
          })
          .catch(() => {});
      }
      window.removeEventListener("touchstart", handleFirstTouch);
    };
    window.addEventListener("touchstart", handleFirstTouch, { passive: true, once: true });

    return () => {
      if (revealTimer) clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadeddata", markReadyAndPlay);
      video.removeEventListener("canplay", markReadyAndPlay);
      video.removeEventListener("playing", scheduleSpatialReveal);
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("scroll", onUserAction);
      window.removeEventListener("wheel", onUserAction);
      window.removeEventListener("touchmove", onUserAction);
    };
  }, [isMobile]);

  const activeVideoSrc = isMobile && media.heroVideoMobile ? media.heroVideoMobile : media.heroVideo;
  const activePosterSrc = isMobile && media.heroPosterMobile ? media.heroPosterMobile : media.heroPoster;

  return (
    <section
      className={`hero-cinematic ${videoLoaded ? "video-ready" : ""} ${heroRevealed ? "hero-revealed" : ""} ${cinemaMode ? "cinema-mode" : ""}`}
      aria-label="Welcome to Dr. Ameen's Smile Studio"
    >
      <div className="hero-video-wrapper">
        {/* Instant high-resolution poster frame prevents any blank flash */}
        <img
          src={activePosterSrc}
          alt="Exterior and consultation suite of Dr. Ameen's Smile Studio"
          className="hero-poster"
          loading="eager"
          fetchPriority="high"
        />

        {/* Cinematic Walkthrough Video: switches to portrait video on mobile */}
        {!prefersReducedMotion && (
          <video
            ref={videoRef}
            key={isMobile ? "mobile-portrait-video" : "desktop-landscape-video"}
            className="hero-video"
            muted
            playsInline
            loop
            autoPlay
            preload="auto"
            poster={activePosterSrc}
            aria-hidden="true"
          >
            <source src={activeVideoSrc} type="video/mp4" />
          </video>
        )}

        {/* Ambient Architectural Vignette & Text Scrim */}
        <div className="hero-scrim" />
      </div>

      {/* Luxury Cinema Mode Toggle (Allows admiring clinic walkthrough unobstructed) */}
      <button
        type="button"
        onClick={() => setCinemaMode((prev) => !prev)}
        className={`hero-cinema-toggle ${cinemaMode ? "is-active" : ""}`}
        aria-label={cinemaMode ? "Exit cinema view and display text" : "Cinema view (unobstructed video)"}
        title={cinemaMode ? "Show details" : "Unobstructed view"}
      >
        {cinemaMode ? <Eye size={13} /> : <EyeOff size={13} />}
        <span>{cinemaMode ? "Show Details" : "Cinema View"}</span>
      </button>

      {/* Hero Content with 3D Spatial Typography */}
      <div className="container-wide hero-inner-container hero-spatial-stage">
        <div className="hero-badge-row hero-spatial-item hero-spatial-d1">
          <span className="eyebrow-tag light">
            <Sparkles size={12} className="text-accent-champagne" /> SOUTH KODUVALLY · KOZHIKODE, KERALA
          </span>
        </div>

        <div className="hero-title-group hero-title-drift hero-spatial-item hero-spatial-d2">
          <h1 className="display-hero">
            Care, down to <br />
            <span className="display-italic">the details.</span>
          </h1>
        </div>

        <p className="hero-lead-text hero-spatial-item hero-spatial-d3">
          A physical dental sanctuary designed around quiet conversation, facial harmony, and honest medical clarity.
        </p>

        <div className="hero-actions-row hero-spatial-item hero-spatial-d4">
          <Magnetic strength={0.3}>
            {onOpenBooking ? (
              <button
                type="button"
                onClick={onOpenBooking}
                className="btn-royal-orbit"
                id="hero-book-consultation"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight size={17} />
              </button>
            ) : (
              <Link
                to="/contact"
                className="btn-royal-orbit"
                id="hero-book-consultation"
              >
                <span>Book a Consultation</span>
                <ArrowUpRight size={17} />
              </Link>
            )}
          </Magnetic>

          <Magnetic strength={0.2}>
            <a
              href={whatsapp()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary"
            >
              <MessageCircle size={18} />
              <span>Chat on WhatsApp</span>
            </a>
          </Magnetic>
        </div>
      </div>

      {/* Smooth Scroll Cue */}
      <a
        href="#discover"
        className="hero-scroll-cue hero-spatial-item hero-spatial-d5"
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
        if (entry?.isIntersecting) {
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
