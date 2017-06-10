import lensPath from 'ramda/src/lensPath'
import set from 'ramda/src/set'
import view from 'ramda/src/view'
import merge from 'ramda/src/merge'
import append from 'ramda/src/append'
import equals from 'ramda/src/equals'
import dissoc from 'ramda/src/dissoc'
import pick from 'ramda/src/pick'
import keys from 'ramda/src/keys'

/*

nekde musi byt ulozeny undoList (past, present, future) - NE ve state (mozna HOC?)
po eventu "loaded" se ulozi prvni state do present
po updatu, ktery nevyvolal "actions.undo/redo" se predchozi state ulozi na konec past a aktualni state se ulozi do present
po updatu, ktery vyvolal "actions.undo" se present state presune na zacatek pole future a posledni state z past se vyjme a vlozi do present a vrati se jako novy state
po updatu, ktery vyvolal "actions.redo" se present state presune na konec pole past a prvni state ve future se vyjme a vlozi do present

*/

const PATH = 'history'

const save = (prevState, nextState) => {
  const pastPath = lensPath([PATH, 'past'])
  const prevStateWithoutHistory = dissoc(PATH, prevState)
  const newPast = append(
    prevStateWithoutHistory,
    view(pastPath, nextState)
  )
  return set(pastPath, newPast, nextState)
}

export default () => ({
  state: {
    history: {
      past: [],
      future: []
    }
  },
  events: {
    loaded: (state) => merge(state, {
      [PATH]: {
        past: [],
        future: []
      }
    }),
    update: (state, actions, data) => {
      console.log('State: ', state)
      console.log('Data: ', data)
      return save(state, data)
    }
  },
  actions: {
    history: {
      undo: (present) => {
        const { past, future } = present.history
        const previous = past[past.length - 1]
        const newPast = past.slice(0, -1)
        return merge(
          previous,
          {
            history: {
              past: newPast,
              future: [present, ...future]
            }
          }
        )
      },
      redo: (present) => {
        const { past, future } = present.history
        const next = future[0]
        const newFuture = future.slice(1)
        return merge(
          next,
          {
            history: {
              past: [...past, present],
              future: newFuture
            }
          }
        )
      }
    }
  }
})
