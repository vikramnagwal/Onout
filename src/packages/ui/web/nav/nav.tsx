import { cn } from "@/packages/utils/functions/cn";
import {Item, NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuList, NavigationMenuTrigger, } from "@radix-ui/react-navigation-menu";
import Link from "next/link";
import { HelpMenu } from "./graphic/helpcontext";


export function MenuBar() {

    return (
      <div className="hidden md:flex flex-row items-center justify-center p-2">
        <NavigationMenu>
          <NavigationMenuList className="flex ">
            <Item>
              <MenuBarItem title="Pricing" />
            </Item>
            <Item>
              <MenuBarItem title="Blog" />
            </Item>

            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <MenuBarItem title="Help" danger />
              </NavigationMenuTrigger>
              <NavigationMenuContent className="absolute backdrop-blur-lg bg-neutral-100 rounded-md p-2 mt-4 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto">
                <HelpMenu />
              </NavigationMenuContent>
            </NavigationMenuItem>

            <Item>
              <MenuBarItem title="Forum" />
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
            "text-base duration-300 font-medium text-neutral-600 opacity-80 hover:opacity-100 rounded-md px-2 py-1",
            danger && "text-red-500 hover:bg-red-200",
            disabled && "text-neutral-500 cursor-not-allowed",
         )}
        >
          {title}
        </Link>
      </div>
    );
}