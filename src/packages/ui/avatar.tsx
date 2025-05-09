"use client";

import { useMemo, useState } from "react";
import { motion } from "motion/react";
import { cn } from "../utils/functions/cn";
import { Popover } from "./popover";
import { Tooltip } from "./tooltip";
import { Currency } from "./icons/currency";
import { useSession } from "next-auth/react";
import { NotVerified } from "./layout/sidebar/icon/not-verified";
import { UserIcon } from "./icons/user";
import { SignOutButton } from "./auth/sign-out";
import { Logout } from "./icons/logout";

interface AvatarProps {
  bgColor?: string;
  className?: string;
}

type UserSessionProps = {
  name: string | null | undefined;
  email: string | null | undefined;
  image: string | null | undefined;
  isVerified: boolean;
}

export function Avatar({bgColor, className}: AvatarProps) {
  const [openPopover, setOpenPopover] = useState<boolean>(false);
  const {data: session} = useSession();

  const user: UserSessionProps = {
    name: session?.user?.name || null,
    email: session?.user?.email || null,
    image: session?.user?.image || null,
    isVerified: session?.user?.emailVerified || false
  };

  const getUserName = useMemo(() => {
    if (session?.user?.name) return session.user.name;

    const email = session?.user?.email;
    const name = email?.split("@")[0]
    return name || "User";
  },[session])

const name = getUserName;

    return (
      <Popover
        openPopover={openPopover}
        setOpenPopover={setOpenPopover}
        content={<AvatarPopOver user={user} />}
        side="top"
      >
        <img
          src={`https://ui-avatars.com/api/?name=${name}?background=${bgColor}`}
          alt="avatar"
          className={cn("cursor-pointer w-10 h-10 rounded-full border border-neutral-300", className)}
        />
      </Popover>
    );
}

function AvatarPopOver({user}: {user: UserSessionProps}) {
  return (
    <motion.div
    initial={{ opacity: 0, y: -10 }}
    animate={{ opacity: 1, y: 0 }}
     className="relative z-40 bg-transparent backdrop-blur-md border border-neutral-300 rounded-md p-4 flex flex-col gap-2">
      <div className="p-2 flex items-center space-x-2">
        <Tooltip content="You are currently on free plan.">
          <div className="flex items-center space-x-2 text-xs border-r border-neutral-300 pr-2">
            <p>Free Plan</p>
            <Currency className="w-6 h-6 p-1 rounded-full border border-neutral-400" />
          </div>
        </Tooltip>
        <div className="px-2">
          <div className="flex items-center">
            <UserIcon className="mx-1"/>
            <h2 className="font-semibold ">{user.name}</h2>
            {!user.isVerified ? (
              <Tooltip content={`${user.email} is not verified! Please verify your email.`}>
                <div>
                  <NotVerified color="red" />
                </div>
              </Tooltip>
            ) : null}
          </div>
          <p className="text-sm text-neutral-600">{user.email}</p>
        </div>
      </div>
        <SignOutButton icon={<Logout />} text="Logout" />
    </motion.div>
  );
}