import { CreateMessageForm } from "@/packages/ui/message/create-message-form";

export default function MessagePage() {
    return (
        <div>
            <h1>Message Page</h1>
            <div className="bg-neutral-200 p-4 rounded-md shadow-md mb-4">
            <CreateMessageForm />
        </div>
        </div>
    )
}