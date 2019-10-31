import JQuery from 'jquery';
let $ = JQuery;

class Player {
  constructor(name, type) {
    this.name = name;
    this.type = type;
    this.currentTurn = true;
  }

  // Set the currentTurn for player to turn and update UI to reflect the same.
  setCurrentTurn(turn) {
    this.currentTurn = turn;
    const message = turn ? 'Your turn' : 'Waiting for Opponent';
    $('#turn').text(message);
  }

  getPlayerName() {
    return this.name;
  }

  getPlayerType() {
    return this.type;
  }

  getCurrentTurn() {
    return this.currentTurn;
  }
}
export default Player;
