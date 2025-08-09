import { ReactNode } from "react";

interface MessagesProps {
  message: string;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function Messages() {
    return (
      <div
        className="flex flex-col items-center justify-center p-3 rounded-md h-24 w-80 md:w-[420px] border border-neutral-400"
      >
        <p>here's your message</p>
      </div>
    );
}