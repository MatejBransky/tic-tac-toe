import stream from '../tools/stream'
import loadMarks from './loadMarks'
import listenMarks from './listenMarks'

const marks = state => stream(
  loadMarks,
  listenMarks
)

export default marks