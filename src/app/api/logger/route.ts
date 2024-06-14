import { logSchema } from "@/lib/validations";
import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const secret = request.headers.get("Secret");
  const { data } = await supabase
    .from("keys")
    .select("value")
    .eq("value", secret);

  if (!data || data.length === 0) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();
  const validatedBody = logSchema.safeParse(body);

  if (!validatedBody.success) {
    return Response.json({ error: validatedBody.error }, { status: 400 });
  }

  supabase.channel("next-logger").send({
    type: "broadcast",
    event: "log",
    payload: { log: body },
  });

  return Response.json({ success: "ok" });
}
