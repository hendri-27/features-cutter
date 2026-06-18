import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import type { Dispatch, SetStateAction, SubmitEvent } from "react";
import { Spinner } from "./ui/spinner";

type AppFooterProps = {
  productIdea: string;
  setProductIdea: Dispatch<SetStateAction<string>>;
  plannedFeatures: string;
  setPlannedFeatures: Dispatch<SetStateAction<string>>;
  onAnalyzePrompt: (
    productIdea: string,
    plannedFeatures: string,
  ) => Promise<string>;
  loading: boolean;
};

export function AppFooter({
  productIdea,
  setProductIdea,
  plannedFeatures,
  setPlannedFeatures,
  onAnalyzePrompt,
  loading,
}: AppFooterProps) {
  async function handleSubmit(e: SubmitEvent<HTMLFormElement>) {
    e.preventDefault();

    const status = await onAnalyzePrompt(productIdea, plannedFeatures);

    if (status === "success") {
      setProductIdea("");
      setPlannedFeatures("");
    }
  }

  function handleTryExample() {
    setProductIdea("Fitness tracking app");
    setPlannedFeatures(
      "dashboard, workout type categorization, notification, reward system, leaderboard",
    );
  }

  return (
    <div className="bg-background fixed right-0 bottom-0 left-0 flex items-center md:flex-col">
      <div className="flex flex-1 flex-col gap-4 p-3 pb-7 md:w-4/5 md:max-w-250">
        <form
          className="flex flex-col gap-2 md:flex-row"
          onSubmit={handleSubmit}
        >
          <div className="flex flex-1 flex-col">
            <p className="mb-2">
              Product Idea <span className="text-red-500">*</span>
            </p>
            <Textarea
              placeholder="Tell me what your product idea..."
              value={productIdea}
              onChange={(e) => setProductIdea(e.target.value)}
              required={true}
              className="resize-none"
            />
          </div>
          <div className="mb-2 flex flex-1 flex-col md:mb-0">
            <p className="mb-2">Planned Features</p>
            <Textarea
              placeholder="Tell me what your planned features..."
              value={plannedFeatures ?? ""}
              onChange={(e) => setPlannedFeatures(e.target.value)}
              className="resize-none"
            />
          </div>
          <Button
            type="submit"
            disabled={productIdea === "" || loading}
            className="self-end"
          >
            {loading && <Spinner />}
            Analyze
          </Button>
        </form>
        <div className="flex justify-center">
          <Button variant={"outline"} onClick={handleTryExample}>
            Try Example: Fitness App
          </Button>
        </div>
      </div>
    </div>
  );
}
