export class ColumnId {
  private readonly columnId: string

  private constructor(columnId: string) {
    this.columnId = columnId
  }

  static fromString(columnId: string) {
    return new ColumnId(columnId)   
  }

  equals(otherId: ColumnId) {
    return this.columnId === otherId.columnId
  }
}
