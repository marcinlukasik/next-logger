import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";
import { useFormStatus } from "react-dom";

export const SignInButton = () => {
  const { pending } = useFormStatus();

  return (
    <Button type="submit" disabled={pending}>
      Sign in {pending && <Loader2 size="20" className="ml-2 animate-spin" />}
    </Button>
  );
};
