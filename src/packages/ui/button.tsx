import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";
import { cn } from "../utils/functions/cn";
import { LoadingSpinner } from "./loaders/loading-spinner";

const buttonVariants = cva(
  "relative transitions-all duration-200 ease-in-out rounded-md text-sm p-2 cursor-pointer flex items-center justify-center shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)]",
  {
    variants: {
      variant: {
        primary:
          "btn hover:ring-2 ring-neutral-400 border-black dark:bg-white dark:text-black",
        secondary:
          "border border-neutral-300 focus-visible:border-neutral-400 bg-white text-black text-neutral-900 hover:bg-neutral-50 focus-visible:border-neutral-500 outline-none",
        outline:
          "border border-neutral-200/80 hover:border-neutral-300 focus-visible:border-neutral-500",
        success:
          "border-green-500 bg-green-500 text-white hover:ring-4 hover:ring-green-100",
        danger:
          "border-red-500 outline-none shadow-md bg-red-500 text-white hover:ring-4 hover:ring-red-300",
        fancy:
          "rounded-2xl border-2 border-dashed border-black bg-white px-6 py-3 font-semibold uppercase text-black transition-all duration-300 hover:translate-x-[-4px] hover:translate-y-[-4px] hover:rounded-md hover:shadow-[4px_4px_0px_black] active:translate-x-[0px] active:translate-y-[0px] active:rounded-2xl active:shadow-none",
      },
      size: {
        default: "px-4 py-2 text-sm",
        sm: "px-3 py-1.5 text-sm",
        lg: "px-5 py-3 text-base",
        xs: "px-2 py-1 text-xs",
        xl: "px-6 py-3 text-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "default",
    },
  }
);

export interface ButtonProps
	extends React.ButtonHTMLAttributes<HTMLButtonElement>,
		VariantProps<typeof buttonVariants> {
	text: ReactNode | string;
	textWrapperClassName?: string;
	shortcut?: string;
	shortcutClassName?: string;
	loading?: boolean;
	disabled?: boolean;
	notification?: boolean;
	icon?: ReactNode;
	right?: ReactNode;
	ref?: React.Ref<HTMLButtonElement>;
	className?: string;
}

export function Button({
	variant = "primary",
	size,
	ref,
	text,
	textWrapperClassName,
	shortcut,
	shortcutClassName,
	className,
	disabled,
	notification,
	loading,
	icon,
	...rest
}: ButtonProps) {
	return (
		<button
			ref={ref}
			className={cn(buttonVariants({ variant, size }), className)}
			disabled={disabled || loading}
			{...(loading && { "aria-busy": true })}
			{...rest}
		>
			{loading ? (
				<LoadingSpinner />
			) : (
				icon && <span className="mr-3">{icon}</span>
			)}
			{text && <span className={textWrapperClassName}>{text}</span>}
			{shortcut && (
				<kbd
					className={cn(
						"hidden ml-2 rounded-sm border-none bg-neutral-600 px-2 py-0.5 text-xs font-light text-neutral-200 md:inline-block",
						{
							"bg-neutral-100": variant?.endsWith("outline"),
							"bg-neutral-200 text-neutral-400": disabled,
						},
						shortcutClassName,
					)}
				>
					{shortcut}
				</kbd>
			)}
		</button>
	);
}

Button.displayName = "Button";
