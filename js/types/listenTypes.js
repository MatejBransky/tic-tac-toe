import listen from '../tools/listen'
import { publish } from '../tools/events'

const listenTypes = state => {
  const types = state.loadTypes.data.types
  const names = state.listenTypes.names

  listen({ container: 'js-types', part: 'js-option' })
    .then(clicked => {
      const { index } = clicked.dataset
      const newState = Object.assign({}, state)
      const players = newState.loadMarks.data.players
      players[0].name = names[index][0]
      players[1].name = names[index][1]
      publish('typeDone', newState)
    })

  return 'typeDone'
}

export default listenTypes