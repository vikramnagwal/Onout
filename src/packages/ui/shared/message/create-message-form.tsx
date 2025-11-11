"use client";

import { useForm } from "react-hook-form"
import { EncryptedMessageSchema, MessageSchema } from "@/app/lib/zod/schema/messages-schema"
import { z } from "zod"
import { encryptMessages } from "@/packages/utils/functions/messages"
import { toast } from "sonner"
import { useParams, usePathname } from "next/navigation";
import { useAction } from "next-safe-action/hooks";
import { checkWorkspaceExists } from "@/app/lib/actions/check-workspace-exists-action";
import { useEffect, useState } from "react";
import { Button } from "@packages/ui/button";
import { Send } from "@packages/ui/icons/send";
import { AutoExpandingTextarea } from "@packages/ui/resizable-textarea";



type MessageProps = z.infer<typeof MessageSchema>;

export function CreateMessageForm() {
    const [validWorkspaceName, setValidWorkspaceName] = useState<boolean>(false);
    const [clicked, setClicked] = useState<boolean>(false);

    const {register, handleSubmit, resetField, formState: {isDirty, errors}} = useForm<MessageProps>();

    const param = useParams();
    const workspaceName = param.slug?.toString();
    const pathName = usePathname();

    const { executeAsync } = useAction(checkWorkspaceExists, {
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

    function handleTrigger(delay: number) {
      return new Promise((res, rej) => setTimeout(() => res, delay))
    }

    useEffect(() => {
        validateWorkspaceName()
    }, [param, pathName])

    return (
      <div className="pt-8">
        <form
          className="flex flex-col gap-2 z-20 mt-8"
          onSubmit={handleSubmit(async (data) => {
            setClicked(true)
            if (!validWorkspaceName) return;
            handleTrigger(5000); // delayed mechanism
            const encryptedMessage = await encryptMessages(data.message);
            const isEncrypted = await EncryptedMessageSchema.safeParseAsync({
              encryptedMessage: encryptedMessage,
            });
            if (!isEncrypted.success) {
              toast.error("Your message could not be encrypted! you can try again.");
              return;
            }
            // api call
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
              resetField("message")
              setClicked(false)
              return toast.success("Message sent successfully");
            }
          })}
        >
          <AutoExpandingTextarea 
          {...register("message")}
            minHeight={120}
            maxHeight={400}
            placeholder="Type your message here..."
          />

          {errors.message && (
            <p className="text-red-500/80 text-sm">{errors.message.message}</p>
          )}
          <Button text={ clicked ? "Sending..." : "Send"} type="submit" icon={<Send />} />
        </form>
      </div>
    );
}