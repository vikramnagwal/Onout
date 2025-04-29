import { AppSidebar } from "@/packages/ui/dashboard/sidebar/app-sidebar";
import { MainNavProvider } from "@/packages/ui/layout/main-nav";
import { ReactNode } from "react";

export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden">
        <MainNavProvider sidebar={<AppSidebar />}>
            {children}
        </MainNavProvider>
    </div>
  )

}