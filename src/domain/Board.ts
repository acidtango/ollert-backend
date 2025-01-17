import type { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'

export class Board {
  private readonly id: BoardId
  private readonly columns: Array<{ id: string; name: string }> = []

  constructor(id: BoardId) {
    this.id = id
  }

  hasColumn(columnName: string) {
    return this.columns.some((column) => column.name === columnName)
  }

  getId() {
    return this.id
  }

  addColumn(columnId: string, name: string) {
    this.columns.push({ id: columnId, name })
  }

  isEmpty() {
    return this.columns.length === 0
  }

  addCard(columnId: string, card: Card) {}

  hasCard(cardName: string) {
    return true
  }
}
