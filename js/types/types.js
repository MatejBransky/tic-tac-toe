import stream from '../tools/stream'
import loadTypes from './loadTypes'
import listenTypes from './listenTypes'

const types = stream(
  loadTypes,
  listenTypes
)

export default types