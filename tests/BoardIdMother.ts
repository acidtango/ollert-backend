import { BoardId } from '../src/task-management/domain/BoardId.ts'

export const WALLBOX_BOARD_ID = 'abfe40bf-22b8-4692-8585-cea01b809493'

export const wallboxBoardId = new BoardId(WALLBOX_BOARD_ID)

export const NOT_EXISTENT_BOARD_ID = 'e51fbf90-d3c1-4945-8859-2c7b2f564893'

export const notExistentBoardId = new BoardId(NOT_EXISTENT_BOARD_ID)
