import { Collection, Db, MongoClient } from 'mongodb'
import { BoardId } from '../../domain/BoardId.ts'
import { Board } from '../../domain/Board.ts'
import { BoardRepository } from '../../domain/BoardRepository.ts'
import type { BoardEvent } from '../../../types/types.ts'

export class BoardRepositoryMongo extends BoardRepository {
  private eventStore: Collection<BoardEvent>
  private mongo: MongoClient

  constructor(db: Db, mongo: MongoClient) {
    super()
    this.eventStore = db.collection('boardEventStore')
    this.mongo = mongo
  }

  static async create() {
    const mongo = new MongoClient('mongodb://root:example@localhost:27017')
    await mongo.connect()
    const db = mongo.db('ollert')
    return new BoardRepositoryMongo(db, mongo)
  }

  protected async findBy(id: BoardId): Promise<Board | undefined> {
    const eventsCursor = this.eventStore.find({ boardId: id.getValue() })

    return Board.reconstructAsync(id.getValue(), eventsCursor)
  }

  async save(board: Board): Promise<void> {
    const events = board.pullDomainEvents()
    if (events.length) {
      await this.eventStore.insertMany(events)
    }
  }

  async close() {
    await this.mongo.close()
  }

  async reset() {
    await this.eventStore.deleteMany()
  }
}
