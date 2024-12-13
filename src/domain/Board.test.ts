import { describe, it } from "node:test";
import assert from "node:assert/strict";
import {Board} from "./Board.ts";
import {BoardId} from "./BoardId.ts";

describe("Board", () => {
  it("does not have column on creation", () => {
    const board = new Board(new BoardId("ecc81f64-7925-4004-b7e1-4f1f26dbbba5"));

    const isEmpty = board.isEmpty()

    assert.ok(isEmpty);
  });
});
