import $ from 'jquery';
import _ from 'lodash';

class Game {
  constructor(roomId) {
    this.roomId = roomId;
    this.firstPlayerCount = 1;
    this.secondPlayerCount = 1;
  }

  // Remove the menu from DOM, display the gameboard and greet the player.
  displayBoard(message) {
    $('#userHello').html(message);
    $('#displayLogin').hide();
    $('#displayBoard').show();
  }

  updateBoard(playerType, tileId) {
	let tile = $('#' + tileId);
	if (this.firstPlayerCount === 11 && this.secondPlayerCount === 11) {
		return;
	}
    if (playerType === 'P1') {
      tile[0].innerText = this.firstPlayerCount;
      tile.css('background-color', 'aquamarine');
      this.firstPlayerCount++;
    } else {
      tile[0].innerText = this.secondPlayerCount;
      tile.css('background-color', 'red');
      this.secondPlayerCount++;
    }
    if (this.firstPlayerCount > 10 && this.secondPlayerCount > 10) {
      this.getWinner();
    }
  }

  getRoomId() {
    return this.roomId;
  }

  getWinner () {
	var blackHole = this.findBlackHole();
	let blackHoleTile = $('#' + blackHole);
	blackHoleTile[0].innerText = '??';
	blackHoleTile.css('background-color', 'black');
    var neighbours = this.getNeighbours(blackHole);
    this.getScore(neighbours);
  }

  findBlackHole () {
    let i, blackHole;
    for(i=0; i < 21; i++) {
      let tile = $('#' + i);
      if (tile[0].innerHTML === '?') {
        blackHole = i;
      }
    }
    return blackHole;
  }

  getNeighbours (blackHole) {
    var boardArray = this.convertBoardToArray();
    var row = Math.floor((-1 + Math.sqrt(1 + 8 * (blackHole))) / 2),
      triangularNumber = row*(row+1)/2,
      column = blackHole - triangularNumber;
	var neighbours = [];
	if ((row-1) >= 0) {
		neighbours.push(boardArray[row-1][column]);
	}
    if ((column-1) >= 0) {
		neighbours.push(boardArray[row][column-1]);
	}
	if ((row-1) >= 0 && (column-1) >= 0) {
        neighbours.push(boardArray[row-1][column-1]);
	}
	if ((row+1) <= 5) {
		neighbours.push(boardArray[row+1][column]);
	}
	if ((column+1) <= 5) {
		neighbours.push(boardArray[row][column+1]);
	}
	if ((row+1) <= 5 && (column+1) <= 5) {
		neighbours.push(boardArray[row+1][column+1]);
	}
    return neighbours;
  }

  convertBoardToArray () {
    let h = 0,
    boardArray = new Array(6);

    for (let i = 0; i < 6; i++) {
      boardArray[i] = new Array(6);
    }

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < 6; j++) {
          boardArray[i][j] = h++;
          if (i === j) {
            break;
          }
      }
    }
    return boardArray;
  }

  getScore (neighbours) {
    let firstCount = 0,
    secondCount = 0;

    _.forEach(neighbours, function (tileId) {
      if (!_.isUndefined(tileId)) {
        let tile = $('#' + tileId);
        if (tile.css('background-color') == 'rgb(127, 255, 212)') {
          firstCount = firstCount + parseInt(tile[0].innerHTML, 10);
        } else {
          secondCount = secondCount + parseInt(tile[0].innerHTML, 10);
        }
      }
    });

    this.setWinner(firstCount, secondCount);
  }

  setWinner (firstCount, secondCount) { //P2 win status is calculated here
    if (firstCount > secondCount) {
      this.score = (firstCount - secondCount);
      this.winner = 'P2';
    } else if (firstCount < secondCount) {
      this.score = (secondCount - firstCount);
      this.winner = 'P1';
    } else {
      this.score = 0;
      this.winner = 'tie';
    }
  }

  displayScore (playerType, winner, score) {
    let scoreBoard = $('#score-board');
    scoreBoard.show();
    if (score === 0) {
      scoreBoard.text('The game ended in tie!');
      return;
    }
    if (winner === playerType) {
      scoreBoard.text('Yay! You won by ' + score + ' points');
    } else {
      scoreBoard.text('Uh oh! You lost by ' + score + ' points');
    }
  }

  resetGame() {
    let i = 0;
    for(i=0; i < 21; i++) {
      let tile = $('#' + i);
      tile[0].innerHTML = '?';
      tile.css('background-color', 'white');
    }
    $('#score-board').hide();
    this.firstPlayerCount = 1;
    this.secondPlayerCount = 1;
    this.winner = '';
    this.score = 0;
  }

}
export default Game;
