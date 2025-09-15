import { SidebarNav } from "@/packages/ui/layout/sidebar/sidebar-nav";
import { MainNavProvider } from "@/packages/ui/layout/main-nav";
import { ReactNode } from "react";
import { SettingProvider } from "./[idOrSlug]/settings/page";


export default async function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="overflow-hidden">
        <MainNavProvider sidebar={<SidebarNav />}>
        <SettingProvider>
            {children}
        </SettingProvider>
        </MainNavProvider>
    </div>
  )

}