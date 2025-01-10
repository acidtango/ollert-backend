import { InvalidColumnNameError } from './errors/InvalidColumnNameError.ts'

export class ColumnName {
  private constructor(private readonly name: string) {
    if (!name.trim()) throw new InvalidColumnNameError(name)
  }

  static fromString(name: string) {
    return new ColumnName(name)
  }

  getValue() {
    return this.name
  }
}
