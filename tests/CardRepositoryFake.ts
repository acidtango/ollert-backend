import { Board } from '../src/task-management/domain/Board.ts'
import { Card } from '../src/task-management/domain/Card.ts'
import { CardRepository } from '../src/task-management/domain/CardRepository.ts'
import { wallboxBoardId } from './BoardIdMother.ts'
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
