const init = (() => {

  // Bind events *******************************
  events.on('init', loadType)
  events.on('typeDone', loadMarks)
  events.on('marksDone', loadGame)


  // Loaders ***********************************

  // Type of game
  function loadType() {
    const templateType = document.getElementById('template-types-of-game').innerHTML
    const data = {
      types: [
        ['Human', 'Human'],
        ['Human', 'PC']
      ]
    }
    loadTemplate(templateType, data)

    const loadedType = document.getElementById('js-type')
    loadedType.addEventListener('click', ({ target }) => {
      const parent = target.parentNode
      if (parent.className.indexOf('js-option') === -1) return
      setType(data, parent)
    })

    function setType(data, parent) {
      const index = parent.dataset.index
      return events.publish('typeDone', data.types[index])
    }
  }

  // Marks of players
  function loadMarks(type) {
    const templateMarks = document.getElementById('template-marks').innerHTML
    const data = {
      type,
      marks: ['X', 'O'],
      score: [0, 0]
    }
    loadTemplate(templateMarks, data)

    const loadedMarks = document.getElementsByClassName('js-mark')
    const loadedSwitcher = document.getElementById('js-switch-marks')
    const loadedStarter = document.getElementById('js-load-game')
    loadedSwitcher.addEventListener('click', switchMarks(loadedMarks, data.marks))
    loadedStarter.addEventListener('click', () => 
    events.publish('marksDone', data))
    
    function switchMarks(loadedMarks, data) {
      return () => {
        const [a, b] = [...loadedMarks].map(({ innerHTML }) => innerHTML)
        const switchedMarks = switcher(a, b)
        switchedMarks.map((mark, index) => loadedMarks[index].innerHTML = mark)
        data = switchedMarks
      }
    }
  }

  // Game
  function loadGame(players) {
    const templateGame = document.getElementById('template-game').innerHTML
    const state = {
      players,
      board: new Array(9).fill(null),
      currentPlayer: players.marks[Math.round(Math.random())]
    }
    loadTemplate(templateGame, state)
    
    const loadedBoard = document.getElementById('js-board')
    const loadedStatus = document.getElementById('js-status')
    events.on('stateChanged', load(loadedStatus))
    loadedBoard.addEventListener('click', ({ target }) => {

      if (target.className.indexOf('js-field') === -1) return
      const domField = target
      const index = field.dataset.index
      const stateField = state.board[index]

      if (!isEmpty(stateField)) return
      setState()

    })

    function setState(newValues) {
      Object.assign(state, newValues)
      events.publish('stateChanged', state)
    }
  }


  // Helpers ***********************************

  function loadTemplate(template, data) {
    const target = document.getElementById('js-main')
    target.innerHTML = Handlebars.compile(template)(data)
  }


  // Public interface **************************

  return {

  }
})()

