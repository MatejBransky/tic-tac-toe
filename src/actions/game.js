import assocPath from 'ramda/src/assocPath'
import concat from 'ramda/src/concat'
import transpose from 'ramda/src/transpose'
import times from 'ramda/src/times'
import keys from 'ramda/src/keys'

const processGame = (state, actions, coord) => {
  actions.game.setField(coord)

  const { board } = setField(state, coord)
  
  console.log(check(board))
  // console.log(actions.game.checkBoard(board))
  // const { winner, draw } = actions.game.checkBoard()
  // if (winner.name) {
  //   actions.game.showWinSeries(winner.winSeries)
  //   actions.game.showMessage(winner.name)
  //   actions.game.setScore()
  //   return actions.game.startNewMatch() // clear board
  // }
  // if (draw) {
  //   actions.game.showMessage()
  //   return actions.game.startNewMatch()
  // }

  // const current = actions.game.setCurrent()
  // if (current && state.ai) {
  //   const aiCoord = actions.game.getAiMove()
  //   return actions.process(aiCoord)
  // }

}

function setField(state, coord) {
  return assocPath(
    ['board', coord.y, coord.x],
    {
      value: state.players[state.current].value,
      mark: state.players[state.current].mark
    },
    state
  )
}

function check(board) {
  // Draw part
  const draw = isDraw(board)
  if (draw) return { winner: { name: '' }, draw }
  // // Win part
  const winner = checkWinner(board)
  if (winner) return { winner, draw: false }
  // // Continue part
  return { winner: { name: '' }, draw: false }
}

function isDraw(board) {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

function checkWinner(board) {
  const series = {
    rows: board,
    columns: transpose(board),
    diagonals: [
      times(i => board[i][i], 3),
      times(i => board[3 - i][3 - i], 3)
    ]
  }
  keys(series).map(serie => checkSerie(serie)) // number of fields in serie
}

function checkSerie(serie) {

}

export default processGame
