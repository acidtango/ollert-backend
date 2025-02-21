import type { ZodType } from 'zod'
import type { Handler } from './Handler.ts'
import type { RemoveCard } from '../../types/types.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import { BoardId } from '../domain/BoardId.ts'
import { RemoveCardSchema } from '../../types/types.zod.ts';

export class RemoveCardHandler implements Handler {
  private boardRepository: BoardRepository

  constructor(boardRepository: BoardRepository) {
    this.boardRepository = boardRepository
  }

  async handle(command: RemoveCard): Promise<void> {

    const board = await this.boardRepository.findOrThrowBy(new BoardId(command.boardId))

    board.removeCard(command.cardId)

    await this.boardRepository.save(board)
  }

  schema(): ZodType {
    return RemoveCardSchema
  }
}
