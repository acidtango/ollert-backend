import type { AddCard } from '../../../types/types.ts'
import { AddCardSchema } from '../../../types/types.zod.ts'
import { BoardId } from '../domain/BoardId.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import type { Handler } from './Handler.ts'
import { Card } from '../domain/Card.ts'
import type { EventBus } from '../domain/EventBus.js'
import { ColumnId } from '../domain/ColumnId.ts'
import type { CardRepository } from '../domain/CardRepository.ts'

export class FancyAddCardHandler implements Handler {
  private readonly eventBus: EventBus
  private readonly boardRepository: BoardRepository
  private readonly cardRepository: CardRepository

  constructor(eventBus: EventBus, boardRepository: BoardRepository, cardRepository: CardRepository) {
    this.eventBus = eventBus
    this.boardRepository = boardRepository
    this.cardRepository = cardRepository
  }

  schema() {
    return AddCardSchema
  }

  async handle(command: AddCard) {
    this.ensureBoardAndColumnExists(command.boardId, command.columnId)

    const card: Card = Card.create({
      id: command.cardId,
      name: command.name,
      boardId: command.boardId,
      columnId: command.columnId
    })
    await this.cardRepository.save(card)
    this.eventBus.emit(card.pullDomainEvents())
  }

  private async ensureBoardAndColumnExists(boardId: string, columnId: string) {
    const board = await this.boardRepository.findOrThrowBy(new BoardId(boardId))
    board.ensureColumnExists(ColumnId.fromString(columnId))
  }
}
