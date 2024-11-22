import type { CreateCard } from "../../types/types.ts";
import { CreateCardSchema } from "../../types/types.zod.ts";
import type { Handler } from "./Handler.ts";

export class CreateCardHandler implements Handler {
  schema() {
    return CreateCardSchema;
  }

  async handle(command: CreateCard) {
    console.log("handle create card", command);
  }
}
