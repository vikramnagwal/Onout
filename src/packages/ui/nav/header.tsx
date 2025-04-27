"use client";

import { useRouter } from "next/navigation";
import { Button } from "../button";
import { MenuBar } from "../menu-bar";
import { Wordmark } from "../wordmark";
import { motion, useScroll } from "motion/react";
import { useState } from "react";



export function NavHeader() {
  const navigate = useRouter();
  const { scrollYProgress } = useScroll();
  const [shrink, setShrink] = useState<boolean>(false);
  console.log(scrollYProgress, "scrollYProgress");

    return (
     <motion.nav 
          className="z-50 flex justify-between items-center max-w-[1280px] mx-auto py-3 px-4 bg-transparent">
        <Wordmark />
        <MenuBar />
        <div className="flex items-center gap-2">
          <Button text="Sign In" onClick={() => navigate.push('/login')} />
        </div>
      </motion.nav>
      );
}