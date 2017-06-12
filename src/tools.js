import concat from 'ramda/src/concat'
import merge from 'ramda/src/merge'
import assocPath from 'ramda/src/assocPath'
import * as utils from './utils'

const setAi = (data) => assocPath(['state', 'ai'], data.type.ai, data)

const setNames = (data) => utils.distribute({
  key: 'name',
  values: data.type.names,
  course: ['state', 'players'],
  parent: data
})

const setMarks = (data) =>
  utils.distribute({
    key: 'mark',
    values: data.state.options.marks,
    course: ['state', 'players'],
    parent: data
  })

const clickOn = (data) =>
  !(data.state.current
    && data.state.ai
    || data.state.message !== ''
    || data.state.board[data.y][data.x].mark !== '')

const setField = (data) => {
  const { state, x, y } = data
  return assocPath(
    ['state', 'board', y, x, 'mark'],
    state.players[state.current].mark,
    data
  )
}

// serie: Array => boolean
const isWinSerie = (serie) =>
  serie[0].mark !== '' &&
  serie[0].mark === serie[1].mark &&
  serie[1].mark === serie[2].mark

const setWinSeries = (data) => {
  const { board } = data.state
  const series = utils.getSeries(board)
  const winSeries = series.filter(serie => isWinSerie(serie))
  return assocPath(['state', 'winSeries'], winSeries, data)
}

const isWin = (data) => data.state.winSeries.length > 0

const isFull = (data) => {
  const fieldsMarks = data.state.board.reduce((marks, row) =>
    concat(marks, row.map(field => field.mark)), [])
  return !fieldsMarks.includes('')
}

const setCurrent = (data) => assocPath(
  ['state', 'current'],
  data.state.current ? 0 : 1,
  data
)


const setPage = (data) => assocPath(['state', 'page'], data.page, data)

const getState = (data) => data.state

export {
  setPage,
  getState,

  setAi,
  setNames,
  setMarks,

  clickOn,
  setField,
  setWinSeries,
  isWin,
  isFull,
  setCurrent
}
