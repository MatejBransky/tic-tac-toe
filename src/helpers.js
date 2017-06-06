import concat from 'ramda/src/concat'
import unnest from 'ramda/src/unnest'
import keys from 'ramda/src/keys'
import merge from 'ramda/src/merge'
import flatten from 'ramda/src/flatten'
import pipe from 'ramda/src/pipe'
import zipObj from 'ramda/src/zipObj'
import groupWith from 'ramda/src/groupWith'
import { random, getSeries } from './utils'

// board: Array => boolean
const isFull = (board) => {
  const fieldsMarks = board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

// board: Array => series: Array
const getWinSeries = (board) => {
  const series = getSeries(board)
  return series.filter(serie => checkWinSerie(serie))
}

// serie: Array => boolean
const checkWinSerie = (serie) =>
  serie[0].mark !== '' &&
  serie[0].mark === serie[1].mark &&
  serie[1].mark === serie[2].mark

// board: Array => emptyFields: Array
const getEmptyFields = (board) => unnest(board).filter(field => !field.mark)

// mark: String => function => serie: Array => count: Number
const count = (mark) => (serie) => serie.reduce((acc, curr) => curr.mark === mark ? acc + 1 : acc, 0)

// marks: Array => function => fields: Array => stats: Object
const getStats = (marks) => (fields) => {
  const options = zipObj(['human', 'pc', 'empty'], [...marks, ''])
  return keys(options).reduce((obj, key) =>
    merge(obj, { [key]: count(options[key])(fields) }), {})
}

// marks: Array => function => series: Array => series: Array
const appendStats = (marks) => (series) =>
  series.map(fields => ({ stats: getStats(marks)(fields), fields }))

// codes: Object => function => series: Array => series: Array
const appendSerieValue = (codes) => (series) =>
  series.map(serie => serie.fields.map(field => merge(field, {
    value: codes[`${serie.stats.pc}${serie.stats.human}${serie.stats.empty}`]
  })))

// emptyFields: Array => function => series: Array => emptyFields: Array
const mapFields = (emptyFields) => (series) =>
  emptyFields.map(emptyField =>
    flatten(series).filter(field =>
      field.x === emptyField.x && field.y === emptyField.y).reduce((base, field) =>
        merge(base, { value: base.value + field.value })))

/**
 * Returns function for selecting field from groups of same fields (same field value)
 * @param {Function} method Method of selecting number from specified range
 */
const setSelectionOfField = (method) => (numberOfGroups) => (fields) => {
  const groups = groupWith((a, b) => a.value === b.value, fields)
  const length = groups.length
  const end = numberOfGroups > length
    ? length - 1
    : numberOfGroups - 1
  const group = groups[method(0, end)]
  return group[method(0, group.length - 1)]
}

// numberOfGroups: Number => function => fields: Array => field: Object
const getRandomField = setSelectionOfField(random)

// method: Function => function => fields: Array => field: Object
const getCoords = method => fields => {
  const field = method(fields.sort((a, b) => b.value - a.value))
  return { x: field.x, y: field.y }
}

// state: Object => aiCoord: Object
const getAiMove = (state) => {
  /**
   * Stats of marks in serie with serie's value (from the view of ai)
   * Key: 'ABC'
   *  A: number of ai marks
   *  B: number of human marks
   *  C: number of empty marks
   * Example: (ai: X, human: O, empty: _)
   * '201' <=> XX_ / X_X / _XX (the best option)
   * '021' <=> OO_ / O_O / _OO
   * '102' <=> X__ / _X_ / __X
   * '003' <=> ___
   * '012' <=> O__ / _O_ / __O
   * '111' <=> XO_ / OX_ / X_O / O_X / _XO / _OX (the worst option)
   */
  const codes = {
    '201': 100,
    '021': 50,
    '102': 5,
    '003': 2,
    '012': 1,
    '111': 0
  }
  // human: marks[0], ai: marks[1]
  const marks = state.players.map(player => player.mark)
  const emptyFields = getEmptyFields(state.board)
  return pipe(
    getSeries,
    appendStats(marks),
    appendSerieValue(codes),
    mapFields(emptyFields),
    getCoords(getRandomField(1))
  )(state.board)
}

export {
  isFull,
  checkWinSerie,
  getWinSeries,
  getEmptyFields,
  getStats,
  appendStats,
  appendSerieValue,
  mapFields,
  setSelectionOfField,
  getCoords,
  getAiMove
}
