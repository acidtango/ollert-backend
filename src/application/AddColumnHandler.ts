import type { AddColumn } from "../../types/types.ts";
import { AddColumnSchema } from "../../types/types.zod.ts";
import type { EventBus } from "../domain/EventBus.ts";
import type { Handler } from "./Handler.ts";

export class AddColumnHandler implements Handler {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  schema() {
    return AddColumnSchema;
  }

  async handle(command: AddColumn) {
    console.log("handle add column", command);
    console.log(command.boardId);
    this.eventBus.emit({ type: "COLUMN_CREATED", payload: command });
  }
}
