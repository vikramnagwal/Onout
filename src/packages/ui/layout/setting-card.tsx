import { CapitalChar } from "@/packages/utils/functions/capital";
import { cn } from "@/packages/utils/functions/cn";
import { cva, VariantProps } from "class-variance-authority";
import { ReactNode } from "react";

interface CardProps extends VariantProps<typeof settingCardVariants> {
    title: string;
    description: string;
    text?: string;
    action?: ReactNode; 
    actionDescription: string;
    img?: string;
    classname?: string;
}

const settingCardVariants = cva(
    " m-2 p-2 rounded-md bg-white duration-300 ease-in-out transition-all border",
    {
        variants: {
            variant: {
                primary: 
                 "border-neutral-300 text-black",
                danger:
                 "border-red-600 text-red-500"
            }
        },
        defaultVariants: {
            variant: "primary",
        }
    }
)

export function SettingCard({
    variant = "primary",
    title,
    description,
    action,
    actionDescription,
    text,
    img,
    classname
}: CardProps) {
    return (
      <section className={cn(settingCardVariants({ variant }), classname)}>
        <div className="flex flex-col p-1 space-y-1">
          <h2 className="font-normal text-md">{title || "error"}</h2>
          <p className="opacity-80 text-sm mb-2">
            {CapitalChar(description) || ""}
          </p>
          {img ? (
            <div className="w-24 h-24 rounded-full border border-neutral-300 overflow-hidden">
              <img
                src={img}
                alt="not-found"
                className="bg-cover w-full h-full"
              />
            </div>
          ) : (
            text && (
              <div className="p-3 border border-neutral-300 rounded-md bg-neutral-300 max-w-[50%]">
                {text}
              </div>
            )
          )}
        </div>
        {/* Setting Card: action section */}
        {action && (
          <div className="flex justify-between items-center-safe border border-neutral-300 rounded-md mx-1 p-4 mt-2">
            <p className="text-sm font-semibold text-blue-500">
              {actionDescription}
            </p>
            {action}
          </div>
        )}
      </section>
    );
}