import React, { Dispatch } from "react";
import { useMediaQuery } from "../hooks/use-media";
import { useRouter } from "next/navigation";
import * as Dialog from "@radix-ui/react-dialog";
import { Drawer } from "vaul";
import { cn } from "../utils/functions/cn";

export function Modal({ children, showModal, setShowModel, className, onClose, preventDefaultClose, DesktopOnly, drawerRootProps }: {
    children: React.ReactNode;
    showModal?: boolean;
    setShowModel?: Dispatch<React.SetStateAction<boolean>>;
    className?: string;
    onClose?: () => void;
    preventDefaultClose?: boolean;
    DesktopOnly?: boolean;
    drawerRootProps?: React.ComponentProps<typeof Drawer.Root>;
}) {
    const router = useRouter();
    const { isMobile } = useMediaQuery();

    const closeModal = () => {
        if (preventDefaultClose) return;
// if provided, close the modal and call the onClose function
        onClose && onClose();
        if (setShowModel) {
            setShowModel(false);
        } else {
            router.back();
        }
    }

    if (!DesktopOnly && isMobile) {
        return (
          <Drawer.Root
            open={setShowModel ? showModal : true}
            onOpenChange={closeModal}
            {...drawerRootProps}
          >
            <Drawer.Portal>
              <Drawer.Overlay className="fixed inset-0 z-50 bg-neutral-100 bg-opacity-10 backdrop-blur" />
              <Drawer.Content
                onPointerDownOutside={(e) => {
                  // Prevent dismissal when clicking inside a toast
                  if (
                    e.target instanceof Element &&
                    e.target.closest("[data-sonner-toast]")
                  ) {
                    e.preventDefault();
                  }
                }}
                className={cn(
                  "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
                  "rounded-t-[10px] border-t border-neutral-200 bg-white",
                  className
                )}
              >
                <DrawerIsland />
                {children}
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        );
    }
    return (
      <Dialog.Root
        open={setShowModel ? showModal : true}
        onOpenChange={closeModal}
      >
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-neutral-100 bg-opacity-10 backdrop-blur" />
          <Dialog.Content
            onOpenAutoFocus={(e) => e.preventDefault()}
            onCloseAutoFocus={(e) => e.preventDefault()}
            onPointerDownOutside={(e) => {
              // Prevent dismissal when clicking inside a toast
              if (
                e.target instanceof Element &&
                e.target.closest("[data-sonner-toast]")
              ) {
                e.preventDefault();
              }
            }}
            className={cn(
              "fixed inset-0 z-40 m-auto h-fit w-full max-w-md",
              "border border-neutral-200 bg-white p-0 shadow-xl sm:rounded-2xl",
              "scrollbar-hide animate-scale-in overflow-y-auto",
              className
            )}
          >
            {children}
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
}

function DrawerIsland() {
  return (
    <div className="sticky top-0 z-20 flex items-center justify-center rounded-t-[10px] bg-inherit">
      <div className="my-3 h-1 w-12 rounded-full bg-neutral-300" />
    </div>
  );
}