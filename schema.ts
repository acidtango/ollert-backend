import * as z from "zod";

export const StringToJSONSchema = z
  .string()
  .transform((str, ctx): z.infer<ReturnType<(typeof JSON)["parse"]>> => {
    try {
      return JSON.parse(str);
    } catch (e) {
      ctx.addIssue({ code: "custom", message: "Invalid JSON" });
      return z.NEVER;
    }
  });
