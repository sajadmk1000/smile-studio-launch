import React, { useState, useEffect } from "react";
import {
  X,
  Calendar,
  Clock,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  MessageCircle,
  Phone,
  Shield,
} from "lucide-react";
import { clinic, whatsapp } from "@/lib/site-data";

interface VIPBookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTreatment?: string;
}

const TREATMENTS_LIST = [
  { id: "smile-design", name: "Smile Designing & Veneers", desc: "Digital aesthetic balance & porcelain veneers" },
  { id: "aligners", name: "Clear Aligners & Orthodontics", desc: "Discreet orthodontic tooth realignment" },
  { id: "implants", name: "Dental Implants & Surgery", desc: "Biocompatible titanium tooth restorations" },
  { id: "root-canal", name: "Micro-Endodontic Care", desc: "Gentle anatomical tooth nerve preservation" },
  { id: "checkup", name: "Comprehensive Oral Health Exam", desc: "Complete digital radiography & doctor consultation" },
];

const TIME_SLOTS = [
  { id: "morning", label: "Morning", hours: "10:00 AM – 1:00 PM" },
  { id: "afternoon", label: "Afternoon", hours: "2:00 PM – 5:00 PM" },
  { id: "evening", label: "Evening", hours: "5:00 PM – 7:00 PM" },
];

