import { h, app, Router } from 'hyperapp'

import merge from 'ramda/src/merge'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

import TypesView from './types'
import MarksView from './marks'
import GameView from './game'

app({
  state: {
    types: [
      {
        players: [
          { name: 'Player' }, 
          { name: 'Player' }
        ],
        ai: false
      },
      {
        players: [
          { name: 'Player' },
          { name: 'PC' }
        ],
        ai: true
      }
    ],

    marks: {
      players: [
        { name: '', mark: 'X' },
        { name: '', mark: 'O' }
      ]
    },

    game: {
      players: [
        { name: '', mark: '', score: 0 },
        { name: '', mark: '', score: 0 }
      ],
      ai: false
    }
  },

  view: {
    '*': (state, actions) =>
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
      <GameView data={state.game} />
  },

  actions: {
    setAi: (state, actions, ai) => assocPath(['game', 'ai'], ai, state),
    setPlayers: (state, actions, players) => ({
      marks: {
        players: state.marks.players
          .map((player, index) => merge(player, players[index]))
      }
    }),

    switchMarks: (state, actions, players) => {
      const marks = reverse(state.marks.players.map(player => player.mark))
      return {
        marks: {
          players: state.marks.players
            .map((player, index) => merge(player, { mark: marks[index] }))
        }
      }
    },
    setMarks: (state, actions, players) => ({
      game: { players: merge(state.game.players, players) }
    })

  },

  events: {
    update: (s, a, d) => console.log(JSON.stringify(d))
  },

  plugins: [ Router ]
})
