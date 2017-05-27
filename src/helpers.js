import concat from 'ramda/src/concat'
import times from 'ramda/src/times'
import transpose from 'ramda/src/transpose'
import keys from 'ramda/src/keys'

const isDraw = (board) => {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

const checkWinSeries = (board) => {
  const series = {
    rows: board,
    columns: transpose(board),
    diagonals: [
      times(i => board[i][i], 3),
      times(i => board[3 - i][3 - i], 3)
    ]
  }
  keys(series).map(serie => checkWinSerie(serie)) // number of fields in serie
  // @TODO
}

const checkWinSerie = (serie) => serie.every((field) => field.mark === serie[0].mark)

const getAiMove = ({ board, players }) => {
  // @TODO
}

export {
  isDraw,
  checkWinSerie,
  checkWinSeries,
  getAiMove
}
