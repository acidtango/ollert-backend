import { InvalidCardNameError } from './errors/InvalidCardNameError.ts'

export class CardName {
  private readonly name: string

  private constructor(name: string) {
    this.name = name
    if (!name.trim()) throw new InvalidCardNameError(name)
  }

  static fromString(name: string) {
    return new CardName(name)
  }

  getValue() {
    return this.name
  }
}
