import { beforeEach, describe, it } from 'node:test'
import { Column } from './Column.ts'
import assert from 'node:assert'
import { InvalidColumnNameError } from './errors/InvalidColumnNameError.ts'
import { Card } from './Card.ts'
import { randomUUID } from 'node:crypto'
import { DuplicatedCardError } from './errors/DuplicatedCardError.ts'
import { CardId } from './CardId.ts'

describe('Column', () => {
  let column: Column
  // TODO: add a ColumnMother
  beforeEach(() => {
    column = Column.createNew('Default name')
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
      Column.createNew('')
    }, new InvalidColumnNameError(''))
  })

  it('can add cards', () => {
    column.addCard(Card.create({ id: randomUUID(), name: 'name' }))

    assert.ok(!column.isEmpty())
  })

  it('cannot add the same card twice', () => {
    const cardId = randomUUID()
    const card = Card.create({ id: cardId, name: 'name' })

    column.addCard(card)
    assert.throws(() => column.addCard(card), new DuplicatedCardError(CardId.fromString(cardId)))
  })
})
