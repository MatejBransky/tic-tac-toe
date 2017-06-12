import { h } from 'hyperapp'
import merge from 'ramda/src/merge'
import dissoc from 'ramda/src/dissoc'
import last from 'ramda/src/last'
import drop from 'ramda/src/drop'
import dropLast from 'ramda/src/dropLast'
import equals from 'ramda/src/equals'

const HISTORY = 'history'

// state: Object => state without history: Object
const dissocHistory = (state) => dissoc(HISTORY, state)

// prevState: Object, nextState: Object => nextState with updated history: Object
const save = (prevState, nextState) => {
  const { past } = prevState[HISTORY]
  const newHistory = {
    [HISTORY]: {
      lastAction: 'save',
      past: [...past, dissocHistory(prevState)],
      future: []
    }
  }
  return merge(nextState, newHistory)
}

// state: Object => previous state with history: Object
const undo = (state) => {
  const { past, future } = state[HISTORY]
  if (past.length === 0) return
  const previous = last(past)
  const newPast = dropLast(1, past)
  const newHistory = {
    [HISTORY]: {
      lastAction: 'undo',
      past: newPast,
      future: [dissocHistory(state), ...future]
    }
  }
  return merge(previous, newHistory)
}

// state: Object => next state with history: Object
const redo = (state) => {
  const { past, future } = state[HISTORY]
  if (future.length === 0) return
  const next = future[0]
  const newFuture = drop(1, future)
  const newHistory = {
    [HISTORY]: {
      lastAction: 'redo',
      past: [...past, dissocHistory(state)],
      future: newFuture
    }
  }
  return merge(next, newHistory)
}

// Plugin
const History = () => ({
  state: {
    [HISTORY]: {
      lastAction: '',
      past: [],
      future: []
    }
  },
  events: {
    update: (state, actions, data) => {
      if (data.hasOwnProperty(HISTORY)) {
        if (['undo', 'redo'].includes(data[HISTORY].lastAction)) {
          if (equals(state[HISTORY], data[HISTORY])) {
            // new state during browsing of history
            return save(state, data)
          } else {
            // browsing history
            return data
          }
        } else {
          // full update new state
          return save(state, data)
        }
      } else {
        // partial update of state
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

// View
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
