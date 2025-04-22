"use client";

import { useSession } from "next-auth/react";
import { sha256 } from "js-sha256";
import { useEffect, useState } from "react";

interface AvatarProps {
  size?: number;
}

export function Avatar({size}: AvatarProps) {
  const {data: session} = useSession();
  const [avatar, setAvatar] = useState<string>("https://www.gravatar.com/avatar/");

  const user = {
    userEmail: String(session?.user?.email),
    userAvatar: session?.user?.user?.image ?? null,
  }

  const getUserAvatar = (email: string) => {
    const hash = sha256(email.trim().toLowerCase());
    return `https://www.gravatar.com/avatar/${hash}?d=identicon&f=y`;
  }

  useEffect(() => {
    if (user.userAvatar) {
      setAvatar(user.userAvatar);
    } else {
      const avatarUrl = getUserAvatar(user.userEmail);
      setAvatar(avatarUrl);
    }
  },[user.userAvatar, user.userEmail]);


  return (
    <img src={avatar} alt="profile" className="w-10 h-10 border border-gray-100 rounded-full" />
  )
}