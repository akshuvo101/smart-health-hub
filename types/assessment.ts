export type AssessmentCategory =
  | "stress"
  | "anxiety"
  | "depression"
  | "burnout"
  | "sleep"
  | "focus"
  | "social"
  | "mood";

export type AssessmentStatus =
  | "processing"
  | "analyzing"
  | "completed"
  | "failed"
  | "archived";
  

export type AssessmentLevel =
  | "Pending"
  | "Very Low"
  | "Low"
  | "Moderate"
  | "High"
  | "Very High";

export interface AssessmentOption {
  label: string;
  value: number;
}

export interface AssessmentQuestion {
  id: string;

  category: AssessmentCategory;

  question: string;

  options: AssessmentOption[];

  weight: number;

  display_order: number;

  is_active: boolean;

  created_at: string;

  updated_at: string;
}

/**
 * Single Answer
 */
export interface AssessmentAnswerSubmission {
  questionId: string;

  selectedValue: number;
}

/**
 * Submit Payload
 */
export interface AssessmentSubmission {
  answers: AssessmentAnswerSubmission[];
}

export interface Recommendation {
  title: string;

  description: string;

  priority: "low" | "medium" | "high";
}

/**
 * AI Analysis for one category
 */
export interface AICategoryAnalysis {
  level: Exclude<AssessmentLevel, "Pending">;

  analysis: string;
}

/**
 * Complete AI Response
 */
export interface AIAssessmentResult {
  confidence: number;

  mentalState: string;

  summary: string;

  categories: {
    stress: AICategoryAnalysis;

    anxiety: AICategoryAnalysis;

    depression: AICategoryAnalysis;

    burnout: AICategoryAnalysis;

    sleep: AICategoryAnalysis;

    focus: AICategoryAnalysis;

    social: AICategoryAnalysis;

    mood: AICategoryAnalysis;
  };

  recommendations: Recommendation[];
}

/**
 * Assessment Database Model
 */
export interface Assessment {
  id: string;

  user_id: string;

  score: number;

  mental_state: string;

  confidence: number;

  // Quick level badges
  stress: AssessmentLevel;
  anxiety: AssessmentLevel;
  depression: AssessmentLevel;
  burnout: AssessmentLevel;
  sleep: AssessmentLevel;
  focus: AssessmentLevel;
  social: AssessmentLevel;
  mood: AssessmentLevel;
  // Overall AI summary
  ai_summary: string | null;

  // Full AI analysis (stored as JSONB)
  ai_analysis: Record<AssessmentCategory, AICategoryAnalysis> | null;

  recommendations: Recommendation[];

  assessment_version: number;

  status: AssessmentStatus;

  created_at: string;

  updated_at: string;
}
