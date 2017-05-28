// import test from 'tape'
// import repeat from 'ramda/src/repeat'
// import {
//   createField as f,
//   createRow as r,
//   createBoard as b,
//   createSerie as s
// } from '../src/utils'
// import {
//   isDraw,
//   checkWinSerie,
//   getWinSeries,
//   getAiMove
// } from '../src/helpers'

// const [_, O, X] = ['_', 'O', 'X']
// const setup = () => ({
//   board: {
//     empty: b(repeat(repeat(_), 3), 3),
//     nonEmpty: b([
//       [_, O, X],
//       [_, _, _],
//       [_, O, X]
//     ]),
//     fullNonWin: b([
//       [X, O, X],
//       [O, X, X],
//       [O, O, O]
//     ]),
//     oneWinSerie: b([
//       [O, X, _],
//       [X, O, _],
//       [O, X, O]
//     ]),
//     multipleWinSeries: b([
//       [O, O, X],
//       [O, X, X],
//       [X, O, X]
//     ])
//   },
//   serie: {
//     empty: r([_, _, _], 0),
//     winX: r([X, X, X], 1),
//     winO: r([O, O, O], 0),
//     varied: r([_, X, O], 2)
//   }
// })

// test('Check if game is ending with draw', assert => {
//   const board = setup().board
//   assert.equal(isDraw(board.empty), false)
//   assert.equal(isDraw(board.nonEmpty), false)
//   assert.equal(isDraw(board.fullNonWin), true)
//   assert.equal(isDraw(board.multipleWinSeries), false)
//   assert.end()
// })

// test('Check if serie of fields contains the same mark.', assert => {
//   const serie = setup().serie
//   assert.equal(checkWinSerie(serie.empty), false)
//   assert.equal(checkWinSerie(serie.winX), true)
//   assert.equal(checkWinSerie(serie.winO), true)
//   assert.equal(checkWinSerie(serie.varied), false)
//   assert.end()
// })

// test('Return array of win series', assert => {
//   const board = setup().board
//   assert.equal(getWinSeries(board.empty), [])
//   assert.equal(getWinSeries(board.fullNonWin), [])
//   assert.equal(getWinSeries(board.oneWinSerie), s([0, 0, O], [1, 1, O], [2, 2, O]))
//   assert.equal(getWinSeries(board.multipleWinSeries), [
//     s([0, 2, X], [1, 2, X], [2, 2, X]),
//     s([0, 2, X], [1, 1, X], [2, 0, X])
//   ])
//   assert.end()
// })

// test('Get next move coord of AI', assert => {
//   // @TODO
// })
