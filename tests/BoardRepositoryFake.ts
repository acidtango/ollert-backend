import {Board} from "../src/domain/Board.ts";
import type {BoardId} from "../src/domain/BoardId.js";

export class BoardRepositoryFake {

  private boards: Map<BoardId, Board> = new Map()

  private latestSavedBoard?: Board;

  getLatestSaved(): Board {
    if (!this.latestSavedBoard) {
      throw new Error("No board saved");
    }

    return this.latestSavedBoard;
  }

  async findBy(id: BoardId): Promise<Board | undefined> {
    return new Board(id);
  }

  async save(board: Board) {
    this.boards.set(board.getId(), board);
    this.latestSavedBoard = board;
  }
}
