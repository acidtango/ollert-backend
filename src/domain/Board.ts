import type { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'
import { Column } from './Column.ts'

export class Board {
  private readonly id: BoardId
  private readonly columns: Array<Column> = []

  constructor(id: BoardId) {
    this.id = id
  }

  hasColumn(columnName: string) {
    return this.columns.some((column) => column.hasName(columnName))
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
    const column = this.columns[0]
    column?.addCard(card)
  }

  hasCard(cardName: string) {
    const column = this.columns[0]
    if (!column) return false

    return !column.isEmpty()
  }
}
