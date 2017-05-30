import test from 'tape'
import append from 'ramda/src/append'
import type from 'ramda/src/type'
import keys from 'ramda/src/keys'
import transpose from 'ramda/src/transpose'
import times from 'ramda/src/times'
import equals from 'ramda/src/equals'
import merge from 'ramda/src/merge'
import mergeAll from 'ramda/src/mergeAll'
import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import path from 'ramda/src/path'

/**
 * Returns the function with predefined type of tests.
 * Returned function needs object with "desc" (string) and "assertions" (array) 
 * which contains assertion objects with keys: "actual", "expected" and "msg".
 * @param {String} method Type of test ('equal' | 'deepEqual')
 * @returns {Function} 
 */
const tests = method => {
  return ({ desc, assertions }) => test(
    desc,
    assert => {
      assertions.map(assertion =>
        assert[method](
          assertion.actual,
          assertion.expected,
          assertion.msg
        )
      )
      assert.end()
    }
  )
}

/**
 * Tests assertions. Input: object with description and array of assertions.
 * Every assertion object contains keys: "actual", "expected" and "msg".
 * @param {Object} test Object with description of test and array of assertions
 */
const deepEqualTests = test => tests('deepEqual')(test)

/**
 * Returns field object with predefined properties
 * @param {String} mark "_", "X", "O"
 * @param {Number} x Number of item in row (0..2)
 * @param {Number} y Number of row in board (0..2)
 */
const createField = (mark, x, y) => {
  const field = {
    _: (x, y) => ({ x, y, mark: '', value: 1, win: false }),
    O: (x, y) => ({ x, y, mark: 'O', value: 7, win: false }),
    X: (x, y) => ({ x, y, mark: 'X', value: -6, win: false })
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

const getColumns = board => transpose(board)
const getDiagonals = board => [
  times(i => board[i][i], 3),
  times(i => board[i][2-i], 3)
]

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

/**
 * Returns flattened object with values appended to keys which describe path to value in previous object.
 * @param {Object} object 
 * @param {String} separator Separator in keys with path (e.g. ".", "/", "|")
 */
const flatten = (object, separator = '.') => {
  return mergeAll(function _flatten(child, path = []) {
    return [].concat(...keys(child)
      .map(key => type(child[key]) === 'Object' || type(child[key]) === 'Array' ?
        _flatten(child[key], append(key, path)) :
        ({ [append(key, path).join(separator)]: child[key] })
      ))
  }(object))
}

/**
 * Returns array of objects which describe updates in state
 * @param {Object} prevState 
 * @param {Object} newState 
 */
const getUpdates = (prevState, newState) => {
  const SEPARATOR = '.'
  const flattenPrev = flatten(prevState, SEPARATOR)
  const flattenNew = flatten(newState, SEPARATOR)
  return keys(flattenNew).reduce((updates, key) => equals(flattenPrev[key], flattenNew[key]) ?
    updates :
    append({
      path: key.split(SEPARATOR),
      oldValue: flattenPrev[key],
      newValue: flattenNew[key]
    }, updates), [])
}

/**
 * Logs updates in table
 * @param {Object} prevState 
 * @param {Object} newState 
 * @param {String} separator 
 */
const printUpdates = (prevState, newState, separator = '/') => {
  const updates = getUpdates(prevState, newState)
    .map(update => merge(update, { path: update.path.join(separator) }))
  console.table(updates)
}

export {
  deepEqualTests,
  createField,
  createRow,
  createColumn,
  createBoard,
  createSerie,
  createDiagonal,
  getColumns,
  getDiagonals,
  distribute,
  flatten,
  getUpdates,
  printUpdates
}
