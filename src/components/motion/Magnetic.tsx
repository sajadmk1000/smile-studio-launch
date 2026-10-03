import React, { useRef, useEffect } from "react";

interface MagneticProps {
  children: React.ReactElement;
  strength?: number; // 0.1 to 0.5 recommended
  className?: string;
}

export function Magnetic({ children, strength = 0.3, className = "" }: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animRef = useRef<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    let isHovering = false;

    const onMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const deltaX = (e.clientX - centerX) * strength;
      const deltaY = (e.clientY - centerY) * strength;

      posRef.current.targetX = deltaX;
      posRef.current.targetY = deltaY;
    };

    const onMouseEnter = () => {
      isHovering = true;
      startLoop();
    };

    const onMouseLeave = () => {
      isHovering = false;
      posRef.current.targetX = 0;
      posRef.current.targetY = 0;
    };

    function startLoop() {
      if (animRef.current) return;

      const loop = () => {
        const p = posRef.current;
        // Spring lerp
        p.x += (p.targetX - p.x) * 0.18;
        p.y += (p.targetY - p.y) * 0.18;

        if (el) {
          el.style.transform = `translate3d(${p.x.toFixed(2)}px, ${p.y.toFixed(2)}px, 0)`;
        }

        // Keep animating while moving or until settling back near 0
        const isSettled =
          !isHovering &&
          Math.abs(p.x) < 0.05 &&
          Math.abs(p.y) < 0.05 &&
          Math.abs(p.targetX) < 0.05 &&
          Math.abs(p.targetY) < 0.05;

        if (isSettled) {
          p.x = 0;
          p.y = 0;
          if (el) el.style.transform = "translate3d(0, 0, 0)";
          animRef.current = null;
        } else {
          animRef.current = requestAnimationFrame(loop);
        }
      };

      animRef.current = requestAnimationFrame(loop);
    }

    el.addEventListener("mousemove", onMouseMove);
    el.addEventListener("mouseenter", onMouseEnter);
    el.addEventListener("mouseleave", onMouseLeave);

    return () => {
      el.removeEventListener("mousemove", onMouseMove);
      el.removeEventListener("mouseenter", onMouseEnter);
      el.removeEventListener("mouseleave", onMouseLeave);
      if (animRef.current) cancelAnimationFrame(animRef.current);
    };
  }, [strength]);

  return (
    <div
      ref={ref}
      className={`magnetic-wrap ${className}`}
      style={{ display: "inline-block", willChange: "transform" }}
      data-magnetic="true"
    >
      {children}
    </div>
  );
}

export function LuxuryAuraCursor() {
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only run on fine-pointer desktop devices
    if (typeof window === "undefined") return;
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) return;

    const dot = cursorDotRef.current;
    const ring = cursorRingRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isHovering = false;
    let isClicking = false;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;

      // Check if hovering interactive element
      const target = e.target as HTMLElement | null;
      if (
        target?.closest("a, button, [data-magnetic], input, select, textarea, [role='button']")
      ) {
        if (!isHovering) {
          isHovering = true;
          ring.classList.add("cursor-hover");
        }
      } else {
        if (isHovering) {
          isHovering = false;
          ring.classList.remove("cursor-hover");
        }
      }
    };

    const onMouseDown = () => {
      isClicking = true;
      ring.classList.add("cursor-click");
    };

    const onMouseUp = () => {
      isClicking = false;
      ring.classList.remove("cursor-click");
    };

    // Smooth spring follow loop for ring
    const render = () => {
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;
      ring.style.transform = `translate3d(${ringX.toFixed(2)}px, ${ringY.toFixed(2)}px, 0)`;
      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("mousedown", onMouseDown, { passive: true });
    window.addEventListener("mouseup", onMouseUp, { passive: true });
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div ref={cursorDotRef} className="custom-cursor-dot" aria-hidden="true" />
      <div ref={cursorRingRef} className="custom-cursor-ring" aria-hidden="true" />
    </>
  );
}
