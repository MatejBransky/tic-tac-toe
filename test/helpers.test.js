import test from 'tape'
import {
  createRow as r,
  createColumn as c,
  createBoard as b,
  createDiagonal as d,
  getSeries
} from '../src/utils'
import {
  isFull,
  checkWinSerie,
  getWinSeries,
  getEmptyFields,
  getStats,
  appendStats,
  appendSerieValue,
  mapFields,
  setSelectionOfField,
  getCoords
} from '../src/helpers'
import state from '../src/state'
import pipe from 'ramda/src/pipe'

const setup = () => ({
  state,
  board: {
    empty: b([
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_']
    ]),
    nonEmpty: b([
      ['_', 'X', '_'],
      ['_', '_', '_'],
      ['_', '_', 'O']
    ]),
    full: b([
      ['O', 'X', 'O'],
      ['X', 'O', 'X'],
      ['X', 'O', 'X']
    ]),
    fullWinHorizontal: b([
      ['O', 'O', 'O'],
      ['O', 'X', 'X'],
      ['X', 'O', 'X']
    ]),
    fullWinVertical: b([
      ['O', 'X', 'X'],
      ['O', 'O', 'X'],
      ['X', 'O', 'X']
    ]),
    fullWinDiagonal: b([
      ['O', 'O', 'X'],
      ['O', 'X', 'O'],
      ['X', 'O', 'X']
    ]),
    twoWinSeries: b([
      ['O', 'O', 'X'],
      ['O', 'X', 'X'],
      ['X', 'O', 'X']
    ])
  },
  procedures: {
    getAiMove: {
      marks: ['O', 'X'],
      codes: {
        '201': 100,
        '021': 50,
        '102': 5,
        '003': 2,
        '012': 1,
        '111': 0
      },
      board: b([
        ['X', 'X', '_'],
        ['O', 'O', '_'],
        ['O', '_', '_']
      ])
    }
  }
})

test('isFull() should return true if board is fullfilled and vice versa', assert => {
  const board = setup().board
  assert.equal(isFull(board.empty), false, 'Empty board')
  assert.equal(isFull(board.nonEmpty), false, 'Partially filled board')
  assert.equal(isFull(board.full), true, 'Full board but no winner')
  assert.equal(isFull(board.fullWinHorizontal), true, 'Full board but with winner')
  assert.end()
})

test('checkWinSerie() should return true if serie contains same field\'s values', assert => {
  assert.equal(checkWinSerie(r(['O', 'X', 'O'], 0)), false, 'Serie - no win')
  assert.equal(checkWinSerie(r(['O', 'O', 'O'], 1)), true, 'Serie - win')
  assert.end()
})

test('getWinSeries() should return array of win series (no win => empty array)', assert => {
  const board = setup().board

  assert.deepEqual(getWinSeries(board.empty), [], 'Empty board')
  assert.deepEqual(getWinSeries(board.nonEmpty), [], 'Partially filled board')
  assert.deepEqual(getWinSeries(board.full), [], 'Full board but no winner')

  assert.deepEqual(
    getWinSeries(board.fullWinHorizontal),
    [r(['O', 'O', 'O'], 0)],
    'Horizontal winning serie'
  )

  assert.deepEqual(
    getWinSeries(board.fullWinVertical),
    [c(['X', 'X', 'X'], 2)],
    'Vertical winning serie'
  )

  assert.deepEqual(
    getWinSeries(board.fullWinDiagonal),
    [d(['X', 'X', 'X'], 'topRight')],
    'Diagonal winning serie'
  )

  assert.deepEqual(
    getWinSeries(board.twoWinSeries),
    [
      c(['X', 'X', 'X'], 2),
      d(['X', 'X', 'X'], 'topRight')
    ],
    'Diagonal and vertical winning series'
  )

  assert.end()
})

