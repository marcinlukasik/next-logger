import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Ban } from "lucide-react";

export const ClearLogButton = ({ onClear }: { onClear: () => void }) => {
  return (
    <TooltipProvider>
      <Tooltip delayDuration={0}>
        <TooltipTrigger>
          <Button variant="outline" size="icon" onClick={onClear}>
            <Ban className="rotate-90" />
          </Button>
        </TooltipTrigger>
        <TooltipContent className="bg-black text-white">
          <p>Clear network log</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
