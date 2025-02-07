export class ColumnId {
  private constructor(private readonly columnId: string) {}

  static fromString(columnId: string) {
    return new ColumnId(columnId)   
  }

  equals(otherId: ColumnId) {
    return this.columnId === otherId.columnId
  }
}
