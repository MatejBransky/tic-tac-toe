import transpose from 'ramda/src/transpose'
import times from 'ramda/src/times'
import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import path from 'ramda/src/path'

// time delay
const delay = (time) => new Promise(resolve => setTimeout(resolve, time))

/**
 * Returns function for getting value (integer) from specified range
 * @param {Number} input From zero to one
 */
const setRandom = (input = 0) => (start = 0, end = 1) => Math.round(input * (end - start) + start)

/**
 * Returns value from specified range (default range: from 0 to 1)
 */
const random = setRandom(Math.random())

/**
 * Returns field object with predefined properties
 * @param {String} mark "_", "X", "O"
 * @param {Number} x Number of item in row (0..2)
 * @param {Number} y Number of row in board (0..2)
 */
const createField = (mark, x, y) => {
  const field = {
    _: (x, y) => ({ x, y, mark: '', win: false }),
    O: (x, y) => ({ x, y, mark: 'O', win: false }),
    X: (x, y) => ({ x, y, mark: 'X', win: false })
  }
  return field[mark](x, y)
}

/**
 * Returns array of field objects
 * @param {Array} marks Array with marks (e.g. ["_", "X", "O"])
 * @param {Number} y Number of row in board (0..2)
 */
const createRow = (marks, y) => marks.map((mark, x) => createField(mark, x, y))

/**
 * Returns array of field objects
 * @param {Array} marks Array with marks (e.g. ["_", "X", "O"])
 * @param {Number} x Number of column in board (0..2)
 */
const createColumn = (marks, x) => marks.map((mark, y) => createField(mark, x, y))

/**
 * Returns array with rows which contains field objects
 * @param {Array} board Array of arrays (rows) with marks
 */
const createBoard = (board) => board.map((row, y) => createRow(row, y))

/**
 * Returns array with field objects with inserted coords and marks.
 * @param {Array} serie Array of arrays which contains [x, y, mark]
 */
const createSerie = (serie) => serie.map(([x, y, mark]) => createField(mark, x, y))

/**
 * Returns array of field objects
 * @param {Array} marks Array with marks (e.g. ["_", "X", "O"])
 * @param {String} type Name of diagonal ('topRight' or 'topLeft')
 */
const createDiagonal = (marks, type) => {
  const types = {
    topRight: marks => createSerie(marks.map((mark, i) => [2 - i, i, mark])),
    topLeft: marks => createSerie(marks.map((mark, i) => [i, i, mark])),
  }
  return types[type](marks)
}

/**
 * Returns array of columns from board
 * @param {Array} board Board with rows
 */
const getColumns = board => transpose(board)

/**
 * Returns array of two diagonals from board
 * @param {Array} board Board with rows
 */
const getDiagonals = board => [
  times(i => board[i][i], 3),
  times(i => board[i][2 - i], 3)
]

/**
 * Returns array of series [ ...rows, ...columns, ...diagonals ]
 * @param {Array} board Board with rows
 */
const getSeries = board => ([...board, ...getColumns(board), ...getDiagonals(board)])

/**
 * Returns object (parent) with changed values (values) in key (key) 
 * in multiple instances of specific objects (course).
 * @param {Object} param0 {key, values, course, parent} 
 */
const distribute = ({ key, values, course, parent }) => {
  const objects = path(course, parent)
    .map((object, index) => assoc(key, values[index], object))
  return assocPath(course, objects, parent)
}

export {
  delay,
  setRandom,
  random,
  createField,
  createRow,
  createColumn,
  createBoard,
  createSerie,
  createDiagonal,
  getColumns,
  getDiagonals,
  getSeries,
  distribute
}
