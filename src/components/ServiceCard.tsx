import React from 'react';
import { Check, ArrowRight, Zap, Target, MessageSquare, Award } from 'lucide-react';
import { ServiceDetail } from '../types';

interface ServiceCardProps {
  key?: React.Key;
  service: ServiceDetail;
  onSelect: (id: string) => void;
}

export function ServiceCard({ service, onSelect }: ServiceCardProps) {
  // Map icons to the categories for precise visual distinction
  const getCategoryIcon = (id: string) => {
    switch (id) {
      case 'resume':
        return <Award className="h-5 w-5 text-emerald-400" />;
      case 'social':
        return <Zap className="h-5 w-5 text-yellow-400" />;
      case 'business':
        return <Target className="h-5 w-5 text-orange-400" />;
      case 'essay':
        return <MessageSquare className="h-5 w-5 text-purple-400" />;
      default:
        return <Award className="h-5 w-5 text-neutral-400" />;
    }
  };

  return (
    <div
      id={`card-${service.id}`}
      className={`bg-white/5 backdrop-blur-xl border border-white/10 rounded-[32px] p-8 sm:p-10 flex flex-col justify-between transition-all duration-300 ${service.glowClass} group`}
    >
      <div>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center space-x-2 bg-white/5 px-3 py-1 rounded-full border border-white/5">
            {getCategoryIcon(service.id)}
            <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">
              {service.category}
            </span>
          </div>
          <span className="inline-block text-[9px] font-extrabold tracking-widest bg-white/10 text-white px-2.5 py-1 uppercase rounded-lg border border-white/10">
            {service.badge}
          </span>
        </div>

        <div className="flex items-baseline justify-between mb-6">
          <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
            {service.name}
          </h3>
          <div className="text-right">
            <span className="text-2xl sm:text-3xl font-black text-white">
              ${service.priceUSD}
            </span>
            <span className="block text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-wider">
              ~ R{service.priceZAR} ZAR
            </span>
          </div>
        </div>

        <hr className="border-white/10 my-6" />

        <ul className="space-y-4 mb-10">
          {service.highlights.map((highlight, index) => (
            <li key={index} className="flex items-start text-xs sm:text-sm text-slate-200">
              <span className="mr-3 mt-0.5 shrink-0">
                <Check className={`h-4 w-4 ${service.id === 'resume' ? 'text-emerald-400' : service.id === 'social' ? 'text-yellow-400' : service.id === 'business' ? 'text-orange-400' : 'text-purple-400'}`} />
              </span>
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="space-y-3">
        <button
          id={`btn-draft-${service.id}`}
          onClick={() => onSelect(service.id)}
          className="w-full flex items-center justify-center py-4 bg-white/10 hover:bg-white text-white hover:text-[#0a0c14] font-extrabold text-xs tracking-widest uppercase rounded-2xl border border-white/25 hover:border-white transition-all duration-300 cursor-pointer"
        >
          INTERACTIVE AI DRAFTER
          <ArrowRight className="h-4 w-4 ml-2 animate-pulse" />
        </button>
        
        <div className="text-center">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest block py-1">
            OR FULFILL VIA WHATSAPP WITH 10% OFF
          </span>
        </div>
      </div>
    </div>
  );
}
