// Gameboard Module.
const gameBoard = (() => {
  // Initialize empty board array.
  let board = Array(9).fill("");

  const renderBoard = () => {
    // Change cell's innertext based on board array value.
    board.forEach((symbol, index) => {
      document.getElementById(index).innerText = symbol;
    });
  };

  const markSymbol = (cell, symbol) => {
    if (board[cell] == "") {
      // Check if current cell is blank before continue the process.
      board[cell] = symbol; // Assign symbol to board array.
      renderBoard();
      return true;
    } else {
      return false;
    }
  };

  const checkTie = () => {
    const cells = Array.from(document.getElementsByClassName("cell")); // get all cell element.
    let tie = true;
    for (let cell of cells) {
      if (cell.innerText == "") {
        tie = false; // If there is at least one element '', then return false.
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
  ]; // Manual written winning combination.

  const checkWinner = () => {
    let winner = undefined;
    winningCombinations.forEach((combination) => {
      const a = board[combination[0]];
      const b = board[combination[1]];
      const c = board[combination[2]];
      if (a == b && a == c && a != "") {
        // check if 3 cell of winning combination has same value and not ''.
        winner = a;
      }
    });
    if (checkTie()) {
      // check if tie.
      winner = "tie";
    }
    return winner;
  };

  const resetBoard = () => {
    board = Array(9).fill(""); // reset board to empty array.
    renderBoard();
  };

  return { markSymbol, checkWinner, resetBoard, checkTie };
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
      switchPlayer(); // change turn.
      if (gameBoard.checkWinner()) {
        // check winner.
        let winText = "";

        if (gameBoard.checkWinner() == "X") {
          winText = `${player1.getName()}<br>WIN !!!`;
        } else if (gameBoard.checkWinner() == "O") {
          winText = `${player2.getName()}<br>WIN !!!`;
        } else if (gameBoard.checkWinner() == "tie") {
          winText = `TIE !!!`;
        } // make text to show based on the checkWinner function response.

        document.getElementById("game").classList.add("hidden"); //Hide game element.

        // Show menu and winner display element.
        with (document.getElementById("winnerDisplay")) {
          innerHTML = winText;
          classList.remove("hidden");
        }
        document.getElementById("menu").classList.remove("hidden");
        //
      }
    }
  };

  const startGame = () => {
    // get input elements
    const input1 = document.getElementById("txtPlayer1");
    const input2 = document.getElementById("txtPlayer2");
    //

    // get value from input, if null the take the placeholder.
    const name1 = input1.value || input1.getAttribute("placeholder");
    const name2 = input2.value || input2.getAttribute("placeholder");
    //

    // assign player1 and player2 with new instance of function factory Player with new name.
    player1 = Player(name1.toUpperCase(), "X");
    player2 = Player(name2.toUpperCase(), "O");
    //

    gameBoard.resetBoard(); // reset board
    currentPlayerIndex = true; // resert turn

    // hide winner display and menu element.
    document.getElementById("winnerDisplay").classList.add("hidden");
    document.getElementById("menu").classList.add("hidden");
    //

    document.getElementById("game").classList.remove("hidden"); // show game element
  };
  return { startGame, markCell };
})();

// Assign onclick event to each cell to call function with cell's id as parameter.
with (Array.from(document.getElementsByClassName("cell"))) {
  forEach((cell) => {
    const id = cell.getAttribute("id");
    cell.addEventListener("click", () => {
      displayController.markCell(id);
    });
  });
}
//
