"use client";

import { NavHeader } from "@/packages/ui/nav/header";
import { Hero } from "@/packages/ui/web/hero-section";
import { useState } from "react";

export default function Home() {
	const [openModal, setOpenModel] = useState<boolean>(false)
	return (
    <div className="p-2">
      <NavHeader />
      <div id="landing-page" className=" max-w-[1280px] mx-auto mt-3 p-3 text-center">
        <Hero />
      </div>
    </div>
  );
}
