import { printUpdates } from './tools'

export default {
  // loaded: (state, actions) => state.router.match !== '/' && actions.router.go('/'),
  update: (prevState, actions, data) => printUpdates(prevState, data)
}
