import { createServer } from 'node:http';
import { WebSocketServer } from 'ws';
import { CommandSchema, type Command, type CreateColumn, CreateColumnSchema, StringToJSONSchema, type CreateCard, CreateCardSchema } from './schema.ts';


const server = createServer();
const wss = new WebSocketServer({ noServer: true });

class EventBus {
    emit(event: any) {
        wss.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify(event));
            }
        })
    }
}

class CreateColumnHandler {
    private eventBus: EventBus;
    
    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;    
    }

    schema() {
        return CreateColumnSchema;
    }

    async handle(command: CreateColumn) {
        console.log('handle create column', command);
        eventBus.emit({ type: 'COLUMN_CREATED', payload: command });
    }
}

class CreateCardHandler {
    schema() {
        return CreateCardSchema;
    }

    async handle(command: CreateCard) {
        console.log('handle create card', command);
    }
}

const eventBus = new EventBus();

const handlers = [new CreateColumnHandler(eventBus), new CreateCardHandler()] as const;

wss.on('connection', (ws, req, ctx) => {
    console.log('connected', ctx);
  ws.on('error', console.error);

  ws.on('message', (data) => {
    Promise
        .resolve(data.toString())
        .then(data => StringToJSONSchema.parse(data))
        .then(data => ({...ctx, ...data}))
        .then(data => CommandSchema.parse(data))
        .then((command: Command) => {
            for(const handler of handlers) {
                const parsed = handler.schema().safeParse(command);
                if (parsed.success) {
                    const data = parsed.data;
                    return handler.handle(data as any);
                }
            }
            return Promise.reject(new Error('Unknown command'));
        })
        .catch((e) => {
            ws.send(JSON.stringify(e));
        })
  });
});

server.on('upgrade', function upgrade(request, socket, head) {
  const { pathname } = new URL(request.url, 'http://localhost:3000');
  const re = new RegExp('^/boards/(?<boardId>.+)$');
  const result = re.exec(pathname)

  if (result) {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request, result.groups);
    });
  } else {
    socket.write('HTTP/1.1 404 Not Found\r\n\r\n');
    socket.destroy();
  }
});

server.listen(3000);