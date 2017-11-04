"use strict";

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(rows, cols, bombs) {
		_classCallCheck(this, Board);

		this._rows = rows;
		this._cols = cols;
		this._tiles = rows * cols;
		this._bombs = bombs;

		this._playerBoard = Board.generatePlayerBoard(rows, cols);
		this._bombBoard = Board.generateBombBoard(rows, cols, bombs);
	}

	// Setters
	// N/A

	// Getters


	_createClass(Board, [{
		key: "flipTile",


		// Methods
		// Flip a tile at given "rowIndex" and "colIndex". Update playerBoard as necessary.
		value: function flipTile(rowIndex, colIndex) {
			var numRows = this.bombBoard.length;
			var numCols = this.bombBoard[0].length;

			if (rowIndex > -1 && rowIndex < numRows && colIndex > -1 && colIndex < numCols) {
				if (this.playerBoard[rowIndex][colIndex] !== ' ') {
					console.log("This tile has already been flipped!");
					return;
				} else if (this.bombBoard[rowIndex][colIndex] === "B") {
					this.playerBoard[rowIndex][colIndex] = "B";
				} else {
					this.playerBoard[rowIndex][colIndex] = this.getNeighborBombs(rowIndex, colIndex);
				}
			} else {
				console.log("That is an invalid guess.");
			}

			this._tiles--;
		}

		// Report number of bombs in surrounding 9 tiles (up, down, left, right, and diagonals).

	}, {
		key: "getNeighborBombs",
		value: function getNeighborBombs(rowIndex, colIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
			var numRows = this.bombBoard.length;
			var numCols = this.bombBoard[0].length;
			var numBombs = 0;

			neighborOffsets.forEach(function (neighbor) {
				var currRow = rowIndex + neighbor[0];
				var currCol = colIndex + neighbor[1];

				if (currRow > -1 && currRow < numRows && currCol > -1 && currCol < numCols && _this.bombBoard[currRow][currCol] === "B") {
					numBombs++;
				}
			});

			return numBombs;
		}
	}, {
		key: "safeTiles",


		// Return boolean on whether there are still safe tiles left for the user to select.
		value: function safeTiles() {
			return this.tiles > this.bombs;
		}

		// Print board to console.

	}, {
		key: "printBoard",
		value: function printBoard(board) {
			board.forEach(function (tile) {
				return console.log(tile.join(" | "));
			});
		}

		// Static Methods
		// Generate the board the player will see during gameplay.

	}, {
		key: "tiles",
		get: function get() {
			return this._tiles;
		}
	}, {
		key: "bombs",
		get: function get() {
			return this._bombs;
		}
	}, {
		key: "playerBoard",
		get: function get() {
			return this._playerBoard;
		}
	}, {
		key: "bombBoard",
		get: function get() {
			return this._bombBoard;
		}
	}], [{
		key: "generatePlayerBoard",
		value: function generatePlayerBoard(numRows, numCols) {
			var board = [];

			for (var r = 0; r < numRows; r++) {
				var row = [];

				for (var c = 0; c < numCols; c++) {
					row.push(" ");
				}
				board.push(row);
			}

			return board;
		}
	}, {
		key: "generateBombBoard",


		// Generate board with randomized bomb locations. Not seen by player.
		value: function generateBombBoard(numRows, numCols, numBombs) {
			if (numBombs >= numRows * numCols) {
				numBombs = numRows * numCols - 1;
			}

			var board = [];
			for (var r = 0; r < numRows; r++) {
				var row = [];

				for (var c = 0; c < numCols; c++) {
					row.push(" ");
				}
				board.push(row);
			}

			while (numBombs > 0) {
				var randoRow = Math.floor(Math.random() * numRows);
				var randoCol = Math.floor(Math.random() * numCols);

				if (board[randoRow][randoCol] !== "B") {
					board[randoRow][randoCol] = "B";
					numBombs--;
				}
			}

			return board;
		}
	}]);

	return Board;
}();