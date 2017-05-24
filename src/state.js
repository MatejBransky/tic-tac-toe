import repeat from 'ramda/src/repeat'

export default {
  options: {
    types: [
      {
        names: [ 'Player', 'Player' ],
        ai: false
      },
      {
        names: [ 'Player', 'Computer' ],
        ai: true
      }
    ],
    marks: [ 'X', 'O' ]
  },

  players: [
    { name: 'Player', mark: 'X', score: 0, value: 7 },
    { name: 'Player', mark: 'O', score: 0, value: 1 }
  ],
  ai: false,
  current: 0,
  board: repeat(repeat({ value: 0, mark: '' }, 3), 3)
}
