"use client";

import { useRouter } from "next/navigation";
import { Button } from "../../button";
import { MenuBar } from "./nav";
import { Wordmark } from "../../wordmark";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useSession } from "next-auth/react";
import { SignOutButton } from "../../auth/sign-out";
import { DashboardRedirectButton } from "../../dashboard-redirect-btn";

// TODO: add animation to navbar

export function NavHeader() {

  const navRef = useRef(null);
  const navigate = useRouter();
  const { scrollY } = useScroll();

  const navWidth = useTransform(scrollY, [0, 100], ["100%", "60%"]);
  const navOutline = useTransform(scrollY, [0, 100], ["none", "1px solid rgba(0, 0, 0, 0.1)"]); 
  const navBackground = useTransform(scrollY, [0, 100], ["rgba(255, 255, 255, 0.8)", "rgba(255, 255, 255, 1)"]);

  const { status } = useSession();
    return (
      <motion.nav
        ref={navRef}
        style={{
          width: navWidth,
          outline: navOutline,
          backgroundColor: navBackground,
          backdropFilter: "blur(10px)",
        }}
        animate={{
          opacity: [1, 0.8, 1],
        }}
        transition={{ 
          duration: 0.3,
          type: "spring",
          stiffness: 100,
         }}
        className="z-50 sticky top-4 flex justify-between items-center rounded-full max-w-[1280px] mx-auto py-1 px-4"
      >
        <Wordmark />
        <MenuBar />
        <div className="flex items-center gap-2">
          {status === "authenticated" ?  (<div className="flex items-center space-x-2"><DashboardRedirectButton /><SignOutButton /></div>) : <Button text="Sign In" onClick={() => navigate.push("/login")} />}
        </div>
      </motion.nav>
    );
}