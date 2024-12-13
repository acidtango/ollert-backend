import type {BoardId} from "./BoardId.js";

export class Board {
  private readonly id: BoardId;

  constructor(id: BoardId) {
    this.id = id;
  }

  hasColumn(columnName: string) {
    return true
  }

  getId() {
    return this.id;
  }

  addColumn(columnId: string, name: string) {

  }

  isEmpty() {
    return true;
  }
}