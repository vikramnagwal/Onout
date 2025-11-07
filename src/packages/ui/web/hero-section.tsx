"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "../button";
import { Grid } from "../grid";
import { useRouter } from "next/navigation";

export function HeroSection() {
  const navigate = useRouter();
    return (
      <div className="pt-12">
        <Grid cellSize={42} strokeWidth={2} className="max-h-[800px]"/>
        <div className="flex flex-col mt-6 items-center max-w-[1280px] md:h-[600px] mx-auto mb-4 md:mb-8 p-3 py-[30px] md:py-[60px] backdrop-blur-lg bg-[#f9f7f3] text-center relative rounded-t-2xl shadow-[0_3px_10px_rgb(0,0,0,0.2)]">
          <Balancer ratio={0.17}>
            <h1 className="text-4xl md:text-6xl font-semibold md:mt-4 mt-1 py-2">
              Your Secret diary written by others
            </h1>
            <p className="text-md text-start y-3 p-2 opacity-70 mx-auto">
              Onout is a social platform which lets you know and gather thoughts
              of strangers and friends anonymously. Crate your diary today to
              start with because Dare to say! Dare to Listen!
            </p>
          </Balancer>
          <div className="flex items-center justify-between gap-6">
            <Button
              className="mt-6"
              text="Get Started"
              onClick={() => navigate.push("/register")}
            />
            <Button
              className="mt-6"
              text="Learn More"
              variant={"secondary"}
              onClick={() => navigate.push("/about")}
            />
          </div>
        </div>
      </div>
    );
}