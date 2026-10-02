export const clinic = {
  name: "Dr. Ameen's Smile Studio",
  subtitle: "Multi Speciality Dental Clinic",
  tagline: "Care, down to the details.",
  phone: "+91 73063 08876",
  tel: "+917306308876",
  displayPhone: "+91 73063 08876",
  hours: "Monday–Saturday · 10:00 AM–7:00 PM",
  hoursShort: "Mon–Sat: 10:00 AM – 7:00 PM",
  closedDays: "Sunday Closed",
  landmark: "Near Erapund Juma Masjid, Madrassa Bazar",
  locality: "South Koduvally",
  city: "Koduvally",
  district: "Kozhikode",
  state: "Kerala",
  pincode: "673572",
  country: "India",
  address: "Near Erapund Juma Masjid, Madrassa Bazar, South Koduvally, Koduvally, Kerala 673572, India",
  maps: "https://www.google.com/maps/search/?api=1&query=Dr.+Ameen%27s+Smile+Studio+South+Koduvally+Kerala",
  googlePlaceQuery: "Dr. Ameen's Smile Studio, South Koduvally, Kerala 673572",
};

export const media = {
  heroVideo: "/clinic/hero.mp4",
  heroPoster: "/clinic/hero-poster.webp",
  exterior: "/clinic/exterior.webp",
  exteriorMobile: "/clinic/exterior-mobile.webp",
  signage: "/clinic/signage.webp",
  signageMobile: "/clinic/signage-mobile.webp",
  reception: "/clinic/reception.webp",
  receptionMobile: "/clinic/reception-mobile.webp",
  waiting: "/clinic/waiting.webp",
  waitingMobile: "/clinic/waiting-mobile.webp",
  treatmentRoom: "/clinic/treatment-room.webp",
  treatmentRoomMobile: "/clinic/treatment-room-mobile.webp",
  certificates: "/clinic/certificates.webp",
  certificatesMobile: "/clinic/certificates-mobile.webp",
};

export const whatsapp = (interest?: string) =>
  `https://wa.me/917306308876?text=${encodeURIComponent(
    `Hello Dr. Ameen's Smile Studio, I would like to enquire about ${
      interest ? `${interest.toLowerCase()} and schedule a consultation` : "an appointment and consultation"
    }.`
  )}`;

export type Treatment = {
  slug: string;
  index: string;
  name: string;
  tagline: string;
  short: string;
  intro: string;
  overview: string;
  suitable: string;
  process: { step: string; title: string; desc: string }[];
  expectations: string;
  keyAspects: string[];
  faqs: { q: string; a: string }[];
  image: string;
  imageMobile: string;
  imageFull: string;
  category: string;
  duration: string;
  anesthesia: string;
  longevity: string;
  visualHighlights: string[];
};

