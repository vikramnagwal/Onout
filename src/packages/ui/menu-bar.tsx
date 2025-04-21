import Link from "next/link";
import { cn } from "../utils/functions/cn";
import { Avatar } from "./avatar";


export function MenuBar() {

    return (
        <div className="hidden md:flex flex-row items-center justify-between p-2 rounded-md backdrop:blur-xl sticky top-2">
            <MenuBarItem title="About" href="/" />
            <MenuBarItem title="Report abuse" href="/report-abuse" danger={true} />
        </div>
    )
}

const MenuBarItem = ({title, href, danger, disabled} : {
    title: string,
    href?: string
    danger?: boolean
    disabled?: boolean
}) => {
    return (
      <div className="mx-1 px-2 font-base">
        <Link
          href={href ?? "#"}
          className={cn(
            "text-sm font-semibold text-neutral-900 dark:text-white hover:bg-neutral-200 dark:hover:bg-neutral-800 rounded-md px-2 py-1",
            danger && "text-red-500",
            disabled && "text-neutral-500 cursor-not-allowed",
         )}
        >
          {title}
        </Link>
        <div>
          <Avatar />
        </div>
      </div>
    );
}