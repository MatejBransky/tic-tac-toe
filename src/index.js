import { h, app } from 'hyperapp'

app({
  state: "Hi",
  view: state => <h1>{state}</h1>
})
