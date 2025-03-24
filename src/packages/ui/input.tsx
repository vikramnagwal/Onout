"use client";

import { useCallback, useState } from "react";
import { cn } from "../utils/functions/cn";
import { AlertCircle, Eye, EyeClosed } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    ref?: React.Ref<HTMLInputElement>;
}

export function Input({
    className,
    type = "text",
    error,
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
            "w-full px-2 py-1 border focus:ring-2 ring-blue-500/60 rounded-md border-neutral-100 focus:outline-none focus:border-neutral-300",
            error && "border-red-500 ring-red-500",
            className
          )}
        />
        <div className="absolute inset-y-0 right-2">
          {type === "password" && (
            <button type="button" onClick={togglePasswordVisibility} className="absolute inset-y-0 right-0 flex items-center px-3 cursor-pointer" aria-label={ isPasswordVisible ? "Hide password" : "Show password" }>
              {isPasswordVisible ? (
                <Eye className="size-4" />
              ) : (
                <EyeClosed className="size-4" />
              )}
            </button>
          )}
        </div>
      </div>
    );
}