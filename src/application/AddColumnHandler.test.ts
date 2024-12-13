import {describe, it, mock} from "node:test";
import assert from 'node:assert';
import {AddColumnHandler} from "./AddColumnHandler.ts";
import {BoardRepositoryFake} from "../../tests/BoardRepositoryFake.ts";

describe("AddColumnHandler", () => {
  it("should add a column", async () => {
    const eventBus = { emit: mock.fn() };
    const boardRepository = new BoardRepositoryFake()
    const handler = new AddColumnHandler(eventBus, boardRepository);

    await handler.handle({
      type: "AddColumn",
      id: "e5814727-aed2-4b9f-9b45-865bb19c110d",
      name: "TODO",
      boardId: "ecc81f64-7925-4004-b7e1-4f1f26dbbba5"
    });

    const board = boardRepository.getLatestSaved()
    assert.ok(board.hasColumn("TODO"));
  });

  // assert.deepStrictEqual(eventBus.emit.mock.calls[0]?.arguments[0], { type: "COLUMN_CREATED", payload: "" })
  // expect(eventBus.emit).toHaveBeenCalledWith("columnAdded", { name: "column" });
});
