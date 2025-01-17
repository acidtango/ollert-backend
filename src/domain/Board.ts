import { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'
import { Column } from './Column.ts'
import type { ColumnId } from './ColumnId.ts'

export class Board {
  private readonly id: BoardId
  private columns: Array<Column> = []

  constructor(id: string) {
    this.id = new BoardId(id)
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

  delete(columnId: ColumnId) {
    this.columns = this.columns.filter((c) => !c.hasId(columnId))
  }

  hasCard(cardName: string) {
    const column = this.columns[0]
    if (!column) return false

    return !column.isEmpty()
  }
}
