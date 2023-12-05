import Image from "next/image";
import { ComponentProps } from "react";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog";
import { Button } from "@/components/button";

export default function ImageWithLightbox(props: ComponentProps<typeof Image>) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full cursor-ne-resize">
          <Image {...props} className="bg-neutral-100" />
        </Button>
      </DialogTrigger>

      <DialogContent>
        <DialogClose asChild>
          <div className="p-4 flex justify-center items-center cursor-sw-resize w-full h-full">
            <DialogHeader className="sr-only">
              <DialogTitle>Image Lightbox</DialogTitle>
            </DialogHeader>

            <Image {...props} className="w-full h-full object-contain" />
          </div>
        </DialogClose>
      </DialogContent>
    </Dialog>
  );
}
