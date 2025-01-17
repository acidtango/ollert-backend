import type { BoardId } from './BoardId.ts'
import type { Card } from './Card.ts'

export class Board {
  private readonly id: BoardId
  private readonly columns: Array<{ id: string; name: string; cards: Card[] }> = []

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
    this.columns.push({ id: columnId, name, cards: [] })
  }

  isEmpty() {
    return this.columns.length === 0
  }

  addCard(columnId: string, card: Card) {
    const column = this.columns[0]
    column?.cards.push(card)
  }

  hasCard(cardName: string) {
    const column = this.columns[0]
    return column?.cards.length
  }
}
