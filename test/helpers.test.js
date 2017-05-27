import test from 'tape'
import repeat from 'ramda/src/repeat'
import times from 'ramda/src/times'
import {
  isDraw,
  checkWinSerie,
  checkWinSeries,
  getAiMove
} from '../src/helpers.js'

test('Check if game is ending with draw', (assert) => {
  const board = repeat(repeat({
    mark: '',
    value: 1,
    win: false
  }, 3), 3)
  assert.equal(isDraw(board), true)
  assert.end()
})

test('Check if serie of fields contains the same mark.', (assert) => {
  const emptySerie = repeat({
    mark: '',
    value: 1,
    win: false
  })
  const winSerie = repeat({
    mark: 'X',
    value: 7,
    win: false
  })
  const variedSerie = [
    { mark: 'X', value: 7, win: false },
    { mark: 'O', value: -6, win: false },
    { mark: '', value: 1, win: false }
  ]

  assert.equal(checkWinSerie(emptySerie), false)
  assert.equal(checkWinSerie(winSerie), true)
  assert.equal(checkWinSerie(variedSerie), false)
  assert.end()
})

// test('Check if board contains win series and if so return them', (assert) => {
//   const board = repeat(repeat({
//     mark: '',
//     value: 1,
//     win: false
//   }, 3), 3)
//   times(i => board[0][i] = {
//     mark: 'X',
//     value: 1,
//     win: false
//   }, 3)
//   assert.equal(checkWinSeries(board), )
// })
