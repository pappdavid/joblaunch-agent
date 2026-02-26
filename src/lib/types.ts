// Types for JobLaunch Agent

export interface User {
  _id: string;
  email: string;
  name: string;
  location: string;
  skills: string[];
  experience_years: number;
  cv_data: CVData;
  created_at: Date;
  updated_at: Date;
}

export interface CVData {
  full_name: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  skills: string[];
  languages: Language[];
  certifications: string[];
}

export interface Experience {
  title: string;
  company: string;
  location: string;
  start_date: string;
  end_date: string;
  description: string;
  current: boolean;
}

export interface Education {
  school: string;
  degree: string;
  field: string;
  start_date: string;
  end_date: string;
}

export interface Language {
  name: string;
  proficiency: 'native' | 'fluent' | 'intermediate' | 'basic';
}

export interface JobListing {
  _id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary_min?: number;
  salary_max?: number;
  job_type: 'full-time' | 'part-time' | 'contract' | 'temporary';
  experience_level: 'entry' | 'mid' | 'senior';
  source: 'linkedin' | 'indeed' | 'jsearch';
  external_url: string;
  posted_date: Date;
  relevance_score?: number;
}

export interface JobSearchQuery {
  keywords: string;
  location: string;
  radius?: number;
  salary_min?: number;
  salary_max?: number;
  job_type?: string;
  experience_level?: string;
  company?: string;
}

export interface JobApplication {
  _id: string;
  user_id: string;
  job_id: string;
  job_title: string;
  company: string;
  cv_used: string;
  application_date: Date;
  status: 'applied' | 'interviewing' | 'accepted' | 'rejected' | 'withdrawn';
  interview_date?: Date;
  feedback?: string;
  notes?: string;
  follow_up_date?: Date;
}

export interface CVTemplate {
  _id: string;
  name: string;
  description: string;
  structure: string;
  user_id: string;
  created_at: Date;
}

export interface SearchResult {
  jobs: JobListing[];
  total_count: number;
  page: number;
  per_page: number;
}

export interface CVGenerationResponse {
  success: boolean;
  cv_id?: string;
  cv_url?: string;
  error?: string;
}

export interface ApplicationResponse {
  success: boolean;
  application_id?: string;
  message: string;
  error?: string;
}
