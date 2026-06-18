import { Button } from "@/components/ui/button";
import { Textarea } from "./components/ui/textarea";

function App() {
  return (
    <div className="flex h-screen flex-col">
      <header className="flex flex-col items-center border-b">
        <div className="w-4/5 max-w-250 p-3">
          <h1 className="text-3xl font-bold">Features Cutter AI</h1>
        </div>
      </header>
      <div className="flex flex-1 flex-col items-center">
        <div className="flex w-4/5 max-w-250 flex-1 flex-col p-3">
          <div className="flex flex-1 flex-col items-center justify-center">
            <div className="flex w-100 flex-col gap-5 text-center">
              <h2 className="text-2xl font-bold">
                What are you building today?
              </h2>
              <p>
                Describe your product idea below and planned features. We will
                help you identify which features are essential for your MVP and
                which can wait until later
              </p>
            </div>
          </div>
        </div>
        <div className="relative bottom-0 flex w-4/5 max-w-250 flex-col gap-4 p-3 pb-7">
          <div className="flex items-end gap-2">
            <div className="flex flex-1 flex-col">
              <p className="mb-2">Product Idea</p>
              <Textarea placeholder="Tell me what your product idea..." />
            </div>
            <div className="flex flex-1 flex-col">
              <p className="mb-2">Planned Features</p>
              <Textarea placeholder="Tell me what your planned features..." />
            </div>
            <Button>Analyze</Button>
          </div>
          <div className="flex justify-center">
            <Button variant={"outline"}>Try Example: Fitness App</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
