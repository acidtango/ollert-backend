import { CardDescription } from './CardDescription.ts'
import { CardId } from './CardId.ts'
import { CardName } from './CardName.ts'

export class Card {
  private id: CardId
  private name: CardName
  private description: CardDescription

  private constructor(values: { id: CardId; name: CardName; description: CardDescription }) {
    this.id = values.id
    this.name = values.name
    this.description = values.description
  }

  static create(values: { id: string; name: string }): Card {
    return new Card({
      id: CardId.fromString(values.id),
      name: CardName.fromString(values.name),
      description: CardDescription.empty()
    })
  }

  hasName(name: string): boolean {
    return this.name.getValue() === name
  }

  rename(newName: string): void {
    this.name = CardName.fromString(newName)
  }

  editDescription(description: string): void {
    this.description = CardDescription.fromString(description)
  }

  hasEmptyDescription(): boolean {
    return this.description.getValue().length === 0
  }

  hasSameId(card: Card): boolean {
    return this.id.getValue() === card.id.getValue()
  }

  getId(): CardId {
    return this.id
  }
}
