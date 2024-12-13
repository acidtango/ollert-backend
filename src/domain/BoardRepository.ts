import {BoardId} from "./BoardId.ts";
import {Board} from "./Board.ts";
import {BoardNotFound} from "./BoardNotFound.ts";

export abstract class BoardRepository {
  abstract findBy(id: BoardId): Promise<Board | undefined>;
  abstract save(board: Board): Promise<void>;

  async findOrThrowBy(id: BoardId): Promise<Board> {
    const board = await this.findBy(id);
    if (!board) {
      throw new BoardNotFound(id);
    }
    return board;
  }
}
