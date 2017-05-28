# Readme Driven Development (RDD)

## Utils

```javascript
// Create object 'field'
const field = createField('X') // { x:  } // @TODO
// Create row which contain objects 'field' with predefined properties
const row = createRow([], ) // @TODO
// Create board with rows which contain objects 'field' with predefined properties
const board = createBoard([
  ['_', 'O', 'X'],
  ['_', 'X', '_'],
  ['_', 'O', '_']
])
// [
//   [
//     { x: 0, y: 0, mark: '', ... },
//     { x: 1, y: 0, mark: 'O', ... },
//     { x: 2, y: 0, mark: 'X', ... }
//   ],
//   [
//     { x: 0, y: 1, mark: '', ... },
//     { x: 1, y: 1, mark: 'X', ... },
//     { x: 2, y: 1, mark: '', ... }
//   ],
//   [
//     { x: 0, y: 2, mark: '', ... },
//     { x: 1, y: 2, mark: 'O', ... },
//     { x: 2, y: 2, mark: '', ... }
//   ]
// ]
const serie = createSerie({}) // @TODO
```
