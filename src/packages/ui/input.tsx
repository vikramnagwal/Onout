"use client";

import { ReactNode, useCallback, useState } from "react";
import { cn } from "../utils/functions/cn";
import { Eye, EyeClosed } from "lucide-react";
import { Tooltip } from "./tooltip";


export interface InputProps
	extends React.InputHTMLAttributes<HTMLInputElement> {
	error?: string;
	ref?: React.Ref<HTMLInputElement>;
	icon?: ReactNode
}

export function Input({
	className,
	type = "text",
	error,
	icon,
	ref,
	...props
}: InputProps) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);

	const togglePasswordVisibility = useCallback(() => {
		setIsPasswordVisible((prev) => !prev);
	}, [isPasswordVisible, setIsPasswordVisible]);

	return (
    <div className="relative flex">
      <input
        type={isPasswordVisible ? "text" : type}
        className={cn(
          "w-full p-2 max-w-md rounded-md border border-neutral-300 text-neutral-900 placeholder-neutral-400 read-only:bg-neutral-100 read-only:text-neutral-500 focus:border-neutral-500 focus:ring-1 focus:outline-none focus:ring-neutral-500 sm:text-sm",
          error && "border-red-500 ring-red-500",
          className
        )}
        {...props}
        ref={ref}
      />
      <div className="absolute inset-y-0 right-2">
        {type === "password" && (
          <button
            type="button"
            onClick={togglePasswordVisibility}
            className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
          >
            {isPasswordVisible ? (
              <Eye className="size-4" />
            ) : (
              <EyeClosed className="size-4" />
            )}
          </button>
        )}
        {/* tooltip btn */}
        {icon && (
          <Tooltip
            content={"your workspace name will be look like this"}
            className="font-thin absolute inset-y-0 right-0 flex items-center px-2 cursor-pointer"
            side="top">
            {icon}
          </Tooltip>
        )}
      </div>
    </div>
  );
}
