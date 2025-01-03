import { WebSocketServer } from 'ws'
import type { EventBus } from '../domain/EventBus.ts'

export class EventBusWebSocket implements EventBus {
  constructor(private readonly eventsServer: WebSocketServer) {}

  emit(event: any) {
    this.eventsServer.clients.forEach((client) => {
      client.send(JSON.stringify(event))
    })
  }
}
