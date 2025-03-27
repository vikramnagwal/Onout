import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react";
import { cn } from "../utils/functions/cn";

const buttonVariants = cva(
  "transitions-all duration-200 ease-in-out rounded-md px-2 py-1 cursor-pointer",
  {
    variants: {
      variant: {
        primary:
          "btn flex items-end justify-center text-sm px-4 py-2 hover:ring-2 ring-neutral-400 border-black dark:bg-white dark:text-black",
        secndary:
          "border-neutral-200 bg-white text-black text-neutral-900 hover:bg-neutral-50 focus-visible:border-neutral-500 outline-none",
        outline:
          "border border-transparent hover:border-neutral-200 focus-visible:border-neutral-500",
        success:
          "border-green-500 bg-green-500 text-white hover:ring-4 hover:ring-green-100",
        danger:
          "border-red-500 shadow-md bg-red-500 text-white hover:ring-4 hover:ring-red-300",
        fancy:
          "rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
      },
    },
    defaultVariants: {
      variant: "primary",
    },
  }
);


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text: ReactNode | string;
  textWrapperClassName?: string;
  shortcutClassName?: string;
  loading?: boolean;
  disabled?: boolean;
  icon?: ReactNode;
  right?: ReactNode;
  ref?: React.Ref<HTMLButtonElement>;
  className?: string;
}


export function Button({
    variant="primary",
    ref,
    text,
    textWrapperClassName,
    className,
    loading,
    icon,
}:ButtonProps) {
    return (
        <button ref={ref} className={cn(buttonVariants({variant}), className)} disabled={loading}>
            {icon && <span className="mr-3">{icon}</span>}
            {text && <span className={textWrapperClassName}>{text}</span>}
        </button>
    )
}