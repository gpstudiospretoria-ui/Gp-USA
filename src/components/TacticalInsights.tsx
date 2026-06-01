import React, { useState } from 'react';
import { ArrowRight, BookOpen, Clock, X, CheckCircle, ShieldCheck } from 'lucide-react';

interface Article {
  title: string;
  category: string;
  readTime: string;
  summary: string;
  content: string[];
  keyTactics: string[];
}

const INSIGHTS_DATA: Article[] = [
  {
    title: "The ATS Algorithm Trap: How Clean Structure Beats Over-Designed Resumes",
    category: "Careers",
    readTime: "5 Min Read",
    summary: "Most modern applicants in Gauteng get filtered out by formatting anomalies before a human eyes their application. Discover the key visual frameworks that parse perfectly through screening machines.",
    content: [
      "Modern corporate recruiters in Pretoria and Johannesburg handle hundreds of applications daily. To manage this volume, they employ Applicant Tracking Systems (ATS) to filter, rank, and score CVs automatically before any human ever inspects them.",
      "A common mistake of high-ambition professionals is using complex two-column graphics, visual skill meters, custom icons, or nested tables. While these can look impressive to an amateur eye, the ATS parser sees them as garbled gibberish, automatically rejecting the profile due to missing essential text headers.",
      "To bypass this barrier, your profile must prioritize single-column linear text sequencing. Every segment needs to begin with standardized header lines (e.g., 'Professional Experience', 'Core Competencies') and utilize standard active verbs to ensure matching scores above 90%."
    ],
    keyTactics: [
      "Strict single-column text mapping only — no nested grids or text blocks.",
      "Use standard bullet shapes instead of hand-drawn vectors or symbols.",
      "Include standard PDF / DOCX formats with precise title keywords matching target roles."
    ]
  },
  {
    title: "One Page, No Fluff: Engineering Single-Sheet Frameworks for Angels",
    category: "Ventures",
    readTime: "4 Min Read",
    summary: "Angel investors spend an average of 23 seconds reviewing initial pitch summaries. Learn the hard distribution layout required to establish valuation parameters with immediate velocity.",
    content: [
      "When fundraising in the Gauteng angel ecosystem, founders often try to impress investors with extensive 60-page PDF manifestos. In reality, investors will rarely open a document that dense during prime triage phases.",
      "An elite 1-Page Business Plan or One-Pager is designed to answer the investor's core questions in under 30 seconds: What is the high-value localized problem? How does your tech solve this profitably? What is the pricing unit economics, and what is your sustainable competitive moat?",
      "By condensing these answers into structured segments, you signal high-level operational clarity. Disorganized plans imply disorganized execution."
    ],
    keyTactics: [
      "Problem and Solution must fit inside the absolute top third of the frame.",
      "Map unit economics in a clean, bold visual layout (ZAR equivalent matches).",
      "List immediate 12-month capital deployment milestones."
    ]
  },
  {
    title: "Deconstructing High-Grade Essay Outlines Under Radical Time Constraints",
    category: "Academics",
    readTime: "6 Min Read",
    summary: "Academic analysis breaks down when argument architecture is flawed. We show you how to structure core thematic logic so your actual writing serves strictly to validate thesis targets.",
    content: [
      "Writing high-tier Honours or postgraduate assignments doesn't require endless structural panicking. The primary metric separating distinction grades from standard passes is rigid thesis governance.",
      "A structured outline aligns every single bodily paragraph back to the primary claim statement. If a paragraph does not actively prove or qualify your central assertion, it is structural bloat and must be excised.",
      "Using paragraph mapping systems like PEAR (Point, Evidence, Analysis, relevance) keeps thoughts from drifting and makes assignment production incredibly fast and straightforward."
    ],
    keyTactics: [
      "Establish your core thesis claim in the final sentence of section one.",
      "Outline body segments with specific target evidence claims already allocated.",
      "Follow regional South African citations guides (Harvard SA / APA) strictly."
    ]
  }
];

