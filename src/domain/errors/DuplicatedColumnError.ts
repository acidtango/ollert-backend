import { DomainError } from '../DomainError.ts'
import { ErrorCode } from '../ErrorCode.ts'

export class DuplicatedColumnError extends DomainError {
  constructor(columnId: string) {
    super(`Invalid with id: ${columnId} already exists`, ErrorCode.DUPLICATED_COLUMN_ERROR)
  }
}
