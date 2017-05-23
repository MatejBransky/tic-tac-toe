import printUpdates from './tools'
import equals from 'ramda/src/equals'
import keys from 'ramda/src/keys'

export default {
  loaded: (state, actions) => state.router.match !== '/' && actions.router.go('/'),
  update: (prevState, actions, data) => {
    equals(keys(prevState) === keys(data))
      ? printUpdates(prevState, data) 
      : console.table([
        { 
          name: 'prevState', 
          keys: keys(prevState).join(',')
        },
        { 
          name: 'data', 
          keys: keys(data).join(',') 
        }
      ])
    // console.log(keys(prevState))
    // console.log(keys(data))
    // console.log(keys(prevState) === keys(data))
  }
}
