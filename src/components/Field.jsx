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
          neighbours: [],
        }))
      );

      cells = cells.map((row, rowID) =>
        row.map((col, colID) => ({
          ...col,
          neighbours: findNeighbours(colID, rowID, col.index, size),
        }))
      );

      let correctCells = countBombsAround(cells);

      setCells(correctCells);
      console.log(correctCells);

      cells = correctCells.map((row, rowID) =>
        row.map((col, colID) => (
          <Cell
            key={col.index}
            id={col.index}
            value={col.value}
            onOpening={onOpening}
            isOpened={cells[rowID][colID].isChecked}
            ifBomb={ifBomb}
          />
        ))
      );

      setFinalCells(cells);
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

    return cells;
  };

  const countBombsAround = (cells) => {
    let cellsWithCorrectValues = cells.map((row, _) =>
      row.map((col, _) => {
        if (col.value !== -1) {
          let count = 0;
          col.neighbours.forEach((id) => {
            const row = Math.floor(id / 10);
            const col = id % 10;

            if (cells[row][col].value === -1) count++;
          });
          return { ...col, value: count };
        } else {
          return col;
        }
      })
    );

    return cellsWithCorrectValues;
  };

  const findNeighbours = (colID, rowID, id, size) => {
    const rowMaxLimit = rowID === size - 1 ? size - 1 : rowID + 1;
    const rowMinLimit = rowID === 0 ? rowID : rowID - 1;

    let neighbours = [];

    for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
      for (let x = colID - 1; x <= colID + 1; x++) {
        if (x < 0 || x >= size || x + y * 10 === id) continue;
        neighbours.push(x + y * 10);
      }
    }

    return neighbours;
  };

  const openNeighbour = (id) => {
    //   const row = Math.floor(id / 10);
    //   const col = id % 10;
    // let cellsTemp = cells;
    // console.log(cells);
    // cellsTemp[row][col].isChecked = true;
    // setCells((cell) => (cell[row][col].isChecked = true));
    // [[{value, id, isChecked}, {}, {}, ...], [], ...]
    // setCells(cellsTemp);
  };

  const onOpening = (cellID) => {
    for (let cell of cellID.neighbours) {
      openNeighbour(cell);
    }
  };

  const ifBomb = (value) => {
    if (value === "bomb") {
      setIsEnded(true);
    }
  };

  return (
    <div className={styles.field}>
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
            <h2 className={styles.modal__message__title}>
              {isEnded ? "Вы проиграли" : "Начать новую игру"}
            </h2>
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
