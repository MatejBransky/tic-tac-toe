const init = () => {
  // Cache DOM
  const target = document.getElementsByClassName('main')[0]
  const tType = document.getElementById('template-type-of-game').innerHTML
  const tMarks = document.getElementById('template-marks').innerHTML
  const tGame = document.getElementById('template-game').innerHTML

  const setType = (target, template) => {
    const types = [
      ['Human', 'Human'],
      ['Human', 'PC']
    ]

    target.innerHTML = Handlebars.compile(template)(types)
  }

  setType(target, tType)

  // Bind events

}

init()