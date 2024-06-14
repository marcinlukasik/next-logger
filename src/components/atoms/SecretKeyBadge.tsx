import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { SecretKeyStatus } from "@/lib/types";
import clsx from "clsx";
import { ShieldAlert, ShieldCheck } from "lucide-react";

export const SecretKeyBadge = ({
  secretKeyStatus,
}: {
  secretKeyStatus: SecretKeyStatus | null;
}) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <div
            className={clsx(
              "w-8 h-8 rounded-full flex justify-center items-center relative -top-2 shadow-sm",
              secretKeyStatus === SecretKeyStatus.valid && "bg-green-300",
              secretKeyStatus === SecretKeyStatus.invalid && "bg-red-300"
            )}
          >
            {secretKeyStatus === SecretKeyStatus.valid && (
              <ShieldCheck className="text-green-700" />
            )}
            {secretKeyStatus === SecretKeyStatus.invalid && (
              <ShieldAlert className="text-red-700" />
            )}
          </div>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          <p>
            Secret Key is {secretKeyStatus === SecretKeyStatus.valid && "valid"}
            {secretKeyStatus === SecretKeyStatus.invalid && "invalid"}
          </p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
