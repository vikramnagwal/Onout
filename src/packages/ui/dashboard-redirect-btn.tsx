import { useCookie } from "../hooks/use-cookie";
import { Button } from "./button";

export function DashboardRedirectButton() {
    const [dashboardUrl] = useCookie("workspaceName", "")
    console.log("dashboard-url",dashboardUrl)
    return (
        <a href={`${dashboardUrl}/inbox`} className="flex items-center justify-center">
            <Button text="Dashboard" />
        </a>
    )
}