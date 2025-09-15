'use client'

import { Button } from "@/packages/ui/button";
import { ImageUploadCard } from "@/packages/ui/image-upload";
import { SettingCard } from "@/packages/ui/layout/setting-card";
import { Modal } from "@/packages/ui/model";
import ImageUpload from "@/packages/utils/functions/imagekit";
import { useSession } from "next-auth/react";
import { use, useContext, useState } from "react";
import { createContext } from "react";


const SettingContext = createContext({
  input: "",
  setInput: (value: string) => {},
  showModal: false,
  setShowModal: (value: boolean) => {}
});

export const useSettingContext = () => {
  const context = useContext(SettingContext);
  if (!context) {
    throw new Error("useSettingContext must be used within SettingProvider");
  }
  return context;
};

export const SettingProvider = ({ children }: { children: React.ReactNode }) => {
  const [input, setInput] = useState("");
  const [showModal, setShowModal] = useState(false);

  return (
    <SettingContext.Provider value={{ input, setInput, showModal, setShowModal }} >
      {children}
    </SettingContext.Provider>
  );
}


export default function Settings() {
  const session = useSession();
  const { email, name, image } = session.data?.user || {};

  const { showModal, setShowModal } = useSettingContext();

  if ( showModal ) return <ConfirmDeletionInput />;

    return (
      <>
        <SettingCard
          action={<Button text="Save" />}
          actionDescription="Update your official account name"
          text={name!}
          title="Your Name"
          description="this name will appear on onout"
        />
        <SettingCard
          action={<Button text="Change Email" />}
          actionDescription="Update your email"
          text={email!}
          title="Change Email"
          description="We've sent you an email with further instructions"
        />
        <SettingCard
          action={<ImageUpload />}
          actionDescription="Upload your image from local machine"
          img={image!}
          title="Update Avatar"
          description="once updated image can't be changed for 24 hours"
        />
        <SettingCard
          action={<Button text="Change Workspace Name" />}
          actionDescription="Update your workspace name"
          title="Change Workspace Name"
          description="This will change the name of your workspace."
        />
        <SettingCard
          action={<Button text="Change Password" />}
          actionDescription="Update your password"
          title="Change Password"
          description="Make sure it's at least 8 characters long."
        />
        <SettingCard
          action={<Button onClick={() => setShowModal(!showModal)} variant={"danger"} text="Delete Account" />}
          variant={"danger"}
          actionDescription="Permanently delete your account"
          title="Delete Account"
          description="This action cannot be undone."
        />
      </>
    );
}

function ConfirmDeletionInput() {
  const [confirm, setConfirm] = useState(true);
  return (
    <Modal showModal={confirm} setShowModel={setConfirm}>
      <div className="p-3 rounded-md border border-neutral-300 flex flex-col space-y-3 ">
        <h2 className="font-semibold">Confirm Deletion</h2>
        <p className="text-sm opacity-80">
          Are you sure you want to delete your account? Type <span className="font-bold"> 'DELETE' </span> to confirm.
        </p>
        <input
          type="text"

          // onChange={(e) => setConfirm(e.target.value === "DELETE")}
          className="p-2 border border-neutral-300 rounded-md text-red-500"
        />
        <div className="flex space-x-2 justify-end">
          <Button text="Cancel" onClick={() => setConfirm(false)} variant={"outline"} />
            <Button text="Delete" onClick={() => {}} variant={"danger"} /> 
        </div>
      </div>
    </Modal>
  );
}