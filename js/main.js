import state from './state.json'
import stream from './tools/stream'
import { call } from './tools/events'
import { when, pipe } from './tools/tools'
import loadTypes from './types/loadTypes'
import listenTypes from './types/listenTypes'
import loadMarks from './marks/loadMarks'
import listenMarks from './marks/listenMarks'
import loadGame from './game/loadGame'
import listenFields from './game/listenFields'
import markField from './game/markField'
import isEnd from './game/isEnd'
import setState from './game/setState'
import isAi from './game/isAi'
import evalMove from './game/evalMove'



const init = stream(
  loadTypes,
  listenTypes,
  loadMarks,
  listenMarks,
  [loadGame, 'newGame'],
  [listenFields, 'listenFields'],
  [markField, 'markField'],
  when(isEnd, pipe(setState, call('newGame'))),
  when(isAi, pipe(evalMove, call('markField'))),
  call('listenFields')
)

init(state)