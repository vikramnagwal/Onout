'use client';

import { ReactNode, Suspense, useState } from "react";
import { Modal } from "../../model";
import { Button } from "../../button";
import { Dot, MessageSquareText } from "lucide-react";
import { MessageIcon } from "../../icons/message";
import { useMessages } from "@/app/lib/swr/use-Messages";
import { decryptMessages } from "@/packages/utils/functions/messages";


interface MessagesProps {
  message: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Messages({
  message = "here's your message",
  icon,
  className,
  onClick,
}: MessagesProps) {

  const [showModel, setShowModel] = useState(false);
  const { response, isLoading, isAuthenticated } = useMessages();
  // Using type assertion to tell TypeScript that response might have messages
  const messages = (response as any)?.messages || [];
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <div>Please log in to see messages.</div>;
  // if (!response || response.length === 0) return <div>No messages available.</div>;
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Button 
        text={messages.length > 0 ? `Messages (${messages.length})` : "No new messages"}
        icon={<MessageIcon className="w-6 h-6" />}
        onClick={() => setShowModel(true)}
        className={className}
      />
        
      

      {messages.map((msg: any) => (
        <Modal key={msg.id} showModal={showModel === msg.id} setShowModel={() => setShowModel(msg.id)}>
          <div className="p-4">
            <span className="relative"><MessageSquareText /><Dot color="red" className="absolute top-[-18px] left-[-18px]" size={40}/></span>
            <p>{<span key={msg.id}>{decryptMessages(msg.content)}</span>}</p>
            <Button 
              text="Close"
              onClick={() => setShowModel(false)}
              className="mt-4"
            />
          </div>
        </Modal>
      ))}
    </Suspense>
  );
}
