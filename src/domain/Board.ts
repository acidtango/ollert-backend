import type { BoardId } from './BoardId.ts'

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

  hasCard(cardName: string) {
    return false
  }
}
