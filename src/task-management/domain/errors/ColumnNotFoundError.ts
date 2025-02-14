import type { BoardId } from '../BoardId.ts'
import type { ColumnId } from '../ColumnId.ts'
import { DomainError } from '../DomainError.ts'
import { ErrorCode } from '../ErrorCode.ts'

export class ColumnNotFoundError extends DomainError {
  constructor(columnId: ColumnId, boardId: BoardId) {
super(`Column with Id: ${columnId} not found in Board: ${boardId}`, ErrorCode.COLUMN_NOT_FOUND)
  }
}
