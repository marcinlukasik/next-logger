import { z } from "zod";

const record = z.optional(z.record(z.string(), z.unknown())).nullable();

export const logSchema = z
  .object({
    id: z.optional(z.string()),
    statusCode: z.string(),
    method: z.string(),
    url: z.string(),
    payload: record,
    response: record,
    error: record,
  })
  .refine(
    (data) => {
      return data.response
        ? data.response && !data.error
        : data.error && !data.response;
    },
    { message: "Invalid data. Response and error cannot occur together." }
  );
