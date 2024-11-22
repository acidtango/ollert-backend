export interface EventBus {
  emit(event: unknown): void;
}
