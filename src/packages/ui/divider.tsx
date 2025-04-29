interface DividerProps {
  text: string;
  className?: string;
}

export function Divider({ text, className }: DividerProps) {
  return (
    <div className={`relative flex items-center py-5 pointer-events-none ${className}`}>
      <div className="flex-grow border-t border-gray-300"></div>
      <span className="mx-4 flex-shrink text-sm text-gray-500">{text}</span>
      <div className="flex-grow border-t border-gray-300"></div>
    </div>
  );
}
