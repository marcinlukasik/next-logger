import { AddOrEditSecretKey } from "@/components/molecules/AddOrEditSecretKey";
import { Log } from "@/components/molecules/Log";
import { SecretKeyStatus } from "@/lib/types";
import { validSecretKey } from "@/lib/secretKey";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { secretKeyCookieName } from "@/lib/constants";

export default async function LogsPage() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.auth.getUser();

  if (!data.user) {
    redirect("/sign-in");
  }

  const secretKeyStatus = await validSecretKey();

  return (
    <>
      <AddOrEditSecretKey
        secretKey={cookies().get(secretKeyCookieName)?.value ?? ""}
        secretKeyStatus={secretKeyStatus}
      />
      {secretKeyStatus === SecretKeyStatus.valid && <Log />}
    </>
  );
}
