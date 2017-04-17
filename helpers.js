const switcher = (a, b) => [a, b] = [b, a]

const isEmpty = (input) => input === null

const load = (element) => (data) => element.innerHTML = data


/**
 * click listener
 * parameters:
 *  id = id of element, which will be listened
 *  delegate = class of descendant elements or their parents
 *  action = what to do after click
 */
const listen = ({ id, delegate = null, action }) => {
  const element = document.getElementById(id)
  element.addEventListener('click', ({ target }) => {
    if (delegate) {
      if (target.className.indexOf(delegate) === -1 || target.parentNode.className.indexOf(delegate) === -1) return
      const getElement = () =>
        target.className.indexOf(delegate) === -1
          ? target.parentNode
          : target
      const element = getElement()
      action(element)
    } else {
      action(target)
    }
  })
}