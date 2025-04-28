"use client";
 
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import { Wordmark } from "../wordmark";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { Sidebar } from "../icons/sidebar";



type SideNavContext = {
    open: boolean;
    setOpen: Dispatch<SetStateAction<boolean>>;
}

export const SideNavContext = createContext<SideNavContext>({
    open: false,
    setOpen: () => {},
})

export function MainNavProvider({
    children,
    sidebar
}: PropsWithChildren<{
    sidebar: ReactNode;
}>)
{
        const searchParams = useSearchParams();
        const [isOpen, setIsOpen] = useState<boolean>(false);
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


    return (
      <div className="flex p-2">
        <nav className="md:w-80">{sidebar}</nav>
        <SideNavContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
          <div className="rounded-xl flex-1 bg-neutral-200 min-h-full p-2">
            {children}
          </div>
        </SideNavContext.Provider>
      </div>
    );
}