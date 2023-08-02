const generateValues = ([height, width], difficulty) => {
  const size = height * width;
  const bombsAmount = height * width * difficulty;

  const emptyAmount = new Array(size - bombsAmount).fill(0);
  const bombsArray = new Array(bombsAmount).fill(-1);

  const values = emptyAmount.concat(bombsArray);
  const shuffledValues = values.sort(() => Math.random() - 0.5);

  return shuffledValues;
};

const indexValues = (values) => {
  return values.map((val, id) => ({
    val,
    id,
    isChecked: false,
    neighbours: [],
  }));
};

const findNeighbours = (id, [height, width]) => {
  const row = Math.floor(id / width);
  const col = id % width;

  const limits = [
    row === 0 ? row : row - 1,
    row === height - 1 ? height - 1 : row + 1,
  ];

  let neighbours = [];

  for (let y = limits[0]; y <= limits[1]; y++) {
    for (let x = col - 1; x <= col + 1; x++) {
      if (x < 0 || x >= width || x + y * 10 === id) continue;
      neighbours.push(y * width + x);
    }
  }

  return neighbours;
};
generateValues([5, 5], 0.2);
// console.log(generateValues([5, 5], 0.2))
console.log(
  findNeighbours(indexValues(generateValues([5, 5], 0.2))[10].id, [5, 5])
);

// const findNeighboursDEPRECATED = (colID, rowID, id, size) => {
//   const rowMaxLimit = rowID === size - 1 ? size - 1 : rowID + 1;
//   const rowMinLimit = rowID === 0 ? rowID : rowID - 1;

//   let neighbours = [];

//   for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
//     for (let x = colID - 1; x <= colID + 1; x++) {
//       if (x < 0 || x >= size || x + y * 10 === id) continue;
//       neighbours.push(x + y * 10);
//     }
//   }

//   return neighbours;
// };

// cells = cells.map((row, rowID) =>
//   row.map((col, colID) => ({
//     ...col,
//     neighbours: findNeighbours(colID, rowID, col.index, size),
//   }))
// );

// let correctCells = countBombsAround(cells);

// console.log(correctCells);

// let cellsToRender = correctCells.map((row, rowID) =>
//   row.map((col, colID) => (
//     <Cell
//       key={col.index}
//       id={col.index}
//       value={col.value}
//       onOpening={onOpening}
//       isOpened={cells[rowID][colID].isChecked}
//       ifBomb={ifBomb}
//     />
//   ))
// );

// const countBombsAround = (cells) => {
//   let cellsWithCorrectValues = cells.map((row, _) =>
//     row.map((col, _) => {
//       if (col.value !== -1) {
//         let count = 0;
//         col.neighbours.forEach((id) => {
//           const row = Math.floor(id / 10);
//           const col = id % 10;

//           if (cells[row][col].value === -1) count++;
//         });
//         return { ...col, value: count };
//       } else {
//         return col;
//       }
//     })
//   );

//   return cellsWithCorrectValues;
// };
