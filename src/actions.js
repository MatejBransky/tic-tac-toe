import { distribute } from './tools'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'
import concat from 'ramda/src/concat'
import transpose from 'ramda/src/transpose'
import times from 'ramda/src/times'
import keys from 'ramda/src/keys'

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

function isDraw(board) {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

function checkWinSeries(board) {
  const series = {
    rows: board,
    columns: transpose(board),
    diagonals: [
      times(i => board[i][i], 3),
      times(i => board[3 - i][3 - i], 3)
    ]
  }
  keys(series).map(serie => checkSerie(serie)) // number of fields in serie
  // @TODO
}

function getAiMove({ board, players }) {
  // @TODO
}
