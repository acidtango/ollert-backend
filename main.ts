import { createServer } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { StringToJSONSchema } from "./schema.ts";
import type { AddColumn, BoardCommand, CreateCard } from "./types/types.ts";
import {
  AddColumnSchema,
  BoardCommandSchema,
  CreateCardSchema,
} from "./types/types.zod.ts";

const server = createServer();
const commandsServer = new WebSocketServer({ noServer: true });
const eventsServer = new WebSocketServer({ noServer: true });

class EventBus {
  emit(event: any) {
    eventsServer.clients.forEach((client) => {
      client.send(JSON.stringify(event));
    });
  }
}

class AddColumnHandler {
  private eventBus: EventBus;

  constructor(eventBus: EventBus) {
    this.eventBus = eventBus;
  }

  schema() {
    return AddColumnSchema;
  }

  async handle(command: AddColumn) {
    console.log("handle add column", command);
    console.log(command.boardId);
    eventBus.emit({ type: "COLUMN_CREATED", payload: command });
  }
}

class CreateCardHandler {
  schema() {
    return CreateCardSchema;
  }

  async handle(command: CreateCard) {
    console.log("handle create card", command);
  }
}

const eventBus = new EventBus();

const handlers = [
  new AddColumnHandler(eventBus),
  new CreateCardHandler(),
] as const;

commandsServer.on("connection", (ws: WebSocket) => {
  ws.on("error", console.error);

  ws.on("message", (data) => {
    Promise.resolve(data.toString())
      .then((data) => StringToJSONSchema.parse(data))
      .then((data) => BoardCommandSchema.parse(data))
      .then((command: BoardCommand) => {
        for (const handler of handlers) {
          const parsed = handler.schema().safeParse(command);
          if (parsed.success) {
            const data = parsed.data;
            return handler.handle(data as any);
          }
        }
        return Promise.reject(new Error("Unknown command"));
      })
      .catch((e) => {
        ws.send(JSON.stringify(e));
      });
  });
});

server.on("upgrade", function upgrade(request, socket, head) {
  const { pathname } = new URL(request.url ?? "", "http://localhost:3000");
  const reCommands = new RegExp("^/boards/(?<boardId>.+)/commands$");
  const reEvents = new RegExp("^/boards/(?<boardId>.+)/events$");
  const commandsResult = reCommands.exec(pathname);
  const eventsResult = reEvents.exec(pathname);

  if (commandsResult) {
    commandsServer.handleUpgrade(request, socket, head, (ws) => {
      commandsServer.emit("connection", ws);
    });
  } else if (eventsResult) {
    eventsServer.handleUpgrade(request, socket, head, (ws) => {
      eventsServer.emit("connection", ws);
    });
  } else {
    socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
    socket.destroy();
  }
});

server.listen(3000);
