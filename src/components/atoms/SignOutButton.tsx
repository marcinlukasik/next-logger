"use client";

import { signOutAction } from "@/actions/auth";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SignOutButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button
      type="submit"
      formAction={signOutAction}
      variant="outline"
      disabled={pending}
    >
      Sign out {pending && <Loader2 size="20" className="ml-2 animate-spin" />}
    </Button>
  );
};
