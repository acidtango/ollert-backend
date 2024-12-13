export class BoardId {
  private readonly value: string;

  constructor(value: string) {
    this.value = value;
  }

  getValue() {
    return this.value;
  }

  equals(other: BoardId) {
    return this.value === other.value;
  }
}
