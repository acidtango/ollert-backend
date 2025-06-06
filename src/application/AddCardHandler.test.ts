import assert from 'node:assert'
import { beforeEach, describe, it, mock } from 'node:test'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { BoardRepositoryMemory } from '../infrastructure/repositories/BoardRepositoryMemory.ts'
import * as CardMother from '../../tests/CardIdMother.ts'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import type { CardAdded } from '../../types/types.ts'
import { Board } from '../domain/Board.ts'
import { AddCardHandler } from './AddCardHandler.ts'

describe('AddCardHandler', () => {
  let eventBus = { emit: mock.fn() }

  beforeEach(() => {
    eventBus = { emit: mock.fn() }
  })

  it('should add a card', async () => {
    const board = new Board(WALLBOX_BOARD_ID)
    board.addColumn(TODO_COLUMN_ID, 'TODO')
    const boardRepository = new BoardRepositoryMemory([board])
    const handler = new AddCardHandler(eventBus, boardRepository)

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
    const boardRepository = new BoardRepositoryMemory([board])
    const handler = new AddCardHandler(eventBus, boardRepository)

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

  it('emits an event', async () => {
    const board = new Board(WALLBOX_BOARD_ID)
    board.addColumn(TODO_COLUMN_ID, 'TODO')
    board.flushDomainEvents()
    const boardRepository = new BoardRepositoryMemory([board])
    const handler = new AddCardHandler(eventBus, boardRepository)

    await handler.handle({
      type: 'AddCard',
      name: 'Test features',
      columnId: TODO_COLUMN_ID,
      boardId: WALLBOX_BOARD_ID,
      cardId: CardMother.REFACTOR_REFINERY.ID
    })

    const emittedEvents = eventBus.emit.mock.calls[0]?.arguments[0]
    assert.deepStrictEqual(emittedEvents, [
      {
        type: 'CardAdded',
        name: 'Test features',
        boardId: WALLBOX_BOARD_ID,
        columnId: TODO_COLUMN_ID,
        cardId: CardMother.REFACTOR_REFINERY.ID
      } satisfies CardAdded
    ])
  })
})
