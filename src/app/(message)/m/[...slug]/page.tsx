"use client";

import MessangerAvatar from "@/packages/ui/messenger-avatar";
import { CreateMessageForm } from "@/packages/ui/shared/message/create-message-form";
import { useParams } from "next/navigation";

export default function MessagePage() {
    const { slug } = useParams(); 
    const workspaceName = Array.isArray(slug) ? slug.join('/') : (slug ?? "UnKnown");

    // TODO: OpenToAcceptMessages, status

    return (
      <div className="container mx-auto p-4 max-w-[480px]">
        <h1 className="text-5xl md:text-9xl font-black flex flex-col md:items-center py-2">
          ONOUT
        </h1>
        <MessangerAvatar workspaceName={workspaceName} />
        <div>
          <CreateMessageForm />
        </div>
        <div className="grid gap-2 pb-8 pt-4">
          <p className="text-xs text-neutral-600">
            © {new Date().getFullYear()} Onout.
          </p>
        </div>
      </div>
    );
}