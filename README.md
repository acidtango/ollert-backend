
# Generate Schemas
First, you need to install @asyncapi/cli **globally**, installing it as dev-dependencies doesn't work:

`npm install -g @asyncapi/cli`

This project is API-first, meaning all the types frome from the `asyncapi.yml` file. It generates many .ts files for each component. Then, these files are merged into one `types.ts`. This file can then be transformed to zod schemas by using ts-to-zod. All this process is done automatically with `api.sh` script. There's a script in the `package.json` that invokes it: `npm run generate-api`

# Experiencias

## Webosckets
1. No hace falta enviar comanodos por el websocket, por una petición rest normal se podría
2. Realmente sólo lo usaríamos para enviar eventos al frontend.
3. para reconstruir el Agregado, hacemos un endpoint Get que contenga el tiemestamp de cuando se reconstruyó. Luego el cliente se suscribe a los eventos y discrimina los que le interesan.

## Node
1. La librería nativa de assert es una castaña
2. Parece que se podría usar el test runner nativo
3. Como montar un server nativo

## Event Sourcing
1. En general como es event sourcing
2. Como Stremear eventos desde la BBDD usando AsnycInterable

## OOP/DDD/Architecture
1. Usar primitivos como interfaz de los agregados ¿Ventaja? ¿No? No está 100% seguro

# TODO List

* [x] Lanzar eventos desde el agregado
* [ ] Un mensaje que envíe el estado actual del board al cliente
* [~] Refactorizar el agregado a event sourcing
* [ ] Implementar tests e2e

