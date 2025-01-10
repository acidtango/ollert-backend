export class CardDescription {
  private constructor(private readonly description: string) {}

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
