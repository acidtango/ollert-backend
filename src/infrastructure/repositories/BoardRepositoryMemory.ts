import { Board } from '../../domain/Board.ts'
import { BoardId } from '../../domain/BoardId.ts'
import { BoardRepository } from '../../domain/BoardRepository.ts'

export class BoardRepositoryMemory extends BoardRepository {
  private boards: Map<string, Board> = new Map()

  private latestSavedBoard?: Board

  constructor(boards: Board[] = []) {
    super()
    boards.forEach((board) => {
      board.flushDomainEvents()
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
    return this.boards.get(id.getValue()) ?? new Board(id.getValue())
  }

  async save(board: Board) {
    this.boards.set(board.getId().getValue(), board)
    this.latestSavedBoard = board
  }
}
