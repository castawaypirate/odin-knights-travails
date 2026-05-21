export default function knightMoves(start, end) {
  if (invalidMove(start) || invalidMove(end)) {
    throw new Error("Invalid input");
  }

  let moveQue = [];
  let paths = [];
  let visited = [];

  moveQue.push(start);
  paths.push(new LinkedList());
  paths[0].append(start);

  if (compareArrays(start, end)) {
    let solution = paths[0].toArray();
    displaySolution(solution);
    return solution;
  }

  visited.push(start);

  while (moveQue.length > 0) {
    let next = moveQue.shift();
    let path = paths.shift();

    for (let arr of possibleMoves) {
      let newPath = new LinkedList();
      newPath.duplicate(path);
      let nextMove = [next[0] + arr[0], next[1] + arr[1]];
      if (!invalidMove(nextMove) && !arrayContainsArray(visited, nextMove)) {
        visited.push(nextMove);
        newPath.append(nextMove);
        if (compareArrays(nextMove, end)) {
          let solution = newPath.toArray();
          displaySolution(solution);
          return solution;
        }
        moveQue.push(nextMove);
        paths.push(newPath);
      }
    }
  }
  return;
}

const displaySolution = (solution) => {
  console.log(`You made it in ${solution.length - 1} moves! Here's your path:`);
  for (let el of solution) {
    console.log(el);
  }
};

const compareArrays = (a, b) => {
  return a.toString() === b.toString();
};

const arrayContainsArray = (a, b) => {
  for (let c of a) {
    if (compareArrays(c, b)) {
      return true;
    }
  }
  return false;
};

const possibleMoves = [
  [-2, -1],
  [-2, 1],
  [-1, -2],
  [-1, 2],
  [1, -2],
  [1, 2],
  [2, -1],
  [2, 1],
];

const invalidMove = (arr) => {
  return arr.some((v) => v < 0 || v > 7);
};

class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  append(value) {
    let newnode = new Node(value);
    if (!this.head) {
      this.head = newnode;
      return;
    }
    let current = this.head;
    while (current.next) {
      current = current.next;
    }
    current.next = newnode;
  }

  duplicate(linkedList) {
    let current = linkedList.head;
    if (!current) {
      return;
    }

    while (current) {
      this.append(current.value);
      current = current.next;
    }
  }

  toArray() {
    let current = this.head;
    let temp = [];
    while (current) {
      temp.push(current.value);
      current = current.next;
    }
    return temp;
  }
}
