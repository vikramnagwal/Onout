"use client";

import { CreateMessageForm } from "@/packages/ui/shared/message/create-message-form";
import { useParams } from "next/navigation";

export default function MessagePage() {
    const { slug } = useParams(); 
    return (
        <div className="flex flex-col items-center justify-center p-4 max-w-[1280px] mx-auto">
            <p className="text-xl md:text-2xl mb-4 font-semibold">{`hola stranger 👋, i am ${slug}. share your thoughts with me`}</p>
            <div className="bg-neutral-200 flex flex-col gap-2 justify-center rounded-md shadow-md p-4 mb-4 w-520 md:w-96">
            <CreateMessageForm />
        </div>
        </div>
    )
}