import React, { useState } from 'react';
import { 
  FileText, Send, Sparkles, Copy, RefreshCw, Smartphone, 
  Share2, ArrowRight, Download, Eye, FileSpreadsheet, Check
} from 'lucide-react';
import { ServiceId, ServiceFormFields, GenerationResult } from '../types';

interface DraftingWorkspaceProps {
  initialServiceId: ServiceId;
}

// Pre-packaged high-impact templates for instant testing/demonstration
const PLACEHOLDER_PRESETS: ServiceFormFields = {
  resume: {
    fullName: "Thabo Molefe",
    targetRole: "Senior Logistics Operations Lead",
    experienceYears: "8 Years",
    keySkills: "Gauteng Supply Chain Optimisation, Fleet Management, SAP ERP, Warehouse Automation",
    primaryAchievements: "Redesigned transport logistics routes across Ekurhuleni saving 18% fuel cost; Managed a cross-functional dispatch team of 24 operators."
  },
  social: {
    businessName: "Pretoria Craft Brews",
    niche: "Local Artisanal Beverages & Dining",
    primaryProduct: "Signature Rooibos-Infused Craft Ale",
    targetAudience: "Young professionals, food enthusiasts, and beer lovers in Gauteng",
    brandTone: "Energetic, authentic, locally proud, and invite-focused"
  },
  business: {
    companyName: "Leratong Agritech Solutions",
    conceptDetails: "Providing automated crop monitoring and precise irrigation diagnostics to vertical farmers in South Africa.",
    revenueModel: "SaaS monthly subscription model for analytics dashboard, plus localized field sensor installation fee.",
    fundingTarget: "R500,000 Seed Funding from local angel networks",
    keyCompetitors: "Traditional non-IoT farming practices & high-cost imported European agricultural monitors"
  },
  essay: {
    topic: "The Economic Consequences of the Gauteng Quality of Life Survey on Public Transit Planning",
    academicLevel: "Honours Degree / Postgraduate Research",
    keyArguments: "Public transit demands outperform private luxury options; High-density planning around rail networks ensures spatial equity; Current budgets lack micro-transportation support.",
    thesisClaim: "Urban densification is Gauteng's primary lever to solve long-term mobility bottlenecks and structural isolation.",
    formattingStyle: "Harvard South African Style Guide"
  }
};

