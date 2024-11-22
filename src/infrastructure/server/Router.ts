import type { IncomingMessage } from "http";
import type internal from "stream";
import { WebSocketServer } from "ws";

export class Router {
  constructor(
    private readonly commandsServer: WebSocketServer,
    private readonly eventsServer: WebSocketServer
  ) {}

  onUpgrade(request: IncomingMessage, socket: internal.Duplex, head: Buffer) {
    const { pathname } = new URL(request.url ?? "", "http://localhost:3000");
    const reCommands = new RegExp("^/boards/(?<boardId>.+)/commands$");
    const reEvents = new RegExp("^/boards/(?<boardId>.+)/events$");
    const commandsResult = reCommands.exec(pathname);
    const eventsResult = reEvents.exec(pathname);

    if (commandsResult) {
      this.commandsServer.handleUpgrade(request, socket, head, (ws) => {
        this.commandsServer.emit("connection", ws);
      });
    } else if (eventsResult) {
      this.eventsServer.handleUpgrade(request, socket, head, (ws) => {
        this.eventsServer.emit("connection", ws);
      });
    } else {
      socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
      socket.destroy();
    }
  }
}
