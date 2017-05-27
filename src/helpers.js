import concat from 'ramda/src/concat'
import times from 'ramda/src/times'
import transpose from 'ramda/src/transpose'
import keys from 'ramda/src/keys'

const isDraw = (board) => {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

const getWinSeries = (board) => {
  const series = {
    rows: board,
    columns: transpose(board),
    diagonals: [
      times(i => board[i][i], 3),
      times(i => board[2 - i][2 - i], 3)
    ]
  }
  return keys(series).filter(serie => checkWinSerie(serie))
}

const checkWinSerie = (serie) => 
  serie[0].mark !== '' &&
  serie[0].mark === serie[1].mark && 
  serie[1].mark === serie[2].mark

const getAiMove = ({ board, players }) => {
  // @TODO
}

export {
  isDraw,
  checkWinSerie,
  getWinSeries,
  getAiMove
}
