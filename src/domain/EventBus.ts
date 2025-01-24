import type { BoardEvent } from '../../types/types.ts'

export interface EventBus {
  emit(event: BoardEvent[]): void
}
