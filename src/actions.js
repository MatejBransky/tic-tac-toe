import {
  setPage,
  getState,
  setAi,
  setNames,
  setMarks,
  clickOn,
  setField,
  setWinSeries,
  isFull,
  setNext,
  increaseScore,
  setMessage,
  clearWinSeries,
  clearBoard
} from './tools'
import * as utils from './utils'
import * as helpers from './helpers'
import ifElse from 'ramda/src/ifElse'
import pipe from 'ramda/src/pipe'
import flatten from 'ramda/src/flatten'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

export default {
  types: {
    process: (state, actions, { type, page }) =>
      pipe(
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

    process: (state, actions, { page }) =>
      pipe(
        setMarks,
        setPage,
        getState
      )({ state, page })
  },

  game: {
    process: (state, actions, coord) => {
      actions.game.clickField(coord)
      actions.game.nextAction()
    },

    clickField: (state, actions, { x, y }) =>
      ifElse(clickOn, pipe(
        setField,
        setNext,
        setWinSeries,
        getState
      ), () => null)({ state, x, y }),

    nextAction: async (state, actions) => {
      actions.game.wait()
      if (state.winSeries.length > 0) {
        actions.game.win()
      } else if (isFull(state.board)) {
        actions.game.draw()
      } else if (state.ai && state.next) { // PC is always player n°1
        await actions.game.processAi()
      } else {
        actions.game.continue()
      }
    },

    win: async (state, actions) => {
      await utils.delay(300)
      actions.game.showWinSeries()
      await utils.delay(1000)
      actions.game.showMessage('win')
      actions.game.increaseScore(state.next ? 0 : 1)
    },

    draw: async (state, actions) => {
      await utils.delay(500)
      actions.game.showMessage('draw')
    },

    processAi: async (state, actions) => {
      const aiCoord = helpers.getAiMove(state)
      await utils.delay(500)
      actions.game.process(aiCoord)
    },

    showWinSeries: (state) =>
      flatten(state.winSeries).reduce((board, field) =>
        assocPath(['board', field.y, field.x, 'win'], true, board), state),

    increaseScore: (state, actions, player) => pipe(
      increaseScore,
      getState
    )({ state, player }),

    showMessage: (state, actions, msg) => pipe(
      setMessage,
      getState
    )({ state, msg }),

    closeMessage: (state, actions) => actions.game.startNewMatch(),

    wait: () => ({ waiting: true }),

    continue: () => ({ waiting: false }),

    startNewMatch: async (state, actions) => {
      actions.game.clearGame()
      await actions.game.nextAction()
      actions.game.continue()
    },

    clearGame: (state) => pipe(
      setMessage,
      setNext,
      clearWinSeries,
      clearBoard,
      getState
    )({ state, next: utils.random }),

    restart: (state, actions) => {
      if (state.message === '') {
        actions.game.startNewMatch()
      }
    }
  }
}
