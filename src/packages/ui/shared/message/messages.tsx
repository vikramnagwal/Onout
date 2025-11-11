'use client';

import { cn } from "@/lib/utils";
import { CircleCheckBig } from "lucide-react";
import { ReactNode, useState } from "react";

interface MessagesProps {
  message: string;
  time?: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function MessagesContainer({
  message,
  time,
  className,
  onClick,
}: MessagesProps) {
  const [showModel, setShowModel] = useState(false);
  const [isChecked, setIsChecked] = useState(false)
  
  return (
    <figure
      className={cn(
        "flex flex-col px-3 py-2 m-2 rounded-md bg-neutral-200 hover:shadow-md hover:border border-neutral-300 cursor-pointer w-[680px]",
        className
      )}
    >
      <p className="text-sm px-2 font-semibold text-neutral-700">{time}</p>
      <div className="flex justify-between px-2">
        <p className="text-lg leading-8 mt-3">{message}</p>
        <CircleCheckBig color={!isChecked ? "blue": "green"} />
      </div>
    </figure>
  );
}
