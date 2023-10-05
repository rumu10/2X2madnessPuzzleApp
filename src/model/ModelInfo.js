import { config_4x4, config_5x5, config_6x6 } from "../Configs"

export class Square {
    constructor(r, c, color) {
        this.row = r
        this.column = c
        this.color = color
    }
}

export class Board {
    constructor(config) {
        this.squares = []
        this.size = parseInt(config.numColumns);
        this.selectedGroup= [];

        for (let csq of config.baseSquares) {
            let sq = new Square(parseInt(csq.row), parseInt(csq.column), csq.color)
            this.squares.push(sq)
        }
    }
}


export default class Model {
    constructor() {
        this.configs = [config_4x4, config_5x5, config_6x6]
        this.currentConfig = 0;
        this.board = new Board(this.configs[this.currentConfig]);
        this.victory = false;
        this.isRemoved = false;
        this.moveCount = 0;
    }

    chooseConfig(size){
        this.currentConfig = size;
        this.board = new Board(this.configs[this.currentConfig]);
    }

    checkAndRemoveGroups(board) {
        const colorsToRemove = new Set(); // Store colors to remove

        // Iterate over all squares in the board
        for (const square of board.squares) {
            // const { row, column, color } = square;
            const group = [];

            // Check for a 2x2 group starting from the current square
            for (let i = 0; i < 2; i++) {
                for (let j = 0; j < 2; j++) {
                    const nextRow = square?.row + i;
                    const nextColumn = square?.column + j;
                    const nextSquare = board?.squares.find(
                        (sq) => sq?.row === nextRow && sq?.column === nextColumn
                    );

                    if (nextSquare && nextSquare?.color === square?.color && nextSquare?.color !=='white') {
                        group.push(nextSquare);
                    } else {
                        group.length = 0; // Clear the group if it's not all the same color
                    }
                }
            }

            // If a group of four squares with the same color is found, mark the color for removal
            if (group.length === 4) {
                console.log(group, 'grp');
                board.selectedGroup.length = 0;
                this.moveCount = this.moveCount + 1;
                colorsToRemove.add(square?.color);
            }
        }

        // Change the color of squares with colors marked for removal to white
        for (const color of colorsToRemove) {
            for (const square of board.squares) {
                if (square?.color === color) {
                    square.color = "white";
                }
            }
        }

        //check if everysquare is white to print congratulation mssg
        const isAllWhite = this.areAllSquaresWhite(board.squares);
        if (isAllWhite) {
            this.victory = true;
        }
    }

    reset() {
        if (this.board) {
            this.currentConfig = 0;
            this.board = new Board(this.configs[this.currentConfig]);
            this.victory = false;
            this.moveCount = 0;
        }
      }

    areAllSquaresWhite(config) {
        // Use the `every` method to check if every square has the color white
        return config.every((square) => square?.color === "white");
    }
}
