import { cn } from "@/packages/utils/functions/cn";
import {Item, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { AboutMenu } from "./graphic/about";


export function MenuBar() {

    return (
      <div className="hidden md:flex flex-row items-center justify-between mx-auto p-2">
        <NavigationMenu>
          <NavigationMenuList className="flex">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <MenuBarItem title="about"/>
              </NavigationMenuTrigger>
              <NavigationMenuContent className="z-20 absolute p-2 shadow-md mt-2 rounded-md bg-white"><AboutMenu /></NavigationMenuContent>
            </NavigationMenuItem>
            <Item>
              <MenuBarItem title="report abuse" danger/>
            </Item>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
    );
}

const MenuBarItem = ({title, href, danger, disabled} : {
    title: string,
    href?: string
    danger?: boolean
    disabled?: boolean
}) => {
    return (
      <div className="mx-1 px-2 py-1 font-base">
        <Link
          href={href ?? "#"}
          className={cn(
            "text-sm duration-300 font-semibold text-neutral-900 hover:bg-neutral-200 rounded-md px-2 py-1",
            danger && "text-red-500 hover:bg-red-200",
            disabled && "text-neutral-500 cursor-not-allowed",
         )}
        >
          {title}
        </Link>
      </div>
    );
}