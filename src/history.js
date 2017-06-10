import { h } from 'hyperapp'
import lensPath from 'ramda/src/lensPath'
import set from 'ramda/src/set'
import view from 'ramda/src/view'
import merge from 'ramda/src/merge'
import append from 'ramda/src/append'
import dissoc from 'ramda/src/dissoc'
import last from 'ramda/src/last'
import dropLast from 'ramda/src/dropLast'

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
  return set(pastPath, newPast, merge(prevState, nextState))
}

const undo = (state) => {
  const { past, future } = state.history
  if (past.length === 0) return
  console.log(past)
  console.log(future)
  const previous = last(past)
  const newPast = dropLast(1, past)
  const newHistory = {
    history: {
      past: newPast,
      future: [dissoc(PATH, state), ...future]
    }
  }
  return merge(previous, newHistory)
}

const History = () => ({
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
      if (data.hasOwnProperty(PATH)) {
        const prevPast = state.history.past
        const prevFuture = state.history.future
        const nextPast = data.history.past
        const nextFuture = data.history.future
        if (prevPast.length > nextPast.length) return data
        if (prevFuture.length < nextFuture.length) return data
      }
      return save(state, data)
    }
  },
  actions: {
    history: {
      undo,
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

const TimeTravel = ({ state, actions }) => (
  <div className="time-travel">
    <button
      className="time-travel__button"
      onclick={actions.history.undo}>
      Undo
    </button>
    <button
      className="time-travel__button"
      onclick={actions.history.redo}>
      Redo
    </button>
  </div>
)

export {
  History,
  TimeTravel
}
