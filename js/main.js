import state from './state.json'
import stream from './tools/stream'
import types from './types/types'
// import marks from './marks/marks'
// import game from './game/game'

stream(
  types,
  x => console.log('výstup: ', x)
  // marks,
  // game
)(state)
