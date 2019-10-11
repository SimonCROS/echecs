import React from 'react';
import Plateau from './Plateau';
import Pion from './pieces/Pion';
import Tour from './pieces/Tour';
import Cavalier from './pieces/Cavalier';
import Fou from './pieces/Fou';
import Reine from './pieces/Reine';
import Roi from './pieces/Roi';

export default class Game extends React.Component {

  constructor() {
    super();
    this.plateau = React.createRef();
    this.selected = null;
    this.state = {team: "white"};
    this.pions = [
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 0, y: 7}, color: "white"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 1, y: 7}, color: "white"},
      // {alive: true, element: null, type: "fou", defaultLocation: {x: 2, y: 7}, color: "white"},
      // {alive: true, element: null, type: "reine", defaultLocation: {x: 3, y: 7}, color: "white"},
      {alive: true, element: null, type: "roi", defaultLocation: {x: 4, y: 7}, color: "white"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 5, y: 7}, color: "white"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 6, y: 7}, color: "white"},
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 7, y: 7}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 0, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 6}, color: "white"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 6}, color: "white"},
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 0, y: 0}, color: "black"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 1, y: 0}, color: "black"},
      {alive: true, element: null, type: "fou", defaultLocation: {x: 2, y: 0}, color: "black"},
      // {alive: true, element: null, type: "reine", defaultLocation: {x: 3, y: 0}, color: "black"},
      {alive: true, element: null, type: "roi", defaultLocation: {x: 4, y: 0}, color: "black"},
      // {alive: true, element: null, type: "fou", defaultLocation: {x: 5, y: 0}, color: "black"},
      // {alive: true, element: null, type: "cavalier", defaultLocation: {x: 6, y: 0}, color: "black"},
      // {alive: true, element: null, type: "tour", defaultLocation: {x: 7, y: 0}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 0, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 1, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 2, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 3, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 4, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 5, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 6, y: 1}, color: "black"},
      // {alive: true, element: null, type: "pion", defaultLocation: {x: 7, y: 1}, color: "black"}
    ];
    this.kings = [];
    this.whiteEchec = false;
    this.blackEchec = false;
  }

  kill(piece) {
    if (!piece) return;
    this.pions[piece.id].alive = false;
  }

  setSelected(selected) {
    this.selected = selected;
    this.plateau.current.glow(selected, this.selected.getToGlowPossibilities());
  }

  getSelected() {
    return this.selected;
  }

  next() {
    this.selected = null;
    this.plateau.current.glow(null, {glows: [], attacked: [], from: {x: -1, y: -1}});
    this.setState({team: (this.state.team === "white" ? "black" : "white")});
//    this.is();
  }

  register(piece, id) {
    this.pions[id].element = piece;
    if (piece.type === "roi") this.kings.push({color: piece.props.color, element: piece});
  }

  getPieceAt(location, changements = []) {
    for (let e of this.pions) {
      if (e.alive) {
        let eLocation = e.element.state.location;
        if (changements.some(f => f.element === e.element)) eLocation = changements.find(f => f.element === e.element).newPosition;
        if (location.x === eLocation.x && location.y === eLocation.y) {
          return e.element;
        };
      }
    }
    return null;
  }

  /**
  * if newPosition is defined, it returns test with new pofition for piece
  */
  isTeamInEchec(piece, newPosition) {
    return this.isInEchec(this.kings.find(e => e.color === piece.props.color), [{element: piece, newPosition: newPosition}]);
  }

  isInEchec(king, changements) {
    for (let p of this.pions) {
      if (p.alive && p.element !== king.element && p.color !== king.color) {
        if (p.element.canAttack(king.element.state.location, changements)) {
          return true;
        }
      }
    }
    return false;
  }

  render() {
    return (
      <section id="game" className={this.state.team}>
        <Plateau game={this} ref={this.plateau} />
        {this.pions.map((e, i) => {
          if (!e.alive) return null;
          switch (e.type) {
            case "pion":
              return <Pion key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            case "tour":
              return <Tour key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            case "cavalier":
              return <Cavalier key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            case "fou":
              return <Fou key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            case "reine":
              return <Reine key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            case "roi":
              return <Roi key={i} registerId={i} game={this} plateau={this.plateau} color={e.color} defaultLocation={e.defaultLocation} />
            default:
              break;
          }
          return null;
        })}
      </section>
    )
  }
}
