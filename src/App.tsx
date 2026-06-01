import React, { useState, useRef } from 'react';
import { 
  Briefcase, Landmark, ShieldCheck, HelpCircle, 
  ChevronDown, ChevronUp, ExternalLink, PhoneCall, HelpCircle as HelpIcon 
} from 'lucide-react';
import { ServiceDetail, ServiceId } from './types';
import { ServiceCard } from './components/ServiceCard';
import { DraftingWorkspace } from './components/DraftingWorkspace';
import { TacticalInsights } from './components/TacticalInsights';

const SERVICES_DATA: ServiceDetail[] = [
  {
    id: 'resume',
    name: "Resume + Cover Letter",
    priceUSD: 19,
    priceZAR: 350,
    category: "Professional Service",
    accentClass: "border-t-emerald-500",
    glowClass: "glow-green",
    badge: "ATS PASS",
    highlights: [
      "Same-day rapid draft turnaround",
      "Perfect ATS layout alignment",
      "Executive phrasing with active verbs"
    ]
  },
  {
    id: 'social',
    name: "10-Post Social Media Pack",
    priceUSD: 24,
    priceZAR: 440,
    category: "For Small Businesses",
    accentClass: "border-t-yellow-500",
    glowClass: "glow-yellow",
    badge: "VIRAL BATCH",
    highlights: [
      "Instagram & Facebook optimized formats",
      "Tailored captions & targeted local hashtags",
      "Engaging copy designed to convert clicks"
    ]
  },
  {
    id: 'business',
    name: "1-Page Business Plan",
    priceUSD: 29,
    priceZAR: 530,
    category: "For Entrepreneurs",
    accentClass: "border-t-orange-500",
    glowClass: "glow-orange",
    badge: "INVESTOR GRADE",
    highlights: [
      "High-density investor layout",
      "Value proposition & unit metrics segment",
      "Prepared in under 2 hours"
    ]
  },
  {
    id: 'essay',
    name: "Structured Essay Outline",
    priceUSD: 9,
    priceZAR: 165,
    category: "For Students",
    accentClass: "border-t-purple-500",
    glowClass: "glow-purple",
    badge: "DISTINCTION TRACK",
    highlights: [
      "Complete paragraph hierarchy & thesis blueprint",
      "Fits any major grade or specialized subject",
      "30-minute panic delivery protocol"
    ]
  }
];

