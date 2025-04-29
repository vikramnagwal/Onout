import { Suspense } from "react";
import { ClientOnly } from "@ui/client-only";
import { CircularModel } from "../three-d";

interface AuthLayoutProps {
	children: React.ReactNode;
}

export const AuthLayout = ({ children }: AuthLayoutProps) => {
	return (
    <div className="grid w-full grid-cols-1 md:grid-cols-5">
      <div className="col-span-1 flex min-h-screen flex-col items-center justify-between border-r border-neutral-200 bg-white/10 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur sm:col-span-3">
        <div className="flex h-full w-full flex-col items-center justify-center">
          <ClientOnly className="relative flex w-full flex-col items-center justify-center">
            <Suspense>{children}</Suspense>
          </ClientOnly>
        </div>

        <div className="grid gap-2 pb-8 pt-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Onout.
          </p>
        </div>
      </div>

      <div className="hidden h-full flex-col justify-center space-y-12 overflow-hidden md:col-span-2 md:flex">
      </div>
    </div>
  );
};
