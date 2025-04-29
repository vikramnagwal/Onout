"use client";
 
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { motion } from "motion/react";
import { Wordmark } from "../wordmark";
import { Note } from "../note";
import { IconMailFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";



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

            const { data: session } = useSession();
            console.log("session", session);

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
      <div className="flex overflow-hidden p-2">
        <aside className="w-44 md:w-1/6 h-dvh border-r border-neutral-300">
          <div className="flex items-center justify-center border-b border-neutral-300 my-2 p-4">
            <Wordmark className="mb-2 pointer-events-none" />
          </div>
          {sidebar}
        </aside>
        <SideNavContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
          <div className="flex-1 overflow-hidden">
            <div className="p-[26px] border-b border-neutral-300">
              {session?.user.emailVerified ? null : ( <Note text="Please verify your email" icon={<IconMailFilled />}/>)}
            </div>
            {children}
          </div>
        </SideNavContext.Provider>
      </div>
    );
}