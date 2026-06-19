import { useState } from "react";
import { toast } from "sonner";
import { OpenRouter } from "@openrouter/sdk";
import { SYSTEM_PROMPT } from "@/constants/prompt";
import type { AnalysisResponse, AnalysisResult } from "@/types/analysis";

const apiKey = import.meta.env.VITE_OPEN_ROUTER_API_KEY || "";
const ai = new OpenRouter({
  apiKey,
});

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

      const response = await ai.chat.send({
        chatRequest: {
          model: "openai/gpt-oss-120b:free",
          models: [
            "openai/gpt-oss-20b:free",
            "poolside/laguna-m.1:free",
            "poolside/laguna-xs.2:free",
          ],
          messages: [
            {
              role: "system",
              content: SYSTEM_PROMPT,
            },
            {
              role: "user",
              content: prompt,
            },
          ],
        },
      });

      const rawText = (response.choices[0].message.content ?? "")
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
      toast.error(
        "Failed to analyze MVP, rate limit reached. Please try again tomorrow.",
      );

      console.error(err);
      return "failed";
    } finally {
      setLoading(false);
    }
  };

  return { onAnalyzePrompt, result, loading };
}
