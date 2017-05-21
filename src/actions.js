import { Router } from 'hyperapp'

import merge from 'ramda/src/merge'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

export default {
  types: {
    setAi: (state, actions, ai) => assocPath(['game', 'ai'], ai, state),
    setPlayers: (state, actions, players) => ({
      marks: {
        players: state.marks.players
          .map((player, index) => merge(player, players[index]))
      }
    }),
    setType: (state, actions, type) => {
      actions.types.setAi(type.ai)
      actions.types.setPlayers(type.players)
      actions.router.go('/marks')
    }
  },

  marks: {
    switchMarks: (state, actions, players) => {
      const marks = reverse(state.marks.players.map(player => player.mark))
      return {
        marks: {
          players: state.marks.players
            .map((player, index) => merge(player, { mark: marks[index] }))
        }
      }
    },
    setGame: (state, actions, players) => ({
      game: { players: merge(state.game.players, players) }
    }),
    setMarks: (state, actions, players) => {
      actions.marks.setGame(players)
      actions.router.go('/game')
    }
  }
}
