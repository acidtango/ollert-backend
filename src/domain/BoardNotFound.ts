import {DomainError} from "./DomainError.ts";
import {ErrorCode} from "./ErrorCode.ts";
import {BoardId} from "./BoardId.ts";

export class BoardNotFound extends DomainError {
  constructor(boardId: BoardId) {
    super(`Board ${boardId} not found`, ErrorCode.BOARD_NOT_FOUND);
  }
}