export default function App() {
  const [selectedServiceId, setSelectedServiceId] = useState<ServiceId>('resume');
  const [showSeoHub, setShowSeoHub] = useState<boolean>(true);
  const [activeFaqId, setActiveFaqId] = useState<number | null>(null);

  const sandboxRef = useRef<HTMLDivElement>(null);

  // Scroll smoothly to Workspace and activate selected service tab
  const handleServiceSelect = (id: string) => {
    setSelectedServiceId(id as ServiceId);
    
    // Smooth scroll down to drafting bay
    const element = document.getElementById('interactive-workspace');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const toggleFaq = (id: number) => {
    setActiveFaqId(activeFaqId === id ? null : id);
  };

  return (
    <div className="bg-[#0a0c14] text-slate-100 font-sans antialiased selection:bg-white/10 selection:text-white min-h-screen relative overflow-hidden">
      {/* Mesh Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/20 rounded-full blur-[120px] pointer-events-none float-bg z-0" />
      <div className="absolute bottom-[20%] right-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none float-bg z-0" />
      <div className="absolute top-[40%] right-[10%] w-[30%] h-[30%] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none float-bg z-0" />
      
      {/* 1. NAVIGATION HEADER */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-[#0a0c14]/75 border-b border-white/10 transition-all duration-300">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div className="flex flex-col">
            <a href="#" className="text-xl sm:text-2xl font-black tracking-wider text-white">
              GP STUDIO<span className="text-emerald-400">.</span>
            </a>
            <span className="text-[9px] tracking-[0.25em] text-slate-400 font-extrabold uppercase mt-0.5">
              PRETORIA, GAUTENG
            </span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-10 text-xs font-bold tracking-widest">
            <a href="#services" className="text-slate-400 hover:text-white transition-colors duration-200">
              SERVICES
            </a>
            <a href="#interactive-workspace" className="text-slate-400 hover:text-white transition-colors duration-200 flex items-center">
              DRAFTER BAY
              <span className="ml-1.5 w-1.5 h-1.5 bg-emerald-455 rounded-full animate-ping" />
            </a>
            <a href="#insights" className="text-slate-400 hover:text-white transition-colors duration-200">
              TACTICAL INSIGHTS
            </a>
            <a href="#how-it-works" className="text-slate-400 hover:text-white transition-colors duration-200">
              LOGISTICS
            </a>
          </nav>

          <div>
            <a 
              id="header-whatsapp-btn"
              href="https://wa.me/27740740875" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-flex items-center justify-center px-5 py-3 border border-white/10 rounded-xl bg-white/5 hover:bg-white text-white hover:text-black font-extrabold text-[10px] sm:text-xs tracking-widest transition-all duration-300"
            >
              WHATSAPP SUPPORT
            </a>
          </div>
        </div>
      </header>

      {/* 2. HERO LANDING CORE */}
      <section className="relative pt-20 pb-16 lg:pt-32 lg:pb-28 overflow-hidden bg-transparent z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <span className="inline-block text-[10px] font-extrabold tracking-[0.25em] uppercase text-slate-300 border border-white/10 px-5 py-2.5 mb-10 bg-white/5 backdrop-blur-xl rounded-full">
              HIGH-IMPACT DIGITAL EXECUTION
            </span>
            
            <h1 className="text-3xl sm:text-5xl lg:text-7xl font-light text-white tracking-tight leading-none mb-8">
              You Don&#39;t Need More Skills. <br className="hidden sm:inline" />
              <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-300 to-slate-500">You Need Better Presentation.</span>
            </h1>
            
            <p className="text-sm sm:text-lg text-slate-300 font-light leading-relaxed max-w-2xl mx-auto mb-12">
              Stop letting poor formatting hold your ambitions back. We engineer elite resumes, investor-ready business plans, structured essay frameworks, and viral social media assets with relentless speed.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a 
                href="#services" 
                className="w-full sm:w-auto px-8 py-4 bg-white text-[#0a0c14] hover:bg-slate-200 font-extrabold text-xs tracking-widest transition-all duration-300 text-center rounded-2xl shadow-xl shadow-white/5"
              >
                VIEW CORE SERVICES
              </a>
              <a 
                href="#interactive-workspace" 
                className="w-full sm:w-auto px-8 py-4 bg-white/15 border border-white/10 text-white hover:bg-white/25 font-extrabold text-xs tracking-widest transition-all duration-300 text-center rounded-2xl"
              >
                LAUNCH SANDBOX DRAFTER
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 3. VALUE METRIC BAR */}
      <section className="border-y border-white/10 bg-white/5 backdrop-blur-md py-10 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-4 text-center">
            <div className="flex flex-col justify-center">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight uppercase">
                SAME DAY
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">
                Rapid Delivery
              </span>
            </div>
            
            <div className="flex flex-col justify-center border-white/10 lg:border-l">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                $9+ / R160+
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">
                Hyper-Affordable
              </span>
            </div>
            
            <div className="flex flex-col justify-center border-t border-white/10 pt-6 sm:pt-0 sm:border-t-0 sm:border-l sm:border-white/10">
              <span className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                100%
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">
                Custom Built
              </span>
            </div>
            
            <div className="flex flex-col justify-center border-t border-white/10 pt-6 sm:pt-0 sm:border-l sm:border-white/10">
              <span className="text-lg sm:text-2xl font-black text-emerald-400 tracking-tight">
                +27 74 074 0875
              </span>
              <span className="text-[10px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-2">
                WhatsApp Pipeline Hub
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 4. CORE SERVICES GRID SECTION */}
      <section id="services" className="py-24 lg:py-32 scroll-mt-20 z-10 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-20">
            <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-slate-500 block mb-2">
              DESIGN LAYOUT MATRIX
            </span>
            <h2 className="text-3xl sm:text-5xl font-black text-white tracking-tight mb-4">
              Core Structural Offerings
            </h2>
            <p className="text-slate-300 text-sm sm:text-base max-w-lg mx-auto font-light">
              Select your objective. All digital engineering is deployment-ready at record speeds. Launch the interactive Sandbox to start drafting immediately.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {SERVICES_DATA.map((service) => (
              <ServiceCard 
                key={service.id} 
                service={service} 
                onSelect={handleServiceSelect} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. INTERACTIVE SANDBOX DRAFTER (CROWN JEWEL INTEGRATION) */}
      <div ref={sandboxRef}>
        <DraftingWorkspace initialServiceId={selectedServiceId} />
      </div>

      {/* 6. EXPANDABLE TECHNICAL INSIGHTS GRID */}
      <TacticalInsights />

      {/* 7. FULFILLMENT AND LOGISTICS HUB */}
      <section id="how-it-works" className="py-24 border-t border-white/10 bg-[#0a0c14]/40 scroll-mt-20 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-16 text-center rounded-[32px] overflow-hidden relative shadow-xl">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent pointer-events-none" />
            
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-4 block">
              Fulfillment Protocol
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white tracking-tight mb-6">
              Fulfillment Logistics via WhatsApp
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed max-w-2xl mx-auto mb-10 font-light">
              After completing your checkout transaction on Gumroad, route your digital receipt directly along with your necessary prompt details to our processing matrix via WhatsApp. Execution triggers instantly.
            </p>
            
            <div className="inline-block bg-white/5 border border-white/10 p-6 md:px-12 md:py-8 max-w-full rounded-2xl">
              <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400 block mb-2">
                GP STUDIO Pretoria Pipeline Connection
              </span>
              <a 
                id="btn-whatsapp-phone-direct"
                href="https://wa.me/27740740875" 
                target="_blank" 
                rel="noopener noreferrer" 
                className="text-xl sm:text-4xl font-black text-emerald-450 tracking-tight hover:text-emerald-300 transition-colors block break-all"
              >
                +27 74 074 0875
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* 8. SYSTEM FAQs */}
      <section className="py-16 border-t border-white/10 bg-[#0a0c14]/60 relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <span className="text-[9px] font-bold tracking-widest text-[#94a3b8] uppercase block mb-2">COMMON INQUIRIES</span>
            <h3 className="text-2xl font-black text-white tracking-tight font-sans">Got Questions? FAQ</h3>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What formatting tools are utilized for elite CV output?",
                a: "We develop ATS CV blueprints that convert. Our CV structures are built in standardized Word files (.docx) and linear font-embedded PDFs. We avoid multi-column shapes that trigger parsing script blocks."
              },
              {
                q: "How does the ZAR payment and Gumroad flow work?",
                a: "Our core checkout links process internationally via standard credit cards or PayPal. On Gumroad, currency selects automatically. After completing your checkout, send your receipt and drafted elements to +27 74 074 0875 to load production!"
              },
              {
                q: "Can I request urgent turnaround delivery?",
                a: "Absolutely. Student Outlines and 1-Page Business Plans offer premium express processing slots, letting you meet tight deadlines in Pretoria/Gauteng with 30-minute window options."
              }
            ].map((faq, index) => (
              <div key={index} className="border border-white/10 bg-white/5 hover:bg-white/10 transition-colors rounded-2xl">
                <button
                  id={`faq-btn-${index}`}
                  onClick={() => toggleFaq(index)}
                  className="w-full px-6 py-5 flex items-center justify-between text-left focus:outline-none focus:ring-0 cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-extrabold text-white tracking-normal uppercase">{faq.q}</span>
                  {activeFaqId === index ? <ChevronUp className="h-4 w-4 text-slate-400 shrink-0" /> : <ChevronDown className="h-4 w-4 text-slate-400 shrink-0" />}
                </button>
                {activeFaqId === index && (
                  <div className="px-6 pb-5 pt-1 text-xs text-slate-300 leading-relaxed border-t border-white/5 animate-fadeIn font-sans font-light">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 9. SEO KNOWLEDGE HUB (EXTENDED STRATEGY MATRIX) */}
      <section className="py-16 border-t border-white/10 bg-[#0a0c14]/40 z-10 relative">
        <div className="max-w-5xl mx-auto px-4 sm:px-6">
          <div className="border border-white/10 p-8 sm:p-12 relative overflow-hidden bg-white/5 backdrop-blur-xl rounded-[32px]">
            <div className="flex items-center justify-between mb-8 pb-4 border-b border-white/10">
              <span className="inline-block text-[10px] font-extrabold tracking-[0.2em] uppercase text-emerald-450 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-md">
                SEO Knowledge Hub & Strategy Matrix
              </span>
              <button 
                id="btn-toggle-seo"
                onClick={() => setShowSeoHub(!showSeoHub)} 
                className="text-xs font-bold text-slate-400 hover:text-white transition-colors uppercase tracking-widest flex items-center cursor-pointer"
              >
                {showSeoHub ? 'COLLAPSE HUB' : 'EXPAND HUB'}
                {showSeoHub ? <ChevronUp className="h-4 w-4 ml-1.5" /> : <ChevronDown className="h-4 w-4 ml-1.5" />}
              </button>
            </div>

            {showSeoHub && (
              <div className="animate-fadeIn">
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight mb-6">
                  The Mechanics of Elite Document Presentation: Why Formatting Dictates Real-World Conversion Rates
                </h3>
                
                <div className="prose prose-invert text-neutral-400 text-xs sm:text-sm leading-relaxed space-y-6">
                  <p>
                    In both the hyper-competitive South African job market and the modern fundraising landscape, the margin for presentation error is exactly zero. Whether you are looking for a top-tier <strong className="text-neutral-200">professional resume writer in Pretoria</strong> to bypass automated screening, or searching for actionable <strong class="text-neutral-200">business plan templates in South Africa</strong> to lock down capital, the core underlying bottleneck remains identical: structured layout mechanics.
                  </p>
                  
                  <h4 className="text-sm font-extrabold text-white tracking-tight uppercase pt-2">
                    1. Optimizing for the ATS Algorithm in South African Corporate Recruitment
                  </h4>
                  <p>
                    Most corporate applicants in Gauteng assume their career background is the reason they aren&#39;t landing interviews. In reality, over 70% of applications are filtered out instantly by an Applicant Tracking System (ATS) due to poor document architecture. When sourcing a <strong className="text-neutral-200">professional CV writer in Pretoria</strong> or using local <strong className="text-neutral-200">cv distribution services in South Africa</strong>, your data must be structured cleanly. Scripting systems cannot accurately parse multi-column tables, text boxes, or decorative graphics. By deploying strict, linear hierarchies and embedding contextual, industry-specific keywords, your document transitions seamlessly from a screening machine directly to a hiring manager&#39;s desk.
                  </p>
                  
                  <h4 className="text-sm font-extrabold text-white tracking-tight uppercase pt-2">
                    2. Structural Frameworks for Funding: The Power of a 1-Page Business Plan
                  </h4>
                  <p>
                    When early-stage entrepreneurs approach a <strong class="text-neutral-200">business plan consultant in Gauteng</strong>, they frequently expect a dense, 50-page corporate manual. However, modern angels and venture funds prioritize clarity and rapid validation above all else. Utilizing a highly optimized, data-dense <strong className="text-neutral-200">1 page business plan for funding</strong> lets you communicate your value proposition, customer acquisition strategy, and unit economics under 30 seconds. If your initial presentation layout is disorganized, investors assume your operational execution will be similarly chaotic. High-velocity formatting ensures your financial milestones stand out clearly on the first pass.
                  </p>

                  <h4 className="text-sm font-extrabold text-white tracking-tight uppercase pt-2">
                    3. Eliminating Academic Friction with Scalable Essay Outlines
                  </h4>
                  <p>
                    For university students and postgraduate researchers throughout South Africa, academic friction rarely stems from a lack of research. Instead, it is almost always caused by a structural breakdown in argument logic. Implementing a meticulous <strong class="text-neutral-200">essay outline structure helper</strong> lets you lock down your thesis targets, core parameters, and source validations before typing a single sentence. Professional <strong class="text-neutral-200">academic document formatting services in South Africa</strong> consistently reveal that clean logical sequencing is the primary metric that moves a submission from a standard pass to an elite distinction grade.
                  </p>
                  
                  <div className="mt-8 p-6 bg-neutral-900/30 border border-neutral-900 rounded-none text-xs">
                    <span className="block font-bold text-white uppercase tracking-wider mb-2">
                      GP Studio Operational Index
                    </span>
                    <p className="m-0 text-neutral-500">
                      Based out of Pretoria, Gauteng, GP Studio engineers high-impact digital document layouts. We build ATS-friendly CV templates, investor presentation layouts, and tailored corporate solutions engineered for immediate clarity, premium aesthetic distribution, and maximum real-world conversion performance.
                    </p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* 10. POLISHED FOOTER */}
      <footer className="border-t border-white/10 py-12 bg-[#0a0c14] relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <span className="text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase text-center sm:text-left">
            &copy; 2026 GP STUDIO. ALL RIGHTS RESERVED. IN ASSOCIATION WITH GPSTUDIOSPRETORIA.
          </span>
          <div className="flex space-x-8 text-[10px] font-bold tracking-[0.2em] text-slate-500 uppercase">
            <a href="#services" className="hover:text-white transition-colors">
              Services
            </a>
            <a href="#interactive-workspace" className="hover:text-white transition-colors">
              Drafter Bay
            </a>
            <a href="#insights" className="hover:text-white transition-colors">
              Insights
            </a>
            <a href="#how-it-works" className="hover:text-white transition-colors">
              Logistics
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
