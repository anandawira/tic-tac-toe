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
      return true;
    } else {
      console.log("Cell is already marked");
      return false;
    }
  };

  const checkTie = () => {
    const cells = Array.from(document.getElementsByClassName("cell"));
    let tie = true;
    for (let cell of cells) {
      if (cell.innerText == "") {
        tie = false;
        break;
      }
    }
    return tie;
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
    winner = undefined;
    winningCombinations.forEach((combination) => {
      const a = board[combination[0]];
      const b = board[combination[1]];
      const c = board[combination[2]];
      if (a == b && a == c && a != "") {
        winner = a;
      }
    });
    if (checkTie()) {
      winner = "tie";
    }
    return winner;
  };

  const resetBoard = () => {
    board = Array(9).fill("");
    renderBoard();
  };

  return { renderBoard, markSymbol, checkWinner, resetBoard, checkTie };
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
      if (gameBoard.checkWinner()) {
        let winText = "";
        if (gameBoard.checkWinner() == "X") {
          winText = `${player1.getName()}<br>WIN !!!`;
        } else if (gameBoard.checkWinner() == "O") {
          winText = `${player2.getName()}<br>WIN !!!`;
        } else if (gameBoard.checkWinner() == "tie") {
          winText = `TIE !!!`;
        }

        document.getElementById("game").classList.add("hidden");
        with (document.getElementById("winnerDisplay")) {
          innerHTML = winText;
          classList.remove("hidden");
        }
        document.getElementById("menu").classList.remove("hidden");
      }
    }
  };

  const startGame = () => {
    const input1 = document.getElementById("txtPlayer1");
    const input2 = document.getElementById("txtPlayer2");

    const name1 = input1.value || input1.getAttribute("placeholder");
    const name2 = input2.value || input2.getAttribute("placeholder");

    player1 = Player(name1.toUpperCase(), "X");
    player2 = Player(name2.toUpperCase(), "O");
    gameBoard.resetBoard();
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
