import { describe, it,  } from 'node:test'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.ts'
import { libeenBoard } from '../../tests/BoardMother.ts'
import { RemoveCardHandler } from './RemoveCardHandler.ts'
import { LIBEEN_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { IMPLEMENT_HOUSE_FINDER_ID, implementHouseFinderId } from '../../tests/CardIdMother.ts'
import assert from 'node:assert'

describe('Remove card handler', () => {
  it('remove a card from a board', () => {
    const boardRepository = new BoardRepositoryFake([libeenBoard()])
    const handler = new RemoveCardHandler(boardRepository)

    handler.handle({ cardId: IMPLEMENT_HOUSE_FINDER_ID, boardId: LIBEEN_BOARD_ID })

    const lastSaved = boardRepository.getLatestSaved()
    assert.ok(!lastSaved.hasCard(implementHouseFinderId))
  })
})
