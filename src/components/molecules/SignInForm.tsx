"use client";

import { signInAction } from "@/actions/auth";
import { SignInButton } from "@/components/atoms/SignInButton";
import { SimpleCaptcha } from "@/components/atoms/SimpleCaptcha";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { TriangleAlert } from "lucide-react";
import { useActionState, useState } from "react";

export const SignInForm = () => {
  const [state, formAction] = useActionState(signInAction, { message: "" });
  const [captchaValue, setCaptchaValue] = useState("");
  const [otpValue, setOtpValue] = useState("");

  return (
    <form action={formAction} className="text-center">
      <SimpleCaptcha onTextChange={(value) => setCaptchaValue(value)} />
      <div className="mb-8 mt-6 flex justify-center">
        <input type="hidden" name="captchaValue" value={captchaValue} />
        <input type="hidden" name="otpValue" value={otpValue} />
        <InputOTP
          value={otpValue}
          onChange={(value) => setOtpValue(value)}
          maxLength={6}
        >
          <InputOTPGroup>
            <InputOTPSlot index={0} />
            <InputOTPSlot index={1} />
            <InputOTPSlot index={2} />
            <InputOTPSlot index={3} />
            <InputOTPSlot index={4} />
            <InputOTPSlot index={5} />
          </InputOTPGroup>
        </InputOTP>
      </div>
      {state.message && (
        <div className="flex items-center text-red-400 mb-6 justify-center">
          <TriangleAlert /> <p className="font-medium ml-2">{state.message}</p>
        </div>
      )}
      <SignInButton />
    </form>
  );
};
