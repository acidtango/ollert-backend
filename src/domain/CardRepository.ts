import { BoardId } from './BoardId.ts'
import { Board } from './Board.ts'
import { BoardNotFound } from './BoardNotFound.ts'
import type { Card } from './Card.ts'

export abstract class CardRepository {
  abstract save(card: Card): Promise<void>
}
