import state from './state.json'
import stream from './tools/stream'
import types from './types/types'
// import marks from './marks/marks'
// import game from './game/game'

stream(
  types
  // marks,
  // game
)(state)
