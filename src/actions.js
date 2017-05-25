import { distribute } from './tools'

import processGame from './actions/game'

import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

export default {
  types: {
    setAi: (state, actions, ai) => assocPath(['ai'], ai, state),

    setNames: (state, actions, names) => distribute({
      key: 'name',
      values: names,
      course: ['players'],
      parent: state
    }),

    setGame: (state, actions, type) => {
      actions.types.setAi(type.ai)
      actions.types.setNames(type.names)
      actions.router.go('/marks')
    }
  },

  marks: {
    switchMarks: (state) => assocPath(['options', 'marks'], reverse(state.options.marks), state),

    setMarks: (state) => distribute({
      key: 'mark',
      values: state.options.marks,
      course: ['players'],
      parent: state
    }),

    setGame: (state, actions) => {
      actions.marks.setMarks()
      actions.router.go('/game')
    }
  },

  game: {
    process: processGame,

    setField: (state, actions, coord) => assocPath(
      ['board', coord.y, coord.x],
      {
        value: state.players[state.current].value,
        mark: state.players[state.current].mark
      },
      state
    ),

    setCurrent: (state) => state.current ? { current: 0 } : { current: 1 },

    restart: (state, actions) => {

    }
  }
}
