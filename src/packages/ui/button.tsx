import { cva, VariantProps } from "class-variance-authority"
import { ReactNode } from "react";
import { cn } from "../utils/functions/cn";

const buttonVariants = cva(
    "transitions-all duration-200 ease-in-out rounded-md px-2 py-1",
    {
        variants: {
            variant: {
                primary: "bg-black text-white text-sm px-4 py-2 border-black dark:bg-white dark:text-white",
                secndary: "border-netrl-200 bg-white text-neutral-900 hover:bg-neutral-50 focus-visible:border-neutral-500 outline-none",
                outline: "border border-transparent hover:border-neutral-200 focus-visible:border-neutral-500",
                success: "border-green-500 bg-green-500 text-white hover:ring-4 hover:ring-green-100",
                danger: "border-red-500 shadow-md bg-red-500 text-white hover:ring-4 hover:ring-red-300",
            }
        },
        defaultVariants: {
            variant: "primary"
        }
    }
)


export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  text?: ReactNode | string;
  textWrapperClassName?: string;
  shortcutClassName?: string;
  loading?: boolean;
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
    shortcutClassName,
    loading,
    icon,
    right,
}:ButtonProps) {
    return (
        <button ref={ref} className={cn(buttonVariants({variant}), className)} disabled={loading}>
            {icon && <span className="mr-2">{icon}</span>}
            {text && <span className={textWrapperClassName}>{text}</span>}
        </button>
    )
}