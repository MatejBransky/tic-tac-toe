import { h, app, Router } from 'hyperapp'

import TypesView from './view/typesView'
import MarksView from './view/marksView'
// import GameView from './view/gameView'
// import Game from './plugins/game'

app({
  state: {
    ai: true,
    players: [
      { name: 'Player', mark: 'X' },
      { name: 'PC', mark: 'O' }
    ],
    score: [0, 0]
  },

  view: {
    '*': (state, actions) =>
      <TypesView 
        onClick={ type => { 
          actions.setAi(type.ai)
          actions.setPlayers(type.playersNames)
          router.go('/marks')
        }
      } />,
    '/marks': (state, actions) =>
      <MarksView
        players={ state.players }
        marks={ state.marks }
        onclick={ marks => {
          actions.setMarks(marks)
          router.go('/game')
        }
      } />,
    // '/game': <GameView settings={ state } />
  },

  actions: {
    setAi: (state, actions, ai) => ({ ai }),
    setPlayers: (state, actions, playersNames) =>
      playersNames.map((name, index) => 
        state.players[index].name = name),
    setMarks: marks => ({ marks })
  },

  plugins: [ Router ]
})
