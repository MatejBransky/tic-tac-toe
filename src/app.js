import { app } from 'hyperapp'

import state from './state'
import view from './view'
import actions from './actions'
import events from './events'
import plugins from './plugins'

import { createBoard as b, getSeries } from './utils'
import { appendToField, evalFieldsInSeries } from './helpers'
import pipe from 'ramda/src/pipe'
const markValues = {
  '': 1, // empty field
  'X': 7, // PC
  'O': -6 // human player
}
const board = b([
  ['_', 'O', 'X'],
  ['_', '_', 'X'],
  ['_', '_', '_']
])
const series = pipe(
  appendToField(markValues),
  getSeries
)(board)
console.log(series)
console.log(evalFieldsInSeries(series))

app({
  state,
  view,
  actions,
  events,
  plugins,
  root: document.getElementById('app')
})
