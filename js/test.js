const events = (() => {
  const topics = {}
  const on = (topic, action) => {
    if (!topics.hasOwnProperty(topic)) topics[topic] = []
    const index = topics[topic].push(action) - 1
    const remove = () =>
      topics[topic][index] = null
    return { remove }
  }
  const publish = (topic, data) => {
    if (!topics.hasOwnProperty(topic)) return false
    return topics[topic].reduce((result, action) => {
      if (action) result.push(action(data))
      return result
    }, [])
  }
  const call = topic => data => publish(topic, data)
  return {
    on,
    publish,
    call
  }
})()

const on = events.on


const stream = (...args) => {
  const modifiedArgs = args.reduce((arr, arg, i, args) => {
    /**
     * checkpoint
     */
    if (Array.isArray(arg)) {
      const [fn, event] = arg
      const innerStream = stream(fn, ...args.slice(i + 1))
      on(event, innerStream)
      arr.push(fn)
      return arr
    }

    const fn = arg
    arr.push(fn)
    return arr
  }, [])
  console.log(modifiedArgs)
  /**
   * Stream with modified args as fns and calling it with state
   */
  return state => {
    const fns = modifiedArgs
    let i
    let input = state
    let output
    do {
      output = fns[i](input)
      i = i + 1
    } while (typeof output !== 'string' && i < fns.length)

    if (typeof output === 'string') {
      const event = output
      /**
       * if listen is not last, then prepare call of 
       * another stream with remaining functions when event publishes
       */
      if (i < fns.length) {
        return on(event, stream(...fns.slice(i)))
        /**
         * else return string which is important for parent stream (listen this stream)
         */
      } else {
        return event
      }
    }
    return output
  }
}



// const init = stream(
//   state => console.log(1, state),
//   [state => console.log(2, state), 'boom'],
//   state => {
//     const el = document.querySelector('body')
//     el.addEventListener('click', () => (
//       publish('you click', state)
//     ))
//   },
//   call('boom')
// )

// const a = [
//   1,
//   2,
//   [3,'boom'],
//   4,
//   [5, 'bác'],
//   [6, 'bong'],
//   7,
//   8
// ]

// const r = [
//   1,
//   2,
//   [
//     3,
//     4,
//     [
//       5,
//       [
//         6,
//         7,
//         8
//       ]
//     ]
//   ]
// ]

// const deepPush = (arr, item) => {
//   if (!arr.length) {
//     arr.push(item)
//     return arr
//   }
//   const last = arr[arr.length - 1]
//   if (Array.isArray(last)) {
//     return deepPush(last, item)
//   } else {
//     arr.push(item)
//     return arr
//   }
// }

// const b = a.reduce((arr, item) => {
//   if (Array.isArray(item)) {
//     const [n, event] = item
//     const innerArray = [n]
//     deepPush(arr, innerArray)
//     return arr
//   }

//   deepPush(arr, item)
//   return arr
// }, [])

// console.log('source: ', JSON.stringify(a))
// console.log('result: ', JSON.stringify(b))
// console.log('expected result: ', JSON.stringify(r))