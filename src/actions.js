import {
  createField,
  distribute
} from './utils'
import {
  isFull,
  getWinSeries,
  getAiMove
} from './helpers'
import flatten from 'ramda/src/flatten'
import lensPath from 'ramda/src/lensPath'
import view from 'ramda/src/view'
import set from 'ramda/src/set'
import times from 'ramda/src/times'
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
    switchMarks: (state) => assocPath(
      ['options', 'marks'],
      reverse(state.options.marks),
      state
    ),

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
    setField: (state, actions, coord) => assocPath(
      ['board', coord.y, coord.x, 'mark'],
      state.players[state.current].mark,
      state
    ),

    process: (state, actions) => {
      const full = isFull(state.board)
      const winSeries = getWinSeries(state.board)

      if (winSeries.length > 0) {
        actions.game.win(winSeries)
      } else if (full) {
        actions.game.draw()
      } else {
        actions.game.setCurrent()
        actions.game.processAi()
      }
    },

    win: (state, actions, winSeries) => {
      setTimeout(actions.game.showWinSeries, 500, winSeries)
      setTimeout(actions.game.setMessage, 1500, 'win')
    },

    draw: (state, actions) => {
      actions.game.setMessage('draw')
      actions.game.startNewMatch() // clear board
    },

    setMessage: (state, actions, msg) => {
      const player = state.players[state.current].name
      const message = {
        win: `${player} wins!`,
        draw: 'It\'s a draw'
      }
      return { message: message[msg] }
    },

    closeMessage: (state, actions) => {
      actions.game.setMessage('')
      actions.game.increaseScore()
      actions.game.startNewMatch() // clear board
    },

    startNewMatch: () => ({
      board: times(y => times(x => createField('_', x, y), 3), 3)
    }),

    showWinSeries: (state, actions, winSeries) =>
      flatten(winSeries).reduce((board, field) =>
        assocPath(['board', field.y, field.x, 'win'], true, board), state),

    increaseScore: (state) => {
      const score = lensPath(['players', state.current, 'score'])
      const value = view(score, state) + 1
      return set(score, value, state)
    },

    setCurrent: (state) => state.current ? { current: 0 } : { current: 1 },

    processAi: (state, actions) => {
      if (state.ai && state.current) { // PC is always player n°1
        const aiCoord = getAiMove(state)
        setTimeout((aiCoord) => {
          actions.game.setField(aiCoord)
          actions.game.process()
        }, 500, aiCoord)
      }
    },

    restart: (state, actions) => {
      actions.game.startNewMatch()
    }
  }
}
