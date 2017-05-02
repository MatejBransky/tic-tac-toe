# Možnosti řešení

## 1. Stream

```javascript
stream(
  loadTypes, // () => ({types: [{names, ai}..]}) ====== load types to html
  listenTypes, // ({types}) => |type| => ({ai, names}) ===== listen, which type was chosen

  loadMarks, // ({ai, names}) => 
  listenMarks,

  loadGame,
  listenGame
)(state)

const listenGame = stream(
  listen(...)
    .then(
      ...
      processMove
    )
)

const processMove = stream(
  when(isEnd, endGame),
  when(typeIsAi, getAiMove)
)
```

### Popis: 
spustí se .reduce() s podmínkou, že aby tok pokračoval, musí se vrátit objekt, a pokud ne a vrátí se string (např. 'typeSelected'), tak se začne poslouchat událost on('typeSelected', stream(...fns)) s funkcemi, které následují ve streamu.

**Důležité**: vstupní a výstupní data každé funkce musí být objekt (state), pokud bude výstupní textový řetězec, tak značí název události, po které má pokračovat stream.


## 2. Event in -> action -> event out

```javascript
on('init', loadTypes).then('typesLoaded')
on('typesLoaded', listenTypes).then('typesSelected')
on('typesSelected', loadMarks).then('marksLoaded')
on('marksLoaded', listenMarks).then('marksSelected')
on('marksSelected', loadGame)
```