const listen = ({ container = null, part = null, target = null }) => {
  const then = action => {
    if (target && !container && !part) {
      const element = document.getElementById(target)
      element.addEventListener('click', ({ target }) => action(target))

    } else if (container && part && !target) {
      const outer = document.getElementById(container)
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

export default listen