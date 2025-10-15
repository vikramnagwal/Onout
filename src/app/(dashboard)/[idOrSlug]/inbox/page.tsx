import { MessageIcon } from "@/packages/ui/icons/message";
import { Messages } from "@/packages/ui/shared/message/messages";

export default function Page() {
  return (
    <div>
      <Messages message="New message received!" icon={<MessageIcon />} />
    </div>
  )
}