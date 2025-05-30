import { type WebSocket } from 'ws'
import { StringToJSONSchema } from '../../../schema.ts'
import type { BoardCommand } from '../../../types/types.ts'
import { BoardCommandSchema } from '../../../types/types.zod.ts'
import type { Handler } from '../../application/Handler.ts'

export class Controller {
  private readonly ws: WebSocket

  private readonly handlers: Handler[]

  constructor(ws: WebSocket, handlers: Handler[]) {
    this.handlers = handlers
    this.ws = ws
  }

  onMessage(data: Buffer) {
    Promise.resolve(data.toString())
      .then((data) => StringToJSONSchema.parse(data))
      .then((data) => BoardCommandSchema.parse(data))
      .then((command: BoardCommand) => {
        for (const handler of this.handlers) {
          const parsed = handler.schema().safeParse(command)
          if (parsed.success) {
            const data = parsed.data
            return handler.handle(data)
          }
        }
        return Promise.reject(new Error('Unknown command'))
      })
      .catch((e: Error) => {
        console.error(e)
        this.ws.send(JSON.stringify({ message: e.message, stack: e.stack }))
      })
  }
}
