"use client";

import { useForm } from "react-hook-form"
import { Input } from "../input"
import { Button } from "../button"
import { EncryptedMessageSchema, MessageSchema } from "@/app/lib/zod/schema/messages-schema"
import { z } from "zod"
import { encryptMessages } from "@/packages/utils/functions/messages"
import { toast } from "sonner"
import { useParams, usePathname } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { checkWorkspaceExists } from "@/app/lib/actions/check-workspace-exists-action";
import { useEffect, useState } from "react";
import { Send } from "../icons/send";


type MessageProps = z.infer<typeof MessageSchema>;

export function CreateMessageForm() {
    const [validWorkspaceName, setValidWorkspaceName] = useState<boolean>(false)
    const {register, handleSubmit, formState: {isDirty, errors}} = useForm<MessageProps>();

    const param = useParams();
    const workspaceName = param.slug?.toString();
    const pathName = usePathname(); 
    
    const { executeAsync, status: isVerifying } = useAction(checkWorkspaceExists, {
        onSuccess: ({data}) => {
            if (data) {
                setValidWorkspaceName(true)
            } else {
                toast.error("Please re-check your link")
                setValidWorkspaceName(false)
            }
        },
        onError: () => {
            console.error("Error checking workspace existence")
            toast.error("Cannot check workspace existence at moment")
            setValidWorkspaceName(false)
        }
    })

    async function validateWorkspaceName() {
        if (param.slug) {
            await executeAsync({ name: param.slug.toString() })
        } else {
            toast.error("Workspace name is missing")
            setValidWorkspaceName(false)
        }
    }

    useEffect(() => {
        validateWorkspaceName()
    }, [param, pathName])

    return (
      <div>
        <form
          className="flex flex-col gap-2 z-20"
          onSubmit={handleSubmit(async (data) => {
            if (!validWorkspaceName) return;
            const encryptedMessage = await encryptMessages(data.message);
            const isEncrypted = await EncryptedMessageSchema.safeParseAsync({
              encryptedMessage: encryptedMessage,
            });
            if (!isEncrypted.success) {
              toast.error("Failed to encrypt message");
              return;
            }
            const createdMessage = await fetch(
              `/api/${workspaceName}/message`,
              {
                method: "POST",
                body: JSON.stringify(isEncrypted),
                headers: {
                  "Content-Type": "application/json",
                },
              }
            );
            if (createdMessage.ok) {
              toast.success("Message sent successfully");
            }
          })}
        >
          <textarea
            {...register("message")}
            placeholder="share your message"
            className="bg-white rounded-md p-2 outline-none shadow-sm"
          >
          </textarea>

          {errors.message && (
            <p className="text-red-500/80 text-sm">{errors.message.message}</p>
          )}
          <Button text="Send" type="submit" icon={<Send />} />
        </form>
      </div>
    );
}