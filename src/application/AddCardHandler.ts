import type { AddCard } from '../../types/types.ts'
import { AddCardSchema } from '../../types/types.zod.ts'
import { BoardId } from '../domain/BoardId.ts'
import type { BoardRepository } from '../domain/BoardRepository.ts'
import type { Handler } from './Handler.ts'
import { Card } from '../domain/Card.ts'

export class AddCardHandler implements Handler {
  constructor(private readonly boardRepository: BoardRepository) {}

  schema() {
    return AddCardSchema
  }

  async handle(command: AddCard) {
    const board = await this.boardRepository.findOrThrowBy(new BoardId(command.boardId))

    board.addCard(command.columnId, Card.create({ id: 'xxxx', name: command.name }))

    await this.boardRepository.save(board)
    console.log('handle create card', command)
  }
}
