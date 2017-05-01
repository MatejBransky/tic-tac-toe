import stream from './stream'
import markField from './markField'
import { when } from './tools'
import isEnd from './isEnd'
import setStatus from './setStatus'
import loadGame from ''

const processMove = stream(
  markField,
  when(isEnd, stream(
    setStatus,
    loadGame
  )),
  when(isAi, stream(
    aiTurn,
    processMove
  ))
)

export default processMove