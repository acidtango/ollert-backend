import { describe, it } from 'node:test'
import assert from 'node:assert/strict'
import { Board } from './Board.ts'
import { BoardId } from './BoardId.ts'

describe('Board', () => {
  it('does not have column on creation', () => {
    const board = new Board(new BoardId('ecc81f64-7925-4004-b7e1-4f1f26dbbba5'))

    const isEmpty = board.isEmpty()

    assert(isEmpty)
  })

  it('can add columns', () => {
    const board = new Board(new BoardId('ecc81f64-7925-4004-b7e1-4f1f26dbbba5'))

    board.addColumn('abfe40bf-22b8-4692-8585-cea01b809493', 'TODO')

    assert(!board.isEmpty())
  })

  it('can check if a column does not exists', () => {
    const board = new Board(new BoardId('ecc81f64-7925-4004-b7e1-4f1f26dbbba5'))

    const hasColumn = board.hasColumn('notExistent')

    assert(!hasColumn)
  })

  it('can check if a column exists', () => {
    const board = new Board(new BoardId('ecc81f64-7925-4004-b7e1-4f1f26dbbba5'))

    board.addColumn('abfe40bf-22b8-4692-8585-cea01b809493', 'TODO')

    assert(board.hasColumn('TODO'))
  })
})
