const switcher = (a, b) => [a, b] = [b, a]

const isEmpty = (input) => input === null

const load = (targetId) => (templateId) => (data) => {
  const target = document.getElementById(targetId)
  const template = document.getElementById(templateId).innerHTML
  return target.innerHTML = Handlebars.compile(template)(data)
}

const loadTemplate = load('js-main')

/**
 * click listener
 * parameters:
 *  id = id of element, which will be listened
 *  delegate = class of descendant elements or their parents
 *  action = what to do after click
 */
const listen = ({ id, delegate = null, action }, value = null) => {
  if (value) return value
  const element = document.getElementById(id)
  element.addEventListener('click', ({ target }) => {
    if (delegate) {
      if (!(target.className.indexOf(delegate) !== -1
        || target.parentNode.className.indexOf(delegate) !== -1)) return
      const getElement = () =>
        target.className.indexOf(delegate) === -1
          ? target.parentNode
          : target
      const element = getElement()
      return listenTypes(action(element))
    } else {
      return listen({ id, delegate, action }, action(target))
    }
  })
}