test('getEmptyFields() should return array of empty fields', assert => {
  const actual = getEmptyFields(b([
    ['_', 'O', 'X'],
    ['_', 'O', 'X'],
    ['O', 'O', 'X']
  ]))
  const expected = [
    { x: 0, y: 0, mark: '', win: false },
    { x: 0, y: 1, mark: '', win: false }
  ]
  assert.deepEqual(actual, expected, 'Array of two empty fields')
  assert.end()
})

test('getStats() should return stats of used marks in serie', assert => {
  const marks = setup().procedures.getAiMove.marks // [ Player's mark, PC's mark ]
  const serie = r(['O', 'X', '_'], 1)
  const actual = getStats(marks)(serie)
  const expected = { pc: 1, human: 1, empty: 1 }
  assert.deepEqual(actual, expected, 'Stats with every mark option')
  assert.end()
})

test('appendStats() should return series where each serie has key "stats"', assert => {
  const { marks, board } = setup().procedures.getAiMove
  const actual = pipe(
    getSeries,
    appendStats(marks)
  )(board)[0]
  const expected = { stats: { pc: 2, human: 0, empty: 1 }, fields: r(['X', 'X', '_'], 0) }
  assert.deepEqual(actual, expected, 'First row with stats')
  assert.end()
})

test('appendSerieValue() should return series where each field has key "value"', assert => {
  const { marks, codes, board } = setup().procedures.getAiMove
  const actual = pipe(
    getSeries,
    appendStats(marks),
    appendSerieValue(codes)
  )(board)[0]
  const expected = [
    { value: 100, mark: 'X', x: 0, y: 0, win: false },
    { value: 100, mark: 'X', x: 1, y: 0, win: false },
    { value: 100, mark: '', x: 2, y: 0, win: false }
  ]
  assert.deepEqual(actual, expected, 'First row and each field has value')
  assert.end()
})

test('mapFields() should return empty fields with value', assert => {
  const { marks, codes, board } = setup().procedures.getAiMove
  const emptyFields = getEmptyFields(board)
  const actual = pipe(
    getSeries,
    appendStats(marks),
    appendSerieValue(codes),
    mapFields(emptyFields)
  )(board)
  const expected = [
    { value: 152, mark: '', x: 2, y: 0, win: false },
    { value: 52, mark: '', x: 2, y: 1, win: false },
    { value: 1, mark: '', x: 1, y: 2, win: false },
    { value: 3, mark: '', x: 2, y: 2, win: false }
  ]
  assert.deepEqual(actual, expected, 'Empty fields with resulting value')
  assert.end()
})

test('setSelectionOfField() should return field by specified selection method and from specified number of groups', assert => {
  const getLastBiggest = (start, end) => Math.round(1 * (end - start) + start)
  const fields = [
    { value: 152, mark: '', x: 1, y: 0, win: false },
    { value: 152, mark: '', x: 2, y: 0, win: false },
    { value: 52, mark: '', x: 2, y: 1, win: false },
    { value: 1, mark: '', x: 1, y: 2, win: false },
    { value: 3, mark: '', x: 2, y: 2, win: false }
  ]
  const actual = setSelectionOfField(getLastBiggest)(1)(fields)
  const expected = { value: 152, mark: '', x: 2, y: 0, win: false }
  assert.deepEqual(actual, expected, 'Last biggest field')
  assert.end()
})

test('getCoords(method)() should return coords of selected field with predefined method', assert => {
  const fields = [
    { value: 152, mark: '', x: 2, y: 0, win: false },
    { value: 152, mark: '', x: 1, y: 0, win: false },
    { value: 52, mark: '', x: 2, y: 1, win: false },
    { value: 1, mark: '', x: 1, y: 2, win: false },
    { value: 3, mark: '', x: 2, y: 2, win: false }
  ]
  const method = (fields) => fields[0]
  const actual = getCoords(method)(fields)
  const expected = { x: 2, y: 0 }
  assert.deepEqual(actual, expected, 'First best field')
  assert.end()
})
