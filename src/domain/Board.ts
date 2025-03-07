import type { BoardEvent, CardAdded, CardRemoved, ColumnAdded } from '../../types/types.ts'
import { BoardId } from './BoardId.ts'
import { Card } from './Card.ts'
import { CardId } from './CardId.ts'
import { Column } from './Column.ts'
import { ColumnId } from './ColumnId.ts'

export class Board {
  private readonly id: BoardId
  private columns: Array<Column> = []
  private domainEvents: Array<BoardEvent> = []

  constructor(id: string) {
    this.id = new BoardId(id)
  }

  hasColumn(nameOrId: string | ColumnId) {
    if (nameOrId instanceof ColumnId) {
      return this.columns.some((column) => column.hasId(nameOrId))
    }

    return this.columns.some((column) => column.hasName(nameOrId))
  }

  getId() {
    return this.id
  }

  addColumn(columnId: string, name: string) {
    const columnAdded = {
      type: 'ColumnAdded',
      columnId,
      name,
      boardId: this.id.getValue()
    } satisfies ColumnAdded

    this.handle(columnAdded)
  }

  removeCard(primitiveCardId: string) {
    const cardRemoved = {
      type: 'CardRemoved',
      cardId: primitiveCardId,
      boardId: this.id.getValue()
    } satisfies CardRemoved

    this.handle(cardRemoved)
  }

  isEmpty() {
    return this.columns.length === 0
  }

  //TODO: Decide wether or not we should receive the card here or just the params
  addCard(columnId: string, card: Card) {
    const cardAdded = {
      type: 'CardAdded',
      cardId: card.getId().getValue(),
      name: card.name.getValue(), // TODO: Name public??? 🚧
      columnId,
      boardId: this.id.getValue()
    } satisfies CardAdded

    this.handle(cardAdded)
  }

  removeColumn(columnId: ColumnId) {
    this.columns = this.columns.filter((c) => !c.hasId(columnId))
  }

  hasCard(cardName: string | CardId) {
    return this.columns.some((c) => c.hasCard(cardName))
  }

  pullDomainEvents() {
    return this.domainEvents
  }

  flushDomainEvents() {
    this.domainEvents = []
  }

  private handleColumnAdded(columnAdded: ColumnAdded) {
    this.columns.push(Column.createNew(columnAdded.columnId, columnAdded.name))
  }

  private handleCardAdded(cardAdded: CardAdded) {
    const column = this.columns.find((c) => c.hasId(ColumnId.fromString(cardAdded.columnId)))

    if (!column) {
      throw new Error('Column not found')
    }
    const card: Card = Card.create({ id: cardAdded.cardId, name: cardAdded.name })

    column.addCard(card)
  }

  private handleCardRemoved(cardRemoved: CardRemoved) {
    const cardId = CardId.fromString(cardRemoved.cardId)
    const cardColumn = this.columns.find((column) => column.hasCard(cardId))
    cardColumn?.removeCard(cardId)
  }

  private handle(boardEvent: BoardEvent) {
    switch (boardEvent.type) {
      case 'ColumnAdded':
        this.handleColumnAdded(boardEvent as ColumnAdded)
        break
      case 'CardAdded':
        this.handleCardAdded(boardEvent as CardAdded)
        break
      case 'CardRemoved':
        this.handleCardRemoved(boardEvent as CardRemoved)
        break
    }
    this.domainEvents.push(boardEvent)
  }

  //TODO: the creation of the board should be an event itself so boardId is not needed
  public static reconstructFrom(boardId: string, events: Array<BoardEvent>) {
    const board = new Board(boardId)
    events.forEach((event) => board.handle(event))
    return board
  }
}
