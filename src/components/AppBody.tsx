import { Clock, Target, Zap, SquareTerminal } from "lucide-react";
import type { AnalysisResult } from "@/types/analysis";
import { Spinner } from "./ui/spinner";

type AppBodyProps = {
  result: AnalysisResult | null;
  loading: boolean;
};

export function AppBody({ result, loading }: AppBodyProps) {
  if (loading) {
    return (
      <div className="flex flex-1 items-center justify-center">
        <Spinner className="size-8" />
      </div>
    );
  }

  return (
    <>
      {result !== null ? (
        <div className="flex flex-1 flex-col gap-5">
          <div className="bg-primary text-secondary flex flex-col gap-3 rounded-2xl border p-5">
            <div className="flex items-center gap-2">
              <SquareTerminal />
              <h3 className="text-xl font-bold">Prompt Input</h3>
            </div>
            <p>
              <b>Product Idea:</b> {result.prompt.product_idea}
            </p>
            <p>
              <b>Planned Features:</b> {result.prompt.planned_features}
            </p>
            <div className="mt-2 flex items-center gap-2">
              <Target />
              <h3 className="text-xl font-bold">Core Problem</h3>
            </div>
            <p>{result.core_problem}</p>
          </div>
          <div className="text-secondary flex-1 overflow-clip rounded-2xl border bg-[#6E5415]">
            <div className="flex items-center gap-2 bg-[#BA8E23] p-5">
              <Zap className="text-[#f6f5c6]" />
              <h3 className="text-xl font-bold text-[#f6f5c6]">
                Build Now (MVP)
              </h3>
            </div>
            <div className="flex flex-col gap-5 p-5">
              {result.build_now.map((item, index) => (
                <div
                  key={crypto.randomUUID()}
                  className="rounded-xl bg-[#EBBE4D] p-3"
                >
                  <h4 className="mb-5 text-lg font-bold">
                    {index + 1}. {item.feature}
                  </h4>
                  <p>{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="bg-secondary flex-1 overflow-clip rounded-2xl border">
            <div className="flex items-center gap-2 bg-[#444448] p-5">
              <Clock />
              <h3 className="text-xl font-bold">Build Later</h3>
            </div>
            <div className="flex flex-col gap-5 p-5">
              {result.build_later.map((item, index) => (
                <div
                  key={crypto.randomUUID()}
                  className="bg-background rounded-xl p-3"
                >
                  <h4 className="mb-5 text-lg font-bold">
                    {index + 1}. {item.feature}
                  </h4>
                  <p>{item.reason}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <div className="flex flex-col gap-5 text-center md:w-100">
            <h2 className="text-2xl font-bold">What are you building today?</h2>
            <p>
              Describe your product idea below and planned features. We will
              help you identify which features are essential for your MVP and
              which can wait until later
            </p>
          </div>
        </div>
      )}
    </>
  );
}
