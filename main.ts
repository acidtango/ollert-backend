import { createServer } from "node:http";
import { WebSocketServer, type WebSocket } from "ws";
import { AddColumnHandler } from "./src/application/AddColumnHandler.ts";
import { CreateCardHandler } from "./src/application/CreateCardHandler.ts";
import { EventBusWebSocket } from "./src/infrastructure/EventBusWebSocket.ts";
import { Controller } from "./src/infrastructure/server/Controller.ts";
import { Router } from "./src/infrastructure/server/Router.ts";
import {BoardRepositoryFake} from "./tests/BoardRepositoryFake.ts";

const server = createServer();
const commandsServer = new WebSocketServer({ noServer: true });
const eventsServer = new WebSocketServer({ noServer: true });

const eventBus = new EventBusWebSocket(eventsServer);
const handlers = [new AddColumnHandler(eventBus, new BoardRepositoryFake()), new CreateCardHandler()];
const router = new Router(commandsServer, eventsServer);

commandsServer.on("connection", (ws: WebSocket) => {
  const controller = new Controller(ws, handlers);
  ws.on("error", console.error);

  ws.on("message", controller.onMessage.bind(controller));
});

server.on("upgrade", router.onUpgrade.bind(router));

server.listen(3000);
