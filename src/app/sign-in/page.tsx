import { Logo } from "@/components/atoms/Logo";
import { SignInForm } from "@/components/molecules/SignInForm";

export default async function SignInPage() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-center pb-4">
          <Logo />
        </div>
        <SignInForm />
      </div>
    </div>
  );
}
