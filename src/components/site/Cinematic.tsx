import { useEffect, useRef, useState } from 'react';
import { ArrowDown } from 'lucide-react';
import mp4 from '@/assets/clinic/hero.mp4.asset.json';
import webm from '@/assets/clinic/hero.webm.asset.json';
import poster from '@/assets/clinic/poster.webp.asset.json';
import { BookingLinks } from './Elements';

export function CinematicHero() {
  const ref = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(mq.matches);
    const v = ref.current;
    if (!v) return;
    if (mq.matches) { v.pause(); return; }
    if (v.readyState >= 3) setReady(true);
    v.play().catch(() => {});
  }, []);
  return (
    <section className={`cine-hero ${ready ? 'is-ready' : ''}`} aria-label="Dr. Ameen's Smile Studio">
      <img className="cine-poster" src={poster.url} alt="" aria-hidden="true" />
      <video ref={ref} className="cine-video" muted playsInline loop autoPlay={!reduced} preload="auto" poster={poster.url} onCanPlay={() => setReady(true)} aria-hidden="true">
        <source src={webm.url} type="video/webm" />
        <source src={mp4.url} type="video/mp4" />
      </video>
      <div className="cine-shade" />
      <div className="cine-loader" aria-hidden="true"><span /></div>
      <div className="container-wide cine-content">
        <p className="cine-over"><span className="rule" />SOUTH KODUVALLY, KERALA</p>
        <h1 className="cine-title"><span className="ln"><span>Care, down to</span></span><span className="ln"><em>the details.</em></span></h1>
        <p className="cine-copy">Dental care begins with being heard. Discover considered treatment options at Dr. Ameen's Smile Studio.</p>
        <div className="cine-actions"><BookingLinks light /></div>
      </div>
      <a href="#discover" className="cine-scroll" aria-label="Scroll to discover"><ArrowDown size={18} /></a>
    </section>
  );
}

export function Reveal({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setShown(true); io.disconnect(); } }, { threshold: 0.15 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return <div ref={ref} className={`reveal ${shown ? 'in' : ''} ${className}`}>{children}</div>;
}
