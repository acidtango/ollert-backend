import { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'
import { Column } from './Column.ts'
import { ColumnId } from './ColumnId.ts'
import { CardId } from './CardId.ts'

export class Board {
  private readonly id: BoardId
  private columns: Array<Column> = []

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
  }

  delete(columnId: ColumnId) {
    this.columns = this.columns.filter((c) => !c.hasId(columnId))
  }

  hasCard(cardName: string | CardId) {
    return this.columns.some((c) => c.hasCard(cardName))
  }
}
