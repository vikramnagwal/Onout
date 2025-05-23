'use client';

import { ReactNode, useState } from "react";
import { IconUser } from "@tabler/icons-react";
import { Gear } from "./icon/gear";
import { Message } from "./icon/message";
import { Avatar } from "../../avatar";
import { cn } from "@/packages/utils/functions/cn";
import Link from "next/link";

interface SidebarNavProps {
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

export function SidebarNav({className}: SidebarNavProps) {

    return (
      <div
        className={cn(
          "flex flex-col gap-2 py-6 px-2 justify-between h-full",
          className
        )}
      >
        <div className="flex flex-col p-1 space-y-2">
          {NavLinks.map((link, id) => (
            <Link key={id} href={link.href} className="p-2 rounded-md hover:bg-cyan-500">{link.name}</Link>
          ))}
        </div>
        <div className="w-12 h-12 bg-red-500">
          <Avatar />
        </div>
      </div>
    );
}