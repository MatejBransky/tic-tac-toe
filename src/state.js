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
    { name: 'Player', mark: 'X', value: 7, score: 0 },
    { name: 'Player', mark: 'O', value: -6, score: 0 }
  ],
  ai: false,
  current: 0,
  board: times(y => times(x => ({
    x,
    y,
    mark: '',
    value: 1,
    win: false
  }), 3), 3),
  message: ''
}
