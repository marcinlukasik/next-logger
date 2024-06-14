"use server";

import { SignInFormState } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signInAction(
  prevState: SignInFormState,
  formData: FormData
) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const captchaValue = formData.get("captchaValue") as string;
  const otpValue = formData.get("otpValue") as string;

  if (captchaValue !== otpValue) {
    return { message: "Invalid captcha" };
  }

  const { data, error } = await supabase.auth.signInAnonymously({
    options: {
      captchaToken: otpValue,
    },
  });

  if (error) {
    return { message: error.message };
  }

  if (!data.user) {
    return { message: "User not found" };
  }

  redirect("/");
}

export async function signOutAction() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  return await supabase.auth.signOut();
}
