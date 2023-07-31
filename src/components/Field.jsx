import styles from "../styles/modules/Field.module.scss";

// import { Component } from "react";
import { useState, useEffect } from "react";

import Cell from "./Cell";

const Field = ({ size, difficulty }) => {
  const [cells, setCells] = useState([]);
  const [finalCells, setFinalCells] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);

  useEffect(() => {
    if (isStarted) {
      console.log("effect started");
      let cells = generateCells(size, difficulty).map((row, rowIndex) =>
        row.map((value, colIndex) => ({
          value,
          index: colIndex + rowIndex * 10,
          isChecked: false,
        }))
      );
      setCells(cells);
      startGame(cells);
    }
  }, [isStarted]);

  const generateCells = (size, difficulty) => {
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
    // console.log(cells);
    return cells;
  };

  const countBombsAround = (cells, row, col, size) => {
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

  const findNeighbours = (id, size) => {
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

  const openNeighbour = (id) => {
    const row = Math.floor(id / 10);
    const col = id % 10;

    let cellsTemp = cells;
    console.log(cells);
    // cellsTemp[row][col].isChecked = true;

    // setCells((cell) => (cell[row][col].isChecked = true));
    // [[{value, id, isChecked}, {}, {}, ...], [], ...]
    // setCells(cellsTemp);
  };

  const onOpening = (id) => {
    // console.log(`Cell's id: ${id}`)
    const neighbours = findNeighbours(id, size);
    for (let cell of neighbours) {
      openNeighbour(cell);
    }
  };

  const ifBomb = (value) => {
    if (value === "bomb") {
      setIsEnded(true);
    }
  };

  const startGame = (cells) => {
    let cellsComponentsArray = cells.map((item, row) =>
      item.map((item, col) => (
        <Cell
          key={col + row * 10}
          id={col + row * 10}
          value={item === -1 ? "bomb" : countBombsAround(cells, row, col, size)}
          onOpening={onOpening}
          isOpened={cells[row][col].isChecked}
          ifBomb={ifBomb}
        />
      ))
    );

    setFinalCells(cellsComponentsArray);
  };

  return (
    <div className={styles.field}>
      {/* {isEnded && (
        <div className={styles.lose}>
        <div className={styles.message_lose}>
            Вы проиграли
            <button
              className={styles.btn}
              onClick={() => {
                setIsEnded(false);
                setIsStarted(false);
              }}
            >
              Заново
            </button>
            </div>
          <div className={styles.overlay}></div>
          </div>
      )}
      {!this.state.isStarted && (
        <div className={styles.start}>
        <div className={styles.message_start}>
        Начать новую игру
        <button
              className={styles.btn}
              onClick={() => setIsStarted(true)}
              >
              Начать
              </button>
              </div>
              </div>
            )} */}
      <ResultsModal
        isEnded={isEnded}
        setIsEnded={setIsEnded}
        isStarted={isStarted}
        setIsStarted={setIsStarted}
      />
      {isStarted && finalCells}
    </div>
  );
};

const ResultsModal = ({ isEnded, setIsEnded, isStarted, setIsStarted }) => {
  const handleRestart = () => {
    console.log("restart");
    setIsEnded(false);
    setIsStarted(false);
  };

  const handleStart = () => {
    console.log("start");
    setIsStarted(true);
  };

  return (
    <>
      {(isEnded || !isStarted) && (
        <div className={styles.modal}>
          <div className={styles.modal__message}>
            {isEnded ? "Вы проиграли" : "Начать новую игру"}
            <button
              className={styles.btn}
              onClick={isEnded ? handleRestart : handleStart}
            >
              {isEnded ? "Заново" : "Начать"}
            </button>
          </div>
          {isEnded && <div className={styles.overlay} />}
        </div>
      )}
    </>
  );
};

export default Field;

// class FieldCC extends Component {
// constructor(props) {
//   super(props);
//   this.size = props.size;
//   this.difficulty = props.difficulty;
// }

// generateCells = (size, difficulty) => {
//   let cells = new Array(size);

//   for (let x = 0; x < cells.length; x++) {
//     cells[x] = new Array(size);
//     for (let y = 0; y < cells.length; y++) {
//       cells[x][y] = Math.round(Math.random() - difficulty);
//       if (cells[x][y] !== 0) {
//         cells[x][y] = -cells[x][y];
//       }
//     }
//   }

//   return cells;
// };

// cells = this.generateCells(this.props.size, this.props.difficulty);

// countBombsAround = (cells, row, col, size) => {
//   let count = 0;

//   const rowMaxLimit = row === size - 1 ? size - 1 : row + 1;
//   const rowMinLimit = row === 0 ? row : row - 1;

//   for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
//     for (let x = col - 1; x <= col + 1; x++) {
//       if (x < 0 || x >= size) continue;
//       if (cells[y][x] === -1) count++;
//     }
//   }

//   return count;
// };

// countBombs = () => {
//   let counter = 0;
//   this.cells.forEach((item) => {
//     item.forEach((cell) => {
//       if (cell === -1) counter++;
//     });
//   });
//   return counter;
// };

// state = {
//   isEnded: false,
//   isStarted: false,
//   cells: this.cells.map((row, rowIndex) =>
//     row.map((_, colIndex) => ({
//       index: colIndex + rowIndex * 10,
//       isChecked: false,
//     }))
//   ),
// };

// findNeighbours = (id, size) => {
//   const col = id % 10;
//   const row = Math.floor(id / 10);

//   const rowMaxLimit = row === size - 1 ? size - 1 : row + 1;
//   const rowMinLimit = row === 0 ? row : row - 1;

//   let neighbours = [];

//   for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
//     for (let x = col - 1; x <= col + 1; x++) {
//       if (x < 0 || x >= size || x + y * 10 === id) continue;
//       neighbours.push(x + y * 10);
//     }
//   }

//   return neighbours;
// };

// openNeighbour = (id) => {
//   const row = Math.floor(id / 10);
//   const col = id % 10;

//   let cells = this.state.cells;
//   cells[row][col] = { id, isChecked: true };

//   this.setState(cells);
// };

// onOpening = (id) => {
// console.log(`Cell's id: ${id}`)
//     const neighbours = this.findNeighbours(id, this.size);
//     for (let cell of neighbours) {
//       this.openNeighbour(cell);
//     }
//   };

//   ifBomb = (value) => {
//     if (value === "bomb") {
//       this.setState({
//         isEnded: true,
//       });
//     }
//   };

//   startGame = () => {
//     if (this.state.isStarted) {
//       return this.cells.map((item, row) =>
//         item.map((item, col) => (
//           <Cell
//             key={col + row * 10}
//             id={col + row * 10}
//             value={
//               item === -1
//                 ? "bomb"
//                 : this.countBombsAround(this.cells, row, col, this.props.size)
//             }
//             onOpening={this.onOpening}
//             isOpened={this.state.cells[row][col].isChecked}
//             ifBomb={this.ifBomb}
//           />
//         ))
//       );
//     }
//   };

//   render() {
//     return (
//       <div className="field">
//         {this.state.isEnded && (
//           <div className="lose">
//             <div className="lose-msg">
//               Вы проиграли
//               <button
//                 className="btn"
//                 onClick={() => {
//                   this.setState({ isEnded: false, isStarted: false });
//                   this.startGame();
//                 }}
//               >
//                 Заново
//               </button>
//             </div>
//             <div className="overlay"></div>
//           </div>
//         )}
//         {!this.state.isStarted && (
//           <div className="start">
//             <div className="start-msg">
//               Начать новую игру
//               <button
//                 className="btn"
//                 onClick={() => this.setState({ isStarted: true })}
//               >
//                 Начать
//               </button>
//             </div>
//           </div>
//         )}
//         {this.startGame()}
//       </div>
//     );
//   }
// }
