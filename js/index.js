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
const listen = ({container = null, part = null, target = null}) => {
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
  return listen({container: 'js-types', part: 'js-option'})
    .then(element => {
      const { index } = element.dataset
      const output = data.types[index]
      publish('typeSelected', output)
    })
}

const loadMarks = (type) => {
  const data = Object.assign({}, type, )
  const html = produce('template-marks').with()
}

const loadGame = (settings) => {
  const data = {
    
  }
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

on('init', loadTypes)
on('typeSelected', loadMarks)
on('marksDone', loadGame)

const start = () => publish('init')