import { h } from 'hyperapp'
import merge from 'ramda/src/merge'
import dissoc from 'ramda/src/dissoc'
import last from 'ramda/src/last'
import drop from 'ramda/src/drop'
import dropLast from 'ramda/src/dropLast'
import equals from 'ramda/src/equals'

/*

nekde musi byt ulozeny undoList (past, present, future) - NE ve state (mozna HOC?)
po eventu "loaded" se ulozi prvni state do present
po updatu, ktery nevyvolal "actions.undo/redo" se predchozi state ulozi na konec past a aktualni state se ulozi do present
po updatu, ktery vyvolal "actions.undo" se present state presune na zacatek pole future a posledni state z past se vyjme a vlozi do present a vrati se jako novy state
po updatu, ktery vyvolal "actions.redo" se present state presune na konec pole past a prvni state ve future se vyjme a vlozi do present

*/

const HISTORY = 'history'

const dissocHistory = (state) => dissoc(HISTORY, state)

const save = (prevState, nextState) => {
  const { past } = prevState[HISTORY]
  const newHistory = {
    [HISTORY]: {
      lastAction: 'save',
      present: true,
      past: [...past, dissocHistory(prevState)],
      future: []
    }
  }
  console.log('SAVE ======= Past: ', newHistory[HISTORY].past)
  console.log('SAVE ======= Future: ', newHistory[HISTORY].future)
  return merge(nextState, newHistory)
}

const undo = (state) => {
  const { past, future } = state[HISTORY]
  if (past.length === 0) return
  const previous = last(past)
  const newPast = dropLast(1, past)
  const newHistory = {
    [HISTORY]: {
      lastAction: 'undo',
      present: false,
      past: newPast,
      future: [dissocHistory(state), ...future]
    }
  }
  console.log('UNDO ======= Past: ', newHistory[HISTORY].past)
  console.log('UNDO ======= Future: ', newHistory[HISTORY].future)
  return merge(previous, newHistory)
}

const redo = (state) => {
  const { past, future } = state[HISTORY]
  if (future.length === 0) return
  const next = future[0]
  const newFuture = drop(1, future)
  const newHistory = {
    [HISTORY]: {
      lastAction: 'redo',
      present: newFuture.length ? false : true,
      past: [...past, dissocHistory(state)],
      future: newFuture
    }
  }
  console.log('REDO ======= Past: ', newHistory[HISTORY].past)
  console.log('REDO ======= Future: ', newHistory[HISTORY].future)
  return merge(next, newHistory)
}

const History = () => ({
  state: {
    [HISTORY]: {
      lastAction: '',
      present: true,
      past: [],
      future: []
    }
  },
  events: {
    update: (state, actions, data) => {
      if (data.hasOwnProperty(HISTORY)) {
        if (['undo', 'redo'].includes(data[HISTORY].lastAction)) {
          if (equals(state[HISTORY], data[HISTORY])) {
            console.log('New state in the middle of history')
            return save(state, data)
          } else {
            console.log('Going through history')
            return data
          }
        } else {
          console.log('New state')
          return save(state, data)
        }
      } else {
        console.log('New state with partial update')
        return save(state, merge(state, data))
      }
    }
  },
  actions: {
    [HISTORY]: {
      undo,
      redo
    }
  }
})

const TimeTravel = ({ state, actions }) => (
  <div className="time-travel">
    <button
      className="time-travel__button"
      onclick={actions[HISTORY].undo}>
      Undo ({state[HISTORY].past.length})
    </button>
    <button
      className="time-travel__button"
      onclick={actions[HISTORY].redo}>
      Redo ({state[HISTORY].future.length})
    </button>
  </div>
)

export {
  History,
  TimeTravel
}
