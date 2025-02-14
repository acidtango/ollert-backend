
# Generate Schemas
First, you need to install @asyncapi/cli **globally**, installing it as dev-dependencies doesn't work:

`npm install -g @asyncapi/cli`

This project is API-first, meaning all the types frome from the `asyncapi.yml` file. It generates many .ts files for each component. Then, these files are merged into one `types.ts`. This file can then be transformed to zod schemas by using ts-to-zod. All this process is done automatically with `api.sh` script. There's a script in the `package.json` that invokes it: `npm run generate-api`


# TODO List

* [x] Lanzar eventos desde el agregado
* [ ] Un mensaje que envíe el estado actual del board al cliente
* [ ] Refactorizar el agregado a event sourcing
* [ ] Implementar tests e2e


Cual es el main aggregate?
- Column
- Card
- Los dos



Agregados:
Board{
    Columns: Column[]{
     - columnId
     - name: ColumnName
     - Cards:CardId[]
 }
 }

Card
  - Info de card