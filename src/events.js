import { printUpdates } from './tools'
import equals from 'ramda/src/equals'
import keys from 'ramda/src/keys'

export default {
  // loaded: (state, actions) => state.router.match !== '/' && actions.router.go('/'),
  update: (prevState, actions, data) => {
    if (equals(keys(prevState), keys(data))) {
      printUpdates(prevState, data)
    }
  }
}