export function VIPBookingModal({
  isOpen,
  onClose,
  defaultTreatment = "Smile Designing & Veneers",
}: VIPBookingModalProps) {
  const [step, setStep] = useState<1 | 2 | 3 | 4>(1);
  const [selectedTreatment, setSelectedTreatment] = useState(defaultTreatment);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState("morning");
  const [patientName, setPatientName] = useState("");
  const [patientPhone, setPatientPhone] = useState("");
  const [patientNotes, setPatientNotes] = useState("");

  // Populate next 7 available business days
  const [availableDates, setAvailableDates] = useState<{ label: string; dateStr: string; dayName: string }[]>([]);

  useEffect(() => {
    const dates = [];
    const today = new Date();
    let added = 0;
    let i = 1; // start tomorrow or today if early
    while (added < 7) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      // Skip Sundays (0)
      if (d.getDay() !== 0) {
        dates.push({
          label: d.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
          dateStr: d.toISOString().split("T")[0],
          dayName: d.toLocaleDateString("en-US", { weekday: "short" }),
        });
        added++;
      }
      i++;
    }
    setAvailableDates(dates);
    if (dates.length > 0) {
      setSelectedDate(dates[0].dateStr);
    }
  }, []);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFinish = (method: "whatsapp" | "phone") => {
    const summary = `VIP Booking Request:
- Patient: ${patientName || "Guest Patient"}
- Phone: ${patientPhone || "Not provided"}
- Procedure: ${selectedTreatment}
- Preferred Date: ${selectedDate}
- Time Slot: ${TIME_SLOTS.find((s) => s.id === selectedSlot)?.hours || selectedSlot}
${patientNotes ? `- Notes: ${patientNotes}` : ""}`;

    if (method === "whatsapp") {
      const url = `https://wa.me/917306308876?text=${encodeURIComponent(summary)}`;
      window.open(url, "_blank");
    }
    setStep(4);
  };

  return (
    <div className="vip-modal-backdrop" onClick={onClose} role="dialog" aria-modal="true">
      <div className="vip-modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="vip-modal-close-btn"
          aria-label="Close booking modal"
        >
          <X size={20} />
        </button>

        {/* Modal Header */}
        <div className="vip-modal-header">
          <div className="vip-badge-row">
            <span className="vip-concierge-pill">
              <Sparkles size={13} className="text-accent-champagne" /> DR. AMEEN&apos;S PRIVATE CONCIERGE
            </span>
            <span className="vip-step-indicator">Step {step} of 3</span>
          </div>

          <h3 className="vip-modal-title">
            {step === 1 && "Select your clinical treatment area"}
            {step === 2 && "Choose your preferred appointment schedule"}
            {step === 3 && "Patient information & confirmation"}
            {step === 4 && "Your sanctuary appointment is initiated"}
          </h3>
        </div>

        {/* Step 1: Treatment Selection */}
        {step === 1 && (
          <div className="vip-modal-step">
            <div className="vip-options-list">
              {TREATMENTS_LIST.map((t) => {
                const isSelected = selectedTreatment === t.name;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => setSelectedTreatment(t.name)}
                    className={`vip-option-card ${isSelected ? "is-selected" : ""}`}
                  >
                    <div className="vip-card-text">
                      <strong>{t.name}</strong>
                      <span>{t.desc}</span>
                    </div>
                    <div className="vip-card-check">
                      {isSelected ? <CheckCircle2 size={18} color="var(--accent-champagne)" /> : <div className="vip-check-circle" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="vip-modal-footer">
              <button
                type="button"
                className="btn-primary"
                style={{ width: "100%", height: "50px" }}
                onClick={() => setStep(2)}
              >
                Continue to Scheduling <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Date & Slot Selection */}
        {step === 2 && (
          <div className="vip-modal-step">
            <label className="vip-input-label">Select Preferred Day (Mon–Sat)</label>
            <div className="vip-days-grid">
              {availableDates.map((d) => {
                const isSelected = selectedDate === d.dateStr;
                return (
                  <button
                    key={d.dateStr}
                    type="button"
                    onClick={() => setSelectedDate(d.dateStr)}
                    className={`vip-day-pill ${isSelected ? "is-selected" : ""}`}
                  >
                    <span className="vip-day-name">{d.dayName}</span>
                    <strong className="vip-day-num">{d.label}</strong>
                  </button>
                );
              })}
            </div>

            <label className="vip-input-label" style={{ marginTop: "1.75rem" }}>
              Preferred Time Window
            </label>
            <div className="vip-slots-grid">
              {TIME_SLOTS.map((s) => {
                const isSelected = selectedSlot === s.id;
                return (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setSelectedSlot(s.id)}
                    className={`vip-slot-pill ${isSelected ? "is-selected" : ""}`}
                  >
                    <Clock size={15} color={isSelected ? "var(--accent-champagne)" : "currentColor"} />
                    <div>
                      <strong>{s.label}</strong>
                      <small>{s.hours}</small>
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="vip-modal-footer dual">
              <button type="button" className="btn-secondary" onClick={() => setStep(1)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button type="button" className="btn-primary" onClick={() => setStep(3)}>
                Patient Details <ArrowRight size={16} />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Patient Info */}
        {step === 3 && (
          <div className="vip-modal-step">
            <div className="vip-form-group">
              <label htmlFor="vip-patient-name" className="vip-input-label">Full Name</label>
              <input
                id="vip-patient-name"
                type="text"
                placeholder="Enter your name"
                className="vip-text-input"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>

            <div className="vip-form-group">
              <label htmlFor="vip-patient-phone" className="vip-input-label">WhatsApp or Mobile Number</label>
              <input
                id="vip-patient-phone"
                type="tel"
                placeholder="+91 Phone number"
                className="vip-text-input"
                value={patientPhone}
                onChange={(e) => setPatientPhone(e.target.value)}
                required
              />
            </div>

            <div className="vip-form-group">
              <label htmlFor="vip-patient-notes" className="vip-input-label">Special Requests or Symptoms (Optional)</label>
              <textarea
                id="vip-patient-notes"
                placeholder="Briefly describe your goals or concerns..."
                className="vip-textarea-input"
                rows={2}
                value={patientNotes}
                onChange={(e) => setPatientNotes(e.target.value)}
              />
            </div>

            <div className="vip-privacy-note">
              <Shield size={14} className="text-accent-champagne" />
              <span>Strict clinical confidentiality. Zero automated marketing spam.</span>
            </div>

            <div className="vip-modal-footer dual">
              <button type="button" className="btn-secondary" onClick={() => setStep(2)}>
                <ArrowLeft size={16} /> Back
              </button>
              <button
                type="button"
                className="btn-primary"
                onClick={() => handleFinish("whatsapp")}
              >
                <MessageCircle size={16} /> Confirm via WhatsApp Studio
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Success confirmation */}
        {step === 4 && (
          <div className="vip-modal-step" style={{ textAlign: "center", padding: "1.5rem 0" }}>
            <div className="vip-success-icon-wrap">
              <CheckCircle2 size={44} color="var(--accent-champagne)" />
            </div>

            <h4 style={{ fontFamily: "var(--font-display)", fontSize: "2rem", marginTop: "1rem" }}>
              Request Received with Distinction
            </h4>

            <p style={{ color: "var(--fg-secondary)", maxWidth: "480px", margin: "0.75rem auto 1.5rem", lineHeight: 1.7 }}>
              Dr. Ameen&apos;s South Koduvally clinical reception has received your priority appointment slot for <strong>{selectedTreatment}</strong> on <strong>{selectedDate}</strong> ({TIME_SLOTS.find((s) => s.id === selectedSlot)?.hours}).
            </p>

            <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
              <a
                href={whatsapp(selectedTreatment)}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <MessageCircle size={16} /> Open Direct WhatsApp Chat
              </a>
              <button type="button" className="btn-secondary" onClick={onClose}>
                Close Window
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
