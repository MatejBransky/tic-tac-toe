const types = (() => {

  const model = (() => {
    function giveTypes() {
      return [
        ['Human', 'Human'],
        ['Human', 'PC']
      ]
    }

    function setType(type) {
      return type
    }

    return {
      giveTypes,
      setType
    }
  })()

  const view = (() => {
    function loadTypes(types) {
      loadTemplate('template-types-of-game')({ types })
      return types
    }

    function listenTypes(types) {
      return listen({
        id: 'js-types',
        delegate: 'js-option',
        action: element => {
          const index = +element.dataset.index
          return types[index]
        }
      })
    }

    return {
      loadTypes,
      listenTypes
    }
  })()


  return {
    model,
    view
  }
})()