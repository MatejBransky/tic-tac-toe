import concat from 'ramda/src/concat'
import unnest from 'ramda/src/unnest'
import keys from 'ramda/src/keys'
import pipe from 'ramda/src/pipe'
import { getSeries } from './utils'

const isFull = (board) => {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

const getWinSeries = (board) => {
  const series = getSeries(board)
  return unnest(keys(series).map(key => series[key].filter(serie => checkWinSerie(serie))))
}

const checkWinSerie = (serie) =>
  serie[0].mark !== '' &&
  serie[0].mark === serie[1].mark &&
  serie[1].mark === serie[2].mark

const getAiMove = (state) => {
  const values = {
    '': 1,
    [state.players[0].mark]: 7,
    [state.players[0].mark]: -6
  }
  const fields = pipe(
    getSeries, // get array of series
    appendToFields(values), // append values from settings to each field
    evalValues, // sum values in serie and append it to empty fields in each serie
    sumValues // sum field values from different series with the same field
  )(state.board)
  return getBestField(fields) // select field with max value
}

export {
  isFull,
  checkWinSerie,
  getWinSeries,
  getAiMove
}
