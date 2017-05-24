import { h } from 'hyperapp'

import Box from './views/box.js'
import TypesView from './views/types'
import MarksView from './views/marks'
import GameView from './views/game'

export default {
  '/': (state, actions) =>
    <Box>
      <TypesView
        types={state.options.types}
        actions={actions.types}
      />
    </Box>,

  '/marks': (state, actions) =>
    <Box>
      <MarksView
        names={state.players.map(player => player.name)}
        marks={state.options.marks}
        actions={actions.marks}
      />
    </Box>,

  '/game': (state, actions) =>
    <Box>
      <GameView
        players={state.players}
        board={state.board}
        actions={actions.game}
      />
    </Box>
}
