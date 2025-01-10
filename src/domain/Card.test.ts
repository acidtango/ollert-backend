import { beforeEach, describe, it } from 'node:test'
import { Card } from './Card.ts'
import assert from 'node:assert'
import { InvalidCardNameError } from './errors/InvalidCardNameError.ts'
import { randomUUID } from 'node:crypto'

describe('Card', () => {
  let card: Card

  // TODO: add mother card
  beforeEach(() => {
    card = Card.create({ id: randomUUID(), name: 'name' })
  })

  it('is created with a name', () => {
    assert.ok(card.hasName('name'))
  })

  it('can be renamed', () => {
    card.rename('new name')

    assert.ok(card.hasName('new name'))
  })

  it('cannot be created with empty name', () => {
    assert.throws(() => Card.create({ id: randomUUID(), name: '' }), new InvalidCardNameError(''))
  })

  it('cannot be created with blank name', () => {
    assert.throws(() => Card.create({ id: randomUUID(), name: '  ' }), new InvalidCardNameError('  '))
  })

  it('is created with empty description', () => {
    assert.ok(card.hasEmptyDescription())
  })

  it('edits the description', () => {
    card.editDescription('As a PO, I edit the description')

    assert.ok(!card.hasEmptyDescription())
  })
})
