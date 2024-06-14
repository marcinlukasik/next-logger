"use client";

import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { addSecretKeyAction } from "@/actions/keys";
import { SecretKeyStatus } from "@/lib/types";
import { SecretKeyBadge } from "@/components/atoms/SecretKeyBadge";
import { SaveSecretKeyButton } from "@/components/atoms/SaveSecretKeyButton";
import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";

export const AddOrEditSecretKey = ({
  secretKey,
  secretKeyStatus,
}: {
  secretKey: string;
  secretKeyStatus: SecretKeyStatus | null;
}) => {
  const [state, formAction] = useActionState(addSecretKeyAction, {
    updated: "",
  });
  const [openDrawer, setOpenDrawer] = useState(false);

  useEffect(() => {
    if (state.updated) {
      setOpenDrawer(false);
      toast("Secret Key has been updated.");
    }
  }, [state.updated]);

  return (
    <Drawer
      direction="right"
      open={openDrawer}
      onOpenChange={(value) => setOpenDrawer(value)}
    >
      <div className="flex gap-x-2 items-start">
        <DrawerTrigger asChild>
          <Button variant={"outline"}>
            {secretKey ? "Edit" : "Add"} Secret Key
          </Button>
        </DrawerTrigger>
        <SecretKeyBadge secretKeyStatus={secretKeyStatus} />
      </div>
      <DrawerContent className="h-screen top-0 right-0 left-auto mt-0 w-[500px] rounded-none">
        <form action={formAction}>
          <DrawerHeader>
            <DrawerTitle>Add Secret Key</DrawerTitle>
            <DrawerDescription className="pt-8">
              <Textarea
                placeholder="Type your secret key..."
                defaultValue={secretKey as string}
                name="secretKey"
                required
              />
            </DrawerDescription>
          </DrawerHeader>
          <DrawerFooter>
            <div className="flex gap-x-2">
              <SaveSecretKeyButton />
              <DrawerClose asChild>
                <Button variant="outline">Cancel</Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </form>
      </DrawerContent>
    </Drawer>
  );
};
