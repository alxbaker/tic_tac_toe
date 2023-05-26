const playerFactory  = (marker, name) => {
  const getMarker = () => marker;
  const getName  = () => name
  return {
    getMarker,
    getName
  };
};

const gameBoardModule =  (()  => {
  const places = ["", "", "", "", "", "", "", "", ""];
  
  const setPlace = (index, marker) => {
    places[index]  = marker;
  };

  const reset = () => {
    for (let i = 0; i < places.length; i++) {
      places[i] = "";
    }
  }

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
    getPlayerPlaces,
    reset
  };
})();

const gameControllerModule = (() => {
  let humanPlayer = undefined;
  let computerPlayer = undefined;
  let activePlayer = undefined;

  const reset = () => {
    humanPlayer = undefined;
    computerPlayer = undefined;
    activePlayer = undefined;
  }

  const createPlayers = (marker, name) => {
    if (humanPlayer === undefined && computerPlayer === undefined) {
      humanPlayer = playerFactory(marker, name);
      computerPlayer = playerFactory(marker === 'X' ? 'O' : 'X', "Computer");
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

    // Check that the space is open and that there is no winner
    if (cell.textContent.length === 0 && !checkWinner(computerPlayer.getMarker()) && !checkWinner(humanPlayer.getMarker())) {
      // Set array value to player marker
      gameBoardModule.setPlace(cellIndex, marker);

      // Set DOM element to player marker
      cell.textContent = marker;

      // Check if the player won
      if (checkWinner(marker)) {
        if (activePlayer == humanPlayer) {
          displayControllerModule.sendResult(`Congrats ${activePlayer.getName()}! You won!`)
        } else if (activePlayer == computerPlayer) {
          displayControllerModule.sendResult(`Aww you lost! Better luck next time.`)
        }
      }

      // Board is full
      if (boardFull() && !checkWinner(marker)) {
        displayControllerModule.sendResult(`It's a tie!`)
      }

      // Make computer move if turn is for human player
      if (activePlayer == humanPlayer) {
        switchActivePlayer();
        makeComputerMove();
      } else {
        switchActivePlayer();
      }

   
    }
  }

  const makeComputerMove = () => {
    for (const [index, place] of gameBoardModule.getPlaces().entries()) {
      if (place.length == 0) {
        placeMarker(displayControllerModule.getCellByIndex(index), activePlayer.getMarker());
        break;
      } 
    };
  }

  const switchActivePlayer = () => {
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
      if (place.length == 0) {
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
    createPlayers,
    reset
  }
})();

const displayControllerModule = (() => {
  const cells = document.querySelectorAll('.cell');
  const startBtn = document.querySelector('#start-btn');
  const resetBtn = document.querySelector('#reset-btn');

  const reset = () => {
    cells.forEach((cell) => {
      cell.textContent = "";
    })
  }

  cells.forEach((cell) => {
    cell.addEventListener('click', () => {
      gameControllerModule.takeTurn(cell);    
    });
  });

  startBtn.addEventListener('click', (event) => {
    event.preventDefault();
    firstName = document.getElementById('first_name').value;
    marker = document.querySelector('input[type=radio]:checked').value;
    gameControllerModule.createPlayers(marker, firstName);
  });

  resetBtn.addEventListener('click', (event) => {
    gameBoardModule.reset();
    gameControllerModule.reset();
    reset();
  });

  function sendResult(message) {
    requestAnimationFrame(() => {requestAnimationFrame(() => {alert(message)})});
  }

  function getCellByIndex(index) {
    return document.querySelector(`[data-index = '${index}']`);
  }

  return {
    sendResult,
    getCellByIndex
  }
})();