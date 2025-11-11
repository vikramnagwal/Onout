"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface AutoExpandingTextareaProps extends React.ComponentProps<"textarea"> {
  minHeight?: number;
  maxHeight?: number; 
}

function AutoExpandingTextarea({
  className,
  minHeight = 120,
  maxHeight,
  onChange,
  ...props
}: AutoExpandingTextareaProps) {
  const textareaRef = React.useRef<HTMLTextAreaElement>(null);

  const handleAutoResize = React.useCallback(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    // Reset height to recalculate
    textarea.style.height = "auto";

    // Calculate scrollHeight (content height)
    let newHeight = textarea.scrollHeight;

    // Apply minimum height
    newHeight = Math.max(newHeight, minHeight);

    // Apply maximum height if specified
    if (maxHeight) {
      newHeight = Math.min(newHeight, maxHeight);
    }

    textarea.style.height = `${newHeight}px`;
  }, [minHeight, maxHeight]);

  // Handle onChange and trigger resize
  const handleChange = React.useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      handleAutoResize();
      onChange?.(e);
    },
    [handleAutoResize, onChange]
  );

  // Initialize height on mount and when value changes
  React.useEffect(() => {
    handleAutoResize();
  }, [props.value, handleAutoResize]);

  return (
    <textarea
      ref={textareaRef}
      data-slot="textarea"
      className={cn(
        "border-input placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 flex w-full rounded-md border bg-transparent px-3 py-2 text-base shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 md:text-sm resize-none overflow-hidden",
        className
      )}
      onChange={handleChange}
      {...props}
    />
  );
}

export { AutoExpandingTextarea };
