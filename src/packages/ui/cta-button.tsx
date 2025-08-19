import Link from "next/link";
import { cn } from "../utils/functions/cn";
import { motion } from "motion/react";

type CtaButtonProps = {
    text: string;
    href: string;
    classname?: string;
    target?: "_self" | "_blank"
}

export function CTAButton({ text, href="#", classname, target = "_blank" }: CtaButtonProps) {
    return (
      <Link
        target={target}
        href={href}
        className={cn(
          "transitions-all duration-200 ease-in-out p-2 cursor-pointer flex items-center justify-center text-sm py-2 px-4 rounded-md shadow-xl bg-neutral-900 hover:ring-2 ring-neutral-400 border-black text-white text-center",
          classname
        )}
      >
        {text}
      </Link>
    );
}