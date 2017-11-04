"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // Instructions per CodeAcademy:
//
// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require("./board.js");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
	function Game(rows, cols, bombs) {
		_classCallCheck(this, Game);

		this._board = new _board.Board(rows, cols, bombs);

		console.log("\nWelcome! Let's begin...");
		this.board.printBoard(this.board.playerBoard);

		// Uncomment these 2 lines to cheat:
		console.log("Bomb Board:");
		this.board.printBoard(this.board.bombBoard);
	}

	// Setters
	// N/A

	// Getters


	_createClass(Game, [{
		key: "playMove",


		// Methods
		// Check tile provided by user input for a bomb. Display game board.
		value: function playMove(row, col) {
			console.log("\nGuess: " + row + ", " + col);
			console.log("Bombs: " + this.board.bombs + "\n");

			if (row > -1 && row < this.board.playerBoard.length && col > -1 && col < this.board.playerBoard[0].length) {
				this.board.flipTile(row, col);

				if (this.board.playerBoard[row][col] === "B") {
					console.log("Oh no! You hit a bomb...");
				} else if (!this.board.safeTiles()) {
					console.log("You did it! You've located all the bombs! Winner Winner Chicken Dinner!");
				} else {
					console.log("Current Board:");
				}
			} else {
				console.log("That is an invalid guess.");
			}

			this.board.printBoard(this.board.playerBoard);
		}

		// Static Methods
		// N/A

	}, {
		key: "board",
		get: function get() {
			return this._board;
		}
	}]);

	return Game;
}();