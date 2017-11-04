export class Board
{
	constructor(rows, cols, bombs)
	{
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
	get tiles()				{return this._tiles;}
	get bombs()				{return this._bombs;}
	get playerBoard()	{return this._playerBoard;}
	get bombBoard()		{return this._bombBoard;}

	// Methods
  // Flip a tile at given "rowIndex" and "colIndex". Update playerBoard as necessary.
	flipTile(rowIndex, colIndex)
	{
		const numRows = this.bombBoard.length;
		const numCols = this.bombBoard[0].length;

		if(rowIndex > -1 && rowIndex < numRows &&
			 colIndex > -1 && colIndex < numCols)
		{
			if(this.playerBoard[rowIndex][colIndex] !== ' ')
			{
				console.log("This tile has already been flipped!");
				return;
			}
			else if(this.bombBoard[rowIndex][colIndex] === "B")
			{
				this.playerBoard[rowIndex][colIndex] = "B";
			}
			else
			{
				this.playerBoard[rowIndex][colIndex] = this.getNeighborBombs(rowIndex, colIndex);
			}
		}
		else {
			console.log("That is an invalid guess.");
		}

		this._tiles--;
	}

  // Report number of bombs in surrounding 9 tiles (up, down, left, right, and diagonals).
	getNeighborBombs(rowIndex, colIndex)
	{
		const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,1]];
		const numRows = this.bombBoard.length;
		const numCols = this.bombBoard[0].length;
		let numBombs = 0;

		neighborOffsets.forEach(neighbor =>
		{
			let currRow = rowIndex + neighbor[0];
			let currCol = colIndex + neighbor[1];

			if(currRow > -1 && currRow < numRows &&
				 currCol > -1 && currCol < numCols &&
				 this.bombBoard[currRow][currCol] === "B")
			{
						numBombs++;
			}
		});

		return numBombs;
	};

  // Return boolean on whether there are still safe tiles left for the user to select.
	safeTiles()
	{
		return this.tiles > this.bombs;
	}

  // Print board to console.
	printBoard(board)
	{
		board.forEach(tile => console.log(tile.join(" | ")));
	}

	// Static Methods
  // Generate the board the player will see during gameplay.
	static generatePlayerBoard(numRows, numCols)
	{
		let board = [];

		for(let r = 0; r < numRows; r++)
		{
			let row = [];

			for(let c = 0; c < numCols; c++)
			{
				row.push(" ");
			}
			board.push(row);
		}

		return board;
	};

  // Generate board with randomized bomb locations. Not seen by player.
	static generateBombBoard(numRows, numCols, numBombs)
	{
		if(numBombs >= numRows*numCols) {numBombs = numRows*numCols - 1;}

		let board = [];
		for(let r = 0; r < numRows; r++)
		{
			let row = [];

			for(let c = 0; c < numCols; c++)
			{
				row.push(" ");
			}
			board.push(row);
		}

		while(numBombs > 0)
		{
			let randoRow = Math.floor(Math.random()*numRows);
			let randoCol = Math.floor(Math.random()*numCols);

			if(board[randoRow][randoCol] !== "B")
			{
				board[randoRow][randoCol] = "B";
				numBombs--;
			}
		}

		return board;
	};
}
