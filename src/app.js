import { app } from 'hyperapp'

import state from './state'
import view from './view'
import actions from './actions'
import events from './events'
import History from './history'

app({
  state,
  view,
  actions,
  events,
  plugins: [History],
  root: document.getElementById('app')
})
