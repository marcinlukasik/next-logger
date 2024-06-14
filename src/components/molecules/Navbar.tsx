import { Logo } from "@/components/atoms/Logo";
import { SignOutButton } from "@/components/atoms/SignOutButton";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center px-8 py-4 border-b">
      <Logo />
      <form>
        <SignOutButton />
      </form>
    </div>
  );
};
