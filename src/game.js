// Instructions per CodeAcademy:
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

import {Board} from "./board.js";

class Game
{
	constructor(rows, cols, bombs)
	{
		this._board = new Board(rows, cols, bombs);

    console.log(`\nWelcome! Let's begin...`)
    this.board.printBoard(this.board.playerBoard);

    // Uncomment these 2 lines to cheat:
    console.log(`Bomb Board:`);
    this.board.printBoard(this.board.bombBoard);
	}

	// Setters
	// N/A

	// Getters
	get board()	{return this._board;}

	// Methods
  // Check tile provided by user input for a bomb. Display game board.
	playMove(row, col)
	{
		console.log(`\nGuess: ${row}, ${col}`);
		console.log(`Bombs: ${this.board.bombs}\n`);

		if(row > -1 && row < this.board.playerBoard.length &&
			 col > -1 && col < this.board.playerBoard[0].length)
		{
			this.board.flipTile(row, col);

			if(this.board.playerBoard[row][col] === `B`)
			{
				console.log(`Oh no! You hit a bomb...`);
			}
			else if(!this.board.safeTiles())
			{
				console.log(`You did it! You've located all the bombs! Winner Winner Chicken Dinner!`);
			}
			else
			{
				console.log(`Current Board:`);
			}
		}
		else
		{
			console.log(`That is an invalid guess.`);
		}

		this.board.printBoard(this.board.playerBoard);
	}

	// Static Methods
  // N/A
}
