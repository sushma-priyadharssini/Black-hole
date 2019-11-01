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
    if (playerType === 'P1') {
      tile[0].innerHTML = this.firstPlayerCount;
      tile.css('background-color', 'aquamarine');
      this.firstPlayerCount++;
    } else {
      tile[0].innerHTML = this.secondPlayerCount;
      tile.css('background-color', 'red');
      this.secondPlayerCount++;
    }
    if (this.secondPlayerCount > 10) {
      this.getWinner();
    }
  }

  getRoomId() {
    return this.roomId;
  }

  getWinner () {
    var blackHole = this.findBlackHole();
    var neighbours = this.getNeighbours(blackHole);
    this.getScore(neighbours)
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

    return [
      boardArray[row-1][column],
      boardArray[row-1][column-1],
      boardArray[row][column-1],
      boardArray[row][column+1],
      boardArray[row+1][column],
      boardArray[row+1][column+1]
    ];
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

    this.getWinner(firstCount, secondCount);
  }

  getWinner (firstCount, secondCount) { //P2 win status is calculated here
    if (firstCount > secondCount) {
      this.score = (firstCount - secondCount);
      this.winner = 'P2';
    } else if (firstCount < secondCount) {
      this.score = (secondCount - firstCount);
      this.winner = 'P1';
    } else {
      this.score = 0;
    }
  }

  resetGame() {
    let i = 0;
    for(i=0; i < 21; i++) {
      let tile = $('#' + i);
      tile[0].innerHTML = '?';
      tile.css('background-color', 'white');
    }
    this.firstPlayerCount = 1;
    this.secondPlayerCount = 1;
  }

}
export default Game;
