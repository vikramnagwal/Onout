"use client";
 
import { useSearchParams } from "next/navigation";
import { createContext, Dispatch, PropsWithChildren, ReactNode, SetStateAction, useEffect, useState } from "react";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { Wordmark } from "../wordmark";
import { cn } from "@/packages/utils/functions/cn";
import { SidebarIcon, SidebarIconClose } from "./sidebar/icon/sidebar";
import { AnimatePresence, motion, spring } from "motion/react";



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

        const [expanded, setExpanded] = useState<boolean>(true);
        const { isMobile } = useMediaQuery();

        // block scroll when slidebar is open
        useEffect(() => {
            document.body.style.overflow = expanded && isMobile ? "hidden" : "auto";
            return () => {
                document.body.style.overflow = "auto";
            }
        }, [expanded, isMobile]);

        useEffect(() => {
          setExpanded(false);
        }, [searchParams]);

    return (
      <motion.div
        animate={{
          transition: spring,
        }}
        className={cn(
          "flex overflow-hidden p-1",
          !expanded && "bg-neutral-100"
        )}
      >
        <aside
          className={cn(
            "transition-all duration-300 bg-neutral-100 h-dvh",
            expanded ? "w-56" : "w-18" // Shrink width when collapsed
          )}
        >
          <div className="relative flex justify-between items-center space-x-4 my-2 p-4">
            <Wordmark />
            <button
              className="p-2 bg-white rounded-full cursor-pointer"
              onClick={() => setExpanded((prev) => !prev)}
            >
              <SidebarIcon />
            </button>
          </div>
          {expanded && sidebar}
        </aside>
        <SideNavContext.Provider
          value={{ open: expanded, setOpen: setExpanded }}
        >
          <div
            className={cn(
              "flex-grow overflow-hidden bg-white mt-3 rounded-xl transition-all duration-300"
            )}
          >
            {children}
          </div>
        </SideNavContext.Provider>
      </motion.div>
    );
}