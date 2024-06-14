import { SecretKeyStatus } from "@/lib/types";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { secretKeyCookieName } from "@/lib/constants";

export const validSecretKey = async (): Promise<SecretKeyStatus | null> => {
  const secretKey = cookies().get(secretKeyCookieName)?.value;

  if (!secretKey) {
    return null;
  }

  const supabase = createClient(cookies());

  const { data } = await supabase
    .from("keys")
    .select("value")
    .eq("value", secretKey);

  if (data?.length === 0) {
    return SecretKeyStatus.invalid;
  }

  return SecretKeyStatus.valid;
};
