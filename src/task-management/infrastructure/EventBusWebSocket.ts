import { WebSocketServer } from 'ws'
import type { EventBus } from '../domain/EventBus.ts'

export class EventBusWebSocket implements EventBus {
  private readonly eventsServer: WebSocketServer

  constructor(eventsServer: WebSocketServer) {
    this.eventsServer = eventsServer
  }

  emit(event: any) {
    this.eventsServer.clients.forEach((client) => {
      client.send(JSON.stringify(event))
    })
  }
}
