import { useState, useEffect } from "react";
import { Link, useLocation } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Menu,
  X,
  Phone,
  MessageCircle,
  CalendarDays,
  MapPin,
  Clock,
} from "lucide-react";
import { ClinicLogo } from "./ClinicLogo";
import { clinic, whatsapp, treatments } from "@/lib/site-data";

export function SiteHeader() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const pathname = location.pathname;

  // Only the homepage has the full-screen cinematic video hero at window.scrollY === 0.
  // All internal pages (Treatments, Smile Design, About, FAQ, Gallery, Contact, etc.)
  // feature a permanent, high-contrast, frosted ivory navigation header with dark charcoal typography and logo.
  const hasDarkHero = pathname === "/";

  // Determine if the header surface should be light (ivory with charcoal text):
  // True on all internal pages, or on the homepage once scrolled past hero.
  const isLightSurface = !hasDarkHero || isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [pathname]);

  // When route changes, close mobile menu
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { to: "/treatments", label: "Treatments", exact: true },
    { to: "/treatments/smile-designing", label: "Smile Design" },
    { to: "/about", label: "About" },
    { to: "/gallery", label: "Studio" },
    { to: "/faq", label: "FAQ" },
    { to: "/contact", label: "Contact" },
  ];

  let headerClass = "site-header";
  if (mobileMenuOpen) {
    headerClass += " is-mobile-open";
  } else if (isLightSurface) {
    headerClass += " is-light-surface";
    if (isScrolled) {
      headerClass += " is-scrolled";
    }
  } else {
    headerClass += " is-transparent";
  }

  const logoTheme = mobileMenuOpen
    ? "light"
    : isLightSurface
    ? "inherit"
    : "light";

  return (
    <>
      <header className={headerClass}>
        <div className="container-wide header-container">
          <Link
            to="/"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Dr. Ameen's Smile Studio Home"
          >
            <ClinicLogo
              variant="horizontal"
              theme={logoTheme}
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="nav-links-desktop" aria-label="Main Navigation">
            {navLinks.map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="nav-link-item"
                activeProps={{ className: "nav-link-item active" }}
                activeOptions={link.exact ? { exact: true } : undefined}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Header Action Buttons */}
          <div className="header-actions-group">
            <Link
              to="/contact"
              className="header-cta-btn"
            >
              Book Consultation <ArrowUpRight size={15} />
            </Link>

            {/* Mobile Hamburger Toggle */}
            <button
              type="button"
              className="header-mobile-toggle"
              aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={mobileMenuOpen}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      <div
        className={`mobile-nav-drawer ${mobileMenuOpen ? "is-open" : ""}`}
        aria-hidden={!mobileMenuOpen}
      >
        <div className="mobile-nav-list">
          <Link
            to="/"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home <span>00</span>
          </Link>
          <Link
            to="/treatments"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Treatments <span>01</span>
          </Link>
          <Link
            to="/treatments/smile-designing"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Smile Designing <span>02</span>
          </Link>
          <Link
            to="/gallery"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Inside the Studio <span>03</span>
          </Link>
          <Link
            to="/about"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            About Dr. Ameen <span>04</span>
          </Link>
          <Link
            to="/faq"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Common Questions <span>05</span>
          </Link>
          <Link
            to="/contact"
            className="mobile-nav-item"
            onClick={() => setMobileMenuOpen(false)}
          >
            Contact & Directions <span>06</span>
          </Link>
        </div>

        <div className="mobile-drawer-bottom">
          <Link
            to="/contact"
            className="btn-primary"
            onClick={() => setMobileMenuOpen(false)}
          >
            Book a Consultation <ArrowUpRight size={17} />
          </Link>
          <a
            href={whatsapp()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary"
          >
            <MessageCircle size={18} /> <span>WhatsApp Studio</span>
          </a>
          <a href={`tel:${clinic.tel}`} className="btn-secondary">
            <Phone size={18} /> <span>Call {clinic.displayPhone}</span>
          </a>
        </div>
      </div>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer className="site-footer">
      <div className="container-wide footer-top-grid">
        {/* Col 1: Brand & Positioning */}
        <div className="footer-col brand-col">
          <Link to="/" aria-label="Dr. Ameen's Smile Studio Home">
            <ClinicLogo variant="horizontal" />
          </Link>
          <p style={{ marginTop: "1.25rem", color: "var(--fg-secondary)", maxWidth: "340px", fontSize: "0.95rem" }}>
            A considered, patient-first dental clinic located in South Koduvally, Kerala. Focused on truthful guidance, facial harmony, and gentle precision.
          </p>
          <div style={{ marginTop: "1.5rem", display: "flex", flexDirection: "column", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <MapPin size={15} color="var(--accent-champagne-dark)" /> {clinic.locality}, {clinic.district}, Kerala {clinic.pincode}
            </span>
            <span style={{ fontSize: "0.85rem", color: "var(--fg-muted)", display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <Clock size={15} color="var(--accent-champagne-dark)" /> {clinic.hours}
            </span>
          </div>
        </div>

        {/* Col 2: Navigation Links */}
        <div className="footer-col">
          <h4>Explore</h4>
          <ul className="footer-nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/treatments">All Treatments</Link></li>
            <li><Link to="/treatments/smile-designing">Smile Designing</Link></li>
            <li><Link to="/gallery">Inside the Studio</Link></li>
            <li><Link to="/about">About the Clinic</Link></li>
            <li><Link to="/faq">Questions & Answers</Link></li>
            <li><Link to="/contact">Contact & Location</Link></li>
          </ul>
        </div>

        {/* Col 3: Treatments */}
        <div className="footer-col">
          <h4>Treatments</h4>
          <ul className="footer-nav-list">
            {treatments.map((t) => (
              <li key={t.slug}>
                <Link to="/treatments/$slug" params={{ slug: t.slug }}>
                  {t.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4: Visit & Direct Contacts */}
        <div className="footer-col">
          <h4>Direct Enquiries</h4>
          <p style={{ fontSize: "0.92rem", color: "var(--fg-secondary)", marginBottom: "1rem" }}>
            {clinic.address}
          </p>
          <ul className="footer-nav-list">
            <li>
              <a href={`tel:${clinic.tel}`} style={{ fontWeight: 600, color: "var(--fg-primary)", display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <Phone size={15} /> {clinic.displayPhone}
              </a>
            </li>
            <li>
              <a href={whatsapp()} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <MessageCircle size={15} /> Chat on WhatsApp <ArrowUpRight size={13} />
              </a>
            </li>
            <li>
              <a href={clinic.maps} target="_blank" rel="noopener noreferrer" style={{ display: "inline-flex", alignItems: "center", gap: "0.4rem" }}>
                <MapPin size={15} /> Open in Google Maps <ArrowUpRight size={13} />
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="container-wide footer-bottom-bar">
        <span>© {new Date().getFullYear()} {clinic.name}. All rights reserved.</span>
        <div className="footer-bottom-links">
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/medical-disclaimer">Medical Disclaimer</Link>
        </div>
        <span>South Koduvally, Kozhikode, Kerala</span>
      </div>
    </footer>
  );
}

export function MobileActions() {
  return (
    <nav className="mobile-action-bar" aria-label="Quick Mobile Actions">
      <a href={`tel:${clinic.tel}`} aria-label={`Call ${clinic.name}`}>
        <Phone size={18} />
        <span>Call</span>
      </a>
      <a
        href={whatsapp()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Enquire via WhatsApp"
      >
        <MessageCircle size={18} />
        <span>WhatsApp</span>
      </a>
      <Link
        to="/contact"
        className="primary-action"
        aria-label="Book a dental consultation"
      >
        <CalendarDays size={18} />
        <span>Consultation</span>
      </Link>
    </nav>
  );
}
