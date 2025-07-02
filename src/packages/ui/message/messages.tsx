import { generateRandomColor } from "@/packages/utils/functions/colors";

export function Messages() {
    const color = generateRandomColor();
    console.log("color", color);
    return (
      <div
        className={`flex flex-col items-center justify-center p-3 rounded-md bg-[${color}]`}
      >
        <p>here's your message</p>
      </div>
    );
}