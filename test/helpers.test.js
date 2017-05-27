import test from 'tape'

import times from 'ramda/src/times'
import assocPath from 'ramda/src/assocPath'

import {
  isDraw,
  checkWinSerie,
  checkWinSeries,
  getAiMove
} from '../src/helpers.js'

const before = test
const after = test
const setup = () => {
  const _ = (y, x) => ({ x, y, mark: '', value: 1, win: false })
  const o = (y, x) => ({ x, y, mark: 'O', value: 7, win: false })
  const x = (y, x) => ({ x, y, mark: 'X', value: -6, win: false })
  return {
    board: {
      empty: times(y => times(x => _(y, x), 3), 3),
      nonEmpty: [
        [_(0, 0), o(0, 1), x(0, 2)],
        [o(1, 0), _(1, 1), _(1, 2)],
        [_(2, 0), _(2, 1), x(2, 2)],
      ],
      fullNonWin: [
        [o(0, 0), x(0, 1), o(0, 2)],
        [x(1, 0), o(1, 1), o(1, 2)],
        [x(2, 0), o(2, 1), x(2, 2)],
      ],
      oneWinSerie: [
        [o(0, 0), o(0, 1), x(0, 2)],
        [o(1, 0), x(1, 1), _(1, 2)],
        [o(2, 0), _(2, 1), x(2, 2)],
      ],
      multipleWinSeries: [
        [o(0, 0), x(0, 1), o(0, 2)],
        [o(1, 0), o(1, 1), _(1, 2)],
        [o(2, 0), x(2, 1), x(2, 2)],
      ],
    },
    serie: {
      empty: times(x => _(1, x), 3),
      win: times(x => o(1, x), 3),
      varied: [o(0, 0), x(0, 1), _(0, 2)]
    }
  }
}

test('Check if game is ending with draw', (assert) => {
  const board = setup().board

  assert.equal(isDraw(board.empty), false)
  assert.equal(isDraw(board.nonEmpty), false)
  assert.equal(isDraw(board.fullNonWin), true)
  assert.end()
})

test('Check if serie of fields contains the same mark.', (assert) => {
  const serie = setup().serie

  assert.equal(checkWinSerie(serie.empty), false)
  assert.equal(checkWinSerie(serie.win), true)
  assert.equal(checkWinSerie(serie.varied), false)
  assert.end()
})

test('Return array of win series', (assert) => {
  const board = setup().board
  assert.equal(checkWinSeries(board.empty), [])
  assert.end()
})
