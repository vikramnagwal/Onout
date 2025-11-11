import { MessageBar } from "@/packages/ui/shared/message/message-bar";

const dummyMessage = [
  {
    id: 1,
    sender: "Alice",
    message: "Hey, how are you doing?",
    time: "2025-11-11T09:15:32Z",
  },
  {
    id: 2,
    sender: "Bob",
    message: "I'm good! Just finished some work.",
    time: "2025-11-11T09:16:45Z",
  },
  {
    id: 3,
    sender: "Alice",
    message: "Nice! Want to grab coffee later?",
    time: "2025-11-11T09:17:10Z",
  },
  {
    id: 4,
    sender: "Bob",
    message: "Sure, let's meet around 5 PM.",
    time: "2025-11-11T09:18:02Z",
  },
  {
    id: 5,
    sender: "Alice",
    message: "Perfect! See you then ☕",
    time: "2025-11-11T09:18:45Z",
  },
];


export default function Page() {
  return (
    <div className="container mx-auto p-4 flex justify-center items-center">
      <MessageBar />
    </div>
  )
}