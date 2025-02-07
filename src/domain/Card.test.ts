import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it } from 'node:test'
import { Card } from './Card.ts'
import { InvalidCardNameError } from './errors/InvalidCardNameError.ts'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'

describe('Card', () => {
  let card: Card

  // TODO: add mother card
  beforeEach(() => {
    card = Card.create({ id: randomUUID(), name: 'name', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID })
  })

  it('is created with a name', () => {
    assert.ok(card.hasName('name'))
  })

  it('can be renamed', () => {
    card.rename('new name')

    assert.ok(card.hasName('new name'))
  })

  it('cannot be created with empty name', () => {
    assert.throws(
      () => Card.create({ id: randomUUID(), name: '', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID }),
      new InvalidCardNameError('')
    )
  })

  it('cannot be created with blank name', () => {
    assert.throws(
      () => Card.create({ id: randomUUID(), name: '  ', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID }),
      new InvalidCardNameError('  ')
    )
  })

  it('is created with empty description', () => {
    assert.ok(card.hasEmptyDescription())
  })

  it('edits the description', () => {
    card.editDescription('As a PO, I edit the description')

    assert.ok(!card.hasEmptyDescription())
  })
})
