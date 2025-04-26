"use client";

import {
	Tooltip as RadixTooltip,
	TooltipProvider as RadixTooltipProvider,
	TooltipContentProps,
	TooltipTrigger,
	TooltipContent,
	TooltipProps as Props,
	TooltipPortal,
} from "@radix-ui/react-tooltip";
import { ReactNode, useState } from "react";
import { cn } from "../utils/functions/cn";
import { Button, ButtonProps } from "./button";

export const TooltipProvider: React.FC<{ children: ReactNode }> = ({
	children,
}) => {
	return (
		<RadixTooltipProvider delayDuration={150}>{children}</RadixTooltipProvider>
	);
};

export interface TooltipProps extends Omit<TooltipContentProps, "content"> {
	content:
		| ReactNode
		| string
		| ((props: { setOpen: (open: boolean) => void }) => ReactNode);
	contentClassName?: string;
	disableHoverableContent?: Props["disableHoverableContent"];
	delayDuration?: Props["delayDuration"];
}

export function Tooltip({
	children,
	content,
	contentClassName,
	side = "top",
	delayDuration = 0,
	disableHoverableContent,
	...rest
}: TooltipProps) {
	const [open, setOpen] = useState(false);
	return (
		<TooltipProvider>
			<RadixTooltip
				open={open}
				delayDuration={delayDuration}
				disableHoverableContent={disableHoverableContent}
				{...rest}
			>
				<TooltipTrigger
					asChild
					onClick={() => setOpen(true)}
					onMouseEnter={() => setOpen(true)}
					onMouseLeave={() => setOpen(false)}
					onBlur={() => setOpen(false)}
					className="flex px-4 py-2 cursor-pointer mx-auto"
				>
					{children}
				</TooltipTrigger>
				<TooltipPortal>
					<TooltipContent
						side={side}
						sideOffset={8}
						className="animate-slide-up-fade pointer-events-auto z-[99] items-center overflow-hidden rounded-xl border border-neutral-200 bg-white shadow-sm"
						collisionPadding={0}
					>
						{typeof content === "string" ? (
							<span
								className={cn(
									"block text-pretty px-4 py-2 bg-background text-center text-sm text-neutral-700",
									contentClassName,
								)}
							>
								{content}
							</span>
						) : typeof content === "function" ? (
							content({ setOpen })
						) : (
							content
						)}
					</TooltipContent>
				</TooltipPortal>
			</RadixTooltip>
		</TooltipProvider>
	);
}

export function ButtonTooltip({
	text,
	content,
	tooltipProps,
	...props
}: {
	text: string;
	content: string;
	tooltipProps?: Omit<TooltipProps, "content">;
} & ButtonProps) {
	return (
		<Tooltip content={content} {...tooltipProps}>
			<Button
				text={text}
				type="button"
				{...props}
				className={cn("flex px-4 py-2 rounded-md duration-75", props.className)}
			/>
		</Tooltip>
	);
}
