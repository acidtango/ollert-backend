import { describe, it } from 'node:test'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.js'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.js'
import { AddCardHandler } from './AddCardHandler.js'
import assert from 'node:assert'

describe('AddCardHandler', () => {
  it('should add a card', async () => {
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddCardHandler()

    await handler.handle({
      type: 'AddCard',
      name: 'Test features',
      boardId: WALLBOX_BOARD_ID
    })

    const board = boardRepository.getLatestSaved()
    assert.ok(board.hasCard('Test features'))
  })
})
