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
    { name: 'Player', mark: 'X', score: 0 },
    { name: 'PC', mark: 'O', score: 0 }
  ],
  ai: true,
  current: 0,
  board: times(y => times(x => ({
    x,
    y,
    mark: '',
    win: false
  }), 3), 3),
  message: '',
  waiting: false
}
