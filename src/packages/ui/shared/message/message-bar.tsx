"use client";
"use caching";


import { useMessages } from "@/app/lib/swr/use-Messages";
import { MessagesContainer } from "./messages";
import { decryptMessages } from "@/packages/utils/functions/messages";
import { LoadingSpinner } from "../../loaders/loading-spinner";

type Message = {
  id: number;
  ipAddress: string;
  clicks: number;
  content: string;    
  createdAt: string;    
  slug: string;
  source: string;
  updatedAt: string;
  // views: string;     // delete this field from database
  workspaceId: string;
};

type Response = {
  success: boolean;
  messages: Message[];
};

export function MessageBar() {
  const { response, isLoading, isAuthenticated } = useMessages() as {
    response?: Response;
    isLoading: boolean;
    isAuthenticated?: boolean;
  };

  if (isLoading) return <p className="p-2"><LoadingSpinner /></p>;
  if (!response?.success) return <p className="p-2">No messages</p>;

  const messages = response.messages ?? [];

  return (
    <section className="p-2">
      <h1 className="text-xl md:text-4xl font-bold px-2">Messages</h1>

      <div className="mt-6 md:mt-8 space-y-3">
        {messages.length === 0 ? (
          <p className="px-2 text-sm text-gray-500">No messages yet.</p>
        ) : (
          messages.map(async (msg) => (
            <MessagesContainer
              key={msg.id}
              message={await decryptMessages(msg.content)}
              time={new Date(msg.createdAt).toLocaleString("en-IN", {
                timeZone: "Asia/Kolkata",
                day: "2-digit",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            />
          ))
        )}
      </div>
    </section>
  );
}