export const treatments: Treatment[] = [
  {
    slug: "smile-designing",
    index: "01",
    name: "Smile Designing",
    tagline: "Harmonizing facial aesthetics and dental balance.",
    short: "A comprehensive digital & clinical approach to the proportions that make a smile yours.",
    intro: "A smile begins with a conversation.",
    overview:
      "Smile designing is a tailored multidisciplinary planning protocol that analyzes facial contours, lip line dynamics, and dental proportions. Rather than applying a generic template, Dr. Ameen evaluates individual anatomy to plan harmonious, natural enhancements that preserve tooth structure.",
    suitable:
      "Recommended for individuals exploring cosmetic enhancement, correction of uneven spacing, worn edges, discoloration, or balance after orthodontic care. Every design begins with a clinical evaluation.",
    process: [
      { step: "01", title: "Facial & Dental Assessment", desc: "Detailed photographic and clinical evaluation of tooth proportions, gingival contours, and smile arc." },
      { step: "02", title: "Digital Mockup & Preview", desc: "Visualization of proposed modifications, allowing collaborative discussion before any procedure." },
      { step: "03", title: "Conservative Execution", desc: "Sequential execution using biomimetic restorations, veneers, or alignment suited to your anatomy." }
    ],
    expectations:
      "Treatment duration depends on the combination of therapies chosen. Clinical assessments ensure longevity, function, and comfort accompany aesthetic improvement.",
    keyAspects: ["Facial balance analysis", "Biomimetic aesthetics", "Conservative tooth preparation", "Long-term functional stability"],
    faqs: [
      { q: "Is smile designing a single procedure?", a: "No. It is a personalized planning approach that may combine restorative bonding, veneers, alignment, or gingival contouring based on your specific oral anatomy." },
      { q: "Can I preview what my smile will look like?", a: "Yes. Digital previews and mockups are discussed during consultation so you understand the potential outcomes before treatment commences." }
    ],
    image: "/clinic/treatments/smile-designing.webp",
    imageMobile: "/clinic/treatments/smile-designing-mobile.webp",
    imageFull: "/clinic/treatments/smile-designing-full.png",
    category: "Cosmetic & Smile Art",
    duration: "2–3 Visits",
    anesthesia: "Minimally invasive / Comfort care",
    longevity: "Long-term with regular care",
    visualHighlights: ["Facial midline & smile arc balance", "Biomimetic shade graduation", "Conservative enamel preservation"]
  },
  {
    slug: "orthodontics",
    index: "02",
    name: "Orthodontics",
    tagline: "Correcting alignment, bite dynamics, and dental arch form.",
    short: "Targeted correction of bite function and tooth position for adults and children.",
    intro: "Alignment, considered carefully.",
    overview:
      "Orthodontics focuses on diagnosing, preventing, and correcting malpositioned teeth and misaligned bite patterns. Proper alignment promotes healthy temporomandibular joint function, makes daily hygiene effective, and creates balanced aesthetics.",
    suitable:
      "Suitable for treating crowding, spacing, overbites, underbites, crossbites, and aesthetic concerns across both teens and adults.",
    process: [
      { step: "01", title: "Diagnostic Records", desc: "Comprehensive bite assessment, radiographs, and photographic study of jaw relations." },
      { step: "02", title: "Appliance Selection", desc: "Selection of conventional, ceramic, or self-ligating brackets matched to clinical requirements." },
      { step: "03", title: "Guided Tooth Movement", desc: "Gentle, progressive adjustments scheduled across the active treatment period followed by retention." }
    ],
    expectations:
      "Active treatment duration typically spans 12 to 24 months depending on complexity. Diligent oral hygiene and regular adjustment visits are essential.",
    keyAspects: ["Bite correction", "Arch alignment", "Hygiene improvement", "Retention protocols"],
    faqs: [
      { q: "Is orthodontic treatment suitable for adults?", a: "Yes. Healthy teeth can be moved at any age. Adult orthodontic consultations focus on both aesthetic goals and periodontic health." },
      { q: "Will I need to wear a retainer afterward?", a: "Yes. Retainers are a critical phase of orthodontic care to ensure teeth remain stabilized in their ideal final positions." }
    ],
    image: "/clinic/treatments/orthodontics.webp",
    imageMobile: "/clinic/treatments/orthodontics-mobile.webp",
    imageFull: "/clinic/treatments/orthodontics-full.png",
    category: "Orthodontic Realignment",
    duration: "12–24 Months",
    anesthesia: "Non-invasive",
    longevity: "Permanent with custom retention",
    visualHighlights: ["Precise bracket angulation", "Arch perimeter expansion", "Bite & TMJ stability"]
  },
  {
    slug: "clear-aligners",
    index: "03",
    name: "Clear Aligners",
    tagline: "Discreet, removable, digitally sequenced orthodontic trays.",
    short: "Virtually invisible aligners designed for flexible daily wear and precise tooth movement.",
    intro: "A clearer path starts with clarity.",
    overview:
      "Clear aligners represent modern digital orthodontics. Using sequential transparent trays engineered from precise 3D scans, teeth are guided into position incrementally. Trays are removable for meals and hygiene.",
    suitable:
      "Ideal for mild to moderate crowding, spacing, and relapse cases where discretion and flexibility are paramount. Clinical assessment confirms suitability.",
    process: [
      { step: "01", title: "Digital 3D Intraoral Scan", desc: "Capturing high-resolution digital impressions without messy impression materials." },
      { step: "02", title: "Sequential Staging Plan", desc: "Custom computer-guided plan mapping each aligner step from start to finish." },
      { step: "03", title: "Wear & Check-ins", desc: "Wearing each tray 20–22 hours daily with periodic monitoring by Dr. Ameen." }
    ],
    expectations:
      "Patient compliance is fundamental. Total timeframe typically ranges from 6 to 18 months based on case complexity and daily wear discipline.",
    keyAspects: ["Removable convenience", "Virtually undetectable", "No dietary restrictions", "Custom digitally mapped stages"],
    faqs: [
      { q: "Can everyone use clear aligners instead of braces?", a: "While aligners treat a broad spectrum of cases, certain severe skeletal or rotational discrepancies may still benefit from fixed orthodontics. A consultation establishes your candidacy." },
      { q: "How often do I switch aligner trays?", a: "Trays are usually changed every 7 to 14 days under the guidance of Dr. Ameen, depending on your customized staging plan." }
    ],
    image: "/clinic/treatments/clear-aligners.webp",
    imageMobile: "/clinic/treatments/clear-aligners-mobile.webp",
    imageFull: "/clinic/treatments/clear-aligners-full.png",
    category: "Digital Aligners",
    duration: "6–18 Months",
    anesthesia: "Non-invasive",
    longevity: "Permanent with retention",
    visualHighlights: ["Ultra-clear thermoplastic polymer", "Sub-millimeter tooth staging", "Removable convenience"]
  },
  {
    slug: "veneers",
    index: "04",
    name: "Veneers",
    tagline: "Handcrafted ceramic shells for refined shape, shade, and proportion.",
    short: "Ultrathin custom dental porcelain tailored to mask discoloration and structural wear.",
    intro: "The details deserve attention.",
    overview:
      "Dental porcelain veneers are custom-fabricated ceramic laminates bonded to the facial surface of teeth. They offer high stain resistance and biomimetic optical properties that emulate natural enamel translucency.",
    suitable:
      "Well-suited for persistent intrinsic stains, chipped enamel, slight gaps, or irregularly contoured teeth where conservative restoration is indicated.",
    process: [
      { step: "01", title: "Shade & Form Consultation", desc: "Careful selection of shade gradient, surface texture, and optical characterization." },
      { step: "02", title: "Micro-Preparation & Temporaries", desc: "Minimal enamel refinement preserving as much natural tooth structure as possible." },
      { step: "03", title: "Precision Bonding", desc: "Permanent adhesive bonding using dental composite resin cements under meticulous isolation." }
    ],
    expectations:
      "With diligent hygiene, regular check-ups, and protective nightguards when recommended, ceramic veneers offer exceptional aesthetic longevity.",
    keyAspects: ["Natural translucency", "Stain resistance", "Micro-conservative prep", "Custom shade matching"],
    faqs: [
      { q: "Do veneers look artificial?", a: "No. High-grade modern dental ceramics mimic the natural depth, opalescence, and micro-anatomy of genuine enamel." },
      { q: "Do veneers require special maintenance?", a: "Treat them like natural teeth with thorough brushing, flossing, avoiding biting non-food objects, and scheduling routine cleanings." }
    ],
    image: "/clinic/treatments/veneers.webp",
    imageMobile: "/clinic/treatments/veneers-mobile.webp",
    imageFull: "/clinic/treatments/veneers-full.png",
    category: "Cosmetic & Smile Art",
    duration: "2 Visits",
    anesthesia: "Conservative local comfort",
    longevity: "10–15+ Years",
    visualHighlights: ["Multi-layer optical translucency", "Sub-0.5mm micro preparation", "Stain-resistant glazed surface"]
  },
  {
    slug: "dental-implants",
    index: "05",
    name: "Dental Implants",
    tagline: "Permanent biocompatible foundation for missing tooth replacement.",
    short: "Titanium or ceramic fixtures that restore masticatory strength and natural appearance.",
    intro: "A thoughtful next step after tooth loss.",
    overview:
      "A dental implant replaces the missing root structure with a biocompatible fixture integrated into the jawbone. It anchors a custom ceramic crown, bridge, or denture without needing to trim adjacent healthy teeth.",
    suitable:
      "Appropriate for replacing single or multiple missing teeth in patients with sufficient bone volume and good periodontal and general health.",
    process: [
      { step: "01", title: "Clinical & Radiographic Study", desc: "Assessing bone density, nerve pathways, and sinus anatomy for safe surgical planning." },
      { step: "02", title: "Implant Placement", desc: "Gentle surgical positioning under local anesthesia followed by an osseointegration period." },
      { step: "03", title: "Prosthetic Crown Delivery", desc: "Fabricating and securing a custom shade-matched restorative crown that functions like a natural tooth." }
    ],
    expectations:
      "Implants have one of the highest success rates in modern medicine when properly maintained. Osseointegration typically requires 2 to 4 months before final crown loading.",
    keyAspects: ["Preserves adjacent teeth", "Stimulates healthy bone", "Restores biting power", "Decades of proven longevity"],
    faqs: [
      { q: "Is dental implant surgery painful?", a: "The procedure is performed under precise local anesthesia and is generally associated with minimal discomfort, easily managed with routine pain relief." },
      { q: "How long do dental implants last?", a: "With good oral hygiene, non-smoking status, and regular clinical cleanings, implants are designed to provide long-lasting, often lifetime service." }
    ],
    image: "/clinic/treatments/dental-implants.webp",
    imageMobile: "/clinic/treatments/dental-implants-mobile.webp",
    imageFull: "/clinic/treatments/dental-implants-full.png",
    category: "Restorative & Surgical",
    duration: "2–4 Months Osseointegration",
    anesthesia: "Gentle local anesthesia",
    longevity: "Decades / Lifetime",
    visualHighlights: ["Biocompatible titanium fixture", "Independent root replacement", "Custom shaded ceramic crown"]
  },
  {
    slug: "root-canal-treatment",
    index: "06",
    name: "Root Canal Treatment",
    tagline: "Preserving natural tooth vitality and relieving pulp inflammation.",
    short: "High-precision therapy to remove infection, seal root canals, and save natural teeth.",
    intro: "Understanding the path to preserving a tooth.",
    overview:
      "Endodontic root canal therapy treats infection or deep inflammation within the dental pulp chamber. By removing damaged tissue, disinfecting the canal space, and sealing it three-dimensionally, the natural tooth structure is preserved.",
    suitable:
      "Indicated for severe toothache, lingering thermal sensitivity, deep decay reaching the pulp, trauma, or localized apical abscesses.",
    process: [
      { step: "01", title: "Diagnosis & Isolation", desc: "Precision pulp testing, digital radiography, and sterile rubber dam isolation of the tooth." },
      { step: "02", title: "Chemo-Mechanical Cleaning", desc: "Gentle rotary canal instrumentation combined with antibacterial irrigants to eliminate infection." },
      { step: "03", title: "Hermetic Sealing & Crown", desc: "Three-dimensional biocompatible obturation followed by coronal buildup and protective crown." }
    ],
    expectations:
      "Modern root canal treatment is comfortable and straightforward. Saving the natural tooth helps maintain normal chewing dynamics and facial bone structure.",
    keyAspects: ["Immediate pain relief", "Preserves natural tooth", "Sterile isolation", "Protective crown restoration"],
    faqs: [
      { q: "Does a root canal hurt?", a: "Modern local anesthetics and rotary endodontic instruments allow root canal therapy to be performed comfortably, relieving pain rather than causing it." },
      { q: "Why save a tooth instead of extracting it?", a: "Preserving the natural tooth maintains proper jaw spacing, biting efficiency, and bone structure, often proving more cost-effective than replacement." }
    ],
    image: "/clinic/treatments/root-canal-treatment.webp",
    imageMobile: "/clinic/treatments/root-canal-treatment-mobile.webp",
    imageFull: "/clinic/treatments/root-canal-treatment-full.png",
    category: "Endodontic Tooth Preservation",
    duration: "1–2 Visits",
    anesthesia: "Painless local anesthesia",
    longevity: "Long-term natural tooth preservation",
    visualHighlights: ["Precision pulp chamber disinfection", "Hermetic 3D canal obturation", "Protective crown stabilization"]
  }
];

