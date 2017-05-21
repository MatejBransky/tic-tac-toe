import { app } from 'hyperapp'

import state from './state'
import view from './view'
import actions from './actions'
import events from './events'
import plugins from './plugins'

app({
  state,
  view,
  actions,
  events,
  plugins
})
