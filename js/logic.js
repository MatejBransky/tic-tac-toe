const logic = (() => {
  const state = {
    players: {
      types: [undefined, undefined],
      marks: ['X', 'O'],
      score: [0, 0]
    },
    currentPlayer: Math.round(Math.random()),
    board: new Array(9).fill(null)
  }

  events.on('init', giveTypes)
  events.on('typeClicked', setType)


  function giveTypes() {
    const types = [
      ['Human', 'Human'],
      ['Human', 'PC']
    ]
    events.publish('typesGived', types)
  }

  function setType(index) {
    const newState = Object.assign({}, state)
    newState.players.type = data.types[index]
    setState(newState)
    events.publish('typeDone')
  }

  function setState(input) {
    Object.assign(state, input)
    events.publish('stateChanged', input)
  }

  return {
    giveTypes,
    setType
  }
})()