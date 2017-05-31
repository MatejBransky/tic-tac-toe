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
  appendToField,
  evalFieldsInSeries,
  evalFieldsInBoard,
  getBestField,
  getAiMove
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
  markValues: {
    '': 1, // empty field
    'X': 7, // PC
    'O': -6 // human player
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

test('appendToField() should return fields with values in board', assert => {
  const board = b([
    ['_', 'O', 'X'],
    ['_', '_', '_'],
    ['_', '_', '_']
  ])
  const markValues = setup().markValues
  const expected = [
    [
      { x: 0, y: 0, mark: '', value: 1, win: false },
      { x: 1, y: 0, mark: 'O', value: -6, win: false },
      { x: 2, y: 0, mark: 'X', value: 7, win: false }
    ],
    [
      { x: 0, y: 1, mark: '', value: 1, win: false },
      { x: 1, y: 1, mark: '', value: 1, win: false },
      { x: 2, y: 1, mark: '', value: 1, win: false }
    ],
    [
      { x: 0, y: 2, mark: '', value: 1, win: false },
      { x: 1, y: 2, mark: '', value: 1, win: false },
      { x: 2, y: 2, mark: '', value: 1, win: false }
    ]
  ]
  assert.deepEqual(
    appendToField(markValues)(board),
    expected,
    'Field values appended'
  )
  assert.end()
})

test('evalMoves() should return fields with evaluation in each serie', assert => {
  const markValues = setup().markValues
  const board = b([
    ['_', 'O', 'X'],
    ['_', '_', 'X'],
    ['_', '_', '_']
  ])
  const series = pipe(
    appendToField(markValues),
    getSeries
  )(board)
  const actual = evalFieldsInSeries(series).row[0][0] // first field in first row serie
  const expected = { x: 0, y: 0, mark: '', value: 1, win: false, serieEval: 2 }

  assert.deepEqual(
    actual,
    expected,
    'Field serieEval appended'
  )
  assert.end()
})

// test('Get next move coord of AI', assert => {
//   // @TODO
// })
