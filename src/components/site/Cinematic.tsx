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
  const backdropVideoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [cinemaMode, setCinemaMode] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768 || window.innerHeight > window.innerWidth);
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
    const backdropVideo = backdropVideoRef.current;
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

    // Fallback timer: ensure text reveals within 3.4s even on slow network
    const fallbackTimer = setTimeout(() => {
      triggerReveal();
    }, 3400);

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
      if (backdropVideo) backdropVideo.pause();
      return;
    }

    // Force strict mobile video attributes for iOS & Android
    [video, backdropVideo].forEach((v) => {
      if (!v) return;
      v.muted = true;
      v.defaultMuted = true;
      v.setAttribute("playsinline", "true");
      v.setAttribute("webkit-playsinline", "true");
    });

    const scheduleSpatialReveal = () => {
      if (!revealTimer) {
        // Let the establishing shot move toward the clinic room unobstructed for 2.6s
        revealTimer = setTimeout(() => {
          triggerReveal();
        }, 2600);
      }
    };

    const markReadyAndPlay = () => {
      setVideoLoaded(true);
      if (backdropVideo && backdropVideo.paused) {
        backdropVideo.play().catch(() => {});
      }
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            scheduleSpatialReveal();
            if (backdropVideo && backdropVideo.paused) {
              backdropVideo.play().catch(() => {});
            }
          })
          .catch(() => {
            // Autoplay deferred by browser policy
            triggerReveal();
          });
      }
    };

    // Continuous video synchronization
    const syncPlayback = () => {
      if (backdropVideo && !backdropVideo.paused && Math.abs(video.currentTime - backdropVideo.currentTime) > 0.15) {
        backdropVideo.currentTime = video.currentTime;
      }
    };

    const handlePlaySync = () => {
      scheduleSpatialReveal();
      if (backdropVideo && backdropVideo.paused) {
        backdropVideo.play().catch(() => {});
      }
    };

    const handlePauseSync = () => {
      if (backdropVideo && !backdropVideo.paused) {
        backdropVideo.pause();
      }
    };

    video.addEventListener("loadeddata", markReadyAndPlay);
    video.addEventListener("canplay", markReadyAndPlay);
    video.addEventListener("playing", handlePlaySync);
    video.addEventListener("play", handlePlaySync);
    video.addEventListener("pause", handlePauseSync);
    video.addEventListener("timeupdate", syncPlayback);

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
      if (backdropVideo && backdropVideo.paused) {
        backdropVideo.play().catch(() => {});
      }
      window.removeEventListener("touchstart", handleFirstTouch);
    };
    window.addEventListener("touchstart", handleFirstTouch, { passive: true, once: true });

    return () => {
      if (revealTimer) clearTimeout(revealTimer);
      clearTimeout(fallbackTimer);
      video.removeEventListener("loadeddata", markReadyAndPlay);
      video.removeEventListener("canplay", markReadyAndPlay);
      video.removeEventListener("playing", handlePlaySync);
      video.removeEventListener("play", handlePlaySync);
      video.removeEventListener("pause", handlePauseSync);
      video.removeEventListener("timeupdate", syncPlayback);
      window.removeEventListener("touchstart", handleFirstTouch);
      window.removeEventListener("scroll", onUserAction);
      window.removeEventListener("wheel", onUserAction);
      window.removeEventListener("touchmove", onUserAction);
    };
  }, [isMobile]);

  // Use master 16:9 uncropped video with mirrored ambient backdrop
  const activeVideoSrc = media.heroVideo;
  const activePosterSrc = media.heroPoster;

  return (
    <section
      className={`hero-cinematic ${videoLoaded ? "video-ready" : ""} ${heroRevealed ? "hero-revealed" : ""} ${cinemaMode ? "cinema-mode" : ""}`}
      aria-label="Welcome to Dr. Ameen's Smile Studio"
    >
      <div className="hero-video-wrapper">
        {/* Mobile Ambient Blurred Backdrop Poster */}
        <img
          src={activePosterSrc}
          alt=""
          className="hero-poster-backdrop"
          aria-hidden="true"
        />

        {/* Foreground Poster Frame */}
        <img
          src={activePosterSrc}
          alt="Exterior and consultation suite of Dr. Ameen's Smile Studio"
          className="hero-poster"
          loading="eager"
          fetchPriority="high"
        />

        {/* Cinematic Walkthrough Video: Foreground + Mobile Ambient Blurred Backdrop */}
        {!prefersReducedMotion && (
          <>
            {/* Ambient Blurred Backdrop Mirror (Mobile only, zero crop companion) */}
            <video
              ref={backdropVideoRef}
              className="hero-video-backdrop"
              muted
              playsInline
              loop
              autoPlay
              preload="auto"
              poster={activePosterSrc}
              aria-hidden="true"
              tabIndex={-1}
            >
              <source src={activeVideoSrc} type="video/mp4" />
            </video>

            {/* Main Foreground Video (16:9 uncropped on mobile, full bleed on desktop) */}
            <video
              ref={videoRef}
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
          </>
        )}

        {/* Mobile Edge Blending Vignette Overlay */}
        <div className="hero-ambient-vignette" />

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

      {/* Hero Content with 3D Spatial Stage & Creative Mask Reveals */}
      <div className="container-wide hero-inner-container hero-spatial-stage">
        <div className="hero-badge-row hero-spatial-item hero-spatial-d1">
          <span className="eyebrow-tag light hero-badge-glow">
            <Sparkles size={12} className="text-accent-champagne" /> SOUTH KODUVALLY · KOZHIKODE, KERALA
          </span>
        </div>

        {/* Architectural hairline accent that draws across */}
        <div className="hero-micro-divider hero-spatial-item" />

        {/* Creative Split-Word Kinetic Reveal Headline */}
        <div className="hero-title-group">
          <h1 className="display-hero">
            <span className="hero-line-mask">
              <span className="hero-word-kinetic hero-k1">Care,</span>{" "}
              <span className="hero-word-kinetic hero-k2">down</span>{" "}
              <span className="hero-word-kinetic hero-k3">to</span>
            </span>
            <span className="hero-line-mask hero-line-accent">
              <span className="hero-word-kinetic hero-k4 display-italic text-glow-champagne">
                the details.
              </span>
            </span>
          </h1>
        </div>

        <p className="hero-lead-text hero-spatial-item hero-spatial-lead">
          A physical dental sanctuary designed around quiet conversation, facial harmony, and honest medical clarity.
        </p>

        <div className="hero-actions-row hero-spatial-item hero-spatial-actions">
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
