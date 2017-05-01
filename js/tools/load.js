import { pipe, read, compile, setDom } from './tools'

const load = id => {
  const insert = pipe(
    read,
    compile
  )(id)
  return {
    with: data => {
      setDom(insert(data))
      return data
    }
  }
}

export default load