export const certificates = [
  {
    title: "Certificate of Membership",
    issuer: "Indian Dental Association",
    holder: "Dr. Ameen",
    description: "Official professional membership in the Indian Dental Association, upholding strict national ethical and clinical standards."
  },
  {
    title: "Advanced Restorative Dentistry",
    issuer: "Malabar Dental College, Kozhikode",
    holder: "Dr. Ameen",
    description: "Comprehensive clinical training program covering contemporary adhesive techniques, ceramic restorations, and biomimetic protocols."
  },
  {
    title: "Basic Oral Implantology",
    issuer: "Indian Dental Association",
    holder: "Dr. Ameen",
    description: "Certified clinical course in dental implant placement, bone evaluation, and prosthetic restoration principles."
  },
  {
    title: "Continuing Dental Education",
    issuer: "Accredited Dental Academic Council",
    holder: "Dr. Ameen",
    description: "Ongoing professional development credits maintaining expertise in modern diagnostic and clinical treatment modalities."
  }
];

export const commonFaqs = [
  {
    q: "How do I request an appointment at Dr. Ameen's Smile Studio?",
    a: "You can request an appointment by calling the clinic directly at +91 73063 08876 or sending a message on WhatsApp. Our reception team will confirm convenient timings and answer initial questions."
  },
  {
    q: "Where is the clinic located in South Koduvally?",
    a: "The studio is located near Erapund Juma Masjid in Madrassa Bazar, South Koduvally, Koduvally, Kozhikode District, Kerala 673572. It features on-site parking and accessible street entry."
  },
  {
    q: "What are the clinic's operating hours?",
    a: "The studio is open Monday to Saturday from 10:00 AM to 7:00 PM. We recommend calling ahead or booking online to minimize waiting time."
  },
  {
    q: "How are treatment costs determined?",
    a: "Every mouth is unique. Following a thorough clinical examination and diagnostic discussion, Dr. Ameen provides a transparent breakdown of treatment options and associated fees before beginning any care."
  },
  {
    q: "What safety and sterilization standards do you follow?",
    a: "The clinic adheres to strict hospital-grade sterilization protocols. All instruments are processed through automated ultrasonic cleaning and sealed autoclave pouches opened immediately before your care."
  },
  {
    q: "What should I do in a dental emergency?",
    a: "For acute pain, traumatic dental injury, or swelling, please call +91 73063 08876 immediately. We prioritize prompt relief for urgent dental situations."
  }
];
