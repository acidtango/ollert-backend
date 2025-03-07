import type { ZodType } from 'zod'
import type { RemoveCard } from '../../types/types.ts'
import { RemoveCardSchema } from '../../types/types.zod.ts'
import { BoardId } from '../domain/BoardId.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import type { EventBus } from '../domain/EventBus.ts'
import type { Handler } from './Handler.ts'

export class RemoveCardHandler implements Handler {
  private boardRepository: BoardRepository

  private eventBus: EventBus

  constructor(boardRepository: BoardRepository, eventBus: EventBus) {
    this.boardRepository = boardRepository
    this.eventBus = eventBus
  }

  async handle(command: RemoveCard): Promise<void> {
    const board = await this.boardRepository.findOrThrowBy(new BoardId(command.boardId))

    board.removeCard(command.cardId)

    await this.boardRepository.save(board)
    this.eventBus.emit(board.pullDomainEvents())

  }

  schema(): ZodType {
    return RemoveCardSchema
  }
}
