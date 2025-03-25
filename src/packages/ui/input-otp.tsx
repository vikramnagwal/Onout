"use client";

import { OTPInput, SlotProps } from "input-otp";
import { cn } from "../utils/functions/cn";
import { useState } from "react";

export function InputOTP({length = 4}:{length:number}) {
  const [code, setCode] = useState<string>("")
  const [otp, setOtp] = useState<string>("")

  return (
    <div>
      <OTPInput
        maxLength={length}
        value={code}
        onComplete={() => setOtp(code)}
        containerClassName="group flex items-center justify-center"
        onChange={(code) => setCode(code)}
        render={({ slots }) => (
          <>
            <div className="flex">
              {slots.map((slot, idx) => (
                <div key={idx} className="flex items-center">
                  <Slot {...slot} />
                </div>
              ))}
            </div>
          </>
        )}
      />
    </div>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={cn(
        "relative w-10 h-12 m-1 text-[1.2rem]",
        "flex items-center justify-center",
        "transition-all duration-150",
        "border-border border-y border-r first:border-l first:rounded-l-md last:rounded-r-md",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20",
        "outline outline-accent-foreground/20",
        { "outline-3 outline-green-500 border-none": props.isActive }
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
    </div>
  )
}


