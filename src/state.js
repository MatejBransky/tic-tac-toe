import repeat from 'ramda/src/repeat'

export default {
  options: {
    types: [
      {
        names: ['Player', 'Player'],
        ai: false
      },
      {
        names: ['Player', 'Computer'],
        ai: true
      }
    ],
    marks: ['X', 'O']
  },

  players: [
    { name: 'Player', mark: 'X', value: 7, score: 0 },
    { name: 'Player', mark: 'O', value: -6, score: 0 }
  ],
  ai: false,
  current: 0,
  board: repeat(repeat({ mark: '', value: 1, win: false }, 3), 3),
  messages: {
    win: { player: '', text: 'is winner!', show: false },
    draw: { text: 'It\'s a draw!', show: false }
  }
}
