import { cva, VariantProps } from "class-variance-authority";
import { motion } from "motion/react";
import { ReactNode } from "react";
import { cn } from "../utils/functions/cn";
import { IconX } from "@tabler/icons-react";


const NoteVariants = cva(
    "flex items-center text-sm px-4 py-2 backdrop-blur-md border border-neutral-300 shadow-[0px_2px_3px_-1px_rgba(0,0,0,0.1),0px_1px_0px_0px_rgba(25,28,33,0.02),0px_0px_0px_1px_rgba(25,28,33,0.08)]",
    {
        variants: {
            variant: {
                primary: "bg-neutral-50 text-neutral-900",
                caution: "bg-yellow-300 text-white",
                warning: "bg-red-600 text-white",
            },
            size: {
                fit: "w-80 mx-auto px-3 text-center"
            },
            borderRadius: {
                rounded: "rounded-full",
                square: "rounded-none",
                mid: "rounded-md"
            }
        },
        defaultVariants: {
            variant: "primary",
            borderRadius: "rounded"
        }
    }
)
interface NoteProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof NoteVariants> {
  text: string;
  icon?: ReactNode;
  className?: string;
}

export function Note({ text, icon, variant, size, borderRadius, className }: NoteProps) {
     return (
       <div className="relative z-40 p-2">
         <motion.div
           initial={{ opacity: 0, y: -10 }}
           animate={{ opacity: 1, y: 0 }}
           className={cn(
             NoteVariants({ variant, size, borderRadius }),
             className
           )}
         >
           {icon && <span className="mr-2">{icon}</span>}
           {text}
           <IconX className="absolute -top-3 right-2 p-1 rounded-full border border-neutral-300 bg-white z-50 cursor-pointer" />
         </motion.div>
       </div>
     );
}