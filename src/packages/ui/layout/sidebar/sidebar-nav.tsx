'use client';

import { ReactNode, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { Gear } from "./icon/gear";
import { Message } from "./icon/message";
import { Avatar } from "../../avatar";
import { cn } from "@/packages/utils/functions/cn";

interface SidebarNavProps {
  children: ReactNode;
  className?: string;
}

interface NavLinksProps {
   name: string;
   href: string;
   icon: ReactNode;
}

   const NavLinks: NavLinksProps[] = [
     {
       name: "Messages",
       icon: <Message />,
       href: `/inbox`,
     },
     {
       name: "Settings",
       icon: <Gear />,
       href: "settings",
     },
     {
       name: "Profile",
       icon: <IconUser />,
       href: "profile",
     },
   ];

export function SidebarNav({children, className}: SidebarNavProps) {

    return (
      <div className={cn("flex flex-col gap-2 p-2 h-full", className)}>
        <ul>{children}</ul>
        <div>
          <Avatar />
        </div>
      </div>
    );
}