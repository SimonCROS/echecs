var Piece = require("./Piece.js").Piece;

class Reine extends Piece {

  constructor(location, color, game) {
    super(location, color, "reine", game);
    this.possibilities = [{x: 0, y: 1, width: 7}, {x: 1, y: 1, width: 7}, {x: 1, y: -0, width: 7}, {x: 0, y: -1, width: 7}, {x: -1, y: -1, width: 7}, {x: -1, y: 0, width: 7}, {x: -1, y: 1, width: 7}, {x: 1, y: -1, width: 7}];
  }
}

exports.Reine = Reine;
