const gameBoard = (() => {
  let board = Array(9).fill("");
  const renderBoard = () => {
    board.forEach((symbol, index) => {
      document.getElementById(index).innerText = symbol;
    });
  };

  const markSymbol = (cell, symbol) => {
    if (board[cell] == "") {
      board[cell] = symbol;
      renderBoard();
      console.log(checkWinner());
      return true;
    } else {
      console.log("Cell is already marked");
      return false;
    }
  };

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = () => {
    let winner = "";
    winningCombinations.forEach((combination) => {
      const a = board[combination[0]];
      const b = board[combination[1]];
      const c = board[combination[2]];
      if (a == b && a == c && a != "") {
        winner = a;
      }
    });
    return winner;
  };

  return { renderBoard, markSymbol, checkWinner };
})();

const Player = (name, symbol) => {
  const getName = () => name;
  const getSymbol = () => symbol;
  return { getName, getSymbol };
};

const displayController = (() => {
  const player1 = Player("Ananda", "X");
  const player2 = Player("Wiradharma", "O");
  let currentPlayerIndex = true;

  const switchPlayer = () => {
    currentPlayerIndex = !currentPlayerIndex;
  };

  const getCurrentPlayer = () => {
    if (currentPlayerIndex) {
      return player1;
    } else {
      return player2;
    }
  };

  const markCell = (cell) => {
    const success = gameBoard.markSymbol(cell, getCurrentPlayer().getSymbol());
    if (success) {
      switchPlayer();
    }
  };
  return { markCell };
})();

with (Array.from(document.getElementsByClassName("cell"))) {
  forEach((cell) => {
    const id = cell.getAttribute("id");
    cell.addEventListener("click", () => {
      displayController.markCell(id);
    });
  });
}
