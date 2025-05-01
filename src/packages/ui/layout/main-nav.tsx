"use client";
 
import { useRouter, useSearchParams } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { Wordmark } from "../wordmark";
import { IconLayoutSidebarLeftExpand, IconMailFilled } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { cn } from "@/packages/utils/functions/cn";
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
        const router = useRouter();

        const [isOpen, setIsOpen] = useState<boolean>(true);
        const { isMobile } = useMediaQuery();

        const { data: session } = useSession({
          required: true,
          onUnauthenticated() {
            return router.push("/auth/signin?callbackUrl=/dashboard")
          },
        })

        console.log("session", session)

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
      <div className="flex bg-neutral-100 overflow-hidden">
        <aside
          className={cn("w-44 md:w-1/6 h-dvh", {isOpen: "-translate-96"})}
        >
          <div className="relative flex items-center justify-center space-x-4 my-2 p-4">
            {!isMobile ? (
              <>
                <Wordmark className="mb-2 pointer-events-none" />
                <Avatar className="w-8 h-8"/>
              </>
            ) : (
              <IconLayoutSidebarLeftExpand onClick={() => setIsOpen(!isOpen)} />
            )}
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