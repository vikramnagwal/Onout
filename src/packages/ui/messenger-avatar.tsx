import { cn } from '@/lib/utils';
import { UserRoundCheck } from 'lucide-react';
import Image from 'next/image';
import React from 'react'

type Avatar = {
    image?: string;
    workspaceName: string;
    description?: string;
    openToAcceptMessages?: boolean; // make it compulsory
    status?: string; 
}

export default function MessangerAvatar({
    image,
    workspaceName,
    description, 
    openToAcceptMessages = true, // TODO
    status // TODO
}: Avatar) {
  return (
    <div className="bg-black text-white rounded-full py-2 pr-2  max-w-[280px] flex items-center justify-between">
      {image ? (
        <Image width={200} height={200} src={image} alt="Picture of Reciever" />
      ) : (
        <div className="w-12 h-12 rounded-full p-1 mx-2 outline-2 text-4xl text-center uppercase bg-neutral-300 text-black">
          {workspaceName[0]}
        </div>
      )}
      <div className='flex items-center gap-3'>
        <UserRoundCheck color="blue" />
        <h3 className="text-lg capitalize text-start">{workspaceName}</h3>
      </div>
      {
        <div
          className={cn(
            "w-2 h-2 rounded-full outline-2 animate-ping mr-3",
            !openToAcceptMessages
              ? "bg-green-500 outline-green-600"
              : "bg-red-500 outline-red-600"
          )}
        />
      }
    </div>
  );
}
