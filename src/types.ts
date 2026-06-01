export type ServiceId = 'resume' | 'social' | 'business' | 'essay';

export interface ServiceDetail {
  id: ServiceId;
  name: string;
  priceUSD: number;
  priceZAR: number;
  category: string;
  accentClass: string;
  glowClass: string;
  badge: string;
  highlights: string[];
}

export interface ServiceFormFields {
  resume: {
    fullName: string;
    targetRole: string;
    experienceYears: string;
    keySkills: string;
    primaryAchievements: string;
  };
  social: {
    businessName: string;
    niche: string;
    primaryProduct: string;
    targetAudience: string;
    brandTone: string;
  };
  business: {
    companyName: string;
    conceptDetails: string;
    revenueModel: string;
    fundingTarget: string;
    keyCompetitors: string;
  };
  essay: {
    topic: string;
    academicLevel: string;
    keyArguments: string;
    thesisClaim: string;
    formattingStyle: string;
  };
}

export interface GenerationResult {
  title: string;
  structure: {
    sectionName: string;
    content: string;
    bulletPoints?: string[];
  }[];
  strategicNotes: string;
}
