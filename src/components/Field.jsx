import styles from "../styles/modules/Field.module.scss";

import { Component } from "react";

import Cell from "./Cell";

class Field extends Component {
  constructor(props) {
    super(props);
    this.size = props.size;
    this.difficulty = props.difficulty;
  }

  generateCells = (size, difficulty) => {
    let cells = new Array(size);

    for (let x = 0; x < cells.length; x++) {
      cells[x] = new Array(size);
      for (let y = 0; y < cells.length; y++) {
        cells[x][y] = Math.round(Math.random() - difficulty);
        if (cells[x][y] !== 0) {
          cells[x][y] = -cells[x][y];
        }
      }
    }

    return cells;
  };

  cells = this.generateCells(this.props.size, this.props.difficulty);

  countBombsAround = (cells, row, col, size) => {
    let count = 0;

    const rowMaxLimit = row === size - 1 ? size - 1 : row + 1;
    const rowMinLimit = row === 0 ? row : row - 1;

    for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
      for (let x = col - 1; x <= col + 1; x++) {
        if (x < 0 || x >= size) continue;
        if (cells[y][x] === -1) count++;
      }
    }

    return count;
  };

  countBombs = () => {
    let counter = 0;
    this.cells.forEach((item) => {
      item.forEach((cell) => {
        if (cell === -1) counter++;
      });
    });
    return counter;
  };

  state = {
    isEnded: false,
    isStarted: false,
    cells: this.cells.map((row, rowIndex) =>
      row.map((_, colIndex) => ({
        index: colIndex + rowIndex * 10,
        isChecked: false,
      }))
    ),
  };

  findNeighbours = (id, size) => {
    const col = id % 10;
    const row = Math.floor(id / 10);

    const rowMaxLimit = row === size - 1 ? size - 1 : row + 1;
    const rowMinLimit = row === 0 ? row : row - 1;

    let neighbours = [];

    for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
      for (let x = col - 1; x <= col + 1; x++) {
        if (x < 0 || x >= size || x + y * 10 === id) continue;
        neighbours.push(x + y * 10);
      }
    }

    return neighbours;
  };

  openNeighbour = (id) => {
    const row = Math.floor(id / 10);
    const col = id % 10;

    let cells = this.state.cells;
    cells[row][col] = { id, isChecked: true };

    this.setState(cells);
  };

  onOpening = (id) => {
    // console.log(`Cell's id: ${id}`)
    const neighbours = this.findNeighbours(id, this.size);
    for (let cell of neighbours) {
      this.openNeighbour(cell);
    }
  };

  ifBomb = (value) => {
    if (value === "bomb") {
      this.setState({
        isEnded: true,
      });
    }
  };

  startGame = () => {
    if (this.state.isStarted) {
      return this.cells.map((item, row) =>
        item.map((item, col) => (
          <Cell
            key={col + row * 10}
            id={col + row * 10}
            value={
              item === -1
                ? "bomb"
                : this.countBombsAround(this.cells, row, col, this.props.size)
            }
            onOpening={this.onOpening}
            isOpened={this.state.cells[row][col].isChecked}
            ifBomb={this.ifBomb}
          />
        ))
      );
    }
  };

  render() {
    return (
      <div className="field">
        {this.state.isEnded && (
          <div className="lose">
            <div className="lose-msg">
              Вы проиграли
              <button
                className="btn"
                onClick={() => {
                  this.setState({ isEnded: false, isStarted: false });
                  this.startGame();
                }}
              >
                Заново
              </button>
            </div>
            <div className="overlay"></div>
          </div>
        )}
        {!this.state.isStarted && (
          <div className="start">
            <div className="start-msg">
              Начать новую игру
              <button
                className="btn"
                onClick={() => this.setState({ isStarted: true })}
              >
                Начать
              </button>
            </div>
          </div>
        )}
        {this.startGame()}
      </div>
    );
  }
}

export default Field;
