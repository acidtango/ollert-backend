import assert from 'node:assert'
import { after, before, beforeEach, describe, it } from 'node:test'
import { libeenBoard, wallboxBoard } from '../../../tests/BoardMother.ts'
import { BoardRepositoryMongo } from './BoardRepositoryMongo.ts'
import { BoardId } from '../../domain/BoardId.ts'
import { LIBEEN_BOARD_ID, WALLBOX_BOARD_ID } from '../../../tests/BoardIdMother.ts'
import { DONE_COLUMN_ID } from '../../../tests/ColumnIdMother.ts'

describe('BoardRepositoryMongo', () => {
  let repository: BoardRepositoryMongo

  before(async () => {
    repository = await BoardRepositoryMongo.create()
  })

  after(async () => {
    await repository.close()
  })

  beforeEach(async () => {
    await repository.reset()
  })

  it('saves a board in the repository', async () => {
    const before = libeenBoard()

    await repository.save(before)

    const after = await repository.findOrThrowBy(new BoardId(LIBEEN_BOARD_ID))

    before.flushDomainEvents()
    assert.deepStrictEqual(after, before)
  })

  it('finds the board from the given ID', async () => {
    const libeen = libeenBoard()
    const wallbox = wallboxBoard()

    await repository.save(libeen)
    await repository.save(wallbox)

    const wallboxAfter = await repository.findOrThrowBy(new BoardId(WALLBOX_BOARD_ID))

    assert.deepStrictEqual(wallboxAfter, wallbox)
  })

  it('can save twice', async () => {
    const libeen = libeenBoard()

    await repository.save(libeen)

    const libeenAfter = await repository.findOrThrowBy(new BoardId(LIBEEN_BOARD_ID))
    libeenAfter.addColumn(DONE_COLUMN_ID, 'Done')

    await repository.save(libeenAfter)
  })
})
