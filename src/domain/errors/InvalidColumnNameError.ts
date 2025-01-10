import { DomainError } from '../DomainError.ts'
import { ErrorCode } from '../ErrorCode.ts'

export class InvalidColumnNameError extends DomainError {
  constructor(name: string) {
    super(`Invalid column name: ${name}`, ErrorCode.INVALID_COLUMN_NAME)
  }
}
