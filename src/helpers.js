import concat from 'ramda/src/concat'
import unnest from 'ramda/src/unnest'
import keys from 'ramda/src/keys'
import {
  getColumns,
  getDiagonals
} from './utils'

const isFull = (board) => {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

const getWinSeries = (board) => {
  const series = {
    rows: board,
    columns: getColumns(board),
    diagonals: getDiagonals(board)
  }
  return unnest(keys(series).map(key => series[key].filter(serie => checkWinSerie(serie))))
}

const checkWinSerie = (serie) =>
  serie[0].mark !== '' &&
  serie[0].mark === serie[1].mark &&
  serie[1].mark === serie[2].mark

const getAiMove = ({ board, players }) => {
  // @TODO
}

export {
  isFull,
  checkWinSerie,
  getWinSeries,
  getAiMove
}
