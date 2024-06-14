import { logSchema } from "@/lib/validations";
import { z } from "zod";

export type LogType = z.infer<typeof logSchema>;

export enum SecretKeyStatus {
  valid = "valid",
  invalid = "invalid",
}
export type SignInFormState = {
  message: string;
};

export type AddSecretKeyFormState = {
  updated: string;
};
