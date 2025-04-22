"use client";

import { onScroll, animate } from "animejs";
import { Button } from "../button";
import { MenuBar } from "../menu-bar";
import { Wordmark } from "../wordmark";
import { useRef } from "react";


export function NavHeader() {
  const headerRef = useRef<HTMLDivElement>(null);

  function handleScroll() {
    if (headerRef.current) {
      const scrollY = window.scrollY;
      const headerHeight = headerRef.current.offsetHeight;
      const opacity = Math.max(0, 1 - scrollY / headerHeight);
      const translateY = Math.min(0, scrollY - headerHeight);
      animate(headerRef.current, {
        opacity: opacity,
        duration: 0.5,
        ease: "cubicBezier",
        autoplay: onScroll({
          target: headerRef.current,
          debug: true,
        })
      } );
    }
  }
    return (
      <div ref={headerRef} id="header" className="flex justify-between items-center max-w-[1280px] mx-auto p-3 bg-trnsparent">
        <Wordmark />
        <MenuBar />
        <div>
            <Button text="Sign In" />
        </div>
      </div>
    );
}