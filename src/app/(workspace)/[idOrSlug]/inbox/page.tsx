"use client";

import { Button } from "@/packages/ui/button";
import CreateInboxForm from "@/packages/ui/inbox/create-inbox-form";
import { Popover } from "@/packages/ui/popover";
import { useState } from "react";

export default function InboxName() {
    const [openInbox, setOpenInbox] = useState<boolean>(false);

    return (
        <div className="flex flex-col justify-center items-center h-full p-4">
            <h1>check inbox name</h1>
            <Popover
                content={<CreateInboxForm />}
                openPopover={openInbox}
                setOpenPopover={setOpenInbox}
            >
                <Button 
                    text={"Create Inbox"}
                    shortcut="c"
                />
            </Popover>
        </div>
    )
}