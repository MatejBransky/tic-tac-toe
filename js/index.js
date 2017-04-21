const game = (() => {
  const state = {
    type: undefined,
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

  function setType(index) {
    const types = [
      ['Human', 'Human'],
      ['Human', 'PC']
    ]
    
    return state.type = types[index]
  }

  function setMarks(index) {
    const marks = [
      ['X', 'O'],
      ['O', 'X']
    ]
    
    return state.marks = marks[index]
  }

  function play(index) {
    let player = state.currentPlayer
    const mark = state.marks[player]
    const board = state.board
    board[index] = mark

    if (control({ board, mark, index }) === 3) {
      return console.log(`${state.marks[player]} wins!`)
    } else {
      return state.currentPlayer = player === 1 ? 0 : 1
    }
  }

  function control({ board, mark, index }) {
    const lines = winLines.filter(line => line.indexOf(index) !== -1)
    const output = lines.filter(line => {
      return line.map(index => board[index] === mark)
    })
    return output
  }

  return {
    setType,
    setMarks,
    play,
    state
  }
})()

// game.setType(1)
// game.setMarks(0)
// game.play(0 - 8)