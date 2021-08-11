import React, { useState } from "react";
import Cell from "./Cell";
import "./Board.css";

/** Game board of Lights out.
 *
 * Properties:
 *
 * - nrows: number of rows of board
 * - ncols: number of cols of board
 * - chanceLightStartsOn: float, chance any cell is lit at start of game
 *
 * State:
 *
 * - board: array-of-arrays of true/false
 *
 *    For this board:
 *       .  .  .
 *       O  O  .     (where . is off, and O is on)
 *       .  .  .
 *
 *    This would be: [[f, f, f], [t, t, f], [f, f, f]]
 *
 *  This should render an HTML table of individual <Cell /> components.
 *
 *  This doesn't handle any clicks --- clicks are on individual cells
 *
 **/

function Board({ nrows, ncols, chanceLightStartsOn }) {
  const [board, setBoard] = useState(createBoard());

  /** create a board nrows high/ncols wide, each cell randomly lit or unlit */
  function createBoard() {
    let initialBoard = Array.from({ length: nrows });
    for (let i = 0; i < initialBoard.length; i++) {
      initialBoard[i] = Array.from({ length: ncols });
      initialBoard[i] = initialBoard[i].map(() =>
        Math.random() < chanceLightStartsOn
      );
    }
    // console.log(initialBoard);
    return initialBoard;
  }

  function hasWon() {
    // TODO: check the board in state to determine whether the player has won.
    return board.flat().every((light) => light === false);
    //ever().every()
  }

  function flipCellsAround(coord) {
    setBoard((oldBoard) => {
      const [y, x] = coord.split("-").map(Number);

      const flipCell = (y, x, boardCopy) => {
        // if this coord is actually on board, flip it

        if (x >= 0 && x < ncols && y >= 0 && y < nrows) {
          boardCopy[y][x] = !boardCopy[y][x];
        }
      };

      // TODO: Make a (deep) copy of the oldBoard
      let newBoard = oldBoard.map( (row) => [...row] );

      // TODO: in the copy, flip this cell and the cells around it
      flipCell( y, x , newBoard);
      flipCell( y+1, x , newBoard);
      flipCell( y-1, x , newBoard);
      flipCell( y, x+1 , newBoard);
      flipCell( y, x-1 , newBoard);
      // TODO: return the copy
      return newBoard
    });
  }

  // if the game is won, just show a winning msg & render nothing else
  if (hasWon()) {
    return <p>You Won</p>
  }
  // TODO
  // make table board
  let tableRows = [];
  //use y x since they are conventions instead of rowIndex, colIndex
  for (let [rowIndex, rows] of board.entries()) {
    let row = [];
    for (let [colIndex, cell] of rows.entries()) {
      row.push(<Cell flipCellsAroundMe={
        evt => flipCellsAround(`${rowIndex}-${colIndex}`)}
        isLit={cell}
        key={`${rowIndex}-${colIndex}`} />)
    }
    tableRows.push(<tr className="Board-table-row"key={rowIndex}>{row}</tr>)
  }

  return (<div className="Board">
    <table className="Board-table">
      <tbody className="Board-table-body">
        {tableRows}
      </tbody>
    </table>
  </div>);
  // TODO
}

Board.defaultProps = {
  nrows: 1,
  ncols: 1,
  chanceLightStartsOn: 0.5,
};

export default Board;


