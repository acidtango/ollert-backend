import { describe, it, mock } from 'node:test'
import assert from 'node:assert'
import { AddColumnHandler } from './AddColumnHandler.ts'
import { BoardRepositoryFake } from '../../tests/BoardRepositoryFake.ts'
import { NOT_EXISTENT_BOARD_ID, notExistentBoardId, WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { BoardNotFound } from '../domain/BoardNotFound.ts'
import type { AddColumn } from '../../types/types.js'

describe('AddColumnHandler', () => {
  it('should add a column', async () => {
    const eventBus = { emit: mock.fn() }
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddColumnHandler(eventBus, boardRepository)

    await handler.handle({
      type: 'AddColumn',
      id: 'e5814727-aed2-4b9f-9b45-865bb19c110d',
      name: 'TODO',
      boardId: WALLBOX_BOARD_ID
    })

    const board = boardRepository.getLatestSaved()
    assert.ok(board.hasColumn('TODO'))
  })

  it('should emit an event after adding a column', async () => {
    const eventBus = { emit: mock.fn() }
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddColumnHandler(eventBus, boardRepository)

    const command: AddColumn = {
      type: 'AddColumn',
      id: 'e5814727-aed2-4b9f-9b45-865bb19c110d',
      name: 'TODO',
      boardId: WALLBOX_BOARD_ID
    }
    await handler.handle(command)

    const emittedEvent = eventBus.emit.mock.calls[0]?.arguments[0]
    assert.deepStrictEqual(emittedEvent, { type: 'COLUMN_CREATED', payload: command })
  })

  it('fails if board does not exists', async () => {
    const eventBus = { emit: mock.fn() }
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddColumnHandler(eventBus, boardRepository)

    await assert.rejects(
      () =>
        handler.handle({
          type: 'AddColumn',
          id: 'e5814727-aed2-4b9f-9b45-865bb19c110d',
          name: 'TODO',
          boardId: NOT_EXISTENT_BOARD_ID
        }),
      new BoardNotFound(notExistentBoardId)
    )
  })
})
