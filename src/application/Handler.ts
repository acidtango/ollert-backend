import type { ZodSchema } from "zod";

export interface Handler {
  handle(command: unknown): Promise<void>;
  schema(): ZodSchema;
}
