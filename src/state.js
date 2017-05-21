export default {
  types: [
    {
      players: [
        { name: 'Player' },
        { name: 'Player' }
      ],
      ai: false
    },
    {
      players: [
        { name: 'Player' },
        { name: 'PC' }
      ],
      ai: true
    }
  ],

  marks: {
    players: [
      { name: '', mark: 'X' },
      { name: '', mark: 'O' }
    ]
  },

  game: {
    players: [
      { name: '', mark: '', score: 0 },
      { name: '', mark: '', score: 0 }
    ],
    ai: false,
    current: 0,
    board: [
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0]
    ]
  }
}
