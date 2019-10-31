import JQuery from 'jquery';
let $ = JQuery;

class Game {
  constructor(roomId) {
    this.roomId = roomId;
  }

  // Remove the menu from DOM, display the gameboard and greet the player.
  displayBoard(message) {
    $('#userHello').html(message);
  }

  updateBoard(playerType, tileId, firstPlayerCount, secondPlayerCount) {
    let tile = $('#' + tileId);
    if (playerType === 'P1') {
      tile[0].innerHTML = firstPlayerCount;
      tile.css('background-color', 'aquamarine');
      firstPlayerCount++;
    } else {
      tile[0].innerHTML = secondPlayerCount;
      tile.css('background-color', 'red');
      secondPlayerCount++;
    }
    if (secondPlayerCount > 10) {
      alert('Game Over');
    }
  }

  getRoomId() {
    return this.roomId;
  }

}
export default Game;
