import repeat from 'ramda/src/repeat'

export default {
  options: {
    types: [
      {
        names: [ 'Player', 'Player' ],
        ai: false
      },
      {
        names: [ 'Player', 'PC' ],
        ai: true
      }
    ],
    marks: [ 'X', 'O' ]
  },

  players: [
    { name: '', mark: '', score: 0, value: 7 },
    { name: '', mark: '', score: 0, value: 1 }
  ],
  ai: false,
  current: 0,
  board: repeat(repeat({ value: 0, mark: 'X' }, 3), 3)
}
