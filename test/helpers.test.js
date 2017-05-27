import test from 'tape'
import repeat from 'ramda/src/repeat'
import times from 'ramda/src/times'
import {
  isDraw,
  checkWinSerie,
  getWinSeries,
  getAiMove
} from '../src/helpers.js'

const [_, O, X] = ['_', 'O', 'X']
const fields = {
  _: (y, x) => ({ x, y, mark: '', value: 1, win: false }),
  O: (y, x) => ({ x, y, mark: 'O', value: 7, win: false }),
  X: (y, x) => ({ x, y, mark: 'X', value: -6, win: false })
}
const b = (board) => board.map(r)
const r = (row, y) => row.map((mark, x) => fields[mark](y, x))
const s = (serie) => serie.map(([x, y, mark]) => fields[mark](y, x))
const setup = () => ({
  board: {
    empty: b(repeat(repeat(_), 3), 3),
    nonEmpty: b([
      [_, O, X],
      [_, _, _],
      [_, O, X]
    ]),
    fullNonWin: b([
      [X, O, X],
      [O, X, X],
      [O, O, O]
    ]),
    oneWinSerie: b([
      [O, X, _],
      [X, O, _],
      [O, X, O]
    ]),
    multipleWinSeries: b([
      [O, O, X],
      [O, X, X],
      [X, O, X]
    ])
  },
  serie: {
    empty: r([_, _, _], 0),
    winX: r([X, X, X], 1),
    winO: r([O, O, O], 0),
    varied: r([_, X, O], 2)
  }
})

test('Create board with predefined fields objects.', assert => {
  const input = [
    [_, X, O],
    [_, X, O],
    [_, X, O]
  ]
  const output = times(y => (
    [fields[_](y, 0), fields[X](y, 1), fields[O](y, 2)]
  ), 3)
  assert.deepEqual(b(input), output)
  assert.end()
})

test('Check if game is ending with draw', assert => {
  const board = setup().board
  assert.equal(isDraw(board.empty), false)
  assert.equal(isDraw(board.nonEmpty), false)
  assert.equal(isDraw(board.fullNonWin), true)
  assert.equal(isDraw(board.multipleWinSeries), false)
  assert.end()
})

test('Check if serie of fields contains the same mark.', assert => {
  const serie = setup().serie
  assert.equal(checkWinSerie(serie.empty), false)
  assert.equal(checkWinSerie(serie.winX), true)
  assert.equal(checkWinSerie(serie.winO), true)
  assert.equal(checkWinSerie(serie.varied), false)
  assert.end()
})

test('Return array of win series', assert => {
  const board = setup().board
  assert.equal(getWinSeries(board.empty), [])
  assert.equal(getWinSeries(board.fullNonWin), [])
  assert.equal(getWinSeries(board.oneWinSerie), s([0, 0, O], [1, 1, O], [2, 2, O]))
  assert.equal(getWinSeries(board.multipleWinSeries), [
    s([0, 2, X], [1, 2, X], [2, 2, X]),
    s([0, 2, X], [1, 1, X], [2, 0, X])
  ])
  assert.end()
})

test('Get next move coord of AI', assert => {
  // @TODO
})
