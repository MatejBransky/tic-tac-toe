import times from 'ramda/src/times'

export default {
  page: 'Types',
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
    { name: '', mark: '', score: 0 },
    { name: '', mark: '', score: 0 }
  ],
  ai: true,
  next: 0,
  board: times(y => times(x => ({
    x,
    y,
    mark: '',
    win: false
  }), 3), 3),
  winSeries: [],
  messages: {
    win: (player) => `${player} wins!`,
    draw: () => 'It\'s a draw'
  },
  message: '',
  waiting: false
}
