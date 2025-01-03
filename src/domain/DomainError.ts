import type { ErrorCode } from './ErrorCode.ts'

export class DomainError extends Error {
  private readonly code: ErrorCode

  constructor(message: string, code: ErrorCode) {
    super(message)
    this.code = code
  }
}
