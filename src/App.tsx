import useFeatureCutter from "@/hooks/useFeatureCutter";
import { useState } from "react";
import { AppBody } from "@/components/AppBody";
import { AppFooter } from "@/components/AppFooter";
import { Toaster } from "@/components/ui/sonner";

function App() {
  const { onAnalyzePrompt, result, loading } = useFeatureCutter();
  const [productIdea, setProductIdea] = useState("");
  const [plannedFeatures, setPlannedFeatures] = useState("");

  return (
    <>
      <div>
        <header className="bg-background fixed top-0 right-0 left-0 flex flex-col items-center border-b">
          <div className="p-3 md:w-4/5 md:max-w-250">
            <h1 className="text-3xl font-bold">Features Cutter AI</h1>
          </div>
        </header>
        <div className="mt-15 mb-84 flex min-h-[calc(100dvh-26rem)] flex-col items-center md:mb-48 md:min-h-[calc(100dvh-16rem)]">
          <div className="flex flex-1 flex-col p-6 md:w-4/5 md:max-w-250 md:p-3">
            <AppBody result={result} loading={loading} />
          </div>
        </div>
        <AppFooter
          productIdea={productIdea}
          setProductIdea={setProductIdea}
          plannedFeatures={plannedFeatures}
          setPlannedFeatures={setPlannedFeatures}
          onAnalyzePrompt={onAnalyzePrompt}
          loading={loading}
        />
      </div>
      <Toaster position="top-right" richColors={true} closeButton={true} />
    </>
  );
}

export default App;
