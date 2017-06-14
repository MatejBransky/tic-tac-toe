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
  setCurrent,
  increaseScore,
  setMessage,
  clearWinSeries,
  clearBoard
} from './tools'
import * as utils from './utils'
import * as helpers from './helpers'
import F from 'ramda/src/F'
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
        setCurrent,
        setWinSeries,
        getState
      ), F)({ state, x, y }),

    nextAction: async (state, actions) => {
      if (state.winSeries.length > 0) {
        await actions.game.win()
      } else if (isFull(state.board)) {
        await actions.game.draw()
      } else if (state.ai && state.current) { // PC is always player n°1
        await actions.game.processAi()
      }
    },

    win: async (state, actions) => {
      actions.game.wait()
      await utils.delay(300)
      actions.game.showWinSeries()
      await utils.delay(1000)
      actions.game.showMessage('win')
    },

    draw: async (state, actions) => {
      actions.game.wait()
      await utils.delay(500)
      actions.game.showMessage('draw')
    },

    processAi: async (state, actions) => {
      actions.game.wait()
      const aiCoord = helpers.getAiMove(state)
      await utils.delay(500)
      actions.game.process(aiCoord)
    },

    showMessage: (state, actions, msg) => pipe(
      increaseScore,
      setMessage,
      getState
    )({ state, msg }),

    closeMessage: (state, actions) => actions.game.startNewMatch(),

    wait: () => ({ waiting: true }),

    continue: () => ({ waiting: false }),

    startNewMatch: async (state, actions) => {
      actions.game.clearGame()
      await actions.game.nextAction()
    },

    clearGame: (state) => pipe(
      setMessage,
      setCurrent,
      clearWinSeries,
      clearBoard,
      getState
    )({ state }),

    showWinSeries: (state) =>
      flatten(state.winSeries).reduce((board, field) =>
        assocPath(['board', field.y, field.x, 'win'], true, board), state),


    restart: (state, actions) => {
      if (state.message === '') {
        actions.game.startNewMatch()
      }
    }
  }
}
