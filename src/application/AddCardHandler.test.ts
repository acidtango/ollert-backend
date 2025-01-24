import assert from 'node:assert'
import { describe, it } from 'node:test'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.ts'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import { AddCardHandler } from './AddCardHandler.ts'
import { Board } from '../domain/Board.ts'
import * as CardMother from '../../tests/CardIdMother.ts'

describe('AddCardHandler', () => {
  it('should add a card', async () => {
    const board = new Board(WALLBOX_BOARD_ID)
    board.addColumn(TODO_COLUMN_ID, 'TODO')
    const boardRepository = new BoardRepositoryFake(board)
    const handler = new AddCardHandler(boardRepository)

    await handler.handle({
      type: 'AddCard',
      name: 'Test features',
      columnId: TODO_COLUMN_ID,
      boardId: WALLBOX_BOARD_ID,
      cardId: CardMother.REFACTOR_REFINERY.ID
    })

    const savedBoard = boardRepository.getLatestSaved()
    assert.ok(savedBoard.hasCard('Test features'))
  })

  it('cannot add a card with the same id', async () => {
    const board = new Board(WALLBOX_BOARD_ID)
    board.addColumn(TODO_COLUMN_ID, 'TODO')
    const boardRepository = new BoardRepositoryFake(board)
    const handler = new AddCardHandler(boardRepository)

    await handler.handle({
      type: 'AddCard',
      name: 'Test features',
      columnId: TODO_COLUMN_ID,
      boardId: WALLBOX_BOARD_ID,
      cardId: CardMother.REFACTOR_REFINERY.ID
    })

    const savedBoard = boardRepository.getLatestSaved()
    assert.ok(savedBoard.hasCard(CardMother.REFACTOR_REFINERY.id))
  })
})
