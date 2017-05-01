const pipe = (...fns) => x => fns.reduce((v, f) => f(v), x)

const el = name => document.getElementById(name)

const els = name => document.getElementsByClassName(name)

const setDom = input => document.getElementById('js-main').innerHTML = input

const read = id => document.getElementById(id).innerHTML

const compile = Handlebars.compile

const when = (bool, action) => state => bool(state) && action(state)

export { 
  pipe,
  el,
  els,
  setDom,
  read,
  compile,
  when
}