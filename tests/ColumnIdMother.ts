import { ColumnId } from '../src/domain/ColumnId.ts'

export const TODO_COLUMN_ID = 'f7b83013-5cb5-4972-ac7f-a55e2016f18e'

export const DOING_COLUMN_ID = '2547441c-9e0a-41f4-8d01-3f603d22876a'

export const DONE_COLUMN_ID = '24aa0295-ed4d-42ea-a6dd-83fe7a1c4b67'

export const todoColumnId = ColumnId.fromString(TODO_COLUMN_ID)

export const doingColumnId = ColumnId.fromString(DOING_COLUMN_ID)
