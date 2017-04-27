const { compose, pipe } = require('./helpers.js')

const events = (() => {
  const topics = []

  function on (topic, action) {
    if (!topics.hasOwnProperty(topic)) topics[topic] = []
    const index = topics[topic].push(action)

    function remove () {
      topics[topic][index] = null
    }

    return {
      remove
    }
  }

  function publish (topic, data) {
    if (!topics.hasOwnProperty(topic)) return false
    topics[topic].forEach(action => action(data))
    return true
  }

  return {
    on,
    publish
  }
})()

const game = (() => {
  const fieldValues = {
    ai: 8,
    player: -6,
    empty: 1
  }

  const state = {
    ai: undefined,
    marks: undefined,
    board: new Array(9).fill(null),
    currentPlayer: Math.round(Math.random())
  }

  const winLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ]

  function setAi(bool) { // TODO: attach values of ai, player, empty to marks
    return state.ai = bool
  }

  function setMarks(index) {
    const marks = [
      ['X', 'O'],
      ['O', 'X']
    ]
    return state.marks = marks[index]
  }

  function play(index) {
    const player = state.currentPlayer
    const mark = state.marks[player]
    const board = state.board
    board[index] = mark

    const winLines = control({ board, mark, index })
    
    if (winLines.length) {
      return events.publish('win', { player: mark, winLines })
    } else {
      state.currentPlayer = player === 1 ? 0 : 1
      if (state.ai) {
        return events.publish('pc', answer(state))
      }
    }
  }

  function control({ board, mark, index }) {
    const lines = winLines.filter(line => line.indexOf(index) !== -1)
    const output = lines.filter(line => {
      const conformity = line.map(index => board[index] === mark ? 1 : 0)
      const sum = conformity.reduce((prev, curr) => prev + curr, 0)
      return sum === 3
    })
    return output // TODO: draw
  }

  function answer({ board, marks }) { // TODO: use solution in tests.js
    const [player, ai] = marks
    const fields = board.map(field => {
      switch (field) {
        case ai:
          return 7
        case player:
          return -6
        default:
          return 1
      }
    })

    const emptyFields = fields.reduce((array, field, index) => {
      if (field === 1) array.push(index)
      return array
    }, [])

    return emptyFields.map(index => {
      const indexLines = winLines.filter(line => line.indexOf(index) !== -1)
      const valueOfLines = indexLines.map(line =>
        line.map(index => fields[index]))
      return indexLines
    }) 

    // const fieldsValueInLines = winLines.map(line => {
    //   return line.map(index => fieldsValueInBoard[index])
    // })

    // const fieldsOutputInLines = 

    // return movesValue
  }

  return {
    setAi,
    setMarks,
    play,
    state, // temp
    control, // temp
    answer // temp
  }
})()

/*eslint no-console: ["error", { allow: ["log", "error"] }] */

// console.log('AI: ' + JSON.stringify(game.setAi(1)))
// console.log('Marks: ' + JSON.stringify(game.setMarks(0)))
// console.log(JSON.stringify(game.state.board))
// console.log(`Next player: ${game.play(0)}`)
// console.log(JSON.stringify(game.state.board))
// console.log(`Next player: ${game.play(3)}`)
// console.log(JSON.stringify(game.state.board))
// console.log(`Next player: ${game.play(1)}`)
// console.log(JSON.stringify(game.state.board))
// console.log(`Next player: ${game.play(4)}`)
// console.log(`Next player: ${game.play(2)}`)
// console.log(JSON.stringify(game.state.board))

const state = {
  board: [
    null, null, null, 
    null, 'X', 'O', 
    null, null, null, 
  ],
  marks: ['O', 'X']
}

console.log(game.answer(state))