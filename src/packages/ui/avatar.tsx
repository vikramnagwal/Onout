import Image from "next/image";

interface AvatarProps {
    image?: string;
}

export function Avatar({image}: AvatarProps) {
    return (
        <div>
            <Image src={image ?? ""} alt="avatar" className="w-12 h-12 rounded-full outline-none ring-1 ring-white"/>
        </div>
    )
}