import test from 'tape'
import {
  createRow as r,
  createColumn as c,
  createBoard as b,
  createDiagonal as d
} from '../src/utils'
import {
  isFull,
  checkWinSerie,
  getWinSeries,
  getAiMove
} from '../src/helpers'

const setup = () => ({
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
    ])
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

  assert.deepEqual(getWinSeries(
    board.fullWinHorizontal),
    r(['O', 'O', 'O'], 0),
    'Horizontal winning serie')

  assert.deepEqual(getWinSeries(
    board.fullWinVertical),
    c(['X', 'X', 'X'], 2),
    'Vertical winning serie')

  assert.deepEqual(getWinSeries(
    board.fullWinDiagonal),
    d(['X', 'X', 'X'], 'topRight'),
    'Diagonal winning serie')
  assert.end()
})

// test('Get next move coord of AI', assert => {
//   // @TODO
// })
