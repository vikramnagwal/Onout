import { LayoutSpinner } from "@/packages/ui/loaders/layout-spinner";

export default function Loading() {
    return (
      <div className="min-h-screen w-full flex justify-center items-center">
        <div className="flex items-center gap-4">
          <h1 className="text-4xl font-black">Hold on, tight....</h1>
          <LayoutSpinner />
        </div>
      </div>
    );
}