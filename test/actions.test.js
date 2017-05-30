import test from 'tape'
import state from '../src/state'
import actions from '../src/actions'

const setup = () => state

test('types.setAi() should update boolean value of state.ai', assert => {
  const state = setup()
  assert.deepEqual(
    actions.types.setAi(state, actions, false),
    Object.assign({}, state, { ai: false }),
    'Update state.ai to false'
  )
  assert.end()
})

test('types.setNames() should update names of players in state', assert => {
  const names = ['Player', 'PC']
  const state = setup()
  assert.deepEqual(
    actions.types.setNames(state, actions, names),
    Object.assign({}, state, {
      players: [
        Object.assign({}, state.players[0], { name: 'Player' }),
        Object.assign({}, state.players[1], { name: 'PC' })
      ]
    }),
    'Change players names to ["Player", "PC"]'
  )
  assert.end()
})


