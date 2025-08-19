import { cn } from "@/packages/utils/functions/cn";

interface CardProps {
  title: string;
  workspaceName: string;
  image: string;
  description?: string;
  imageAlt?: string;
  className?: string;
}

export const Card = ({
  title,
  workspaceName,
  description,
  image,
  imageAlt,
  className,
}: CardProps) => {
  return (
    <div className={cn("flex gap-2 w-2xl rounded-xl border border-gray-400 dark:border-gray-200", className)}>
      <div className="flex items-center gap-2 p-3 justify-between w-full">
        <img src={image} alt={imageAlt || "social branding"} className="w-14 h-14 rounded-full border border-gray-300"/>
        <div className="flex-1">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{title}</h2>
          <p className="text-sm text-gray-500 dark:text-gray-400">{`onout.co/${workspaceName}`}</p>
        </div>
      </div>
    </div>
  )

}