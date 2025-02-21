import { Board } from '../src/domain/Board.ts'
import { BoardId } from '../src/domain/BoardId.ts'
import { BoardRepository } from '../src/domain/BoardRepository.ts'
import { LIBEEN_BOARD_ID, WALLBOX_BOARD_ID, wallboxBoardId } from './BoardIdMother.ts'
import { libeenBoard, wallboxBoard } from './BoardMother.ts'

export class BoardRepositoryFake extends BoardRepository {
  private boards: Map<string, Board> = new Map()

  private latestSavedBoard?: Board

  constructor(boards: Board[] = [ wallboxBoard() ]) {
    super()
    boards.forEach(board => {
      this.boards.set(board.getId().toString(), board)
    })
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
