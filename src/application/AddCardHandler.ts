import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import type { AddCard } from '../../types/types.ts'
import { AddCardSchema } from '../../types/types.zod.ts'
import { BoardId } from '../domain/BoardId.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import { Card } from '../domain/Card.ts'
import type { EventBus } from '../domain/EventBus.js'
import type { Handler } from './Handler.ts'

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

    board.addCard(
      command.columnId,
      Card.create({ id: command.cardId, name: command.name, columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID })
    )

    await this.boardRepository.save(board)
    this.eventBus.emit(board.pullDomainEvents())
  }
}
