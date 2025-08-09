import { useState } from "react"
import { Input } from "../input"
import { Info } from "../icons/info"

export function WorkspaceNamePreview() {
    const [workspaceName, setWorkspaceName] = useState<string>("")
    return (
        <div className="">
            <Input 
                placeholder="Workspace name" 
                className="rounded-full my-2"
                onChange={(e) => {
                setWorkspaceName(e.target.value)
            }}/>
            <Input
             value={workspaceName ? workspaceName.replaceAll(" ", "-") : ""} 
             placeholder="your workspace name"
             icon={<Info className="w-8 h-8 opacity-60"/>}
             readOnly
             className="w-[400px] rounded-full border-none focus:outline-none outline-none ring-0 cursor-not-allowed"
              />

        </div>
    )
}