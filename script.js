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
  let player1 = Player("Ananda", "X");
  let player2 = Player("Wiradharma", "O");
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

  const startGame = () => {
    const input1 = document.getElementById("txtPlayer1");
    const input2 = document.getElementById("txtPlayer2");

    const name1 =
      input1.getAttribute("value") != ""
        ? input1.getAttribute("value")
        : input1.getAttribute("placeholder");

    const name2 =
      input2.getAttribute("value") != ""
        ? input2.getAttribute("value")
        : input2.getAttribute("placeholder");

    player1 = Player(name1, "X");
    player2 = Player(name2, "O");
    currentPlayerIndex = true;
    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    console.log("Game Started");
  };
  return { markCell, startGame };
})();

with (Array.from(document.getElementsByClassName("cell"))) {
  forEach((cell) => {
    const id = cell.getAttribute("id");
    cell.addEventListener("click", () => {
      displayController.markCell(id);
    });
  });
}
