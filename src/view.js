import { h } from 'hyperapp'

import TypesView from './views/types'
import MarksView from './views/marks'
import GameView from './views/game'

export default {
  '/': (state, actions) =>
    <TypesView
      data={state.types}
      setType={type => {
        actions.setAi(type.ai)
        actions.setPlayers(type.players)
        actions.router.go('/marks')
      }}
    />,

  '/marks': (state, actions) =>
    <MarksView
      data={state.marks}
      switchMarks={actions.switchMarks}
      setMarks={players => {
        actions.setMarks(players)
        actions.router.go('/game')
      }}
    />,

  '/game': (state, actions) =>
    <GameView
      data={state.game}
      actions={actions}
    />
}
