import {
  deepEqualTests,
  createField,
  createRow,
  createBoard,
  createSerie,
  distribute,
  flatten,
  getUpdates,
  printUpdates
} from '../src/utils'

deepEqualTests({
  desc: 'createField() should return field object with predefined values',
  assertions: [
    {
      actual: createField('_', 0, 0),
      expected: { x: 0, y: 0, mark: '', value: 1, win: false },
      msg: 'Empty field object.'
    },
    {
      actual: createField('O', 0, 1),
      expected: { x: 0, y: 1, mark: 'O', value: 7, win: false },
      msg: 'Field object of player 1 with "O" mark.'
    },
    {
      actual: createField('X', 1, 0),
      expected: { x: 1, y: 0, mark: 'X', value: -6, win: false },
      msg: 'Field object of player 2 with "X" mark.'
    }
  ]
})

deepEqualTests({
  desc: 'createRow() should return row with predefined fields',
  assertions: [
    {
      actual: createRow(['_', 'X', 'O'], 2),
      expected: [
        { x: 0, y: 2, mark: '', value: 1, win: false },
        { x: 1, y: 2, mark: 'X', value: -6, win: false },
        { x: 2, y: 2, mark: 'O', value: 7, win: false }
      ],
      msg: 'Last row with various fields: [_, X, O].'
    }
  ]
})

deepEqualTests({
  desc: 'createBoard() should return array with rows which contain field objects with predefined properties',
  assertions: [
    {
      actual: createBoard([
        ['_', 'X', 'O'],
        ['_', '_', 'O'],
        ['_', 'X', '_']
      ]),
      expected: [
        createRow(['_', 'X', 'O'], 0),
        createRow(['_', '_', 'O'], 1),
        createRow(['_', 'X', '_'], 2)
      ],
      msg: 'Board with various fields.'
    }
  ]
})
