import { ReactNode, useState } from "react";
import { motion } from "motion/react";
import { Modal } from "../../model";
import { Button } from "../../button";
import { Dot, MessageSquareText } from "lucide-react";
import { MessageIcon } from "../../icons/message";


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

  return (
    <>
      <Button 
        text={message}
        icon={<MessageIcon className="w-6 h-6" />}
        onClick={() => setShowModel(true)}
        className={className}
      />
        
      

      <Modal showModal={showModel} setShowModel={setShowModel}>
        <div className="p-4">
          <span className="relative"><MessageSquareText /><Dot color="red" className="absolute top-[-18px] left-[-18px]" size={40}/></span>
          <p>{message}</p>
          <Button 
            text="Close"
            onClick={() => setShowModel(false)}
            className="mt-4"
          />
        </div>
      </Modal>
    </>
  );
}
