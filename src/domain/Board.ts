import type { BoardEvent } from '../../types/types.ts'
import { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'
import { CardId } from './CardId.ts'
import { Column } from './Column.ts'
import { ColumnId } from './ColumnId.ts'

export class Board {
  private readonly id: BoardId
  private columns: Array<Column> = []
  private domainEvents: Array<BoardEvent> = []

  constructor(id: string) {
    this.id = new BoardId(id)
  }

  hasColumn(nameOrId: string | ColumnId) {
    if (nameOrId instanceof ColumnId) {
      return this.columns.some((column) => column.hasId(nameOrId))
    }

    return this.columns.some((column) => column.hasName(nameOrId))
  }

  getId() {
    return this.id
  }

  addColumn(columnId: string, name: string) {
    this.columns.push(Column.createNew(columnId, name))
    this.domainEvents.push({
      type: 'ColumnAdded',
      columnId,
      name,
      boardId: this.id.getValue()
    })
  }

  removeCard(primitiveCardId: string) {
    const cardId = CardId.fromString(primitiveCardId)
    const cardColumn = this.columns.find((column) => column.hasCard(cardId))
    cardColumn?.removeCard(cardId)

    this.domainEvents.push({
      type: 'CardRemoved',
      cardId: cardId.getValue(),
      boardId: this.id.getValue()
    })
  }

  isEmpty() {
    return this.columns.length === 0
  }

  addCard(columnId: string, card: Card) {
    const column = this.columns.find((c) => c.hasId(ColumnId.fromString(columnId)))

    if (!column) {
      throw new Error('Column not found')
    }

    column.addCard(card)
    this.domainEvents.push({
      type: 'CardAdded',
      cardId: card.getId().getValue(),
      name: card.name.getValue(), // TODO: Name public??? 🚧
      columnId,
      boardId: this.id.getValue()
    })
  }

  delete(columnId: ColumnId) {
    this.columns = this.columns.filter((c) => !c.hasId(columnId))
  }

  hasCard(cardName: string | CardId) {
    return this.columns.some((c) => c.hasCard(cardName))
  }

  pullDomainEvents() {
    return this.domainEvents
  }

  flushDomainEvents() {
    this.domainEvents = []
  }
}
