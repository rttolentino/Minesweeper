class Game
{
	constructor(rows, cols, bombs)
	{
		this._board = new Board(rows, cols, bombs);
	}

	// Setters
	//set board(rows, cols, bombs)	{this._board = new Board(rows, cols, bombs);}

	// Getters
	get board()	{return this._board;}

	// Methods
	playMove(row, col)
	{
		console.log(`Guess: ${row}, ${col}`);
		console.log(`Bombs: ${this.board.bombs}`);

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
		this.board.printBoard();
	}

	// Static Methods
}

class Board
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
	//set tiles(rows, cols)							{this._times = rows * cols;}
	set bombs(bombs)									{this._bombs = bombs;}
	//set playerBoard(rows, cols)				{this._playerBoard = Board.generatePlayerBoard(rows, cols);}
	//set bombBoard(rows, cols, bombs)	{this._bombBoard = Board.generateBombBoard(rows, cols, bombs);}

	// Getters
	get tiles()				{return this._tiles;}
	get bombs()				{return this._bombs;}
	get playerBoard()	{return this._playerBoard;}
	get bombBoard()		{return this._bombBoard;}

	// Methods
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

	getNeighborBombs(rowIndex, colIndex)
	{
		const neighborOffsets = [[-1,-1], [-1,0], [-1,1], [0,-1], [0,1], [1,-1], [1,0], [1,-1]];
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

	safeTiles()
	{
		return this.tiles !== this.bombs;
	}

	printBoard()
	{
		this._playerBoard.forEach(tile => console.log(tile.join(" | ")));
	}

	// Static Methods
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
		//board.forEach(b => console.log(b.join(" | ")));
		return board;
	};

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

let boardRows = Math.floor(Math.random()*3)+3;
let boardCols = Math.floor(Math.random()*3)+3;

const g = new Game(boardRows, boardCols, Math.round(Math.random()*(boardRows*boardCols))+1);
g.playMove(Math.floor(Math.random()*g.board.playerBoard.length), Math.floor(Math.random()*g.board.playerBoard[0].length));
//g.playMove(Math.floor(Math.random()*g.board.playerBoard.length)*(Math.round((Math.random()*2)-1)), Math.floor(Math.random()*g.board.playerBoard[0].length)*(Math.round((Math.random()*2)-1)))
