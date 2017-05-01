import { on, publish } from './events'

const stream = (...fns) => (state = {}) => {
  let i = 0
  let output = state
  do {
    let input = output
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

export default stream