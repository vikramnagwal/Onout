"use client";

import { useCallback, useState } from "react";
import { cn } from "../utils/functions/cn";
import { Eye, EyeClosed } from "lucide-react";

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
      <div>
        <div className="flex items-center justify-between">
          <input
            className={cn(
              "border border-gray-300 rounded-md p-2 focus:ring-2 focus:ring-blue-500 focus:outline-none",
              error && "border-red-500 focus:border-red-500 focus:ring-red-500",
              className
            )}
            type={isPasswordVisible ? "text" : type}
            ref={ref}
            {...props}
          />
          {type === "password" && (
            <button
              onClick={togglePasswordVisibility}
              aria-label={isPasswordVisible ? "Hide Password" : "Show Password"}
            >
              {isPasswordVisible ? <Eye className="size-4" /> : <EyeClosed className="size-4" />}
            </button>
          )}
        </div>
      </div>
    );
}