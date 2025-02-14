import { InvalidColumnNameError } from './errors/InvalidColumnNameError.ts'

export class ColumnName {
  private readonly name: string

  private constructor(name: string) {
    this.name = name
    if (!name.trim()) throw new InvalidColumnNameError(name)
  }

  static fromString(name: string) {
    return new ColumnName(name)
  }

  getValue() {
    return this.name
  }
}
