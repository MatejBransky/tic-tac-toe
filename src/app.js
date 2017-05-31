import { app } from 'hyperapp'

import state from './state'
import view from './view'
import actions from './actions'
import events from './events'
import plugins from './plugins'

import { createBoard as b, getSeries } from './utils'
import { appendToField, evalFieldsInSeries, evalFieldsInBoard, getBestField } from './helpers'
import pipe from 'ramda/src/pipe'
const markValues = {
  '': 1, // empty field
  'X': 7, // PC
  'O': -6 // human player
}
const board = b([
  ['_', 'O', 'X'],
  ['_', 'O', '_'],
  ['_', '_', '_']
])
const series = pipe(
  appendToField(markValues),
  getSeries,
  evalFieldsInSeries,
  evalFieldsInBoard
)(board)
console.table(series.map(serie => serie.map(field => field.eval)))

app({
  state,
  view,
  actions,
  events,
  plugins,
  root: document.getElementById('app')
})
