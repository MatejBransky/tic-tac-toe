import load from '../tools/load'

const loadTypes = state => {
  load(state.loadTypes.id).with(state.loadTypes.data)
  return state
}

export default loadTypes