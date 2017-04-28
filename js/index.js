/* ==========================================================================
 * Used libraries: Ramda, Handlebars, custom Pub/Sub pattern
 * ========================================================================== */

const pipe = R.pipe
const compile = Handlebars.compile
const on = events.on
const publish = events.publish


/* ==========================================================================
 * Tools
 * ========================================================================== */

const el = name => document.getElementById(name)
const load = input => document.getElementById('js-main').innerHTML = input
const read = id => document.getElementById(id).innerHTML
const produce = id => {
  const insert = pipe(
    read,
    compile
  )(id)
  return {
    with: data => insert(data)
  }
}
const listen = ({ container = null, part = null, target = null }) => {
  const then = action => {
    if (target && !container && !part) {
      const element = el(target)
      element.addEventListener('click', ({ target }) => action(target))

    } else if (container && part && !target) {
      const outer = el(container)
      outer.addEventListener('click', ({ target }) => {
        const array = [target, target.parentNode]
          .filter(el => el.classList.contains(part))
        if (array.length) return action(array[0])
      })
    } else {
      return false
    }

    return true
  }

  return { then }
}


/* ==========================================================================
 * View - settings
 * ========================================================================== */

const loadTypes = () => {
  const data = {
    types: [
      {
        names: ['Human', 'Human'],
        ai: false
      },
      {
        names: ['Human', 'PC'],
        ai: true
      }
    ]
  }

  const html = produce('template-types').with(data)
  load(html)
  return listen({ container: 'js-types', part: 'js-option' })
    .then(clicked => {
      const { index } = clicked.dataset
      const output = data.types[index]
      publish('typeDone', output)
    })
}

const loadMarks = ({ names, ai }) => {
  const data = {
    players: [
      {
        name: names[0],
        mark: 'X'
      },
      {
        name: names[1],
        mark: 'O'
      }
    ]
  }
  const html = produce('template-marks').with(data)
  load(html)

  const marks = (() => {
    const els = document.getElementsByClassName('js-mark')
    return {
      get: () => [els[0].innerHTML, els[1].innerHTML],
      set: (markA, markB) => [els[0].innerHTML = markA, els[1].innerHTML = markB]
    }
  })()
  const getMarks = marks.get
  const setMarks = marks.set
  const switchMarks = () => { // TODO
    const [mark1, mark2] = getMarks()
    return setMarks(mark2, mark1)
  }

  listen({ target: 'js-switch' })
    .then(switchMarks)
  listen({ target: 'js-submit' })
    .then(() => {
      const settings = { // TODO
        ai,
        marks: getMarks()
      }
      publish('settingsDone', settings)
    })
}

const loadGame = ({ ai, marks }) => {
  const data = {
    marks,
    score: [0, 0],
    board: [0,0,0]
      .fill([0,0,0])
      .map((row, y) => row
        .map((cell, x) => ({x, y}))),
    current: Math.round(Math.random())
  }
  const html = produce('template-game').with(data)
  load(html)

  const mark = field => {
    if (field.innerHTML !== '') return
    field.innerHTML = marks[data.current]
    data.current = data.current === 1 ? 0 : 1
  }

  listen({ container: 'js-board', part: 'js-field' })
    .then(field => {
      const [x, y] = field.dataset
      mark(field)
      // process({x, y})
    })
}

/* ==========================================================================
 * Game logic
 * ========================================================================== */

const setGame = (settings) => move => {

}

const process = setGame()

/* ==========================================================================
 * Events
 * ========================================================================== */

// on('init', loadTypes)
// on('typeDone', loadMarks)
// on('typeDone', console.log)
// on('marksDone', loadGame)

const start = () => publish('init')

loadGame({ai: true, marks: ['X', 'O']})