import { createServer } from 'node:http'
import { type WebSocket, WebSocketServer } from 'ws'
import { AddColumnHandler } from './src/application/AddColumnHandler.ts'
import { AddCardHandler } from './src/application/AddCardHandler.ts'
import { EventBusWebSocket } from './src/infrastructure/EventBusWebSocket.ts'
import { Controller } from './src/infrastructure/server/Controller.ts'
import { Router } from './src/infrastructure/server/Router.ts'
import { BoardId } from './src/domain/BoardId.ts'
import { BoardRepositoryMongo } from './src/infrastructure/repositories/BoardRepositoryMongo.ts'

const server = createServer((req, res) => {
  const boardUrl = req.url?.split('/')[2]
  if (boardUrl === undefined) {
    res.writeHead(404, { 'Content-Type': 'text/plain' })
    res.end('Not found')
    return
  }
  const boardId: BoardId = new BoardId(boardUrl)
  console.log(`Received request for board ${boardId}`)
  boardRepository
    .findOrThrowBy(boardId)
    .then((board) => {
      res.writeHead(200, { 'Content-Type': 'application/json' })
      res.end(JSON.stringify(board))
    })
    .catch(() => {
      res.writeHead(404, { 'Content-Type': 'text/plain' })
      res.end('Not found')
    })
})
const commandsServer = new WebSocketServer({ noServer: true })
const eventsServer = new WebSocketServer({ noServer: true })

const eventBus = new EventBusWebSocket(eventsServer)
const boardRepository = await BoardRepositoryMongo.create()
const addColumnHandler = new AddColumnHandler(eventBus, boardRepository)
const addCardHandler = new AddCardHandler(eventBus, boardRepository)
const handlers = [addColumnHandler, addCardHandler]
const router = new Router(commandsServer, eventsServer)

commandsServer.on('connection', (ws: WebSocket) => {
  const controller = new Controller(ws, handlers)
  ws.on('error', console.error)

  ws.on('message', controller.onMessage.bind(controller))
})

server.on('upgrade', router.onUpgrade.bind(router))

server.listen(3000)
