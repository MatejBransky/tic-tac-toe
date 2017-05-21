import { h } from 'hyperapp'

import TypesView from './views/types'
import MarksView from './views/marks'
import GameView from './views/game'

export default {
  '/': (state, actions) =>
    <TypesView
      data={state.types}
      actions={actions.types}
    />,

  '/marks': (state, actions) =>
    <MarksView
      data={state.marks}
      actions={actions.marks}
    />,

  '/game': (state, actions) =>
    <GameView
      data={state.game}
      actions={actions.game}
    />
}
