import type {AddColumn} from "../../types/types.ts";
import {AddColumnSchema} from "../../types/types.zod.ts";
import type {EventBus} from "../domain/EventBus.ts";
import type {Handler} from "./Handler.ts";
import {BoardRepositoryFake} from "../../tests/BoardRepositoryFake.ts";
import type {Board} from "../domain/Board.ts";
import {BoardId} from "../domain/BoardId.ts";
import {BoardNotFound} from "../domain/BoardNotFound.ts";

export class AddColumnHandler implements Handler {
  private eventBus: EventBus;
  private boardRepository: BoardRepositoryFake;

  constructor(eventBus: EventBus, boardRepository: BoardRepositoryFake) {
    this.eventBus = eventBus;
    this.boardRepository = boardRepository;
  }

  schema() {
    return AddColumnSchema;
  }

  async handle(command: AddColumn) {
    const boardId = new BoardId(command.boardId);
    const board = await this.boardRepository.findOrThrowBy(boardId);

    board.addColumn(command.boardId, command.name)

    await this.boardRepository.save(board)
    // this.eventBus.emit({ type: "COLUMN_CREATED", payload: command });
  }
}
