import { LayoutSpinner } from "@/packages/ui/loaders/layout-spinner";

export default function Loading() {
    return (
      <div className="min-h-screen w-full flex justify-center items-center p-3">
        <div className="flex flex-col items-center gap-4">
          <h1 className="text-4xl w-full font-semibold">
            Getting things ready....
          </h1>    
            <LayoutSpinner />
        </div>
      </div>
    );
}