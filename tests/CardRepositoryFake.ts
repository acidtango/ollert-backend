import { Board } from '../src/domain/Board.ts'
import { BoardId } from '../src/domain/BoardId.ts'
import { BoardRepository } from '../src/domain/BoardRepository.ts'
import { Card } from '../src/domain/Card.ts'
import { CardRepository } from '../src/domain/CardRepository.ts'
import { WALLBOX_BOARD_ID, wallboxBoardId } from './BoardIdMother.ts'
import { REFACTOR_REFINERY } from './CardIdMother.ts'

export class CardRepositoryFake extends CardRepository {
  private cards: Map<string, Card> = new Map()

  private latestSavedBoard?: Board

  constructor(
    card: Card = Card.create({
      id: REFACTOR_REFINERY.ID,
      name: REFACTOR_REFINERY.NAME,
      boardId: wallboxBoardId.getValue(),
      columnId: 'columnId'
    })
  ) {
    super()
    this.cards.set(card.getId().toString(), card)
  }

  async save(card: Card) {
    this.cards.set(card.getId().getValue(), card)
  }
}
