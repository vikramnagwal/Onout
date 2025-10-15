'use client'

import { ReactNode } from "react";

interface HeaderProps {
    headerTitle: string;
    backPathHistory?: () => void;
    nextPathAction?: () => void;
    rightAction?: ReactNode;
}

export function DashboardHeader({ headerTitle, backPathHistory, nextPathAction, rightAction }: HeaderProps) {
    return (
        <header className="w-full p-6 sticky top-0 bg-white border-b border-neutral-300 flex items-center justify-between">
            <h1 className="font-semibold opacity-80 mx-auto md:mx-0">{headerTitle}</h1>
            {backPathHistory && <button onClick={backPathHistory}>Back</button>}
            {nextPathAction && <button onClick={nextPathAction}>Next</button>}
            {rightAction}
        </header>
    )
}