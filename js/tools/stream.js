import { on } from './events'

const stream = (...args) => {
  const fns = args.reduce((arr, arg, i, args) => {
    /**
     * If arg is array with fn and string, then create another stream,
     * which listen event: string
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

  console.log(fns)
  
  /**
   * Stream with modified args as fns and calling it with state
   */
  return state => {
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

export default stream