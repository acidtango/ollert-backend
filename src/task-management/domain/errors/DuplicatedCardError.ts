import type { CardId } from '../CardId.ts'
import { DomainError } from '../DomainError.ts'
import { ErrorCode } from '../ErrorCode.ts'

export class DuplicatedCardError extends DomainError {
  constructor(cardId: CardId) {
    super(`Card with id ${cardId.getValue()} is already in the column`, ErrorCode.DUPLICATED_CARD_ERROR)
  }
}
