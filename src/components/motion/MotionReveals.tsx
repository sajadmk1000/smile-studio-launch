import React, { useRef, useEffect, useState } from "react";

interface SplitTextProps {
  children: string;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span";
  className?: string;
  delayMs?: number;
}

export function SplitTextReveal({
  children,
  as: Component = "h2",
  className = "",
  delayMs = 0,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const words = children.split(" ");

  return (
    <Component ref={ref as any} className={`split-text-root ${className}`}>
      {words.map((word, i) => (
        <span key={i} className="split-word-mask">
          <span
            className="split-word-inner"
            style={{
              transitionDelay: `${delayMs + i * 45}ms`,
              transform: isVisible ? "translate3d(0, 0, 0)" : "translate3d(0, 115%, 0)",
              opacity: isVisible ? 1 : 0,
            }}
          >
            {word}&nbsp;
          </span>
        </span>
      ))}
    </Component>
  );
}

interface EnamelRevealProps {
  children: React.ReactNode;
  className?: string;
  aspectRatio?: string;
  glow?: boolean;
}

export function EnamelReveal({
  children,
  className = "",
  aspectRatio,
  glow = true,
}: EnamelRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`enamel-reveal-frame ${revealed ? "is-revealed" : ""} ${glow ? "has-glow" : ""} ${className}`}
      style={{ aspectRatio }}
    >
      <div className="enamel-reveal-inner">{children}</div>
    </div>
  );
}

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  maxTilt?: number;
}

export function TiltCard({ children, className = "", maxTilt = 8 }: TiltCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glareRef = useRef<HTMLDivElement>(null);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateX = ((y - centerY) / centerY) * -maxTilt;
    const rotateY = ((x - centerX) / centerX) * maxTilt;

    card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translate3d(0, -4px, 0)`;

    if (glare) {
      const glareX = (x / rect.width) * 100;
      const glareY = (y / rect.height) * 100;
      glare.style.background = `radial-gradient(circle at ${glareX}% ${glareY}%, rgba(255, 255, 255, 0.28) 0%, transparent 60%)`;
      glare.style.opacity = "1";
    }
  };

  const onMouseLeave = () => {
    const card = cardRef.current;
    const glare = glareRef.current;
    if (!card) return;

    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translate3d(0, 0, 0)";
    if (glare) {
      glare.style.opacity = "0";
    }
  };

  return (
    <div
      ref={cardRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={`tilt-card-wrapper ${className}`}
      style={{ willChange: "transform", transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)" }}
    >
      {children}
      <div ref={glareRef} className="tilt-card-glare" aria-hidden="true" />
    </div>
  );
}
