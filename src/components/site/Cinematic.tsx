import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowDown, ArrowUpRight, MessageCircle, Pause, Play, Sparkles } from "lucide-react";
import { media, clinic, whatsapp } from "@/lib/site-data";
import { Magnetic } from "@/components/motion/Magnetic";

interface CinematicHeroProps {
  onOpenBooking?: () => void;
}

export function CinematicHero({ onOpenBooking }: CinematicHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  const [isMobile, setIsMobile] = useState(false);

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

    const video = videoRef.current;
    if (!video) return;

    if (mediaQuery.matches) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    // Force strict mobile video attributes for iOS & Android
    video.muted = true;
    video.defaultMuted = true;
    video.setAttribute("playsinline", "true");
    video.setAttribute("webkit-playsinline", "true");

    const markReadyAndPlay = () => {
      setVideoLoaded(true);
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
          })
          .catch(() => {
            // Autoplay deferred by browser low-power mode
            setIsPlaying(false);
          });
      }
    };

    video.addEventListener("loadeddata", markReadyAndPlay);
    video.addEventListener("canplay", markReadyAndPlay);
    video.addEventListener("playing", markReadyAndPlay);

    // Initial check if video is already ready in cache
    if (video.readyState >= 2) {
      markReadyAndPlay();
    }

    // Touch-to-unlock for mobile browsers with strict autoplay policies
    const handleFirstTouch = () => {
      if (video && video.paused) {
        video.play().then(() => {
          setVideoLoaded(true);
          setIsPlaying(true);
        }).catch(() => {});
      }
      window.removeEventListener("touchstart", handleFirstTouch);
    };
    window.addEventListener("touchstart", handleFirstTouch, { passive: true, once: true });

    return () => {
      video.removeEventListener("loadeddata", markReadyAndPlay);
      video.removeEventListener("canplay", markReadyAndPlay);
      video.removeEventListener("playing", markReadyAndPlay);
      window.removeEventListener("touchstart", handleFirstTouch);
    };
  }, [isMobile]);

  const togglePlayback = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        setIsPlaying(true);
      }).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
  };

  const activeVideoSrc = isMobile && media.heroVideoMobile ? media.heroVideoMobile : media.heroVideo;
  const activePosterSrc = isMobile && media.heroPosterMobile ? media.heroPosterMobile : media.heroPoster;

  return (
    <section
      className={`hero-cinematic ${videoLoaded ? "video-ready" : ""}`}
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

      {/* Interactive Tour Play/Pause Toggle */}
      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={togglePlayback}
          className="hero-video-toggle"
          aria-label={isPlaying ? "Pause studio walkthrough video" : "Play studio walkthrough video"}
        >
          {isPlaying ? <Pause size={12} /> : <Play size={12} />}
          <span>{isPlaying ? "Pause Tour" : "Play Tour"}</span>
        </button>
      )}

      {/* Hero Content with Spatial Typography */}
      <div className="container-wide hero-inner-container">
        <div className="hero-badge-row">
          <span className="eyebrow-tag light">
            <Sparkles size={12} className="text-accent-champagne" /> SOUTH KODUVALLY · KOZHIKODE, KERALA
          </span>
        </div>

        <div className="hero-title-group hero-title-drift">
          <h1 className="display-hero">
            Care, down to <br />
            <span className="display-italic">the details.</span>
          </h1>
        </div>

        <p className="hero-lead-text">
          A physical dental sanctuary designed around quiet conversation, facial harmony, and honest medical clarity.
        </p>

        <div className="hero-actions-row">
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
