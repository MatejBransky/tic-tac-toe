import concat from 'ramda/src/concat'
import unnest from 'ramda/src/unnest'
import keys from 'ramda/src/keys'
import merge from 'ramda/src/merge'
import flatten from 'ramda/src/flatten'
import times from 'ramda/src/times'
import assocPath from 'ramda/src/assocPath'
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

// series: Object => series: Array
const evalFieldsInSeries = (series) => keys(series)
  .map(key => series[key]
    .map(serie => serie
      .map(field => merge(field, {
        eval: field.mark === ''
          ? Math.abs(sum(serie.map(field => field.value)))
          : 0
      }))))

// series: Array => board: Array
const evalFieldsInBoard = (series) =>
  times(y =>
    times(x =>
      flatten(series)
        .filter(field => field.x === x && field.y === y)
        .reduce((prev, curr) =>
          assocPath(['eval'], prev.eval + curr.eval, prev)), 3), 3)

// board: Array => field: Object
const getBestField = (board) => flatten(board).reduce((prev, curr) =>
  prev.eval > curr.eval
    ? prev
    : curr
)

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
