import { distribute } from './utils'
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
    process: (state, actions, coord) => {
      actions.game.setField(coord)
      actions.game.checkAndContinue()
    },

    setField: (state, actions, coord) => assocPath(
      ['board', coord.y, coord.x],
      {
        value: state.players[state.current].value,
        mark: state.players[state.current].mark
      },
      state
    ),

    checkAndContinue: (state, actions) => {
      if (isDraw(state.board)) {
        actions.game.showMessage('DRAW')
        actions.game.startNewMatch() // clear board
        return
      }
      const winSeries = checkWinSeries(state.board)
      if (winSeries) {
        actions.game.showWinSeries(winSeries)
        actions.game.showMessage('WIN')
        actions.game.setScore()
        actions.game.startNewMatch() // clear board
        return
      }
      actions.game.setCurrent()
      actions.game.processAi()
    },

    showMessage: (state, actions, msg) => {
      // @TODO
    },

    startNewMatch: (state, actions) => {
      // @TODO
    },

    showWinSeries: (state, actions, winSeries) => {
      // @TODO
    },

    setScore: (state, actions) => {
      // @TODO
    },

    setCurrent: (state) => state.current ? { current: 0 } : { current: 1 },

    processAi: (state, actions) => {
      if (state.current && state.ai) {
        const aiCoord = getAiMove(state)
        actions.process(aiCoord)
      }
    },

    restart: (state, actions) => {
      // @TODO
    }
  }
}
