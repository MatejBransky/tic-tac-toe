import { h, app, Router } from 'hyperapp'

import TypesView from './view/typesView'
import MarksView from './view/marksView'
// import GameView from './view/gameView'
// import Game from './plugins/game'

app({
  state: {
    type: 0,
    marks: ['X', 'O'],
    score: [0, 0]
  },

  view: {
    '*': (state, { setType, router }) =>
      <TypesView onClick={ type => { 
        setType(type)
        router.go('/marks')
        }
      } />,
    '/marks': (state, { setMarks, router }) =>
      <MarksView onclick={ marks => {
        setMarks(marks)
        router.go('/game')
        }
      } />,
    // '/game': <GameView settings={ state } />
  },

  actions: {
    setType: type => ({ type }),
    setMarks: marks => ({ marks }),
    setRoute: route => ({ route })
  },

  plugins: [ Router ]
})
