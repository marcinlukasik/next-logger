"use server";

import { secretKeyCookieName } from "@/lib/constants";
import { AddSecretKeyFormState } from "@/lib/types";
import { cookies } from "next/headers";

export async function addSecretKeyAction(
  prevFormState: AddSecretKeyFormState,
  formData: FormData
) {
  cookies().set(secretKeyCookieName, formData.get("secretKey") as string);
  return { updated: crypto.randomUUID() };
}
