const playerFactory  = (marker) => {
  const getMarker = () => marker;
  return {
    getMarker
  };
};

const gameBoardModule =  (()  => {
  const places = ["", "", "", "", "", "", "", "", ""];
  
  const setPlace = (index, marker) => {
    places[index]  = marker;
  };

  const getPlace = (index) => places[index];

  const getPlaces = () => places;

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
    getPlaces,
    getPlayerPlaces
  };
})();

const gameControllerModule = (() => {
  let humanPlayer = undefined;
  let computerPlayer = undefined;
  let activePlayer = undefined;

  const createPlayers = (marker) => {
    if (humanPlayer === undefined && computerPlayer === undefined) {
      humanPlayer = playerFactory(marker);
      computerPlayer = playerFactory(marker === 'X' ? 'O' : 'X');
      activePlayer = humanPlayer;
    }
    return {
      humanPlayer,
      computerPlayer,
      activePlayer
    }
  }
  

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

      // Board is full
      console.log('Board Full?', boardFull());

      // Switch the active player
      swithcActivePlayer();
    }
  }

  const swithcActivePlayer = () => {
    activePlayer == humanPlayer ? (activePlayer = computerPlayer) : (activePlayer = humanPlayer);
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
    for (condition of winConditions) {
        if (isSubset(playerPlaces, condition)) {
          return true;
        };
    }
    return false;
  }

  const isSubset = (array1, array2) => {
    return array2.every((element) => array1.includes(element));
  }

  const boardFull = () => {
    for (place of gameBoardModule.getPlaces()) {
      if (place.length ==0 ) {
        return false;
      }
    }
    return true;
  }

  const takeTurn = (cell) => {
    if (activePlayer === undefined){
      alert('Plese select your marker')
    } else {
      marker = activePlayer.getMarker();
      placeMarker(cell, marker);
    }
  }

  return {
    takeTurn,
    createPlayers
  }
})();

const displayControllerModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const markerBtns = document.querySelectorAll('.marker');

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      gameControllerModule.takeTurn(cell);    
    });
  });

  markerBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      gameControllerModule.createPlayers(btn.textContent);
    });
  });
})();