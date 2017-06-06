import { app } from 'hyperapp'

import state from './state'
import view from './view'
import actions from './actions'
import events from './events'

app({
  state,
  view,
  actions,
  events,
  root: document.getElementById('app')
})
