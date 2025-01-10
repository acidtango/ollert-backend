import { InvalidCardNameError } from './errors/InvalidCardNameError.ts'

export class CardName {
  private constructor(private readonly name: string) {
    if (!name.trim()) throw new InvalidCardNameError(name)
  }

  static fromString(name: string) {
    return new CardName(name)
  }

  getValue() {
    return this.name
  }
}
