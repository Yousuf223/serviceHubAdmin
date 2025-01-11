import React from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

const Popup = ({ children, open, setOpen, customWidth, cross = false }) => (
  <Dialog.Root
    open={open}
    onOpenChange={(open) => setOpen(open)}
    className="z-50"
  >
    <Dialog.Portal>
      <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed  inset-0" />
      <Dialog.Content
        className={`z-[50] data-[state=open]:animate-contentShow border border-[#707070]  fixed top-[50%] left-[50%] max-h-[79vh]  ${
          customWidth ? customWidth : "w-[250px] sm:w-[360px] md:w-[600px]"
        }   translate-x-[-50%] translate-y-[-50%] rounded-lg bg-white  shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none `}
      >
        {children}
        {cross && (
          <Dialog.Close asChild className="border-0 peer">
            <button
              className="text-red-primary  border-0 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center group"
              aria-label="Close"
            >
              <Cross2Icon className="group-hover:rotate-180 transition-all ease-in-out duration-300" />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Popup;
