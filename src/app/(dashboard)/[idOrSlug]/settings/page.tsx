'use client'

import { Button } from "@/packages/ui/button";
import { ImageUploadCard } from "@/packages/ui/image-upload";
import { SettingCard } from "@/packages/ui/layout/setting-card";
import ImageUpload from "@/packages/utils/functions/imagekit";
import { useSession } from "next-auth/react";

export default function Settings() {
  const session = useSession();
  const email = session.data?.user.email || "not-found";
    return (
      <main>
        <div className="py-5 px-2 border-b border-neutral-300 w-full space-y-3">
          <h2 className="font-semibold texl-lg md:text-xl text-center md:text-start">
            General
          </h2>
        </div>
        <SettingCard
          action={<Button text="Save" />}
          actionDescription="Update your official account name"
          text="acrobat"
          title="Your Name"
          description="this name will appear on onout"
        />
        <SettingCard
          action={<Button text="Change Email" />}
          actionDescription="Update your email"
          title={email!}
          description="We've sent you an email with further instructions"
        />
        <SettingCard
          action={<ImageUpload />}
          actionDescription="Upload your image from local machine"
          title="Upload image"
          description="once updated image can't be changed for 24 hours"
        />
      </main>
    );
}