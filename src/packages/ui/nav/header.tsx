"use client";

import { onScroll, animate } from "animejs";
import { motion } from "framer-motion";
import { Button } from "../button";
import { MenuBar } from "../menu-bar";
import { Wordmark } from "../wordmark";
import { useEffect, useRef } from "react";


export function NavHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (headerRef.current) {
      animate(headerRef.current, {
        ease: "easeInOut",
        duration: 0.5,
        opacity: [0, 1]
      });
    }
  }, []);

    return (
      <div 
       ref={headerRef} id="header"
        className="fixed top-2 flex justify-between items-center max-w-[1280px] mx-auto py-3 px-4 bg-trnsparent">
        <Wordmark />
        <MenuBar />
        <div>
            <Button text="Sign In" />
        </div>
      </div>
    );
}