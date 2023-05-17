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
  
  const setPlace = (index, marker) => {
    places[index]  = marker;
  };

  const getPlace = (index) => places[index];

  const getPlayerPlaces = (marker) => {
    let playerPlaces = [];
    for (index in places) {
      if (places[index] === marker) {
        playerPlaces.push(parseInt(index));
      }
    }

    return playerPlaces;
  };

  return {
    setPlace,
    getPlace,
    getPlayerPlaces
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
      console.log('Winner? ',  checkWinner(marker));

      // Check if there's a tie
      console.log('Tie?', checkTie());

      // Switch the active player
      swithcActivePlayer();
    }
  }

  const swithcActivePlayer = () => {
    activePlayer == playerX ? (activePlayer = playerO) : (activePlayer = playerX);
  }

  const checkWinner = (marker) => {
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

    playerPlaces = gameBoardModule.getPlayerPlaces(marker);
    for (condition in winConditions) {
        if (isSubset(playerPlaces, winConditions[condition])) {
          return true;
        };
    }
    return false;
  }

  const isSubset = (array1, array2) => {
    return array2.every((element) => array1.includes(element));
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

