export class CardDescription {
  private readonly description: string

  private constructor(description: string) {
    this.description = description
  }

  static fromString(description: string) {
    return new CardDescription(description)
  }

  static empty() {
    return new CardDescription('')
  }

  getValue() {
    return this.description
  }
}
