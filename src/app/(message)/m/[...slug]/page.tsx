"use client";

import { CreateMessageForm } from "@/packages/ui/shared/message/create-message-form";
import { useParams } from "next/navigation";

export default function MessagePage() {
    const { slug } = useParams(); 
    return (
        <div className="container mx-auto p-4 max-w-[480px]">
            <CreateMessageForm />
        </div>
    )
}