export function DraftingWorkspace({ initialServiceId }: DraftingWorkspaceProps) {
  const [activeTab, setActiveTab] = useState<ServiceId>(initialServiceId);
  const [formData, setFormData] = useState<ServiceFormFields>(PLACEHOLDER_PRESETS);
  const [isDrafting, setIsDrafting] = useState<boolean>(false);
  const [draftResult, setDraftResult] = useState<GenerationResult | null>(null);
  const [errorText, setErrorText] = useState<string | null>(null);
  const [copiedSectionIndex, setCopiedSectionIndex] = useState<number | null>(null);

  // Sync active tab clicks
  const selectTab = (id: ServiceId) => {
    setActiveTab(id);
    setErrorText(null);
  };

  // Handle value change dynamically
  const handleInputChange = (service: ServiceId, field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [service]: {
        ...prev[service],
        [field]: value
      }
    }));
  };

  // Run the server-side drafting flow
  const triggerDraftGeneration = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsDrafting(true);
    setDraftResult(null);
    setErrorText(null);

    try {
      const currentFields = formData[activeTab];
      const response = await fetch("/api/generate-draft", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          serviceId: activeTab,
          fields: currentFields
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to generate your blueprint draft.");
      }

      const data: GenerationResult = await response.json();
      setDraftResult(data);
    } catch (err: any) {
      console.error(err);
      setErrorText(err.message || "An unexpected error occurred during state optimization.");
    } finally {
      setIsDrafting(false);
    }
  };

  // Copy text to clipboard helper
  const handleCopyToClipboard = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedSectionIndex(index);
    setTimeout(() => setCopiedSectionIndex(null), 2000);
  };

  // Build the hyper-optimized WhatsApp transition url
  const generateWhatsAppRedirectUrl = () => {
    const directContact = "+27740740875";
    const serviceName = {
      resume: "Resume + Cover Letter Pack ($19)",
      social: "10-Post Social Media Caption Pack ($24)",
      business: "1-Page Business Plan Draft ($29)",
      essay: "Structured Essay Outline ($9)"
    }[activeTab];

    let message = `Hello GP Studio Pretoria!\n\nI have designed my document architecture using the Interactive AI Drafter and would like to trigger professional production.\n\n*SERVICE ORDERED:* ${serviceName}\n\n`;

    if (draftResult) {
      message += `*DOCUMENT TITLE:* ${draftResult.title}\n\n`;
      message += `*STRUCTURE PREVIEW:*:\n`;
      draftResult.structure.forEach(sec => {
        message += `\n*${sec.sectionName.toUpperCase()}*:\n${sec.content}\n`;
        if (sec.bulletPoints && sec.bulletPoints.length > 0) {
          sec.bulletPoints.forEach(bp => {
            message += `- ${bp}\n`;
          });
        }
      });
      message += `\n*STRATEGIC BRIEFINGS:*:\n${draftResult.strategicNotes}\n`;
    } else {
      // If they haven't generated but want to submit their draft inputs:
      message += `*DRAFT INPUTS submitted from template:*:\n`;
      const inputs = formData[activeTab];
      Object.entries(inputs).forEach(([key, val]) => {
        message += `- ${key}: ${val}\n`;
      });
    }

    message += `\nLooking forward to receiving the finalized formatted files! Please send payment details.`;
    return `https://wa.me/${directContact.replace(/\+/g, '')}?text=${encodeURIComponent(message)}`;
  };

  return (
    <div id="interactive-workspace" className="scroll-mt-24 py-16 sm:py-24 border-t border-white/10 bg-[#0a0c14]/40 relative overflow-hidden">
      {/* Mesh Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/25 rounded-full blur-[120px] pointer-events-none float-bg" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[140px] pointer-events-none float-bg" />
      <div className="absolute top-[20%] right-[10%] w-[30%] h-[30%] bg-rose-500/10 rounded-full blur-[100px] pointer-events-none float-bg" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="inline-block text-[10px] font-extrabold tracking-[0.25em] text-white border border-white/10 px-4 py-1.5 uppercase bg-white/5 mb-4 rounded-full">
            GP STUDIO DRAFTING BAY
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight mb-4">
            Interactive Document Sandbox
          </h2>
          <p className="text-sm sm:text-base text-slate-300 max-w-xl mx-auto leading-relaxed font-light">
            Test our format engine instantly. Select a document module, fill in your unique targets, and watch Gemini architect your initial presentation outline live.
          </p>
        </div>

        {/* Tab Selection Row */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-10 border-b border-white/10 pb-6">
          <button
            id="tab-resume"
            onClick={() => selectTab('resume')}
            className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === 'resume' 
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 shadow-lg shadow-emerald-950/20' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            ATS Resume Pack
          </button>
          <button
            id="tab-social"
            onClick={() => selectTab('social')}
            className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === 'social' 
                ? 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40 shadow-lg shadow-yellow-950/20' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            Social Media Block
          </button>
          <button
            id="tab-business"
            onClick={() => selectTab('business')}
            className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === 'business' 
                ? 'bg-orange-500/20 text-orange-300 border-orange-500/40 shadow-lg shadow-orange-950/20' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            1-Page Business Plan
          </button>
          <button
            id="tab-essay"
            onClick={() => selectTab('essay')}
            className={`px-5 py-3 text-xs font-bold tracking-widest uppercase border transition-all duration-300 rounded-xl cursor-pointer ${
              activeTab === 'essay' 
                ? 'bg-purple-500/20 text-purple-300 border-purple-500/40 shadow-lg shadow-purple-950/20' 
                : 'bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white'
            }`}
          >
            Essay Outline Solver
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 xl:gap-14">
          {/* LEFT: Input panel */}
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-8 sm:p-10 rounded-[32px] flex flex-col justify-between">
            <div>
              <div className="flex items-center space-x-3 mb-8">
                <FileText className={`h-5 w-5 ${activeTab === 'resume' ? 'text-emerald-400' : activeTab === 'social' ? 'text-yellow-400' : activeTab === 'business' ? 'text-orange-400' : 'text-purple-400'}`} />
                <h3 className="text-lg font-extrabold text-white tracking-tight uppercase">
                  {activeTab === 'resume' && 'Resume Parameters'}
                  {activeTab === 'social' && 'Social Branding Deck'}
                  {activeTab === 'business' && 'Venture Blueprint Fields'}
                  {activeTab === 'essay' && 'Academic Outline Framework'}
                </h3>
              </div>

              <form onSubmit={triggerDraftGeneration} className="space-y-6">
                {activeTab === 'resume' && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Applicant Full Name</label>
                      <input
                        id="input-name"
                        value={formData.resume.fullName}
                        onChange={(e) => handleInputChange('resume', 'fullName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-emerald-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Target Executive Role</label>
                      <input
                        id="input-role"
                        value={formData.resume.targetRole}
                        onChange={(e) => handleInputChange('resume', 'targetRole', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-emerald-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Years of Focus Experience</label>
                      <input
                        id="input-years"
                        value={formData.resume.experienceYears}
                        onChange={(e) => handleInputChange('resume', 'experienceYears', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-emerald-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Core Expertise & Skills</label>
                      <input
                        id="input-skills"
                        value={formData.resume.keySkills}
                        onChange={(e) => handleInputChange('resume', 'keySkills', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-emerald-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Measurable Accomplishments</label>
                      <textarea
                        id="input-achievements"
                        rows={4}
                        value={formData.resume.primaryAchievements}
                        onChange={(e) => handleInputChange('resume', 'primaryAchievements', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-emerald-500 focus:outline-none px-4 py-3 text-sm text-white transition-all resize-none"
                        required
                      />
                    </div>
                  </>
                )}

                {activeTab === 'social' && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Company/Brand Name</label>
                      <input
                        id="input-brand"
                        value={formData.social.businessName}
                        onChange={(e) => handleInputChange('social', 'businessName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-yellow-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Niche / Industry Segment</label>
                      <input
                        id="input-niche"
                        value={formData.social.niche}
                        onChange={(e) => handleInputChange('social', 'niche', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-yellow-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Primary Core Product or Offer</label>
                      <input
                        id="input-product"
                        value={formData.social.primaryProduct}
                        onChange={(e) => handleInputChange('social', 'primaryProduct', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-yellow-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Target Client Demographic</label>
                      <input
                        id="input-demographic"
                        value={formData.social.targetAudience}
                        onChange={(e) => handleInputChange('social', 'targetAudience', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-yellow-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Corporate/Brand Tone</label>
                      <input
                        id="input-tone"
                        value={formData.social.brandTone}
                        onChange={(e) => handleInputChange('social', 'brandTone', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-yellow-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                {activeTab === 'business' && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Venture Name</label>
                      <input
                        id="input-biz-name"
                        value={formData.business.companyName}
                        onChange={(e) => handleInputChange('business', 'companyName', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Core Value Proposition / Concept Brief</label>
                      <textarea
                        id="input-biz-concept"
                        rows={3}
                        value={formData.business.conceptDetails}
                        onChange={(e) => handleInputChange('business', 'conceptDetails', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-sm text-white transition-all resize-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Monetisation Route & Revenue Model</label>
                      <input
                        id="input-biz-revenue"
                        value={formData.business.revenueModel}
                        onChange={(e) => handleInputChange('business', 'revenueModel', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Target Capital Funding</label>
                      <input
                        id="input-biz-funding"
                        value={formData.business.fundingTarget}
                        onChange={(e) => handleInputChange('business', 'fundingTarget', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Key Competitors & Market Moat</label>
                      <input
                        id="input-biz-moat"
                        value={formData.business.keyCompetitors}
                        onChange={(e) => handleInputChange('business', 'keyCompetitors', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-orange-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                {activeTab === 'essay' && (
                  <>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Proposed Research Topic</label>
                      <input
                        id="input-essay-topic"
                        value={formData.essay.topic}
                        onChange={(e) => handleInputChange('essay', 'topic', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Academic Study Level</label>
                      <input
                        id="input-essay-level"
                        value={formData.essay.academicLevel}
                        onChange={(e) => handleInputChange('essay', 'academicLevel', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Primary Thesis Claim</label>
                      <input
                        id="input-essay-thesis"
                        value={formData.essay.thesisClaim}
                        onChange={(e) => handleInputChange('essay', 'thesisClaim', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Key Argument Factors</label>
                      <textarea
                        id="input-essay-args"
                        rows={3}
                        value={formData.essay.keyArguments}
                        onChange={(e) => handleInputChange('essay', 'keyArguments', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-white transition-all resize-none"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-xs font-bold tracking-widest text-slate-400 uppercase">Formatting & Citations Guide</label>
                      <input
                        id="input-essay-style"
                        value={formData.essay.formattingStyle}
                        onChange={(e) => handleInputChange('essay', 'formattingStyle', e.target.value)}
                        className="w-full bg-white/5 border border-white/10 rounded-xl hover:border-white/20 focus:border-purple-500 focus:outline-none px-4 py-3 text-sm text-white transition-all"
                        required
                      />
                    </div>
                  </>
                )}

                <button
                  id="btn-draft-generate"
                  type="submit"
                  disabled={isDrafting}
                  className={`w-full flex items-center justify-center py-4 text-xs font-extrabold tracking-widest uppercase transition-all duration-300 rounded-2xl cursor-pointer shadow-lg shadow-black/20 ${
                    activeTab === 'resume' ? 'bg-emerald-500 hover:bg-emerald-450 text-black' :
                    activeTab === 'social' ? 'bg-yellow-500 hover:bg-yellow-450 text-black' :
                    activeTab === 'business' ? 'bg-orange-500 hover:bg-orange-450 text-black' :
                    'bg-purple-500 hover:bg-purple-450 text-black'
                  } ${isDrafting ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  {isDrafting ? (
                    <>
                      <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                      OPTIMIZING METRIC BLUEPRINT...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      LAUNCH AI PRESENTATION BLUEPRINT
                    </>
                  )}
                </button>
              </form>

              {errorText && (
                <div className="mt-4 p-4 bg-red-950/40 border border-red-800/60 text-red-100 rounded-xl text-xs font-semibold">
                  {errorText}
                </div>
              )}
            </div>

            <div className="mt-8 pt-6 border-t border-white/5 text-slate-500 text-[11px] leading-relaxed font-light">
              * Note: Draft outputs generated in the sandbox serve as immediate structured prototypes. Open a pipeline with GP Studio to format, design, and proofread to extreme enterprise-level standards.
            </div>
          </div>

          {/* RIGHT: Document Visualization Canvas */}
          <div className="flex flex-col justify-between">
            {/* Live Presentation frame */}
            <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] overflow-hidden flex-1 flex flex-col min-h-[480px]">
              {/* Card visual heading bar */}
              <div className="bg-white/5 border-b border-white/10 px-6 py-4 flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className={`w-2.5 h-2.5 rounded-full ${isDrafting ? 'bg-yellow-500 animate-ping' : draftResult ? 'bg-emerald-500' : 'bg-white/20'}`} />
                  <span className="text-[10px] font-extrabold tracking-widest text-[#94a3b8] uppercase">
                    {isDrafting ? 'DRAFTING IN PROGRESS' : draftResult ? 'BLUEPRINT PREVIEW' : 'IDLE CANVAS FRAME'}
                  </span>
                </div>
                {draftResult && (
                  <span className="text-[10px] font-mono font-bold text-slate-500">
                    STATUS: SECURE 200 OK
                  </span>
                )}
              </div>

              {/* Central Canvas Zone */}
              <div className="p-6 md:p-8 flex-1 flex flex-col justify-center overflow-y-auto max-h-[550px] bg-white/[0.01]">
                {isDrafting ? (
                  <div className="text-center py-12 max-w-sm mx-auto space-y-6">
                    <div className="relative inline-flex">
                      <div className="w-12 h-12 rounded-full border-2 border-t-emerald-400 border-white/10 animate-spin" />
                      <Sparkles className="absolute inset-0 m-auto h-5 w-5 text-emerald-400 animate-pulse" />
                    </div>
                    <div className="space-y-2">
                      <h4 className="text-sm font-extrabold text-white uppercase tracking-wider">AI Structuring Machine Active</h4>
                      <p className="text-xs text-slate-400 leading-relaxed font-light">
                        Applying Pretoria formatting mechanics, conversion structures, and strict ATS parameters tailored to local South African frameworks...
                      </p>
                    </div>
                  </div>
                ) : draftResult ? (
                  /* High Fidelity Document Visual Rendering */
                  <a 
                    href={
                      activeTab === 'resume' ? 'https://gpstudiospretoria.gumroad.com/l/Resume_and_cover_usa' :
                      activeTab === 'social' ? 'https://gpstudiospretoria.gumroad.com/l/10_post_social_usa' :
                      activeTab === 'business' ? 'https://gpstudiospretoria.gumroad.com/l/1_page_USA' :
                      'https://gpstudiospretoria.gumroad.com/l/aresy'
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block space-y-8 animate-fadeIn text-left cursor-pointer group/canvas relative hover:opacity-95 transition-all duration-300 decoration-none"
                    title="Click here to purchase the fully formatted production version on Gumroad!"
                  >
                    {/* Floating hint banner overlay */}
                    <div className="absolute top-1 right-2 bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-full flex items-center space-x-1.5 text-[9px] font-bold uppercase tracking-wider text-emerald-300 shadow-lg animate-pulse z-25">
                      <Sparkles className="h-3 w-3 text-emerald-400" />
                      <span>UNLOCK PRODUCTION OPTIMIZED TEMPLATE</span>
                    </div>

                    <div className="border-b border-white/10 pb-1.5 flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                      <h3 className="text-xl font-bold tracking-tight text-white leading-tight">
                        {draftResult.title}
                      </h3>
                      <span className="text-[10px] uppercase font-bold tracking-widest font-mono text-emerald-300 bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20 shrink-0">
                        Pretoria Optimized
                      </span>
                    </div>
                    
                    <div className="text-[11px] font-semibold text-slate-400 bg-white/5 border border-white/10 px-4 py-2.5 rounded-xl flex items-center justify-between">
                      <span className="uppercase tracking-widest text-[9px] text-emerald-400">★ Direct Checkout Connection Active</span>
                      <span className="text-white hover:underline uppercase text-[9px] font-bold">CLICK PREVIEW TO SECURE EXPORT &rarr;</span>
                    </div>

                    <div className="space-y-6">
                      {draftResult.structure.map((section, idx) => (
                        <div key={idx} className="bg-white/5 border border-white/10 p-5 rounded-2xl relative transition-all duration-300 hover:border-white/20">
                          <div className="flex items-center justify-between mb-3">
                            <h4 className="text-xs font-extrabold tracking-widest uppercase text-white">
                              {section.sectionName}
                            </h4>
                          </div>
                          
                          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed font-sans m-0 font-light">
                            {section.content}
                          </p>

                          {section.bulletPoints && section.bulletPoints.length > 0 && (
                            <ul className="mt-3 space-y-2 list-none p-0">
                              {section.bulletPoints.map((bp, bpIdx) => (
                                <li key={bpIdx} className="text-xs text-slate-400 leading-relaxed flex items-start">
                                  <span className="text-emerald-400 mr-2.5 font-bold shrink-0">▪</span>
                                  <span className="font-light">{bp}</span>
                                </li>
                              ))}
                            </ul>
                          )}
                        </div>
                      ))}
                    </div>

                    {/* Strategic Notes */}
                    <div id="strategic-notes-panel" className="border-l-2 border-emerald-500 bg-white/5 p-5 rounded-2xl border-white/5">
                      <span className="text-[10px] font-extrabold uppercase tracking-widest block text-emerald-300 mb-2">
                        GP Studio Pretoria Execution Briefing
                      </span>
                      <p className="text-xs text-slate-350 leading-relaxed font-mono m-0 font-light text-slate-400">
                        {draftResult.strategicNotes}
                      </p>
                    </div>
                  </a>
                ) : (
                  /* Idle Canvas Greeting Card with Pretoria context */
                  <div className="text-center py-16 text-slate-400 space-y-4 max-w-sm mx-auto">
                    <FileText className="h-10 w-10 text-slate-700 mx-auto stroke-[1.25] animate-pulse" />
                    <div className="space-y-2">
                      <h4 className="text-xs font-extrabold text-[#94a3b8] uppercase tracking-widest mt-2">No active draft compiled</h4>
                      <p className="text-xs leading-relaxed text-slate-500 font-light">
                        Select a target service, review or adjust the pre-configured Pretoria template parameters on the left, and click &quot;Launch AI Presentation Blueprint&quot; to begin.
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Direct WhatsApp Action Row */}
            <div className="mt-6">
              <a
                id="btn-whatsapp-order"
                href={generateWhatsAppRedirectUrl()}
                target="_blank"
                rel="noopener noreferrer"
                className={`w-full flex items-center justify-center py-4 bg-emerald-600 hover:bg-emerald-505 text-white font-extrabold text-xs tracking-widest uppercase transition-all duration-300 rounded-2xl shadow-xl hover:shadow-emerald-950/20 shadow-black/20 cursor-pointer ${
                  !draftResult ? 'animate-bounce border border-emerald-500' : ''
                }`}
              >
                <Share2 className="h-4 w-4 mr-2" />
                {draftResult ? 'SUBMIT GENERATED BLUEPRINT TO WHATSAPP' : 'ORDER DIRECTLY ON WHATSAPP (10% OFF)'}
                <ArrowRight className="h-4 w-4 ml-2" />
              </a>
              <div className="text-center mt-3">
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-widest block">
                  FAST PIPELINE FULFILLMENT AT DIRECT SUPPORT LINE: +27 74 074 0875
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
