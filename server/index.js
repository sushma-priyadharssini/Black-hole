const express = require('express');
const path = require('path');
const app = express();

let rooms = 0;

app.use(express.static('.'));

// Handle production
if (process.env.NODE_ENV === 'production') {
	// Static folder
	app.use(express.static(__dirname + '/public/'));
  
	// Handle SPA
	app.get(/.*/, (req, res) => res.sendFile(__dirname + '/public/index.html'));
}

const port = process.env.PORT || 4000;

server = app.listen(port);
const io = require('socket.io')(server);

io.on('connection', (socket) => {
    console.log('connected!');
    // Create a new game room and notify the creator of game.
    socket.on('createGame', (data) => {
        socket.join(`room-${++rooms}`);
        socket.emit('newGame', { name: data.name, room: `room-${rooms}` });
    });

    // Connect the Player 2 to the room he requested. Show error if room full.
    socket.on('joinGame', function (data) {
        var room = io.nsps['/'].adapter.rooms[data.room];
        if (room && room.length === 1) {
            socket.join(data.room);
            socket.broadcast.to(data.room).emit('player1', {});
            socket.emit('player2', { name: data.name, room: data.room })
        } else {
            socket.emit('err', { message: 'Sorry, The room is full!' });
        }
    });

    /**
       * Handle the turn played by either player and notify the other.
       */
    socket.on('playTurn', function (data) {
      socket.broadcast.to(data.room).emit('turnPlayed', {
          tile: data.tile,
          room: data.room
      });
    });

    /**
       * Handle the Game winner to notify the other user
       */
    socket.on('declareWinner', function (data) {
      console.log(data);
      socket.broadcast.to(data.room).emit('winnerDeclared', {
          winner: data.winner,
          score: data.score
      });
    });

    /**
       * Handle the reset Game to notify the other user
       */
    socket.on('resetGame', function (data) {
      socket.broadcast.to(data.room).emit('resetGameBoard', {});
    });

    /**
       * Notify the players about the victor.
       */
    socket.on('gameEnded', (data) => {
        socket.broadcast.to(data.room).emit('gameEnd', data);
    });
});
