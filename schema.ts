import * as z from "zod";

export const CreateColumnSchema = z.object({
  type: z.literal("CREATE_COLUMN"),
  boardId: z.string().uuid(),
  columnId: z.string().uuid(),
  name: z.string(),
});
export type CreateColumn = z.infer<typeof CreateColumnSchema>;

export const CreateCardSchema = z.object({
  type: z.literal("CREATE_CARD"),
  boardId: z.string().uuid(),
  columnId: z.string().uuid(),
  name: z.string(),
});
export type CreateCard = z.infer<typeof CreateCardSchema>;

export const CommandSchema = z.discriminatedUnion("type", [
  CreateColumnSchema,
  CreateCardSchema,
]);
export type Command = z.infer<typeof CommandSchema>;

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
