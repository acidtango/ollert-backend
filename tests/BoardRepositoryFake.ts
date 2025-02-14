import { Board } from '../src/task-management/domain/Board.ts'
import { BoardId } from '../src/task-management/domain/BoardId.ts'
import { BoardRepository } from '../src/task-management/domain/BoardRepository.ts'
import { WALLBOX_BOARD_ID } from './BoardIdMother.ts'

export class BoardRepositoryFake extends BoardRepository {
  private boards: Map<string, Board> = new Map()

  private latestSavedBoard?: Board

  constructor(board: Board = new Board(WALLBOX_BOARD_ID)) {
    super()
    this.boards.set(board.getId().toString(), board)
  }

  getLatestSaved(): Board {
    if (!this.latestSavedBoard) {
      throw new Error('No board saved')
    }

    return this.latestSavedBoard
  }

  async findBy(id: BoardId): Promise<Board | undefined> {
    return this.boards.get(id.getValue())
  }

  async save(board: Board) {
    this.boards.set(board.getId().getValue(), board)
    this.latestSavedBoard = board
  }
}
