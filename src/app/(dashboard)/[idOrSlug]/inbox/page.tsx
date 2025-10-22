import { MessageIcon } from "@/packages/ui/icons/message";
import { Messages } from "@/packages/ui/shared/message/messages";

export default function Page() {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <Messages message="New message received!" icon={<MessageIcon />} />
    </div>
  )
}