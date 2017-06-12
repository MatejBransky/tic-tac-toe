import {
  setPage,
  getState,

  setAi,
  setNames,
  setMarks,

  clickOn,
  setField,
  setWinSeries,
  isWin,
  isFull,
  setCurrent
} from './tools'
import * as utils from './utils'
import * as helpers from './helpers'
import T from 'ramda/src/T'
import when from 'ramda/src/when'
import cond from 'ramda/src/cond'
import prop from 'ramda/src/prop'
import pipe from 'ramda/src/pipe'
import flatten from 'ramda/src/flatten'
import lensPath from 'ramda/src/lensPath'
import view from 'ramda/src/view'
import set from 'ramda/src/set'
import times from 'ramda/src/times'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

export default {
  types: {
    process: (state, actions, { type, page }) => pipe(
      setAi,
      setNames,
      setPage,
      getState
    )({ state, type, page })
  },

  marks: {
    switch: (state) => assocPath(
      ['options', 'marks'],
      reverse(state.options.marks),
      state
    ),

    process: (state, actions, { page }) => pipe(
      setMarks,
      setPage,
      getState
    )({ state, page })
  },

  game: {
    clickField: (state, actions, { x, y }) =>
      when(clickOn, pipe(
        setField,
        setWinSeries,
        cond([
          [isWin, actions.game.win],
          [isFull, actions.game.draw],
          [T, setCurrent]
        ]),
        getState
      ))({ state, x, y }),

    win: async (state, actions) => {
      actions.game.wait()
      await utils.delay(300)
      actions.game.showWinSeries(state.winSeries)
      await utils.delay(1000)
      actions.game.increaseScore()
      actions.game.setMessage('win')
    },

    draw: async (state, actions) => {
      actions.game.wait()
      await utils.delay(500)
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
      board: times(y => times(x => utils.createField('_', x, y), 3), 3)
    }),

    showWinSeries: (state, actions, winSeries) =>
      flatten(winSeries).reduce((board, field) =>
        assocPath(['board', field.y, field.x, 'win'], true, board), state),

    increaseScore: (state) => {
      const score = lensPath(['players', state.current, 'score'])
      const value = view(score, state) + 1
      return set(score, value, state)
    },

    processAi: async (state, actions) => {
      if (state.ai && state.current) { // PC is always player n°1
        actions.game.wait()
        const aiCoord = helpers.getAiMove(state)
        await utils.delay(500)
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
