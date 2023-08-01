import styles from "../styles/modules/Field.module.scss";

// import { Component } from "react";
import { useState, useEffect } from "react";

import Cell from "./Cell";

const Field = ({ size, difficulty }) => {
  const [cells, setCells] = useState([]);
  const [finalCells, setFinalCells] = useState([]);
  const [isStarted, setIsStarted] = useState(false);
  const [isEnded, setIsEnded] = useState(false);
  const [timeToRerender, setTimeToRerender] = useState(false);

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

      console.log(correctCells);

      let cellsToRender = correctCells.map((row, rowID) =>
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
      setCells(correctCells);
      setFinalCells(cellsToRender);
    }
  }, [isStarted]);

  useEffect(() => {
    setFinalCells(
      cells.map((row, rowID) =>
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
      )
    );
    setTimeToRerender(false);
  }, [timeToRerender]);

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

  const onOpening = (cellID) => {
    const rowID = Math.floor(cellID / 10);
    const colID = cellID % 10;

    console.log(typeof cellID, typeof rowID, typeof colID);

    let cellsOnOpening = cells;
    console.log(cellsOnOpening);

    let cellToGetNeighbours = cells[rowID][colID];
    let neighboursToOpen = cellToGetNeighbours.neighbours;

    neighboursToOpen.forEach((index) => {
      const rowID = Math.floor(index / 10);
      const colID = index % 10;

      cellsOnOpening[rowID][colID].isChecked = true;
    });
    setCells(cellsOnOpening);
    setTimeToRerender(true);
  };

  const ifBomb = (value) => {
    if (value === -1) setIsEnded(true);
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
