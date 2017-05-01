```javascript

stream(
  loadTypes, // () => ({types: [{names, ai}..]}) ====== load types to html
  listenTypes, // ({types}) => |type| => ({ai, names}) ===== listen, which type was chosen

  loadMarks, // ({ai, names}) => 
  listenMarks,

  loadGame,
  setGame,
  listenGame,

  processMove,
  when(isEnd, endGame),
  when(typeIsAi, getAiMove)
)

const from = fns => {
  
}

const stream = (...fns) => (state = {}) => {
  let i = 0
  let output
  do {
    let input = output
    output = fns[i](input)
    i = i + 1
  } while (typeof output !== 'string')

  if (typeof output === 'string') {
    const event = output
    return on(event, stream(fns.slice(i)))
  }
  return publish('streamDone', output)
}

```

stream: 
spustí se .reduce() s podmínkou, že aby tok pokračoval, musí se vrátit objekt, a pokud ne a vrátí se string (např. 'typeSelected'), tak se začne poslouchat událost on('typeSelected', stream(...fns)) s funkcemi 