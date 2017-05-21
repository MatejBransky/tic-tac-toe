import { Router } from 'hyperapp'

import merge from 'ramda/src/merge'
import assocPath from 'ramda/src/assocPath'
import reverse from 'ramda/src/reverse'

export default {
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
}
