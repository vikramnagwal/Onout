import Link from "next/link";
import { cn } from "../utils/functions/cn";


export function MenuBar() {

    return (
        <div className="hidden md:flex flex-row items-center justify-between p-2 rounded-md backdrop:blur-xl">
            <MenuBarItem title="About" href="/" />
            <MenuBarItem title="Report abuse" href="/report-abuse" danger />
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
            "text-sm font-semibold text-neutral-900 hover:bg-neutral-200 rounded-md px-2 py-1",
            danger && "text-red-500",
            disabled && "text-neutral-500 cursor-not-allowed",
         )}
        >
          {title}
        </Link>
      </div>
    );
}