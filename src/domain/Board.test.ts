import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'
import { notExistentCardId, REFACTOR_REFINERY_ID } from '../../tests/CardIdMother.ts'
import { DOING_COLUMN_ID, TODO_COLUMN_ID, todoColumnId } from '../../tests/ColumnIdMother.ts'
import { Board } from './Board.ts'
import { Card } from './Card.ts'
import { DuplicatedColumnError } from './errors/DuplicatedColumnError.ts'

describe('Board', () => {
  it('does not have column on creation', () => {
    const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')

    const isEmpty = board.isEmpty()

    assert(isEmpty)
  })

  describe('addColumn', () => {
    it('can add columns', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')

      board.addColumn('abfe40bf-22b8-4692-8585-cea01b809493', 'TODO')

      assert(!board.isEmpty())
    })

    it('cannot add same column twice', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')

      board.addColumn('abfe40bf-22b8-4692-8585-cea01b809493', 'TODO')

      assert(!board.isEmpty())
    })
  })

  describe('hasColumn', () => {
    it('can check if a column does not exists', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')

      const hasColumn = board.hasColumn('notExistent')

      assert(!hasColumn)
    })

    it('can check if a column exists', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const columnId = 'abfe40bf-22b8-4692-8585-cea01b809493'

      board.addColumn(columnId, 'TODO')

      assert.throws(() => {
        board.addColumn(columnId, 'TODO')
      }, new DuplicatedColumnError(columnId))
    })

    it('can check if a column exists by id', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      board.addColumn(DOING_COLUMN_ID, 'Doing')

      assert(!board.hasColumn(todoColumnId))
    })
  })

  describe('hasCard', () => {
    it('can not find any card in an empty board', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')

      assert(!board.hasCard('NOT-EXISTANT'))
    })

    it('checks if has a card by name', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const card = Card.create({ id: 'random', name: 'Example card' })
      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addCard(TODO_COLUMN_ID, card)

      const hasCard = board.hasCard('not existent')

      assert(!hasCard)
    })

    it('checks if has a card by id', () => {
      const board = new Board(WALLBOX_BOARD_ID)
      const cardName = 'Example card'
      const card = Card.create({ id: 'random', name: cardName })
      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addCard(TODO_COLUMN_ID, card)

      assert(!board.hasCard(notExistentCardId))
    })

    it('finds a card in any column', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const cardName = 'Example card'
      const card = Card.create({ id: 'random', name: cardName })
      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addColumn(DOING_COLUMN_ID, 'DOING')

      board.addCard(DOING_COLUMN_ID, card)

      assert(board.hasCard(cardName))
    })
  })

  describe('addCard', () => {
    it('can add a card', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const cardName = 'Example card'
      const card = Card.create({ id: 'random', name: cardName })

      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addCard(TODO_COLUMN_ID, card)

      assert(board.hasCard(cardName))
    })

    it('throws an error if column does not exists', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const card = Card.create({ id: 'random', name: 'not important' })

      assert.throws(() => board.addCard('not important', card))
    })

    it('can add multiple a cards', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      const cardName = 'Example card'
      const card = Card.create({ id: 'random', name: cardName })
      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addColumn(DOING_COLUMN_ID, 'DOING')

      board.addCard(DOING_COLUMN_ID, card)
      board.removeColumn(todoColumnId)

      assert(board.hasCard(cardName))
    })
  })

  describe('delete column', () => {
    it('deletes a column and the board will be empty', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      board.addColumn(TODO_COLUMN_ID, 'TODO')

      board.removeColumn(todoColumnId)

      assert(board.isEmpty())
    })

    it('deletes an specific column', () => {
      const board = new Board('ecc81f64-7925-4004-b7e1-4f1f26dbbba5')
      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addColumn(DOING_COLUMN_ID, 'DOING')

      board.removeColumn(todoColumnId)

      assert(board.hasColumn('DOING'))
    })
  })

  describe('reconstructFrom', () => {
    it('correctly reconstructs when various events are applied', () => {
      const board = new Board(WALLBOX_BOARD_ID)

      board.addColumn(TODO_COLUMN_ID, 'TODO')
      board.addCard(TODO_COLUMN_ID, Card.create({ id: REFACTOR_REFINERY_ID, name: 'Refactor refinery' }))

      const reconstructedBoard = Board.reconstructFrom(WALLBOX_BOARD_ID, board.pullDomainEvents())

      assert.deepStrictEqual(reconstructedBoard, board)
    })
  })
})
