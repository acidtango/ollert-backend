export class CardId {
  private constructor(private readonly cardId: string) {}

  static fromString(cardId: string) {
    return new CardId(cardId)
  }

  getValue() {
    return this.cardId
  }

  equals(id: CardId) {
    return this.cardId === id.cardId
  }
}
