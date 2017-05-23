import append from 'ramda/src/append'
import type from 'ramda/src/type'
import keys from 'ramda/src/keys'
import equals from 'ramda/src/equals'
import merge from 'ramda/src/merge'
import mergeAll from 'ramda/src/mergeAll'
import assoc from 'ramda/src/assoc'
import assocPath from 'ramda/src/assocPath'
import path from 'ramda/src/path'

const distribute = ({ key, values, course, parent }) => {
  const objects = path(course, parent)
    .map((object, index) => assoc(key, values[index], object))
  return assocPath(course, objects, parent)
}

const flatten = (object, separator = '.') => {
  return mergeAll(function _flatten(child, path = []) {
    return [].concat(...keys(child)
      .map(key => type(child[key]) === 'Object' || type(child[key]) === 'Array' ? 
        _flatten(child[key], append(key, path)) : 
        ({ [append(key, path).join(separator)]: child[key] })
      ))
  }(object))
}

const getUpdates = (prevState, newState) => {
  const SEPARATOR = '.'
  const flattenPrev = flatten(prevState, SEPARATOR)
  const flattenNew = flatten(newState, SEPARATOR)
  return keys(flattenPrev).reduce((updates, key) => equals(flattenPrev[key], flattenNew[key]) ?
    updates :
    append({
      path: key.split(SEPARATOR),
      oldValue: flattenPrev[key],
      newValue: flattenNew[key]
    }, updates), [])
}

const printUpdates = (prevState, newState, separator = '/') => {
  const updates = getUpdates(prevState, newState)
    .map(update => merge(update, { path: update.path.join(separator) }))
  console.table(updates)
}

export {
  distribute,
  flatten,
  getUpdates,
  printUpdates
}
