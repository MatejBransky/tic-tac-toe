import load from '../tools/load'

const loadMarks = state => {
  load(state.loadMarks.id).with(state.loadMarks.data)
  return state
}

export default loadMarks