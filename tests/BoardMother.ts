import { Board } from '../src/domain/Board.ts';
import { Card } from '../src/domain/Card.ts';
import { LIBEEN_BOARD_ID } from './BoardIdMother.ts';
import { WALLBOX_BOARD_ID } from './BoardIdMother.ts';
import { IMPLEMENT_HOUSE_FINDER_ID, IMPLEMENT_HOUSE_FINDER_NAME, implementHouseFinderId } from './CardIdMother.ts';
import { DOING_COLUMN_ID, TODO_COLUMN_ID } from './ColumnIdMother.ts';



export const libeenBoard = () => {
    const libeenBoard = new Board(LIBEEN_BOARD_ID)
    libeenBoard.addColumn(TODO_COLUMN_ID, "TODO")
    libeenBoard.addColumn(DOING_COLUMN_ID, "DOING")
    libeenBoard.addCard(TODO_COLUMN_ID, Card.create({ id: IMPLEMENT_HOUSE_FINDER_ID, name: IMPLEMENT_HOUSE_FINDER_NAME }))
    return libeenBoard
};

export const wallboxBoard = () => new Board(WALLBOX_BOARD_ID);


