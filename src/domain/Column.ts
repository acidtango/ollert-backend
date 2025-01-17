import type { Card } from './Card.ts'
import { ColumnId } from './ColumnId.ts'
import { ColumnName } from './ColumnName.ts'
import { DuplicatedCardError } from './errors/DuplicatedCardError.ts'

export class Column {
  private id: ColumnId
  private name: ColumnName
  private cards: Card[] = []

  private constructor(id: string, name: string) {
    this.id = ColumnId.fromString(id)
    this.name = ColumnName.fromString(name)
  }

  static createNew(id: string, name: string) {
    return new Column(id, name)
  }

  hasName(name: string): boolean {
    return this.name.getValue() === name
  }

  rename(newName: string): void {
    this.name = ColumnName.fromString(newName)
  }

  hasId(columnId: ColumnId) {
    return this.id.equals(columnId)
  }

  isEmpty(): boolean {
    return this.cards.length === 0
  }

  addCard(card: Card): void {
    this.ensureCardIsNotDuplicated(card)
    this.cards.push(card)
  }

  ensureCardIsNotDuplicated(card: Card): void {
    if (this.cards.some((card) => card.hasSameId(card))) {
      throw new DuplicatedCardError(card.getId())
    }
  }
}
