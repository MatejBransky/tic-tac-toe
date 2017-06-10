import {
  delay,
  random,
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
  go: (state, actions, page) => ({ page }),

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
    }
  },

  game: {
    clickField: (state, actions, coord) => {
      if (state.current && state.ai
        || state.message !== ''
        || state.board[coord.y][coord.x].mark !== '') return
      actions.game.setField(coord)
      actions.game.process()
    },

    setField: (state, actions, coord) => assocPath(
      ['board', coord.y, coord.x, 'mark'],
      state.players[state.current].mark,
      state
    ),

    process: (state, actions) => {
      const winSeries = getWinSeries(state.board)

      if (winSeries.length > 0) {
        actions.game.win(winSeries)
      } else if (isFull(state.board)) {
        actions.game.draw()
      } else {
        actions.game.setCurrent()
        actions.game.processAi()
      }
    },

    win: async (state, actions, winSeries) => {
      actions.game.wait()
      await delay(300)
      actions.game.showWinSeries(winSeries)
      await delay(1000)
      actions.game.increaseScore()
      actions.game.setMessage('win')
    },

    draw: async (state, actions) => {
      actions.game.wait()
      await delay(500)
      actions.game.setMessage('draw')
    },

    setMessage: (state, actions, msg = 'empty') => {
      const mark = state.players[state.current].mark
      const message = {
        win: `${mark} wins!`,
        draw: 'It\'s a draw',
        empty: ''
      }
      return { message: message[msg] }
    },

    closeMessage: (state, actions) => {
      actions.game.setMessage()
      actions.game.startNewMatch() // clear board
    },

    wait: () => ({ waiting: true }),

    continue: () => ({ waiting: false }),

    startNewMatch: async (state, actions) => {
      actions.game.setCurrent()
      actions.game.clearBoard()
      await actions.game.processAi()
      actions.game.continue()
    },

    clearBoard: () => ({ 
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

    setCurrent: (state, actions, force = undefined) => force === undefined
      ? state.current ? { current: 0 } : { current: 1 }
      : { current: force },

    processAi: async (state, actions) => {
      if (state.ai && state.current) { // PC is always player n°1
        actions.game.wait()
        const aiCoord = getAiMove(state)
        await delay(500)
        actions.game.setField(aiCoord)
        actions.game.process()
      } else {
        actions.game.continue()
      }
    },

    restart: (state, actions) => {
      if (state.message === '') {
        actions.game.startNewMatch()
      }
    }
  }
}
