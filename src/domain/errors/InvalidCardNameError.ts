import { DomainError } from '../DomainError.ts'
import { ErrorCode } from '../ErrorCode.ts'

export class InvalidCardNameError extends DomainError {
  constructor(name: string) {
    super(`Invalid card name: "${name}"`, ErrorCode.INVALID_CARD_NAME)
  }
}
