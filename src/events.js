import { printUpdates } from './utils'

export default {
  // loaded: (state, actions) => state.router.match !== '/' && actions.router.go('/'),
  update: (prevState, actions, data) => printUpdates(prevState, data),
  action: (state, actions, data) => console.log(data.name)
}
