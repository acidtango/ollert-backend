export class CardId {
  private readonly cardId: string

  private constructor(cardId: string) {
    this.cardId = cardId
  }

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
