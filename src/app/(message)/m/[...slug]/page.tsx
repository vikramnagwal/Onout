import { CreateMessageForm } from "@/packages/ui/message/create-message-form";
import { useParams } from "next/navigation";

export default function MessagePage() {
    const { slug } = useParams(); 
    return (
        <div>
            <p>{`hola stranger 👋, i am ${slug}. share your thoughts`}</p>
            <div className="bg-neutral-200 rounded-md shadow-md p-4 mb-4">
            <CreateMessageForm />
        </div>
        </div>
    )
}