import { h } from 'hyperapp'

import TypesView from './views/types'
import MarksView from './views/marks'
import GameView from './views/game'

export default {
  '/': (state, actions) =>
    <TypesView
      types={state.options.types}
      actions={actions.types}
    />,

  '/marks': (state, actions) =>
    <MarksView
      names={state.players.map(player => player.name)}
      marks={state.options.marks}
      actions={actions.marks}
    />,

  '/game': (state, actions) =>
    <GameView
      players={state.players}
      board={state.board}
      actions={actions.game}
    />
}
