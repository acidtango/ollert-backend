import assert from 'node:assert'
import { randomUUID } from 'node:crypto'
import { beforeEach, describe, it } from 'node:test'
import { TODO_COLUMN_ID } from '../../tests/ColumnIdMother.ts'
import { Card } from './Card.ts'
import { CardId } from './CardId.ts'
import { Column } from './Column.ts'
import { DuplicatedCardError } from './errors/DuplicatedCardError.ts'
import { InvalidColumnNameError } from './errors/InvalidColumnNameError.ts'
import { WALLBOX_BOARD_ID } from '../../tests/BoardIdMother.ts'

describe('Column', () => {
  let column: Column
  // TODO: add a ColumnMother
  beforeEach(() => {
    column = Column.createNew(TODO_COLUMN_ID, 'Default name')
  })

  it('requires a name on creation', () => {
    assert(column.hasName('Default name'))
  })

  it('can update its name', () => {
    const newName = 'new name'

    column.rename(newName)

    assert(column.hasName(newName))
  })

  it('is created with 0 cards', () => {
    assert(column.isEmpty())
  })

  it('cannot be created with empty name', () => {
    assert.throws(() => {
      Column.createNew(TODO_COLUMN_ID, '')
    }, new InvalidColumnNameError(''))
  })

  it.skip('cannot be created with empty id', () => {
    assert.throws(() => {
      Column.createNew('', 'Random column')
    }, new InvalidColumnNameError(''))
  })

  it('can add cards', () => {
    column.addCard(CardId.fromString(randomUUID()))

    assert.ok(!column.isEmpty())
  })

  it('cannot add the same card twice', () => {
    const cardId = randomUUID()
    const card = Card.create({ id: cardId, name: 'name', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID })

    column.addCard(card.getId())
    assert.throws(() => column.addCard(card.getId()), new DuplicatedCardError(CardId.fromString(cardId)))
  })

  it('can add two cards', () => {
    const cardId = randomUUID()
    const card1 = Card.create({ id: cardId, name: 'name', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID })
    const card2 = Card.create({ id: cardId + '1', name: 'name', columnId: TODO_COLUMN_ID, boardId: WALLBOX_BOARD_ID })

    column.addCard(card1.getId())
    assert.doesNotThrow(() => column.addCard(card2.getId()))
  })
})
