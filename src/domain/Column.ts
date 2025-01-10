import type { Card } from './Card.ts'
import { ColumnName } from './ColumnName.ts'
import { DuplicatedCardError } from './errors/DuplicatedCardError.ts'

export class Column {
  private name: ColumnName
  private cards: Card[] = []

  private constructor(name: string) {
    this.name = ColumnName.fromString(name)
  }

  static createNew(name: string) {
    return new Column(name)
  }

  hasName(name: string): boolean {
    return this.name.getValue() === name
  }

  rename(newName: string): void {
    this.name = ColumnName.fromString(newName)
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
