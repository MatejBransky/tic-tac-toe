# Gist
(More declarative way)

## CZ
### Ve zkratce:
Po načtení HTML se provede `events.publish('init')` >> načte se první template s výběrem typu hry >> po výběru typu hry - `events.publish('typeDone', data: type)` >> načte se druhý template s výběrem značek >> po výběru značek - `events.publish('marksDone', data: {type, marks})` >> načte se template hry a inicializuje se model hry.

Model hry bude uložen jako *module revealing pattern*.
Při inicializaci modelu hry jsou zapotřebí vstupní parametry: typ hry (`ai = 0 / 1`) a nastavení značek (`marks = ['X', 'O']`). Tyto parametry se uloží do objektu state:

```javascript
const state = {
    ai: true/false, // typ hry
    marks: ['O', 'X'],
    current: Math.round(Math.random()), // index aktuálního hráče: 0/1 -> marks[current]
    board: new Array(9).fill(null), // pole políček obsahuje pod každým políčkem značku: null/'O'/'X'
    empty: [0,1,2,3,4,5,6,7,8] // indexy prázdných políček
}
```

### AI
Pokud je vstupní parametr typu hry roven 1, nastaví se hra pro hru s PC.

```javascript
function getReply(ai) {
    const replies = [
        events.publish('moveDone'),
        events.publish('replyAi', data: state)
    ]
    return replies[ai]
}
...
function answer({marks, board, empty})
```

### Hra
Při kliknutí na políčko se ověří, zda-li bylo kliknuto v `board` na políčko `field`, pokud ano, tak se zavolá funkce `play(move)`, kde *move* je index políčka (index políčka se získá z atributu `data-index=1` tagu).

#### Funkce `play(move)`
- změní značku políčka

```javascript
state.board[index] = state.marks[state.current]
```

- ověří, zda-li není hra u konce (výhra/remíza) funkcí `control(state)`
- pokud je hra u konce, tak zavolá `events.publish('gameEnded', data: status)`
- pokud není, tak se změní index aktuálního hráče

```javascript
const play = move => pipe(
    updateBoard, // aktualizuj pole s políčky | move => state
    ifContinue(pipe( // ověř, jestli to není poslední nebo vítězný tah | state => state 
        changeCurrent, // pokud hra pokračuje, změň index aktuálního hráče | state => state
        ifAi(reply) // pokud je protivník AI, tak odpověz protitahem | state => move
        )
    )
)(move)

function updateBoard (move) {
    return pipe(
        getMark, // move => {index, mark}
        setBoard // {index, mark} => state
    )(move)
}

setState(curry(assocPath([...], mark, state))(_, _, state)(['board', index], mark))
pipe( // nešlo by použít R.lensPath? :D
    update(state.board), // (index, mark) => (R.curry umožňuje vynechat vstupní parametry)
    assoc(state), // array board => ... state
)

function setBoard ({index, mark}) {
    pipe(
        getState,
        { board } => {
            board[index] = mark
            return board
        },
        setState({ board })
    )({index, mark})
}

const ifContinue = fn => state => (state.empty.length || !isWin(state)) ? fn(state) : false

const ifAi = fn => state => state.ai ? fn(state) : false
```

...

```javascript
function setState (props) {
    return state = Object.assign({}, state, props)
}
```

```javascript
function isWin({board}) {
    // projeď winLines
}
```