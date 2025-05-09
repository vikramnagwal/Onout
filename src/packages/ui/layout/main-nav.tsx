"use client";
 
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { Wordmark } from "../wordmark";
import { IconLayoutSidebarLeftExpand } from "@tabler/icons-react";
import { cn } from "@/packages/utils/functions/cn";
import { LayoutIcon } from "../icons/layout";
import { Sidebar } from "../icons/sidebar";
import { SidebarIcon } from "./sidebar/icon/sidebar";
import { Avatar } from "../avatar";



type SideNavContext = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
    isActive?: boolean;
}

export const SideNavContext = createContext<SideNavContext>({
    open: false,
    setOpen: () => {},
    isActive: false
})

export function MainNavProvider({
    children,
    sidebar
}: PropsWithChildren<{
    sidebar: ReactNode;
}>)
{
        const searchParams = useSearchParams();

        const [isOpen, setIsOpen] = useState<boolean>(true);
        const { isMobile } = useMediaQuery();

        // block scroll whn slidebar is open
        useEffect(() => {
            document.body.style.overflow = isOpen && isMobile ? "hidden" : "auto";
            return () => {
                document.body.style.overflow = "auto";
            }
        }, [isOpen, isMobile]);

        useEffect(() => {
          setIsOpen(false);
        }, [searchParams]);

        { isMobile && (
          <div>
            <h2>hello world</h2>
          </div>
        )}

    return (
      <div className="flex bg-neutral-100 overflow-hidden">
        <aside
          className={cn("w-44 md:w-1/6 h-dvh")}
        >
          <div className="relative flex justify-between items-center space-x-4 my-2 p-4">
            <Wordmark />
            <button onClick={() => setIsOpen((prev) => !prev)}>
              <SidebarIcon className="cursor-pointer" />
            </button>
          </div>
          {sidebar}
        </aside>
        <SideNavContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
          <div className="flex-1 overflow-hidden bg-white mt-3 rounded-xl">
            {children}
          </div>
        </SideNavContext.Provider>
      </div>
    );
}