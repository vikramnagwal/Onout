'use client';

import { ReactNode } from "react";
import { IconMessage, IconSettings, IconUser } from "@tabler/icons-react";
import Link from "next/link";
import { useParams } from "next/navigation";


interface NavLinksProps {
   name: string;
   href: string;
   icon: ReactNode;

}

const NavLinks: NavLinksProps[] = [
    {
        name: "Messages",
        icon: <IconMessage />,
        href: ``
    }, 
    {
        name: "Settings",
        icon: <IconSettings />,
        href: "settings"
    },
    {
        name: "Profile",
        icon: <IconUser />,
        href: "profile"
    }
]

export function AppSidebar() {
    const {slug} = useParams() as { slug: string };
    return (
      <div className="">
        <ul>
          {NavLinks.map((link) => (
            <Link
              id={link.name}
              href={`/${slug}/${link.href}`}
              key={link.name}
              className="text-sm p-2"
            >
              <li
                className="flex items-center hover:bg-neutral-100 transition-colors dura
              tion-200 rounded-md ease-in-out cursor-pointer mx-1 p-2"
              >
                <span className="mx-2">{link.icon}</span>
                {link.name}
              </li>
            </Link>
          ))}
        </ul>
      </div>
    );
}