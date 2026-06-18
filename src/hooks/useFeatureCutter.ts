import { useState } from "react";
import { toast } from "sonner";
import { GoogleGenAI } from "@google/genai";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import type { AnalysisResponse, AnalysisResult } from "@/types/analysis";

type GeminiApiError = {
  error: {
    code: number;
    message: string;
  };
};

const apiKey = import.meta.env.VITE_GEMINI_API_KEY || "";
const ai = new GoogleGenAI({ apiKey });

type UseFeatureCutterReturn = {
  onAnalyzePrompt: (
    productIdea: string,
    plannedFeatures: string,
  ) => Promise<string>;
  result: AnalysisResult | null;
  loading: boolean;
};

export default function useFeatureCutter(): UseFeatureCutterReturn {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const onAnalyzePrompt = async (
    productIdea: string,
    plannedFeatures: string,
  ) => {
    if (!productIdea.trim() || loading) return "failed";

    if (!apiKey) {
      setResult(null);
      toast.error("Missing Gemini AI Key in your environment variables.");
      return "failed";
    }

    setLoading(true);
    setResult(null);

    try {
      const prompt = `
        Product Idea:
        ${productIdea}

        Planned Features:
        ${plannedFeatures || "None"}

        If no planned features are provided, generate the smallest possible MVP from the product idea alone.
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: prompt,
        config: {
          systemInstruction: SYSTEM_PROMPT,
        },
      });

      const rawText = (response.text ?? "")
        .replace(/^```json\s*/i, "")
        .replace(/^```\s*/i, "")
        .replace(/```$/i, "")
        .trim();

      const parsed = JSON.parse(rawText) as AnalysisResponse;
      setResult({
        ...parsed,
        prompt: {
          product_idea: productIdea,
          planned_features: plannedFeatures,
        },
      });

      return "success";
    } catch (err: unknown) {
      const apiError = err as Partial<GeminiApiError> | null;

      if (apiError?.error?.code === 503) {
        toast.error(
          "Gemini is currently experiencing high demand. Please try again.",
        );
      } else {
        toast.error("Failed to analyze MVP. Please try again.");
      }
      console.error(err);
      return "failed";
    } finally {
      setLoading(false);
    }
  };

  return { onAnalyzePrompt, result, loading };
}
