<template>
  <v-app>
    <v-container  v-show='displayLogin' fluid>
      <v-row>
        <h4>Create a new Game</h4>
        <v-col cols="4" md="4">
          <v-text-field v-model="firstPlayerName" label="Enter your name" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-btn v-on:click="newGame" small>New Game</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <h4>Join an existing game</h4>
        <v-col cols="4" md="4">
          <v-text-field v-model="secondPlayerName" label="Enter your name" required></v-text-field>
        </v-col>
        <v-col cols="4" md="4">
          <v-text-field v-model="roomID" label="Enter Game ID" required></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="4">
          <v-btn v-on:click="joinGame" small>Join Game</v-btn>
        </v-col>
      </v-row>
    </v-container>
    <v-container  v-show='displayBoard' fluid>
      <h2 id="userHello"></h2>
      <h3 id="turn"></h3>
    <v-row>
      <v-col cols="12">
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <!-- <v-card v-for="n in 1" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
          <v-card class="ma-2 pa-2" id="0" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <!-- <v-card v-for="n in 2" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
          <v-card class="ma-2 pa-2" id="1" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="2" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <!-- <v-card v-for="n in 3" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
          <v-card class="ma-2 pa-2" id="3" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="4" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="5" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <!-- <v-card v-for="n in 4" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
          <v-card class="ma-2 pa-2" id="6" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="7" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="8" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="9" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="align" :justify="justify" class="grey lighten-5">
        <!-- <v-card v-for="n in 5" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
        <v-card class="ma-2 pa-2" id="10" v-on:click="markClicked" outlined tile>?</v-card>
        <v-card class="ma-2 pa-2" id="11" v-on:click="markClicked" outlined tile>?</v-card>
        <v-card class="ma-2 pa-2" id="12" v-on:click="markClicked" outlined tile>?</v-card>
        <v-card class="ma-2 pa-2" id="13" v-on:click="markClicked" outlined tile>?</v-card>
        <v-card class="ma-2 pa-2" id="14" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <!-- <v-card v-for="n in 6" v-bind:key="n" class="ma-2 pa-2" v-on:click="markClicked" outlined tile>?</v-card> -->
          <v-card class="ma-2 pa-2" id="15" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="16" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="17" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="18" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="19" v-on:click="markClicked" outlined tile>?</v-card>
          <v-card class="ma-2 pa-2" id="20" v-on:click="markClicked" outlined tile>?</v-card>
        </v-row>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12">
        <v-row :align="align" :justify="justify" class="grey lighten-5">
          <v-btn small>Reset</v-btn>
        </v-row>
    </v-col>
  </v-row>
  </v-container>
  </v-app>
</template>
<script src="http://code.jquery.com/jquery-latest.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/2.0.4/socket.io.js"></script>
<script>
let firstPlayerCount = 1,
secondPlayerCount = 1,
player, game;
const socket = io.connect('http://localhost:4000');

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

class Game {
  constructor(roomId) {
    this.roomId = roomId;
    }

  // Remove the menu from DOM, display the gameboard and greet the player.
  displayBoard(message) {
    $('#userHello').html(message);
  }

  updateBoard(playerType, tile) {
    console.log(playerType);
    console.log(tile);
    if (playerType === 'P1') {
      tile.innerHTML = firstPlayerCount;
      tile.style.backgroundColor = 'aquamarine';
      firstPlayerCount++;
    } else {
      tile.innerHTML = secondPlayerCount;
      tile.style.backgroundColor = 'red';
      secondPlayerCount++;
    }
    if (firstPlayerCount > 10 || secondPlayerCount > 10) {
      alert('Game Over');
    }
  }

  getRoomId() {
    return this.roomId;
  }

  // Send an update to the opponent to update their UI's tile
  playTurn(tile, roomId) {
    // Emit an event to update other player that you've played your turn.
    console.log('playTurn function')
    socket.emit('playTurn', {
      tile: tile,
      room: roomId,
    });
  }
}


// New Game created by current client. Update the UI and create new Game var.
socket.on('newGame', (data) => {
  const message =
    `Hello, ${data.name}. Please ask your friend to enter Game ID:
    ${data.room}. Waiting for player 2...`;

  // Create game for player 1
  console.log(data.room);
  game = new Game(data.room);
  game.displayBoard(message);
});

//Update UI for player 1 after player 2 has joined game
socket.on('player1', (data) => {
  const message = `Hello, ${player.getPlayerName()}`;
  $('#userHello').html(message);
  player.setCurrentTurn(true);
});

//Update UI for player 2
socket.on('player2', (data) => {
  const message = `Hello, ${data.name}`;

  // Create game for player 2
  game = new Game(data.room);
  game.displayBoard(message);
  player.setCurrentTurn(false);
});

//Opponent played his turn. Update UI. Allow the current player to play now.
socket.on('turnPlayed', (data) => {
  console.log('Turn Played');
  const opponentType = player.getPlayerType() === 'P1' ? 'P2' : 'P1';
  console.log(opponentType + " " + data.tile);
  game.updateBoard(opponentType, data.tile);
  player.setCurrentTurn(true);
});

export default {
  name: 'App',
  data () {
      return {
        justify: 'center',
        align: 'center',
        key: 0,
        displayBoard: false,
        displayLogin: true,
        firstPlayerName: '',
        secondPlayerName: '',
        roomID: ''
      }
  },
  methods: {
    markClicked (event) {
      if (!player.getCurrentTurn() || !game) {
        alert('Its not your turn!');
        return;
      }
      console.log(event);
      // Update board after your turn.
      if (event.srcElement.innerText === '?') {
        console.log(game.getRoomId());
        game.playTurn(event.srcElement, game.getRoomId());
        game.updateBoard(player.getPlayerType(), event.srcElement);
        player.setCurrentTurn(false);
      }
    },
    newGame () {
      if (!this.firstPlayerName.length) {
        alert('Please enter your name.');
        return;
      }
      socket.emit('createGame', { name : this.firstPlayerName });
      player = new Player(this.firstPlayerName, 'P1');
      this.displayLogin = false;
      this.displayBoard = true;
    },
    joinGame () {
      if (!this.secondPlayerName.length || !this.roomID) {
        alert('Please enter your name and game ID.');
        return;
      }
      socket.emit('joinGame', { name: this.secondPlayerName, room: this.roomID });
      player = new Player(this.secondPlayerName, 'P2');
      this.displayLogin = false;
      this.displayBoard = true;
    },
    getCurrentPlayerValue () {
      return ;
    },
    getCurrentPlayer () {
      return ;
    }
  }
};
</script>
<style>
</style>
