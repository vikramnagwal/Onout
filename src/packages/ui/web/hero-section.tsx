"use client";

import Balancer from "react-wrap-balancer";
import { Button } from "../button";
import { Grid } from "../grid";
import { useRouter } from "next/navigation";

export function Hero() {
  const navigate = useRouter();
    return (
      <div className="py-12">
        <Grid cellSize={64} strokeWidth={2} />
        <div className="flex flex-col items-center max-w-[1280px] mx-auto mb-4 md:mb-8 p-3 bg-transparent rounded-t-3xl backdrop-blur-md h-[600px] text-center relative rounded-2xl">
          <Balancer ratio={0.17}>
            <h1 className="text-4xl md:text-6xl font-semibold md:mt-4 mt-2">
              Your Secret diary written by others
            </h1>
            <p className="text-xl my-2 p-2 opacity-70 mx-auto">
              Onout is a social platform which lets you know and gather thoughts
              of strangers and friends anonymously. Crate your diary today to
              start with because Dare to say! Dare to Listen!
            </p>
          </Balancer>
          <Button className="mt-3" text="Get Started" onClick={() => navigate.push('/register')} />
        </div>
      </div>
    );
}