import knightMoves from "./knights-travails.js";

const isValidKnightJump = (pos1, pos2) => {
  const dx = Math.abs(pos1[0] - pos2[0]);
  const dy = Math.abs(pos1[1] - pos2[1]);
  return (dx === 1 && dy === 2) || (dx === 2 && dy === 1);
};

const validatePath = (path, start, end, expectedLength) => {
  expect(path.length).toBe(expectedLength);

  expect(path[0]).toEqual(start);
  expect(path[path.length - 1]).toEqual(end);

  for (let i = 0; i < path.length - 1; i++) {
    const isValid = isValidKnightJump(path[i], path[i + 1]);
    expect(isValid).toBe(true);
  }
};

describe("knightMoves()", () => {
  test("returns path of 1 (just the start) if start and end are the same", () => {
    const path = knightMoves([0, 0], [0, 0]);
    expect(path).toEqual([[0, 0]]);
    expect(path.length).toBe(1);
  });

  describe("Finding the Shortest Path", () => {
    test("takes 1 move from [0,0] to [1,2]", () => {
      const path = knightMoves([0, 0], [1, 2]);
      // 1 move means the array has 2 elements: [start, end]
      validatePath(path, [0, 0], [1, 2], 2);
    });

    test("takes 2 moves from [0,0] to [3,3]", () => {
      const path = knightMoves([0, 0], [3, 3]);
      // 2 moves means the array has 3 elements
      validatePath(path, [0, 0], [3, 3], 3);
    });

    test("takes 2 moves backwards from [3,3] to [0,0]", () => {
      const path = knightMoves([3, 3], [0, 0]);
      validatePath(path, [3, 3], [0, 0], 3);
    });

    test("takes 3 moves from [3,3] to [4,3]", () => {
      const path = knightMoves([3, 3], [4, 3]);
      validatePath(path, [3, 3], [4, 3], 4);
    });

    test("takes 6 moves to cross the entire board from [0,0] to [7,7]", () => {
      const path = knightMoves([0, 0], [7, 7]);
      validatePath(path, [0, 0], [7, 7], 7);
    });
  });

  describe("Error Handling", () => {
    test('throws "Invalid input" for coordinates off the board (negative)', () => {
      expect(() => knightMoves([-1, 0], [0, 0])).toThrow("Invalid input");
    });

    test('throws "Invalid input" for coordinates off the board (greater than 7)', () => {
      expect(() => knightMoves([0, 0], [8, 8])).toThrow("Invalid input");
    });
  });
});
