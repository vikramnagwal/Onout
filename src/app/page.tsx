import { Button } from "@/packages/ui/button";
import { LoadingSpinner } from "@/packages/ui/loaders/loading-spinner";
import { ButtonTooltip, Tooltip } from "@/packages/ui/tooltip";

export default async function Home() {
  return (
   <div>
    <p>Users</p>
   <ButtonTooltip tooltipProps={{ content: "Tooltip content", side: "top" }} className="p-2 flex text-center mx-auto"> Click me </ButtonTooltip>
   <Button text="here" variant="outline"/>
   <LoadingSpinner />
   </div>
  );
}
