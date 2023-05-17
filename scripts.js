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
  const places = new Array(9);
})();

const gameControllerModule = (() => {
  const playerX = playerFactory('X');
  const playerO = playerFactory('O');
  let activePlayer = playerX;

  const placeMarker = (cell, marker) => {
    // Check that the space is open
    if (cell.textContent.length === 0) {
      cell.textContent = marker;
      swithcActivePlayer();
    }
  }

  const swithcActivePlayer = () => {
    activePlayer == playerX ? (activePlayer = playerO) : (activePlayer = playerX);
  }

  const checkWinner = () => {
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

