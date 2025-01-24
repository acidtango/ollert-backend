import type { AddCard } from '../../types/types.ts'
import { AddCardSchema } from '../../types/types.zod.ts'
import { BoardId } from '../domain/BoardId.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import type { Handler } from './Handler.ts'
import { Card } from '../domain/Card.ts'
import type { EventBus } from '../domain/EventBus.js'

export class AddCardHandler implements Handler {
  private readonly eventBus: EventBus
  private readonly boardRepository: BoardRepository

  constructor(eventBus: EventBus, boardRepository: BoardRepository) {
    this.eventBus = eventBus
    this.boardRepository = boardRepository
  }

  schema() {
    return AddCardSchema
  }

  async handle(command: AddCard) {
    const board = await this.boardRepository.findOrThrowBy(new BoardId(command.boardId))

    board.addCard(command.columnId, Card.create({ id: command.cardId, name: command.name }))

    await this.boardRepository.save(board)
    this.eventBus.emit(board.pullDomainEvents())
  }
}