export function TacticalInsights() {
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);

  return (
    <section id="insights" className="py-24 border-t border-white/10 bg-[#0a0c14]/20 relative overflow-hidden">
      {/* Mesh Background Blurs */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/10 rounded-full blur-[140px] pointer-events-none float-bg" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-16 gap-6">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-slate-400 mb-2 block">
              Strategic Execution Labs
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
              Tactical Insights
            </h2>
          </div>
          <p className="text-slate-300 text-sm max-w-md leading-relaxed font-light">
            Raw, uncompromised strategies regarding formatting mechanics, conversion frameworks, and professional design execution. Click any paper to view full tactics.
          </p>
        </div>

        {/* Articles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {INSIGHTS_DATA.map((article, idx) => (
            <article 
              key={idx} 
              id={`article-${idx}`}
              className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 flex flex-col justify-between transition-all duration-300 relative group hover:border-white/20 hover:scale-[1.01] hover:shadow-xl hover:shadow-black/15"
            >
              <div>
                <div className="flex items-center space-x-3 mb-6">
                  <span className="text-[9px] font-bold tracking-widest bg-white/10 text-white px-2.5 py-1 uppercase rounded-lg border border-white/10">
                    {article.category}
                  </span>
                  <span className="flex items-center text-[10px] text-slate-400 font-bold uppercase">
                    <Clock className="h-3 w-3 mr-1" />
                    {article.readTime}
                  </span>
                </div>
                
                <h3 className="text-lg sm:text-xl font-extrabold text-white tracking-tight mb-4 group-hover:text-emerald-400 transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-slate-300 text-xs leading-relaxed mb-8 font-light">
                  {article.summary}
                </p>
              </div>

              <button
                id={`btn-read-protocol-${idx}`}
                onClick={() => setSelectedArticle(article)}
                className="inline-flex items-center text-xs font-bold tracking-widest text-white group cursor-pointer text-left focus:outline-none"
              >
                READ PROTOCOL 
                <ArrowRight className="h-4 w-4 ml-2 transform group-hover:translate-x-1.5 transition-transform" />
              </button>
            </article>
          ))}
        </div>
      </div>

      {/* Interactive Modal Slider Overlay */}
      {selectedArticle && (
        <div id="insight-modal-overlay" className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 sm:p-6 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#0a0c14]/90 backdrop-blur-2xl border border-white/15 max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-[32px] relative shadow-2xl">
            <button
              id="btn-close-modal"
              onClick={() => setSelectedArticle(null)}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 text-slate-400 hover:text-white transition-colors cursor-pointer"
            >
              <X className="h-6 w-6" />
            </button>

            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-emerald-400 mb-2 block">
              GP STUDIO INSIGHT PROTOCOL
            </span>

            <h3 className="text-xl sm:text-3xl font-extrabold text-white tracking-tight mb-4">
              {selectedArticle.title}
            </h3>

            <div className="flex items-center space-x-4 text-xs text-slate-400 mb-8 pb-4 border-b border-white/10 font-medium">
              <span className="font-bold uppercase bg-white/10 px-2.5 py-1 border border-white/10 rounded-md text-white">
                {selectedArticle.category}
              </span>
              <span>{selectedArticle.readTime}</span>
              <span>Published: 2026</span>
            </div>

            <div className="space-y-6 text-sm text-slate-300 leading-relaxed font-sans font-light">
              {selectedArticle.content.map((paragraph, pIdx) => (
                <p key={pIdx}>{paragraph}</p>
              ))}
            </div>

            {/* Strategic Checklist */}
            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="text-xs font-bold uppercase tracking-widest block text-white mb-4 flex items-center">
                <ShieldCheck className="h-4 w-4 text-emerald-400 mr-2" />
                Target Directives For Execution
              </span>
              <ul className="space-y-3">
                {selectedArticle.keyTactics.map((tactic, tIdx) => (
                  <li key={tIdx} className="text-xs text-slate-450 flex items-start">
                    <CheckCircle className="h-4 w-4 text-emerald-400 mr-2.5 shrink-0 mt-0.5" />
                    <span className="font-light">{tactic}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              id="btn-modal-close-lower"
              onClick={() => setSelectedArticle(null)}
              className="mt-10 w-full py-4 bg-white/10 border border-white/20 hover:bg-white text-white hover:text-black rounded-2xl font-bold text-xs tracking-widest uppercase transition-all duration-300 cursor-pointer"
            >
              CLOSE PROTOCOL WORKSPACE
            </button>
          </div>
        </div>
      )}
    </section>
  );
}
