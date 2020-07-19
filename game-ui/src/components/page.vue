<template>
  <v-container fluid>
    <div id='displayLogin'>
      <h2 id="game-title">Black Hole Game</h2>
      <v-row>
        <ul>
          <li>Black Hole is a two-player strategy game where each player starts with 10 tiles numbered 1 through 10. </li>
          <li>The number on the tiles represent both their values and the order in which they are placed onto a triangular board.
          <li>The board has 21 spaces so one space remains uncovered. </li>
          <li> Once all the tiles have been placed, the tiles that surround the empty space are sucked into the black hole. </li>
          <li>The objective of the game is to have fewer points sucked into the black hole (so you have the higher overall score remaining on the board) than the other player.</li>
        </ul>
      </v-row>
      <div id="loginForm">
        <v-row align="center" justify="center">
          <v-col cols="8">
            <v-text-field  v-model="playerName" label="Enter your name" outlined required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-btn v-on:click="newGame" color="success" rounded x-large>New Game</v-btn>
          <v-spacer></v-spacer>
          <v-btn v-on:click="openRoomDialog" color="orange" rounded x-large>Join Game</v-btn>
        </v-row>
      </div>
    </div>
    <div id='displayBoard'>
      <h2 id="userHello"></h2>
      <h3 id="turn"></h3>
      <h1 id="score-board"></h1>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="0" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="1" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="2" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="3" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="4" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="5" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="6" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="7" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="8" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="9" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="10" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2" id="11" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2" id="12" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2" id="13" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2" id="14" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-card class="ma-2 pa-2 tile" id="15" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="16" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="17" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="18" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="19" v-on:click="markClicked" outlined tile>?</v-card>
            <v-card class="ma-2 pa-2 tile" id="20" v-on:click="markClicked" outlined tile>?</v-card>
          </v-row>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-row align="center" justify="center" class="grey lighten-5">
            <v-btn @click="resetGame" small>Reset</v-btn>
          </v-row>
        </v-col>
      </v-row>
    </div>
    <v-dialog v-model="dialog" persistent max-width="400px">
      <v-card>
        <v-card-title>
          <span class="headline">Join a Room</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Enter Room Id " v-model="roomId" required></v-text-field>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" text v-on:click="joinGame">Join</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>
<script>
import $ from 'jquery';
import io from 'socket.io-client';
import Player from '../helpers/player';
import Game from '../helpers/game';

let canStart = false,
player, game;

const socket = io.connect('/');

// New Game created by current client. Update the UI and create new Game var.
socket.on('newGame', (data) => {
  const message = `Hello, ${data.name}. Please ask your friend to enter Game ID:
    ${data.room}. Waiting for player 2...`;
  game = new Game(data.room); // Create game for player 1
  game.displayBoard(message);
});

//Update UI for player 1 after player 2 has joined game
socket.on('player1', () => {
  const message = `Hello, ${player.getPlayerName()}`;
  $('#userHello').html(message);
  player.setCurrentTurn(true);
  canStart = true;
});

//Update UI for player 2
socket.on('player2', (data) => {
  const message = `Hello, ${data.name}`;
  game = new Game(data.room); // Create game for player 2
  game.displayBoard(message);
  player.setCurrentTurn(false);
  canStart = true;
});

//Opponent played his turn. Update UI. Allow the current player to play now.
socket.on('turnPlayed', (data) => {
  const opponentType = player.getPlayerType() === 'P1' ? 'P2' : 'P1';
  game.updateBoard(opponentType, data.tile);
  player.setCurrentTurn(true);
});

//Notify the winner and score to the first player
socket.on('winnerDeclared', (data) => {
  game.displayScore(player.getPlayerType(), data.winner, data.score);
});

//reset Game board for the opponent.
socket.on('resetGameBoard', () => {
  game.resetGame();
  player.setCurrentTurn(false);
});

export default {
  name: 'App',
  data () {
      return {
        key: 0,
        dialog: false,
        playerName: '',
        roomId: ''
      }
  },
  methods: {
    markClicked (event) {
      if (!canStart) {
        alert('Wait for the Opponent to Join');
        return;
      }
      if (!player.getCurrentTurn() || !game) {
        alert('Its not your turn!');
        return;
      } else if (event.srcElement.innerText === '?') {
        this.playTurn(event.srcElement.id, game.getRoomId());
        game.updateBoard(player.getPlayerType(), event.srcElement.id);
        if (game.winner) {
          socket.emit('declareWinner', { room : game.getRoomId(), winner: game.winner, score: game.score });
          game.displayScore(player.getPlayerType(), game.winner, game.score);
        }
        player.setCurrentTurn(false);
      }
    },

    playTurn (tile, roomId) { // Emit an event to update other player that you've played your turn.
      socket.emit('playTurn', { tile: tile, room: roomId });
    },

    newGame () {
      if (!this.playerName.length) {
        alert('Please enter your name.');
        return;
      }
      socket.emit('createGame', { name : this.playerName });
      player = new Player(this.playerName, 'P1');
    },

    joinGame () {
      this.dialog = false;
      if (!this.roomId) {
        alert('Please enter your name and game ID.');
        return;
      }
      socket.emit('joinGame', { name: this.playerName, room: this.roomId });
      player = new Player(this.playerName, 'P2');
    },

    openRoomDialog () {
      if (!this.playerName.length) {
        alert('Please enter your name.');
        return;
      }
      this.dialog = true;
    },

    resetGame () {
      socket.emit('resetGame', { room: game.getRoomId() });
      game.resetGame();
      player.setCurrentTurn(true);
    }
  }
};
</script>
<style>
  #game-title {
    text-align: center;
  }

  #loginForm {
    margin: 10%;
  }

  #displayBoard {
    display: none;
  }

  #score-board {
    text-align: center;
    display: none;
  }
</style>
