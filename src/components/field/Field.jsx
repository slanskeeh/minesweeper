import './field.sass'

import { Component } from 'react'

import Cell from '../cell/Cell'

class Field extends Component {
    constructor(props) {
        super(props)
        this.size = props.size
        this.difficulty = props.difficulty
    }

    generateCells = (size, difficulty) => {
        let cells = new Array(size)

        for (let x = 0; x < cells.length; x++) {
            cells[x] = new Array(size)
            for(let y = 0; y < cells.length; y++) {
                cells[x][y] = Math.round(Math.random() - difficulty)
                if (cells[x][y] !== 0) {
                    cells[x][y] = -cells[x][y]
                }
            }
        }

        return cells
    }
    
    cells = this.generateCells(this.props.size, this.props.difficulty)

    countBombsAround = (cells, row, col, size) => {
        let count = 0

        const rowMaxLimit = row === size - 1 ? size - 1 : row + 1
        const rowMinLimit = row === 0 ? row : row - 1

        for (let y = rowMinLimit; y <= rowMaxLimit; y++) {
            for (let x = col - 1; x <= col + 1; x++) {
                if (x < 0 || x >= size) continue
                if (cells[y][x] === -1) count++
            }
        }

        return count
    }

    render() {
        return( 
            <div className="field">
                {this.cells.map((item, row) => (
                    item.map((item, col) => (
                        <Cell key={col}
                              row={row}
                              col={col}
                              value={item === -1 ? 'bomb' : this.countBombsAround(this.cells, row, col, this.props.size)}
                        />
                    ))
                ))}
            </div>
        )
    }
}

export default Field;