# Readme Driven Development (RDD)

## Utils - everything around the app
```javascript
// Create object 'field'
const field = createField('X', 0, 1) // => { x: 0, y: 1, mark: 'X', ... }

// Create row which contain objects 'field' with predefined properties
const row = createRow([_, O, X], 1) // => 
// [
//   { x: 0, y: 1, mark: '', ... },
//   { x: 1, y: 1, mark: 'O', ... },
//   { x: 2, y: 1, mark: 'X', ... }
// ]

// Create board with rows which contain objects 'field' with predefined properties
const board = createBoard([
  ['_', 'O', 'X'],
  ['_', 'X', '_'],
  ['_', 'O', '_']
]) // =>
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

// Create array with field objects
const serie = createSerie([[0,0,'X'], [1,1,'X'], [2,2,'O']])
// =>
// [
//   { x: 0, y: 0, mark: 'X', ... },
//   { x: 1, y: 1, mark: 'X', ... },
//   { x: 2, y: 2, mark: 'O', ... }
// ]
```


## Helpers - functions for helping to complete actions
```javascript

```
