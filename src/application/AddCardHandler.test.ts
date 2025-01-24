import assert from 'node:assert'
import { describe, it } from 'node:test'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.ts'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import { AddCardHandler } from './AddCardHandler.ts'

describe('AddCardHandler', () => {
  it('should add a card', async () => {
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddCardHandler(boardRepository)

    await handler.handle({
      type: 'AddCard',
      name: 'Test features',
      columnId: TODO_COLUMN_ID,
      boardId: WALLBOX_BOARD_ID,
      cardId: '56ace536-3bf7-41b0-a809-679937eb3e09'
    })

    const board = boardRepository.getLatestSaved()
    assert.ok(board.hasCard('Test features'))
  })
})
