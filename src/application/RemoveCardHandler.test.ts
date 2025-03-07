import assert from 'node:assert'
import { beforeEach, describe, it, mock } from 'node:test'
import { LIBEEN_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { libeenBoard } from '../../tests/BoardMother.ts'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.ts'
import { IMPLEMENT_HOUSE_FINDER_ID, implementHouseFinderId } from '../../tests/CardIdMother.ts'
import { RemoveCardHandler } from './RemoveCardHandler.ts'
import type { CardRemoved } from '../../types/types.ts'

describe('Remove card handler', () => {
  let eventBus = { emit: mock.fn() }

  beforeEach(() => {
    eventBus = { emit: mock.fn() }
  })

  it('remove a card from a board', async () => {
    const boardRepository = new BoardRepositoryFake([libeenBoard()])
    const handler = new RemoveCardHandler(boardRepository, eventBus)

    await handler.handle({ cardId: IMPLEMENT_HOUSE_FINDER_ID, boardId: LIBEEN_BOARD_ID })

    const lastSaved = boardRepository.getLatestSaved()
    assert.ok(!lastSaved.hasCard(implementHouseFinderId))
  })

  it('Emits an event', async () => {
    const boardRepository = new BoardRepositoryFake([libeenBoard()])
    const handler = new RemoveCardHandler(boardRepository, eventBus)

    await handler.handle({ cardId: IMPLEMENT_HOUSE_FINDER_ID, boardId: LIBEEN_BOARD_ID })

    const lastSaved = boardRepository.getLatestSaved()

    const emittedEvents = eventBus.emit.mock.calls[0]?.arguments[0]
    assert.deepStrictEqual(emittedEvents, [
      {
        type: 'CardRemoved',
        boardId: LIBEEN_BOARD_ID,
        cardId: IMPLEMENT_HOUSE_FINDER_ID
      } satisfies CardRemoved
    ])
  })
})
