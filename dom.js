const dom = (() => {
  events.on('typesGived', loadType)
  events.on('typeLoaded', listenType)
  events.on('typeDone', loadMarks)
  events.on('marksDone', loadGame)

  const loadType = types => {
    loadTemplate('template-types-of-game')(types)
    events.publish('typeLoaded')
  }

  const listenType = () => {
    listen('js-type', 'js-option', element => {
      const indexOfType = element.dataset.index
      events.publish('typeClicked', indexOfType)
    })
  }

  function loadMarks() {
    const templateMarks = document.getElementById('template-marks')
    events.publish('loadMarks')
    events.on('dataMarks', )
  }

  const loadTemplate = (targetName => {
    const target = document.getElementById(targetName)
    return (templateName) => {
      const template = document.getElementById(templateName).innerHTML
      return (data) => target.innerHTML = Handlebars.compile(template)(data)
    }
  })('js-main')

  return {
    loadType,
    listenType,
    loadMarks,
    loadGame
  }
})()