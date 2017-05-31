import concat from 'ramda/src/concat'
import unnest from 'ramda/src/unnest'
import keys from 'ramda/src/keys'
import merge from 'ramda/src/merge'
import sum from 'ramda/src/sum'
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

const appendToField = (markValues) => (board) => board
  .map(row => row.map(field => merge(field, { value: markValues[field.mark] })))

// series: Object => Object
// const evalFieldsInSeries = (series) => {
//   return keys(series).map(key => series[key].map(serie => sum(serie.map(field => field.value))))
// }

const evalFieldsInBoard = (series) => { }

const getBestField = (fields) => { }

const getAiMove = (state) => {
  const appendFieldValues = appendToField({
    '': 1, // empty field
    [state.players[1].mark]: 7, // PC
    [state.players[0].mark]: -6 // human player
  })
  const fields = pipe(
    appendFieldValues, // append values from settings to each field
    getSeries, // get array of series
    evalFieldsInSeries, // for each serie: sum values in serie and append it to empty fields (possible move)
    evalFieldsInBoard // sum field values from different series with the same field
  )(state.board)
  return getBestField(fields) // select field with max value
}

export {
  isFull,
  checkWinSerie,
  getWinSeries,
  appendToField,
  evalFieldsInSeries,
  evalFieldsInBoard,
  getBestField,
  getAiMove
}
