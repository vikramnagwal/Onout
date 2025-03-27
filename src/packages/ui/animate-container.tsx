'use client';
import React, { PropsWithChildren, ComponentPropsWithRef, useRef} from "react";
import { motion } from "framer-motion";
import { useResizeObserver } from "../hooks/use-resize-observer";

type AnimatedContinerProps = PropsWithChildren<{
  width?: boolean;
  height?: boolean;
  elementRef?: React.RefObject<HTMLDivElement>;
}> & Omit<ComponentPropsWithRef<typeof motion.div>, "animate" | "children">;

export function AnimatedContainer({
    width = false,
    height = false,
    children,
    elementRef: ref,
    transition = { duration: 0.3 },
    ...rest
}: AnimatedContinerProps) {
    const animteRef = useRef<HTMLDivElement>(null);
    const entry = useResizeObserver(animteRef as React.RefObject<Element>)
    return (
       <motion.div
            ref={ref}
            animate={{ width: width ? entry?.contentRect.width : "auto", height: height ? entry?.contentRect.height : "auto" }}
            transition={transition ? transition : { type: 'spring', duration: 0.3 }}
            {...rest}
       >
        <div ref={animteRef}>
        { children as React.ReactElement }
        </div>
       </motion.div>
    )
}