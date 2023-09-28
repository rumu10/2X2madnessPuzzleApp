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
        this.moveCount = 0;
    }

    // select(configIndex) {
    //     this.currentConfig = configIndex;
    //     this.board = new Board(this.configs[configIndex]);
    //     this.moveCount = 0;
    //     this.victory = false;
    //   }

    reset() {
        if (this.board) {
            this.currentConfig = 0;
            this.board = new Board(this.configs[this.currentConfig]);
            this.victory = false;
            this.moveCount = 0;
        }
      }
}
