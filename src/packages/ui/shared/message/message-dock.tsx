import { Button } from "@packages/ui/button";
import { Tooltip } from "@packages/ui/tooltip";
import { Stars } from "@packages/ui/icons/stars";

export function MessageDock() {
    return (
        <div className="p-2 border border-neutral-300 bg-neutral-800 rounded-full shadow-md">
            <div className="p-2 flex items-center gap-2 z-50">
                <Tooltip content="Generate AI suggestions">
                    <button className="flex items-center p-2 opacity-60 text-sm gap-2"><span><Stars /></span>AI</button>
                </Tooltip>
                <Button className="bg-blue-500 text-white rounded-full" text="Send Message" />
            </div>
        </div>
    )
}