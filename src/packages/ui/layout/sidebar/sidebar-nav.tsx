"use client";

import { ReactNode, useContext } from "react";
import { IconUser } from "@tabler/icons-react";
import { Gear } from "./icon/gear";
import { Message } from "./icon/message";
import { Avatar } from "@packages/ui/avatar";
import { cn } from "@/packages/utils/functions/cn";
import Link from "next/link";
import { ClientOnly } from "../../client-only";
import { SideNavContext } from "../main-nav";


interface SidebarNavProps {
  className?: string;
}

interface NavLinksProps {
  name: string;
  href: string;
  icon: ReactNode;
}

export function SidebarNav({ className }: SidebarNavProps) {
  const { open: expanded } = useContext(SideNavContext);

  const NavLinks: NavLinksProps[] = [
    {
      name: "Messages",
      icon: <Message />,
      href: "inbox",
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

  return (
    <div className="h-full">
      <ClientOnly className="size-full">
        <div className={cn("h-full flex flex-col justify-between", className)}>
          <div className="flex-1 p-2">
            <div className="space-y-4">
              {NavLinks.map((link, id) => (
                <Link
                  key={id}
                  href={link.href}
                  className={cn(
                    "p-2 rounded-lg hover:bg-gray-100 flex items-center transition-colors",
                    expanded ? "gap-3" : "justify-center"
                  )}
                  title={!expanded ? link.name : undefined}
                >
                  <span className={cn("w-5 h-5 rounded-full flex-shrink-0")}>
                    {link.icon}
                  </span>
                  {expanded && (
                    <span className="font-medium text-gray-700">
                      {link.name}
                    </span>
                  )}
                </Link>
              ))}
            </div>
          </div>            
        </div>
      </ClientOnly>
    </div>
  );
}
