export interface FeatureItem {
  feature: string;
  reason: string;
}

export interface PromptInput {
  product_idea: string;
  planned_features: string;
}

export interface AnalysisResponse {
  core_problem: string;
  build_now: FeatureItem[];
  build_later: FeatureItem[];
}

export interface AnalysisResult extends AnalysisResponse {
  prompt: PromptInput;
}
