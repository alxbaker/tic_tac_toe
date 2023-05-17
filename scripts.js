const playerFactory  = (marker) => {
  const getMarker = () => marker;
  return {
    getMarker
  };
};

const displayControllerModule = (() => {
  const cells = document.querySelectorAll('.cell');

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      gameControllerModule.takeTurn(cell);    
    });
  });
})();

const gameBoardModule =  (()  => {
  const places = ["", "", "", "", "", "", "", "", ""];
  const setPlace = (index, marker) => places[index]  = marker;
  const getPlace = (index) => places[index];
  return {
    setPlace,
    getPlace
  };
})();

const gameControllerModule = (() => {
  const playerX = playerFactory('X');
  const playerO = playerFactory('O');
  let activePlayer = playerX;

  const placeMarker = (cell, marker) => {
    // Get the cell index
    cellIndex = parseInt(cell.dataset.index);

    // Check that the space is open
    if (cell.textContent.length === 0) {
      // Set array value to player marker
      gameBoardModule.setPlace(cellIndex, marker);

      // Set DOM element to player marker
      cell.textContent = marker;

      // Check if the player won
      console.log('Winner? ',  checkWinner());

      // Switch the active player
      swithcActivePlayer();
    }
  }

  const swithcActivePlayer = () => {
    activePlayer == playerX ? (activePlayer = playerO) : (activePlayer = playerX);
  }

  const checkWinner = () => {
    const winConditions = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  }

  const checkTie = () => {
  
  }

  const takeTurn = (cell) => {
    marker = activePlayer.getMarker();
    placeMarker(cell, marker);
  }

  return {
    takeTurn
  }
})();

