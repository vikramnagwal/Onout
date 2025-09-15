"use client";

import { useSearchParams } from "next/navigation";
import {
  createContext,
  Dispatch,
  PropsWithChildren,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useMediaQuery } from "@/packages/hooks/use-media";
import { Wordmark } from "../wordmark";
import { cn } from "@/packages/utils/functions/cn";
import { SidebarIcon, SidebarIconClose } from "./sidebar/icon/sidebar";
import { AnimatePresence, motion } from "motion/react";
import { Avatar } from "../avatar";
import { DashboardHeader } from "./dashboard/dashboard-header";

type SideNavContext = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  isActive?: boolean;
};

export const SideNavContext = createContext<SideNavContext>({
  open: false,
  setOpen: () => {},
  isActive: false,
});

export function MainNavProvider({
  children,
  sidebar,
}: PropsWithChildren<{
  sidebar: ReactNode;
}>) {
  const searchParams = useSearchParams();
  const [expanded, setExpanded] = useState<boolean>(false);
  const { isMobile } = useMediaQuery();

  // Block scroll when sidebar is open on mobile
  useEffect(() => {
    if (isMobile) {
      document.body.style.overflow = expanded ? "hidden" : "auto";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [expanded, isMobile]);

  // Close sidebar when route changes **
  useEffect(() => {
    setExpanded(false);
  }, [searchParams]);

  return (
    <SideNavContext.Provider value={{ open: expanded, setOpen: setExpanded }}>
      <div className="flex h-screen overflow-hidden bg-gray-50">
        {/* Mobile overlay */}
        <AnimatePresence>
          {expanded && isMobile && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-40"
              onClick={() => setExpanded(false)}
            />
          )}
        </AnimatePresence>

        {/* Sidebar */}
        <motion.aside
          initial={false}
          animate={{
            width: isMobile
              ? expanded
                ? "280px"
                : "0px"
              : expanded
              ? "280px"
              : "80px",
            transition: { duration: 0.3, ease: "easeInOut" },
          }}
          className={cn(
            "thereafter relative bg-white border-r border-gray-300 flex flex-col z-50",
            isMobile && "fixed left-0 top-0 h-full shadow-lg"
          )}
        >
          {/* Header */}
          <div
            className="flex items-center justify-between p-4 border-b border-gray-300 min-h-[72px] cursor-pointer hover:bg-gray-100 transition-colors"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded && (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.2 }}
              >
                <Wordmark />
              </motion.div>
            )}

            <button
              className="p-2 rounded-lg"
              aria-label={expanded ? "Collapse sidebar" : "Expand sidebar"}
            >
              {expanded ? <SidebarIconClose /> : <SidebarIcon />}
            </button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-2 flex flex-col gap-4">{sidebar}</div>
          </div>
          <div className="mt-[180px] border-t border-neutral-300">
            <Avatar />
          </div>
        </motion.aside>

        {/* Main content */}
        <main
          className={cn(
            "flex-1 flex flex-col overflow-y-auto",
            isMobile && expanded && "pointer-events-none"
          )}
        >
          <DashboardHeader headerTitle="General"/>
          <div>{children}</div>
        </main>
      </div>
    </SideNavContext.Provider>
  );
}
