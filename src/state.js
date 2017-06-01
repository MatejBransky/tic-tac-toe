import times from 'ramda/src/times'

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
    { name: 'Player A', mark: 'X', score: 0 },
    { name: 'Player B', mark: 'O', score: 0 }
  ],
  ai: false,
  current: 0,
  board: times(y => times(x => ({
    x,
    y,
    mark: '',
    win: false
  }), 3), 3),
  message: ''
}
