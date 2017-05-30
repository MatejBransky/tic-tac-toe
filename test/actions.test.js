import test from 'tape'
import flatten from 'ramda/src/flatten'
import pipe from 'ramda/src/pipe'
import merge from 'ramda/src/merge'
import assocPath from 'ramda/src/assocPath'
import state from '../src/state'
import {
  createColumn as c,
  createDiagonal as d,
  createBoard as b
} from '../src/utils'
import actions from '../src/actions'

const setup = () => state

test('types.setAi() should update boolean value of state.ai', assert => {
  const state = setup()
  assert.deepEqual(
    actions.types.setAi(state, actions, false),
    merge(state, { ai: false }),
    'Update state.ai to false'
  )
  assert.end()
})

test('types.setNames() should update names of players in state', assert => {
  const names = ['Player', 'PC']
  const state = setup()
  assert.deepEqual(
    actions.types.setNames(state, actions, names),
    merge(state, {
      players: [
        merge(state.players[0], { name: 'Player' }),
        merge(state.players[1], { name: 'PC' })
      ]
    }),
    'Change players names to ["Player", "PC"]'
  )
  assert.end()
})

test('marks.setMarks() should update marks in settings', assert => {
  assert.end()
})

test('game.setField() should update field in board', assert => {
  assert.end()
})

test('game.showWinSeries() should update key "win" in field objects of win series', assert => {
  const initState = setup()
  const prevBoard = b([
    ['O', 'O', 'X'],
    ['O', 'X', 'X'],
    ['X', 'O', 'X']
  ])
  const state = merge(initState, { board: prevBoard })
  const winSeries = [
    c(['X', 'X', 'X'], 2),
    d(['X', 'X', 'X'], 'topRight')
  ]
  const updatedBoard = flatten(winSeries).reduce((board, field) =>
    assocPath([field.y, field.x, 'win'], true, board), prevBoard)

  assert.deepEqual(
    actions.game.showWinSeries(state, actions, winSeries),
    merge(state, { board: updatedBoard }),
    'Set field\'s "win" to true'
  )
  assert.end()
})

test('game.showMessage() should update message in state', assert => {
  const state = pipe(
    assocPath(['current'], 0),
    assocPath(['players', 0, 'name'], 'Player 1')
  )(setup())
  assert.deepEqual(
    actions.game.showMessage(state, actions, 'win'),
    { message: 'Player 1 wins!' },
    'Message: Player 1 wins!'
  )
  assert.deepEqual(
    actions.game.showMessage(state, actions, 'draw'),
    { message: 'It\'s a draw' },
    'Message: It\'s a draw'
  )
  assert.end()
})

test('game.startNewMatch() should clear the board', assert => {
  const state = merge(setup(), {
    board: b([
      ['_', 'X', 'O'],
      ['_', 'X', '_'],
      ['_', 'X', '_']
    ])
  })
  const newBoard = {
    board: b([
      ['_', '_', '_'],
      ['_', '_', '_'],
      ['_', '_', '_']
    ])
  }
  assert.deepEqual(
    actions.game.startNewMatch(state, actions),
    newBoard,
    'Filled board -> empty board'
  )
  assert.end()
})

test('game.increaseScore() should update score', assert => {
  
})

test('game.win() should update ', assert => {
  assert.end()
})
