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
          "flex flex-col justify-between h-dvh overflow-hidden p-2",
          className
        )}
      >
        <div className="flex flex-col p-1 space-y-2">
          {NavLinks.map((link, id) => (
            <Link
              key={id}
              href={link.href}
              className="p-2 rounded-md hover:bg-neutral-200 flex gap-2 items-center"
            >
              {link.icon}
              {link.name}
            </Link>
          ))}
        </div>
        <div className="flex-shrink-0 border border-neutral-500 p-2 mt-4">
          <Avatar />
        </div>
      </div>
    );
}