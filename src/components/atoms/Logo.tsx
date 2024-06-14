import { Cylinder } from "lucide-react";

export const Logo = () => {
  return (
    <div className="flex items-center">
      <Cylinder className="text-red-600 w-8 h-8" />
      <div className="mr-auto ml-4 font-semibold text-lg">Next Logger</div>
    </div>
  );
};
