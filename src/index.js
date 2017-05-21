import { h, app, Router } from 'hyperapp'

import { TypesView } from './types'
import { MarksView } from './marks'
// import { GameView, Game } from './game'

app({
  state: {
    typesData: [
      {
        playersNames: ['Player', 'Player'],
        ai: false
      },
      {
        playersNames: ['Player', 'PC'],
        ai: true
      }
    ],
    marksData: [
      { name: '', mark: 'X' },
      { name: '', mark: 'O' }
    ],
    gameData: {
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
        data={state.typesData}
        setType={type => {
          actions.setAi(type.ai)
          actions.setPlayers(type.playersNames)
          actions.router.go('/marks')
        }} />,
    '/marks': (state, actions) =>
      <MarksView
        data={state.marksData}
        switchMarks={actions.switchMarks}
        setMarks={players => {
          actions.setMarks(players)
          console.log(state.gameData)
        }} />
  },

  actions: {
    setAi: (state, actions, ai) => ({ ai }),
    setPlayers: (state, actions, playersNames) => ({
      marksData: [
        { name: playersNames[0], mark: 'X' },
        { name: playersNames[1], mark: 'O' }
      ]
    }),
    switchMarks: (state, actions, players) => ({
      marksData: [
        { name: players[0].name, mark: players[1].mark },
        { name: players[1].name, mark: players[0].mark }
      ]
    }),
    setMarks: (state, actions, players) => ({
      gameData: {
        players: [
          { name: players[0].name, mark: players[0].mark, score: state.gameData.players[0].score },
          { name: players[1].name, mark: players[1].mark, score: state.gameData.players[1].score }
        ]
      }
    })
  },

  plugins: [Router]
})
