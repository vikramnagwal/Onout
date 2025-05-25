"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";
import { MenuBar } from "../menu-bar";
import { Wordmark } from "../wordmark";
import { motion, useMotionValueEvent, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { getSession, useSession } from "next-auth/react";
import { SignOutButton } from "../auth/sign-out";

// TODO: add animation to navbar

export function NavHeader() {

  const navRef = useRef(null);
  const navigate = useRouter();
  const { scrollYProgress } = useScroll({
    target: navRef,
    layoutEffect: false
  });
  const [shrink, setShrink] = useState<boolean>(false);
  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    if (latest > 0.1) {
      setShrink(true);
    } else {
      setShrink(false);
    }
  })
  const navWidth = useTransform(scrollYProgress, [0, 1], ["100%", "40%"]);

  const {status, data: session} = useSession();
  console.log("Session data:", session);
  
    return (
      <motion.nav
        ref={navRef}
        style={{
          width: navWidth,
        }}
        animate={{
          opacity: shrink ? 0.8 : 1,
        }}
        transition={{ duration: 0.3 }}
        className="z-50 backdrop-blur-sm flex justify-between items-center max-w-[1280px] mx-auto py-3 px-4 bg-transparent"
      >
        <Wordmark />
        <MenuBar />
        <div className="flex items-center gap-2">
          {status === "authenticated" ?  (<div className="flex items-center space-x-2"><Button text="Dashboard"/><SignOutButton /></div>) : <Button text="Sign In" onClick={() => navigate.push("/login")} />}
        </div>
      </motion.nav>
    );
}