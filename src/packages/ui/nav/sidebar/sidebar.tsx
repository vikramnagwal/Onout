import { IconInbox, IconSettings } from '@tabler/icons-react';

interface NavLinksProps {
    name: string;
    href: string;
    icon: React.ReactNode;
    isActive?: boolean;
}

const NavLinks: NavLinksProps[] = [
    {
        name: 'inbox',
        href: '/inbox',
        icon: <IconInbox />
    },
    {
        name: 'profile',
        href: '/profile',
        icon: <IconSettings />
    },

]

export function Sidebar() {
    return (
        <nav>
            <ul>
                {NavLinks.map((link, idx) => (
                    <li>{link.icon}{" "}{link.name}</li>
                ))}
            </ul>
        </nav>
    )
}